const supabaseUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
const supabaseKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById('login-form');
  const loginBtn = document.getElementById('login-btn');

  if (!loginForm) return;

  loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const originalText = loginBtn.textContent;
    loginBtn.textContent = 'Memproses...';
    loginBtn.disabled = true;
    
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    try {
      const { error } = await supabaseClient.auth.signInWithPassword({ email, password });
      if (error) throw error;
      
      alert('Login Berhasil! Selamat datang kembali.');
      window.location.href = 'profile.html';
    } catch (error) {
      alert('Gagal Login: ' + error.message);
    } finally {
      loginBtn.textContent = originalText;
      loginBtn.disabled = false;
    }
  });
});