const supabaseUrl = '[https://laowissohsnhfsbiwcpd.supabase.co](https://laowissohsnhfsbiwcpd.supabase.co)';
const supabaseKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const registerForm = document.getElementById('register-form');
  const registerBtn = document.getElementById('register-btn');

  if (!registerForm) return;

  registerForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalText = registerBtn.textContent;
    registerBtn.textContent = 'Mendaftarkan...';
    registerBtn.disabled = true;

    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    try {
      const { error } = await supabaseClient.auth.signUp({ email, password });
      if (error) throw error;

      alert('Pendaftaran Berhasil! Silakan Login menggunakan akun tersebut.');
      window.location.href = 'login.html';
    } catch (error) {
      alert('Gagal Daftar: ' + error.message);
    } finally {
      registerBtn.textContent = originalText;
      registerBtn.disabled = false;
    }
  });
});