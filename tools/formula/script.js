        // ════════════════════════════════════════════════════
        //  DATA — FORMULAS
        // ════════════════════════════════════════════════════
        const FORMULAS = [
            // ── LOOKUP ──
            {
                id: 'vlookup', cat: 'lookup', name: 'VLOOKUP', short: 'Cari nilai di kolom pertama tabel & ambil data dari kolom lain',
                syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
                example: '=VLOOKUP(A2, $D$2:$F$100, 2, FALSE)',
                use: 'Dipakai untuk mencocokkan data antar tabel, misal ambil nama karyawan berdasarkan ID.',
                tags: ['essential'],
                catColor: '#4a7a9b',
                params: [['lookup_value', 'Nilai yang dicari (misal: ID karyawan)'], ['table_array', 'Rentang tabel sumber data'], ['col_index_num', 'Nomor kolom yang ingin diambil nilainya'], ['range_lookup', 'FALSE = tepat, TRUE = mendekati']],
                steps: [{ formula: '=VLOOKUP("E001", A2:C100, 2, FALSE)', result: 'Cari "E001" di kolom A, ambil nilai di kolom B → "Budi Santoso"' },
                { formula: '=VLOOKUP(D2, $A$2:$C$50, 3, 0)', result: 'Cari nilai D2 di kolom A, ambil kolom C. $ mengunci range agar bisa di-copy.' }],
                table: { head: ['ID', 'Nama', 'Departemen'], rows: [['E001', 'Budi Santoso', 'IT'], ['E002', 'Sari Dewi', 'Finance'], ['E003', 'Andi Pratama', 'Marketing']], hl: 0 }
            },

            {
                id: 'xlookup', cat: 'lookup', name: 'XLOOKUP', short: 'Versi modern VLOOKUP — lebih fleksibel, bisa cari ke kiri/kanan',
                syntax: '=XLOOKUP(lookup_value, lookup_array, return_array, [if_not_found])',
                example: '=XLOOKUP(A2, D:D, F:F, "Tidak Ditemukan")',
                use: 'Pengganti VLOOKUP yang lebih powerful. Bisa cari ke segala arah, bisa mengembalikan beberapa kolom sekaligus.',
                tags: ['essential', 'modern'],
                catColor: '#4a7a9b',
                params: [['lookup_value', 'Nilai yang dicari'], ['lookup_array', 'Kolom/baris tempat mencari'], ['return_array', 'Kolom/baris yang ingin dikembalikan'], ['if_not_found', 'Teks jika tidak ditemukan (opsional)']],
                steps: [{ formula: '=XLOOKUP(A2, D:D, E:E, "N/A")', result: 'Cari A2 di kolom D, ambil nilai dari kolom E. Jika tidak ada, tampil "N/A".' },
                { formula: '=XLOOKUP(A2, D:D, E:G)', result: 'Mengembalikan 3 kolom sekaligus (E, F, G) — tidak bisa dengan VLOOKUP!' }],
                table: { head: ['Cari ID', 'Hasil XLOOKUP'], rows: [['E001', 'Budi Santoso'], ['E002', 'Sari Dewi'], ['E999', 'Tidak Ditemukan']], hl: 2 }
            },

            {
                id: 'indexmatch', cat: 'lookup', name: 'INDEX + MATCH', short: 'Kombinasi paling powerful untuk lookup — tidak ada batasnya',
                syntax: '=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))',
                example: '=INDEX(C:C, MATCH(A2, B:B, 0))',
                use: 'Lebih fleksibel dari VLOOKUP karena bisa cari ke kiri, tidak bergantung urutan kolom, dan lebih cepat untuk data besar.',
                tags: ['essential'],
                catColor: '#4a7a9b',
                params: [['INDEX(range, row)', 'Ambil nilai dari range di baris ke-n'], ['MATCH(val, range, 0)', 'Cari posisi val dalam range, 0 = exact match']],
                steps: [{ formula: '=MATCH("Budi", B2:B100, 0)', result: 'Cari "Budi" di B2:B100 → hasilnya angka posisi baris, misal 3' },
                { formula: '=INDEX(C2:C100, MATCH("Budi", B2:B100, 0))', result: 'Ambil nilai di C pada baris yang sama dengan posisi "Budi" di B → departemennya' }],
                table: { head: ['Gaji', 'Nama', 'Dept'], rows: [['8.000.000', 'Budi', 'IT'], ['6.500.000', 'Sari', 'Finance'], ['7.200.000', 'Andi', 'Marketing']], hl: 0 }
            },

            {
                id: 'hlookup', cat: 'lookup', name: 'HLOOKUP', short: 'Seperti VLOOKUP tapi mencari di baris horizontal (atas ke bawah)',
                syntax: '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])',
                example: '=HLOOKUP("Jan", $B$1:$M$5, 3, FALSE)',
                use: 'Dipakai saat data tersusun horizontal, misal tabel laporan per bulan dengan bulan di baris pertama.',
                tags: ['basic'], catColor: '#4a7a9b',
                params: [['lookup_value', 'Nilai yang dicari di baris pertama'], ['table_array', 'Tabel sumber'], ['row_index_num', 'Baris ke-berapa yang diambil'], ['range_lookup', 'FALSE = tepat']],
                steps: [{ formula: '=HLOOKUP("Jan", B1:M5, 3, FALSE)', result: 'Cari "Jan" di baris 1, ambil nilai dari baris ke-3' }],
                table: { head: ['Produk', 'Jan', 'Feb', 'Mar'], rows: [['Sales', '100', '120', '95'], ['Cost', '70', '80', '65'], ['Profit', '30', '40', '30']], hl: 1 }
            },

            {
                id: 'choose', cat: 'lookup', name: 'CHOOSE', short: 'Pilih nilai berdasarkan nomor indeks',
                syntax: '=CHOOSE(index_num, value1, value2, ...)',
                example: '=CHOOSE(A2, "Rendah", "Sedang", "Tinggi")',
                use: 'Berguna untuk mapping angka ke label, misal 1→Senin, 2→Selasa, atau rating 1-3 ke kategori.',
                tags: ['basic'], catColor: '#4a7a9b',
                params: [['index_num', 'Angka 1-254 sebagai pemilih'], ['value1, value2...', 'Nilai yang akan dipilih sesuai indeks']],
                steps: [{ formula: '=CHOOSE(WEEKDAY(TODAY()), "Min","Sen","Sel","Rab","Kam","Jum","Sab")', result: 'Tampilkan nama hari ini dalam Bahasa Indonesia' }],
                table: { head: ['Nilai', 'Kategori'], rows: [['1', 'Rendah'], ['2', 'Sedang'], ['3', 'Tinggi']], hl: 1 }
            },

            // ── MATH & STATISTICS ──
            {
                id: 'sumifs', cat: 'math', name: 'SUMIFS', short: 'Jumlahkan data berdasarkan BANYAK kondisi sekaligus',
                syntax: '=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2]...)',
                example: '=SUMIFS(D:D, B:B, "IT", C:C, "2024")',
                use: 'Formula wajib analyst! Untuk laporan: total penjualan produk X di region Y pada bulan Z.',
                tags: ['essential'], catColor: '#5a7a5a',
                params: [['sum_range', 'Kolom yang dijumlahkan (angka)'], ['criteria_range1', 'Kolom pertama untuk filter'], ['criteria1', 'Nilai filter kolom pertama'], ['...', 'Bisa tambah hingga 127 kondisi']],
                steps: [{ formula: '=SUMIFS(D:D, B:B, "IT")', result: 'Jumlah gaji (D) untuk semua karyawan di departemen IT (B)' },
                { formula: '=SUMIFS(D:D, B:B, "IT", C:C, ">5000000")', result: 'Jumlah gaji karyawan IT yang gajinya di atas 5 juta' }],
                table: { head: ['Nama', 'Dept', 'Gaji'], rows: [['Budi', 'IT', '8.000.000'], ['Sari', 'Finance', '6.500.000'], ['Andi', 'IT', '7.200.000'], ['Rini', 'IT', '6.800.000']], hl: null }
            },

            {
                id: 'countifs', cat: 'math', name: 'COUNTIFS', short: 'Hitung jumlah data yang memenuhi BANYAK kondisi',
                syntax: '=COUNTIFS(criteria_range1, criteria1, [criteria_range2, criteria2]...)',
                example: '=COUNTIFS(B:B, "IT", C:C, ">5000000")',
                use: 'Hitung berapa karyawan, berapa transaksi, berapa produk yang memenuhi syarat tertentu.',
                tags: ['essential'], catColor: '#5a7a5a',
                params: [['criteria_range1', 'Kolom pertama untuk dicek'], ['criteria1', 'Kondisi untuk kolom pertama'], ['...', 'Tambah pasangan range+criteria sesuai kebutuhan']],
                steps: [{ formula: '=COUNTIFS(B:B, "IT")', result: 'Hitung karyawan di departemen IT → 3' },
                { formula: '=COUNTIFS(B:B, "IT", D:D, ">7000000")', result: 'Hitung karyawan IT dengan gaji > 7 juta → 2' }],
                table: { head: ['Nama', 'Dept', 'Status', 'Gaji'], rows: [['Budi', 'IT', 'Aktif', '8.000.000'], ['Sari', 'Finance', 'Aktif', '6.500.000'], ['Andi', 'IT', 'Cuti', '7.200.000'], ['Rini', 'IT', 'Aktif', '6.800.000']], hl: null }
            },

            {
                id: 'averageifs', cat: 'math', name: 'AVERAGEIFS', short: 'Hitung rata-rata berdasarkan banyak kondisi',
                syntax: '=AVERAGEIFS(average_range, criteria_range1, criteria1, ...)',
                example: '=AVERAGEIFS(D:D, B:B, "IT")',
                use: 'Rata-rata gaji per departemen, rata-rata nilai per kelas, rata-rata penjualan per produk.',
                tags: ['essential'], catColor: '#5a7a5a',
                params: [['average_range', 'Kolom yang dirata-rata'], ['criteria_range1', 'Kolom filter'], ['criteria1', 'Nilai filter']],
                steps: [{ formula: '=AVERAGEIFS(D:D, B:B, "IT")', result: 'Rata-rata gaji karyawan IT → 7.333.333' }],
                table: { head: ['Nama', 'Dept', 'Gaji'], rows: [['Budi', 'IT', '8.000.000'], ['Sari', 'Finance', '6.500.000'], ['Andi', 'IT', '7.200.000'], ['Rini', 'IT', '6.800.000']], hl: null }
            },

            {
                id: 'sumproduct', cat: 'math', name: 'SUMPRODUCT', short: 'Kalikan dua array lalu jumlahkan hasilnya — sangat serbaguna',
                syntax: '=SUMPRODUCT(array1, [array2], ...)',
                example: '=SUMPRODUCT(B2:B10, C2:C10)',
                use: 'Hitung total revenue (qty × harga), weighted average, atau sebagai alternatif COUNTIFS/SUMIFS yang lebih fleksibel.',
                tags: ['advanced'], catColor: '#5a7a5a',
                params: [['array1', 'Array atau range pertama'], ['array2', 'Array kedua (dikali dengan array1)']],
                steps: [{ formula: '=SUMPRODUCT(B2:B5, C2:C5)', result: 'Hitung total penjualan: (qty1×harga1) + (qty2×harga2) + ...' },
                { formula: '=SUMPRODUCT((B2:B10="IT")*(D2:D10>7000000))', result: 'Hitung karyawan IT bergaji > 7jt → hasil seperti COUNTIFS tapi lebih fleksibel' }],
                table: { head: ['Produk', 'Qty', 'Harga', 'Total'], rows: [['A', '10', '50.000', '500.000'], ['B', '5', '120.000', '600.000'], ['C', '8', '75.000', '600.000']], hl: null }
            },

            {
                id: 'round', cat: 'math', name: 'ROUND / ROUNDUP / ROUNDDOWN', short: 'Bulatkan angka ke jumlah desimal tertentu',
                syntax: '=ROUND(number, num_digits)',
                example: '=ROUND(A2/3, 2)',
                use: 'Untuk laporan keuangan agar angka tidak ada desimal panjang. ROUNDUP selalu ke atas, ROUNDDOWN selalu ke bawah.',
                tags: ['basic'], catColor: '#5a7a5a',
                params: [['number', 'Angka yang akan dibulatkan'], ['num_digits', 'Jumlah desimal (0 = tanpa desimal, -1 = ke puluhan)']],
                steps: [{ formula: '=ROUND(1234.567, 2)', result: '→ 1234.57' },
                { formula: '=ROUND(1234.567, 0)', result: '→ 1235' },
                { formula: '=ROUNDUP(1234.1, 0)', result: '→ 1235 (selalu naik)' },
                { formula: '=ROUNDDOWN(1234.9, 0)', result: '→ 1234 (selalu turun)' }],
                table: { head: ['Nilai', 'ROUND(,2)', 'ROUNDUP(,0)', 'ROUNDDOWN(,0)'], rows: [['1234.567', '1234.57', '1235', '1234'], ['99.001', '99.00', '100', '99']], hl: null }
            },

            {
                id: 'large', cat: 'math', name: 'LARGE / SMALL', short: 'Ambil nilai ke-N terbesar atau terkecil dari suatu range',
                syntax: '=LARGE(array, k)',
                example: '=LARGE(D2:D100, 1)',
                use: 'Temukan penjualan tertinggi ke-3, gaji terbesar ke-5, atau nilai minimum ke-2.',
                tags: ['basic'], catColor: '#5a7a5a',
                params: [['array', 'Range data angka'], ['k', 'Peringkat yang diinginkan (1=terbesar/terkecil)']],
                steps: [{ formula: '=LARGE(D2:D10, 1)', result: 'Nilai terbesar pertama (=MAX)' },
                { formula: '=LARGE(D2:D10, 3)', result: 'Nilai terbesar ke-3' },
                { formula: '=SMALL(D2:D10, 2)', result: 'Nilai terkecil ke-2' }],
                table: { head: ['Gaji', 'Peringkat'], rows: [['8.000.000', '1'], ['7.200.000', '2'], ['6.800.000', '3']], hl: null }
            },

            // ── TEXT ──
            {
                id: 'concatenate', cat: 'text', name: 'CONCAT / TEXTJOIN', short: 'Gabungkan beberapa teks/sel menjadi satu',
                syntax: '=TEXTJOIN(delimiter, ignore_empty, text1, text2, ...)',
                example: '=TEXTJOIN(", ", TRUE, B2:D2)',
                use: 'Gabungkan nama depan + belakang, buat kalimat dari beberapa kolom, atau buat list yang dipisah koma.',
                tags: ['essential'], catColor: '#7a5a9b',
                params: [['delimiter', 'Pemisah antar teks (misal: ", " atau " ")'], ['ignore_empty', 'TRUE = abaikan sel kosong'], ['text1, text2', 'Teks atau range yang digabung']],
                steps: [{ formula: '=B2&" "&C2', result: 'Cara cepat gabung 2 sel dengan spasi: "Budi" + " " + "Santoso" → "Budi Santoso"' },
                { formula: '=TEXTJOIN(", ", TRUE, B2:D2)', result: 'Gabung B2, C2, D2 dipisah koma: "IT, Jakarta, Aktif"' }],
                table: { head: ['Nama Depan', 'Nama Belakang', 'Gabungan'], rows: [['Budi', 'Santoso', 'Budi Santoso'], ['Sari', 'Dewi', 'Sari Dewi']], hl: null }
            },

            {
                id: 'left_right_mid', cat: 'text', name: 'LEFT / RIGHT / MID', short: 'Ambil sebagian karakter dari teks',
                syntax: '=LEFT(text, num_chars) | =MID(text, start, num_chars)',
                example: '=LEFT(A2, 3)',
                use: 'Ambil kode dari ID, pisahkan tahun dari tanggal teks, atau ekstrak bagian tertentu dari string.',
                tags: ['essential'], catColor: '#7a5a9b',
                params: [['text', 'Teks sumber'], ['num_chars', 'Jumlah karakter yang diambil'], ['start (MID)', 'Posisi awal pengambilan']],
                steps: [{ formula: '=LEFT("EMP-2024-001", 3)', result: '→ "EMP"' },
                { formula: '=RIGHT("EMP-2024-001", 3)', result: '→ "001"' },
                { formula: '=MID("EMP-2024-001", 5, 4)', result: '→ "2024"' }],
                table: { head: ['ID Lengkap', 'LEFT(3)', 'MID(5,4)', 'RIGHT(3)'], rows: [['EMP-2024-001', 'EMP', '2024', '001'], ['EMP-2024-087', 'EMP', '2024', '087']], hl: null }
            },

            {
                id: 'trim_clean', cat: 'text', name: 'TRIM / CLEAN / PROPER', short: 'Bersihkan dan rapikan teks',
                syntax: '=TRIM(text) | =PROPER(text)',
                example: '=TRIM(PROPER(A2))',
                use: 'Data dari sistem lain sering punya spasi berlebih atau huruf tidak konsisten. TRIM bersihkan spasi, PROPER bikin Title Case.',
                tags: ['essential'], catColor: '#7a5a9b',
                params: [['TRIM', 'Hapus spasi ekstra di awal/akhir/tengah teks'], ['CLEAN', 'Hapus karakter tidak tercetak'], ['PROPER', 'Ubah ke Title Case (Huruf Pertama Kapital)'], ['UPPER/LOWER', 'Semua kapital / semua kecil']],
                steps: [{ formula: '=TRIM("  Budi  Santoso  ")', result: '→ "Budi Santoso"' },
                { formula: '=PROPER("BUDI santoso")', result: '→ "Budi Santoso"' },
                { formula: '=TRIM(PROPER(A2))', result: 'Kombinasi: bersihkan spasi + perbaiki kapitalisasi' }],
                table: { head: ['Data Kotor', 'Setelah TRIM+PROPER'], rows: [['  budi SANTOSO  ', 'Budi Santoso'], ['  sari dewi  ', 'Sari Dewi']], hl: null }
            },

            {
                id: 'text_func', cat: 'text', name: 'TEXT', short: 'Format angka/tanggal menjadi teks dengan format tertentu',
                syntax: '=TEXT(value, format_text)',
                example: '=TEXT(A2, "dd/mm/yyyy")',
                use: 'Gabungkan angka/tanggal dalam kalimat, tampilkan mata uang dengan format custom, atau format angka untuk label.',
                tags: ['essential'], catColor: '#7a5a9b',
                params: [['value', 'Angka atau tanggal yang diformat'], ['format_text', 'Format dalam tanda kutip, seperti di Format Cells']],
                steps: [{ formula: '=TEXT(45000, "Rp #,##0")', result: '→ "Rp 45.000"' },
                { formula: '=TEXT(TODAY(), "dd mmmm yyyy")', result: '→ "09 April 2024"' },
                { formula: '"Total: "&TEXT(SUM(B:B), "#,##0")', result: '→ "Total: 1.234.567"' }],
                table: { head: ['Nilai', 'Format', 'Hasil'], rows: [['45000.5', '#,##0.00', '45.000,50'], ['0.1567', '0.00%', '15.67%'], ['TODAY()', 'dd/mm/yy', '09/04/24']], hl: null }
            },

            {
                id: 'find_search', cat: 'text', name: 'FIND / SEARCH', short: 'Cari posisi suatu teks dalam string',
                syntax: '=FIND(find_text, within_text, [start_num])',
                example: '=FIND("@", A2)',
                use: 'Sering dikombinasikan dengan LEFT/MID/RIGHT untuk memisahkan email, nama domain, atau bagian tertentu dari teks.',
                tags: ['advanced'], catColor: '#7a5a9b',
                params: [['find_text', 'Teks yang dicari'], ['within_text', 'Teks sumber'], ['start_num', 'Posisi mulai mencari (opsional)']],
                steps: [{ formula: '=FIND("@", "budi@email.com")', result: '→ 5 (@ ada di posisi 5)' },
                { formula: '=LEFT(A2, FIND("@",A2)-1)', result: 'Ambil bagian sebelum @ → username email' }],
                table: { head: ['Email', 'Username'], rows: [['budi@email.com', 'budi'], ['sari.dewi@corp.id', 'sari.dewi']], hl: null }
            },

            {
                id: 'substitute', cat: 'text', name: 'SUBSTITUTE / REPLACE', short: 'Ganti teks tertentu dalam string',
                syntax: '=SUBSTITUTE(text, old_text, new_text)',
                example: '=SUBSTITUTE(A2, "-", "")',
                use: 'Bersihkan format nomor telepon, ganti separator, atau hapus karakter tertentu dari teks.',
                tags: ['basic'], catColor: '#7a5a9b',
                params: [['text', 'Teks sumber'], ['old_text', 'Teks yang ingin diganti'], ['new_text', 'Teks pengganti (kosong "" untuk hapus)']],
                steps: [{ formula: '=SUBSTITUTE("021-1234-5678", "-", "")', result: '→ "0211234578" (hapus semua tanda -) ' },
                { formula: '=SUBSTITUTE(A2, " ", "_")', result: '→ Ganti spasi dengan underscore' }],
                table: { head: ['Asli', 'Setelah SUBSTITUTE'], rows: [['021-1234-5678', '02112345678'], ['Budi Santoso', 'Budi_Santoso']], hl: null }
            },

            // ── DATE ──
            {
                id: 'today_now', cat: 'date', name: 'TODAY / NOW', short: 'Tampilkan tanggal atau waktu saat ini secara dinamis',
                syntax: '=TODAY() | =NOW()',
                example: '=TODAY()-B2',
                use: 'Hitung umur, hitung hari kerja tersisa, tampilkan deadline relatif, atau cap waktu otomatis.',
                tags: ['essential'], catColor: '#c97c2a',
                params: [['TODAY()', 'Tanggal hari ini (diperbarui setiap buka file)'], ['NOW()', 'Tanggal + jam sekarang']],
                steps: [{ formula: '=TODAY()-B2', result: 'Hitung selisih hari dari tanggal lahir/input hingga sekarang' },
                { formula: '=TODAY()+30', result: 'Tanggal 30 hari dari sekarang (misal: deadline)' },
                { formula: '=DATEDIF(B2, TODAY(), "Y")', result: 'Hitung umur dalam tahun penuh' }],
                table: { head: ['Tanggal Masuk', 'Lama Bekerja (hari)'], rows: [['01/01/2022', '=TODAY()-A2'], ['15/06/2023', '=TODAY()-A3']], hl: null }
            },

            {
                id: 'datedif', cat: 'date', name: 'DATEDIF', short: 'Hitung selisih antara dua tanggal dalam satuan tertentu',
                syntax: '=DATEDIF(start_date, end_date, unit)',
                example: '=DATEDIF(B2, TODAY(), "Y")',
                use: 'Hitung umur karyawan, masa kerja, atau jatuh tempo kontrak dalam tahun/bulan/hari.',
                tags: ['essential'], catColor: '#c97c2a',
                params: [['start_date', 'Tanggal mulai'], ['end_date', 'Tanggal akhir'], ['unit', '"Y"=tahun, "M"=bulan, "D"=hari, "YM"=sisa bulan, "MD"=sisa hari']],
                steps: [{ formula: '=DATEDIF("01/01/1990", TODAY(), "Y")', result: 'Umur dalam tahun penuh' },
                { formula: '=DATEDIF(B2, TODAY(), "Y")&" tahun "&DATEDIF(B2, TODAY(), "YM")&" bulan"', result: 'Umur lengkap: "34 tahun 3 bulan"' }],
                table: { head: ['Tgl Lahir', 'Umur (Y)', 'Umur (M)'], rows: [['01/01/1990', '35', '420'], ['15/06/1995', '29', '353']], hl: null }
            },

            {
                id: 'eomonth', cat: 'date', name: 'EOMONTH / EDATE', short: 'Hitung tanggal akhir bulan atau offset bulan tertentu',
                syntax: '=EOMONTH(start_date, months)',
                example: '=EOMONTH(TODAY(), 0)',
                use: 'Hitung deadline akhir bulan, tanggal jatuh tempo, atau buat kalender otomatis.',
                tags: ['basic'], catColor: '#c97c2a',
                params: [['start_date', 'Tanggal referensi'], ['months', '0=bulan ini, 1=bulan depan, -1=bulan lalu']],
                steps: [{ formula: '=EOMONTH(TODAY(), 0)', result: 'Tanggal akhir bulan ini (misal: 30 April)' },
                { formula: '=EDATE(B2, 12)', result: 'Tanggal 12 bulan setelah B2 (perpanjangan kontrak 1 tahun)' },
                { formula: '=EOMONTH(B2, -1)+1', result: 'Tanggal pertama bulan yang sama dengan B2' }],
                table: { head: ['Mulai Kontrak', 'Akhir Kontrak (12 bln)'], rows: [['01/01/2024', '01/01/2025'], ['15/06/2024', '15/06/2025']], hl: null }
            },

            {
                id: 'workday', cat: 'date', name: 'WORKDAY / NETWORKDAYS', short: 'Hitung hari kerja (kecuali Sabtu, Minggu, & hari libur)',
                syntax: '=WORKDAY(start_date, days, [holidays]) | =NETWORKDAYS(start, end, [holidays])',
                example: '=NETWORKDAYS(B2, C2)',
                use: 'Hitung jumlah hari kerja dalam periode, atau tentukan deadline berdasarkan hari kerja.',
                tags: ['advanced'], catColor: '#c97c2a',
                params: [['start_date', 'Tanggal mulai'], ['days', 'Jumlah hari kerja yang ditambahkan'], ['holidays', 'Range berisi daftar hari libur (opsional)']],
                steps: [{ formula: '=WORKDAY(TODAY(), 14)', result: 'Tanggal 14 hari kerja dari sekarang' },
                { formula: '=NETWORKDAYS(B2, C2)', result: 'Jumlah hari kerja antara 2 tanggal' },
                { formula: '=NETWORKDAYS(B2, C2, E2:E10)', result: 'Dikurangi hari libur nasional di range E2:E10' }],
                table: { head: ['Mulai', 'Selesai', 'Hari Kerja'], rows: [['01/04/2024', '30/04/2024', '22'], ['01/01/2024', '31/03/2024', '65']], hl: null }
            },

            {
                id: 'year_month_day', cat: 'date', name: 'YEAR / MONTH / DAY / WEEKDAY', short: 'Ekstrak komponen dari tanggal',
                syntax: '=YEAR(date) | =MONTH(date) | =DAY(date)',
                example: '=YEAR(A2)&"-"&TEXT(MONTH(A2),"00")',
                use: 'Buat kolom Tahun, Bulan, atau Kuartal dari kolom tanggal untuk keperluan pivot/analisis.',
                tags: ['essential'], catColor: '#c97c2a',
                params: [['YEAR(date)', 'Ambil tahun (4 digit)'], ['MONTH(date)', 'Ambil bulan (1-12)'], ['DAY(date)', 'Ambil hari (1-31)'], ['WEEKDAY(date,2)', 'Ambil hari dalam minggu (Senin=1 jika type=2)']],
                steps: [{ formula: '="Q"&INT((MONTH(A2)-1)/3)+1', result: 'Konversi tanggal ke kuartal: Q1/Q2/Q3/Q4' },
                { formula: '=CHOOSE(WEEKDAY(A2,2),"Sen","Sel","Rab","Kam","Jum","Sab","Min")', result: 'Nama hari dalam seminggu' }],
                table: { head: ['Tanggal', 'Tahun', 'Bulan', 'Hari', 'Kuartal'], rows: [['15/03/2024', '2024', '3', '15', 'Q1'], ['20/07/2024', '2024', '7', '20', 'Q3']], hl: null }
            },

            // ── LOGIC ──
            {
                id: 'if', cat: 'logic', name: 'IF', short: 'Jalankan kondisi: jika benar lakukan X, jika salah lakukan Y',
                syntax: '=IF(logical_test, value_if_true, value_if_false)',
                example: '=IF(D2>=7000000, "Senior", "Junior")',
                use: 'Formula paling dasar dan paling sering dipakai. Kategorisasi data, validasi, atau logika bisnis sederhana.',
                tags: ['essential'], catColor: '#b85c5c',
                params: [['logical_test', 'Kondisi yang diuji (TRUE/FALSE)'], ['value_if_true', 'Nilai jika kondisi benar'], ['value_if_false', 'Nilai jika kondisi salah']],
                steps: [{ formula: '=IF(D2>=7000000, "Senior", "Junior")', result: 'Kategori berdasarkan gaji' },
                { formula: '=IF(C2="", "Belum Isi", C2)', result: 'Tampilkan "Belum Isi" jika sel kosong' },
                { formula: '=IF(D2>8e6,"A",IF(D2>6e6,"B","C"))', result: 'IF bersarang: grade A/B/C berdasarkan nilai' }],
                table: { head: ['Nama', 'Gaji', 'Kategori'], rows: [['Budi', '8.000.000', 'Senior'], ['Sari', '6.500.000', 'Junior'], ['Andi', '7.200.000', 'Senior']], hl: null }
            },

            {
                id: 'ifs', cat: 'logic', name: 'IFS', short: 'Ganti IF bersarang dengan banyak kondisi sekaligus — lebih rapi',
                syntax: '=IFS(condition1, value1, condition2, value2, ..., TRUE, else_value)',
                example: '=IFS(D2>=9e6,"A",D2>=7e6,"B",D2>=5e6,"C",TRUE,"D")',
                use: 'Mengganti IF bersarang yang kompleks dengan sintaks yang lebih mudah dibaca.',
                tags: ['essential'], catColor: '#b85c5c',
                params: [['condition1, value1', 'Kondisi pertama dan nilainya'], ['condition2, value2', 'Kondisi kedua dan nilainya'], ['TRUE, else', 'Kondisi default jika semua salah (wajib di akhir)']],
                steps: [{ formula: '=IFS(D2>=9000000,"A",D2>=7000000,"B",D2>=5000000,"C",TRUE,"D")', result: 'Grade berdasarkan 4 tingkat gaji, jauh lebih rapi dari IF bersarang' }],
                table: { head: ['Gaji', 'IF Bersarang', 'IFS'], rows: [['9.500.000', 'A', 'A'], ['7.200.000', 'B', 'B'], ['5.800.000', 'C', 'C'], ['4.000.000', 'D', 'D']], hl: null }
            },

            {
                id: 'iferror', cat: 'logic', name: 'IFERROR / IFNA', short: 'Tampilkan nilai alternatif jika formula menghasilkan error',
                syntax: '=IFERROR(value, value_if_error)',
                example: '=IFERROR(VLOOKUP(A2,D:F,2,0), "Tidak Ditemukan")',
                use: 'Wajib dipakai saat VLOOKUP atau formula lain mungkin menghasilkan #N/A, #DIV/0!, atau error lainnya.',
                tags: ['essential'], catColor: '#b85c5c',
                params: [['value', 'Formula yang mungkin error'], ['value_if_error', 'Yang ditampilkan jika error (teks atau 0)']],
                steps: [{ formula: '=IFERROR(VLOOKUP(A2,D:F,2,0), "-")', result: 'Jika VLOOKUP tidak menemukan data, tampil "-" bukan #N/A' },
                { formula: '=IFERROR(B2/C2, 0)', result: 'Jika C2=0 (div/0 error), tampil 0' },
                { formula: '=IFNA(VLOOKUP(...), "N/A")', result: 'IFNA lebih spesifik: hanya handle error #N/A saja' }],
                table: { head: ['Cari', 'Hasil VLOOKUP', 'Dengan IFERROR'], rows: [['E001', 'Budi', 'Budi'], ['E999', '#N/A', 'Tidak Ditemukan']], hl: 1 }
            },

            {
                id: 'and_or', cat: 'logic', name: 'AND / OR / NOT', short: 'Kombinasikan beberapa kondisi dalam satu logika',
                syntax: '=AND(condition1, condition2, ...) | =OR(condition1, condition2, ...)',
                example: '=IF(AND(B2="IT", D2>7e6), "Bonus", "Normal")',
                use: 'Bangun kondisi kompleks: karyawan yang aktif DAN bergaji > X, atau produk yang habis ATAU belum dikirim.',
                tags: ['essential'], catColor: '#b85c5c',
                params: [['AND(a,b)', 'TRUE hanya jika semua kondisi benar'], ['OR(a,b)', 'TRUE jika minimal satu kondisi benar'], ['NOT(a)', 'Balik nilai: TRUE → FALSE']],
                steps: [{ formula: '=IF(AND(B2="IT",D2>7000000),"Bonus A","Normal")', result: 'Bonus hanya untuk karyawan IT SEKALIGUS gaji > 7jt' },
                { formula: '=IF(OR(C2="Sakit",C2="Cuti"),"Tidak Hadir","Hadir")', result: 'Tidak hadir jika status Sakit ATAU Cuti' }],
                table: { head: ['Dept', 'Gaji', 'AND', 'OR'], rows: [['IT', '8.000.000', 'TRUE', 'TRUE'], ['IT', '6.500.000', 'FALSE', 'TRUE'], ['Finance', '8.000.000', 'FALSE', 'TRUE']], hl: null }
            },

            // ── INFO & ERROR ──
            {
                id: 'isblank', cat: 'info', name: 'ISBLANK / ISNA / ISNUMBER', short: 'Cek jenis atau kondisi isi sel',
                syntax: '=ISBLANK(value) | =ISNUMBER(value) | =ISTEXT(value)',
                example: '=IF(ISBLANK(A2), "Kosong", A2)',
                use: 'Validasi data: cek apakah kolom sudah diisi, apakah data berupa angka, atau apakah ada error.',
                tags: ['basic'], catColor: '#4a7a9b',
                params: [['ISBLANK(val)', 'TRUE jika sel kosong'], ['ISNUMBER(val)', 'TRUE jika isi adalah angka'], ['ISTEXT(val)', 'TRUE jika isi adalah teks'], ['ISNA(val)', 'TRUE jika isi adalah #N/A']],
                steps: [{ formula: '=ISBLANK(A2)', result: 'Cek apakah A2 kosong → TRUE/FALSE' },
                { formula: '=IF(ISNUMBER(B2), B2*1.1, "Bukan Angka")', result: 'Proses hanya jika isi angka' }],
                table: { head: ['Sel', 'ISBLANK', 'ISNUMBER', 'ISTEXT'], rows: [['123', 'FALSE', 'TRUE', 'FALSE'], ['Teks', 'FALSE', 'FALSE', 'TRUE'], ['(kosong)', 'TRUE', 'FALSE', 'FALSE']], hl: null }
            },

            {
                id: 'counta', cat: 'info', name: 'COUNT / COUNTA / COUNTBLANK', short: 'Hitung jumlah sel berisi data',
                syntax: '=COUNT(range) | =COUNTA(range) | =COUNTBLANK(range)',
                example: '=COUNTA(A:A)-1',
                use: 'Hitung berapa baris data yang ada, berapa yang kosong, atau berapa yang berisi angka.',
                tags: ['essential'], catColor: '#4a7a9b',
                params: [['COUNT', 'Hitung sel berisi angka saja'], ['COUNTA', 'Hitung sel yang tidak kosong (angka + teks)'], ['COUNTBLANK', 'Hitung sel yang kosong']],
                steps: [{ formula: '=COUNTA(A2:A1000)', result: 'Hitung total baris data (lebih akurat dari COUNT untuk data campuran)' },
                { formula: '=COUNTBLANK(B2:B100)', result: 'Hitung berapa sel yang belum diisi di kolom B' }],
                table: { head: ['Formula', 'Hasil'], rows: [['=COUNT(A:A)', 'Hanya angka'], ['=COUNTA(A:A)', 'Semua yang tidak kosong'], ['=COUNTBLANK(A:A)', 'Yang kosong']], hl: null }
            },

            // ── DYNAMIC ARRAY ──
            {
                id: 'filter_func', cat: 'dynamic', name: 'FILTER', short: 'Filter data secara dinamis tanpa mengubah data asli',
                syntax: '=FILTER(array, include, [if_empty])',
                example: '=FILTER(A2:C100, B2:B100="IT", "Kosong")',
                use: 'Buat tabel ringkasan yang otomatis update saat data berubah. Tidak perlu AutoFilter manual.',
                tags: ['modern'], catColor: '#4a7a9b',
                params: [['array', 'Range data yang ingin difilter'], ['include', 'Kondisi filter (TRUE/FALSE per baris)'], ['if_empty', 'Yang ditampilkan jika tidak ada hasil']],
                steps: [{ formula: '=FILTER(A2:C100, B2:B100="IT")', result: 'Tampilkan semua karyawan IT dalam tabel baru yang dinamis' },
                { formula: '=FILTER(A2:C100, (B2:B100="IT")*(D2:D100>7e6))', result: 'Filter dengan 2 kondisi: IT DAN gaji > 7jt' }],
                table: { head: ['Nama', 'Dept', 'Gaji'], rows: [['Budi', 'IT', '8.000.000'], ['Andi', 'IT', '7.200.000'], ['Rini', 'IT', '6.800.000']], hl: null }
            },

            {
                id: 'unique', cat: 'dynamic', name: 'UNIQUE', short: 'Ambil nilai unik dari daftar (hapus duplikat)',
                syntax: '=UNIQUE(array, [by_col], [exactly_once])',
                example: '=UNIQUE(B2:B100)',
                use: 'Buat daftar unik departemen, produk, atau kategori dari kolom yang punya banyak duplikat.',
                tags: ['modern'], catColor: '#4a7a9b',
                params: [['array', 'Range data yang ingin diambil nilai uniknya'], ['by_col', 'FALSE=per baris (default)'], ['exactly_once', 'TRUE=hanya yang muncul sekali']],
                steps: [{ formula: '=UNIQUE(B2:B100)', result: 'Daftar departemen unik dari kolom B (otomatis update)' },
                { formula: '=SORT(UNIQUE(B2:B100))', result: 'Daftar unik yang diurutkan A-Z' }],
                table: { head: ['Data Asli', 'UNIQUE'], rows: [['IT', 'IT'], ['Finance', 'Finance'], ['IT', 'Marketing'], ['Marketing', ''], ['Finance', '']], hl: null }
            },

            {
                id: 'sort_func', cat: 'dynamic', name: 'SORT / SORTBY', short: 'Urutkan data secara dinamis',
                syntax: '=SORT(array, [sort_index], [sort_order]) | =SORTBY(array, by_array)',
                example: '=SORT(A2:C100, 3, -1)',
                use: 'Buat tabel yang otomatis terurut berdasarkan kolom tertentu tanpa mengubah data asli.',
                tags: ['modern'], catColor: '#4a7a9b',
                params: [['array', 'Range data yang diurutkan'], ['sort_index', 'Kolom ke-berapa sebagai dasar urut (default: 1)'], ['sort_order', '1=ascending, -1=descending']],
                steps: [{ formula: '=SORT(A2:C100, 3, -1)', result: 'Urutkan tabel berdasarkan kolom ke-3 dari terbesar ke terkecil' },
                { formula: '=SORTBY(A2:C100, D2:D100, -1)', result: 'Urutkan berdasarkan kolom lain (SORTBY lebih fleksibel)' }],
                table: { head: ['Nama', 'Dept', 'Gaji'], rows: [['Budi', 'IT', '8.000.000'], ['Andi', 'IT', '7.200.000'], ['Rini', 'IT', '6.800.000'], ['Sari', 'Finance', '6.500.000']], hl: null }
            },
        ];

        // ════════════════════════════════════════════════════
        //  DATA — PRACTICE
        // ════════════════════════════════════════════════════
        const PRACTICE = [
            {
                id: 'p1', cat: 'lookup', level: 'pemula', formula: 'VLOOKUP',
                scenario: 'Kamu punya tabel karyawan di kolom A:C (A=ID, B=Nama, C=Departemen). Ingin ambil nama berdasarkan ID di sel F2.',
                question: 'Tulis formula VLOOKUP yang tepat:',
                hint: 'Ingat: VLOOKUP(nilai_cari, tabel, nomor_kolom, 0 untuk tepat)',
                answer: '=VLOOKUP(F2,A:C,2,0)',
                answers: ['=VLOOKUP(F2,A:C,2,0)', '=VLOOKUP(F2,A:C,2,FALSE)'],
                explanation: '=VLOOKUP(F2, A:C, 2, 0) — Cari F2 di kolom pertama (A), ambil kolom ke-2 (B=Nama), 0 atau FALSE untuk exact match.'
            },
            {
                id: 'p2', cat: 'math', level: 'pemula', formula: 'SUMIFS',
                scenario: 'Data penjualan ada di kolom A:D. A=Nama, B=Departemen, C=Bulan, D=Total Penjualan.',
                question: 'Hitung total penjualan departemen "Retail" pada bulan "Maret":',
                hint: 'SUMIFS(kolom_yang_dijumlah, kolom_filter1, kriteria1, kolom_filter2, kriteria2)',
                answer: '=SUMIFS(D:D,B:B,"Retail",C:C,"Maret")',
                answers: ['=SUMIFS(D:D,B:B,"Retail",C:C,"Maret")', '=SUMIFS(D2:D100,B2:B100,"Retail",C2:C100,"Maret")'],
                explanation: 'SUMIFS membutuhkan kolom yang dijumlah sebagai argumen pertama, diikuti pasangan range+kriteria.'
            },
            {
                id: 'p3', cat: 'logic', level: 'pemula', formula: 'IF',
                scenario: 'Kolom D berisi nilai ujian (0-100). Ingin buat kolom E yang menampilkan "Lulus" jika nilai ≥ 70, atau "Tidak Lulus" jika kurang.',
                question: 'Tulis formula IF untuk sel E2:',
                hint: '=IF(kondisi, nilai_jika_benar, nilai_jika_salah)',
                answer: '=IF(D2>=70,"Lulus","Tidak Lulus")',
                answers: ['=IF(D2>=70,"Lulus","Tidak Lulus")', '=IF(D2>=70,"LULUS","TIDAK LULUS")'],
                explanation: '=IF(D2>=70, "Lulus", "Tidak Lulus") — Perhatikan urutan: kondisi dulu, lalu true, lalu false.'
            },
            {
                id: 'p4', cat: 'text', level: 'pemula', formula: 'TRIM + PROPER',
                scenario: 'Data nama di kolom A tidak konsisten: "  budi SANTOSO  ", "  sari dewi  ", dll. Ada spasi ekstra dan kapitalisasi acak.',
                question: 'Formula untuk membersihkan nama di A2 (hapus spasi + Title Case):',
                hint: 'Kombinasikan TRIM() dan PROPER() — PROPER yang di dalam, TRIM di luar.',
                answer: '=TRIM(PROPER(A2))',
                answers: ['=TRIM(PROPER(A2))', '=PROPER(TRIM(A2))'],
                explanation: '=TRIM(PROPER(A2)) — Urutan lebih baik: PROPER dulu ubah ke Title Case, lalu TRIM hapus spasi. Keduanya sebenarnya menghasilkan hasil sama dalam kasus ini.'
            },
            {
                id: 'p5', cat: 'lookup', level: 'menengah', formula: 'INDEX MATCH',
                scenario: 'Tabel di A:C: A=Gaji, B=Nama, C=Departemen. Ingin ambil GAJI (kolom A) berdasarkan Nama (kolom B). VLOOKUP tidak bisa karena kolom yang dicari ada di KIRI hasil.',
                question: 'Gunakan INDEX MATCH untuk ambil gaji Budi dari tabel tersebut:',
                hint: '=INDEX(kolom_hasil, MATCH(nilai_cari, kolom_pencarian, 0))',
                answer: '=INDEX(A:A,MATCH("Budi",B:B,0))',
                answers: ['=INDEX(A:A,MATCH("Budi",B:B,0))', '=INDEX(A2:A100,MATCH("Budi",B2:B100,0))'],
                explanation: 'INDEX(A:A, ...) menentukan kolom hasil, MATCH("Budi", B:B, 0) mencari posisi "Budi" di kolom B. Hasilnya digunakan INDEX untuk ambil nilai di kolom A.'
            },
            {
                id: 'p6', cat: 'date', level: 'menengah', formula: 'DATEDIF',
                scenario: 'Kolom B berisi tanggal lahir karyawan. Ingin buat kolom umur yang otomatis update setiap hari.',
                question: 'Formula untuk menghitung umur dalam tahun penuh di C2:',
                hint: 'DATEDIF(tanggal_mulai, tanggal_akhir, "Y") — "Y" untuk tahun penuh',
                answer: '=DATEDIF(B2,TODAY(),"Y")',
                answers: ['=DATEDIF(B2,TODAY(),"Y")'],
                explanation: 'DATEDIF(B2, TODAY(), "Y") — TODAY() memastikan umur dihitung hingga hari ini dan otomatis berubah.'
            },
            {
                id: 'p7', cat: 'math', level: 'menengah', formula: 'COUNTIFS',
                scenario: 'Data absensi di kolom A:C: A=Nama, B=Departemen, C=Status (Hadir/Sakit/Cuti). Manajer ingin tahu berapa karyawan IT yang statusnya "Sakit".',
                question: 'Formula COUNTIFS yang tepat:',
                hint: 'COUNTIFS(range1, kriteria1, range2, kriteria2) — tanpa sum_range!',
                answer: '=COUNTIFS(B:B,"IT",C:C,"Sakit")',
                answers: ['=COUNTIFS(B:B,"IT",C:C,"Sakit")', '=COUNTIFS(B2:B100,"IT",C2:C100,"Sakit")'],
                explanation: 'COUNTIFS berbeda dari SUMIFS — tidak ada kolom yang dijumlah. Langsung pasang range+kriteria berulang.'
            },
            {
                id: 'p8', cat: 'logic', level: 'menengah', formula: 'IFERROR',
                scenario: 'Formula VLOOKUP di B2 kadang menghasilkan #N/A karena ada ID yang tidak ada di tabel referensi. Ingin tampilkan "Data tidak ada" jika error.',
                question: 'Bungkus VLOOKUP(A2,D:F,2,0) dengan IFERROR:',
                hint: '=IFERROR(formula_asli, "pesan_jika_error")',
                answer: '=IFERROR(VLOOKUP(A2,D:F,2,0),"Data tidak ada")',
                answers: ['=IFERROR(VLOOKUP(A2,D:F,2,0),"Data tidak ada")', '=IFERROR(VLOOKUP(A2,D:F,2,FALSE),"Data tidak ada")'],
                explanation: 'Selalu bungkus VLOOKUP dengan IFERROR untuk laporan yang bersih. Pilihan selain teks: 0, "", atau nilai default lainnya.'
            },
            {
                id: 'p9', cat: 'text', level: 'mahir', formula: 'MID + FIND',
                scenario: 'Kolom A berisi email seperti "budi.santoso@perusahaan.com". Ingin ekstrak domain (bagian setelah @): "perusahaan.com".',
                question: 'Formula untuk mengambil domain dari email di A2:',
                hint: 'Cari posisi "@" dengan FIND, lalu ambil teks setelahnya dengan MID atau RIGHT',
                answer: '=MID(A2,FIND("@",A2)+1,100)',
                answers: ['=MID(A2,FIND("@",A2)+1,100)', '=RIGHT(A2,LEN(A2)-FIND("@",A2))'],
                explanation: 'MID(A2, FIND("@",A2)+1, 100) — +1 agar mulai setelah karakter @. 100 adalah angka besar yang aman untuk menangkap sisa teks berapapun panjangnya.'
            },
            {
                id: 'p10', cat: 'lookup', level: 'mahir', formula: 'XLOOKUP',
                scenario: 'Kolom D berisi nama produk, kolom F berisi harga. Ingin ambil harga untuk produk di A2. Jika tidak ada, tampilkan 0. Gunakan XLOOKUP.',
                question: 'Tulis formula XLOOKUP yang tepat:',
                hint: '=XLOOKUP(nilai_cari, kolom_cari, kolom_hasil, nilai_jika_tidak_ada)',
                answer: '=XLOOKUP(A2,D:D,F:F,0)',
                answers: ['=XLOOKUP(A2,D:D,F:F,0)', '=XLOOKUP(A2,D2:D100,F2:F100,0)'],
                explanation: 'XLOOKUP lebih modern: tidak perlu nomor kolom, langsung tunjuk kolom hasil (F:F), dan bisa set nilai default jika tidak ditemukan.'
            },
        ];

        // ════════════════════════════════════════════════════
        //  DATA — QUIZ QUESTIONS
        // ════════════════════════════════════════════════════
        const QUIZ_Q = [
            {
                cat: 'lookup', q: 'Apa perbedaan utama VLOOKUP dan INDEX MATCH?',
                ctx: '',
                opts: ['VLOOKUP hanya bisa ke kanan, INDEX MATCH bisa ke segala arah',
                    'INDEX MATCH lebih lambat dari VLOOKUP untuk data besar',
                    'VLOOKUP mendukung multiple column, INDEX MATCH tidak',
                    'Keduanya identik, hanya sintaks yang berbeda'],
                ans: 0,
                exp: 'VLOOKUP terbatas mencari di kolom paling kiri dan mengambil ke kanan. INDEX MATCH tidak punya batasan arah, dan umumnya lebih cepat untuk dataset besar.'
            },
            {
                cat: 'lookup', q: 'Formula =VLOOKUP(A2,D:G,3,FALSE) mengambil data dari kolom mana?',
                ctx: 'Table_array dimulai dari kolom D',
                opts: ['Kolom D (ke-1)', 'Kolom E (ke-2)', 'Kolom F (ke-3)', 'Kolom G (ke-4)'],
                ans: 2,
                exp: 'col_index_num=3 berarti kolom ke-3 dari table_array yang dimulai kolom D. D=1, E=2, F=3. Jadi hasilnya dari kolom F.'
            },
            {
                cat: 'math', q: 'Apa perbedaan SUMIF dan SUMIFS?',
                ctx: '',
                opts: ['SUMIF hanya bisa 1 kondisi, SUMIFS bisa banyak kondisi',
                    'SUMIF lebih cepat dari SUMIFS',
                    'SUMIFS adalah versi baru yang menggantikan SUMIF sepenuhnya',
                    'SUMIF bisa menggunakan wildcard, SUMIFS tidak'],
                ans: 0,
                exp: 'SUMIF hanya mendukung satu pasang range+criteria. SUMIFS mendukung hingga 127 kondisi. Untuk konsistensi, lebih baik selalu pakai SUMIFS.'
            },
            {
                cat: 'math', q: 'Formula untuk menghitung rata-rata gaji karyawan di departemen "IT" adalah...',
                ctx: 'Data: Kolom A=Nama, B=Departemen, C=Gaji',
                opts: ['=AVERAGE(C:C, B:B, "IT")',
                    '=AVERAGEIF(B:B, "IT", C:C)',
                    '=AVERAGEIFS(C:C, B:B, "IT")',
                    'B dan C benar'],
                ans: 3,
                exp: 'Baik AVERAGEIF maupun AVERAGEIFS bisa digunakan untuk satu kondisi. Sintaks AVERAGEIF: (range_filter, kriteria, range_nilai). Sintaks AVERAGEIFS: (range_nilai, range_filter, kriteria).'
            },
            {
                cat: 'logic', q: 'Manakah formula IF yang benar untuk memberikan "Bonus" jika gaji > 8jt DAN departemen = "IT"?',
                ctx: '',
                opts: ['=IF(D2>8000000 AND B2="IT", "Bonus", "")',
                    '=IF(AND(D2>8000000, B2="IT"), "Bonus", "")',
                    '=IF(D2>8000000, B2="IT", "Bonus", "")',
                    '=IFAND(D2>8000000, B2="IT", "Bonus", "")'],
                ans: 1,
                exp: 'Kondisi ganda dalam IF harus dibungkus AND() atau OR() sebagai fungsi. Penulisan langsung "A AND B" tidak valid di Excel.'
            },
            {
                cat: 'logic', q: 'IFERROR(B2/C2, 0) — apa yang terjadi jika C2 = 0?',
                ctx: '',
                opts: ['Formula menghasilkan error #DIV/0!',
                    'Formula menghasilkan nilai 0',
                    'Formula menghasilkan infinity (∞)',
                    'Excel otomatis skip baris tersebut'],
                ans: 1,
                exp: 'IFERROR menangkap semua jenis error termasuk #DIV/0!. Karena value_if_error = 0, hasil yang ditampilkan adalah 0.'
            },
            {
                cat: 'lookup', q: 'Keunggulan XLOOKUP dibanding VLOOKUP adalah...',
                ctx: '',
                opts: ['XLOOKUP tersedia di semua versi Excel termasuk Excel 2010',
                    'XLOOKUP bisa mencari ke kiri dan mengembalikan beberapa kolom sekaligus',
                    'XLOOKUP selalu lebih cepat dari VLOOKUP',
                    'XLOOKUP tidak memerlukan exact/approximate match'],
                ans: 1,
                exp: 'XLOOKUP tidak terbatas arah pencarian, bisa kembalikan range (bukan hanya satu kolom), dan punya argumen if_not_found bawaan. Kelemahannya: hanya tersedia di Excel 365/2021+.'
            },
            {
                cat: 'math', q: '=SUMPRODUCT((B2:B10="IT")*(D2:D10>7000000)) — formula ini menghitung...',
                ctx: 'B=Departemen, D=Gaji',
                opts: ['Total gaji karyawan IT yang bergaji > 7jt',
                    'Jumlah karyawan IT yang bergaji > 7jt',
                    'Rata-rata gaji karyawan IT',
                    'Daftar nama karyawan IT bergaji > 7jt'],
                ans: 1,
                exp: 'Dua kondisi boolean dikalikan menghasilkan array 0/1. SUMPRODUCT menjumlahkan array tersebut → hasil = jumlah data yang memenuhi kedua kondisi (seperti COUNTIFS).'
            },
            {
                cat: 'text', q: '=LEFT("EMP-2024-001", FIND("-", "EMP-2024-001")-1) menghasilkan...',
                ctx: '',
                opts: ['"EMP-"', '"EMP"', '"EMP-2024"', '"2024"'],
                ans: 1,
                exp: 'FIND("-","EMP-2024-001") = 4 (posisi tanda -). Jadi LEFT(teks, 4-1) = LEFT(teks, 3) = "EMP". Pola ini sering dipakai untuk ambil prefix sebelum pemisah.'
            },
            {
                cat: 'math', q: 'Manakah formula yang BENAR untuk hitung jumlah hari kerja antara B2 dan C2?',
                ctx: '',
                opts: ['=WORKDAY(B2, C2)',
                    '=DAYS(B2, C2)',
                    '=NETWORKDAYS(B2, C2)',
                    '=C2-B2'],
                ans: 2,
                exp: 'NETWORKDAYS(start, end) menghitung hari kerja (Senin-Jumat) antara dua tanggal. WORKDAY adalah kebalikannya: menambahkan N hari kerja ke tanggal.'
            },
        ];

        // ════════════════════════════════════════════════════
        //  STATE
        // ════════════════════════════════════════════════════
        let mastered = JSON.parse(localStorage.getItem('xft_mastered') || '[]');
        let currentFilter = 'all';
        let currentSearch = '';
        let currentTab = 'formulas';
        let openDetail = null;
        let quizCat = 'all';
        let quizQs = [];
        let quizIdx = 0;
        let quizScore = 0;

        // ════════════════════════════════════════════════════
        //  RENDER FORMULAS
        // ════════════════════════════════════════════════════
        function tagHtml(tags) {
            return tags.map(t => {
                const m = { essential: 'tag-essential essential', modern: 'tag-modern modern', advanced: 'tag-advanced advanced', basic: 'tag-basic basic' };
                const l = { essential: '🔥 Wajib', modern: '✨ Modern', advanced: '🎓 Mahir', basic: '📗 Dasar' };
                return `<span class="f-tag ${m[t] || 'tag-basic'}">${l[t] || t}</span>`;
            }).join('');
        }

        function miniTable(t) {
            if (!t) return '';
            const head = t.head.map(h => `<th>${h}</th>`).join('');
            const rows = t.rows.map((r, i) => {
                const cls = t.hl === i ? 'hl-row' : '';
                return `<tr class="${cls}">${r.map(c => `<td>${c}</td>`).join('')}</tr>`;
            }).join('');
            return `<table class="mini-table"><tr>${head}</tr>${rows}</table>`;
        }

        function renderFormulas() {
            const list = getFiltered();
            const grid = document.getElementById('formulaGrid');
            if (!list.length) {
                grid.innerHTML = `<div class="empty"><div class="empty-icon">🔍</div><h3>Tidak ada formula</h3><p>Coba kata kunci lain</p></div>`;
                return;
            }
            grid.innerHTML = list.map((f, i) => {
                const isMastered = mastered.includes(f.id);
                const delay = Math.min(i * 0.04, 0.4);
                const paramRows = f.params.map(([k, v]) => `<tr><td>${k}</td><td>${v}</td></tr>`).join('');
                const stepHtml = f.steps.map((s, i) => `
      <div class="example-step">
        <span class="step-num">${i + 1}</span>
        <div class="step-formula">${s.formula}</div>
        <div class="step-result">→ ${s.result}</div>
      </div>`).join('');

                return `<div class="f-card ${isMastered ? 'mastered' : ''}" style="animation-delay:${delay}s" id="fcard-${f.id}">
      <div class="f-card-top">
        <div class="f-cat-dot" style="background:${f.catColor}"></div>
        <div style="flex:1">
          <div class="f-name">${f.name}</div>
          <div class="f-short">${f.short}</div>
        </div>
      </div>
      <div class="f-body">
        <div class="f-example-label">Sintaks</div>
        <div class="syntax-block">${f.syntax}</div>
        <div class="f-example-label">Contoh</div>
        <div class="f-example">${f.example}</div>
        <div class="f-use">${f.use}</div>
        <div class="f-tags">${tagHtml(f.tags)}</div>
        <button class="master-btn" onclick="toggleMaster('${f.id}')">
          ${isMastered ? '✅ Sudah Dikuasai' : '📌 Tandai Sudah Paham'}
        </button>
      </div>
      <div class="detail-panel" id="detail-${f.id}">
        <div class="detail-section">
          <div class="detail-title">📊 Contoh Data</div>
          ${miniTable(f.table)}
        </div>
        <div class="detail-section">
          <div class="detail-title">⚙️ Penjelasan Parameter</div>
          <table class="param-table">${paramRows}</table>
        </div>
        <div class="detail-section">
          <div class="detail-title">📖 Langkah-langkah Penggunaan</div>
          ${stepHtml}
        </div>
      </div>
      <div style="padding:0 18px 14px">
        <button onclick="toggleDetail('${f.id}',this)" style="width:100%;padding:8px;background:none;border:1px dashed var(--border);border-radius:8px;color:var(--text-dim);font-family:var(--body);font-size:12px;cursor:pointer;transition:all .15s" 
          onmouseover="this.style.borderColor='var(--sage-md)';this.style.color='var(--sage2)'" onmouseout="this.style.borderColor='var(--border)';this.style.color='var(--text-dim)'">
          ▼ Lihat Detail Lengkap
        </button>
      </div>
    </div>`;
            }).join('');
        }

        function toggleDetail(id, btn) {
            const panel = document.getElementById('detail-' + id);
            const isOpen = panel.classList.contains('open');
            if (openDetail && openDetail !== id) {
                document.getElementById('detail-' + openDetail)?.classList.remove('open');
            }
            panel.classList.toggle('open');
            openDetail = isOpen ? null : id;
            btn.textContent = panel.classList.contains('open') ? '▲ Sembunyikan Detail' : '▼ Lihat Detail Lengkap';
        }

        function getFiltered() {
            return FORMULAS.filter(f => {
                const mc = currentFilter === 'all' ? true
                    : currentFilter === 'mastered' ? mastered.includes(f.id)
                        : currentFilter === 'essential' ? f.tags.includes('essential')
                            : f.cat === currentFilter;
                const s = currentSearch.toLowerCase();
                const ms = !s || f.name.toLowerCase().includes(s) || f.short.toLowerCase().includes(s) || f.use.toLowerCase().includes(s);
                return mc && ms;
            });
        }

        function setFilter(cat, btn) {
            currentFilter = cat;
            document.querySelectorAll('.sb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const titles = {
                all: '📚 Semua Formula', lookup: '🔍 Lookup & Reference', math: '➕ Math & Statistics',
                text: '✍️ Text & String', date: '📅 Date & Time', logic: '⚖️ Logic & Kondisi',
                info: 'ℹ️ Info & Error', dynamic: '⚡ Dynamic Array',
                mastered: '✅ Sudah Dikuasai', essential: '🔥 Wajib Tahu'
            };
            document.getElementById('sectionTitle').textContent = titles[cat] || cat;
            if (currentTab === 'formulas') renderFormulas();
        }

        function doSearch(v) {
            currentSearch = v;
            if (currentTab === 'formulas') renderFormulas();
        }

        function toggleMaster(id) {
            if (mastered.includes(id)) mastered = mastered.filter(x => x !== id);
            else mastered.push(id);
            localStorage.setItem('xft_mastered', JSON.stringify(mastered));
            updateStats();
            const card = document.getElementById('fcard-' + id);
            if (card) {
                card.classList.toggle('mastered');
                const btn = card.querySelector('.master-btn');
                btn.textContent = mastered.includes(id) ? '✅ Sudah Dikuasai' : '📌 Tandai Sudah Paham';
            }
            document.getElementById('sc-mastered').textContent = mastered.length;
        }

        function updateStats() {
            const total = FORMULAS.length;
            const done = mastered.length;
            document.getElementById('masteredCount').textContent = done;
            document.getElementById('totalFormulas').textContent = total;
            const pct = done / total;
            const circ = 113;
            document.getElementById('ringCircle').setAttribute('stroke-dashoffset', circ * (1 - pct));
            // update counts
            document.getElementById('sc-all').textContent = total;
            const cats = ['lookup', 'math', 'text', 'date', 'logic', 'info', 'dynamic'];
            cats.forEach(c => { const el = document.getElementById('sc-' + c); if (el) el.textContent = FORMULAS.filter(f => f.cat === c).length; });
            document.getElementById('sc-mastered').textContent = done;
            document.getElementById('sc-essential').textContent = FORMULAS.filter(f => f.tags.includes('essential')).length;
        }

        // ════════════════════════════════════════════════════
        //  PRACTICE
        // ════════════════════════════════════════════════════
        function renderPractice() {
            const cat = document.getElementById('practiceFilter').value;
            const list = cat === 'all' ? PRACTICE : PRACTICE.filter(p => p.cat === cat);
            const grid = document.getElementById('practiceGrid');
            grid.innerHTML = list.map(p => `
    <div class="practice-card" id="pc-${p.id}">
      <div class="pc-header">
        <span style="font-size:15px">${{ lookup: '🔍', math: '➕', text: '✍️', date: '📅', logic: '⚖️' }[p.cat] || '📗'}</span>
        <strong style="font-size:13.5px">${p.formula}</strong>
        <span class="pc-level level-${p.level}">${p.level.charAt(0).toUpperCase() + p.level.slice(1)}</span>
      </div>
      <div class="pc-body">
        <div class="pc-scenario">📋 ${p.scenario}</div>
        <div class="pc-question">${p.question}</div>
        <div class="pc-hint">💡 <em>Hint: ${p.hint}</em></div>
        <input type="text" class="answer-input" id="ans-${p.id}" placeholder="Ketik formula di sini... (misal: =VLOOKUP(...))" 
          onkeydown="if(event.key==='Enter') checkPractice('${p.id}')">
        <div class="pc-actions">
          <button class="btn-check" onclick="checkPractice('${p.id}')">✓ Cek Jawaban</button>
          <button class="btn-hint" onclick="toggleHint('${p.id}')">💡 Hint</button>
        </div>
        <div class="hint-box" id="hint-${p.id}">💡 ${p.hint}</div>
        <div class="feedback-box" id="fb-${p.id}"></div>
      </div>
    </div>`).join('');
        }

        function checkPractice(id) {
            const p = PRACTICE.find(x => x.id === id);
            const inp = document.getElementById('ans-' + id);
            const fb = document.getElementById('fb-' + id);
            const val = inp.value.trim().toLowerCase().replace(/\s/g, '');
            const correct = p.answers.some(a => val === a.toLowerCase().replace(/\s/g, ''));
            inp.className = 'answer-input ' + (correct ? 'correct' : 'wrong');
            fb.className = 'feedback-box ' + (correct ? 'correct' : 'wrong');
            fb.innerHTML = correct
                ? `✅ <strong>Benar!</strong> ${p.explanation}`
                : `❌ <strong>Belum tepat.</strong> ${p.explanation}<br><br>💡 <strong>Jawaban:</strong> <code style="font-family:var(--mono);background:rgba(255,255,255,0.5);padding:2px 6px;border-radius:4px">${p.answers[0]}</code>`;
        }

        function toggleHint(id) {
            const h = document.getElementById('hint-' + id);
            h.classList.toggle('open');
        }

        // ════════════════════════════════════════════════════
        //  QUIZ
        // ════════════════════════════════════════════════════
        let quizCatSelected = 'all';

        function selectQuizCat(cat, el) {
            quizCatSelected = cat;
            document.querySelectorAll('.qopt-card').forEach(c => c.classList.remove('selected'));
            el.classList.add('selected');
        }

        function shuffle(arr) { return [...arr].sort(() => Math.random() - .5); }

        function startQuiz() {
            let pool = quizCatSelected === 'all' ? QUIZ_Q : QUIZ_Q.filter(q => q.cat === quizCatSelected);
            quizQs = shuffle(pool).slice(0, 10);
            quizIdx = 0; quizScore = 0;
            document.getElementById('quizStart').style.display = 'none';
            document.getElementById('quizResult').classList.remove('active');
            document.getElementById('quizPlay').classList.add('active');
            renderQuestion();
        }

        function renderQuestion() {
            if (quizIdx >= quizQs.length) { showResult(); return; }
            const q = quizQs[quizIdx];
            const pct = ((quizIdx + 1) / quizQs.length * 100);
            document.getElementById('qpLabel').textContent = `${quizIdx + 1} / ${quizQs.length}`;
            document.getElementById('qpFill').style.width = pct + '%';
            document.getElementById('qpScore').textContent = quizScore;
            document.getElementById('qpQuestion').textContent = q.q;
            const ctx = document.getElementById('qpContext');
            if (q.ctx) { ctx.textContent = q.ctx; ctx.style.display = 'block'; }
            else ctx.style.display = 'none';
            const letters = ['A', 'B', 'C', 'D'];
            document.getElementById('qpAnswers').innerHTML = q.opts.map((opt, i) => `
    <button class="qp-opt" onclick="answerQ(${i})">
      <span class="qp-opt-letter">${letters[i]}</span>${opt}
    </button>`).join('');
            document.getElementById('qpExplanation').className = 'qp-explanation';
            document.getElementById('qpNext').className = 'qp-next';
        }

        function answerQ(i) {
            const q = quizQs[quizIdx];
            document.querySelectorAll('.qp-opt').forEach(b => b.disabled = true);
            document.querySelectorAll('.qp-opt')[i].classList.add(i === q.ans ? 'correct' : 'wrong');
            if (i !== q.ans) document.querySelectorAll('.qp-opt')[q.ans].classList.add('correct');
            if (i === q.ans) quizScore++;
            document.getElementById('qpScore').textContent = quizScore;
            document.getElementById('qpExplanation').innerHTML = '💡 ' + q.exp;
            document.getElementById('qpExplanation').className = 'qp-explanation show';
            document.getElementById('qpNext').className = 'qp-next show';
            document.getElementById('qpNext').textContent = quizIdx + 1 >= quizQs.length ? 'Lihat Hasil →' : 'Soal Berikutnya →';
        }

        function nextQuestion() { quizIdx++; renderQuestion(); }

        function showResult() {
            document.getElementById('quizPlay').classList.remove('active');
            const res = document.getElementById('quizResult');
            res.classList.add('active');
            const total = quizQs.length;
            const pct = Math.round(quizScore / total * 100);
            const wrong = total - quizScore;
            document.getElementById('resultPct').textContent = pct + '%';
            document.getElementById('resCorrect').textContent = quizScore;
            document.getElementById('resWrong').textContent = wrong;
            document.getElementById('resTotal').textContent = total;
            const msgs = [
                [80, '🎉 Luar Biasa!', 'Kamu sudah sangat menguasai formula Excel ini. Terus pertahankan!'],
                [60, '👍 Bagus!', 'Pemahaman kamu sudah cukup solid. Review formula yang salah dan coba lagi.'],
                [40, '💪 Terus Belajar!', 'Masih ada yang perlu diperkuat. Baca penjelasan setiap formula dan latihan lagi.'],
                [0, '📚 Mari Mulai!', 'Jangan menyerah! Baca dulu materi di tab Belajar Formula, kemudian coba lagi.'],
            ];
            const [score, title, msg] = msgs.find(([s]) => pct >= s) || msgs[3];
            document.getElementById('resultTitle').textContent = title;
            document.getElementById('resultMsg').textContent = msg;
            setTimeout(() => {
                const ring = 314;
                document.getElementById('resultRing').setAttribute('stroke-dashoffset', ring * (1 - pct / 100));
            }, 200);
        }

        function retryQuiz() { startQuiz(); }
        function backToQuizStart() {
            document.getElementById('quizResult').classList.remove('active');
            document.getElementById('quizPlay').classList.remove('active');
            document.getElementById('quizStart').style.display = '';
        }

        // ════════════════════════════════════════════════════
        //  CHEAT SHEET
        // ════════════════════════════════════════════════════
        function renderCheatSheet() {
            const cats = [
                { key: 'lookup', label: '🔍 Lookup & Reference', color: '#4a7a9b' },
                { key: 'math', label: '➕ Math & Statistics', color: '#5a7a5a' },
                { key: 'text', label: '✍️ Text & String', color: '#7a5a9b' },
                { key: 'date', label: '📅 Date & Time', color: '#c97c2a' },
                { key: 'logic', label: '⚖️ Logic & Kondisi', color: '#b85c5c' },
                { key: 'info', label: 'ℹ️ Info & Error', color: '#4a7a9b' },
                { key: 'dynamic', label: '⚡ Dynamic Array', color: '#3a8a9b' },
            ];
            document.getElementById('csGrid').innerHTML = cats.map(c => {
                const fs = FORMULAS.filter(f => f.cat === c.key);
                const rows = fs.map(f => `<div class="cs-row"><span class="cs-fname">${f.name}</span><span class="cs-fdesc">${f.short}</span></div>`).join('');
                return `<div class="cs-block"><div class="cs-head" style="border-top:2px solid ${c.color}">${c.label}</div>${rows}</div>`;
            }).join('');
        }

        // ════════════════════════════════════════════════════
        //  TAB SWITCH
        // ════════════════════════════════════════════════════
        function switchTab(tab, btn) {
            currentTab = tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            ['formulas', 'practice', 'quiz', 'cheatsheet'].forEach(t => {
                document.getElementById('tab-' + t).style.display = t === tab ? '' : 'none';
            });
            if (tab === 'practice') renderPractice();
            if (tab === 'cheatsheet') renderCheatSheet();
        }

        // ════════════════════════════════════════════════════
        //  INIT
        // ════════════════════════════════════════════════════
        updateStats();
        renderFormulas();
