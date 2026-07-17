        // ════════════════════════════════════════════════════════════════
        //  DATA
        // ════════════════════════════════════════════════════════════════
        const TECH = [
            // ── DUPLICATE ──
            {
                id: 'remdup', cat: 'duplicate', icon: '🔁', iconBg: '#fdf0ee', iconColor: 'var(--coral)',
                name: 'Remove Duplicates', catLabel: 'Duplikat',
                short: 'Hapus baris yang sama persis atau duplikat di kolom tertentu',
                tags: ['essential'],
                tip: 'Selalu backup data sebelum Remove Duplicates — aksi ini tidak bisa di-undo setelah simpan!',
                before: { cols: ['ID', 'Nama', 'Dept'], rows: [['E001', 'Budi Santoso', 'IT'], ['E002', 'Sari Dewi', 'Finance'], ['E001', 'Budi Santoso', 'IT'], ['E003', 'Andi', 'Marketing'], ['E002', 'Sari Dewi', 'Finance']], bad: [2, 4] },
                after: { cols: ['ID', 'Nama', 'Dept'], rows: [['E001', 'Budi Santoso', 'IT'], ['E002', 'Sari Dewi', 'Finance'], ['E003', 'Andi', 'Marketing']], good: [] },
                steps: [{ n: 1, txt: 'Klik sel manapun dalam data', cmd: '' },
                { n: 2, txt: 'Data tab → klik', cmd: 'Remove Duplicates' },
                { n: 3, txt: 'Centang kolom yang menjadi dasar pengecekan duplikat', cmd: '' },
                { n: 4, txt: 'Klik OK — Excel otomatis hapus dan tampilkan ringkasan', cmd: '' }],
                shortcuts: ['Alt → A → M'],
                notes: 'Remove Duplicates bekerja berdasarkan kolom yang dipilih. Jika hanya centang kolom "Nama", dua baris dengan nama sama tapi ID berbeda tetap dianggap duplikat.',
                mistakes: ['Tidak memilih seluruh kolom sehingga hapus baris yang sebenarnya berbeda', 'Lupa backup data sebelum operasi', 'Tidak memeriksa hasil setelah operasi']
            },

            {
                id: 'condformat', cat: 'duplicate', icon: '🎨', iconBg: '#f0eeff', iconColor: 'var(--violet)',
                name: 'Highlight Duplicates (Conditional Formatting)', catLabel: 'Duplikat',
                short: 'Warnai baris duplikat tanpa menghapus — untuk identifikasi manual',
                tags: ['essential'],
                tip: 'Lebih aman dari Remove Duplicates langsung — kamu bisa review dulu sebelum hapus.',
                before: { cols: ['Produk', 'Kode', 'Stok'], rows: [['Laptop', 'LP-001', '50'], ['Monitor', 'MN-002', '30'], ['Laptop', 'LP-001', '50'], ['Keyboard', 'KB-003', '100']], bad: [2] },
                after: { cols: ['Produk', 'Kode', 'Stok'], rows: [['Laptop', 'LP-001', '50'], ['Monitor', 'MN-002', '30'], ['Laptop (dup)', 'LP-001', '50'], ['Keyboard', 'KB-003', '100']], good: [0, 2] },
                steps: [{ n: 1, txt: 'Pilih kolom yang ingin dicek (misal kolom ID)', cmd: '' },
                { n: 2, txt: 'Home → Conditional Formatting → Highlight Cell Rules', cmd: '' },
                { n: 3, txt: 'Pilih', cmd: 'Duplicate Values' },
                { n: 4, txt: 'Pilih warna highlight, klik OK', cmd: '' }],
                shortcuts: ['Alt → H → L → H'],
                notes: 'Conditional Formatting hanya MENANDAI, tidak menghapus. Setelah teridentifikasi, kamu bisa sort berdasarkan warna lalu hapus manual.',
                mistakes: ['Mengira highlight otomatis menghapus duplikat', 'Memilih seluruh tabel padahal sebaiknya hanya kolom key/ID']
            },

            {
                id: 'countif_dup', cat: 'duplicate', icon: '🔢', iconBg: '#e8f8f5', iconColor: 'var(--teal)',
                name: 'Deteksi Duplikat dengan COUNTIF', catLabel: 'Duplikat',
                short: 'Buat kolom helper untuk menghitung berapa kali nilai muncul',
                tags: ['formula'],
                tip: 'Berguna saat ingin tahu duplikat ke-berapa suatu nilai, bukan sekadar ada/tidak.',
                before: { cols: ['ID', 'Nama', 'Cek Dup'], rows: [['E001', 'Budi Santoso', '=COUNTIF($A:$A,A2)'], ['E002', 'Sari Dewi', '=COUNTIF($A:$A,A3)'], ['E001', 'Budi Santoso (dup)', '=COUNTIF($A:$A,A4)'], ['E003', 'Andi', '=COUNTIF($A:$A,A5)']], bad: [2] },
                after: { cols: ['ID', 'Nama', 'Jumlah Muncul'], rows: [['E001', 'Budi Santoso', '2'], ['E002', 'Sari Dewi', '1'], ['E001', 'Budi Santoso (dup)', '2'], ['E003', 'Andi', '1']], good: [] },
                steps: [{ n: 1, txt: 'Buat kolom baru di sebelah data, misal kolom C', cmd: '' },
                { n: 2, txt: 'Ketik formula di C2:', cmd: '=COUNTIF($A:$A,A2)' },
                { n: 3, txt: 'Copy formula ke bawah untuk semua baris', cmd: 'Ctrl+D' },
                { n: 4, txt: 'Filter kolom C dengan nilai > 1 untuk lihat duplikat', cmd: '' }],
                shortcuts: ['Ctrl+Shift+L (AutoFilter)'],
                notes: 'Dengan COUNTIF, angka > 1 berarti duplikat. Bisa juga gunakan =IF(COUNTIF($A$2:A2,A2)>1,"Duplikat","") untuk tandai mulai dari kejadian kedua.',
                mistakes: ['Tidak mengunci kolom dengan $ sehingga range bergeser saat di-copy']
            },

            // ── TEXT CLEANING ──
            {
                id: 'trim', cat: 'text', icon: '✂️', iconBg: '#e8f8f5', iconColor: 'var(--teal)',
                name: 'TRIM — Hapus Spasi Berlebih', catLabel: 'Teks',
                short: 'Hapus spasi di awal, akhir, dan ganda di tengah teks',
                tags: ['essential', 'formula'],
                tip: 'Spasi ekstra adalah penyebab VLOOKUP gagal yang paling sering! Selalu TRIM data sebelum lookup.',
                before: { cols: ['Nama Asli (Kotor)'], rows: [['  Budi  Santoso  '], [' Sari Dewi'], ['Andi   Pratama  '], [' Rini ']], bad: [0, 1, 2, 3] },
                after: { cols: ['Nama (Bersih)'], rows: [['Budi Santoso'], ['Sari Dewi'], ['Andi Pratama'], ['Rini']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Di kolom kosong, ketik formula:', cmd: '=TRIM(A2)' },
                { n: 2, txt: 'Copy formula ke semua baris yang perlu dibersihkan', cmd: '' },
                { n: 3, txt: 'Setelah selesai, Copy kolom hasil → Paste Special → Values ke kolom asli', cmd: 'Ctrl+Alt+V → V → Enter' },
                { n: 4, txt: 'Hapus kolom helper formula', cmd: '' }],
                shortcuts: ['Ctrl+D (fill down)', 'Ctrl+Alt+V (paste special)'],
                notes: 'TRIM tidak menghapus karakter non-breaking space (char 160). Untuk itu gunakan: =TRIM(SUBSTITUTE(A2,CHAR(160)," "))',
                mistakes: ['Lupa Paste Values sebelum menghapus kolom asli', 'TRIM di dalam formula lupa dibubuhkan jika data update']
            },

            {
                id: 'proper', cat: 'text', icon: '🔤', iconBg: '#e8f8f5', iconColor: 'var(--teal)',
                name: 'PROPER / UPPER / LOWER', catLabel: 'Teks',
                short: 'Standarisasi kapitalisasi teks agar konsisten',
                tags: ['essential', 'formula'],
                tip: 'Data dari berbagai sumber sering punya kapitalisasi berbeda. Standarisasi penting sebelum VLOOKUP atau GROUP BY.',
                before: { cols: ['Data Kasar'], rows: [['BUDI SANTOSO'], ['sari dewi'], ['aNdI pRaTaMa'], ['RINI SUSANTI']], bad: [0, 1, 2, 3] },
                after: { cols: ['Setelah PROPER'], rows: [['Budi Santoso'], ['Sari Dewi'], ['Andi Pratama'], ['Rini Susanti']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Untuk Title Case (Nama Depan Kapital):', cmd: '=PROPER(A2)' },
                { n: 2, txt: 'Untuk semua huruf kapital:', cmd: '=UPPER(A2)' },
                { n: 3, txt: 'Untuk semua huruf kecil:', cmd: '=LOWER(A2)' },
                { n: 4, txt: 'Kombinasi: bersihkan spasi DAN rapikan kapital:', cmd: '=TRIM(PROPER(A2))' }],
                shortcuts: [''],
                notes: 'PROPER mungkin tidak ideal untuk singkatan (PT, CV, dll) karena akan jadi "Pt", "Cv". Pertimbangkan ini untuk nama perusahaan.',
                mistakes: ['Pakai PROPER untuk data yang punya singkatan — hasilnya salah']
            },

            {
                id: 'substitute', cat: 'text', icon: '🔄', iconBg: '#f0eeff', iconColor: 'var(--violet)',
                name: 'SUBSTITUTE / Find & Replace', catLabel: 'Teks',
                short: 'Ganti karakter atau teks tertentu secara massal',
                tags: ['essential'],
                tip: 'Find & Replace (Ctrl+H) adalah cara tercepat untuk ganti teks tanpa formula. SUBSTITUTE lebih fleksibel untuk kondisi tertentu.',
                before: { cols: ['No. Telp (Kotor)'], rows: [['021-1234-5678'], ['0812.345.6789'], ['(021) 9876-5432'], ['62-813-4567-8901']], bad: [0, 1, 2, 3] },
                after: { cols: ['No. Telp (Bersih)'], rows: [['02112345678'], ['081234568789'], ['021987654032'], ['6281345678901']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Cara cepat: tekan', cmd: 'Ctrl+H' },
                { n: 2, txt: 'Di "Find what" ketik karakter yang ingin dihapus (misal "-"), "Replace with" kosongkan', cmd: '' },
                { n: 3, txt: 'Klik Replace All', cmd: '' },
                { n: 4, txt: 'Via formula:', cmd: '=SUBSTITUTE(A2,"-","")' }],
                shortcuts: ['Ctrl+H (Find & Replace)'],
                notes: 'SUBSTITUTE bisa handle beberapa karakter dengan cara bersarang: =SUBSTITUTE(SUBSTITUTE(A2,"-",""),".","") untuk hapus - dan . sekaligus.',
                mistakes: ['Replace tanpa sadar mengganti teks di tempat lain yang tidak diinginkan']
            },

            {
                id: 'textcol', cat: 'structure', icon: '📊', iconBg: '#e8f8f5', iconColor: 'var(--teal)',
                name: 'Text to Columns', catLabel: 'Struktur',
                short: 'Pisahkan satu kolom berisi beberapa nilai menjadi beberapa kolom',
                tags: ['essential'],
                tip: 'Data dari sistem lain sering digabung dalam satu sel dengan pemisah koma, titik koma, atau spasi. Text to Columns solusinya.',
                before: { cols: ['Data Gabung'], rows: [['Budi;IT;Jakarta'], ['Sari;Finance;Surabaya'], ['Andi;Marketing;Bandung'], ['Rini;HR;Medan']], bad: [0, 1, 2, 3] },
                after: { cols: ['Nama', 'Dept', 'Kota'], rows: [['Budi', 'IT', 'Jakarta'], ['Sari', 'Finance', 'Surabaya'], ['Andi', 'Marketing', 'Bandung'], ['Rini', 'HR', 'Medan']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Pilih kolom yang ingin dipisah', cmd: '' },
                { n: 2, txt: 'Data → Text to Columns', cmd: 'Alt → A → E' },
                { n: 3, txt: 'Pilih "Delimited" (pemisah karakter) atau "Fixed width"', cmd: '' },
                { n: 4, txt: 'Centang jenis pemisah (semicolon/comma/tab/space), klik Finish', cmd: '' }],
                shortcuts: ['Alt → A → E'],
                notes: 'Pastikan kolom di sebelah kanan cukup kosong — Text to Columns akan menimpa data di kolom sebelahnya!',
                mistakes: ['Tidak mengosongkan kolom sebelah kanan sebelum proses', 'Salah memilih delimiter sehingga hasil tidak sesuai']
            },

            {
                id: 'flashfill', cat: 'structure', icon: '⚡', iconBg: '#fdf4e6', iconColor: 'var(--amber)',
                name: 'Flash Fill', catLabel: 'Struktur',
                short: 'Excel belajar pola dari contohmu dan mengisi kolom otomatis',
                tags: ['essential'],
                tip: 'Flash Fill bekerja dengan mengenali pola dari 1-2 contoh yang kamu ketik. Semakin konsisten polanya, semakin akurat hasilnya.',
                before: { cols: ['Nama Lengkap', 'Nama Depan (contoh)'], rows: [['Budi Santoso', 'Budi ← ketik ini'], ['Sari Dewi', ''], ['Andi Pratama', ''], ['Rini Susanti', '']], bad: [] },
                after: { cols: ['Nama Lengkap', 'Nama Depan (hasil Flash Fill)'], rows: [['Budi Santoso', 'Budi'], ['Sari Dewi', 'Sari'], ['Andi Pratama', 'Andi'], ['Rini Susanti', 'Rini']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Di kolom sebelah data, ketik hasil yang diinginkan untuk baris pertama', cmd: '' },
                { n: 2, txt: 'Tekan Enter, lalu mulai ketik untuk baris kedua', cmd: '' },
                { n: 3, txt: 'Excel akan menampilkan preview abu-abu — tekan', cmd: 'Enter untuk terima' },
                { n: 4, txt: 'Atau tekan shortcut:', cmd: 'Ctrl+E' }],
                shortcuts: ['Ctrl+E (Flash Fill)'],
                notes: 'Flash Fill ideal untuk: ekstrak nama depan/belakang, format ulang tanggal, gabungkan teks dengan pola, reformatkan nomor telepon.',
                mistakes: ['Flash Fill tidak selalu 100% akurat untuk data tidak konsisten — selalu review hasilnya', 'Tidak bekerja jika pola terlalu kompleks atau tidak konsisten']
            },

            {
                id: 'concatfix', cat: 'structure', icon: '🔗', iconBg: '#f0eeff', iconColor: 'var(--violet)',
                name: 'Menggabungkan & Memisah Kolom', catLabel: 'Struktur',
                short: 'Teknik menggabung beberapa kolom atau memisah data dalam satu kolom',
                tags: ['formula'],
                tip: 'Selalu buat kolom hasil di kolom baru, jangan langsung timpa data asli!',
                before: { cols: ['Nama Depan', 'Nama Belakang'], rows: [['Budi', 'Santoso'], ['Sari', 'Dewi'], ['Andi', 'Pratama']], bad: [] },
                after: { cols: ['Nama Lengkap'], rows: [['Budi Santoso'], ['Sari Dewi'], ['Andi Pratama']], good: [0, 1, 2] },
                steps: [{ n: 1, txt: 'Gabung dengan operator &:', cmd: '=A2&" "&B2' },
                { n: 2, txt: 'Gabung dengan TEXTJOIN (lebih fleksibel):', cmd: '=TEXTJOIN(" ",TRUE,A2,B2)' },
                { n: 3, txt: 'Pisah: ambil kata pertama (nama depan):', cmd: '=LEFT(A2,FIND(" ",A2)-1)' },
                { n: 4, txt: 'Pisah: ambil setelah spasi (nama belakang):', cmd: '=MID(A2,FIND(" ",A2)+1,100)' }],
                shortcuts: [''],
                notes: 'Untuk data dengan jumlah kata bervariasi, Flash Fill sering lebih mudah daripada formula. Gunakan formula jika data akan terus bertambah.',
                mistakes: ['Formula FIND error jika tidak ada spasi — tambahkan IFERROR sebagai proteksi']
            },

            // ── MISSING DATA ──
            {
                id: 'findblank', cat: 'missing', icon: '🔦', iconBg: '#fdf4e6', iconColor: 'var(--amber)',
                name: 'Menemukan Sel Kosong', catLabel: 'Data Kosong',
                short: 'Identifikasi dan navigasi ke semua sel kosong dengan cepat',
                tags: ['essential'],
                tip: 'Go To Special adalah cara tercepat untuk seleksi semua sel kosong sekaligus — jauh lebih efisien dari scroll manual.',
                before: { cols: ['Nama', 'Dept', 'Email'], rows: [['Budi', 'IT', 'budi@co.id'], [' ', 'Finance', ''], ['Andi', '', 'andi@co.id'], ['Rini', 'HR', '']], bad: [1, 2, 3] },
                after: { cols: ['Nama', 'Dept', 'Email'], rows: [['Budi', 'IT', 'budi@co.id'], ['(KOSONG)', 'Finance', '(KOSONG)'], ['Andi', '(KOSONG)', 'andi@co.id'], ['Rini', 'HR', '(KOSONG)']], good: [] },
                steps: [{ n: 1, txt: 'Pilih range data, tekan', cmd: 'Ctrl+G → Special' },
                { n: 2, txt: 'Centang "Blanks", klik OK — semua sel kosong terseleksi', cmd: '' },
                { n: 3, txt: 'Isi massal: ketik teks/nilai, tekan', cmd: 'Ctrl+Enter' },
                { n: 4, txt: 'Via formula: =IF(ISBLANK(A2),"Tidak Ada",A2)', cmd: '' }],
                shortcuts: ['Ctrl+G → Special → Blanks', 'Ctrl+Enter (isi semua sel terseleksi)'],
                notes: 'Ctrl+Enter setelah memilih semua sel kosong akan mengisi SEMUA sel kosong yang terseleksi dengan nilai yang sama — sangat efisien.',
                mistakes: ['Sel yang tampak kosong mungkin berisi spasi atau karakter tidak terlihat — gunakan LEN(A2)=0 untuk cek benar-benar kosong']
            },

            {
                id: 'fillmiss', cat: 'missing', icon: '✏️', iconBg: '#e8f8f5', iconColor: 'var(--teal)',
                name: 'Mengisi Missing Values', catLabel: 'Data Kosong',
                short: 'Strategi mengisi data kosong: default, rata-rata, atau nilai sebelumnya',
                tags: ['essential', 'formula'],
                tip: 'Pilih strategi mengisi sesuai konteks: 0 untuk angka keuangan, rata-rata untuk analitik, nilai terakhir untuk data time series.',
                before: { cols: ['Bulan', 'Penjualan'], rows: [['Jan', '100'], ['Feb', ''], ['Mar', '120'], ['Apr', '']], bad: [1, 3] },
                after: { cols: ['Bulan', 'Penjualan'], rows: [['Jan', '100'], ['Feb', '110 (rata-rata)'], ['Mar', '120'], ['Apr', '0 (default)']], good: [1, 3] },
                steps: [{ n: 1, txt: 'Isi dengan nilai default (0 atau "N/A"):', cmd: 'Go To Special → Blanks → ketik 0 → Ctrl+Enter' },
                { n: 2, txt: 'Isi dengan rata-rata:', cmd: '=IF(ISBLANK(B2),AVERAGE($B$2:$B$10),B2)' },
                { n: 3, txt: 'Isi dengan nilai baris sebelumnya (fill down):', cmd: '=IF(B2="",B1,B2)' },
                { n: 4, txt: 'Hapus baris kosong: filter → pilih kosong → hapus baris', cmd: '' }],
                shortcuts: ['Alt+D+F+F (AutoFilter)'],
                notes: 'Untuk analitik, mendokumentasikan cara penanganan missing data sangat penting. Jangan ubah data tanpa mencatat perubahan yang dilakukan.',
                mistakes: ['Isi rata-rata tanpa mempertimbangkan outlier yang bisa mendistorsi nilai', 'Hapus baris kosong tanpa review — mungkin ada data penting di kolom lain']
            },

            {
                id: 'isblank_formula', cat: 'missing', icon: '📋', iconBg: '#f0eeff', iconColor: 'var(--violet)',
                name: 'ISBLANK / COUNTA untuk Audit', catLabel: 'Data Kosong',
                short: 'Formula untuk mengaudit kelengkapan data secara sistematis',
                tags: ['formula'],
                tip: 'Buat "data quality dashboard" kecil di bagian atas atau di sheet terpisah untuk monitor kelengkapan data.',
                before: { cols: ['ID', 'Nama', 'Email', 'Audit'], rows: [['E001', 'Budi', 'budi@co.id', '✅ Lengkap'], ['E002', 'Sari', '', '⚠️ Email kosong'], ['E003', '', 'andi@co.id', '⚠️ Nama kosong'], ['E004', '', '', '❌ 2 kosong']], bad: [1, 2, 3] },
                after: { cols: ['Ringkasan Audit'], rows: [['Total baris: 100'], ['Baris lengkap: 87'], ['Ada kosong: 13'], ['% kelengkapan: 87%']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Hitung sel kosong di kolom tertentu:', cmd: '=COUNTBLANK(B2:B100)' },
                { n: 2, txt: 'Hitung baris yang lengkap:', cmd: '=COUNTA(A2:A100)' },
                { n: 3, txt: 'Tandai baris yang ada kosong:', cmd: '=IF(COUNTBLANK(A2:E2)>0,"Tidak Lengkap","Lengkap")' },
                { n: 4, txt: 'Hitung % kelengkapan:', cmd: '=1-COUNTBLANK(A2:A100)/COUNTA(A2:A100)' }],
                shortcuts: [''],
                notes: 'Rutin lakukan audit data quality sebelum analisis. Data kotor = kesimpulan kotor (Garbage In, Garbage Out).',
                mistakes: ['Menganalisis data tanpa memeriksa kelengkapan terlebih dahulu']
            },

            // ── VALIDATION ──
            {
                id: 'dataval', cat: 'validation', icon: '🛡️', iconBg: '#fdf0ee', iconColor: 'var(--coral)',
                name: 'Data Validation', catLabel: 'Validasi',
                short: 'Batasi input agar hanya data yang valid bisa dimasukkan',
                tags: ['essential'],
                tip: 'Lebih baik mencegah data kotor masuk sejak awal daripada membersihkan nanti!',
                before: { cols: ['Dept (bebas)'], rows: [['IT'], ['it'], ['I.T'], ['Information Technology']], bad: [1, 2, 3] },
                after: { cols: ['Dept (dropdown)'], rows: [['IT'], ['Finance'], ['Marketing'], ['HR']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Pilih sel atau kolom yang ingin dibatasi', cmd: '' },
                { n: 2, txt: 'Data → Data Validation → Data Validation', cmd: 'Alt → A → V → V' },
                { n: 3, txt: 'Pilih jenis: List (dropdown), Whole Number, Date, dll', cmd: '' },
                { n: 4, txt: 'Masukkan sumber data atau kriteria, klik OK', cmd: '' }],
                shortcuts: ['Alt → A → V → V'],
                notes: 'Untuk dropdown yang panjang, buat list di sheet terpisah dan referensikan. Ini lebih mudah dikelola.',
                mistakes: ['Data validation hanya berlaku untuk input baru — data lama yang sudah salah tidak otomatis tervalidasi']
            },

            {
                id: 'spellcheck', cat: 'validation', icon: '🔍', iconBg: '#f0eeff', iconColor: 'var(--violet)',
                name: 'Cek Konsistensi & Nilai Unik', catLabel: 'Validasi',
                short: 'Identifikasi variasi penulisan yang seharusnya sama',
                tags: ['essential'],
                tip: 'Gunakan PivotTable atau UNIQUE untuk melihat semua nilai unik di satu kolom — cepat deteksi inkonsistensi.',
                before: { cols: ['Kota (Tidak Konsisten)'], rows: [['Jakarta'], ['jakarta'], ['JAKARTA'], ['Jkt'], ['Bandung'], ['bandung']], bad: [1, 2, 3, 5] },
                after: { cols: ['Kota (Konsisten)'], rows: [['Jakarta'], ['Jakarta'], ['Jakarta'], ['Jakarta'], ['Bandung'], ['Bandung']], good: [0, 1, 2, 3, 4, 5] },
                steps: [{ n: 1, txt: 'Buat PivotTable → seret kolom ke Rows untuk lihat semua nilai unik', cmd: 'Alt → N → V' },
                { n: 2, txt: 'Atau gunakan:', cmd: '=UNIQUE(A2:A100)' },
                { n: 3, txt: 'Review nilai yang mirip, gunakan Find & Replace untuk standarisasi', cmd: 'Ctrl+H' },
                { n: 4, txt: 'Terapkan PROPER atau UPPER untuk standarisasi kapitalisasi', cmd: '=PROPER(A2)' }],
                shortcuts: ['Alt → N → V (PivotTable)', 'Ctrl+H (Find & Replace)'],
                notes: 'Inkonsistensi kecil seperti spasi ekstra atau kapitalisasi berbeda membuat GROUP BY di pivot table tidak akurat.',
                mistakes: ['Langsung analisis tanpa cek nilai unik terlebih dahulu']
            },

            // ── FORMAT & TYPE ──
            {
                id: 'numformat', cat: 'format', icon: '🔢', iconBg: '#fdf4e6', iconColor: 'var(--amber)',
                name: 'Konversi Teks ke Angka', catLabel: 'Format',
                short: 'Data angka yang tersimpan sebagai teks tidak bisa dihitung — harus dikonversi',
                tags: ['essential'],
                tip: 'Tanda segitiga kecil hijau di pojok kiri sel adalah indikator angka tersimpan sebagai teks. Jangan abaikan ini!',
                before: { cols: ['Penjualan (sebagai teks)'], rows: [['"1000"'], ['"2500"'], ['"750"'], ['"3200"']], bad: [0, 1, 2, 3] },
                after: { cols: ['Penjualan (angka)'], rows: [['1000'], ['2500'], ['750'], ['3200']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Klik tanda seru kuning di sel → Convert to Number', cmd: '' },
                { n: 2, txt: 'Atau paste angka 1 di sel kosong, copy, pilih sel bermasalah → Paste Special → Multiply', cmd: 'Ctrl+Alt+V → M' },
                { n: 3, txt: 'Via formula:', cmd: '=VALUE(A2)  atau  =A2*1' },
                { n: 4, txt: 'Untuk tanggal teks ke serial date:', cmd: '=DATEVALUE(A2)' }],
                shortcuts: ['Ctrl+Alt+V → M (Paste Special Multiply)'],
                notes: 'SUM dari angka-sebagai-teks = 0. COUNTIFS tidak menghitung dengan benar. Ini sumber error yang sangat umum di dunia kerja.',
                mistakes: ['Mengabaikan segitiga hijau dan langsung membuat SUM yang hasilnya 0', 'Menggunakan formula =VALUE tanpa Paste Values setelahnya jika kolom asli dihapus']
            },

            {
                id: 'datefix', cat: 'format', icon: '📅', iconBg: '#e8f8f5', iconColor: 'var(--teal)',
                name: 'Standarisasi Format Tanggal', catLabel: 'Format',
                short: 'Tanggal dari sistem berbeda sering punya format tidak konsisten — wajib distandardisasi',
                tags: ['essential'],
                tip: 'Excel menyimpan tanggal sebagai angka serial. Jika tampil sebagai angka besar (misal 45000), berarti format sel harus diubah ke Date.',
                before: { cols: ['Tanggal (Tidak Konsisten)'], rows: [['01/04/2024'], ['2024-04-01'], ['April 1, 2024'], ['1-Apr-24']], bad: [1, 2, 3] },
                after: { cols: ['Tanggal (Standar)'], rows: [['01/04/2024'], ['01/04/2024'], ['01/04/2024'], ['01/04/2024']], good: [0, 1, 2, 3] },
                steps: [{ n: 1, txt: 'Untuk teks tanggal: gunakan', cmd: '=DATEVALUE(A2)' },
                { n: 2, txt: 'Format ulang dengan Ctrl+1 → Date → pilih format standar', cmd: 'Ctrl+1' },
                { n: 3, txt: 'Untuk format ISO (YYYY-MM-DD): gunakan Text to Columns dengan delimiter "-"', cmd: '' },
                { n: 4, txt: 'Cek apakah tanggal valid:', cmd: '=ISNUMBER(A2)  (harus TRUE)' }],
                shortcuts: ['Ctrl+1 (Format Cells)', 'Ctrl+Shift+# (format Date cepat)'],
                notes: 'Hati-hati dengan ambiguitas: 01/04 bisa 1 April atau 4 Januari tergantung regional setting. Komunikasikan format standar dengan tim.',
                mistakes: ['Asumsi format tanggal tanpa verifikasi regional setting', 'Tidak cek apakah Excel menginterpretasi tanggal dengan benar setelah konversi']
            },
        ];

        // QUIZ DATA
        const QUIZ = [
            {
                cat: 'duplicate', q: 'Apa risiko utama menggunakan Remove Duplicates langsung?', ctx: '',
                opts: ['Excel menjadi lambat', 'Data yang dihapus tidak bisa dikembalikan (irreversible)', 'Hanya menghapus 10 duplikat pertama', 'Tidak bisa digunakan di Excel versi lama'], ans: 1,
                exp: 'Remove Duplicates permanen dan tidak bisa di-undo setelah file disimpan. Selalu buat backup atau gunakan Conditional Formatting untuk review terlebih dahulu.'
            },
            {
                cat: 'text', q: 'TRIM("  Budi  Santoso  ") menghasilkan...', ctx: '',
                opts: ['"  Budi  Santoso  " (tidak berubah)', 'Error karena ada spasi', 'Budi Santoso (spasi ekstra dihapus)', 'BudiSantoso (semua spasi dihapus)'], ans: 2,
                exp: 'TRIM menghapus spasi di awal, akhir, dan mengurangi spasi ganda di tengah menjadi satu. Hasilnya "Budi Santoso" dengan tepat satu spasi di tengah.'
            },
            {
                cat: 'text', q: 'Manakah formula yang BENAR untuk membersihkan teks: hapus spasi DAN ubah ke Title Case?', ctx: '',
                opts: ['=UPPER(TRIM(A2))', '=TRIM(PROPER(A2))', '=PROPER+TRIM(A2)', '=CLEAN(UPPER(A2))'], ans: 1,
                exp: '=TRIM(PROPER(A2)) — PROPER mengubah ke Title Case, TRIM menghapus spasi berlebih. Urutan PROPER di dalam TRIM atau sebaliknya tidak terlalu berpengaruh untuk kasus ini.'
            },
            {
                cat: 'duplicate', q: 'Formula =COUNTIF($A:$A,A2) menunjukkan angka 3 untuk suatu baris. Artinya?', ctx: 'Kolom A berisi ID karyawan',
                opts: ['Ada 3 karyawan di tabel', 'ID tersebut muncul 3 kali — ini duplikat', 'Baris ke-3 dari atas', 'Formula salah dan harus diperbaiki'], ans: 1,
                exp: 'COUNTIF menghitung berapa kali nilai A2 muncul di seluruh kolom A. Angka 3 berarti ada 3 baris dengan ID yang sama — 2 di antaranya adalah duplikat.'
            },
            {
                cat: 'missing', q: 'Cara paling efisien untuk mengisi SEMUA sel kosong dalam suatu range dengan nilai "N/A" sekaligus adalah?', ctx: '',
                opts: ['Klik satu per satu dan ketik N/A', 'Ctrl+G → Special → Blanks → ketik N/A → Ctrl+Enter', '=IF(ISBLANK(A2),"N/A",A2) di setiap baris', 'AutoFill dari sel yang sudah berisi N/A'], ans: 1,
                exp: 'Ctrl+G → Special → Blanks memilih semua sel kosong sekaligus. Setelah itu ketik nilai dan tekan Ctrl+Enter untuk mengisi semua sel kosong yang terseleksi.'
            },
            {
                cat: 'missing', q: '=COUNTBLANK(B2:B100) mengembalikan nilai 15. Artinya?', ctx: '',
                opts: ['Ada 15 baris data', 'Ada 15 sel yang berisi angka 0', 'Ada 15 sel kosong di range B2:B100', 'Formula error'], ans: 2,
                exp: 'COUNTBLANK menghitung jumlah sel kosong dalam range. Nilai 15 berarti ada 15 sel yang tidak berisi data di kolom B baris 2-100.'
            },
            {
                cat: 'text', q: 'Shortcut keyboard untuk Flash Fill adalah?', ctx: '',
                opts: ['Ctrl+F', 'Ctrl+E', 'Alt+F', 'Ctrl+Shift+E'], ans: 1,
                exp: 'Ctrl+E adalah shortcut Flash Fill. Cukup ketik contoh di sel pertama, lalu tekan Ctrl+E untuk Excel otomatis mengisi pola untuk seluruh kolom.'
            },
            {
                cat: 'duplicate', q: 'Saat menggunakan Text to Columns, hal yang WAJIB dilakukan sebelumnya adalah?', ctx: '',
                opts: ['Backup file', 'Pastikan kolom di sebelah kanan cukup kosong', 'Urutkan data A-Z terlebih dahulu', 'Aktifkan AutoSave'], ans: 1,
                exp: 'Text to Columns akan menimpa data di kolom sebelah kanan. Jika ada data di sana, data tersebut akan hilang. Selalu kosongkan kolom yang cukup sebelumnya.'
            },
            {
                cat: 'missing', q: 'Manakah yang BENAR tentang angka yang tersimpan sebagai teks di Excel?', ctx: '',
                opts: ['SUM tetap berfungsi dengan benar', 'Ditandai dengan segitiga kecil di pojok kiri atas sel', 'Bisa langsung dipakai dalam kalkulasi', 'Tidak ada bedanya dengan angka biasa'], ans: 1,
                exp: 'Excel menandai angka-sebagai-teks dengan segitiga hijau kecil di pojok kiri atas sel. SUM dan formula lain akan menghasilkan 0 atau error karena tidak mengenali sebagai angka.'
            },
            {
                cat: 'text', q: 'Fungsi SUBSTITUTE("021-1234-5678", "-", "") menghasilkan?', ctx: '',
                opts: ['021-1234-5678 (tidak berubah)', '02112345678', 'Error', '021 1234 5678'], ans: 1,
                exp: 'SUBSTITUTE mengganti semua kemunculan "-" dengan "" (kosong/hapus). Hasilnya "02112345678" — semua tanda hubung dihapus.'
            },
        ];

        // ════════════════════════════════════════════════════════════════
        //  STATE
        // ════════════════════════════════════════════════════════════════
        let done = JSON.parse(localStorage.getItem('xdc_done') || '[]');
        let curFilter = 'all', curSearch = '', curTab = 'learn';
        let openExpand = null;
        let quizCatSel = 'all', quizQs = [], quizIdx = 0, quizScore = 0;

        // ════════════════════════════════════════════════════════════════
        //  RENDER TECHNIQUES
        // ════════════════════════════════════════════════════════════════
        function tagHtml(tags) {
            return tags.map(t => {
                const m = { essential: 'tag-essential', manual: 'tag-manual', formula: 'tag-formula', advanced: 'tag-advanced' };
                const l = { essential: '🔥 Wajib', manual: '🖱️ Manual', formula: '📐 Formula', advanced: '🎓 Mahir' };
                return `<span class="tc-tag ${m[t] || 'tag-advanced'}">${l[t] || t}</span>`;
            }).join('');
        }

        function miniSS(data) {
            if (!data) return '';
            const hd = data.cols.map(c => `<div class="ss-cell-hd">${c}</div>`).join('');
            const rows = data.rows.map((r, i) => {
                const isBad = data.bad && data.bad.includes(i);
                const isGood = data.good && data.good.includes(i);
                const cls = isBad ? 'hl-bad' : isGood ? 'hl-good' : '';
                const cells = r.map((c, ci) => {
                    let cc = '';
                    if (isBad) cc = 'bad';
                    if (isGood) cc = 'good';
                    return `<div class="ss-cell ${cc}">${c}</div>`;
                }).join('');
                return `<div class="ss-row ${cls}"><div class="ss-num">${i + 1}</div>${cells}</div>`;
            }).join('');
            return `<div class="mini-ss-wrap"><div class="mini-ss"><div class="ss-header"><div class="ss-num">&nbsp;</div>${hd}</div>${rows}</div></div>`;
        }

        function stepHtml(steps) {
            const colors = ['#2a8a7e', '#4a7a9b', '#c4882a', '#6a5acd'];
            return steps.map((s, i) => {
                return `<div class="step-row">
      <div class="step-n" style="background:${colors[i % 4]}1a;color:${colors[i % 4]}">${s.n}</div>
      <div class="step-txt">${s.txt}${s.cmd ? `<div class="step-cmd">${s.cmd}</div>` : ''}</div>
    </div>`;
            }).join('');
        }

        function getFiltered() {
            return TECH.filter(t => {
                const mc = curFilter === 'all' ? true : curFilter === 'done' ? done.includes(t.id) : curFilter === 'essential' ? t.tags.includes('essential') : t.cat === curFilter;
                const s = curSearch.toLowerCase();
                return mc && (!s || t.name.toLowerCase().includes(s) || t.short.toLowerCase().includes(s) || t.catLabel.toLowerCase().includes(s));
            });
        }

        function renderTechs() {
            const list = getFiltered();
            const grid = document.getElementById('techGrid');
            if (!list.length) {
                grid.innerHTML = `<div style="text-align:center;padding:60px 20px;grid-column:1/-1;color:var(--text-dim)"><div style="font-size:40px;margin-bottom:12px">🔍</div><h3 style="font-family:var(--display);font-size:18px;margin-bottom:6px;color:var(--text-mid)">Tidak ditemukan</h3><p style="font-size:13px">Coba kata kunci lain</p></div>`;
                return;
            }
            grid.innerHTML = list.map((t, i) => {
                const isDone = done.includes(t.id);
                const shCuts = t.shortcuts.filter(Boolean).map(s => `<span class="shortcut-pill">${s}</span>`).join('');
                const mistakes = t.mistakes.map(m => `<div class="common-mistake"><strong>❌ Jangan:</strong> ${m}</div>`).join('');
                return `<div class="tc ${isDone ? 'done' : ''}" id="tc-${t.id}" style="animation-delay:${Math.min(i * .04, .4)}s">
      <div class="tc-head">
        <div class="tc-icon-wrap" style="background:${t.iconBg};color:${t.iconColor}">${t.icon}</div>
        <div style="flex:1">
          <div class="tc-name">${t.name}</div>
          <div class="tc-cat" style="color:${t.iconColor}">${t.catLabel}</div>
          <div class="tc-short">${t.short}</div>
        </div>
        <div class="done-badge">✅</div>
      </div>
      <div class="tc-body">
        <div class="ba-wrap">
          <div class="ba-col"><div class="ba-label before">Sebelum</div>${miniSS(t.before)}</div>
          <div class="ba-arr">→</div>
          <div class="ba-col"><div class="ba-label after">Sesudah</div>${miniSS(t.after)}</div>
        </div>
        <div class="tc-steps">${stepHtml(t.steps)}</div>
        <div class="tc-tip">💡 <span>${t.tip}</span></div>
        <div class="tc-tags">${tagHtml(t.tags)}</div>
        <button class="done-btn" onclick="toggleDone('${t.id}')">${isDone ? '✅ Sudah Dikuasai' : '📌 Tandai Sudah Paham'}</button>
      </div>
      <div class="tc-expand" id="exp-wrap-${t.id}">
        <button class="expand-btn" id="exp-btn-${t.id}" onclick="toggleExpand('${t.id}',this)">▼ Detail: Shortcut, Catatan & Kesalahan Umum</button>
        <div class="expand-panel" id="exp-${t.id}">
          ${shCuts ? `<div class="ep-section"><div class="ep-title">⌨️ Shortcut</div><div>${shCuts}</div></div>` : ''}
          <div class="ep-section"><div class="ep-title">📝 Catatan Penting</div><div class="ep-note">${t.notes}</div></div>
          <div class="ep-section"><div class="ep-title">⚠️ Kesalahan Umum</div>${mistakes}</div>
        </div>
      </div>
    </div>`;
            }).join('');
        }

        function toggleExpand(id, btn) {
            const panel = document.getElementById('exp-' + id);
            const isOpen = panel.classList.contains('open');
            if (openExpand && openExpand !== id) {
                document.getElementById('exp-' + openExpand)?.classList.remove('open');
                const ob = document.getElementById('exp-btn-' + openExpand);
                if (ob) ob.textContent = '▼ Detail: Shortcut, Catatan & Kesalahan Umum';
            }
            panel.classList.toggle('open');
            openExpand = isOpen ? null : id;
            btn.textContent = panel.classList.contains('open') ? '▲ Sembunyikan Detail' : '▼ Detail: Shortcut, Catatan & Kesalahan Umum';
        }

        function toggleDone(id) {
            done = done.includes(id) ? done.filter(x => x !== id) : [...done, id];
            localStorage.setItem('xdc_done', JSON.stringify(done));
            updateStats();
            const card = document.getElementById('tc-' + id);
            if (card) {
                card.classList.toggle('done');
                const btn = card.querySelector('.done-btn');
                btn.textContent = done.includes(id) ? '✅ Sudah Dikuasai' : '📌 Tandai Sudah Paham';
            }
        }

        function setFilter(cat, btn) {
            curFilter = cat;
            document.querySelectorAll('.sb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const titles = {
                all: '🗂️ Semua Teknik', duplicate: '🔁 Data Duplikat', text: '✍️ Pembersihan Teks',
                structure: '📐 Struktur Data', missing: '❓ Data Kosong', validation: '✅ Validasi Data',
                format: '🎨 Format & Tipe Data', done: '✅ Sudah Dikuasai', essential: '🔥 Wajib Tahu'
            };
            document.getElementById('sectionTitle').textContent = titles[cat] || cat;
            if (curTab === 'learn') renderTechs();
        }

        function doSearch(v) {
            curSearch = v;
            if (curTab === 'learn') renderTechs();
        }

        function updateStats() {
            const total = TECH.length;
            const d = done.length;
            document.getElementById('doneCount').textContent = d;
            document.getElementById('totalCount').textContent = total;
            const pct = total ? Math.round(d / total * 100) : 0;
            document.getElementById('progFill').style.width = pct + '%';
            document.getElementById('progPct').textContent = pct + '%';
            // sidebar counts
            document.getElementById('sc-all').textContent = total;
            ['duplicate', 'text', 'structure', 'missing', 'validation', 'format'].forEach(c => {
                const el = document.getElementById('sc-' + c);
                if (el) el.textContent = TECH.filter(t => t.cat === c).length;
            });
            document.getElementById('sc-done').textContent = d;
            document.getElementById('sc-essential').textContent = TECH.filter(t => t.tags.includes('essential')).length;
        }

        // ════════════════════════════════════════════════════════════════
        //  INTERACTIVE DEMOS
        // ════════════════════════════════════════════════════════════════
        const dupData = [
            { id: 'E001', name: 'Budi Santoso', dept: 'IT' },
            { id: 'E002', name: 'Sari Dewi', dept: 'Finance' },
            { id: 'E001', name: 'Budi Santoso', dept: 'IT' },
            { id: 'E003', name: 'Andi Pratama', dept: 'Marketing' },
            { id: 'E002', name: 'Sari Dewi', dept: 'Finance' },
            { id: 'E004', name: 'Rini Susanti', dept: 'HR' },
        ];

        function renderDupTable(state) {
            const ids = [...new Map(dupData.map(r => [r.id, r])).values()].map(r => r.id);
            const dupcounts = {};
            dupData.forEach(r => dupcounts[r.id] = (dupcounts[r.id] || 0) + 1);
            let html = `<table class="te-table"><thead><tr><th>#</th><th>ID</th><th>Nama</th><th>Departemen</th><th>Status</th></tr></thead><tbody>`;
            let seen = {};
            dupData.forEach((r, i) => {
                let cls = '', status = '';
                if (state >= 1 && dupcounts[r.id] > 1) {
                    if (!seen[r.id]) { seen[r.id] = true; cls = 'first-dup'; status = '⚠️ Duplikat'; }
                    else { cls = 'dup-row'; status = '🔁 Duplikat ke-2'; }
                }
                if (state >= 2 && dupcounts[r.id] > 1 && seen[r.id] && cls !== 'first-dup') { cls = 'removed-row'; status = '❌ Dihapus'; }
                html += `<tr class="${cls}"><td>${i + 1}</td><td class="${cls === 'dup-row' || cls === 'first-dup' ? 'bad' : cls === 'clean-row' ? 'fixed' : ''}">${r.id}</td><td>${r.name}</td><td>${r.dept}</td><td>${status || '✅ Unik'}</td></tr>`;
            });
            html += '</tbody></table>';
            document.getElementById('demoDupTable').innerHTML = html;
        }

        function stepSI(id, step) {
            document.querySelectorAll('#' + id + ' .si-step').forEach((s, i) => {
                s.className = 'si-step' + (i < step ? ' done' : i === step ? ' active' : '');
            });
        }

        let dupState = 0;
        function demoDup(s) {
            dupState = s;
            renderDupTable(s);
            stepSI('siDup', s);
            document.getElementById('btnMarkDup').disabled = s >= 1;
            document.getElementById('btnRemDup').disabled = s < 1 || s >= 2;
            const res = document.getElementById('resDup');
            if (s === 1) { res.className = 'demo-result show info'; res.innerHTML = '🔍 <strong>3 duplikat ditemukan</strong> — baris berwarna kuning adalah kemunculan pertama, baris orange adalah duplikat yang akan dihapus.'; }
            else if (s === 2) { res.className = 'demo-result show success'; res.innerHTML = '✅ <strong>2 baris duplikat dihapus!</strong> Tersisa 4 baris unik dari 6 baris sebelumnya. ID E001 dan E002 hanya muncul sekali.'; }
            else { res.className = 'demo-result'; }
        }

        const textRawData = [
            { name: '  budi SANTOSO  ', email: 'BUDI@CO.ID' },
            { name: ' sari dewi', email: 'sari@co.id  ' },
            { name: 'ANDI   pratama  ', email: '  ANDI@CO.ID' },
            { name: '  rini susanti', email: 'RINI@co.id' },
        ];

        function renderTextTable(state) {
            let html = `<table class="te-table"><thead><tr><th>#</th><th>Nama</th><th>Email</th></tr></thead><tbody>`;
            textRawData.forEach((r, i) => {
                let name = r.name, email = r.email, nc = 'bad', ec = 'bad';
                if (state >= 1) { name = name.trim().replace(/\s+/g, ' '); email = email.trim(); nc = ''; ec = ''; }
                if (state >= 2) { name = name.split(' ').map(w => w[0].toUpperCase() + w.slice(1).toLowerCase()).join(' '); email = email.toLowerCase(); nc = 'fixed'; ec = 'fixed'; }
                html += `<tr><td>${i + 1}</td><td class="${nc}">${name}</td><td class="${ec}">${email}</td></tr>`;
            });
            html += '</tbody></table>';
            document.getElementById('demoTextTable').innerHTML = html;
        }

        let textState = 0;
        function demoText(s) {
            textState = s;
            renderTextTable(s);
            stepSI('siText', s);
            document.getElementById('btnTrim').disabled = s >= 1;
            document.getElementById('btnProper').disabled = s < 1 || s >= 2;
            const res = document.getElementById('resText');
            if (s === 1) { res.className = 'demo-result show info'; res.innerHTML = '🧹 <strong>TRIM diterapkan!</strong> Spasi di awal, akhir, dan spasi ganda di tengah sudah dihapus.'; }
            else if (s === 2) { res.className = 'demo-result show success'; res.innerHTML = '✅ <strong>PROPER + LOWER diterapkan!</strong> Nama sekarang Title Case, email jadi huruf kecil. Data siap digunakan.'; }
            else { res.className = 'demo-result'; }
        }

        const missData = [
            { nama: 'Budi Santoso', dept: 'IT', email: 'budi@co.id' },
            { nama: 'Sari Dewi', dept: '', email: 'sari@co.id' },
            { nama: 'Andi Pratama', dept: 'Marketing', email: '' },
            { nama: '', dept: 'HR', email: 'rini@co.id' },
            { nama: 'Deni Kurnia', dept: '', email: '' },
        ];

        function renderMissTable(state) {
            let html = `<table class="te-table"><thead><tr><th>#</th><th>Nama</th><th>Departemen</th><th>Email</th></tr></thead><tbody>`;
            missData.forEach((r, i) => {
                const isEmpty = r.nama === '' || r.dept === '' || r.email === '';
                let cls = isEmpty && state >= 1 ? 'hl-empty' : '';
                const nc = r.nama === '' && state >= 2 ? 'fixed' : r.nama === '' ? 'bad' : '';
                const dc = r.dept === '' && state >= 2 ? 'fixed' : r.dept === '' ? 'bad' : '';
                const ec = r.email === '' && state >= 2 ? 'fixed' : r.email === '' ? 'bad' : '';
                const nd = r.nama || state < 2 ? r.nama : 'N/A';
                const dd = r.dept || state < 2 ? r.dept : 'N/A';
                const ed = r.email || state < 2 ? r.email : 'N/A';
                html += `<tr class="${cls}"><td>${i + 1}</td><td class="${nc}">${nd || '(kosong)'}</td><td class="${dc}">${dd || '(kosong)'}</td><td class="${ec}">${ed || '(kosong)'}</td></tr>`;
            });
            html += '</tbody></table>';
            document.getElementById('demoMissTable').innerHTML = html;
        }

        let missState = 0;
        function demoMiss(s) {
            missState = s;
            renderMissTable(s);
            stepSI('siMiss', s);
            document.getElementById('btnHighMiss').disabled = s >= 1;
            document.getElementById('btnFillMiss').disabled = s < 1 || s >= 2;
            const res = document.getElementById('resMiss');
            if (s === 1) { res.className = 'demo-result show info'; res.innerHTML = '🔦 <strong>7 sel kosong ditemukan</strong> di 4 baris berbeda. Baris dengan sel kosong di-highlight agar mudah diidentifikasi.'; }
            else if (s === 2) { res.className = 'demo-result show success'; res.innerHTML = '✅ <strong>Semua sel kosong diisi "N/A"!</strong> Data kini lengkap dan konsisten. Formula COUNTBLANK sekarang mengembalikan 0.'; }
            else { res.className = 'demo-result'; }
        }

        const flashRaw = [
            { full: 'Budi Santoso', first: '', last: '' },
            { full: 'Sari Dewi', first: '', last: '' },
            { full: 'Andi Pratama', first: '', last: '' },
            { full: 'Rini Susanti', first: '', last: '' },
            { full: 'Deni Kurnia', first: '', last: '' },
        ];

        function initDemoFlash() {
            let html = `<table class="te-table"><thead><tr><th>#</th><th>Nama Lengkap</th><th>Nama Depan (contoh: "Budi")</th><th>Nama Belakang (contoh: "Santoso")</th></tr></thead><tbody>`;
            flashRaw.forEach((r, i) => {
                html += `<tr><td>${i + 1}</td><td>${r.full}</td><td class="${i === 0 ? 'bad' : ''}">${i === 0 ? 'Budi ← ketik ini' : ''}</td><td class="${i === 0 ? 'bad' : ''}">${i === 0 ? 'Santoso ← ketik ini' : ''}</td></tr>`;
            });
            html += '</tbody></table>';
            document.getElementById('demoFlashTable').innerHTML = html;
            document.getElementById('resFlash').className = 'demo-result';
        }

        function demoFlash() {
            const data = flashRaw.map(r => ({ ...r, first: r.full.split(' ')[0], last: r.full.split(' ').slice(1).join(' ') }));
            let html = `<table class="te-table"><thead><tr><th>#</th><th>Nama Lengkap</th><th>Nama Depan</th><th>Nama Belakang</th></tr></thead><tbody>`;
            data.forEach((r, i) => { html += `<tr class="clean-row"><td>${i + 1}</td><td>${r.full}</td><td class="fixed">${r.first}</td><td class="fixed">${r.last}</td></tr>`; });
            html += '</tbody></table>';
            document.getElementById('demoFlashTable').innerHTML = html;
            const res = document.getElementById('resFlash');
            res.className = 'demo-result show success';
            res.innerHTML = '⚡ <strong>Flash Fill berhasil!</strong> Excel mendeteksi pola dari contoh baris pertama dan otomatis mengisi seluruh kolom. Shortcut: Ctrl+E';
        }

        // ════════════════════════════════════════════════════════════════
        //  QUIZ
        // ════════════════════════════════════════════════════════════════
        function selQCat(cat, el) {
            quizCatSel = cat;
            document.querySelectorAll('.qcat').forEach(c => c.classList.remove('sel'));
            el.classList.add('sel');
        }

        function shuffle(a) { return [...a].sort(() => Math.random() - .5); }

        function startQuiz() {
            const pool = quizCatSel === 'all' ? QUIZ : QUIZ.filter(q => q.cat === quizCatSel);
            quizQs = shuffle(pool).slice(0, 10);
            quizIdx = 0; quizScore = 0;
            document.getElementById('quizStart').style.display = 'none';
            document.getElementById('qresult').classList.remove('on');
            document.getElementById('qplay').classList.add('on');
            renderQ();
        }

        function renderQ() {
            if (quizIdx >= quizQs.length) { showResult(); return; }
            const q = quizQs[quizIdx];
            const pct = (quizIdx + 1) / quizQs.length * 100;
            document.getElementById('qpLbl').textContent = `${quizIdx + 1}/${quizQs.length}`;
            document.getElementById('qpFill').style.width = pct + '%';
            document.getElementById('qpScore').textContent = quizScore;
            document.getElementById('qpQ').textContent = q.q;
            const ctx = document.getElementById('qpCtx');
            if (q.ctx) { ctx.textContent = q.ctx; ctx.style.display = 'block'; } else ctx.style.display = 'none';
            const letters = ['A', 'B', 'C', 'D'];
            document.getElementById('qpOpts').innerHTML = q.opts.map((o, i) => `<button class="qopt" onclick="ansQ(${i})"><span class="qopt-l">${letters[i]}</span>${o}</button>`).join('');
            document.getElementById('qpExp').className = 'qexp';
            document.getElementById('qpNext').className = 'qnext';
        }

        function ansQ(i) {
            const q = quizQs[quizIdx];
            document.querySelectorAll('.qopt').forEach(b => b.disabled = true);
            document.querySelectorAll('.qopt')[i].classList.add(i === q.ans ? 'correct' : 'wrong');
            if (i !== q.ans) document.querySelectorAll('.qopt')[q.ans].classList.add('correct');
            if (i === q.ans) quizScore++;
            document.getElementById('qpScore').textContent = quizScore;
            document.getElementById('qpExp').innerHTML = '💡 ' + q.exp;
            document.getElementById('qpExp').className = 'qexp show';
            const nb = document.getElementById('qpNext');
            nb.className = 'qnext show';
            nb.textContent = quizIdx + 1 >= quizQs.length ? 'Lihat Hasil →' : 'Soal Berikutnya →';
        }

        function nextQ() { quizIdx++; renderQ(); }

        function showResult() {
            document.getElementById('qplay').classList.remove('on');
            const res = document.getElementById('qresult');
            res.classList.add('on');
            const pct = Math.round(quizScore / quizQs.length * 100);
            document.getElementById('qrPct').textContent = pct + '%';
            document.getElementById('qrC').textContent = quizScore;
            document.getElementById('qrW').textContent = quizQs.length - quizScore;
            document.getElementById('qrT').textContent = quizQs.length;
            const msgs = [[80, '🎉 Luar Biasa!', 'Pemahaman data cleaning kamu sudah sangat baik! Kamu siap untuk kerja sebagai analis.'], [60, '👍 Bagus!', 'Solid! Review topik yang masih salah dan coba lagi untuk hasil sempurna.'], [40, '💪 Terus Semangat!', 'Masih ada yang perlu dipelajari. Baca ulang materi dan latihan lagi.'], [0, '📚 Mulai dari Awal!', 'Jangan menyerah! Baca dulu materi di tab Belajar, kemudian quiz lagi.']];
            const [, title, msg] = msgs.find(([s]) => pct >= s) || msgs[3];
            document.getElementById('qrTitle').textContent = title;
            document.getElementById('qrMsg').textContent = msg;
            setTimeout(() => document.getElementById('qrRing').setAttribute('stroke-dashoffset', 314 * (1 - pct / 100)), 200);
        }

        function backQStart() {
            document.getElementById('qresult').classList.remove('on');
            document.getElementById('qplay').classList.remove('on');
            document.getElementById('quizStart').style.display = '';
        }

        // ════════════════════════════════════════════════════════════════
        //  CHEAT SHEET
        // ════════════════════════════════════════════════════════════════
        function renderCS() {
            const cats = [
                { key: 'duplicate', label: '🔁 Data Duplikat', color: 'var(--coral)' },
                { key: 'text', label: '✍️ Pembersihan Teks', color: 'var(--teal)' },
                { key: 'structure', label: '📐 Struktur Data', color: 'var(--violet)' },
                { key: 'missing', label: '❓ Data Kosong', color: 'var(--amber)' },
                { key: 'validation', label: '✅ Validasi', color: 'var(--navy)' },
                { key: 'format', label: '🎨 Format & Tipe', color: 'var(--slate)' },
            ];
            document.getElementById('csGrid').innerHTML = cats.map(c => {
                const list = TECH.filter(t => t.cat === c.key);
                return `<div class="cs-block"><div class="cs-hd" style="border-top:2px solid ${c.color}">${c.label}</div>
      ${list.map(t => `<div class="cs-row"><span class="cs-name">${t.name}</span><span class="cs-desc">${t.short.substring(0, 45)}...</span></div>`).join('')}
    </div>`;
            }).join('');
        }

        // ════════════════════════════════════════════════════════════════
        //  TAB SWITCH
        // ════════════════════════════════════════════════════════════════
        function switchTab(tab, btn) {
            curTab = tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            ['learn', 'demo', 'quiz', 'cheatsheet'].forEach(t => document.getElementById('tab-' + t).style.display = t === tab ? '' : 'none');
            if (tab === 'cheatsheet') renderCS();
        }

        // ════════════════════════════════════════════════════════════════
        //  INIT
        // ════════════════════════════════════════════════════════════════
        updateStats();
        renderTechs();
        renderDupTable(0);
        renderTextTable(0);
        renderMissTable(0);
        initDemoFlash();
