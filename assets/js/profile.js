// Fungsi Kontrol Modal
function openEditModal() {
  const modal = document.getElementById('edit-modal');
  if (modal) modal.classList.add('active');
}

function closeEditModal() {
  const modal = document.getElementById('edit-modal');
  if (modal) modal.classList.remove('active');
}

document.addEventListener('DOMContentLoaded', async function() {
  if (!window.supabase) {
    console.error("Library Supabase tidak termuat!");
    document.getElementById('greeting-text').innerText = "Gagal memuat sistem.";
    return;
  }
  
  // Inisialisasi Supabase
  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  try {
    // 1. Cek sesi user
    const { data: { session }, error: sessionError } = await supa.auth.getSession();
    
    if (!session) {
      window.location.href = 'login.html'; // Usir ke login kalau belum masuk
      return;
    }

    const user = session.user;
    
    // Tampilkan email di UI
    const emailDisplay = document.getElementById('user-email-display');
    if (emailDisplay) emailDisplay.innerText = user.email;

    // 2. AMBIL DATA PROFIL (BUG FIXED: Gunakan maybeSingle)
    const { data: profileData, error: fetchError } = await supa
      .from('profiles')
      .select('nickname')
      .eq('id', user.id)
      .maybeSingle(); // Ini kunci rahasianya agar tidak crash saat tabel kosong!

    const greetingText = document.getElementById('greeting-text');
    const nicknameInput = document.getElementById('nickname-input');

    // Cek apakah data nickname ada
    if (profileData && profileData.nickname) {
      if (greetingText) greetingText.innerText = `Halo, ${profileData.nickname}! 👋`;
      if (nicknameInput) nicknameInput.value = profileData.nickname;
    } else {
      // Fallback: Ambil nama dari potongan email
      const defaultName = user.email.split('@')[0];
      if (greetingText) greetingText.innerText = `Halo, ${defaultName}! 👋`;
    }

    // 3. Logika Tombol Simpan
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const newNickname = nicknameInput.value.trim();
        
        if (!newNickname) {
          alert("Tolong masukkan nama panggilan!");
          return;
        }

        // Efek loading tombol
        saveBtn.innerText = "Menyimpan...";
        saveBtn.disabled = true;

        // Upsert data ke tabel
        const { error: upsertError } = await supa
          .from('profiles')
          .upsert({ 
            id: user.id, 
            nickname: newNickname 
          });

        // Kembalikan tombol
        saveBtn.innerText = "Simpan";
        saveBtn.disabled = false;

        if (upsertError) {
          console.error("Error upsert:", upsertError);
          alert("Gagal menyimpan profil. Cek console log.");
        } else {
          // Berhasil! Update UI dan tutup modal
          if (greetingText) greetingText.innerText = `Halo, ${newNickname}! 👋`;
          closeEditModal(); 
        }
      });
    }

  } catch (err) {
    console.error("Terjadi error fatal:", err);
    document.getElementById('greeting-text').innerText = "Terjadi Kesalahan";
  }
});
