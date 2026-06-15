/* ============================================
   EXCEL ANALYST HUB — FORMULA GENERATOR
   formula-gen.js: Pattern database, matching logic, output rendering
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     FORMULA PATTERN DATABASE
  ------------------------------------------ */
  var FORMULAS = {
    lookup: [
      {
        name: 'VLOOKUP',
        syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
        description: 'Mencari nilai di kolom paling kiri sebuah rentang (range) dan mengembalikan nilai di baris yang sama dari kolom lain. Gunakan FALSE (atau 0) untuk pencarian yang persis sama — ini yang paling sering digunakan.',
        example: '=VLOOKUP(A2, $D$2:$F$100, 2, FALSE)',
        tip: 'Kunci table_array dengan tanda $ agar tidak bergeser saat Anda menyalin rumus ke bawah.',
        keywords: ['find', 'search', 'lookup', 'match', 'value in table', 'look up', 'find value', 'get value', 'retrieve', 'fetch', 'cari', 'temukan', 'cari nilai', 'cari data', 'ambil data', 'ambil nilai', 'berdasarkan', 'sesuai', 'cocokkan']
      },
      {
        name: 'INDEX-MATCH',
        syntax: '=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))',
        description: 'Lebih fleksibel dari VLOOKUP — bisa mencari ke kiri, tidak terpengaruh jika ada penambahan kolom, dan lebih cepat pada dataset yang besar. Lebih disukai oleh analis berpengalaman.',
        example: '=INDEX(C2:C100, MATCH(A2, B2:B100, 0))',
        tip: 'MATCH menemukan posisi baris (dalam bentuk angka), lalu INDEX menggunakan angka tersebut untuk mengambil nilainya. Anggap saja sebagai dua fungsi pencarian terpisah yang bekerja sama.',
        keywords: ['index', 'match', 'flexible lookup', 'look left', 'index match', 'better than vlookup', 'two-way lookup', 'bi-directional', 'cari fleksibel', 'lebih baik dari vlookup', 'cari ke kiri', 'tidak rusak']
      },
      {
        name: 'HLOOKUP',
        syntax: '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])',
        description: 'Seperti VLOOKUP namun mencari secara horizontal di sepanjang baris pertama, bukan ke bawah di kolom pertama. Digunakan ketika header data Anda berada di baris, bukan di kolom.',
        example: '=HLOOKUP("Q3", $B$1:$E$10, 3, FALSE)',
        tip: 'Jika data Anda ada di tabel normal (header di baris 1, data di bawahnya), gunakan VLOOKUP. HLOOKUP digunakan untuk tata letak yang ditranspose/horizontal.',
        keywords: ['hlookup', 'horizontal lookup', 'search row', 'lookup row', 'row lookup', 'cari horizontal', 'cari baris']
      },
      {
        name: 'XMATCH',
        syntax: '=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])',
        description: 'Pengganti modern untuk MATCH — mendukung pencarian dengan wildcard, pencarian perkiraan, dan pencarian dari bawah. Tersedia di Excel 365 dan Excel 2021+.',
        example: '=XMATCH(A2, B2:B100, 0)',
        tip: 'Gabungkan dengan XLOOKUP atau INDEX untuk fleksibilitas yang lebih dari sekadar INDEX-MATCH.',
        keywords: ['xmatch', 'modern match', '365', 'find position', 'position of', 'posisi', 'temukan posisi']
      }
    ],
    math: [
      {
        name: 'SUMIF',
        syntax: '=SUMIF(range, criteria, [sum_range])',
        description: 'Menjumlahkan nilai dalam suatu range yang memenuhi satu kriteria tertentu. Range adalah tempat Anda mengecek kriteria; sum_range adalah nilai yang akan dijumlahkan.',
        example: '=SUMIF(B2:B100, "West", C2:C100)',
        tip: 'Jika sum_range tidak diisi, maka rumus akan menjumlahkan range kriteria. Gunakan tanda kutip ganda untuk kriteria teks: "West", bukan West.',
        keywords: ['sum if', 'conditional sum', 'total by', 'add if', 'sum where', 'total where', 'sum by region', 'sum by category', 'jumlahkan jika', 'total jika', 'jumlah berdasarkan', 'total berdasarkan', 'jumlahkan berdasarkan', 'hitung total', 'total per kategori', 'total per wilayah', 'total per region', 'jumlah per', 'penjumlahan kondisi', 'sum kondisi']
      },
      {
        name: 'SUMIFS',
        syntax: '=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2, ...])',
        description: 'Menjumlahkan nilai yang memenuhi beberapa kriteria sekaligus. Lebih fleksibel dari SUMIF — dan perhatikan bahwa sum_range diletakkan paling awal.',
        example: '=SUMIFS(C2:C100, B2:B100, "West", D2:D100, "Q3")',
        tip: 'SUMIFS selalu mensyaratkan sum_range sebagai argumen pertama, tidak seperti SUMIF di mana argumen ini opsional dan berada di akhir.',
        keywords: ['sumifs', 'sum multiple conditions', 'sum two criteria', 'sum and', 'total multiple', 'conditional sum multiple', 'jumlahkan beberapa kondisi', 'total dua kriteria', 'jumlah dan', 'total dengan syarat']
      },
      {
        name: 'COUNTIF',
        syntax: '=COUNTIF(range, criteria)',
        description: 'Menghitung jumlah sel dalam suatu range yang memenuhi satu kondisi tunggal. Gunakan ini untuk mencari tahu berapa banyak karyawan di suatu departemen, berapa banyak pesanan yang melampaui batas tertentu, dll.',
        example: '=COUNTIF(A2:A100, "Active")',
        tip: 'Anda dapat menggunakan wildcard: COUNTIF(A:A, "Budi*") menghitung semua sel yang diawali dengan "Budi". Gunakan ">100" dengan tanda kutip untuk menghitung nilai lebih dari 100.',
        keywords: ['count if', 'conditional count', 'how many', 'count where', 'number of', 'count by', 'tally', 'hitung jika', 'hitung berdasarkan', 'berapa banyak', 'jumlah data', 'hitung data', 'count berdasarkan', 'hitung per', 'berapa jumlah', 'hitung kategori', 'hitung status', 'hitung karyawan aktif', 'hitung transaksi']
      },
      {
        name: 'AVERAGEIF',
        syntax: '=AVERAGEIF(range, criteria, [average_range])',
        description: 'Mengembalikan rata-rata sel yang memenuhi satu kondisi. Berguna untuk menghitung rata-rata penjualan per region, rata-rata nilai per departemen, dll.',
        example: '=AVERAGEIF(B2:B100, "North", C2:C100)',
        tip: 'Seperti SUMIF, jika average_range tidak diisi, maka rumus akan merata-ratakan range kriteria.',
        keywords: ['average if', 'conditional average', 'mean by', 'average where', 'average for', 'mean for', 'rata-rata jika', 'rata-rata berdasarkan', 'rata rata per', 'average kondisi', 'rata rata per departemen', 'rata-rata per kategori', 'rata-rata kondisi', 'average per wilayah']
      },
      {
        name: 'LARGE',
        syntax: '=LARGE(array, k)',
        description: 'Mengembalikan nilai terbesar ke-k dalam sebuah kumpulan data. =LARGE(D1:D50, 1) sama dengan MAX. =LARGE(D1:D50, 3) memberikan nilai tertinggi ketiga tanpa perlu mengurutkan (sorting) data.',
        example: '=LARGE(D1:D50, 3)',
        tip: 'Gunakan SMALL() untuk nilai terkecil ke-k. Fungsi-fungsi ini mengabaikan sel kosong dan teks.',
        keywords: ['largest', 'top', 'highest', 'kth largest', 'third largest', 'second largest', 'rank', 'nth highest', 'terbesar', 'nilai terbesar', 'tertinggi', 'peringkat atas', 'ranking tertinggi', 'terbesar kedua', 'terbesar ketiga']
      },
      {
        name: 'SUBTOTAL',
        syntax: '=SUBTOTAL(function_num, ref1, [ref2, ...])',
        description: 'Mengembalikan hasil agregat yang secara otomatis mengabaikan baris yang tersembunyi. Gunakan function_num 9 untuk SUM, 2 untuk COUNT, 1 untuk AVERAGE. Sangat cocok untuk tabel yang difilter.',
        example: '=SUBTOTAL(9, C2:C100)',
        tip: 'Tidak seperti SUM, SUBTOTAL mengabaikan baris yang disembunyikan oleh filter. Ini menjadikannya fungsi yang tepat untuk membuat subtotal pada tabel yang difilter.',
        keywords: ['subtotal', 'filtered sum', 'visible only', 'sum visible', 'filter total', 'exclude hidden', 'jumlah terlihat', 'sum filter', 'total yang difilter']
      }
    ],
    text: [
      {
        name: 'LEFT',
        syntax: '=LEFT(text, [num_chars])',
        description: 'Mengambil sejumlah karakter dari sisi kiri sebuah teks. Berguna untuk mengambil kode, awalan (prefix), atau bagian depan dari suatu nama.',
        example: '=LEFT(A2, 3)',
        tip: 'Untuk mengambil teks hingga karakter yang posisinya bisa berubah (seperti spasi), gabungkan dengan FIND: =LEFT(A2, FIND(" ", A2) - 1)',
        keywords: ['left', 'extract', 'first characters', 'first letters', 'prefix', 'starting characters', 'ambil kiri', 'karakter kiri', 'awalan', 'bagian kiri', 'nama depan', 'kode awal']
      },
      {
        name: 'RIGHT',
        syntax: '=RIGHT(text, [num_chars])',
        description: 'Mengambil sejumlah karakter dari sisi kanan sebuah teks. Berguna untuk mengekstrak ekstensi, akhiran (suffix), atau bagian terakhir dari sebuah kode.',
        example: '=RIGHT(A2, 4)',
        tip: 'Untuk mengekstrak teks setelah karakter tertentu, gunakan: =RIGHT(A2, LEN(A2) - FIND("-", A2))',
        keywords: ['right', 'last characters', 'extract end', 'suffix', 'end of text', 'last letters', 'ambil kanan', 'karakter kanan', 'akhiran', 'bagian kanan']
      },
      {
        name: 'MID',
        syntax: '=MID(text, start_num, num_chars)',
        description: 'Mengekstrak substring dari bagian tengah sebuah teks. Tentukan posisi awal dimulainya pengambilan (1 = karakter pertama) dan berapa banyak karakter yang ingin diambil.',
        example: '=MID(A2, 5, 8)',
        tip: 'Hitung karakter dengan cermat: dalam teks "EMP-20240315-001", bagian tanggal dimulai pada posisi ke-5 dan panjangnya 8 karakter.',
        keywords: ['mid', 'middle', 'substring', 'extract middle', 'extract from position', 'slice', 'portion of text', 'ambil tengah', 'karakter tengah', 'bagian tengah']
      },
      {
        name: 'CONCATENATE / CONCAT',
        syntax: '=CONCAT(text1, text2, ...) atau =text1 & " " & text2',
        description: 'Menggabungkan dua atau lebih string teks menjadi satu. Operator & adalah cara yang paling sederhana. TEXTJOIN lebih baik jika menggabungkan banyak nilai dengan sebuah pemisah (delimiter).',
        example: '=CONCAT(A2, " ", B2)  atau  =A2 & " " & B2',
        tip: 'Gunakan TEXTJOIN(", ", TRUE, A2:A10) untuk menggabungkan sekumpulan sel (range) dengan pemisah koma, tanpa mengikutsertakan sel yang kosong.',
        keywords: ['join', 'combine', 'merge text', 'concatenate', 'connect', 'append', 'combine columns', 'full name', 'gabungkan', 'sambungkan', 'gabung teks', 'sambung teks', 'nama lengkap', 'gabung kolom', 'satukan teks', 'join teks']
      },
      {
        name: 'TEXT',
        syntax: '=TEXT(value, format_text)',
        description: 'Mengubah format angka atau tanggal menjadi teks dengan format spesifik. Sangat penting untuk membuat tanggal yang mudah dibaca, nilai mata uang (currency) berformat, atau teks persentase dalam kalimat yang digabung.',
        example: '=TEXT(A2, "dd mmmm yyyy")',
        tip: 'Format umum: "dd/mm/yyyy" untuk tanggal, "#,##0" untuk angka ribuan dengan koma/titik, "0.0%" untuk persen. Hasilnya berupa teks — Anda tidak bisa menggunakannya untuk operasi hitung matematika.',
        keywords: ['text format', 'number to text', 'date format', 'format date', 'format number', 'display as', 'indonesian date', 'format tanggal', 'format angka', 'ubah format', 'tampilkan sebagai', 'format rupiah', 'format persen', 'angka ke teks', 'tanggal ke teks']
      },
      {
        name: 'TRIM',
        syntax: '=TRIM(text)',
        description: 'Menghapus semua spasi berlebih dari teks — spasi di awal, di akhir, dan multi-spasi di antara kata (menyisakan hanya satu spasi). Ini adalah hal pertama yang harus dijalankan saat membersihkan data (data cleaning).',
        example: '=TRIM(A2)',
        tip: 'TRIM hanya menghapus karakter spasi standar (ASCII 32). Jika data mengandung non-breaking space (misalnya copas dari web/HTML), gunakan SUBSTITUTE(TRIM(A2), CHAR(160), " ")',
        keywords: ['trim', 'remove spaces', 'clean text', 'leading spaces', 'trailing spaces', 'extra spaces', 'hapus spasi', 'bersihkan spasi', 'spasi berlebih', 'trim spasi', 'hapus spasi kosong', 'data cleaning teks', 'bersihkan data', 'spasi di awal', 'spasi di akhir']
      }
    ],
    date: [
      {
        name: 'TODAY',
        syntax: '=TODAY()',
        description: 'Mengembalikan tanggal hari ini, dan diperbarui secara otomatis setiap kali lembar kerja menghitung ulang kalkulasi. Gunakan tanpa argumen. Sempurna untuk menghitung umur, keterlambatan bayar, atau hari tersisa menuju tenggat waktu.',
        example: '=TODAY() - A2  →  hari sejak tanggal di sel A2',
        tip: 'TODAY() hanya menghasilkan tanggal. Gunakan NOW() jika Anda juga membutuhkan waktu saat ini. Keduanya ter-update secara otomatis.',
        keywords: ['today', 'current date', 'date now', 'todays date', 'this date', 'hari ini', 'tanggal hari ini', 'tanggal sekarang', 'tanggal saat ini', 'hitung umur', 'selisih hari', 'sudah berapa hari']
      },
      {
        name: 'NOW',
        syntax: '=NOW()',
        description: 'Mengembalikan tanggal dan waktu saat ini (current date and time). Berguna untuk membuat stempel waktu (timestamp) pada entri data atau menghitung waktu yang berlalu. Diperbarui otomatis.',
        example: '=NOW()',
        tip: 'Untuk hanya mengambil porsi waktu dari NOW, gunakan =NOW() - TODAY(). Format sel tersebut sebagai "h:mm AM/PM" untuk menampilkannya dengan benar.',
        keywords: ['now', 'current time', 'datetime', 'timestamp', 'current datetime', 'sekarang', 'waktu sekarang', 'tanggal dan waktu']
      },
      {
        name: 'DATEDIF',
        syntax: '=DATEDIF(start_date, end_date, unit)',
        description: 'Menghitung selisih antara dua tanggal. Unit: "Y" = tahun penuh, "M" = bulan penuh, "D" = hari. Gunakan "YM" untuk menghitung bulan namun mengabaikan tahunnya. Sangat berguna untuk menghitung masa kerja (tenure) karyawan atau umur pelanggan.',
        example: '=DATEDIF(B2, TODAY(), "Y") & " tahun"',
        tip: 'DATEDIF adalah rumus tersembunyi namun berfungsi penuh (tidak muncul di autocomplete Excel). Pastikan tanggal yang lebih lama dimasukkan terlebih dahulu (di depan).',
        keywords: ['date difference', 'age', 'years between', 'months between', 'tenure', 'how long', 'duration', 'masa kerja', 'selisih tanggal', 'hitung usia', 'umur', 'lama bekerja', 'berapa tahun', 'berapa bulan', 'durasi', 'umur karyawan', 'durasi kerja', 'tenure karyawan', 'hitung masa kerja']
      },
      {
        name: 'EOMONTH',
        syntax: '=EOMONTH(start_date, months)',
        description: 'Menghasilkan tanggal hari terakhir dalam suatu bulan, berdasarkan jumlah bulan sebelum atau sesudah tanggal tertentu. months=0 memberikan hari terakhir bulan ini; months=1 memberikan hari terakhir bulan depan.',
        example: '=EOMONTH(TODAY(), 0)',
        tip: 'Tambahkan + 1 pada rumus EOMONTH untuk mendapatkan tanggal 1 (hari pertama) di bulan berikutnya: =EOMONTH(A2, 0) + 1',
        keywords: ['end of month', 'last day', 'month end', 'eomonth', 'last date of month', 'close period', 'akhir bulan', 'tanggal terakhir bulan', 'last day', 'tutup bulan']
      },
      {
        name: 'NETWORKDAYS',
        syntax: '=NETWORKDAYS(start_date, end_date, [holidays])',
        description: 'Menghitung jumlah hari kerja antara dua tanggal, secara otomatis tidak termasuk hari Sabtu dan Minggu (weekend). Masukkan sekumpulan tanggal libur (holidays) sebagai argumen ketiga opsional.',
        example: '=NETWORKDAYS(A2, B2, HolidayList)',
        tip: 'Untuk libur nasional di Indonesia, buatlah rentang sel (named range) "HolidayList" yang berisi seluruh daftar tanggal merah dalam tahun tersebut.',
        keywords: ['working days', 'business days', 'workdays', 'exclude weekends', 'hari kerja', 'weekdays between', 'hari bisnis', 'kerja', 'tidak termasuk weekend', 'hari weekday', 'hitung hari kerja', 'berapa hari kerja', 'kerja efektif', 'exclude sabtu minggu']
      }
    ],
    logical: [
      {
        name: 'IF',
        syntax: '=IF(logical_test, value_if_true, value_if_false)',
        description: 'Fungsi logika dan pengambilan keputusan paling dasar di Excel. Mengembalikan sebuah nilai jika suatu kondisi benar (true), dan nilai lainnya jika salah (false). Gunakan IF bertumpuk untuk beberapa kondisi, atau gunakan IFS agar lebih rapi.',
        example: '=IF(C2 >= 100, "Tercapai", "Di Bawah Target")',
        tip: 'Hindari IF bersarang (nested IF) yang terlalu dalam (lebih dari 2 level). Jika kondisinya banyak, IFS jauh lebih mudah dibaca. Jika hasil untuk kondisi salah (false) tidak diperlukan, gunakan "" (string kosong).',
        keywords: ['if', 'condition', 'check', 'true false', 'when', 'conditional', 'test', 'either or', 'jika', 'kalau', 'kondisi', 'syarat', 'apabila', 'cek kondisi', 'benar salah', 'cek', 'lulus tidak lulus', 'aman kritis', 'status otomatis']
      },
      {
        name: 'IFS',
        syntax: '=IFS(condition1, value1, condition2, value2, ..., TRUE, default)',
        description: 'Mengecek banyak kondisi secara berurutan dan mengembalikan hasil dari kondisi pertama yang cocok/terpenuhi. Jauh lebih rapi dibanding IF bertingkat. Selalu akhiri dengan kondisi TRUE sebagai nilai default jika tidak ada kondisi yang terpenuhi.',
        example: '=IFS(A2>=90, "A", A2>=80, "B", A2>=70, "C", TRUE, "D")',
        tip: 'Fungsi IFS tidak memiliki argumen bawaan untuk "jika salah semua (else)" — itulah mengapa Anda harus menggunakan TRUE di akhir rumus. Tanpa TRUE di akhir, nilai yang tidak cocok akan memunculkan error #N/A.',
        keywords: ['ifs', 'multiple conditions', 'nested if', 'grade', 'multiple if', 'several conditions', 'cascading if', 'jika banyak kondisi', 'banyak syarat', 'beberapa kondisi', 'kategori bertingkat', 'klasifikasi', 'grade nilai', 'tier performa']
      },
      {
        name: 'IFERROR',
        syntax: '=IFERROR(value, value_if_error)',
        description: 'Mengembalikan nilai kustom jika hasil dari rumus memunculkan pesan error (#N/A, #VALUE!, #DIV/0!, dll.), dan mengembalikan hasil rumusnya sendiri jika tidak error. Sangat penting saat memakai VLOOKUP atau formula yang berpotensi tidak menemukan data.',
        example: '=IFERROR(VLOOKUP(A2, D:F, 2, FALSE), "Tidak Ditemukan")',
        tip: 'Jangan gunakan IFERROR terlalu sering untuk menyembunyikan error asli ketika Anda masih dalam tahap membuat dan menyusun rumus — ini bisa menutupi kesalahan logika (bug). Gunakan IFERROR hanya pada hasil akhir.',
        keywords: ['iferror', 'error handling', 'if error', '#n/a', '#value', 'handle error', 'no error', 'suppress error', 'catch error', 'jika error', 'tangani error', 'sembunyikan error', 'ganti error', 'kalau error', 'tidak ada error']
      },
      {
        name: 'AND',
        syntax: '=AND(logical1, logical2, ...)',
        description: 'Menghasilkan TRUE (Benar) HANYA JIKA semua kondisinya benar. Umumnya digunakan di dalam fungsi IF untuk menggabungkan beberapa kriteria pengujian: IF(AND(A>0, B="Aktif"), "Ya", "Tidak")',
        example: '=IF(AND(A2 > 0, B2 = "Active"), "Valid", "Tidak Valid")',
        tip: 'Fungsi AND selalu mengevaluasi semua kondisi secara berurutan meskipun dari awal kondisi pertama sudah FALSE. Perhatikan hal ini bila menggunakan rumus yang panjang.',
        keywords: ['and', 'all conditions', 'both', 'all true', 'multiple AND', 'all must be true', 'dan', 'keduanya', 'semua kondisi', 'semua benar']
      },
      {
        name: 'OR',
        syntax: '=OR(logical1, logical2, ...)',
        description: 'Menghasilkan TRUE jika salah satu kondisi saja benar. Sangat membantu ketika suatu langkah perlu dijalankan jika ada nilai yang cocok dengan setidaknya salah satu item dari daftar opsi.',
        example: '=IF(OR(A2="Bandung", A2="Surabaya", A2="Medan"), "Regional", "Jakarta")',
        tip: 'Untuk daftar yang panjang, menggunakan rumus COUNTIF seringkali lebih praktis dibanding IF OR: =IF(COUNTIF({"Bandung","Surabaya","Medan"}, A2) > 0, "Regional", "Jakarta")',
        keywords: ['or', 'any condition', 'either', 'any of', 'at least one', 'one of these', 'atau', 'salah satu', 'any kondisi', 'minimal satu']
      },
      {
        name: 'NOT',
        syntax: '=NOT(logical)',
        description: 'Membalikkan nilai logika — TRUE (Benar) akan berubah jadi FALSE (Salah), FALSE menjadi TRUE. Gunakan saat lebih mudah merumuskan "apa yang tidak Anda inginkan" ketimbang "apa yang Anda inginkan".',
        example: '=IF(NOT(ISBLANK(A2)), "Ada isi", "Kosong")',
        tip: 'Fungsi NOT biasanya digunakan bersamaan dengan fungsi IS: NOT(ISERROR()), NOT(ISBLANK()), NOT(ISNUMBER()).',
        keywords: ['not', 'reverse', 'opposite', 'is not', 'not equal', 'exclude', 'except', 'bukan', 'tidak', 'kebalikan', 'lawan']
      }
    ]
  };

  /* ------------------------------------------
     MATCHING LOGIC
  ------------------------------------------ */
  function generateFormula(query, category) {
    var q = (query || '').toLowerCase().trim();
    var pool;

    if (!category || category === 'all') {
      pool = Object.values(FORMULAS).reduce(function (acc, arr) {
        return acc.concat(arr);
      }, []);
    } else {
      pool = FORMULAS[category] || [];
    }

    if (!pool.length) return null;

    // Score each formula by keyword match quality
    var scored = pool.map(function (f) {
      var score = 0;
      // Exact name match gets highest score
      if (f.name.toLowerCase() === q) score += 100;
      // Name contains query
      if (f.name.toLowerCase().includes(q)) score += 50;
      // Keyword full match
      f.keywords.forEach(function (k) {
        if (q.includes(k)) score += 20;
        if (k.includes(q)) score += 10;
      });
      // Partial word match in description
      var words = q.split(/\s+/).filter(function (w) { return w.length > 2; });
      words.forEach(function (word) {
        if (f.name.toLowerCase().includes(word)) score += 8;
        f.keywords.forEach(function (k) {
          if (k.includes(word)) score += 5;
          // Indonesian partial-word boost: word partially matches a keyword token
          var kTokens = k.split(/[\s\-]+/);
          kTokens.forEach(function (token) {
            if (token.length > 2 && (token.includes(word) || word.includes(token))) score += 8;
          });
        });
        if (f.description.toLowerCase().includes(word)) score += 2;
      });

      return { formula: f, score: score };
    });

    scored.sort(function (a, b) { return b.score - a.score; });

    // Only return a match if there's some relevance, else return first in pool
    return scored[0].score > 0 ? scored[0].formula : pool[0];
  }

  /* ------------------------------------------
     RENDER OUTPUT
  ------------------------------------------ */
  function renderResult(formula) {
    var output = document.getElementById('formula-output');
    if (!output) return;

    output.innerHTML =
      '<div class="formula-result">' +
        '<div class="formula-name">' + escapeHtml(formula.name) + '</div>' +
        '<div class="formula-block">' + escapeHtml(formula.syntax) + '</div>' +
        '<p class="formula-desc">' + escapeHtml(formula.description) + '</p>' +
        (formula.tip
          ? '<div class="callout callout-tip" style="margin:var(--space-3) 0;">' +
              '<p class="callout-title">💡 Tips Analis</p>' +
              '<p>' + escapeHtml(formula.tip) + '</p>' +
            '</div>'
          : '') +
        '<div class="formula-example-label">Contoh</div>' +
        '<div class="formula-block formula-example">' + escapeHtml(formula.example) + '</div>' +
        '<div style="margin-top:var(--space-4);">' +
          '<button class="btn-ghost btn-sm copy-formula-btn" id="copy-formula-btn" data-copy="' + escapeAttr(formula.example) + '">Salin Formula</button>' +
        '</div>' +
      '</div>';

    var copyBtn = document.getElementById('copy-formula-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        if (window.copyToClipboard) {
           window.copyToClipboard(this.dataset.copy, this, '✓ Berhasil disalin!');
        }
        
        // Trigger Global Toast if available
        if (window.EAH && window.EAH.showToast) {
           window.EAH.showToast('Tersalin!', 'Formula siap ditempel ke Excel', '📋');
        }
      });
    }

    output.classList.add('visible');
  }

  function renderEmpty() {
    var output = document.getElementById('formula-output');
    if (!output) return;
    output.innerHTML =
      '<div class="formula-result" style="text-align:center;padding:var(--space-8);">' +
        '<p style="color:var(--text-muted);font-size:0.9rem;">Tidak ada kecocokan yang ditemukan untuk deskripsi tersebut. Coba kata kunci lain, atau pilih kategori tertentu.</p>' +
      '</div>';
    output.classList.add('visible');
  }

  /* ------------------------------------------
     UTILITIES
  ------------------------------------------ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }

  /* ------------------------------------------
     WIRE UP FORM
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formula-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = (document.getElementById('formula-query').value || '').trim();
      var category = document.getElementById('formula-category').value || 'all';

      if (!query) {
        // If no query, just show first formula in chosen category
        var pool = category === 'all'
          ? Object.values(FORMULAS).reduce(function (a, b) { return a.concat(b); }, [])
          : FORMULAS[category] || [];
        if (pool.length) renderResult(pool[0]);
        return;
      }

      var result = generateFormula(query, category);
      if (result) {
        renderResult(result);
      } else {
        renderEmpty();
      }
    });

    // Live suggestions on category change with existing query
    document.getElementById('formula-category').addEventListener('change', function () {
      var query = (document.getElementById('formula-query').value || '').trim();
      if (query) {
        var result = generateFormula(query, this.value);
        if (result) renderResult(result);
      }
    });
  });

})();

/* ==========================================
   PATCH FASE 6: FORMULA HISTORY STATE
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
   const inputEl = document.getElementById('formula-input') || document.querySelector('textarea');
   const generateBtn = document.getElementById('generate-btn') || document.querySelector('button.btn-primary');

   if (inputEl && generateBtn) {
      // 1. Buat kontainer untuk menampilkan riwayat
      const historyContainer = document.createElement('div');
      historyContainer.className = 'formula-history-wrapper';
      historyContainer.innerHTML = `
        <h4 style="margin-top: 1.5rem; color: var(--text-muted); font-size: 0.85rem; text-transform: uppercase; letter-spacing: 0.05em;">⏱️ Riwayat Kueri Terakhir</h4>
        <ul id="history-list" style="list-style: none; padding: 0; margin-top: 0.5rem; font-size: 0.85rem; color: #cbd5e1;"></ul>
      `;
      
      // Letakkan elemen riwayat di bawah area teks input
      inputEl.parentNode.insertBefore(historyContainer, inputEl.nextSibling);
      const historyList = document.getElementById('history-list');

      // 2. Fungsi memuat riwayat dari memori peramban
      const loadHistory = () => {
         const history = JSON.parse(localStorage.getItem('eah_formula_history') || '[]');
         historyList.innerHTML = '';
         history.forEach(item => {
            const li = document.createElement('li');
            li.style.padding = '10px 12px';
            li.style.background = 'var(--surface-2)';
            li.style.border = '1px solid var(--border)';
            li.style.borderRadius = '8px';
            li.style.marginBottom = '6px';
            li.style.cursor = 'pointer';
            li.style.transition = 'all 0.2s';
            li.textContent = `📝 ${item.query.length > 50 ? item.query.substring(0, 50) + '...' : item.query}`;
            li.title = "Klik untuk menggunakan kembali kueri ini";
            
            // Efek Hover
            li.onmouseover = () => li.style.borderColor = '#3b82f6';
            li.onmouseout = () => li.style.borderColor = 'var(--border)';
            
            // Jika diklik, masukkan kembali ke kotak teks
            li.onclick = () => { 
                inputEl.value = item.query; 
                inputEl.focus();
            };
            historyList.appendChild(li);
         });
      };

      // Jalankan fungsi saat halaman dimuat
      loadHistory();

      // 3. Simpan kueri baru saat tombol Generate diklik
      generateBtn.addEventListener('click', () => {
         setTimeout(() => { 
            const val = inputEl.value.trim();
            if (val) {
               let history = JSON.parse(localStorage.getItem('eah_formula_history') || '[]');
               // Jangan simpan kalau kuerinya sama persis dengan yang terakhir
               if (history.length === 0 || history[0].query !== val) {
                  history.unshift({ query: val });
                  if (history.length > 3) history.pop(); // Batasi maksimal 3 riwayat saja
                  localStorage.setItem('eah_formula_history', JSON.stringify(history));
                  loadHistory();
               }
            }
         }, 300); // Jeda singkat agar tidak mengganggu fungsi utama generate
      });
   }
});
