// 1. Inisialisasi Supabase
const supabaseUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
const supabaseKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

// 2. BUNGKUSAN WAJIB: Tunggu HTML selesai dirender
document.addEventListener("DOMContentLoaded", () => {
  let isLoginMode = true;
  const form = document.getElementById('auth-form');
  const title = document.getElementById('auth-title');
  const subtitle = document.getElementById('auth-subtitle');
  const submitBtn = document.getElementById('auth-submit');
  const toggleBtn = document.getElementById('auth-toggle-btn');
  const toggleText = document.getElementById('auth-toggle-text');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');

  if (!toggleBtn) return; // Hentikan jika tombol tidak ada

  // 3. Fungsi Toggle
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    isLoginMode = !isLoginMode;

    if (isLoginMode) {
      title.textContent = 'Masuk ke Akun';
      subtitle.textContent = 'Lanjutkan petualangan belajarmu';
      submitBtn.textContent = 'Login Sekarang';
      toggleText.textContent = 'Belum punya akun Premium?';
      toggleBtn.textContent = 'Daftar di sini';
    } else {
      title.textContent = 'Daftar Akun Premium';
      subtitle.textContent = 'Mulai bangun karir Data Analyst Anda';
      submitBtn.textContent = 'Daftar Sekarang';
      toggleText.textContent = 'Sudah punya akun?';
      toggleBtn.textContent = 'Login di sini';
    }
  });

  // 4. Fungsi Utama Login & Register
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = emailInput.value;
    const password = passwordInput.value;

    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = 'Memproses...';
    submitBtn.disabled = true;

    try {
      if (isLoginMode) {
        const { error } = await supabase.auth.signInWithPassword({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert('Login berhasil! Selamat datang kembali.');
        window.location.href = 'profile.html';

      } else {
        const { error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
        if (error) throw error;
        alert('Pendaftaran berhasil! Anda sekarang bisa Login menggunakan akun tersebut.');
        toggleBtn.click();
        passwordInput.value = '';
      }
    } catch (error) {
      alert('Terjadi kesalahan: ' + error.message);
    } finally {
      submitBtn.textContent = originalBtnText;
      submitBtn.disabled = false;
    }
  });
});