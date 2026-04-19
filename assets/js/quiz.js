/* ============================================
   EXCEL ANALYST HUB — QUIZ & QUICK REFERENCE
   quiz.js: Daily challenge logic, quick reference search/copy
   ============================================ */

(function () {
  'use strict';

  var CHALLENGE_KEY = 'eah_challenges';

  /* ------------------------------------------
     CHALLENGE POOL (10 challenges)
  ------------------------------------------ */
  var CHALLENGES = [
    {
      id: 'c01',
      scenario: 'Kamu punya data penjualan di A1:B100. Kolom A berisi nama region (misalnya "West", "East") dan kolom B berisi jumlah penjualan.',
      question: 'Tulis formula untuk menjumlahkan penjualan hanya untuk region "West".',
      answer: '=SUMIF(A1:A100, "West", B1:B100)',
      hint: 'Gunakan SUMIF dengan kolom region sebagai range dan criteria. Sum_range (kolom B) berada di paling akhir.'
    },
    {
      id: 'c02',
      scenario: 'Kolom D1:D50 berisi angka penjualan untuk 50 SKU produk yang berbeda.',
      question: 'Temukan nilai tertinggi ke-3 tanpa mengurutkan datanya.',
      answer: '=LARGE(D1:D50, 3)',
      hint: 'Fungsi LARGE mengembalikan nilai terbesar ke-k dalam kumpulan data. =LARGE(range, 1) sama dengan MAX; =LARGE(range, 2) adalah nilai terbesar kedua; dst.'
    },
    {
      id: 'c03',
      scenario: 'Kamu punya kolom nama karyawan di A dan departemen mereka di B.',
      question: 'Hitung berapa banyak karyawan yang berada di departemen "Finance".',
      answer: '=COUNTIF(B:B, "Finance")',
      hint: 'COUNTIF(range, criteria) — masukkan kolom sebagai range dan nama departemen dalam tanda kutip sebagai criteria.'
    },
    {
      id: 'c04',
      scenario: 'Cell A1 berisi nama lengkap dengan format "Budi Santoso" (nama depan, spasi, nama belakang).',
      question: 'Tulis formula untuk mengambil hanya nama depan secara dinamis.',
      answer: '=LEFT(A1, FIND(" ", A1) - 1)',
      hint: 'FIND(" ", A1) menemukan posisi spasi. Kurangi 1 untuk mengecualikan spasi, lalu gunakan LEFT untuk mengambil sejumlah karakter dari awal.'
    },
    {
      id: 'c05',
      scenario: 'Nilai ujian ada di kolom A. Kamu perlu mengkategorikan: 90+ = "Sangat Baik", 70–89 = "Baik", di bawah 70 = "Perlu Ditingkatkan".',
      question: 'Tulis formula untuk mengkategorikan nilai di A1.',
      answer: '=IFS(A1>=90, "Sangat Baik", A1>=70, "Baik", TRUE, "Perlu Ditingkatkan")',
      hint: 'IFS memeriksa kondisi secara berurutan dan mengembalikan kecocokan pertama. TRUE terakhir berfungsi sebagai "else" — menangkap semua yang tidak cocok dengan kondisi sebelumnya.'
    },
    {
      id: 'c06',
      scenario: 'Formula VLOOKUP-mu mengembalikan #N/A ketika kode produk tidak ditemukan di tabel referensi.',
      question: 'Bungkus VLOOKUP agar menampilkan "Tidak Terdaftar" sebagai pengganti error #N/A.',
      answer: '=IFERROR(VLOOKUP(A1, D:F, 2, FALSE), "Tidak Terdaftar")',
      hint: 'IFERROR(formula, nilai_cadangan) — jika formula menghasilkan error, ia mengembalikan nilai cadangan. Jika tidak, ia mengembalikan hasil formula.'
    },
    {
      id: 'c07',
      scenario: 'Kamu punya kode employee ID seperti "EMP-20240315-001" di cell A1. Format selalu: EMP-YYYYMMDD-XXX.',
      question: 'Ambil hanya bagian tanggal "20240315" dari ID tersebut.',
      answer: '=MID(A1, 5, 8)',
      hint: 'Hitung dengan cermat: "EMP-" adalah 4 karakter, jadi tanggal dimulai di posisi 5. Tanggal selalu 8 karakter (YYYYMMDD). MID(teks, awal, jumlah_karakter).'
    },
    {
      id: 'c08',
      scenario: 'Kamu punya kode produk di kolom A dan harga di kolom B. Kamu ingin mencari harga produk "P-2024-001".',
      question: 'Tulis formula INDEX-MATCH untuk mengambil harga tersebut.',
      answer: '=INDEX(B:B, MATCH("P-2024-001", A:A, 0))',
      hint: 'MATCH menemukan baris di mana "P-2024-001" muncul di kolom A (mengembalikan nomor baris). INDEX kemudian mengambil nilai dari kolom B di nomor baris tersebut.'
    },
    {
      id: 'c09',
      scenario: 'Tanggal transaksi ada di cell A1 dan format yang dibutuhkan untuk laporan adalah "15 April 2024".',
      question: 'Tulis formula untuk menampilkan tanggal dalam format tersebut.',
      answer: '=TEXT(A1, "dd mmmm yyyy")',
      hint: 'TEXT(nilai, format) mengkonversi angka/tanggal menjadi teks berformat. "dd" = hari dua digit, "mmmm" = nama bulan lengkap, "yyyy" = tahun empat digit. Hasilnya adalah teks, bukan tanggal.'
    },
    {
      id: 'c10',
      scenario: 'Kamu punya kolom jumlah penjualan dan kolom region. Kamu ingin rata-rata penjualan hanya untuk region "North".',
      question: 'Tulis formula untuk menghitung rata-rata penjualan hanya untuk region "North".',
      answer: '=AVERAGEIF(B2:B100, "North", C2:C100)',
      hint: 'AVERAGEIF bekerja seperti SUMIF: range (di mana kondisi diperiksa), criteria (apa yang dicocokkan), average_range (apa yang dirata-ratakan).'
    }
  ];

  /* ------------------------------------------
     DATE-BASED DAILY ROTATION
  ------------------------------------------ */
  function getTodayChallenge() {
    var dayIndex = Math.floor(Date.now() / 86400000) % CHALLENGES.length;
    return CHALLENGES[dayIndex];
  }

  function getCompleted() {
    try {
      return JSON.parse(localStorage.getItem(CHALLENGE_KEY) || '{}');
    } catch (e) {
      return {};
    }
  }

  function markCompleted(id) {
    var data = getCompleted();
    data[id] = true;
    localStorage.setItem(CHALLENGE_KEY, JSON.stringify(data));
  }

  /* ------------------------------------------
     RENDER DAILY CHALLENGE
  ------------------------------------------ */
  function initDailyChallenge() {
    var container = document.getElementById('daily-challenge');
    if (!container) return;

    var challenge = getTodayChallenge();
    var completed = getCompleted();
    var isDone = !!completed[challenge.id];

    container.innerHTML =
      '<div class="challenge-day-label">Tantangan Hari Ini — ' + getTodayLabel() + '</div>' +
      '<div class="challenge-body">' +
        '<p class="challenge-scenario">' + escapeHtml(challenge.scenario) + '</p>' +
        '<p class="challenge-question"><strong>Soal:</strong> ' + escapeHtml(challenge.question) + '</p>' +
        '<div class="challenge-answer hidden" id="challenge-answer">' +
          '<div class="formula-block">' + escapeHtml(challenge.answer) + '</div>' +
          '<p class="challenge-hint">💡 ' + escapeHtml(challenge.hint) + '</p>' +
        '</div>' +
        '<div class="challenge-actions">' +
          '<button class="btn-ghost btn-sm" id="reveal-btn">Lihat Jawaban</button>' +
          '<button class="btn-primary btn-sm' + (isDone ? ' done' : '') + '" id="done-btn">' +
            (isDone ? '✓ Selesai Hari Ini' : 'Tandai Selesai') +
          '</button>' +
        '</div>' +
      '</div>';

    // Reveal button toggle
    var answerEl = document.getElementById('challenge-answer');
    var revealBtn = document.getElementById('reveal-btn');
    var doneBtn = document.getElementById('done-btn');

    var showing = false;
    revealBtn.addEventListener('click', function () {
      showing = !showing;
      if (showing) {
        answerEl.classList.remove('hidden');
        revealBtn.textContent = 'Sembunyikan Jawaban';
      } else {
        answerEl.classList.add('hidden');
        revealBtn.textContent = 'Lihat Jawaban';
      }
    });

    // Tombol tandai selesai
    doneBtn.addEventListener('click', function () {
      markCompleted(challenge.id);
      doneBtn.textContent = '✓ Selesai Hari Ini';
      doneBtn.classList.add('done');
    });
  }

  function getTodayLabel() {
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    var d = new Date();
    return days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  /* ------------------------------------------
     QUICK REFERENCE DATA
  ------------------------------------------ */
  var SHORTCUTS = [
    // Navigasi
    { category: 'Navigasi', key: 'Ctrl + Home', desc: 'Pergi ke sel A1' },
    { category: 'Navigasi', key: 'Ctrl + End', desc: 'Pergi ke sel terakhir yang digunakan di sheet' },
    { category: 'Navigasi', key: 'Ctrl + Arrow', desc: 'Lompat ke tepi wilayah data yang berkesinambungan' },
    { category: 'Navigasi', key: 'Ctrl + F', desc: 'Buka dialog Find & Replace' },
    { category: 'Navigasi', key: 'Ctrl + G / F5', desc: 'Go To (navigasi ke sel atau rentang tertentu)' },
    { category: 'Navigasi', key: 'Ctrl + Page Up/Down', desc: 'Pindah antar tab worksheet' },
    { category: 'Navigasi', key: 'Ctrl + Tab', desc: 'Beralih antar workbook Excel yang terbuka' },
    // Seleksi
    { category: 'Seleksi', key: 'Ctrl + Shift + End', desc: 'Perluas seleksi ke sel terakhir yang digunakan' },
    { category: 'Seleksi', key: 'Ctrl + Shift + Arrow', desc: 'Perluas seleksi ke tepi wilayah data' },
    { category: 'Seleksi', key: 'Ctrl + Space', desc: 'Pilih seluruh kolom' },
    { category: 'Seleksi', key: 'Shift + Space', desc: 'Pilih seluruh baris' },
    { category: 'Seleksi', key: 'Ctrl + A', desc: 'Pilih semua (tekan pertama: region aktif; tekan kedua: seluruh sheet)' },
    { category: 'Seleksi', key: 'Ctrl + Shift + L', desc: 'Aktifkan/nonaktifkan AutoFilter' },
    // Formula
    { category: 'Formula', key: 'F2', desc: 'Masuk ke mode edit pada sel aktif' },
    { category: 'Formula', key: 'Ctrl + `', desc: 'Beralih antara tampilan formula dan tampilan nilai' },
    { category: 'Formula', key: 'F4', desc: 'Ganti referensi absolut/relatif — bergantian di $A$1, A$1, $A1, A1' },
    { category: 'Formula', key: 'Ctrl + Shift + Enter', desc: 'Masukkan sebagai formula array (Excel lama; tidak diperlukan di 365)' },
    { category: 'Formula', key: 'Ctrl + D', desc: 'Fill down — salin sel teratas ke sel yang dipilih di bawah' },
    { category: 'Formula', key: 'Ctrl + R', desc: 'Fill right — salin sel paling kiri ke sel yang dipilih' },
    { category: 'Formula', key: 'Alt + =', desc: 'Auto-Sum — sisipkan formula SUM untuk sel di atas' },
    { category: 'Formula', key: 'F9', desc: 'Hitung ulang semua formula di semua workbook yang terbuka' },
    // Pemformatan
    { category: 'Pemformatan', key: 'Ctrl + 1', desc: 'Buka dialog Format Cells (semua opsi pemformatan)' },
    { category: 'Pemformatan', key: 'Ctrl + B', desc: 'Tebal (Bold)' },
    { category: 'Pemformatan', key: 'Ctrl + I', desc: 'Miring (Italic)' },
    { category: 'Pemformatan', key: 'Ctrl + U', desc: 'Garis bawah (Underline)' },
    { category: 'Pemformatan', key: 'Ctrl + Shift + $', desc: 'Terapkan format mata uang' },
    { category: 'Pemformatan', key: 'Ctrl + Shift + %', desc: 'Terapkan format persentase' },
    { category: 'Pemformatan', key: 'Alt + H + H', desc: 'Buka pemilih warna isian (fill color)' },
    { category: 'Pemformatan', key: 'Ctrl + Shift + ~', desc: 'Terapkan format angka Umum (hapus semua pemformatan)' }
  ];

  /* ------------------------------------------
     QUICK REFERENCE TABLE
  ------------------------------------------ */
  function renderRefTable(filter) {
    var tbody = document.getElementById('shortcut-table-body');
    if (!tbody) return;

    var q = (filter || '').toLowerCase().trim();
    var filtered = q
      ? SHORTCUTS.filter(function (s) {
          return s.key.toLowerCase().includes(q) ||
                 s.desc.toLowerCase().includes(q) ||
                 s.category.toLowerCase().includes(q);
        })
      : SHORTCUTS;

    if (!filtered.length) {
      tbody.innerHTML = '<tr><td colspan="3" style="text-align:center;color:var(--text-muted);padding:var(--space-8);">Tidak ada shortcut yang ditemukan untuk "' + escapeHtml(filter) + '"</td></tr>';
      return;
    }

    tbody.innerHTML = filtered.map(function (s) {
      return '<tr>' +
        '<td><span class="badge-category">' + escapeHtml(s.category) + '</span></td>' +
        '<td>' +
          '<code class="shortcut-key" data-copy="' + escapeAttr(s.key) + '" title="Click to copy">' + escapeHtml(s.key) + '</code>' +
        '</td>' +
        '<td>' + escapeHtml(s.desc) + '</td>' +
      '</tr>';
    }).join('');

    // Attach copy handlers
    tbody.querySelectorAll('.shortcut-key').forEach(function (key) {
      key.addEventListener('click', function () {
        window.copyToClipboard(key.dataset.copy, key, '✓ Copied');
      });
    });
  }

  function initQuickRef() {
    var search = document.getElementById('shortcut-search');
    var tbody = document.getElementById('shortcut-table-body');
    if (!tbody) return;

    renderRefTable('');

    if (search) {
      search.addEventListener('input', function () {
        renderRefTable(this.value);
      });
    }
  }

  /* ------------------------------------------
     UTILITIES
  ------------------------------------------ */
  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function escapeAttr(str) {
    return String(str || '').replace(/"/g, '&quot;');
  }

  /* ------------------------------------------
     INIT
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initDailyChallenge();
    initQuickRef();
  });

})();
