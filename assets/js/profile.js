const supabaseUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
const supabaseKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
const supabaseClient = window.supabase.createClient(supabaseUrl, supabaseKey);

document.addEventListener("DOMContentLoaded", async () => {
  const emailEl = document.getElementById('user-email');
  const levelEl = document.getElementById('user-level');
  const xpEl = document.getElementById('user-xp');
  const statusEl = document.getElementById('user-status');
  const logoutBtn = document.getElementById('logout-btn');

  try {
    // 1. Ambil data sesi user yang sedang login
    const { data: { session }, error: sessionError } = await supabaseClient.auth.getSession();
    
    if (sessionError || !session) {
      window.location.replace('login.html'); // Tendang ke login jika tidak ada sesi
      return;
    }

    const user = session.user;
    emailEl.textContent = user.email;

    // 2. Ambil progres dari tabel user_progress
    const { data: progress, error: dbError } = await supabaseClient
      .from('user_progress')
      .select('total_xp, current_level, is_premium')
      .eq('user_id', user.id)
      .single();

    if (dbError) throw dbError;

    // 3. Tampilkan data ke HTML
    if (progress) {
      levelEl.textContent = progress.current_level || 'Pemula';
      xpEl.textContent = (progress.total_xp || 0) + ' XP';
      
      if (progress.is_premium) {
        statusEl.textContent = '🌟 Premium';
        statusEl.style.color = 'var(--accent)';
      } else {
        statusEl.textContent = 'Free Plan';
        statusEl.style.color = 'var(--text-muted)';
      }
    }

  } catch (err) {
    console.error("Gagal memuat profil:", err.message);
    alert("Gagal memuat data profil. Silakan refresh halaman.");
  }

  // 4. Fungsi Logout
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async () => {
      const confirmLogout = confirm("Apakah Anda yakin ingin keluar?");
      if (confirmLogout) {
        logoutBtn.textContent = 'Keluar...';
        await supabaseClient.auth.signOut();
        window.location.replace('login.html');
      }
    });
  }
});
