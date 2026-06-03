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
     DIFFICULTY LEVEL MAP
  ------------------------------------------ */
  var CHALLENGE_LEVELS = {
    beginner:     ['c01','c02','c03','c04','c11','c12','c13','c16','c23','c24'],
    intermediate: ['c05','c06','c07','c08','c14','c15','c17','c18','c19','c20','c22','c25','c26','c29','c30'],
    advanced:     ['c09','c10','c21','c27','c28']
  };

  /* ------------------------------------------
     DATE-BASED DAILY ROTATION (progressive difficulty)
  ------------------------------------------ */
  function getTodayChallenge() {
    var state;
    try { state = JSON.parse(localStorage.getItem(CHALLENGE_KEY) || '{}'); } catch (e) { state = {}; }

    var completed = state || {};
    var completedIds = Object.keys(completed).filter(function (k) {
      return completed[k] === true;
    });
    var completedCount = completedIds.length;

    // Progressive difficulty: expand pool based on experience
    var pool;
    if (completedCount < 5) {
      pool = CHALLENGES.filter(function (c) {
        return CHALLENGE_LEVELS.beginner.indexOf(c.id) !== -1;
      });
    } else if (completedCount < 15) {
      pool = CHALLENGES.filter(function (c) {
        return CHALLENGE_LEVELS.beginner.indexOf(c.id) !== -1 ||
               CHALLENGE_LEVELS.intermediate.indexOf(c.id) !== -1;
      });
    } else {
      pool = CHALLENGES;
    }

    // Skip already-completed challenges when possible
    var remaining = pool.filter(function (c) {
      return completedIds.indexOf(c.id) === -1;
    });
    if (!remaining.length) remaining = pool; // all done — cycle again

    // Date-based rotation within the filtered pool
    var dayIndex = Math.floor(Date.now() / 86400000) % remaining.length;
    return remaining[dayIndex];
  }

  function getCompleted() {
    // Coba pakai unified state dulu, fallback ke sistem lama
    if (window.EAH && typeof window.EAH.getChallengeState === 'function') {
      return window.EAH.getChallengeState();
    }
    try {
      return JSON.parse(localStorage.getItem('eah_challenges') || '{}');
    } catch (e) {
      return {};
    }
  }

  function markCompleted(id) {
    if (window.EAH && typeof window.EAH.markChallengeComplete === 'function') {
      window.EAH.markChallengeComplete(id);
    } else {
      var data = getCompleted();
      data[id] = true;
      try { localStorage.setItem('eah_challenges', JSON.stringify(data)); } catch(e) {}
    }
  }

  /* ------------------------------------------
     RENDER DAILY CHALLENGE
  ------------------------------------------ */
  function initDailyChallenge() {
    var dateEl = document.getElementById('challenge-date');
    var levelEl = document.getElementById('challenge-level');
    var scenarioEl = document.getElementById('challenge-scenario');
    var questionEl = document.getElementById('challenge-question');
    var formEl = document.getElementById('challenge-form');
    var inputEl = document.getElementById('challenge-input');
    var feedbackEl = document.getElementById('challenge-feedback');
    var hintBtn = document.getElementById('challenge-hint-btn');

    // Guard clause to ensure we are on tools.html with the new UI
    if (!dateEl || !scenarioEl || typeof CHALLENGES === 'undefined') return;

    // Select challenge based on current date
    var todayIndex = new Date().getDate() % CHALLENGES.length;
    var challenge = CHALLENGES[todayIndex];

    // Populate UI
    var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateEl.textContent = '📅 ' + new Date().toLocaleDateString('id-ID', options);
    if (levelEl) levelEl.textContent = 'Day ' + new Date().getDate();

    scenarioEl.textContent = challenge.scenario;
    questionEl.textContent = challenge.question;

    // Handle Form Submit
    if (formEl) {
      formEl.addEventListener('submit', function(e) {
        e.preventDefault();
        var userAns = inputEl.value.trim().toLowerCase().replace(/\s+/g, '');
        var trueAns = challenge.answer.trim().toLowerCase().replace(/\s+/g, '');
        
        feedbackEl.style.display = 'block';
        
        // Simple validation: exact match or contains the core formula
        if (userAns === trueAns || (userAns.length > 5 && trueAns.includes(userAns))) {
          feedbackEl.style.background = 'rgba(16, 185, 129, 0.1)';
          feedbackEl.style.color = '#10b981';
          feedbackEl.innerHTML = '✨ <strong>Benar!</strong> Jawaban yang tepat: <code>' + challenge.answer + '</code>';
          if (window.EAH && window.EAH.markChallengeComplete) {
            window.EAH.markChallengeComplete(challenge.id);
          }

          // --- SISTEM REWARD XP PROFIL ---
          try {
            let userData = JSON.parse(localStorage.getItem('eah_user_data'));
            if (!userData) {
              userData = { name: "Pengunjung", xp: 0, completedChallenges: 0 };
            }
            
            userData.xp += 50;
            userData.completedChallenges += 1;
            
            localStorage.setItem('eah_user_data', JSON.stringify(userData));
            
            // Menggunakan += agar pesan tidak menimpa teks "Jawaban Benar" bawaan
            const feedbackEl = document.getElementById('challenge-feedback');
            if (feedbackEl) {
              feedbackEl.innerHTML += "<br><br><span style='display: inline-block; padding: 6px 12px; background: rgba(245, 158, 11, 0.1); border: 1px solid #f59e0b; border-radius: 6px; color: #f59e0b; font-weight: bold; animation: pulse 2s infinite;'>🎉 +50 XP Berhasil Ditambahkan! Cek menu Profil.</span>";
            }
          } catch(e) {
            console.error("Sistem XP gagal memuat:", e);
          }
          // -------------------------------
        } else {
          feedbackEl.style.background = 'rgba(239, 68, 68, 0.1)';
          feedbackEl.style.color = '#ef4444';
          feedbackEl.innerHTML = '❌ <strong>Kurang tepat.</strong> Coba periksa kembali tanda kurung atau argumen rumusnya.';
        }
      });
    }

    // Handle Hint Button
    if (hintBtn) {
      hintBtn.addEventListener('click', function() {
        feedbackEl.style.display = 'block';
        feedbackEl.style.background = 'rgba(245, 158, 11, 0.1)';
        feedbackEl.style.color = '#d97706';
        feedbackEl.innerHTML = '💡 <strong>Petunjuk:</strong> ' + challenge.hint;
      });
    }
  }

  function getTodayLabel() {
    var days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
    var months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
    var d = new Date();
    return days[d.getDay()] + ', ' + d.getDate() + ' ' + months[d.getMonth()] + ' ' + d.getFullYear();
  }

  function getChallengeLevel(challengeId) {
    if (CHALLENGE_LEVELS.beginner.indexOf(challengeId) !== -1) return 'Pemula';
    if (CHALLENGE_LEVELS.intermediate.indexOf(challengeId) !== -1) return 'Menengah';
    if (CHALLENGE_LEVELS.advanced.indexOf(challengeId) !== -1) return 'Lanjutan';
    return 'Pemula';
  }

  function getLevelBadgeClass(challengeId) {
    if (CHALLENGE_LEVELS.beginner.indexOf(challengeId) !== -1) return 'badge-beginner';
    if (CHALLENGE_LEVELS.intermediate.indexOf(challengeId) !== -1) return 'badge-intermediate';
    if (CHALLENGE_LEVELS.advanced.indexOf(challengeId) !== -1) return 'badge-advanced';
    return 'badge-beginner';
  }

  /* ------------------------------------------
     SHORTCUT FLASHCARDS ENGINE
  ------------------------------------------ */
  var SHORTCUTS_DATA = [
    // --- NAVIGASI & SELEKSI DATA ---
    { name: "Pilih Seluruh Tabel/Blok Data", keys: "Ctrl + A", icon: "🔲" },
    { name: "Lompat ke Ujung Bawah Data", keys: "Ctrl + ↓", icon: "⬇️" },
    { name: "Lompat ke Ujung Kanan Data", keys: "Ctrl + →", icon: "➡️" },
    { name: "Blok Data Sampai Bawah", keys: "Ctrl + Shift + ↓", icon: "🔽" },
    { name: "Pindah Antar Sheet/Tab", keys: "Ctrl + PgUp/PgDn", icon: "📑" },

    // --- FORMATTING & LAYOUT ---
    { name: "Membuka Jendela Format Cells", keys: "Ctrl + 1", icon: "🎨" },
    { name: "Format Angka Jadi Mata Uang", keys: "Ctrl + Shift + $", icon: "💰" },
    { name: "Format Angka Jadi Persentase", keys: "Ctrl + Shift + %", icon: "📈" },
    { name: "Menyembunyikan Kolom", keys: "Ctrl + 0", icon: "👁️" },
    { name: "Menyembunyikan Baris", keys: "Ctrl + 9", icon: "👁️🗨️" },
    { name: "Baris Baru di Dalam Sel Sama", keys: "Alt + Enter", icon: "↩️" },

    // --- MANIPULASI DATA (CRUD) ---
    { name: "Tambah Baris/Kolom Baru", keys: "Ctrl + Shift + +", icon: "➕" },
    { name: "Hapus Baris/Kolom", keys: "Ctrl + -", icon: "➖" },
    { name: "Copy Data dari Sel Atasnya", keys: "Ctrl + D", icon: "⏬" },
    { name: "Copy Data dari Sel Kirinya", keys: "Ctrl + R", icon: "⏩" },
    { name: "Membuka Paste Special", keys: "Ctrl + Alt + V", icon: "📋" },
    { name: "Cari dan Ganti (Find & Replace)", keys: "Ctrl + H", icon: "🔎" },

    // --- ALAT ANALISIS & PIVOT ---
    { name: "Mengaktifkan/Hapus Filter", keys: "Ctrl + Shift + L", icon: "⚡" },
    { name: "Membuat Tabel Resmi (Insert Table)", keys: "Ctrl + T", icon: "📊" },
    { name: "Membuat PivotTable Baru", keys: "Alt + N + V", icon: "⊞" },
    { name: "Menyisipkan Grafik Instan", keys: "Alt + F1", icon: "📉" },
    { name: "Membuka Jendela Flash Fill", keys: "Ctrl + E", icon: "✨" },

    // --- RUMUS & AUDITING ---
    { name: "Membuat AutoSum Otomatis", keys: "Alt + =", icon: "∑" },
    { name: "Mengunci Sel (Absolute Reference)", keys: "F4", icon: "🔒" },
    { name: "Tampilkan Semua Rumus di Sheet", keys: "Ctrl + ~", icon: "👓" },
    { name: "Evaluasi/Hitung Bagian Rumus", keys: "F9", icon: "🧠" },
    { name: "Membuka Name Manager", keys: "Ctrl + F3", icon: "🏷️" },

    // --- DATA TINGKAT LANJUT ---
    { name: "Membuka Data Validation", keys: "Alt + A + V + V", icon: "🛡️" },
    { name: "Menyisipkan Tanggal Hari Ini", keys: "Ctrl + ;", icon: "📅" },
    { name: "Menyisipkan Waktu Saat Ini", keys: "Ctrl + Shift + :", icon: "⏱️" }
  ];

  function initQuickRef() {
    var searchInput = document.getElementById('shortcut-search');
    var container = document.getElementById('flashcards-container-target');
    if (!container) return;

    // Initial render
    renderFlashcards('');

    // Handle Live Search Input
    if (searchInput) {
      searchInput.addEventListener('input', function () {
        renderFlashcards(this.value);
      });
    }
  }

  function renderFlashcards(filterText) {
    var container = document.getElementById('flashcards-container-target');
    if (!container) return;

    container.innerHTML = '';
    var query = filterText.toLowerCase().trim();

    var filtered = SHORTCUTS_DATA.filter(function (item) {
      return item.name.toLowerCase().includes(query) || item.keys.toLowerCase().includes(query);
    });

    if (filtered.length === 0) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: var(--space-5);">🔍 Shortcut tidak ditemukan. Coba kata kunci lain!</div>';
      return;
    }

    filtered.forEach(function (item) {
      // Create component structure
      var wrapper = document.createElement('div');
      wrapper.className = 'flashcard-container';

      var flashcard = document.createElement('div');
      flashcard.className = 'flashcard';

      // Card Front
      var front = document.createElement('div');
      front.className = 'card-front';
      front.innerHTML = '<div class="icon">' + item.icon + '</div>' +
                        '<div class="action-title">' + item.name + '</div>' +
                        '<div class="hint-tap">Klik untuk melihat shortcut</div>';

      // Card Back
      var back = document.createElement('div');
      back.className = 'card-back';
      back.innerHTML = '<div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:var(--space-2);">Shortcut:</div>' +
                       '<kbd>' + item.keys + '</kbd>';

      // Assemble card
      flashcard.appendChild(front);
      flashcard.appendChild(back);
      wrapper.appendChild(flashcard);

      // Click event for 3D flip toggle
      wrapper.addEventListener('click', function() {
        flashcard.classList.toggle('is-flipped');
      });

      container.appendChild(wrapper);
    });
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
    try {
      initDailyChallenge();
    } catch (e) {
      console.error("Daily Challenge failed to initialize:", e);
    }
    try {
      initQuickRef();
    } catch (e) {
      console.error("Quick Ref failed to initialize:", e);
    }
  });

})();
