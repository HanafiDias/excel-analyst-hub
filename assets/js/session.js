// Inisialisasi Supabase
const supabaseUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
const supabaseKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    if (error) throw error;

    const currentPath = window.location.pathname;

    if (session) {
      // JIKA USER SUDAH LOGIN
      console.log("User terautentikasi:", session.user.email);
      
      // 1. Ubah tombol Navbar (Pojok Kanan Atas)
      const navAuthBtn = document.getElementById('nav-auth-btn') || document.querySelector('.nav-right a[href="login.html"]');
      if (navAuthBtn) {
        navAuthBtn.textContent = 'Profil Saya';
        navAuthBtn.href = 'profile.html';
      }

      // 2. Ubah tombol Hero (Mulai Petualangan di Tengah Layar)
      const heroBtn = document.querySelector('.hero-buttons a[href="login.html"]');
      if (heroBtn) {
        heroBtn.innerHTML = 'Lanjutkan Belajar <span aria-hidden="true">→</span>';
        heroBtn.href = 'learn.html'; // Langsung arahkan ke materi
      }

      // 3. Proteksi Halaman Auth (Menendang user yang sudah login dari halaman login)
      if (currentPath.includes('login.html') || currentPath.includes('register.html')) {
        window.location.replace('profile.html');
      }

    } else {
      // JIKA USER BELUM LOGIN
      console.log("Status: Guest / Belum Login");

      // Proteksi Halaman Profil (Menendang tamu dari halaman profil)
      if (currentPath.includes('profile.html')) {
        alert('Akses Ditolak: Anda harus login untuk melihat halaman ini.');
        window.location.replace('login.html');
      }
    }
  } catch (err) {
    console.error("Error cek sesi:", err.message);
  }
});
