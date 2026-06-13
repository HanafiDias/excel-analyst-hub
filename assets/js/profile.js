document.addEventListener('DOMContentLoaded', async function() {
  if (!window.supabase) return;
  
  // Gunakan instance supabase yang sudah diinisialisasi (misal dari session.js atau inisiasi ulang jika perlu)
  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  try {
    // 1. Cek sesi user yang sedang aktif
    const { data: { session } } = await supa.auth.getSession();
    
    if (!session) {
      window.location.href = 'login.html';
      return;
    }

    const user = session.user;
    
    // Tampilkan email sebagai fallback dasar
    const emailDisplay = document.getElementById('user-email-display');
    if (emailDisplay) emailDisplay.innerText = user.email;

    // 2. Ambil data nickname dari tabel 'profiles'
    const { data: profileData, error: fetchError } = await supa
      .from('profiles')
      .select('nickname')
      .eq('id', user.id)
      .single();

    const greetingText = document.getElementById('greeting-text');
    const nicknameInput = document.getElementById('nickname-input');

    if (profileData && profileData.nickname) {
      // Jika nickname sudah diset sebelumnya
      if (greetingText) greetingText.innerText = `Selamat datang, ${profileData.nickname}! 👋`;
      if (nicknameInput) nicknameInput.value = profileData.nickname;
    } else {
      // Jika belum diset, potong nama dari email (sebelum @)
      const defaultName = user.email.split('@')[0];
      if (greetingText) greetingText.innerText = `Selamat datang, ${defaultName}! 👋`;
    }

    // 3. Logika untuk tombol Simpan Perubahan
    const saveBtn = document.getElementById('save-profile-btn');
    if (saveBtn) {
      saveBtn.addEventListener('click', async () => {
        const newNickname = nicknameInput.value.trim();
        
        if (!newNickname) {
          alert("Tolong masukkan nama panggilan yang valid.");
          return;
        }

        // Ubah teks tombol menjadi loading
        const originalText = saveBtn.innerText;
        saveBtn.innerText = "Menyimpan...";
        saveBtn.disabled = true;

        // Upsert data ke tabel profiles (Insert jika baru, Update jika sudah ada)
        const { error: upsertError } = await supa
          .from('profiles')
          .upsert({ 
            id: user.id, 
            nickname: newNickname 
          });

        saveBtn.innerText = originalText;
        saveBtn.disabled = false;

        if (upsertError) {
          console.error("Gagal update profil:", upsertError);
          alert("Terjadi kesalahan saat menyimpan profil. Silakan coba lagi.");
        } else {
          alert("Profil berhasil diperbarui! ✨");
          if (greetingText) greetingText.innerText = `Selamat datang, ${newNickname}! 👋`;
        }
      });
    }

  } catch (err) {
    console.error("Terjadi error di halaman profil:", err);
  }
});
