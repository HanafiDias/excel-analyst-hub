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
    }, { threshold: 0.5 });

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

  /* ------------------------------------------
     UNIFIED STATE MANAGER
  ------------------------------------------ */
  var STATE_KEY = 'eah_unified_state';

  window.EAH.getState = function() {
    try {
      return JSON.parse(localStorage.getItem(STATE_KEY) || '{}');
    } catch(e) {
      return {};
    }
  };

  window.EAH.setState = function(updates) {
    var current = window.EAH.getState();
    var merged = Object.assign({}, current, updates);
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(merged));
    } catch(e) {}
    return merged;
  };

  window.EAH.getTotalXP = function() {
    return window.EAH.getState().totalXP || 0;
  };

  window.EAH.addXP = function(amount, caseKey) {
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

  window.EAH.getChallengeState = function() {
    return window.EAH.getState().challenges || {};
  };

  window.EAH.markChallengeComplete = function(id) {
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

    // Update each topic card status indicator
    document.querySelectorAll('.topic-card').forEach(function (card) {
      var id = card.dataset.topicId;
      if (!id) return;
      var status = progress[id] || 'not-started';
      var statusEl = card.querySelector('.topic-status');
      if (!statusEl) return;
      statusEl.dataset.status = status;
      if (status === 'done') {
        statusEl.textContent = '✓ Selesai';
      } else if (status === 'in-progress') {
        statusEl.textContent = '● Sedang Dipelajari';
      } else {
        statusEl.textContent = '○ Belum Dimulai';
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
      if (fill) fill.style.width = pct + '%';
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
    'datacleaning': {
      q: 'Jika teks di kolom A terlihat berantakan karena banyak spasi kosong di awal dan akhirnya, fungsi apa yang wajib kamu gunakan?',
      options: [
        { text: 'A. =CLEAN()', correct: false },
        { text: 'B. =TRIM()', correct: true },
        { text: 'C. =PROPER()', correct: false }
      ],
      success: '✨ Benar! TRIM membersihkan spasi berlebih dari teks.', fail: '❌ Kurang tepat. CLEAN menghapus karakter non-printable, bukan spasi.'
    },
    'vlookup-indexmatch': {
      q: 'Apa kelemahan utama dari VLOOKUP yang bisa diatasi oleh kombinasi INDEX-MATCH?',
      options: [
        { text: 'A. VLOOKUP tidak bisa membaca teks, hanya angka.', correct: false },
        { text: 'B. VLOOKUP memakan ukuran file yang lebih besar.', correct: false },
        { text: 'C. VLOOKUP hanya bisa mencari data ke arah kanan dari kolom acuan (kolom ID).', correct: true }
      ],
      success: '✨ Benar! INDEX-MATCH lebih dinamis karena bisa mencari ke arah kiri dan kanan.', fail: '❌ Kurang tepat. Ingat aturan "Left-to-Right" VLOOKUP.'
    },
    'sumif': {
      q: 'Pada fungsi =SUMIF(range, criteria, sum_range), apa yang seharusnya diisi pada argumen "sum_range"?',
      options: [
        { text: 'A. Kolom teks yang menjadi syarat (Misal: Kolom Cabang).', correct: false },
        { text: 'B. Kolom angka yang ingin dijumlahkan (Misal: Kolom Pendapatan).', correct: true },
        { text: 'C. Kata kunci pencariannya (Misal: "Jakarta").', correct: false }
      ],
      success: '✨ Benar! sum_range adalah rentang nilai yang akan dijumlahkan pada akhirnya.', fail: '❌ Kurang tepat. Perhatikan kata "sum" (jumlah) pada argumen tersebut.'
    },
    'pivottable': {
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

  /* Topic "Mark Done" buttons on learn page (With Modal Logic) */
  function initTopicMarkDone() {
    var modal = document.getElementById('quiz-modal');
    var closeBtn = document.getElementById('close-quiz');
    var continueBtn = document.getElementById('quiz-btn-continue');
    
    if (closeBtn) closeBtn.addEventListener('click', function() { modal.style.display = 'none'; });
    if (continueBtn) continueBtn.addEventListener('click', function() { modal.style.display = 'none'; });

    document.querySelectorAll('.topic-card').forEach(function (card) {
      var id = card.dataset.topicId;
      var btn = card.querySelector('.btn-mark-done');
      if (!btn || !id) return;
      
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var current = window.EAH.getProgress()[id] || 'not-started';
        
        // Bypass if already done
        if (current === 'done') {
          window.EAH.setTopicStatus(id, 'not-started');
          window.EAH.renderProgress();
          return;
        }

        var quizData = KNOWLEDGE_CHECKS[id];
        if (!quizData || !modal) {
          window.EAH.setTopicStatus(id, 'done');
          window.EAH.renderProgress();
          return;
        }

        // Setup Modal
        document.getElementById('quiz-question').textContent = quizData.q;
        var optionsContainer = document.getElementById('quiz-options-container');
        var feedbackContainer = document.getElementById('quiz-feedback-global');
        
        optionsContainer.innerHTML = '';
        feedbackContainer.style.display = 'none';
        continueBtn.style.display = 'none';

        quizData.options.forEach(function(opt) {
          var optBtn = document.createElement('button');
          optBtn.style.cssText = 'text-align:left; padding:var(--space-3) var(--space-4); background:var(--surface-2); border:1px solid var(--border); border-radius:6px; color:var(--text); cursor:pointer; font-family:inherit; font-size:0.95rem; transition:all 0.2s;';
          optBtn.textContent = opt.text;
          
          optBtn.onmouseover = function() { if(!optBtn.disabled) optBtn.style.borderColor = 'var(--accent)'; };
          optBtn.onmouseout = function() { if(!optBtn.disabled && optBtn.style.borderColor !== 'rgb(16, 185, 129)' && optBtn.style.borderColor !== 'rgb(239, 68, 68)') optBtn.style.borderColor = 'var(--border)'; };

          optBtn.addEventListener('click', function() {
            Array.from(optionsContainer.children).forEach(function(b) {
              b.style.borderColor = 'var(--border)';
              b.style.background = 'var(--surface-2)';
            });

            if (opt.correct) {
              optBtn.style.borderColor = '#10b981';
              optBtn.style.background = 'rgba(16, 185, 129, 0.05)';
              feedbackContainer.style.display = 'block';
              feedbackContainer.style.background = 'rgba(16, 185, 129, 0.1)';
              feedbackContainer.style.color = '#10b981';
              feedbackContainer.innerHTML = quizData.success;
              
              window.EAH.setTopicStatus(id, 'done');
              window.EAH.renderProgress();
              
              Array.from(optionsContainer.children).forEach(function(b) { b.disabled = true; b.style.cursor = 'default'; });
              continueBtn.style.display = 'block';

            } else {
              optBtn.style.borderColor = '#ef4444';
              optBtn.style.background = 'rgba(239, 68, 68, 0.05)';
              feedbackContainer.style.display = 'block';
              feedbackContainer.style.background = 'rgba(239, 68, 68, 0.1)';
              feedbackContainer.style.color = '#ef4444';
              feedbackContainer.innerHTML = quizData.fail;
            }
          });
          optionsContainer.appendChild(optBtn);
        });

        modal.style.display = 'flex';
      });
    });
  }

  /* ------------------------------------------
     9. THEME TOGGLE (dark/light mode)
  ------------------------------------------ */
  var THEME_KEY = 'eah_theme';

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    // Update all toggle button icons
    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.textContent = theme === 'dark' ? '☀️' : '🌙';
      btn.setAttribute('aria-label', theme === 'dark' ? 'Aktifkan mode terang' : 'Aktifkan mode gelap');
      btn.setAttribute('title', theme === 'dark' ? 'Mode terang' : 'Mode gelap');
    });
  }

  function initThemeToggle() {
    // Load saved preference; default to dark
    var saved = 'dark';
    try { saved = localStorage.getItem(THEME_KEY) || 'dark'; } catch (e) {}
    applyTheme(saved);

    document.querySelectorAll('.theme-toggle').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var current = document.documentElement.getAttribute('data-theme') || 'dark';
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
        try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
      });
    });
  }

  /* ------------------------------------------
     10. BOOTSTRAP ALL
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initThemeToggle(); // must run first so theme is applied before paint
    initActiveNav();
    initMobileMenu();
    initCounters();
    initFadeIn();
    initSmoothScroll();
    initTrackSections();
    initTopicMarkDone();

    // Render progress if on learn page
    if (document.querySelector('.topic-card')) {
      window.EAH.renderProgress();
    }
  });

})();
