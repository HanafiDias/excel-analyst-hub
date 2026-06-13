document.addEventListener('DOMContentLoaded', async function() {
  if (!window.supabase) return;
  
  // Inisialisasi Supabase
  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  try {
    const { data: { session } } = await supa.auth.getSession();
    const currentPath = window.location.pathname;

    // Ambil elemen tombol auth di navbar (Desktop & Mobile)
    const navAuthBtn = document.getElementById('nav-auth-btn');
    const mobileAuthBtn = document.getElementById('mobile-auth-btn');

    if (!session) {
      // ==========================================
      // LALUAN 1: JIKA USER BELUM LOGIN (TAMU)
      // ==========================================
      
      // Jika nekat membuka halaman learn.html atau tools.html secara langsung, tendang ke login
      if (currentPath.includes('learn.html') || currentPath.includes('tools.html')) {
        alert("🔒 Akses Terkunci!\n\nSilakan Masuk atau Daftar akun terlebih dahulu untuk mengakses fitur ini.");
        window.location.href = 'login.html';
        return;
      }

      // Cegat klik tombol premium khusus di halaman Beranda (index.html)
      if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('')) {
        const protectedLinks = document.querySelectorAll('a[href^="learn.html"], a[href^="tools.html"], #tools-teaser a, #paths a, #interactive-tools a');
        
        protectedLinks.forEach(link => {
          if (link.getAttribute('href') === '#paths') return; // Pengecualian scroll silabus

          link.addEventListener('click', function(e) {
            e.preventDefault();
            alert("🔒 Akses Fitur Terkunci!\n\nSilakan Masuk atau Daftar akun terlebih dahulu untuk menggunakan tools interaktif dan mengakses materi.");
            window.location.href = 'login.html';
          });
        });
      }

    } else {
      // ==========================================
      // LALUAN 2: JIKA USER SUDAH LOGIN
      // ==========================================
      const user = session.user;

      // 1. Ubah tombol "Masuk / Profil" di Navbar Desktop menjadi "👤 Profil Saya"
      if (navAuthBtn) {
        navAuthBtn.href = "profile.html";
        navAuthBtn.innerHTML = "👤 Profil Saya";
      }

      // 2. Ubah tombol "Masuk / Profil" di Navbar Mobile menjadi "👤 Profil Saya"
      if (mobileAuthBtn) {
        mobileAuthBtn.href = "profile.html";
        mobileAuthBtn.innerHTML = "👤 Profil Saya";
      }

      // 3. Ubah tombol "Mulai Petualangan" khusus di Hero Beranda
      if (currentPath.includes('index.html') || currentPath === '/' || currentPath.endsWith('')) {
        const btnHero = document.querySelector('.hero-buttons a[href="login.html"]');
        if (btnHero) {
          btnHero.href = "learn.html";
          btnHero.innerHTML = "Lanjutkan Belajar <span aria-hidden=\"true\">→</span>";
        }
      }
    }
  } catch (err) {
    console.error("Auth system error:", err);
  }
});
