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
        section.classList.toggle('expanded');
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
        statusEl.textContent = '✓ Done';
      } else if (status === 'in-progress') {
        statusEl.textContent = '● In Progress';
      } else {
        statusEl.textContent = '○ Not Started';
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
      if (label) label.textContent = done + '/' + ids.length + ' completed';
    });
  };

  /* Topic "Mark Done" buttons on learn page */
  function initTopicMarkDone() {
    document.querySelectorAll('.topic-card').forEach(function (card) {
      var id = card.dataset.topicId;
      var btn = card.querySelector('.btn-mark-done');
      if (!btn || !id) return;
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        e.stopPropagation();
        var current = window.EAH.getProgress()[id] || 'not-started';
        var next = current === 'done' ? 'not-started' : 'done';
        window.EAH.setTopicStatus(id, next);
        window.EAH.renderProgress();
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
