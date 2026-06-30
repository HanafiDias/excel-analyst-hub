// ==========================================
// SISTEM MODAL LENCANA PENCAPAIAN (GLOBAL)
// Bisa dipanggil dari halaman manapun yang load main.js
// ==========================================
window.EAH_Badge = (function () {
  let injected = false;

  function injectModalHTML() {
    if (injected) return;
    injected = true;

    const style = document.createElement('style');
    style.textContent = `
      @media (max-width: 480px) {
        #badge-unlock-card { padding: 24px 18px; }
        #badge-unlock-icon-wrap { width: 90px !important; height: 90px !important; }
        #badge-unlock-icon { font-size: 3rem !important; }
        #badge-unlock-name { font-size: 1.15rem !important; }
      }
      @media (prefers-reduced-motion: reduce) {
        #badge-unlock-card, #badge-unlock-icon, #badge-glow-1, #badge-glow-2 {
          animation: none !important;
          transition: opacity 0.2s ease !important;
        }
      }
    `;
    document.head.appendChild(style);

    const overlay = document.createElement('div');
    overlay.id = 'badge-unlock-overlay';
    overlay.style.cssText = 'display:none; position:fixed; inset:0; background:rgba(15,23,42,0.75); z-index:9999; align-items:center; justify-content:center; padding:20px;';
    overlay.innerHTML = `
      <div id="badge-unlock-card" style="background:linear-gradient(160deg, #1e293b, #0f172a); border:1px solid rgba(59,130,246,0.4); border-radius:20px; max-width:380px; width:100%; padding:32px 24px; text-align:center; position:relative; overflow:visible; transform:scale(0.4) rotate(-8deg); opacity:0;">
        <div id="badge-confetti-layer" style="position:absolute; inset:0; pointer-events:none; overflow:hidden; border-radius:20px;"></div>
        <p style="color:#f59e0b; font-size:0.8rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase; margin:0 0 10px; position:relative; z-index:2;">Lencana Baru Terbuka!</p>
        <div id="badge-unlock-icon-wrap" style="position:relative; width:110px; height:110px; margin:0 auto 14px; display:flex; align-items:center; justify-content:center;">
          <div id="badge-glow-1" style="position:absolute; inset:0; border-radius:50%; background:radial-gradient(circle, rgba(245,158,11,0.5), transparent 70%); opacity:0;"></div>
          <div id="badge-glow-2" style="position:absolute; inset:8px; border-radius:50%; border:2px solid rgba(245,158,11,0.6); opacity:0;"></div>
          <div id="badge-unlock-icon" style="font-size:3.6rem; position:relative; z-index:2; transform:scale(0);">🏆</div>
        </div>
        <h3 id="badge-unlock-name" style="color:#fff; font-size:1.35rem; font-weight:700; margin:6px 0 6px; position:relative; z-index:2; opacity:0; transform:translateY(8px);">Nama Lencana</h3>
        <p id="badge-unlock-desc" style="color:#94a3b8; font-size:0.88rem; margin:0 0 22px; line-height:1.5; position:relative; z-index:2; opacity:0; transform:translateY(8px);">Deskripsi lencana</p>
        <button type="button" id="badge-unlock-close-btn" style="background:linear-gradient(135deg,#3b82f6,#2563eb); color:#fff; border:none; padding:12px 32px; border-radius:10px; font-size:0.95rem; font-weight:600; cursor:pointer; width:100%; position:relative; z-index:2; opacity:0;">Lanjutkan Belajar</button>
      </div>
    `;
    document.body.appendChild(overlay);
  }

  function spawnConfetti(container) {
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ec4899', '#a855f7', '#fbbf24'];
    container.innerHTML = '';
    for (let i = 0; i < 36; i++) {
      const piece = document.createElement('div');
      const isStrip = Math.random() > 0.6;
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = isStrip ? '4px' : (6 + Math.random() * 5) + 'px';
      piece.style.cssText = `position:absolute; top:-16px; left:${Math.random() * 100}%; width:${size}; height:${isStrip ? (9 + Math.random() * 8) + 'px' : size}; background:${color}; border-radius:${isStrip ? '2px' : (Math.random() > 0.5 ? '50%' : '2px')};`;
      const fallDuration = 1.3 + Math.random() * 1.1;
      const delay = Math.random() * 0.4;
      const drift = (Math.random() - 0.5) * 100;
      const rotation = 300 + Math.random() * 360;
      piece.animate([
        { transform: 'translate(0,0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${drift}px, 360px) rotate(${rotation}deg)`, opacity: 0 }
      ], { duration: fallDuration * 1000, delay: delay * 1000, easing: 'cubic-bezier(0.4,0,0.6,1)', fill: 'forwards' });
      container.appendChild(piece);
    }
  }

  function burstParticles(originEl) {
    const rect = originEl.getBoundingClientRect();
    const colors = ['#f59e0b', '#fbbf24', '#fff'];
    for (let i = 0; i < 14; i++) {
      const p = document.createElement('div');
      const angle = (i / 14) * Math.PI * 2;
      const dist = 55 + Math.random() * 45;
      const tx = Math.cos(angle) * dist;
      const ty = Math.sin(angle) * dist;
      p.style.cssText = `position:fixed; left:${rect.left + rect.width / 2}px; top:${rect.top + rect.height / 2}px; width:6px; height:6px; border-radius:50%; background:${colors[Math.floor(Math.random() * colors.length)]}; z-index:10000; pointer-events:none;`;
      document.body.appendChild(p);
      p.animate([
        { transform: 'translate(0,0) scale(1)', opacity: 1 },
        { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
      ], { duration: 550 + Math.random() * 250, easing: 'cubic-bezier(0.2,0.8,0.3,1)', fill: 'forwards' });
      setTimeout(() => p.remove(), 900);
    }
  }

  function showQueue(badgeList, index) {
    if (index >= badgeList.length) return;

    const badge = badgeList[index];
    const overlay = document.getElementById('badge-unlock-overlay');
    const card = document.getElementById('badge-unlock-card');
    const iconEl = document.getElementById('badge-unlock-icon');
    const nameEl = document.getElementById('badge-unlock-name');
    const descEl = document.getElementById('badge-unlock-desc');
    const closeBtn = document.getElementById('badge-unlock-close-btn');
    const confettiLayer = document.getElementById('badge-confetti-layer');
    const glow1 = document.getElementById('badge-glow-1');
    const glow2 = document.getElementById('badge-glow-2');

    if (!overlay) return;

    const reducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    iconEl.textContent = badge.icon_emoji;
    nameEl.textContent = badge.badge_name;
    descEl.textContent = badge.badge_description;

    card.style.transform = 'scale(0.4) rotate(-8deg)';
    card.style.opacity = '0';
    iconEl.style.transform = 'scale(0)';
    nameEl.style.opacity = '0';
    nameEl.style.transform = 'translateY(8px)';
    descEl.style.opacity = '0';
    descEl.style.transform = 'translateY(8px)';
    closeBtn.style.opacity = '0';
    glow1.style.opacity = '0';
    glow2.style.opacity = '0';

    overlay.style.display = 'flex';

    if (!reducedMotion) spawnConfetti(confettiLayer);

    requestAnimationFrame(() => {
      card.style.transition = reducedMotion ? 'opacity 0.2s ease' : 'transform 0.65s cubic-bezier(0.34,1.56,0.64,1), opacity 0.4s ease';
      card.style.transform = 'scale(1) rotate(0deg)';
      card.style.opacity = '1';
    });

    setTimeout(() => {
      glow1.style.transition = 'opacity 0.3s ease';
      glow1.style.opacity = '1';
      glow2.style.transition = 'opacity 0.3s ease';
      glow2.style.opacity = '1';

      if (!reducedMotion) {
        glow1.animate([
          { transform: 'scale(0.8)', opacity: 0.7 },
          { transform: 'scale(1.3)', opacity: 0.3 },
          { transform: 'scale(0.8)', opacity: 0.7 }
        ], { duration: 2000, iterations: Infinity, easing: 'ease-in-out' });
        glow2.animate([
          { transform: 'scale(1)', opacity: 0.6 },
          { transform: 'scale(1.5)', opacity: 0 }
        ], { duration: 1500, iterations: Infinity, easing: 'ease-out' });
      }

      iconEl.style.transition = reducedMotion ? 'opacity 0.2s ease' : 'transform 0.55s cubic-bezier(0.34,1.75,0.64,1)';
      iconEl.style.transform = 'scale(1)';
      iconEl.style.opacity = '1';

      if (!reducedMotion) {
        setTimeout(() => burstParticles(iconEl), 250);
      }
    }, 350);

    setTimeout(() => {
      nameEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      nameEl.style.opacity = '1';
      nameEl.style.transform = 'translateY(0)';
    }, 750);

    setTimeout(() => {
      descEl.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      descEl.style.opacity = '1';
      descEl.style.transform = 'translateY(0)';
    }, 900);

    setTimeout(() => {
      closeBtn.style.transition = 'opacity 0.4s ease';
      closeBtn.style.opacity = '1';
    }, 1050);

    const closeHandler = () => {
      card.style.transition = 'transform 0.3s ease, opacity 0.3s ease';
      card.style.transform = 'scale(0.7)';
      card.style.opacity = '0';
      setTimeout(() => {
        overlay.style.display = 'none';
        closeBtn.removeEventListener('click', closeHandler);
        showQueue(badgeList, index + 1);
      }, 300);
    };

    closeBtn.addEventListener('click', closeHandler);
  }

  // Fungsi publik: panggil ini untuk menampilkan modal lencana baru
  // badgeList: array of { badge_key, badge_name, badge_description, icon_emoji }
  function celebrate(badgeList) {
    if (!badgeList || badgeList.length === 0) return;
    injectModalHTML();
    showQueue(badgeList, 0);
  }

  return { celebrate: celebrate };
})();

/* ============================================
   EXCEL ANALYST HUB — SHARED UTILITIES
   main.js: Nav detection, mobile menu, stat counters,
            scroll effects, smooth scroll, IntersectionObserver
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     1. ACTIVE NAV LINK BY PAGE
  ------------------------------------------ */
  function initActiveNav() {
    const page = location.pathname.split('/').pop() || 'index.html';
    const allLinks = document.querySelectorAll('.nav-links a, .nav-menu-mobile a');
    allLinks.forEach(function (a) {
      const href = a.getAttribute('href');
      if (href === page || (page === '' && href === 'index.html')) {
        a.classList.add('active');
      }
    });
  }

  /* ------------------------------------------
     2. MOBILE HAMBURGER MENU
  ------------------------------------------ */
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.nav-menu-mobile');
    if (!hamburger || !mobileMenu) return;

    hamburger.addEventListener('click', function () {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
    });

    // Close menu on link click
    mobileMenu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      });
    });

    // Close on outside click
    document.addEventListener('click', function (e) {
      if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
        mobileMenu.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ------------------------------------------
     3. STAT COUNTER ANIMATION
  ------------------------------------------ */
  function animateCounter(el) {
    var target = parseFloat(el.dataset.target) || 0;
    var suffix = el.dataset.suffix || '';
    var prefix = el.dataset.prefix || '';
    var duration = 1600;
    var startTime = null;

    function easeOut(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function tick(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      var value = easeOut(progress) * target;

      // Format: if target is whole number, show integer; else show 1 decimal
      var display = Number.isInteger(target) ? Math.floor(value) : value.toFixed(1);
      el.textContent = prefix + display + suffix;

      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        el.textContent = prefix + target + suffix;
      }
    }

    requestAnimationFrame(tick);
  }

  function initCounters() {
    var counters = document.querySelectorAll('[data-counter]');
    if (!counters.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -20px 0px" });

    counters.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------
     4. SCROLL-TRIGGERED FADE-IN
  ------------------------------------------ */
  function initFadeIn() {
    var fadeEls = document.querySelectorAll('.fade-in');
    if (!fadeEls.length) return;

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------
     5. SMOOTH SCROLL FOR ANCHOR LINKS
  ------------------------------------------ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (a) {
      a.addEventListener('click', function (e) {
        var targetId = a.getAttribute('href');
        if (targetId === '#') return;
        var target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      });
    });
  }

  /* ------------------------------------------
     6. COPY TO CLIPBOARD UTILITY
  ------------------------------------------ */
  window.copyToClipboard = function (text, btn, successText) {
    successText = successText || 'Copied!';
    var original = btn.textContent;
    navigator.clipboard.writeText(text).then(function () {
      btn.textContent = successText;
      btn.classList.add('copied');
      setTimeout(function () {
        btn.textContent = original;
        btn.classList.remove('copied');
      }, 2000);
    }).catch(function () {
      // Fallback for older browsers
      var ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      btn.textContent = successText;
      setTimeout(function () { btn.textContent = original; }, 2000);
    });
  };

  /* ------------------------------------------
     7. TRACK SECTIONS — EXPAND/COLLAPSE (learn.html)
  ------------------------------------------ */
  function initTrackSections() {
    var headers = document.querySelectorAll('.track-section-header');
    headers.forEach(function (header) {
      header.addEventListener('click', function () {
        var section = header.closest('.track-section');
        var isExpanded = section.classList.toggle('expanded');
        header.setAttribute('aria-expanded', String(isExpanded));
      });

      header.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          var section = header.closest('.track-section');
          var isExpanded = section.classList.toggle('expanded');
          header.setAttribute('aria-expanded', String(isExpanded));
        }
      });
    });

    // Expand all by default on learn page
    document.querySelectorAll('.track-section').forEach(function (section) {
      section.classList.add('expanded');
    });
  }

  /* ------------------------------------------
     8. PROGRESS TRACKING (localStorage)
  ------------------------------------------ */
  var PROGRESS_KEY = 'eah_progress';

  window.EAH = window.EAH || {};

  window.EAH.saveProgressToCloud = async function (topicId) {
    if (!window.supabase) return;
    const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
    const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
    const supa = window.supabase.createClient(supaUrl, supaKey);

    try {
      const { data: { session } } = await supa.auth.getSession();
      if (!session) return; // Skip jika user belum login

      const userId = session.user.id;

      const { data: currentData, error: fetchError } = await supa
        .from('user_progress')
        .select('total_xp')
        .eq('user_id', userId)
        .single();

      if (!fetchError && currentData) {
        const newXp = (currentData.total_xp || 0) + 100; // Hadiah 100 XP per materi selesai

        // Logika Level Up Otomatis
        let newLevel = 'Pemula';
        if (newXp >= 150) newLevel = 'Menengah';
        if (newXp >= 500) newLevel = 'Lanjutan';
        if (newXp >= 1000) newLevel = 'Master';

        await supa
          .from('user_progress')
          .update({ total_xp: newXp, current_level: newLevel })
          .eq('user_id', userId);

        console.log("☁️ Berhasil menyimpan +100 XP ke Database Supabase!");
      }
    } catch (err) {
      console.error("Gagal sinkronisasi ke cloud:", err);
    }
  };

  /* ------------------------------------------
     UNIFIED STATE MANAGER
  ------------------------------------------ */
  var STATE_KEY = 'eah_unified_state';

  window.EAH.getState = function () {
    try {
      return JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  };

  window.EAH.setState = function (updates) {
    var current = window.EAH.getState();
    var merged = Object.assign({}, current, updates);
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(merged));
    } catch (e) { }
    return merged;
  };

  window.EAH.getTotalXP = function () {
    return window.EAH.getState().totalXP || 0;
  };

  window.EAH.addXP = function (amount, caseKey) {
    var state = window.EAH.getState();
    var completed = state.completedCases || [];
    if (completed.indexOf(caseKey) !== -1) return false; // already awarded
    completed.push(caseKey);
    window.EAH.setState({
      totalXP: (state.totalXP || 0) + amount,
      completedCases: completed
    });
    return true;
  };

  window.EAH.getChallengeState = function () {
    return window.EAH.getState().challenges || {};
  };

  window.EAH.markChallengeComplete = function (id) {
    var challenges = window.EAH.getChallengeState();
    challenges[id] = true;
    window.EAH.setState({ challenges: challenges });
  };

  window.EAH.getProgress = function () {
    try {
      return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '{}');
    } catch (e) {
      return {};
    }
  };

  window.EAH.setTopicStatus = function (topicId, status) {
    var p = window.EAH.getProgress();
    p[topicId] = status;
    localStorage.setItem(PROGRESS_KEY, JSON.stringify(p));
  };

  window.EAH.markVisited = function (topicId) {
    var p = window.EAH.getProgress();
    if (!p[topicId]) {
      window.EAH.setTopicStatus(topicId, 'in-progress');
    }
  };

  window.EAH.renderProgress = function () {
    var progress = window.EAH.getProgress();

    // Update each topic card status indicator AND Button visual states
    document.querySelectorAll('.topic-card').forEach(function (card) {
      var id = card.dataset.topicId;
      if (!id) return;
      var status = progress[id] || 'not-started';

      // A. Update the text label (Belum Dimulai / Selesai)
      var statusEl = card.querySelector('.topic-status');
      if (statusEl) {
        statusEl.dataset.status = status;
        if (status === 'done') {
          statusEl.textContent = '✓ Selesai';
        } else if (status === 'in-progress') {
          statusEl.textContent = '● Sedang Dipelajari';
        } else {
          statusEl.textContent = '○ Belum Dimulai';
        }
      }

      // B. FORCE UPDATE THE ACTION BUTTON (3 States: Done, Locked, Ready)
      var markBtn = card.querySelector('.btn-mark-done');
      if (markBtn) {
        if (status === 'done') {
          markBtn.style.background = 'rgba(16, 185, 129, 0.1)';
          markBtn.style.borderColor = '#10b981';
          markBtn.style.color = '#10b981';
          markBtn.innerHTML = '✅ Selesai';
          markBtn.title = 'Klik untuk membatalkan status selesai';
        } else if (status === 'not-started') {
          // STATE BARU: Terkunci (Belum Dibaca)
          markBtn.style.background = 'var(--surface-2)';
          markBtn.style.borderColor = 'var(--border)';
          markBtn.style.color = 'var(--text-muted)';
          markBtn.style.opacity = '0.7';
          markBtn.innerHTML = '🔒 Baca Dulu';
          markBtn.title = 'Klik Mulai untuk membaca materi terlebih dahulu';
        } else {
          // STATE: In-Progress / Siap Kuis
          markBtn.style.background = 'transparent';
          markBtn.style.borderColor = 'var(--border)';
          markBtn.style.color = 'var(--text-muted)';
          markBtn.style.opacity = '1';
          markBtn.innerHTML = '📝 Kerjakan Kuis';
          markBtn.title = 'Klik untuk mengerjakan materi';
        }
      }
    });

    // Update progress bars per track
    document.querySelectorAll('[data-track]').forEach(function (track) {
      var cards = track.querySelectorAll('.topic-card');
      var ids = Array.from(cards).map(function (c) { return c.dataset.topicId; }).filter(Boolean);
      if (!ids.length) return;
      var done = ids.filter(function (id) { return progress[id] === 'done'; }).length;
      var pct = Math.round((done / ids.length) * 100);

      var fill = track.querySelector('.progress-fill');
      var label = track.querySelector('.progress-label');
      if (fill) {
        fill.style.width = pct + '%';
        if (pct === 100) {
          fill.style.background = '#10b981';
          // Tambahkan glow pada wadah luarnya (parent) agar tidak terpotong overflow:hidden
          fill.parentElement.classList.add('progress-glow');
        } else {
          fill.parentElement.classList.remove('progress-glow');
        }
      }
      if (label) label.textContent = done + '/' + ids.length + ' selesai';
    });
  };

  /* ------------------------------------------
     QUIZ DATABASE (Centralized)
  ------------------------------------------ */
  var KNOWLEDGE_CHECKS = {
    // JALUR PEMULA
    'excel-interface': {
      q: 'Di mana tempat berkumpulnya semua menu dan tombol perintah (seperti Home, Insert, Data) di Excel?',
      options: [
        { text: 'A. Formula Bar', correct: false },
        { text: 'B. The Ribbon', correct: true },
        { text: 'C. Name Box', correct: false }
      ],
      success: '✨ Benar! Ribbon adalah pusat navigasi utama di bagian atas Excel.', fail: '❌ Kurang tepat. Coba ingat area besar di atas jendela Excel.'
    },
    'basic-formulas': {
      q: 'Manakah penulisan formula yang paling tepat dan efisien untuk menjumlahkan angka dari sel A1 hingga A10?',
      options: [
        { text: 'A. =A1+A2+A3+A4+A5+A6+A7+A8+A9+A10', correct: false },
        { text: 'B. =SUM(A1:A10)', correct: true },
        { text: 'C. =TOTAL(A1-A10)', correct: false }
      ],
      success: '✨ Benar! =SUM() adalah cara standar dan tercepat untuk menjumlahkan rentang sel.', fail: '❌ Kurang tepat. Gunakan fungsi SUM bawaan Excel.'
    },
    'cell-formatting': {
      q: 'Apa fungsi utama dari fitur "Merge & Center"?',
      options: [
        { text: 'A. Menggabungkan beberapa sel menjadi satu dan menengahkan teksnya.', correct: true },
        { text: 'B. Menjumlahkan angka dan membaginya (rata-rata).', correct: false },
        { text: 'C. Mengubah teks menjadi huruf kapital.', correct: false }
      ],
      success: '✨ Benar! Sangat berguna untuk membuat judul tabel.', fail: '❌ Salah. Fitur ini berhubungan dengan layout sel, bukan kalkulasi.'
    },
    'conditional-formatting': {
      q: 'Fitur apa yang digunakan untuk memberi warna merah secara otomatis pada sel yang nilai penjualannya di bawah target?',
      options: [
        { text: 'A. Format Painter', correct: false },
        { text: 'B. Font Color (Manual)', correct: false },
        { text: 'C. Conditional Formatting', correct: true }
      ],
      success: '✨ Benar! Conditional formatting memberi format berbasis aturan/kondisi otomatis.', fail: '❌ Kurang tepat. Kita butuh fitur yang otomatis berubah jika angkanya berubah.'
    },
    'basic-charts': {
      q: 'Tipe grafik apa yang paling disarankan oleh analis data untuk menunjukkan "Tren dari waktu ke waktu" (misal: Januari - Desember)?',
      options: [
        { text: 'A. Line Chart (Grafik Garis)', correct: true },
        { text: 'B. Pie Chart (Grafik Lingkaran)', correct: false },
        { text: 'C. Scatter Plot', correct: false }
      ],
      success: '✨ Benar! Line chart adalah standar industri untuk melihat tren seiring waktu.', fail: '❌ Salah. Pie chart digunakan untuk komposisi/persentase.'
    },

    // JALUR MENENGAH
    'data-entry': {
      q: 'Bagaimana cara agar baris pertama (Header Tabel) tetap terlihat di layar meskipun kita melakukan scroll data ke bawah?',
      options: [
        { text: 'A. Menggunakan fitur "Freeze Panes".', correct: true },
        { text: 'B. Menggunakan tombol "Lock Cell".', correct: false },
        { text: 'C. Mengubah warna header menjadi tebal (Bold).', correct: false }
      ],
      success: '✨ Benar! Freeze Panes (di tab View) sangat krusial saat membaca dataset besar.', fail: '❌ Kurang tepat. Fokus pada fitur "membekukan" area pandang.'
    },
    'data-cleaning': {
      q: 'Jika teks di kolom A terlihat berantakan karena banyak spasi kosong di awal dan akhirnya, fungsi apa yang wajib kamu gunakan?',
      options: [
        { text: 'A. =CLEAN()', correct: false },
        { text: 'B. =TRIM()', correct: true },
        { text: 'C. =PROPER()', correct: false }
      ],
      success: '✨ Benar! TRIM membersihkan spasi berlebih dari teks.', fail: '❌ Kurang tepat. CLEAN menghapus karakter non-printable, bukan spasi.'
    },
    'vlookup': {
      q: 'Apa kelemahan utama dari VLOOKUP yang bisa diatasi oleh kombinasi INDEX-MATCH?',
      options: [
        { text: 'A. VLOOKUP tidak bisa membaca teks, hanya angka.', correct: false },
        { text: 'B. VLOOKUP memakan ukuran file yang lebih besar.', correct: false },
        { text: 'C. VLOOKUP hanya bisa mencari data ke arah kanan dari kolom acuan (kolom ID).', correct: true }
      ],
      success: '✨ Benar! INDEX-MATCH lebih dinamis karena bisa mencari ke arah kiri dan kanan.', fail: '❌ Kurang tepat. Ingat aturan "Left-to-Right" VLOOKUP.'
    },
    'index-match': {
      q: 'Mengapa analis berpengalaman lebih memilih INDEX-MATCH daripada VLOOKUP?',
      options: [
        { text: 'A. Karena bisa mencari data ke arah kiri dari kolom acuan.', correct: true },
        { text: 'B. Karena lebih mudah ditulis.', correct: false },
        { text: 'C. Karena otomatis menghapus duplikat.', correct: false }
      ],
      success: '✨ Benar! INDEX-MATCH sangat dinamis dan tidak terpengaruh penyisipan kolom.', fail: '❌ Kurang tepat. VLOOKUP terjebak aturan "Left-to-Right".'
    },
    'sumif-countif': {
      q: 'Pada fungsi =SUMIF(range, criteria, sum_range), apa yang seharusnya diisi pada argumen "sum_range"?',
      options: [
        { text: 'A. Kolom teks yang menjadi syarat (Misal: Kolom Cabang).', correct: false },
        { text: 'B. Kolom angka yang ingin dijumlahkan (Misal: Kolom Pendapatan).', correct: true },
        { text: 'C. Kata kunci pencariannya (Misal: "Jakarta").', correct: false }
      ],
      success: '✨ Benar! sum_range adalah rentang nilai yang akan dijumlahkan pada akhirnya.', fail: '❌ Kurang tepat. Perhatikan kata "sum" (jumlah) pada argumen tersebut.'
    },
    'pivot-tables': {
      q: 'Di menu Field List PivotTable, ke area manakah kamu harus menarik (drag) kolom metrik jika kamu ingin menghitung Total Penjualan?',
      options: [
        { text: 'A. Area Rows (Baris)', correct: false },
        { text: 'B. Area Filters (Filter)', correct: false },
        { text: 'C. Area Values (Nilai)', correct: true }
      ],
      success: '✨ Benar! Area Values digunakan untuk semua operasi matematika (SUM, COUNT, AVERAGE).', fail: '❌ Kurang tepat. Area Rows/Columns digunakan untuk kategori teks.'
    },

    // JALUR LANJUTAN
    'power-query': {
      q: 'Apa fungsi utama dari panel "Applied Steps" di Power Query?',
      options: [
        { text: 'A. Membuat macro VBA tanpa coding.', correct: false },
        { text: 'B. Merekam setiap langkah transformasi data agar otomatis dijalankan ulang saat di-refresh.', correct: true },
        { text: 'C. Mengembalikan data ke kondisi pabrik.', correct: false }
      ],
      success: '✨ Benar! Ini adalah rahasia otomasi bulanan Power Query.', fail: '❌ Kurang tepat. Coba ingat tujuan otomasi data cleaning.'
    },
    'advanced-pivot': {
      q: 'Bagaimana cara membuat satu Slicer mengontrol (memfilter) beberapa PivotTable sekaligus?',
      options: [
        { text: 'A. Menggunakan fitur "Report Connections".', correct: true },
        { text: 'B. Menggunakan fitur "Calculated Field".', correct: false },
        { text: 'C. Menyalin Slicer ke semua sheet.', correct: false }
      ],
      success: '✨ Benar! Report Connections memungkinkan interaktivitas multi-tabel.', fail: '❌ Kurang tepat. Fitur ini menghubungkan laporan (report).'
    },
    'dashboard-design': {
      q: 'Menerapkan prinsip Data-Ink Ratio, apa yang sebaiknya dihindari saat membuat Dashboard?',
      options: [
        { text: 'A. Menggunakan warna abu-abu sebagai latar belakang standar.', correct: false },
        { text: 'B. Mempertahankan gridlines tabel, border tebal, dan efek 3D pada grafik.', correct: true },
        { text: 'C. Memisahkan sheet kalkulasi (Back-end) dari sheet tampilan (Front-end).', correct: false }
      ],
      success: '✨ Benar! Hapus elemen dekoratif (gridlines, 3D) yang memakan pixel tanpa memberi makna.', fail: '❌ Kurang tepat. Data-Ink Ratio berfokus meminimalkan dekorasi yang tidak perlu (clutter).'
    },
    'dynamic-arrays': {
      q: 'Jika hasil dari fungsi FILTER atau SORT tidak bisa "tumpah" karena ada teks di sel bawahnya, pesan error apa yang muncul?',
      options: [
        { text: 'A. #VALUE!', correct: false },
        { text: 'B. #N/A', correct: false },
        { text: 'C. #SPILL!', correct: true }
      ],
      success: '✨ Benar! Kosongkan area tumpahan (Spill Range) agar data bisa muncul penuh.', fail: '❌ Kurang tepat. Ingat istilah "tumpah" (Spill).'
    },
    'data-validation': {
      q: 'Bagaimana cara terbaik membuat "Dropdown List" otomatis dari pilihan "Lunas, Belum Lunas"?',
      options: [
        { text: 'A. Tab Data > Data Validation > Pilih "List".', correct: true },
        { text: 'B. Tab Insert > Dropdown Form Control.', correct: false },
        { text: 'C. Tab Home > Conditional Formatting.', correct: false }
      ],
      success: '✨ Benar! Data Validation (List) adalah fondasi pembuatan template anti-rusak.', fail: '❌ Kurang tepat. Kita butuh fitur untuk memvalidasi/membatasi data masuk.'
    }
  };

  /* ------------------------------------------
     9. THEME TOGGLE (DARK/LIGHT MODE)
  ------------------------------------------ */
  function initThemeToggle() {
    const btn = document.getElementById('theme-toggle-nav');
    if (!btn) return;

    // Set icon based on current theme
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
    btn.textContent = currentTheme === 'dark' ? '☀️' : '🌙';

    btn.addEventListener('click', function () {
      let current = document.documentElement.getAttribute('data-theme');
      let next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('eah_theme', next);
      btn.textContent = next === 'dark' ? '☀️' : '🌙';
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle(); // must run first so theme is applied before paint
    initActiveNav();
    initMobileMenu();
    initCounters();
    initFadeIn();
    initSmoothScroll();
    initTrackSections();

    // --- GLOBAL TOAST NOTIFICATION ---
    window.EAH.showToast = function (title, subtitle, icon) {
      let toast = document.getElementById('eah-toast');
      if (!toast) {
        toast = document.createElement('div');
        toast.id = 'eah-toast';
        toast.className = 'toast-notification';
        document.body.appendChild(toast);
      }
      toast.innerHTML = `
        <div style="font-size: 2.5rem; filter: drop-shadow(0 2px 5px rgba(0,0,0,0.3));">${icon}</div>
        <div style="display:flex; flex-direction:column; gap:4px;">
          <div style="font-weight: 800; color: #10b981; font-size: 0.85rem; text-transform: uppercase; letter-spacing: 1px;">${title}</div>
          <div style="font-weight: bold; color: var(--text); font-size: 1.15rem;">${subtitle}</div>
          <div style="font-size: 0.75rem; color: #10b981; font-style: italic; margin-top: 2px; opacity: 0.9;">
            "Learning shouldn't be boring; it should be rewarding."
          </div>
        </div>
      `;
      // Slide in
      setTimeout(function () { toast.classList.add('show'); }, 100);
      // Slide out after 4.5 seconds
      setTimeout(function () { toast.classList.remove('show'); }, 4500);
    };

    // --- ACHIEVEMENT CHECKER ---
    function checkAchievements() {
      if (!window.EAH || typeof window.EAH.getProgress !== 'function') return;
      const p = window.EAH.getProgress();
      const doneCount = Object.keys(p).filter(k => p[k] === 'done').length;

      const lastNotified = parseInt(localStorage.getItem('eah_last_notified')) || 0;

      if (doneCount >= 1 && lastNotified < 1) {
        window.EAH.showToast('Achievement Unlocked!', 'Pemula Tangguh 🌱', '🌱');
        localStorage.setItem('eah_last_notified', 1);
      } else if (doneCount >= 4 && lastNotified < 4) {
        window.EAH.showToast('Achievement Unlocked!', 'Data Explorer 🧭', '🧭');
        localStorage.setItem('eah_last_notified', 4);
      } else if (doneCount >= 9 && lastNotified < 9) {
        window.EAH.showToast('Achievement Unlocked!', 'Advanced Modeler ⚙️', '⚙️');
        localStorage.setItem('eah_last_notified', 9);
      } else if (doneCount >= 14 && lastNotified < 14) {
        window.EAH.showToast('Achievement Unlocked!', 'Excel Analyst 🏆', '🏆');
        localStorage.setItem('eah_last_notified', 14);
      }
    }

    // --- FUNGSI ANIMASI SUKSES (GAMIFIKASI) ---
    function triggerSuccessAnimation(btn) {
      // 1. Efek pop pada tombol asal (jika terlihat)
      if (btn) {
        btn.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
        btn.style.transform = 'scale(1.15)';
        setTimeout(function () { btn.style.transform = 'scale(1)'; }, 400);
      }

      // 2. Kontainer Utama di Tengah Layar (Anti Tertutup Modal)
      const container = document.createElement('div');
      container.style.position = 'fixed';
      container.style.top = '50%';
      container.style.left = '50%';
      container.style.transform = 'translate(-50%, -50%)';
      container.style.zIndex = '9999999'; // Pastikan menembus modal
      container.style.pointerEvents = 'none';
      container.style.display = 'flex';
      container.style.justifyContent = 'center';
      container.style.alignItems = 'center';
      document.body.appendChild(container);

      // 3. Teks XP Utama (Besar & Bersinar)
      const textEl = document.createElement('div');
      textEl.innerHTML = '🎉 +50 XP! 🌟';
      textEl.style.fontSize = '3.5rem';
      textEl.style.fontWeight = '900';
      textEl.style.color = '#f59e0b'; // Emas
      textEl.style.textShadow = '0 0 20px rgba(245, 158, 11, 0.8), 0 8px 15px rgba(0,0,0,0.5)';
      textEl.style.whiteSpace = 'nowrap';
      textEl.style.opacity = '0';
      textEl.style.transform = 'scale(0.3)';
      textEl.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
      container.appendChild(textEl);

      // 4. Efek Ledakan Partikel (Kembang Api/Bintang)
      const emojis = ['✨', '🌟', '💥', '🎉', '🔥'];
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.position = 'absolute';
        particle.style.fontSize = (Math.random() * 1.5 + 1.5) + 'rem';
        particle.style.opacity = '0';
        particle.style.transition = 'all 1s cubic-bezier(0.25, 1, 0.5, 1)';
        container.appendChild(particle);

        setTimeout(function () {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 120 + 80;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;

          particle.style.opacity = '1';
          particle.style.transform = `translate(${tx}px, ${ty}px) scale(${Math.random() + 0.5})`;

          setTimeout(function () {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${tx}px, ${ty - 100}px) scale(0)`;
          }, 600);
        }, 50);
      }

      // 5. Jalankan Animasi Teks Utama
      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          textEl.style.opacity = '1';
          textEl.style.transform = 'scale(1.2)'; // Membesar tiba-tiba

          setTimeout(function () {
            // Melayang ke atas lalu menghilang
            textEl.style.transform = 'translateY(-150px) scale(1)';
            textEl.style.opacity = '0';
          }, 1200);
        });
      });

      // 6. Bersihkan Sampah HTML
      setTimeout(function () { container.remove(); }, 2500);
    }

    // Ekspor ke window.EAH supaya bisa dipanggil dari halaman lain
    // (learn.html, topic.html, dll) dengan angka XP yang akurat
    window.EAH.triggerXPAnimation = function (xpAmount) {
      // Buat versi lokal yang menerima angka XP dinamis
      const container = document.createElement('div');
      container.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);z-index:9999999;pointer-events:none;display:flex;justify-content:center;align-items:center;';
      document.body.appendChild(container);

      const textEl = document.createElement('div');
      textEl.innerHTML = `🎉 +${xpAmount} XP! 🌟`;
      textEl.style.cssText = 'font-size:3.5rem;font-weight:900;color:#f59e0b;text-shadow:0 0 20px rgba(245,158,11,0.8),0 8px 15px rgba(0,0,0,0.5);white-space:nowrap;opacity:0;transform:scale(0.3);transition:all 0.6s cubic-bezier(0.34,1.56,0.64,1);';
      container.appendChild(textEl);

      const emojis = ['✨', '🌟', '💥', '🎉', '🔥'];
      for (let i = 0; i < 10; i++) {
        const particle = document.createElement('div');
        particle.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
        particle.style.cssText = `position:absolute;font-size:${Math.random() * 1.5 + 1.5}rem;opacity:0;transition:all 1s cubic-bezier(0.25,1,0.5,1);`;
        container.appendChild(particle);
        setTimeout(function () {
          const angle = Math.random() * Math.PI * 2;
          const distance = Math.random() * 120 + 80;
          const tx = Math.cos(angle) * distance;
          const ty = Math.sin(angle) * distance;
          particle.style.opacity = '1';
          particle.style.transform = `translate(${tx}px,${ty}px) scale(${Math.random() + 0.5})`;
          setTimeout(function () {
            particle.style.opacity = '0';
            particle.style.transform = `translate(${tx}px,${ty - 100}px) scale(0)`;
          }, 600);
        }, 50);
      }

      requestAnimationFrame(function () {
        requestAnimationFrame(function () {
          textEl.style.opacity = '1';
          textEl.style.transform = 'scale(1.2)';
          setTimeout(function () {
            textEl.style.transform = 'translateY(-150px) scale(1)';
            textEl.style.opacity = '0';
          }, 1200);
        });
      });

      setTimeout(function () { container.remove(); }, 2500);
    };

    // --- UNIVERSAL QUIZ TRIGGER (EVENT DELEGATION) ---
    document.addEventListener('click', function (e) {
      const targetBtn = e.target.closest('.btn-mark-done');

      if (targetBtn) {
        // SISTEM BARU: tombol dengan data-material-id ditangani oleh
        // learn.html secara independen -- jangan diproses di sini
        // untuk mencegah animasi +50 XP yang salah dan double reward.
        if (targetBtn.hasAttribute('data-material-id')) return;

        e.preventDefault();

        const topicItem = targetBtn.closest('[data-topic-id]');
        if (!topicItem) {
          console.error("Elemen parent dengan data-topic-id tidak ditemukan!");
          return;
        }

        const topicId = topicItem.getAttribute('data-topic-id');

        const isDone = targetBtn.textContent.includes('Selesai');

        const isLocked = targetBtn.textContent.includes('Baca Dulu');
        if (isLocked) {
          alert("Silakan buka dan baca materinya terlebih dahulu dengan mengklik tombol 'Mulai →'");
          return;
        }

        // 1. FITUR UNDO INSTAN (Bypass System Confirm yang sering diblokir browser)
        if (isDone) {
          targetBtn.style.background = 'transparent';
          targetBtn.style.borderColor = 'var(--border)';
          targetBtn.style.color = 'var(--text-muted)';
          targetBtn.innerHTML = '📝 Kerjakan Kuis';
          targetBtn.title = 'Klik untuk mengerjakan materi';

          if (window.EAH && window.EAH.setTopicStatus) window.EAH.setTopicStatus(topicId, 'pending');
          if (window.EAH && window.EAH.renderProgress) window.EAH.renderProgress();
          return;
        }

        const quizData = typeof KNOWLEDGE_CHECKS !== 'undefined' ? KNOWLEDGE_CHECKS[topicId] : null;

        // 2. JIKA TIDAK ADA KUIS: Langsung tandai selesai
        if (!quizData) {
          targetBtn.style.background = 'rgba(16, 185, 129, 0.1)';
          targetBtn.style.borderColor = '#10b981';
          targetBtn.style.color = '#10b981';
          targetBtn.innerHTML = '✅ Selesai';
          triggerSuccessAnimation(targetBtn);
          checkAchievements();
          targetBtn.title = 'Klik untuk membatalkan status selesai';

          if (window.EAH && window.EAH.setTopicStatus) window.EAH.setTopicStatus(topicId, 'done');
          if (window.EAH && window.EAH.saveProgressToCloud) window.EAH.saveProgressToCloud(topicId);
          if (window.EAH && window.EAH.renderProgress) window.EAH.renderProgress();
          return;
        }

        // 3. JIKA ADA KUIS: Siapkan Modal
        const quizModal = document.getElementById('quiz-modal');
        const questionEl = document.getElementById('quiz-question');
        const optionsContainer = document.getElementById('quiz-options-container');

        if (quizModal && questionEl && optionsContainer) {
          questionEl.textContent = quizData.q;
          optionsContainer.innerHTML = '';

          // Desain Feedback Container
          let feedbackContainer = document.getElementById('quiz-feedback');
          if (!feedbackContainer) {
            feedbackContainer = document.createElement('div');
            feedbackContainer.id = 'quiz-feedback';
            feedbackContainer.style.marginTop = '15px';
            feedbackContainer.style.padding = '12px';
            feedbackContainer.style.borderRadius = '8px';
            feedbackContainer.style.fontWeight = '500';
            optionsContainer.parentNode.appendChild(feedbackContainer);
          }
          feedbackContainer.style.display = 'none';

          quizData.options.forEach(function (opt) {
            const optBtn = document.createElement('button');

            // Desain Opsi Jawaban (Anti Kepotong & Premium)
            optBtn.style.display = 'block';
            optBtn.style.textAlign = 'left';
            optBtn.style.padding = '14px 18px';
            optBtn.style.border = '2px solid var(--border)';
            optBtn.style.borderRadius = '8px';
            optBtn.style.marginBottom = '12px';
            optBtn.style.cursor = 'pointer';
            optBtn.style.width = '100%';
            optBtn.style.background = 'transparent';
            optBtn.style.color = 'var(--text)';
            optBtn.style.fontSize = '1rem';
            optBtn.style.lineHeight = '1.6';
            optBtn.style.fontWeight = '500';
            optBtn.style.transition = 'all 0.2s ease-in-out';

            // Kunci mutlak agar teks bisa turun baris
            optBtn.style.whiteSpace = 'normal';
            optBtn.style.minHeight = '50px';
            optBtn.style.height = 'auto';
            optBtn.style.wordBreak = 'break-word';

            optBtn.textContent = opt.text;

            // Efek Hover Buatan JS (Konsisten dengan btn-ghost)
            optBtn.addEventListener('mouseenter', function () {
              if (!optBtn.disabled && optBtn.style.background === 'transparent') {
                optBtn.style.background = 'var(--surface-2)';
              }
            });
            optBtn.addEventListener('mouseleave', function () {
              if (!optBtn.disabled && optBtn.style.background === 'var(--surface-2)') {
                optBtn.style.background = 'transparent';
              }
            });

            optBtn.addEventListener('click', function () {
              if (opt.correct) {
                // Berhasil
                optBtn.style.borderColor = '#10b981';
                optBtn.style.background = 'rgba(16, 185, 129, 0.1)';
                optBtn.style.color = '#10b981';

                feedbackContainer.style.display = 'block';
                feedbackContainer.style.background = 'rgba(16, 185, 129, 0.1)';
                feedbackContainer.style.color = '#10b981';
                feedbackContainer.style.border = '1px solid #10b981';
                feedbackContainer.innerHTML = '✨ ' + quizData.success;

                targetBtn.style.background = 'rgba(16, 185, 129, 0.1)';
                targetBtn.style.borderColor = '#10b981';
                targetBtn.style.color = '#10b981';
                targetBtn.innerHTML = '✅ Selesai';
                triggerSuccessAnimation(targetBtn);
                checkAchievements();
                targetBtn.title = 'Klik untuk membatalkan status selesai';

                if (window.EAH && window.EAH.setTopicStatus) window.EAH.setTopicStatus(topicId, 'done');
                if (window.EAH && window.EAH.saveProgressToCloud) window.EAH.saveProgressToCloud(topicId);
                if (window.EAH && window.EAH.renderProgress) window.EAH.renderProgress();

                // Matikan opsi lain, biarkan tombol yang benar tetap menyala
                Array.from(optionsContainer.children).forEach(b => {
                  if (b.tagName === 'BUTTON') {
                    b.disabled = true;
                    b.style.cursor = 'not-allowed';
                    if (b !== optBtn) b.style.opacity = '0.5';
                  }
                });
              } else {
                // Gagal
                optBtn.style.borderColor = '#ef4444';
                optBtn.style.background = 'rgba(239, 68, 68, 0.05)';
                optBtn.style.color = '#ef4444';

                feedbackContainer.style.display = 'block';
                feedbackContainer.style.background = 'rgba(239, 68, 68, 0.1)';
                feedbackContainer.style.color = '#ef4444';
                feedbackContainer.style.border = '1px solid #ef4444';
                feedbackContainer.innerHTML = '❌ ' + quizData.fail;
              }
            });
            optionsContainer.appendChild(optBtn);
          });

          quizModal.style.display = 'flex';
          document.body.style.overflow = 'hidden';
        }
      }
    });

    // --- CLOSE MODAL LOGIC ---
    document.addEventListener('click', function (e) {
      // Menutup jika klik di area luar, klik tombol X, atau klik tombol Lanjutkan
      if (e.target.id === 'quiz-modal' || e.target.closest('#close-quiz') || e.target.id === 'quiz-btn-continue') {
        const quizModal = document.getElementById('quiz-modal');
        if (quizModal) {
          quizModal.style.display = 'none';
          document.body.style.overflow = ''; // Lepaskan lock scroll
        }
      }
    });

    // Render progress if on learn page
    if (document.querySelector('.topic-card') && window.EAH && window.EAH.renderProgress) {
      window.EAH.renderProgress();
    }
    // --- UX FLOW: TRACK "MULAI" CLICKS ---
    document.querySelectorAll('.topic-card a.btn-primary').forEach(function (link) {
      link.addEventListener('click', function () {
        const card = link.closest('.topic-card');
        if (card) {
          const topicId = card.dataset.topicId;
          const p = window.EAH.getProgress();
          if (!p[topicId] || p[topicId] === 'not-started') {
            window.EAH.setTopicStatus(topicId, 'in-progress');
          }
        }
      });
    });

    // --- UX FLOW: AUTO-INJECT BOTTOM NAVIGATION ON TOPIC PAGES ---
    const path = window.location.pathname;
    const isTopicPage = path.includes('topic-') || path.endsWith('topic.html');
    if (isTopicPage) {
      const navContainer = document.createElement('div');
      navContainer.className = 'container';
      navContainer.style.marginTop = '40px';
      navContainer.style.marginBottom = '60px';
      navContainer.style.padding = '20px';
      navContainer.style.background = 'var(--surface)';
      navContainer.style.border = '1px solid var(--border)';
      navContainer.style.borderRadius = '8px';
      navContainer.style.display = 'flex';
      navContainer.style.justifyContent = 'space-between';
      navContainer.style.alignItems = 'center';
      navContainer.style.flexWrap = 'wrap';
      navContainer.style.gap = '15px';

      navContainer.innerHTML = `
          <div>
              <h4 style="margin:0 0 5px 0;">Sudah selesai membaca?</h4>
              <p style="margin:0; font-size:0.9rem; color:var(--text-muted);">Kembali ke menu untuk mengerjakan kuis dan menyimpan progres.</p>
          </div>
          <a href="learn.html" class="btn-primary" style="text-decoration:none;">⬅ Kembali ke Jalur Belajar</a>
      `;

      // Cari tempat teraman untuk menempelkan navigasi
      const mainEl = document.getElementById('main-content') || document.querySelector('main');
      if (mainEl) {
        mainEl.appendChild(navContainer);
      }
    }
  });

  /* ------------------------------------------
     7. GLOBAL MODAL CLOSER (BUG FIX #13)
     Menutup semua jenis modal dengan tombol ESC
  ------------------------------------------ */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      // Cari semua elemen yang memiliki class 'active' (Modal terbuka)
      const activeModals = document.querySelectorAll('.active');
      activeModals.forEach(modal => {
        // Pastikan yang ditutup hanya yang ber-ID modal atau class modal
        if (modal.id.includes('modal') || modal.classList.contains('qris-modal-overlay')) {
          modal.classList.remove('active');
        }
      });
    }
  });

  /* ------------------------------------------
     8. ANTI-SPAM ACHIEVEMENT TOAST (BUG FIX #14)
     Mencegah notifikasi muncul berulang saat halaman di-refresh
  ------------------------------------------ */
  window.showToastSafe = function (message) {
    // Cek apakah toast ini sudah pernah muncul di sesi ini
    const toastKey = 'eah_toast_' + btoa(message).substring(0, 10);
    if (sessionStorage.getItem(toastKey)) return; // Jika sudah, hentikan fungsi

    // Panggil fungsi pembuat toast asli (jika sudah ada di kode Mas sebelumnya)
    // Atau fallback sederhana menggunakan alert/console jika belum ada UI khususnya
    const toastContainer = document.getElementById('toast-container');
    if (toastContainer) {
      // Logika memunculkan toast Mas di sini
      toastContainer.innerText = message;
      toastContainer.classList.add('show');
      setTimeout(() => toastContainer.classList.remove('show'), 3000);
    } else {
      console.log("Achievement Unlocked: " + message);
    }

    // Tandai bahwa toast ini sudah ditampilkan
    sessionStorage.setItem(toastKey, 'true');
  };

})();

/* ==========================================
   PATCH FASE 5: UI/UX & MOBILE INTERACTION
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. SKELETON LOADING INJEKSI OTOMATIS ---
  // Mencari elemen profil yang sedang "memuat" lalu diberi efek animasi
  const profileIds = ['info-email', 'greeting-text', 'subscription-remaining', 'topic-main-title', 'breadcrumb-title', 'breadcrumb-category', 'topic-level-badge'];
  profileIds.forEach(id => {
    const el = document.getElementById(id);
    if (el && (el.textContent.toLowerCase().includes('memuat') || el.textContent.includes('Calculating'))) {
      el.classList.add('skeleton');

      // Alat pemantau (Observer): Hapus efek skeleton seketika saat data asli Supabase masuk
      const observer = new MutationObserver(() => {
        el.classList.remove('skeleton');
        observer.disconnect();
      });
      observer.observe(el, { childList: true, characterData: true, subtree: true });
    }
  });

  // --- 2. TOMBOL DAFTAR ISI (TOC) KHUSUS HP ---
  const sidebar = document.querySelector('.topic-sidebar');
  if (sidebar) {
    const tocBtn = document.createElement('button');
    tocBtn.className = 'toc-mobile-btn';
    tocBtn.innerHTML = '📑';
    tocBtn.setAttribute('aria-label', 'Buka Daftar Isi');
    document.body.appendChild(tocBtn);

    tocBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('mobile-open');
    });

    // Otomatis menutup sidebar jika user mengetuk layar bagian luar
    document.addEventListener('click', (e) => {
      if (sidebar.classList.contains('mobile-open') && !sidebar.contains(e.target) && e.target !== tocBtn) {
        sidebar.classList.remove('mobile-open');
      }
    });
  }

  // --- 3. PENGUNCI INPUT (VALIDASI TOOLS) ---
  // Mencegah input huruf masuk ke alat Data Visualizer / Formula 
  const numberInputs = document.querySelectorAll('input[type="number"], .visualizer-input');
  numberInputs.forEach(input => {
    input.addEventListener('input', function () {
      // Regex: Tendang semua karakter selain angka (0-9), minus (-), dan titik (.)
      this.value = this.value.replace(/[^0-9.-]/g, '');
    });
  });

});

/* ==========================================
   PATCH FASE 6: DRY ARCHITECTURE & STATE
   ========================================== */
document.addEventListener('DOMContentLoaded', async () => {

  // --- 1. DINAMISASI PROGRESS BAR (LEARN.HTML) ---
  // Mencari elemen teks progres (contoh: "0/5 selesai") dan bar-nya
  const progressText = document.querySelector('.progress-text') || document.querySelector('.progress-label');
  const topicCards = document.querySelectorAll('.topic-card');

  if (progressText && topicCards.length > 0) {
    // Menghitung jumlah kartu topik yang memiliki class 'completed' / 'done'
    const completedCount = document.querySelectorAll('.topic-card.completed, .topic-status.done').length;
    const totalCount = topicCards.length;

    // Memperbarui teks secara dinamis
    progressText.textContent = `${completedCount}/${totalCount} Selesai`;

    // Memperbarui lebar pita progres (jika elemennya ada)
    const progressBar = document.querySelector('.progress-bar-fill') || document.querySelector('.progress-fill');
    if (progressBar) {
      progressBar.style.width = `${(completedCount / totalCount) * 100}%`;
    }
  }

  // --- 2. SENTRALISASI NAVBAR AUTH STATE ---
  // Otomatis mengubah tombol "Masuk" menjadi "Halo, Nama" di semua 20+ file HTML
  const navAuthBtns = document.querySelectorAll('#nav-auth-btn, .nav-auth, a[href="login.html"]');

  if (navAuthBtns.length > 0 && window.supaClient) {
    const { data: { session } } = await window.supaClient.auth.getSession();

    if (session) {
      // Ambil nama dari profil, fallback ke bagian depan email
      const { data: profile } = await window.supaClient.from('profiles').select('nickname').eq('id', session.user.id).maybeSingle();
      const displayName = profile?.nickname || session.user.email.split('@')[0];

      navAuthBtns.forEach(btn => {
        btn.innerHTML = `👤 Halo, ${displayName}`;
        btn.href = "profile.html";
        btn.style.background = "linear-gradient(135deg, #3b82f6, #2563eb)";
        btn.style.color = "#ffffff";
        btn.style.border = "none";
      });
    }
  }
});

/* ==========================================
   PATCH FASE 7: ACCESSIBILITY & RATE LIMITING
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. AKSESIBILITAS FLASHCARD (NAVIGASI KEYBOARD) ---
  // Memungkinkan pengguna membalik kartu (flashcard) hanya dengan menekan Enter atau Spasi
  const flashcards = document.querySelectorAll('.flashcard, .flip-card, .topic-card');
  flashcards.forEach(card => {
    // Pasang tabindex agar kartu bisa di-highlight oleh tombol TAB
    if (!card.hasAttribute('tabindex')) {
      card.setAttribute('tabindex', '0');
    }

    // Dengarkan tombol Enter (13) atau Spasi (32)
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        // Pemicu flip (sesuaikan dengan class flip Mas, umumnya 'flipped' atau 'active')
        this.classList.toggle('flipped');
        this.classList.toggle('active');
      }
    });
  });

  // --- 2. AKSESIBILITAS LOGO SCREEN READER (TUNANETRA) ---
  // Mengubah emoji '⊞' menjadi elemen yang bisa dibaca oleh mesin pembaca layar
  const logoIcons = document.querySelectorAll('.logo-icon');
  logoIcons.forEach(icon => {
    icon.setAttribute('role', 'img');
    icon.setAttribute('aria-label', 'Logo Excel Analyst Hub');
    icon.removeAttribute('aria-hidden');
  });

  // --- 3. RATE LIMITING (PENCEGAH CRASH DATASET) ---
  // Mencari kolom input baris di alat Dataset Generator
  const rowInput = document.getElementById('dataset-rows') || document.querySelector('input[type="number"]');
  if (rowInput && window.location.pathname.includes('tools.html')) {
    rowInput.addEventListener('input', function () {
      let val = parseInt(this.value);
      // Jika user mengetik angka lebih dari 1000, paksa turun ke 1000
      if (val > 1000) {
        this.value = 1000;
        // Gunakan notasi Toast yang sudah kita buat di Fase 4, atau pakai alert standar
        if (typeof window.showToastSafe === 'function') {
          window.showToastSafe("Batas maksimal diatur ke 1.000 baris untuk menjaga kestabilan server.");
        } else {
          alert("Batas maksimal adalah 1.000 baris.");
        }
      }
    });
  }
});

/* ==========================================
   PATCH FASE 8: SEO & PERFORMANCE PRELOAD
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {

  // --- 1. META DESCRIPTION GENERATOR OTOMATIS ---
  // Menyuntikkan deskripsi SEO ke halaman yang belum memilikinya
  if (!document.querySelector('meta[name="description"]')) {
    const meta = document.createElement('meta');
    meta.name = "description";

    // Ambil teks dari H1 atau Title dokumen sebagai deskripsi
    const pageTitle = document.querySelector('h1')?.innerText || document.title.replace('Excel Analyst Hub', '').replace('-', '').trim();
    meta.content = `Pelajari ${pageTitle || 'Analisis Data'} secara mendalam dengan materi interaktif dan praktik langsung di Excel Analyst Hub.`;

    document.head.appendChild(meta);
  }

  // --- 2. PRELOAD GOOGLE FONTS (ANTI BERKEDIP/FOIT) ---
  // Mempercepat pemuatan font Sora & DM Sans
  if (!document.querySelector('link[href*="fonts.gstatic.com"]')) {
    const preconnect1 = document.createElement('link');
    preconnect1.rel = 'preconnect';
    preconnect1.href = 'https://fonts.googleapis.com';

    const preconnect2 = document.createElement('link');
    preconnect2.rel = 'preconnect';
    preconnect2.href = 'https://fonts.gstatic.com';
    preconnect2.crossOrigin = 'anonymous';

    document.head.append(preconnect1, preconnect2);
  }
});