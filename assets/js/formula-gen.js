/* ============================================
   EXCEL ANALYST HUB — FORMULA GENERATOR v2.0
   formula-gen.js: Two-layer engine
   Layer 1: Supabase rule-based lookup (instant, free)
   Layer 2: Google Gemini API fallback (AI-powered)
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     CONFIG — ganti dengan nilai aslimu
     CATATAN: GEMINI_KEY sudah dipindah ke Vercel
     environment variable, dipanggil lewat /api/gemini-proxy
  ------------------------------------------ */
  var SUPABASE_URL = 'https://laowissohsnhfsbiwcpd.supabase.co';
  var SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxhb3dpc3NvaHNuaGZzYml3Y3BkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA4NTY2NzYsImV4cCI6MjA5NjQzMjY3Nn0.mke2iExUiAxxOzmo2PLJx2MlmhORs6ZbqbLy1PquSyE';
  var currentFormula = '';

  /* ------------------------------------------
     LAYER 1 HELPER: ekstrak keyword dari input
  ------------------------------------------ */
  function extractKeywords(text) {
    var stopwords = ['yang','di','ke','dari','dan','atau','untuk','dengan','pada',
      'ini','itu','agar','bisa','cara','saya','aku','mau','ingin','tolong','bantu',
      'gimana','bagaimana','berdasarkan','berdasar','sesuai','pakai','menggunakan',
      'data','nilai','kolom','baris','tabel','excel','rumus','formula','ingin','mau',
      'buatkan','buat','tolong','bantu','menghitung','hitung','adalah','dalam',
      'sebuah','setiap','semua','beberapa','dapat','akan','sudah','telah','juga',
      'saat','ketika','jika','kalau','apabila','supaya','sehingga','karena','sebab',
      'oleh','oleh karena','seperti','misal','misalnya','contoh','total','jumlah'];
    return text.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(function (w) { return w.length > 2 && stopwords.indexOf(w) === -1; });
  }

  /* ------------------------------------------
     WEIGHTED SCORING:
     - exact match dengan nama formula = 3 poin
     - match dengan keyword spesifik   = 2 poin
     - match dengan tag umum           = 1 poin
     - minimum skor 3 untuk valid match (di bawah itu, fallback ke Gemini)
  ------------------------------------------ */
  var MIN_MATCH_SCORE = 3;

  /* ------------------------------------------
     HELPER: pecah frasa jadi array token kata
  ------------------------------------------ */
  function tokenize(str) {
    return str.toLowerCase()
      .replace(/[^a-z0-9\s]/g, ' ')
      .split(/\s+/)
      .filter(function(w){ return w.length > 0; });
  }

  /* ------------------------------------------
     HELPER: hitung berapa token dari phraseTokens
     yang exact-match dengan salah satu queryKeyword
  ------------------------------------------ */
  function countTokenMatches(phraseTokens, queryKeywords) {
    return phraseTokens.filter(function(pt) {
      return queryKeywords.indexOf(pt) !== -1;
    }).length;
  }

  /* ------------------------------------------
     HELPER: skor satu keyword/tag entry terhadap
     query keywords. Skor proporsional:
     semua token match → skor penuh
     sebagian match → skor proporsional
     0 match → 0
  ------------------------------------------ */
  function scorePhraseAgainstKeywords(phrase, queryKeywords, maxScore) {
    var phraseTokens = tokenize(phrase);
    if (phraseTokens.length === 0) return 0;
    var matchCount = countTokenMatches(phraseTokens, queryKeywords);
    if (matchCount === 0) return 0;
    // Proporsional: match semua token = maxScore penuh
    // match sebagian = maxScore * (matchCount/phraseTokens.length)
    // tapi hanya dianggap valid jika matchCount >= 1
    return maxScore * (matchCount / phraseTokens.length);
  }

  async function querySupabase(userQuery, category) {
    var keywords = extractKeywords(userQuery);
    if (keywords.length === 0) return null;

    var url = SUPABASE_URL + '/rest/v1/formula_library?select=*';
    if (category && category !== 'all') {
      url += '&category=eq.' + encodeURIComponent(category);
    }
    url += '&limit=50';

    var res = await fetch(url, {
      headers: {
        'apikey': SUPABASE_ANON,
        'Authorization': 'Bearer ' + SUPABASE_ANON
      }
    });

    if (!res.ok) return null;
    var allFormulas = await res.json();
    if (!Array.isArray(allFormulas) || allFormulas.length === 0) return null;

    var scored = allFormulas.map(function(f) {
      var nameLower = f.formula_name.toLowerCase();
      var nameClean = nameLower.replace(/[^a-z0-9\s]/g, ' ').trim();
      var specificKeys = Array.isArray(f.keywords) ? f.keywords : [];
      var genericTags = Array.isArray(f.tags) ? f.tags : [];

      var score = 0;

      // --- 1. Exact match nama formula (skor 3 per keyword yang cocok) ---
      keywords.forEach(function(kw) {
        var nameTokens = tokenize(nameClean);
        if (nameTokens.indexOf(kw) !== -1) {
          score += 3;
        }
      });

      // --- 2. Match keyword spesifik (token-based, proporsional, max 2 per frasa) ---
      specificKeys.forEach(function(phrase) {
        var s = scorePhraseAgainstKeywords(phrase, keywords, 2);
        score += s;
      });

      // --- 3. Match tag umum (token-based, proporsional, max 1 per frasa) ---
      genericTags.forEach(function(tag) {
        var s = scorePhraseAgainstKeywords(tag, keywords, 1);
        score += s;
      });

      return Object.assign({}, f, { _score: score });
    }).filter(function(f){ return f._score >= MIN_MATCH_SCORE; });

    if (scored.length === 0) return null;
    scored.sort(function(a, b){ return b._score - a._score; });
    return scored[0];
  }

  /* ------------------------------------------
     LAYER 2: Gemini API fallback
  ------------------------------------------ */
  async function queryGemini(userQuery, category) {
    var categoryHint = (category && category !== 'all')
      ? 'Fokus pada kategori formula Excel: ' + category + '.'
      : '';

    var prompt = 'Kamu adalah ahli Microsoft Excel. User meminta bantuan formula untuk: "' + userQuery + '". ' + categoryHint + '\n'
      + 'Balas HANYA dalam format JSON berikut, tanpa teks lain, tanpa markdown, tanpa komentar:\n'
      + '{\n'
      + '  "formula_name": "nama formula utama",\n'
      + '  "formula": "=FORMULA(argumen1, argumen2)",\n'
      + '  "syntax_explanation": "• argumen1 = penjelasan\\n• argumen2 = penjelasan",\n'
      + '  "example_case": "deskripsi kasus nyata penggunaan formula ini dalam konteks pekerjaan",\n'
      + '  "example_formula": "=FORMULA(contoh, nyata)",\n'
      + '  "alternative_formula": "=FORMULA_ALTERNATIF() atau null jika tidak ada",\n'
      + '  "alternative_label": "penjelasan singkat kenapa pakai alternatif ini atau null",\n'
      + '  "difficulty": "beginner atau intermediate atau advanced"\n'
      + '}';

    var res = await fetch('/api/gemini-proxy', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt: prompt })
    });

    if (!res.ok) return null;
    var data = await res.json();
    var raw = (data &&
      data.candidates &&
      data.candidates[0] &&
      data.candidates[0].content &&
      data.candidates[0].content.parts &&
      data.candidates[0].content.parts[0] &&
      data.candidates[0].content.parts[0].text) || '';

    var clean = raw.replace(/```json|```/g, '').trim();
    try {
      var parsed = JSON.parse(clean);
      parsed._source = 'ai';
      return parsed;
    } catch (e) {
      return null;
    }
  }

  /* ------------------------------------------
     UI: Show / Hide states
  ------------------------------------------ */
  function showLoading(text) {
    var ph = document.getElementById('fg-placeholder');
    var ld = document.getElementById('fg-loading');
    var rs = document.getElementById('fg-result');
    if (ph) ph.style.display = 'none';
    if (rs) rs.style.display = 'none';
    if (ld) {
      ld.style.display = 'block';
      var lt = document.getElementById('fg-loading-text');
      if (lt) lt.textContent = text || 'Memuat...';
    }
  }

  function showError(msg) {
    var ph = document.getElementById('fg-placeholder');
    var ld = document.getElementById('fg-loading');
    var rs = document.getElementById('fg-result');
    if (ld) ld.style.display = 'none';
    if (rs) rs.style.display = 'none';
    if (ph) {
      ph.style.display = 'block';
      ph.innerHTML = '<div style="font-size:32px;margin-bottom:12px;">😕</div>'
        + '<p style="color:var(--text-muted);font-size:0.9rem;">' + msg + '</p>'
        + '<button onclick="fgReset()" style="margin-top:12px;font-size:0.78rem;padding:6px 14px;'
        + 'border-radius:6px;background:rgba(79,142,247,0.1);border:1px solid rgba(79,142,247,0.2);'
        + 'color:var(--accent);cursor:pointer;font-weight:600;">Coba Lagi</button>';
    }
  }

  /* ------------------------------------------
     UI: Render hasil ke output panel
  ------------------------------------------ */
  function renderResult(f, source) {
    currentFormula = f.formula || f.example_formula || '';

    var ph = document.getElementById('fg-placeholder');
    var ld = document.getElementById('fg-loading');
    var rs = document.getElementById('fg-result');
    if (ph) ph.style.display = 'none';
    if (ld) ld.style.display = 'none';
    if (rs) rs.style.display = 'block';

    var elName = document.getElementById('fg-name');
    var elForm = document.getElementById('fg-formula');
    var elSyntax = document.getElementById('fg-syntax');
    var elCase = document.getElementById('fg-case');
    var elEx = document.getElementById('fg-example');
    var elDiff = document.getElementById('fg-difficulty');
    var elSrc = document.getElementById('fg-source');
    var elAltW = document.getElementById('fg-alt-wrap');
    var elAlt = document.getElementById('fg-alt');
    var elAltLbl = document.getElementById('fg-alt-label');

    if (elName) elName.textContent = f.formula_name || '';
    if (elForm) elForm.textContent = f.formula || '';
    if (elSyntax) elSyntax.textContent = f.syntax_explanation || '';
    if (elCase) elCase.textContent = f.example_case || '';
    if (elEx) elEx.textContent = f.example_formula || '';
    if (elDiff) elDiff.textContent = f.difficulty || '';

    if (elSrc) {
      if (source === 'ai') {
        elSrc.textContent = '✨ AI Generated';
        elSrc.style.background = 'rgba(124,58,237,0.1)';
        elSrc.style.color = 'var(--accent-2)';
      } else {
        elSrc.textContent = '📚 Library';
        elSrc.style.background = 'rgba(16,185,129,0.1)';
        elSrc.style.color = 'var(--success)';
      }
    }

    var hasAlt = f.alternative_formula && f.alternative_formula !== 'null' && f.alternative_formula !== null;
    if (elAltW) elAltW.style.display = hasAlt ? 'block' : 'none';
    if (hasAlt) {
      if (elAlt) elAlt.textContent = f.alternative_formula;
      if (elAltLbl) elAltLbl.textContent = f.alternative_label || '';
    }
  }

  /* ------------------------------------------
     PUBLIC FUNCTIONS (dipanggil dari HTML)
  ------------------------------------------ */
  window.fgCopy = function () {
    if (!currentFormula) return;
    navigator.clipboard.writeText(currentFormula).then(function () {
      var btn = document.getElementById('fg-copy-btn');
      if (!btn) return;
      var orig = btn.textContent;
      btn.textContent = 'Tersalin!';
      btn.style.background = 'rgba(16,185,129,0.1)';
      btn.style.borderColor = 'rgba(16,185,129,0.2)';
      btn.style.color = 'var(--success)';
      setTimeout(function () {
        btn.textContent = orig;
        btn.style.background = 'rgba(79,142,247,0.1)';
        btn.style.borderColor = 'rgba(79,142,247,0.2)';
        btn.style.color = 'var(--accent)';
      }, 2000);
    });
  };

  window.fgReset = function () {
    currentFormula = '';
    var ph = document.getElementById('fg-placeholder');
    var ld = document.getElementById('fg-loading');
    var rs = document.getElementById('fg-result');
    if (ld) ld.style.display = 'none';
    if (rs) rs.style.display = 'none';
    if (ph) {
      ph.style.display = 'block';
      ph.innerHTML = '<div style="font-size:32px;margin-bottom:var(--space-3);" aria-hidden="true">⟨ƒ⟩</div>'
        + '<p style="color:var(--text-muted);font-size:0.9rem;">Deskripsikan kebutuhanmu di atas dan klik Buat Formula.'
        + ' Formula, penjelasan sintaks, dan contoh kerja akan muncul di sini.</p>';
    }
    var qi = document.getElementById('formula-query');
    var qs = document.getElementById('formula-category');
    if (qi) qi.value = '';
    if (qs) qs.value = 'all';
  };

  /* ------------------------------------------
     MAIN ENGINE: form submit handler
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {

    // Suggestion buttons
    document.querySelectorAll('.suggestion-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var qi = document.getElementById('formula-query');
        var qs = document.getElementById('formula-category');
        if (qi) qi.value = btn.dataset.query || '';
        if (qs && btn.dataset.category) qs.value = btn.dataset.category;
        var form = document.getElementById('formula-form');
        if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
      });
    });

    // Live category change
    var catEl = document.getElementById('formula-category');
    if (catEl) {
      catEl.addEventListener('change', function () {
        var qi = document.getElementById('formula-query');
        if (qi && qi.value.trim()) {
          var form = document.getElementById('formula-form');
          if (form) form.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
        }
      });
    }

    // Form submit — main engine
    var form = document.getElementById('formula-form');
    if (!form) return;

    form.addEventListener('submit', async function (e) {
      e.preventDefault();
      var query = (document.getElementById('formula-query').value || '').trim();
      var category = document.getElementById('formula-category').value || 'all';
      if (!query) return;

      // LAYER 1: Supabase
      showLoading('Mencari formula terbaik...');
      try {
        var supaResult = await querySupabase(query, category);
        if (supaResult) {
          renderResult(supaResult, 'library');
          return;
        }
      } catch (err) {
        console.warn('Supabase lookup gagal:', err);
      }

      // LAYER 2: Gemini fallback
      showLoading('Tidak ada di library, menghubungi AI...');
      try {
        var aiResult = await queryGemini(query, category);
        if (aiResult) {
          renderResult(aiResult, 'ai');
          return;
        }
      } catch (err) {
        console.warn('Gemini fallback gagal:', err);
      }

      showError('Formula tidak ditemukan. Coba deskripsikan dengan kata yang berbeda.');
    });

  });

})();
