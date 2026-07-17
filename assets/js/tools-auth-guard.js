/* ============================================
   SHARED AUTH GUARD — untuk semua tool premium 
   di folder tools/*
   Dipanggil dengan 1 baris di tiap tool page.
   ============================================ */
window.EAH_ToolsAuthGuard = async function(redirectPath) {
  if (!window.supabase) return;

  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  try {
    const { data: { session } } = await supa.auth.getSession();

    if (!session) {
      document.body.style.display = 'none';
      alert("🔒 Akses Premium Terkunci!\n\nSilakan Masuk atau Daftar akun terlebih dahulu untuk menggunakan tools interaktif ini.");
      window.location.href = redirectPath;
    }
  } catch (err) {
    console.error("Auth check error:", err);
  }
};
