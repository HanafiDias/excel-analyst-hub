// Inisialisasi Supabase
const supabaseUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
const supabaseKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  try {
    // 1. Cek apakah ada sesi user yang sedang aktif
    const { data: { session }, error } = await supabaseClient.auth.getSession();
    
    if (error) throw error;

    // Cari tombol "Masuk" di navbar (yang link-nya ke login.html)
    const navAuthBtn = document.querySelector('a[href="login.html"].btn-primary, a[href="login.html"].nav-item');
    
    const currentPath = window.location.pathname;

    if (session) {
      // JIKA USER SUDAH LOGIN
      console.log("User terautentikasi:", session.user.email);
      
      // A. Ubah tombol Navbar
      if (navAuthBtn) {
        navAuthBtn.textContent = 'Profil Saya';
        navAuthBtn.href = 'profile.html';
      }

      // B. Proteksi Halaman Auth (User yang sudah login tidak boleh ke halaman login/register)
      if (currentPath.includes('login.html') || currentPath.includes('register.html')) {
        window.location.replace('profile.html');
      }

    } else {
      // JIKA USER BELUM LOGIN
      console.log("Status: Guest / Belum Login");

      // Proteksi Halaman Profil (User belum login mencoba masuk profil)
      if (currentPath.includes('profile.html')) {
        alert('Akses Ditolak: Anda harus login untuk melihat halaman ini.');
        window.location.replace('login.html');
      }
    }
  } catch (err) {
    console.error("Error cek sesi:", err.message);
  }
});
