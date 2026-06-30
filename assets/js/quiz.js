document.addEventListener('DOMContentLoaded', async function() {
  if (!window.supabase) return;
  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);
  
  const { data: { session } } = await supa.auth.getSession();
  if (!session) return;
  
  const user = session.user;
  
  // Format tanggal hari ini (YYYY-MM-DD) yang disesuaikan dengan zona waktu lokal
  const dateObj = new Date();
  const todayStr = new Date(dateObj.getTime() - (dateObj.getTimezoneOffset() * 60000)).toISOString().split('T')[0]; 

  // --- 1. CEK STATUS DAILY CHALLENGE DI DATABASE ---
  const { data: profileData } = await supa
    .from('profiles')
    .select('total_xp, last_daily_quiz')
    .eq('id', user.id)
    .maybeSingle();

  const quizButton = document.getElementById('start-daily-quiz-btn');
  const quizStatusText = document.getElementById('daily-quiz-status');

  // LOGIKA RESET HARIAN: Jika tanggal di DB sama dengan hari ini, berarti kuis sudah dikerjakan
  let hasDoneQuizToday = (profileData && profileData.last_daily_quiz === todayStr);

  if (hasDoneQuizToday) {
    if (quizButton) {
      quizButton.disabled = true;
      quizButton.textContent = "Kuis Selesai";
    }
    if (quizStatusText) quizStatusText.textContent = "Selesai (Kembali besok untuk XP baru!)";
  }

  // --- 2. FUNGSI MENYELESAIKAN KUIS (CLOUD SAVE XP) ---
  // Fungsi global ini bisa dipanggil kapan saja saat user berhasil menyelesaikan kuis
  window.claimQuizXP = async function(earnedXP = 50) {
    if (hasDoneQuizToday) {
      alert("Anda sudah mengklaim XP harian hari ini!");
      return;
    }

    // Efek loading pada tombol yang diklik
    const btn = event ? event.target : null;
    const originalText = btn ? btn.textContent : "";
    if (btn) {
      btn.disabled = true;
      btn.textContent = "Menyimpan XP ke Cloud...";
    }

    // Ambil badge yang sudah terbuka SEBELUM klaim XP
    const { data: progressBefore } = await supa
      .from('user_progress')
      .select('badges_unlocked')
      .eq('user_id', user.id)
      .maybeSingle();
    const badgesBefore = progressBefore?.badges_unlocked || [];

    const currentXP = profileData?.total_xp || 0;
    const newXP = currentXP + earnedXP;

    // Simpan XP ke Supabase & Catat Tanggal Hari Ini agar kuis terkunci
    const { error } = await supa
      .from('profiles')
      .update({ 
        total_xp: newXP,
        last_daily_quiz: todayStr 
      })
      .eq('id', user.id);

    if (!error) {
      // Cek badge baru SESUDAH klaim XP (trigger database sudah jalan otomatis)
      const { data: progressAfter } = await supa
        .from('user_progress')
        .select('badges_unlocked')
        .eq('user_id', user.id)
        .maybeSingle();
      const badgesAfter = progressAfter?.badges_unlocked || [];
      const newlyUnlocked = badgesAfter.filter(key => !badgesBefore.includes(key));

      let badgesToCelebrate = [];
      if (newlyUnlocked.length > 0) {
        const { data: badgeDetails } = await supa
          .from('badge_definitions')
          .select('badge_key, badge_name, badge_description, icon_emoji')
          .in('badge_key', newlyUnlocked);
        badgesToCelebrate = badgeDetails || [];
      }

      alert(`🎉 Selamat! Anda mendapatkan +${earnedXP} XP!`);
      hasDoneQuizToday = true;
      
      if (quizButton) {
        quizButton.disabled = true;
        quizButton.textContent = "Kuis Selesai";
      }
      if (quizStatusText) quizStatusText.textContent = "Selesai (Kembali besok untuk XP baru!)";
      
      if (badgesToCelebrate.length > 0 && window.EAH_Badge) {
        window.EAH_Badge.celebrate(badgesToCelebrate);
        setTimeout(() => {
          window.location.href = "profile.html";
        }, badgesToCelebrate.length * 3500);
      } else {
        // Redirect ke profil agar user bisa melihat progres XP-nya naik
        window.location.href = "profile.html"; 
      }
    } else {
      console.error("Gagal menyimpan XP:", error);
      alert("Terjadi kesalahan saat menyimpan XP ke Cloud.");
      if (btn) {
        btn.disabled = false;
        btn.textContent = originalText;
      }
    }
  };
});
