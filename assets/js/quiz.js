/* ============================================
   EXCEL ANALYST HUB — QUIZ & QUICK REFERENCE
   quiz.js: Daily challenge logic, quick reference search/copy
   ============================================ */

(function () {
  'use strict';

  var CHALLENGE_KEY = 'eah_challenges';

  /* ------------------------------------------
     CHALLENGE POOL (30 challenges)
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
    },
    {
      id: 'c11',
      scenario: 'Kamu analis di PT Maju Bersama. Data penjualan ada di kolom A (nama produk) dan B (jumlah terjual). Kamu diminta cari berapa unit produk "Laptop" yang terjual.',
      question: 'Tulis formula untuk menjumlahkan kolom B hanya untuk baris yang kolom A-nya berisi "Laptop". Data ada di A2:B100.',
      answer: '=SUMIF(A2:A100,"Laptop",B2:B100)',
      hint: 'SUMIF(range_kriteria, kriteria, range_jumlah) — tiga argumen berurutan'
    },
    {
      id: 'c12',
      scenario: 'Bu Sari minta kamu cari nama karyawan berdasarkan ID karyawan. ID ada di kolom A, nama di kolom B, departemen di kolom C. Kamu punya ID "EMP-042".',
      question: 'Tulis formula VLOOKUP untuk mencari nama karyawan dengan ID "EMP-042". Tabel referensi ada di A2:C100.',
      answer: '=VLOOKUP("EMP-042",A2:C100,2,FALSE)',
      hint: 'VLOOKUP(nilai_cari, tabel, kolom_ke, FALSE untuk exact match)'
    },
    {
      id: 'c13',
      scenario: 'Laporan bulanan butuh kolom yang menampilkan "Lulus" jika nilai ujian >= 75, dan "Tidak Lulus" jika di bawah itu. Nilai ada di kolom C.',
      question: 'Tulis formula IF untuk menentukan status kelulusan di C2.',
      answer: '=IF(C2>=75,"Lulus","Tidak Lulus")',
      hint: 'IF(kondisi, nilai_jika_benar, nilai_jika_salah)'
    },
    {
      id: 'c14',
      scenario: 'Pak Budi minta rata-rata gaji karyawan di departemen IT. Data departemen ada di kolom B, gaji di kolom D.',
      question: 'Tulis formula untuk menghitung rata-rata gaji khusus departemen "IT". Data di B2:D100.',
      answer: '=AVERAGEIF(B2:B100,"IT",D2:D100)',
      hint: 'AVERAGEIF(range_kriteria, kriteria, range_rata-rata) — mirip SUMIF tapi untuk rata-rata'
    },
    {
      id: 'c15',
      scenario: 'Kamu punya daftar transaksi dengan kolom tanggal di A dan nilai transaksi di B. Perlu hitung total transaksi bulan Januari 2024 saja.',
      question: 'Tulis formula SUMIFS untuk menjumlahkan B2:B500 hanya untuk tanggal antara 1 Jan 2024 dan 31 Jan 2024.',
      answer: '=SUMIFS(B2:B500,A2:A500,">="&DATE(2024,1,1),A2:A500,"<="&DATE(2024,1,31))',
      hint: 'SUMIFS dengan dua kriteria tanggal — gunakan >= dan <= dengan DATE()'
    },
    {
      id: 'c16',
      scenario: 'Data nama lengkap karyawan ada di kolom A dengan format "Nama Depan Nama Belakang". Kamu diminta pisahkan nama depan ke kolom B.',
      question: 'Tulis formula untuk mengambil nama depan dari teks di A2 secara dinamis (tanpa hardcode jumlah karakter).',
      answer: '=LEFT(A2,FIND(" ",A2)-1)',
      hint: 'FIND(" ",A2) mencari posisi spasi, kurangi 1 untuk exclude spasi, lalu pakai LEFT'
    },
    {
      id: 'c17',
      scenario: 'Laporan keuangan perlu menampilkan angka 1500000 sebagai "Rp 1.500.000" dalam format teks untuk digabung dengan kalimat lain.',
      question: 'Tulis formula TEXT untuk mengformat angka di A2 menjadi format Rupiah dengan pemisah ribuan.',
      answer: '=TEXT(A2,"Rp #.##0")',
      hint: 'TEXT(nilai, format) — gunakan "#.##0" untuk format ribuan'
    },
    {
      id: 'c18',
      scenario: 'Kamu diminta hitung masa kerja karyawan dalam tahun lengkap. Tanggal masuk ada di kolom B, hari ini sebagai tanggal referensi.',
      question: 'Tulis formula untuk menghitung masa kerja dalam tahun lengkap dari tanggal di B2 hingga hari ini.',
      answer: '=DATEDIF(B2,TODAY(),"Y")',
      hint: 'DATEDIF(tanggal_mulai, tanggal_akhir, "Y") untuk tahun lengkap'
    },
    {
      id: 'c19',
      scenario: 'Tim finance butuh tahu tanggal terakhir bulan ini untuk deadline laporan. Formula harus otomatis update setiap bulan.',
      question: 'Tulis formula untuk mendapatkan tanggal terakhir bulan berjalan secara otomatis.',
      answer: '=EOMONTH(TODAY(),0)',
      hint: 'EOMONTH(tanggal, 0) mengembalikan hari terakhir bulan dari tanggal yang diberikan'
    },
    {
      id: 'c20',
      scenario: 'VLOOKUP-mu mengembalikan error #N/A untuk beberapa kode produk yang tidak ada di tabel referensi. Laporan harus tetap rapi.',
      question: 'Bungkus formula VLOOKUP(A2,D2:F100,2,FALSE) agar menampilkan teks kosong "" jika tidak ditemukan.',
      answer: '=IFERROR(VLOOKUP(A2,D2:F100,2,FALSE),"")',
      hint: 'IFERROR(formula, nilai_jika_error) — kalau formula error, tampilkan nilai alternatif'
    },
    {
      id: 'c21',
      scenario: 'Kamu perlu filter karyawan yang memenuhi dua syarat sekaligus: departemen "Finance" DAN status "Aktif". Data ada di kolom B (dept) dan C (status).',
      question: 'Tulis formula COUNTIFS untuk menghitung karyawan Finance yang aktif. Data dept di B2:B100, status di C2:C100.',
      answer: '=COUNTIFS(B2:B100,"Finance",C2:C100,"Aktif")',
      hint: 'COUNTIFS(range1, kriteria1, range2, kriteria2) untuk dua kondisi sekaligus'
    },
    {
      id: 'c22',
      scenario: 'Kolom A berisi kode barang format "PRD-2024-001". Kamu perlu ambil tahun (2024) yang selalu ada di posisi karakter 5-8.',
      question: 'Tulis formula untuk mengambil 4 karakter tahun dari kode di A2, dimulai dari posisi ke-5.',
      answer: '=MID(A2,5,4)',
      hint: 'MID(teks, posisi_mulai, jumlah_karakter) — posisi mulai dari 1'
    },
    {
      id: 'c23',
      scenario: 'Pak Rudi minta gabungkan kolom nama depan (A) dan nama belakang (B) menjadi nama lengkap dengan spasi di tengah.',
      question: 'Tulis formula untuk menggabungkan A2 dan B2 menjadi nama lengkap.',
      answer: '=A2&" "&B2',
      hint: 'Gunakan operator & untuk menggabungkan teks, tambahkan " " untuk spasi'
    },
    {
      id: 'c24',
      scenario: 'Data impor dari sistem lain punya banyak spasi tidak perlu di awal dan akhir nama karyawan, menyebabkan VLOOKUP gagal match.',
      question: 'Tulis formula untuk membersihkan spasi berlebih dari teks di A2.',
      answer: '=TRIM(A2)',
      hint: 'TRIM() menghapus semua spasi di awal, akhir, dan spasi ganda di tengah teks'
    },
    {
      id: 'c25',
      scenario: 'Kamu punya data penjualan 50 sales rep di kolom D. Direktur minta tahu nilai penjualan tertinggi ke-5 tanpa mengurutkan data.',
      question: 'Tulis formula untuk menemukan nilai terbesar ke-5 dari range D2:D51.',
      answer: '=LARGE(D2:D51,5)',
      hint: 'LARGE(range, k) mengembalikan nilai terbesar ke-k dalam sebuah range'
    },
    {
      id: 'c26',
      scenario: 'Sistem absensi perlu hitung hari kerja antara tanggal mulai proyek dan deadline, tidak termasuk Sabtu dan Minggu.',
      question: 'Tulis formula untuk menghitung hari kerja antara tanggal di A2 (mulai) dan B2 (selesai).',
      answer: '=NETWORKDAYS(A2,B2)',
      hint: 'NETWORKDAYS(tanggal_mulai, tanggal_selesai) otomatis exclude Sabtu dan Minggu'
    },
    {
      id: 'c27',
      scenario: 'Laporan penjualan perlu kategorikan performa: >= 100jt = "Excellent", >= 75jt = "Good", >= 50jt = "Average", di bawah itu = "Poor". Nilai di C2.',
      question: 'Tulis formula IFS untuk kategorikan performa penjualan di C2.',
      answer: '=IFS(C2>=100000000,"Excellent",C2>=75000000,"Good",C2>=50000000,"Average",TRUE,"Poor")',
      hint: 'IFS memeriksa kondisi berurutan — gunakan TRUE sebagai kondisi terakhir untuk default'
    },
    {
      id: 'c28',
      scenario: 'Tabel referensi harga ada di sheet "Harga" kolom A (kode) dan B (harga). Kamu perlu ambil harga berdasarkan kode di sheet aktif kolom A.',
      question: 'Tulis INDEX-MATCH untuk mencari harga dari sheet "Harga" berdasarkan kode di A2.',
      answer: '=INDEX(Harga!B:B,MATCH(A2,Harga!A:A,0))',
      hint: 'INDEX(kolom_hasil, MATCH(nilai_cari, kolom_cari, 0)) — lebih robust dari VLOOKUP'
    },
    {
      id: 'c29',
      scenario: 'Kamu diminta buat kolom status stok otomatis: tampilkan "Kritis" jika stok < 10, "Rendah" jika < 30, "Aman" jika >= 30. Stok di D2.',
      question: 'Tulis formula nested IF untuk status stok di D2.',
      answer: '=IF(D2<10,"Kritis",IF(D2<30,"Rendah","Aman"))',
      hint: 'Nested IF dari kondisi paling ketat dulu — cek < 10 sebelum cek < 30'
    },
    {
      id: 'c30',
      scenario: 'Data transaksi ada di kolom C (nilai). Kamu pakai filter untuk lihat region tertentu. Perlu hitung total hanya dari baris yang terlihat.',
      question: 'Tulis formula untuk menjumlahkan kolom C yang hanya menghitung baris yang tidak tersembunyi oleh filter.',
      answer: '=SUBTOTAL(9,C2:C100)',
      hint: 'SUBTOTAL(9, range) = SUM yang ignore baris tersembunyi — angka 9 berarti SUM'
    }
  ];

  /* ------------------------------------------
     DATE-BASED DAILY ROTATION (30 challenges pool)
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
