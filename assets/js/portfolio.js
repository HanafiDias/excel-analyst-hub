/* ============================================
   EXCEL ANALYST HUB � PORTFOLIO CASE STUDIES
   portfolio.js: Project data, modal, interactive case studies, XP
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     PROJECT DATA � 9 projects � 3 cases = 27
  ------------------------------------------ */
  var PROJECTS = [
    {
      id: 1, title: 'Sales Dashboard Q3',
      desc: 'Analisis penjualan regional dengan grafik interaktif dan kalkulasi KPI otomatis di 8 wilayah.',
      tags: ['Dashboard', 'Charts'], icon: '📊', difficulty: 'intermediate',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Bu Ratna, supervisor penjualan di PT Nusantara, minta kamu rekap total penjualan bulan Juli dari kolom C (C2:C50). Data sudah bersih, tinggal hitung.',
          problem: ['Hitung total penjualan Juli', 'Tampilkan angka dalam format Rupiah'],
          steps: ['Klik cell kosong di bawah data', 'Ketik formula SUM', 'Aplikasikan format currency'],
          type: 'multiple_choice',
          question: 'Formula mana yang benar untuk menjumlahkan penjualan di C2:C50?',
          options: ['=SUM(C2:C50)', '=TOTAL(C2:C50)', '=ADD(C2:C50)', '=COUNT(C2:C50)'],
          correct: 0,
          insight: 'SUM adalah formula paling dasar tapi paling sering dipakai analyst setiap hari.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Setelah rekap Juli selesai, Pak Andi minta breakdown penjualan per wilayah. Data ada di kolom B (wilayah) dan C (penjualan). Ada 8 wilayah berbeda.',
          problem: ['Hitung total penjualan khusus wilayah "Surabaya"', 'Data wilayah di kolom B, penjualan di kolom C'],
          steps: ['Identifikasi kolom kriteria (B) dan kolom nilai (C)', 'Gunakan SUMIF dengan kriteria "Surabaya"', 'Verifikasi hasilnya masuk akal dengan quick mental check'],
          type: 'formula_input',
          question: 'Tulis formula SUMIF untuk menjumlahkan penjualan wilayah Surabaya. Data wilayah ada di B2:B100, data penjualan di C2:C100.',
          expected: '=SUMIF(B2:B100,"Surabaya",C2:C100)',
          hint: 'SUMIF punya 3 argumen: range kriteria, kriteria, range yang dijumlahkan',
          insight: 'SUMIF memungkinkan kamu menjumlahkan data berdasarkan kondisi � ini fondasi analisis segmentasi.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Dashboard sudah jalan, tapi direktur minta analisis lebih dalam: wilayah mana yang paling jauh dari target? Target per wilayah ada di sheet kedua (kolom E).',
          problem: ['Bandingkan aktual vs target per wilayah', 'Hitung persentase pencapaian', 'Highlight wilayah di bawah 80% target'],
          steps: ['Buat kolom % Pencapaian = Aktual/Target', 'Gunakan conditional formatting untuk highlight < 80%', 'Buat chart perbandingan aktual vs target', 'Tambahkan data label persentase di chart'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah analisis berikut:',
          steps_interactive: [
            { instruction: 'Untuk hitung % pencapaian jika aktual di C2 dan target di E2, formula mana yang benar?', type: 'multiple_choice', options: ['=C2/E2', '=E2/C2', '=C2-E2', '=(C2/E2)*100 dengan format %'], correct: 0, expected: '', hint: '' },
            { instruction: 'Wilayah Surabaya aktual 850jt, target 1.2M. Berapa % pencapaiannya? Tulis formulanya.', type: 'formula_input', options: [], correct: 0, expected: '=850/1200', hint: 'Bagi aktual dengan target, hasilnya format sebagai persentase' }
          ],
          insight: 'Analyst yang baik tidak hanya melaporkan angka � tapi menjelaskan gap dan penyebabnya.', xp: 30
        }
      ]
    },
    {
      id: 2, title: 'Analisis Segmentasi Pelanggan',
      desc: 'Segmentasi RFM dari 5.000+ data pelanggan menggunakan PivotTable dan PERCENTRANK. Otomatis menempatkan pelanggan ke tier Champion, Loyal, Berisiko, Hilang.',
      tags: ['PivotTable', 'Analysis'], icon: '👥', difficulty: 'advanced',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Kamu baru join tim marketing PT Maju Bersama. Bu Sari minta daftar pelanggan yang belanja lebih dari 5 juta dalam 6 bulan terakhir.',
          problem: ['Filter pelanggan high-value dari 2000+ baris data'],
          steps: ['Pilih salah satu kolom di dataset', 'Aktifkan AutoFilter dari tab Data', 'Set filter pada kolom nilai transaksi: lebih dari 5.000.000'],
          type: 'multiple_choice',
          question: 'Cara paling efisien untuk filter data pelanggan dengan nilai > 5 juta?',
          options: ['Scroll manual satu per satu', 'Gunakan AutoFilter di kolom nilai transaksi', 'Hapus baris yang tidak relevan', 'Copy paste ke sheet baru'],
          correct: 1,
          insight: 'AutoFilter adalah tool pertama yang harus dikuasai untuk eksplorasi data cepat.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Filter sudah ada, sekarang kamu diminta hitung berapa pelanggan yang masuk kategori "Loyal" (belanja 3x atau lebih dalam 6 bulan). Data frekuensi di kolom D.',
          problem: ['Hitung jumlah pelanggan dengan frekuensi belanja >= 3'],
          steps: ['Identifikasi kolom frekuensi (D)', 'Gunakan COUNTIF dengan operator >=', 'Verifikasi dengan total count keseluruhan'],
          type: 'formula_input',
          question: 'Tulis formula untuk menghitung pelanggan dengan frekuensi belanja >= 3. Data frekuensi ada di D2:D2000.',
          expected: '=COUNTIF(D2:D2000,">=3")',
          hint: 'COUNTIF menghitung berdasarkan kondisi � gunakan operator >= untuk lebih dari sama dengan',
          insight: 'COUNTIF adalah pasangan SUMIF � keduanya wajib hafal untuk analisis segmentasi dasar.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Management minta segmentasi RFM lengkap. Kamu harus kelompokkan 2000 pelanggan ke 4 tier: Champion, Loyal, At Risk, Lost berdasarkan Recency, Frequency, Monetary.',
          problem: ['Buat kolom Tier otomatis berdasarkan 3 variabel', 'Gunakan formula yang bisa diaplikasikan ke semua baris sekaligus'],
          steps: ['Tentukan kriteria tiap tier', 'Gunakan IF dengan AND untuk kombinasi kondisi', 'Aplikasikan formula ke seluruh kolom dengan drag fill'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah segmentasi RFM berikut:',
          steps_interactive: [
            { instruction: 'Pelanggan disebut Champion jika: Recency < 30 hari DAN Frequency >= 5 DAN Monetary > 10jt. Formula mana yang benar jika R=E2, F=F2, M=G2?', type: 'multiple_choice', options: ['=IF(AND(E2<30,F2>=5,G2>10000000),"Champion","Lainnya")', '=IF(OR(E2<30,F2>=5,G2>10000000),"Champion","Lainnya")', '=IF(E2<30,"Champion","Lainnya")', '=AND(E2<30,F2>=5,G2>10000000)'], correct: 0, expected: '', hint: '' },
            { instruction: 'Untuk nested tier (Champion > Loyal > At Risk > Lost), fungsi apa yang lebih efisien dari nested IF?', type: 'multiple_choice', options: ['IFS', 'SWITCH', 'CHOOSE', 'VLOOKUP ke tabel tier'], correct: 0, expected: '', hint: '' }
          ],
          insight: 'RFM segmentation adalah teknik standar di industri retail dan e-commerce � menguasai ini langsung memberi nilai lebih di CV kamu.', xp: 30
        }
      ]
    },
    {
      id: 3, title: 'HR Attendance Tracker',
      desc: 'Pemantauan kehadiran karyawan bulanan untuk 150+ karyawan dengan peringatan conditional formatting. Terhubung ke kalkulasi potongan gaji melalui VLOOKUP.',
      tags: ['Dashboard', 'HR'], icon: '📅', difficulty: 'intermediate',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Pak Hendra dari HR minta kamu hitung berapa hari karyawan bernama Budi hadir bulan ini. Data kehadiran di kolom C dengan nilai "Hadir", "Izin", "Sakit", atau "Alpha".',
          problem: ['Hitung jumlah hari "Hadir" dari satu karyawan'],
          steps: ['Identifikasi kolom status kehadiran (C)', 'Gunakan COUNTIF dengan kriteria teks "Hadir"', 'Bandingkan hasilnya dengan jumlah hari kerja'],
          type: 'multiple_choice',
          question: 'Formula mana yang menghitung berapa kali kata "Hadir" muncul di C2:C31?',
          options: ['=COUNT(C2:C31,"Hadir")', '=COUNTIF(C2:C31,"Hadir")', '=SUM(C2:C31="Hadir")', '=FIND("Hadir",C2:C31)'],
          correct: 1,
          insight: 'COUNTIF dengan kriteria teks adalah cara standar menghitung kehadiran, status, atau kategori apapun.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Setelah hitung per karyawan, Bu Dewi minta persentase kehadiran tim (20 karyawan) bulan ini. Total hari kerja = 22 hari. Data hadir ada di B2:B21.',
          problem: ['Hitung rata-rata persentase kehadiran seluruh tim'],
          steps: ['Hitung rata-rata jumlah hari hadir dengan AVERAGE', 'Bagi dengan total hari kerja (22)', 'Format hasilnya sebagai persentase'],
          type: 'formula_input',
          question: 'Tulis formula untuk menghitung rata-rata kehadiran tim. Jumlah hadir per karyawan ada di B2:B21, total hari kerja = 22.',
          expected: '=AVERAGE(B2:B21)/22',
          hint: 'Rata-rata kehadiran = AVERAGE jumlah hadir dibagi total hari kerja',
          insight: 'Persentase kehadiran adalah KPI standar HR � formula ini dipakai setiap bulan di laporan rutin.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Direktur HR minta dashboard yang otomatis highlight karyawan dengan kehadiran di bawah 80% dan hitung potongan gaji otomatis berdasarkan hari alpha.',
          problem: ['Buat formula potongan gaji otomatis', 'Highlight karyawan bermasalah secara visual'],
          steps: ['Hitung gaji harian = gaji pokok dibagi hari kerja', 'Hitung potongan = alpha x gaji harian', 'Terapkan conditional formatting untuk kehadiran < 80%'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah otomasi HR berikut:',
          steps_interactive: [
            { instruction: 'Jika gaji harian = Gaji Pokok/22 dan alpha ada di kolom D, tulis formula potongan di E2. Gaji pokok ada di C2.', type: 'formula_input', options: [], correct: 0, expected: '=D2*(C2/22)', hint: 'Potongan = jumlah alpha x gaji per hari. Gaji per hari = gaji pokok dibagi hari kerja' },
            { instruction: 'Untuk highlight otomatis karyawan dengan kehadiran < 80%, fitur Excel mana yang dipakai?', type: 'multiple_choice', options: ['AutoFilter', 'Conditional Formatting', 'Data Validation', 'Sort & Filter'], correct: 1, expected: '', hint: '' }
          ],
          insight: 'Otomasi perhitungan HR dengan Excel menghemat 3-4 jam kerja manual setiap akhir bulan.', xp: 30
        }
      ]
    },
    {
      id: 4, title: 'Sistem Manajemen Inventaris',
      desc: 'Pelacakan stok real-time untuk 300+ SKU dengan peringatan pemesanan ulang otomatis. Termasuk kalkulasi lead time pemasok dan database kontak berbasis VLOOKUP.',
      tags: ['Automation', 'Finance'], icon: '📦', difficulty: 'intermediate',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Kamu diminta cek stok barang. Pak Rudi minta tahu apakah stok "Laptop Dell" masih aman. Stok minimum = 10 unit. Stok saat ini ada di kolom C.',
          problem: ['Cek apakah stok di atas minimum', 'Beri label "Aman" atau "Kritis"'],
          steps: ['Identifikasi cell stok saat ini (C2) dan nilai minimum (10)', 'Gunakan formula IF untuk membandingkan', 'Verifikasi label yang muncul sesuai kondisi stok'],
          type: 'multiple_choice',
          question: 'Formula IF mana yang benar untuk label stok di C2 dengan minimum 10?',
          options: ['=IF(C2>=10,"Aman","Kritis")', '=IF(C2>10,"Kritis","Aman")', '=IF(C2=10,"Aman","Kritis")', '=IF(C2<10,"Aman","Kritis")'],
          correct: 0,
          insight: 'IF adalah formula logika paling fundamental � hampir semua otomasi Excel dimulai dari sini.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Sistem perlu otomatis hitung nilai total stok per item. Jumlah unit di kolom C, harga satuan di kolom D.',
          problem: ['Hitung nilai total inventaris untuk setiap item'],
          steps: ['Identifikasi kolom qty (C) dan harga satuan (D)', 'Kalikan kedua kolom', 'Aplikasikan ke seluruh baris data'],
          type: 'formula_input',
          question: 'Tulis formula untuk hitung nilai total stok. Qty di C2, harga satuan di D2.',
          expected: '=C2*D2',
          hint: 'Nilai stok = jumlah unit dikali harga satuan',
          insight: 'Kolom kalkulasi otomatis seperti ini adalah fondasi laporan inventaris profesional.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Management minta sistem reorder otomatis � ketika stok di bawah minimum, sistem harus otomatis hitung berapa unit yang perlu dipesan ke supplier.',
          problem: ['Hitung reorder quantity otomatis', 'Lookup nama supplier dari tabel terpisah'],
          steps: ['Bandingkan stok saat ini dengan minimum', 'Jika kurang: hitung selisih ke stok maksimum', 'Lookup supplier dari tabel referensi'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah sistem reorder berikut:',
          steps_interactive: [
            { instruction: 'Reorder qty = Stok Maksimum - Stok Saat Ini, tapi hanya jika stok < minimum. Stok saat ini C2, minimum D2, maksimum E2. Tulis formulanya.', type: 'formula_input', options: [], correct: 0, expected: '=IF(C2<D2,E2-C2,0)', hint: 'Gunakan IF � jika stok kurang dari minimum, hitung selisih ke maksimum. Jika tidak, isi 0' },
            { instruction: 'Untuk lookup nama supplier berdasarkan kode barang dari tabel supplier terpisah, formula mana yang paling tepat?', type: 'multiple_choice', options: ['VLOOKUP', 'SUM', 'COUNTIF', 'AVERAGE'], correct: 0, expected: '', hint: '' }
          ],
          insight: 'Sistem reorder otomatis seperti ini bisa menghemat jutaan rupiah dari stockout atau overstock.', xp: 30
        }
      ]
    },
    {
      id: 5, title: 'Template Laporan Keuangan',
      desc: 'P&L bulanan dengan analisis varians otomatis vs anggaran, total bergulir 12 bulan, dan pemformatan satu klik untuk presentasi manajemen.',
      tags: ['Finance', 'Template'], icon: '💰', difficulty: 'advanced',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Bu Ani dari Finance minta kamu bantu hitung total pendapatan Q1. Data pendapatan per bulan: Jan 450jt, Feb 380jt, Mar 520jt � ada di B2:B4.',
          problem: ['Hitung total pendapatan Q1'],
          steps: ['Identifikasi range data (B2:B4)', 'Gunakan SUM untuk total', 'Format hasilnya dalam Rupiah'],
          type: 'multiple_choice',
          question: 'Formula paling tepat untuk total B2:B4?',
          options: ['=SUM(B2:B4)', '=TOTAL(B2:B4)', '=B2+B3+B4', 'A dan C keduanya benar'],
          correct: 3,
          insight: 'SUM dan penjumlahan manual keduanya valid, tapi SUM lebih scalable saat data bertambah.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Laporan butuh kolom varians � selisih antara aktual dan anggaran, plus persentase varians. Aktual di C2, anggaran di D2.',
          problem: ['Hitung varians absolut dan persentase varians'],
          steps: ['Hitung varians absolut: Aktual - Anggaran', 'Hitung % varians: (Aktual - Anggaran) / Anggaran', 'Format sebagai persentase'],
          type: 'formula_input',
          question: 'Tulis formula persentase varians. Aktual di C2, Anggaran di D2.',
          expected: '=(C2-D2)/D2',
          hint: 'Varians % = (Aktual - Anggaran) dibagi Anggaran, format hasilnya sebagai persentase',
          insight: 'Analisis varians adalah inti dari financial reporting � angka tanpa konteks anggaran tidak bermakna.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'CFO minta laporan rolling 12 bulan yang otomatis update setiap bulan baru ditambahkan.',
          problem: ['Buat formula yang otomatis ambil 12 bulan terakhir', 'Tidak perlu edit formula setiap bulan'],
          steps: ['Gunakan OFFSET untuk referensi dinamis', 'Kombinasikan dengan COUNTA untuk hitung baris aktif', 'Bungkus dengan SUM untuk total rolling'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah laporan rolling berikut:',
          steps_interactive: [
            { instruction: 'Untuk referensi yang otomatis expand saat data bertambah, fitur Excel mana yang dipakai?', type: 'multiple_choice', options: ['Named Range dinamis dengan OFFSET', 'Hard-coded range', 'Copy paste manual', 'AutoSum'], correct: 0, expected: '', hint: '' },
            { instruction: 'Tulis formula OFFSET untuk menjumlahkan 12 nilai terakhir dari kolom B yang terus bertambah.', type: 'formula_input', options: [], correct: 0, expected: '=SUM(OFFSET(B1,COUNTA(B:B)-12,0,12,1))', hint: 'OFFSET(titik_awal, baris_geser, kolom_geser, tinggi, lebar) � kombinasikan dengan COUNTA' }
          ],
          insight: 'Dynamic range adalah skill yang memisahkan analyst biasa dari analyst yang efisien.', xp: 30
        }
      ]
    },
    {
      id: 6, title: 'Scorecard Kinerja Karyawan',
      desc: 'Dashboard pelacakan KPI untuk 12 metrik kinerja per karyawan. Penilaian otomatis dengan panah tren dan conditional formatting untuk menyoroti kuartil teratas dan terbawah.',
      tags: ['Dashboard', 'HR'], icon: '🏆', difficulty: 'advanced',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Tim HR minta kamu buat kolom rating otomatis. Skor di kolom C: >= 90 = "Excellent", >= 75 = "Good", >= 60 = "Average", < 60 = "Poor".',
          problem: ['Buat label rating otomatis berdasarkan skor'],
          steps: ['Tentukan threshold tiap rating', 'Gunakan nested IF dari kondisi tertinggi', 'Test dengan beberapa nilai sampel'],
          type: 'multiple_choice',
          question: 'Struktur formula mana yang tepat untuk 4 kategori rating?',
          options: ['Nested IF', 'Single IF', 'SUMIF', 'COUNTIF'],
          correct: 0,
          insight: 'Nested IF adalah cara paling umum membuat kategorisasi bertingkat � wajib dikuasai untuk HR analytics.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Setelah rating ada, kamu diminta hitung rata-rata skor per departemen. Departemen di kolom B, skor di kolom C.',
          problem: ['Hitung rata-rata skor khusus departemen "Marketing"'],
          steps: ['Identifikasi kolom departemen (B) dan skor (C)', 'Gunakan AVERAGEIF dengan kriteria "Marketing"', 'Bandingkan hasilnya dengan rata-rata keseluruhan'],
          type: 'formula_input',
          question: 'Tulis formula untuk rata-rata skor departemen Marketing. Departemen di B2:B100, skor di C2:C100.',
          expected: '=AVERAGEIF(B2:B100,"Marketing",C2:C100)',
          hint: 'AVERAGEIF mirip SUMIF tapi menghitung rata-rata � argumennya sama persis',
          insight: 'AVERAGEIF melengkapi trio SUMIF-COUNTIF-AVERAGEIF yang wajib dikuasai untuk analisis per kategori.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Dashboard kinerja perlu menampilkan top 3 karyawan per departemen secara otomatis.',
          problem: ['Rank karyawan dalam departemen masing-masing', 'Tampilkan top 3 tanpa sort manual'],
          steps: ['Tentukan metode ranking per grup', 'Gunakan LARGE untuk nilai terbesar ke-k', 'Kombinasikan dengan filter departemen'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah ranking karyawan berikut:',
          steps_interactive: [
            { instruction: 'Untuk ranking dalam grup (per departemen), formula mana yang dipakai?', type: 'multiple_choice', options: ['RANK.EQ dengan kondisi', 'LARGE', 'SORT', 'Manual sort'], correct: 0, expected: '', hint: '' },
            { instruction: 'Untuk ambil nilai terbesar ke-2 dari range C2:C100, tulis formulanya.', type: 'formula_input', options: [], correct: 0, expected: '=LARGE(C2:C100,2)', hint: 'LARGE(range, k) mengambil nilai terbesar ke-k dari sebuah range' }
          ],
          insight: 'Ranking otomatis per grup adalah teknik advanced yang sangat berguna untuk performance review.', xp: 30
        }
      ]
    },
    {
      id: 7, title: 'Kalkulator Komisi Penjualan',
      desc: 'Kalkulasi komisi otomatis di 4 tier dengan kemampuan override per deal. Menggunakan nested IFS dan VLOOKUP terhadap tabel tarif � update tabel otomatis hitung ulang semua.',
      tags: ['Automation', 'Finance'], icon: '💵', difficulty: 'intermediate',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Sales team punya komisi 5% dari total penjualan. Pak Doni penjualannya 80 juta bulan ini. Hitung komisinya.',
          problem: ['Hitung komisi sederhana dengan persentase tetap'],
          steps: ['Identifikasi nilai penjualan (C2)', 'Kalikan dengan tarif komisi 5%', 'Format hasilnya sebagai currency'],
          type: 'multiple_choice',
          question: 'Formula komisi 5% jika penjualan ada di C2?',
          options: ['=C2*5%', '=C2*0.05', '=C2/100*5', 'Semua jawaban di atas benar'],
          correct: 3,
          insight: 'Persentase di Excel bisa ditulis 5%, 0.05, atau /100*5 � ketiganya equivalen.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Komisi ternyata berjenjang: < 50jt = 3%, 50-100jt = 5%, > 100jt = 8%. Penjualan Pak Doni 80 juta ada di C2.',
          problem: ['Hitung komisi dengan tier berbeda berdasarkan nilai penjualan'],
          steps: ['Identifikasi threshold tiap tier', 'Bangun nested IF dari kondisi terkecil', 'Test dengan nilai di setiap tier'],
          type: 'formula_input',
          question: 'Tulis nested IF untuk komisi berjenjang. Penjualan di C2.',
          expected: '=IF(C2<50000000,C2*3%,IF(C2<=100000000,C2*5%,C2*8%))',
          hint: 'Mulai dari kondisi terkecil, nested IF dari luar ke dalam',
          insight: 'Komisi berjenjang adalah kasus klasik nested IF � menguasai ini langsung applicable di dunia kerja.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Perusahaan ganti sistem � tier komisi sekarang ada di tabel terpisah dan bisa berubah setiap kuartal. Formula tidak boleh di-hardcode.',
          problem: ['Buat sistem komisi yang dinamis � tier diambil dari tabel referensi'],
          steps: ['Siapkan tabel tarif komisi (kolom batas bawah + tarif)', 'Gunakan VLOOKUP approximate match', 'Test dengan nilai di batas tier'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah sistem komisi dinamis berikut:',
          steps_interactive: [
            { instruction: 'Untuk lookup tarif komisi dari tabel berdasarkan nilai penjualan (approximate match), VLOOKUP parameter ke-4 harus diisi apa?', type: 'multiple_choice', options: ['TRUE (approximate match)', 'FALSE (exact match)', '0', '1'], correct: 0, expected: '', hint: '' },
            { instruction: 'Tabel komisi di F2:G5 (kolom F = batas bawah, G = tarif). Tulis VLOOKUP untuk cari tarif penjualan di C2.', type: 'formula_input', options: [], correct: 0, expected: '=VLOOKUP(C2,F2:G5,2,TRUE)', hint: 'VLOOKUP(nilai_cari, tabel, kolom_hasil, TRUE untuk approximate match)' }
          ],
          insight: 'Dynamic lookup table memungkinkan perubahan tarif tanpa menyentuh formula � ini best practice.', xp: 30
        }
      ]
    },
    {
      id: 8, title: 'Konsolidator Data Power Query',
      desc: 'Menggabungkan 12 file ekspor bulanan dari 3 sistem berbeda menjadi satu dataset bersih otomatis. Power Query menangani inkonsistensi format � satu tombol Refresh.',
      tags: ['Power Query', 'Automation'], icon: '⚡', difficulty: 'advanced',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Kamu dapat 3 file Excel dari 3 cabang berbeda dengan struktur yang sama. Harus digabung jadi satu file untuk analisis.',
          problem: ['Gabungkan 3 file Excel menjadi satu dataset'],
          steps: ['Buka Power Query Editor dari tab Data', 'Import file pertama sebagai query', 'Gunakan Append Queries untuk tambahkan file lain'],
          type: 'multiple_choice',
          question: 'Cara paling efisien untuk menggabungkan 3 file Excel dengan struktur sama?',
          options: ['Copy paste manual satu per satu', 'Power Query � Append Queries', 'Ketik ulang semua data', 'Email ke tim IT'],
          correct: 1,
          insight: 'Power Query Append adalah solusi standar untuk konsolidasi file � sekali setup, tinggal refresh.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'Setelah digabung, kolom tanggal tidak konsisten � ada yang dd/mm/yyyy, ada yang yyyy-mm-dd. Power Query perlu standarisasi format.',
          problem: ['Standarisasi format tanggal yang tidak konsisten'],
          steps: ['Identifikasi kolom tanggal yang bermasalah', 'Klik kanan kolom di Power Query Editor', 'Pilih Change Type dan set ke Date'],
          type: 'multiple_choice',
          question: 'Di Power Query, langkah mana untuk ubah tipe data kolom tanggal?',
          options: ['Klik kanan kolom lalu Change Type lalu Date', 'Sort kolom tanggal', 'Filter baris kosong', 'Rename kolom'],
          correct: 0,
          insight: 'Data type consistency adalah langkah wajib pertama sebelum analisis apapun dimulai.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'File dari cabang Surabaya punya kolom ekstra yang tidak ada di cabang lain. Power Query harus handle perbedaan ini tanpa error.',
          problem: ['Merge file dengan struktur kolom berbeda', 'Handle kolom yang tidak ada di semua file'],
          steps: ['Append dengan opsi kolom tidak cocok diisi null', 'Identifikasi kolom ekstra dari Surabaya', 'Replace null dengan nilai default yang sesuai'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah konsolidasi file berbeda struktur berikut:',
          steps_interactive: [
            { instruction: 'Di Power Query, fitur mana yang dipakai untuk gabung file dengan kolom berbeda?', type: 'multiple_choice', options: ['Append dengan opsi "Missing columns filled with null"', 'Merge Queries', 'VLOOKUP', 'Manual mapping'], correct: 0, expected: '', hint: '' },
            { instruction: 'Setelah append, kolom dari Surabaya muncul dengan banyak null di baris cabang lain. Langkah selanjutnya?', type: 'multiple_choice', options: ['Replace null dengan 0 atau nilai default yang sesuai', 'Hapus kolom tersebut', 'Hapus baris yang ada null', 'Biarkan saja'], correct: 0, expected: '', hint: '' }
          ],
          insight: 'Handling missing columns adalah skill kritis Power Query � data di dunia nyata tidak pernah sempurna.', xp: 30
        }
      ]
    },
    {
      id: 9, title: 'Alat Audit Formula VLOOKUP',
      desc: 'Template untuk mengaudit spreadsheet dengan VLOOKUP berat � mengidentifikasi referensi rusak, konsentrasi #N/A, dan menyarankan penggantian INDEX-MATCH.',
      tags: ['VLOOKUP', 'Template'], icon: '🔍', difficulty: 'intermediate',
      cases: [
        {
          level: 'pemula', label: 'Case 1 � Pemula',
          situation: 'Kamu diminta cari data nama karyawan berdasarkan ID. ID ada di kolom A, nama di kolom B, jabatan di kolom C. Kamu punya ID = 1042.',
          problem: ['Lookup nama karyawan berdasarkan ID'],
          steps: ['Identifikasi nilai yang dicari (1042)', 'Tentukan tabel lookup (A2:C100)', 'Tentukan kolom hasil (kolom ke-2 = nama)'],
          type: 'multiple_choice',
          question: 'Formula VLOOKUP yang benar untuk cari nama berdasarkan ID 1042 di tabel A2:C100?',
          options: ['=VLOOKUP(1042,A2:C100,2,FALSE)', '=VLOOKUP(A2:C100,1042,2,FALSE)', '=VLOOKUP(1042,A2:C100,1,FALSE)', '=HLOOKUP(1042,A2:C100,2,FALSE)'],
          correct: 0,
          insight: 'VLOOKUP(nilai_cari, tabel, kolom_ke, FALSE) � urutan argumen ini wajib dihafal.', xp: 10
        },
        {
          level: 'menengah', label: 'Case 2 � Menengah',
          situation: 'VLOOKUP kamu menghasilkan #N/A untuk beberapa ID. Ternyata beberapa ID tidak ada di tabel referensi. Perlu formula yang tidak error.',
          problem: ['Handle error #N/A agar laporan tetap rapi'],
          steps: ['Identifikasi formula VLOOKUP yang error', 'Bungkus dengan IFERROR', 'Tentukan nilai pengganti jika tidak ditemukan'],
          type: 'formula_input',
          question: 'Tulis formula VLOOKUP yang menampilkan "Tidak Ditemukan" jika ID tidak ada. ID di A2, tabel referensi di D2:F100, ambil kolom ke-2.',
          expected: '=IFERROR(VLOOKUP(A2,D2:F100,2,FALSE),"Tidak Ditemukan")',
          hint: 'Bungkus VLOOKUP dengan IFERROR(formula, nilai_jika_error)',
          insight: 'IFERROR adalah pasangan wajib VLOOKUP � laporan profesional tidak boleh menampilkan error mentah.', xp: 20
        },
        {
          level: 'lanjutan', label: 'Case 3 � Lanjutan',
          situation: 'Tim minta kamu migrasi semua VLOOKUP ke INDEX-MATCH karena file sering corrupt saat kolom disisipkan.',
          problem: ['Konversi VLOOKUP ke INDEX-MATCH', 'Pastikan hasilnya identik'],
          steps: ['Pahami perbedaan VLOOKUP vs INDEX-MATCH', 'Identifikasi kolom lookup dan hasil', 'Tulis INDEX-MATCH yang equivalent'],
          type: 'multi_step',
          question: 'Selesaikan dua langkah migrasi ke INDEX-MATCH berikut:',
          steps_interactive: [
            { instruction: 'Keunggulan utama INDEX-MATCH dibanding VLOOKUP adalah?', type: 'multiple_choice', options: ['Tidak terpengaruh jika kolom disisipkan/dihapus', 'Lebih cepat diketik', 'Bisa dipakai di semua versi Excel', 'Hasilnya lebih akurat'], correct: 0, expected: '', hint: '' },
            { instruction: 'Konversi =VLOOKUP(A2,D2:F100,2,FALSE) ke INDEX-MATCH yang equivalen.', type: 'formula_input', options: [], correct: 0, expected: '=INDEX(E2:E100,MATCH(A2,D2:D100,0))', hint: 'INDEX(kolom_hasil, MATCH(nilai_cari, kolom_cari, 0))' }
          ],
          insight: 'INDEX-MATCH adalah standar industri untuk analyst profesional � lebih robust dan fleksibel dari VLOOKUP.', xp: 30
        }
      ]
    }
  ]; /* end PROJECTS */

  var currentFilter = 'All';
  var _activeProject = null;

  /* ------------------------------------------
     UTILITIES
  ------------------------------------------ */
  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function getTagsHtml(tags) {
    return tags.map(function (t) {
      return '<span class="tag">' + escapeHtml(t) + '</span>';
    }).join('');
  }

  function getDifficultyBadge(d) {
    var map = {
      beginner: '<span class="badge badge-beginner">Pemula</span>',
      intermediate: '<span class="badge badge-intermediate">Menengah</span>',
      advanced: '<span class="badge badge-advanced">Lanjutan</span>'
    };
    return map[d] || '';
  }

  /* ------------------------------------------
     MODAL � OPEN / CLOSE
  ------------------------------------------ */
  function openModal(projectId) {
    var project = null;
    for (var i = 0; i < PROJECTS.length; i++) {
      if (PROJECTS[i].id === projectId) { project = PROJECTS[i]; break; }
    }
    if (!project) return;
    _activeProject = project;

    document.getElementById('modal-project-icon').textContent = project.icon;
    document.getElementById('modal-project-title').textContent = project.title;
    document.getElementById('modal-project-tags').innerHTML =
      getTagsHtml(project.tags) + ' ' + getDifficultyBadge(project.difficulty);

    var tabsEl = document.getElementById('case-tabs');
    tabsEl.innerHTML = project.cases.map(function (c, idx) {
      return '<button class="case-tab' + (idx === 0 ? ' tab-active' : '') + '" ' +
             'data-idx="' + idx + '" role="tab" aria-selected="' + (idx === 0) + '">' +
             escapeHtml(c.label) + '</button>';
    }).join('');

    tabsEl.querySelectorAll('.case-tab').forEach(function (btn) {
      btn.addEventListener('click', function () {
        tabsEl.querySelectorAll('.case-tab').forEach(function (b) {
          b.classList.remove('tab-active');
          b.setAttribute('aria-selected', 'false');
        });
        btn.classList.add('tab-active');
        btn.setAttribute('aria-selected', 'true');
        renderCase(project, parseInt(btn.dataset.idx, 10));
      });
    });

    renderCase(project, 0);
    var modal = document.getElementById('case-modal');
    modal.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
    document.getElementById('modal-close').focus();
  }

  function closeModal() {
    var modal = document.getElementById('case-modal');
    modal.setAttribute('hidden', '');
    document.body.style.overflow = '';
    _activeProject = null;
  }

  /* ------------------------------------------
     RENDER CASE
  ------------------------------------------ */
  function renderCase(project, caseIndex) {
    var c = project.cases[caseIndex];
    var caseKey = project.id + '_' + caseIndex;
    var body = document.getElementById('case-modal-body');

    var problemHtml = c.problem.map(function (p) {
      return '<li>' + escapeHtml(p) + '</li>';
    }).join('');

    var stepsHtml = c.steps.map(function (s) {
      return '<li>' + escapeHtml(s) + '</li>';
    }).join('');

    var interactiveHtml = '';
    if (c.type === 'multiple_choice') {
      interactiveHtml = buildMultipleChoice(c, caseKey);
    } else if (c.type === 'formula_input') {
      interactiveHtml = buildFormulaInput(c, caseKey);
    } else if (c.type === 'multi_step') {
      interactiveHtml = buildMultiStep(c, caseKey);
    }

    body.innerHTML =
      '<div class="case-section">' +
        '<div class="case-section-label">📋 Situasi</div>' +
        '<p class="case-situation">' + escapeHtml(c.situation) + '</p>' +
      '</div>' +
      '<div class="case-section">' +
        '<div class="case-section-label">🎯 Yang Harus Diselesaikan</div>' +
        '<ul class="case-bullets">' + problemHtml + '</ul>' +
      '</div>' +
      '<div class="case-section">' +
        '<div class="case-section-label">🛠️ Langkah Penyelesaian</div>' +
        '<ol class="case-steps-list">' + stepsHtml + '</ol>' +
      '</div>' +
      '<div class="case-section">' +
        '<div class="case-section-label">💬 Sekarang Giliranmu</div>' +
        '<div class="interactive-section">' +
          '<p class="case-question-text">' + escapeHtml(c.question) + '</p>' +
          interactiveHtml +
        '</div>' +
      '</div>' +
      '<div class="insight-section" id="insight-' + caseKey + '">' +
        '<div class="insight-label">💡 Key Insight</div>' +
        '<p class="insight-text">' + escapeHtml(c.insight) + '</p>' +
        '<span class="xp-badge">+' + c.xp + ' XP</span>' +
      '</div>';

    attachInteractiveHandlers(c, caseKey);
  }

  /* ------------------------------------------
     BUILD HTML � MULTIPLE CHOICE
  ------------------------------------------ */
  function buildMultipleChoice(c, caseKey) {
    var html = '<div class="answer-options" id="opts-' + caseKey + '">';
    c.options.forEach(function (opt, i) {
      html += '<button class="answer-btn" data-idx="' + i + '">' + escapeHtml(opt) + '</button>';
    });
    html += '</div>';
    return html;
  }

  /* ------------------------------------------
     BUILD HTML � FORMULA INPUT
  ------------------------------------------ */
  function buildFormulaInput(c, caseKey) {
    return '<div class="formula-input-wrapper" id="fi-wrap-' + caseKey + '">' +
             '<span class="formula-prefix">=</span>' +
             '<input type="text" class="formula-input" id="fi-' + caseKey + '" ' +
                    'placeholder="Tulis formulamu di sini..." autocomplete="off" spellcheck="false">' +
             '<button class="btn-check" id="fi-btn-' + caseKey + '">Cek Formula</button>' +
           '</div>' +
           '<div class="formula-hint" id="fi-hint-' + caseKey + '" hidden></div>';
  }

  /* ------------------------------------------
     BUILD HTML � MULTI STEP
  ------------------------------------------ */
  function buildMultiStep(c, caseKey) {
    var total = c.steps_interactive.length;
    var stepsHtml = '';
    c.steps_interactive.forEach(function (step, si) {
      var stepKey = caseKey + '_s' + si;
      var inputHtml = '';
      if (step.type === 'multiple_choice') {
        inputHtml = '<div class="answer-options" id="opts-' + stepKey + '">';
        step.options.forEach(function (opt, oi) {
          inputHtml += '<button class="answer-btn" data-idx="' + oi + '">' + escapeHtml(opt) + '</button>';
        });
        inputHtml += '</div>';
      } else {
        inputHtml = '<div class="formula-input-wrapper" id="fi-wrap-' + stepKey + '">' +
                    '<span class="formula-prefix">=</span>' +
                    '<input type="text" class="formula-input" id="fi-' + stepKey + '" ' +
                           'placeholder="Tulis formulamu di sini..." autocomplete="off" spellcheck="false">' +
                    '<button class="btn-check" id="fi-btn-' + stepKey + '">Cek Formula</button>' +
                    '</div>' +
                    '<div class="formula-hint" id="fi-hint-' + stepKey + '" hidden></div>';
      }
      stepsHtml += '<div class="multi-step-item' + (si > 0 ? ' step-locked' : '') + '" id="ms-item-' + stepKey + '">' +
                   '<p class="multi-step-instruction">' + escapeHtml(step.instruction) + '</p>' +
                   inputHtml +
                   '</div>';
      if (si < total - 1) {
        stepsHtml += '<div style="height:var(--space-4);"></div>';
      }
    });

    return '<div class="multi-step-progress-label" id="ms-prog-label-' + caseKey + '">Langkah 1 dari ' + total + '</div>' +
           '<div class="multi-step-bar"><div class="multi-step-bar-fill" id="ms-bar-' + caseKey + '" style="width:' + Math.round(100/total) + '%"></div></div>' +
           stepsHtml;
  }

  /* ------------------------------------------
     INTERACTIVE HANDLERS
  ------------------------------------------ */
  function attachInteractiveHandlers(c, caseKey) {
    if (c.type === 'multiple_choice') {
      attachMCHandlers(c.options, c.correct, caseKey, function () { awardXP(c.xp, caseKey); });
    } else if (c.type === 'formula_input') {
      attachFIHandlers(c.expected, c.hint, caseKey, function () { awardXP(c.xp, caseKey); }, 0);
    } else if (c.type === 'multi_step') {
      attachMultiStepHandlers(c, caseKey);
    }
  }

  function normFormula(val) {
    return val.trim().toLowerCase().replace(/^=/, '').replace(/\s+/g, '');
  }

  function showInsight(caseKey) {
    var el = document.getElementById('insight-' + caseKey);
    if (el) el.classList.add('visible');
  }

  function attachMCHandlers(options, correct, caseKey, onCorrect) {
    var container = document.getElementById('opts-' + caseKey);
    if (!container) return;
    var btns = container.querySelectorAll('.answer-btn');
    btns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var idx = parseInt(btn.dataset.idx, 10);
        if (idx === correct) {
          btns.forEach(function (b) { b.disabled = true; });
          btn.classList.add('correct');
          showInsight(caseKey);
          onCorrect();
        } else {
          btn.classList.add('wrong');
          setTimeout(function () { btn.classList.remove('wrong'); }, 400);
        }
      });
    });
  }

  function attachFIHandlers(expected, hint, caseKey, onCorrect, attemptCount) {
    var input = document.getElementById('fi-' + caseKey);
    var btn = document.getElementById('fi-btn-' + caseKey);
    var hintEl = document.getElementById('fi-hint-' + caseKey);
    if (!input || !btn) return;
    var attempts = attemptCount || 0;

    function check() {
      var val = input.value;
      if (!val.trim()) return;
      var norm = normFormula(val);
      var expNorm = normFormula(expected);
      if (norm === expNorm) {
        input.disabled = true;
        btn.disabled = true;
        input.style.borderColor = 'var(--success)';
        showInsight(caseKey);
        onCorrect();
      } else {
        attempts++;
        input.style.borderColor = 'var(--danger)';
        setTimeout(function () { input.style.borderColor = ''; }, 600);
        if (hintEl) {
          var hintText = hint || '';
          if (attempts >= 2 && expected) {
            hintText += (hintText ? ' � ' : '') + 'Jawaban: ' + expected;
          }
          hintEl.textContent = '?? ' + hintText;
          hintEl.removeAttribute('hidden');
        }
      }
    }

    btn.addEventListener('click', check);
    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') check();
    });
  }

  function attachMultiStepHandlers(c, caseKey) {
    var total = c.steps_interactive.length;
    var completed = 0;

    function updateProgress() {
      var label = document.getElementById('ms-prog-label-' + caseKey);
      var bar = document.getElementById('ms-bar-' + caseKey);
      var stepNum = Math.min(completed + 1, total);
      if (label) label.textContent = 'Langkah ' + stepNum + ' dari ' + total;
      if (bar) bar.style.width = Math.round(((completed + 1) / total) * 100) + '%';
    }

    function unlockStep(si) {
      var stepKey = caseKey + '_s' + si;
      var item = document.getElementById('ms-item-' + stepKey);
      if (item) item.classList.remove('step-locked');
      updateProgress();
    }

    function onStepDone(si) {
      completed++;
      var pct = Math.round(((completed) / total) * 100);
      var bar = document.getElementById('ms-bar-' + caseKey);
      if (bar) bar.style.width = pct + '%';
      var label = document.getElementById('ms-prog-label-' + caseKey);
      if (label) label.textContent = completed === total ? 'Semua langkah selesai! ?' : 'Langkah ' + (completed + 1) + ' dari ' + total;
      if (si + 1 < total) {
        unlockStep(si + 1);
      } else {
        showInsight(caseKey);
        awardXP(c.xp, caseKey);
      }
    }

    c.steps_interactive.forEach(function (step, si) {
      var stepKey = caseKey + '_s' + si;
      if (step.type === 'multiple_choice') {
        attachMCHandlers(step.options, step.correct, stepKey, function () { onStepDone(si); });
      } else {
        attachFIHandlers(step.expected, step.hint, stepKey, function () { onStepDone(si); }, 0);
      }
    });

    updateProgress();
  }

  /* ------------------------------------------
     XP SYSTEM
  ------------------------------------------ */
  function awardXP(xp, caseKey) {
    var state;
    try { state = JSON.parse(localStorage.getItem('eah_state') || '{}'); } catch (e) { state = {}; }
    state.completedCases = state.completedCases || [];
    if (state.completedCases.indexOf(caseKey) !== -1) return;
    state.completedCases.push(caseKey);
    state.totalXP = (state.totalXP || 0) + xp;
    try { localStorage.setItem('eah_state', JSON.stringify(state)); } catch (e) {}
    showXPToast(xp);
  }

  function showXPToast(xp) {
    var toast = document.createElement('div');
    toast.className = 'xp-toast';
    toast.textContent = '+' + xp + ' XP';
    document.body.appendChild(toast);
    setTimeout(function () {
      toast.style.transition = 'opacity 0.5s ease';
      toast.style.opacity = '0';
      setTimeout(function () {
        if (toast.parentNode) toast.parentNode.removeChild(toast);
      }, 500);
    }, 2000);
  }

  /* ------------------------------------------
     RENDER PROJECTS (updated)
  ------------------------------------------ */
  function renderProjects(filter) {
    var grid = document.getElementById('project-grid');
    if (!grid) return;

    var filtered = filter === 'All'
      ? PROJECTS
      : PROJECTS.filter(function (p) { return p.tags.indexOf(filter) !== -1; });

    if (!filtered.length) {
      grid.innerHTML =
        '<div style="grid-column:1/-1;text-align:center;padding:var(--space-12);color:var(--text-muted);">' +
          '<p>Belum ada proyek dengan tag "' + escapeHtml(filter) + '".</p>' +
        '</div>';
      return;
    }

    grid.innerHTML = filtered.map(function (p, i) {
      return '<div class="card project-card fade-in" style="transition-delay:' + (i * 0.05) + 's;" data-project-id="' + p.id + '">' +
        '<div class="project-thumb">' +
          '<span class="project-icon" aria-hidden="true">' + p.icon + '</span>' +
        '</div>' +
        '<div class="card-body">' +
          '<div style="display:flex;align-items:flex-start;justify-content:space-between;gap:var(--space-3);margin-bottom:var(--space-2);">' +
            '<h3 style="font-size:1rem;">' + escapeHtml(p.title) + '</h3>' +
            getDifficultyBadge(p.difficulty) +
          '</div>' +
          '<p style="font-size:0.85rem;color:var(--text-muted);line-height:1.65;">' + escapeHtml(p.desc) + '</p>' +
          '<div class="tag-group">' + getTagsHtml(p.tags) + '</div>' +
        '</div>' +
        '<div class="card-footer">' +
          '<button class="btn-ghost btn-sm" data-project-id="' + p.id + '" ' +
                  'aria-label="Buka case study ' + escapeHtml(p.title) + '">Lihat Case Study →</button>' +
        '</div>' +
      '</div>';
    }).join('');

    requestAnimationFrame(function () {
      grid.querySelectorAll('.fade-in').forEach(function (el) {
        el.offsetHeight;
        el.classList.add('visible');
      });
    });

    grid.querySelectorAll('[data-project-id]').forEach(function (btn) {
      if (btn.tagName === 'BUTTON') {
        btn.addEventListener('click', function () {
          openModal(parseInt(btn.dataset.projectId, 10));
        });
      }
    });
  }

  /* ------------------------------------------
     FILTER LOGIC
  ------------------------------------------ */
  function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter || 'All';
        if (filter === currentFilter) return;
        currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
        renderProjects(currentFilter);
        var countEl = document.getElementById('project-count');
        if (countEl) {
          var count = currentFilter === 'All'
            ? PROJECTS.length
            : PROJECTS.filter(function (p) { return p.tags.indexOf(currentFilter) !== -1; }).length;
          countEl.textContent = count + ' proyek';
        }
      });
    });
  }

  /* ------------------------------------------
     INIT
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initFilters();
    renderProjects('All');

    document.getElementById('modal-close').addEventListener('click', closeModal);

    document.getElementById('case-modal').addEventListener('click', function (e) {
      if (e.target === this) closeModal();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && !document.getElementById('case-modal').hasAttribute('hidden')) {
        closeModal();
      }
    });
  });

  window.openModal = openModal;

})();
