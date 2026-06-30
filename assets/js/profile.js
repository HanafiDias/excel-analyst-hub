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
  if (!window.supabase) return;
  
  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  try {
    // --- 1. CEK SESI USER ---
    const { data: { session } } = await supa.auth.getSession();
    if (!session) {
      window.location.replace('login.html');
      return;
    }

    const user = session.user;
    const emailDisplay = document.getElementById('info-email'); 
    if (emailDisplay) emailDisplay.textContent = user.email;

    // --- CEK APAKAH USER BARU SELESAI PROSES PEMBAYARAN ---
    const urlParams = new URLSearchParams(window.location.search);
    const paymentStatus = urlParams.get('payment');

    if (paymentStatus === 'success' || paymentStatus === 'pending') {
      const banner = document.getElementById('payment-status-banner');
      const bannerText = document.getElementById('payment-status-text');
      const bannerSpinner = document.getElementById('payment-status-spinner');

      if (banner && bannerText) {
        banner.style.display = 'flex';
        banner.style.background = 'rgba(245, 158, 11, 0.1)';
        banner.style.border = '1px solid rgba(245, 158, 11, 0.3)';
        banner.style.color = '#f59e0b';
        bannerText.textContent = 'Memproses konfirmasi pembayaran Anda...';

        let attempts = 0;
        const maxAttempts = 10;

        const pollInterval = setInterval(async () => {
          attempts++;

          const { data: pollData } = await supa
            .from('profiles')
            .select('is_premium, subscription_end')
            .eq('id', user.id)
            .maybeSingle();

          const isNowPremium = pollData?.is_premium === true &&
            pollData?.subscription_end &&
            new Date(pollData.subscription_end).getTime() > Date.now();

          if (isNowPremium) {
            clearInterval(pollInterval);
            banner.style.background = 'rgba(16, 185, 129, 0.1)';
            banner.style.border = '1px solid rgba(16, 185, 129, 0.3)';
            banner.style.color = '#10b981';
            if (bannerSpinner) bannerSpinner.style.display = 'none';
            bannerText.textContent = '✅ Pembayaran berhasil! Akses premium Anda sudah aktif.';

            // Bersihkan query param dari URL tanpa reload halaman
            window.history.replaceState({}, document.title, window.location.pathname);

            // Reload data subscription di kartu bawah tanpa reload seluruh halaman
            setTimeout(() => location.reload(), 1500);

          } else if (attempts >= maxAttempts) {
            clearInterval(pollInterval);
            banner.style.background = 'rgba(239, 68, 68, 0.1)';
            banner.style.border = '1px solid rgba(239, 68, 68, 0.3)';
            banner.style.color = '#ef4444';
            if (bannerSpinner) bannerSpinner.style.display = 'none';
            bannerText.textContent = 'Pembayaran sedang diproses lebih lama dari biasanya. Silakan refresh halaman ini dalam beberapa menit.';
          }
        }, 3000);
      }
    }

    // --- 2. AMBIL DATA PROFIL & XP DARI DATABASE ---
    const { data: profileData } = await supa
      .from('profiles')
      .select('nickname, is_premium, subscription_end, total_xp') // Menarik kolom total_xp
      .eq('id', user.id)
      .maybeSingle(); 

    // --- 3. RENDER NAMA (PATCH XSS) ---
    const greetingText = document.getElementById('greeting-text');
    const nicknameInput = document.getElementById('nickname-input');

    if (profileData && profileData.nickname) {
      if (greetingText) greetingText.textContent = `Halo, ${profileData.nickname}! 👋`;
      if (nicknameInput) nicknameInput.value = profileData.nickname;
    } else {
      const defaultName = user.email.split('@')[0];
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
          subRemainingEl.style.color = "#10b981";
        }
        if (subRenewEl) {
          const options = { day: 'numeric', month: 'long', year: 'numeric' };
          subRenewEl.textContent = endDate.toLocaleDateString('id-ID', options);
        }
      } else {
        if (subRemainingEl) {
          subRemainingEl.textContent = "Kadaluarsa";
          subRemainingEl.style.color = "#ef4444";
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
        if (!newNickname) return alert("Nama panggilan tidak boleh kosong!");

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

    // --- 6. SISTEM LOGOUT MENYELURUH ---
    const handleLogout = async (e) => {
      e.preventDefault();
      e.target.textContent = "Keluar...";
      await supa.auth.signOut();
      window.location.replace('index.html');
    };

    const logoutBtnDesk = document.getElementById('logout-btn');
    const logoutBtnMob = document.getElementById('logout-btn-mobile');
    
    if (logoutBtnDesk) logoutBtnDesk.addEventListener('click', handleLogout);
    if (logoutBtnMob) logoutBtnMob.addEventListener('click', handleLogout);

    // --- 7. RENDER XP DARI DATABASE (CLOUD SINKRONISASI) ---
    // Mengganti angka dummy dengan angka asli dari database Supabase
    const totalXp = profileData?.total_xp || 0; 
    const maxTierXp = 1000;
    const percentage = Math.min((totalXp / maxTierXp) * 100, 100);
    
    const xpText = document.getElementById('xp-display-text');
    const xpBar = document.getElementById('xp-progress-bar');
    
    if (xpText) xpText.textContent = `${totalXp} XP / ${maxTierXp} XP`;
    if (xpBar) setTimeout(() => { xpBar.style.width = `${percentage}%`; }, 300);

    // --- 8. RENDER LENCANA PENCAPAIAN DARI DATABASE ---
    const badgeContainer = document.getElementById('badge-grid-container');
    if (badgeContainer) {
      try {
        const { data: allBadges } = await supa
          .from('badge_definitions')
          .select('badge_key, badge_name, badge_description, icon_emoji, trigger_type, threshold_value')
          .order('trigger_type', { ascending: true })
          .order('threshold_value', { ascending: true });

        const { data: userProgress } = await supa
          .from('user_progress')
          .select('badges_unlocked')
          .eq('user_id', user.id)
          .maybeSingle();

        const unlockedKeys = userProgress?.badges_unlocked || [];

        if (allBadges && allBadges.length) {
          badgeContainer.innerHTML = allBadges.map(badge => {
            const isUnlocked = unlockedKeys.includes(badge.badge_key);
            return `
              <div class="badge-item-box ${isUnlocked ? '' : 'locked'}" id="badge-${badge.badge_key}" title="${badge.badge_description}">
                <div class="badge-icon">${badge.icon_emoji}</div>
                <div class="badge-title">${badge.badge_name}</div>
                <div class="badge-desc">${badge.badge_description}</div>
              </div>
            `;
          }).join('');

          // --- CEK & TAMPILKAN MODAL LENCANA BARU (dari sessionStorage) ---
          const newBadgeKeysRaw = sessionStorage.getItem('eah_new_badges');
          if (newBadgeKeysRaw) {
            sessionStorage.removeItem('eah_new_badges');
            try {
              const newBadgeKeys = JSON.parse(newBadgeKeysRaw);
              const badgesToCelebrate = allBadges.filter(b => newBadgeKeys.includes(b.badge_key));

              if (badgesToCelebrate.length > 0) {
                setTimeout(() => {
                  showBadgeUnlockModal(badgesToCelebrate, 0);
                }, 1800);
              }
            } catch (parseErr) {
              console.error("Gagal parse data lencana baru:", parseErr);
            }
          }
        } else {
          badgeContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; grid-column: 1 / -1;">Belum ada lencana yang tersedia.</p>';
        }
      } catch (badgeErr) {
        console.error("Gagal memuat lencana:", badgeErr);
        badgeContainer.innerHTML = '<p style="color: var(--text-muted); font-size: 0.85rem; grid-column: 1 / -1;">Gagal memuat lencana.</p>';
      }
    }

  } catch (err) {
    console.error("Terjadi error sistem:", err);
  }
});

function spawnConfetti(container) {
  const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#a855f7'];
  container.innerHTML = '';
  for (let i = 0; i < 24; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.background = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 0.4) + 's';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }
}

function showBadgeUnlockModal(badgeList, index) {
  if (index >= badgeList.length) return;

  const badge = badgeList[index];
  const overlay = document.getElementById('badge-unlock-overlay');
  const card = document.getElementById('badge-unlock-card');
  const iconEl = document.getElementById('badge-unlock-icon');
  const nameEl = document.getElementById('badge-unlock-name');
  const descEl = document.getElementById('badge-unlock-desc');
  const closeBtn = document.getElementById('badge-unlock-close-btn');
  const confettiLayer = document.getElementById('badge-confetti-layer');

  if (!overlay) return;

  iconEl.textContent = badge.icon_emoji;
  nameEl.textContent = badge.badge_name;
  descEl.textContent = badge.badge_description;

  overlay.style.display = 'flex';
  spawnConfetti(confettiLayer);

  requestAnimationFrame(() => {
    card.style.transform = 'scale(1)';
    card.style.opacity = '1';
  });

  const closeHandler = () => {
    card.style.transform = 'scale(0.7)';
    card.style.opacity = '0';
    setTimeout(() => {
      overlay.style.display = 'none';
      closeBtn.removeEventListener('click', closeHandler);
      showBadgeUnlockModal(badgeList, index + 1);
    }, 300);
  };

  closeBtn.addEventListener('click', closeHandler);
}
