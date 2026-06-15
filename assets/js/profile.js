// ==========================================
// 1. FUNGSI KONTROL MODAL (GLOBAL)
// ==========================================
window.openEditModal = function() {
  const modal = document.getElementById('edit-modal');
  if (modal) {
    modal.style.opacity = '1';
    modal.style.visibility = 'visible';
  }
};

window.closeEditModal = function() {
  const modal = document.getElementById('edit-modal');
  if (modal) {
    modal.style.opacity = '0';
    modal.style.visibility = 'hidden';
  }
};

// ==========================================
// 2. LOGIKA UTAMA (DATABASE & UI PROFIL)
// ==========================================
document.addEventListener('DOMContentLoaded', async function() {
  // Fail-Secure: Cek ketersediaan library Supabase
  if (!window.supabase) {
    console.error("Library Supabase gagal dimuat!");
    return;
  }
  
  // Inisialisasi Supabase
  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  try {
    // --- 1. CEK SESI USER ---
    const { data: { session }, error: sessionError } = await supa.auth.getSession();
    
    if (!session) {
      window.location.replace('login.html'); // Usir instan jika tanpa sesi
      return;
    }

    const user = session.user;
    
    // Render Email User
    const emailDisplay = document.getElementById('info-email'); 
    if (emailDisplay) emailDisplay.textContent = user.email;

    // --- 2. AMBIL DATA DARI TABEL 'profiles' ---
    const { data: profileData, error: fetchError } = await supa
      .from('profiles')
      .select('nickname, is_premium, subscription_end')
      .eq('id', user.id)
      .maybeSingle(); 

    // --- 3. RENDER NAMA (PATCH XSS) ---
    // MENGGUNAKAN textContent AGAR SCRIPT JAHAT TIDAK BISA DIEKSEKUSI
    const greetingText = document.getElementById('greeting-text');
    const nicknameInput = document.getElementById('nickname-input');

    if (profileData && profileData.nickname) {
      if (greetingText) greetingText.textContent = `Halo, ${profileData.nickname}! 👋`;
      if (nicknameInput) nicknameInput.value = profileData.nickname;
    } else {
      const defaultName = user.email.split('@')[0]; // Ambil nama depan email
      if (greetingText) greetingText.textContent = `Halo, ${defaultName}! 👋`;
    }

    // --- 4. RUMUS DINAMIS HITUNG MUNDUR MASA AKTIF ---
    const subRemainingEl = document.getElementById('subscription-remaining');
    const subRenewEl = document.getElementById('subscription-renew-date');
    
    if (profileData && profileData.subscription_end) {
      const endDate = new Date(profileData.subscription_end);
      const today = new Date();
      const diffTime = endDate.getTime() - today.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 

      if (diffDays > 0) {
        if (subRemainingEl) {
          subRemainingEl.textContent = `${diffDays} Hari Lagi`;
          subRemainingEl.style.color = "#10b981"; // Hijau Success
        }
        if (subRenewEl) {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          subRenewEl.textContent = endDate.toLocaleDateString('id-ID', options);
        }
      } else {
        if (subRemainingEl) {
          subRemainingEl.textContent = "Kadaluarsa";
          subRemainingEl.style.color = "#ef4444"; // Merah Danger
        }
        if (subRenewEl) subRenewEl.textContent = "Silakan perpanjang akses";
      }
    } else {
      if (subRemainingEl) subRemainingEl.textContent = "Tidak Aktif";
      if (subRenewEl) subRenewEl.textContent = "-";
    }

    // --- 5. LOGIKA TOMBOL SIMPAN NAMA BARU ---
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const newNickname = nicknameInput.value.trim();
        if (!newNickname) {
          alert("Nama panggilan tidak boleh kosong!");
          return;
        }

        saveBtn.textContent = "Menyimpan...";
        saveBtn.disabled = true;

        const { error: upsertError } = await supa
          .from('profiles')
          .upsert({ id: user.id, nickname: newNickname });

        saveBtn.textContent = "Simpan";
        saveBtn.disabled = false;

        if (!upsertError) {
          if (greetingText) greetingText.textContent = `Halo, ${newNickname}! 👋`;
          window.closeEditModal(); 
        } else {
          alert("Gagal menyimpan data profil.");
        }
      });
    }

    // --- 6. SISTEM LOGOUT MENYELURUH (DESKTOP & HP) ---
    const handleLogout = async (e) => {
      e.preventDefault();
      e.target.textContent = "Keluar..."; // Indikator loading
      
      await supa.auth.signOut();
      window.location.replace('index.html'); // Hancurkan sesi 100%
    };

    const logoutBtnDesk = document.getElementById('logout-btn');
    const logoutBtnMob = document.getElementById('logout-btn-mobile');
    
    // Hubungkan tombol Desktop dan HP ke sistem Logout yang sama
    if (logoutBtnDesk) logoutBtnDesk.addEventListener('click', handleLogout);
    if (logoutBtnMob) logoutBtnMob.addEventListener('click', handleLogout);

    // --- 7. DUMMY RENDER XP (UNTUK MENCEGAH UI BLANK SEMENTARA) ---
    // Fitur ini akan kita rombak total menggunakan Database di Fase 2
    const totalXp = 450; 
    const maxTierXp = 1000;
    const percentage = Math.min((totalXp / maxTierXp) * 100, 100);
    
    const xpText = document.getElementById('xp-display-text');
    const xpBar = document.getElementById('xp-progress-bar');
    
    if (xpText) xpText.textContent = `${totalXp} XP / ${maxTierXp} XP`;
    if (xpBar) setTimeout(() => { xpBar.style.width = `${percentage}%`; }, 300);

  } catch (err) {
    console.error("Terjadi error sistem:", err);
  }
});
