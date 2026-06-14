document.addEventListener('DOMContentLoaded', async function() {
  if (!window.supabase) {
    console.error("Library Supabase belum dimuat!");
    return;
  }

  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  const protectedPages = ['learn.html', 'portfolio.html', 'tools.html', 'profile.html'];
  
  // Deteksi Nama File Akurat
  let path = window.location.pathname;
  let currentPage = path.substring(path.lastIndexOf('/') + 1).split('?')[0].split('#')[0];
  if (currentPage === '' || currentPage === '/') currentPage = 'index.html'; 

  const isProtectedPage = protectedPages.includes(currentPage);

  // Jurus Anti-Mengintip (Sembunyikan Halaman Rahasia Dulu)
  if (isProtectedPage) {
    document.body.style.display = 'none'; 
  }

  // 1. CEK SESI USER
  const { data: { session } } = await supa.auth.getSession();

  // === FUNGSI UBAH NAVBAR GLOBAL (Berlaku di Semua Halaman) ===
  const navAuthBtn = document.getElementById('nav-auth-btn');
  const mobileAuthBtn = document.getElementById('mobile-auth-btn');

  if (session) {
    if (navAuthBtn) {
      navAuthBtn.innerText = 'Dashboard Profil';
      navAuthBtn.href = 'profile.html';
    }
    if (mobileAuthBtn) {
      mobileAuthBtn.innerText = 'Dashboard Profil';
      mobileAuthBtn.href = 'profile.html';
    }
  }
  // ============================================================

  // Jika Tamu Mencoba Masuk Halaman Rahasia
  if (!session && isProtectedPage) {
    window.location.href = 'register.html';
    return;
  }

  // Jika Punya Akun & Masuk Halaman Rahasia, Cek Kasta Premium
  if (session && isProtectedPage) {
    try {
      const { data: profile } = await supa
        .from('profiles')
        .select('is_premium, subscription_end')
        .eq('id', session.user.id)
        .maybeSingle();

      const isPremium = profile?.is_premium;
      const subEnd = profile?.subscription_end ? new Date(profile.subscription_end) : null;
      const today = new Date();

      // LOGIKA PEMBLOKIRAN
      if (!isPremium || (subEnd && subEnd < today)) {
        if (currentPage !== 'profile.html') {
          alert("Akses Terkunci! 🔒\nAnda belum mengaktifkan paket Premium atau masa aktif habis.");
          window.location.href = 'pricing.html';
          return; 
        }
      }

      // Lolos! Buka kembali layarnya
      document.body.style.display = 'block';

    } catch (err) {
      console.error("Gagal mengecek status premium:", err);
      window.location.href = 'index.html'; 
    }
  } else if (!isProtectedPage) {
    // Pastikan halaman tidak rahasia (seperti index.html) tidak pernah di-hidden
    document.body.style.display = 'block';
  }
});
