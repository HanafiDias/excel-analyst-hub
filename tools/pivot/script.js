        // ═══════════════════════════════════════════════════════
        //  TOPIC DATA
        // ═══════════════════════════════════════════════════════
        const TOPICS = [

            // ── CREATE ──
            {
                id: 'create1', cat: 'create', icon: '🏗️', iconBg: '#f0eaf6', iconColor: 'var(--plum)',
                name: 'Membuat PivotTable Pertama', catLabel: 'Membuat Pivot',
                short: 'Langkah demi langkah membuat PivotTable dari data mentah',
                tags: ['essential'],
                tip: 'Pastikan data kamu memiliki header di baris pertama dan tidak ada baris/kolom kosong. Ini syarat utama PivotTable bekerja dengan baik.',
                steps: [
                    { n: 1, cmd: 'Klik sel manapun dalam data → Insert tab → PivotTable', color: '#5c3d6e' },
                    { n: 2, cmd: 'Pilih lokasi: New Worksheet (disarankan) atau Existing', color: '#a0485a' },
                    { n: 3, cmd: 'Panel Field List muncul di kanan — centang atau drag field', color: '#b07a30' },
                    { n: 4, cmd: 'Drag field ke area: Rows, Columns, Values, Filters', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Departemen',
                    cols: ['Total Gaji', 'Jml Karyawan'],
                    rows: [['Finance', 'Rp 45.000.000', '8'], ['HR', 'Rp 28.000.000', '5'], ['IT', 'Rp 72.000.000', '12'], ['Marketing', 'Rp 36.000.000', '7']],
                    totals: ['Rp 181.000.000', '32']
                },
                notes: 'PivotTable terhubung ke data sumber. Jika data berubah, klik kanan di pivot → Refresh untuk memperbarui.',
                shortcuts: ['Alt → N → V → T (Insert PivotTable)', 'F5 / Alt+F5 (Refresh)'],
                mistakes: ['Data memiliki merged cells — harus di-unmerge dulu', 'Ada baris kosong di tengah data', 'Header kolom duplikat atau kosong']
            },

            {
                id: 'create2', cat: 'create', icon: '📐', iconBg: '#f0eaf6', iconColor: 'var(--plum)',
                name: 'Mengatur Layout Pivot', catLabel: 'Membuat Pivot',
                short: 'Pilih antara Compact, Outline, dan Tabular Form sesuai kebutuhan laporan',
                tags: ['essential'],
                tip: 'Tabular Form + "Repeat All Item Labels" adalah format terbaik jika pivot akan di-export atau dipakai sebagai sumber data lain.',
                steps: [
                    { n: 1, cmd: 'Klik pivot → Design tab → Report Layout', color: '#5c3d6e' },
                    { n: 2, cmd: 'Compact Form: default, hemat ruang, cocok untuk presentasi', color: '#a0485a' },
                    { n: 3, cmd: 'Outline Form: tiap field di kolom berbeda, subtotal di atas', color: '#b07a30' },
                    { n: 4, cmd: 'Tabular Form: paling mirip tabel biasa, cocok untuk analisis lanjut', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Dept / Nama',
                    cols: ['Penjualan'],
                    rows: [['Finance', 'Rp 45.000.000'], ['└ Budi', 'Rp 22.000.000'], ['└ Sari', 'Rp 23.000.000'], ['IT', 'Rp 72.000.000'], ['└ Andi', 'Rp 38.000.000'], ['└ Rini', 'Rp 34.000.000']],
                    totals: ['Rp 117.000.000']
                },
                notes: 'Design tab juga mengatur Grand Total (aktif/matikan untuk baris dan kolom), Banded Rows untuk tampilan zebra stripe.',
                shortcuts: ['Design tab (aktif saat kursor dalam pivot)'],
                mistakes: ['Lupa matikan Grand Total saat pivot akan di-sum ulang di tempat lain']
            },

            // ── FIELD & AREA ──
            {
                id: 'field1', cat: 'field', icon: '📦', iconBg: '#fdf5e6', iconColor: 'var(--gold)',
                name: 'Memahami Area Pivot (Rows, Cols, Values, Filters)', catLabel: 'Field & Area',
                short: 'Setiap area punya peran berbeda — memahami ini kunci menguasai pivot',
                tags: ['essential'],
                tip: 'Coba kombinasi berbeda! Tukar field antara Rows dan Columns untuk melihat data dari perspektif berbeda.',
                steps: [
                    { n: 1, cmd: 'ROWS: dimensi vertikal (Dept, Produk, Nama, Tanggal)', color: '#5c3d6e' },
                    { n: 2, cmd: 'COLUMNS: dimensi horizontal (Bulan, Tahun, Kategori)', color: '#a0485a' },
                    { n: 3, cmd: 'VALUES: angka yang diringkas (Penjualan, Gaji, Jumlah)', color: '#b07a30' },
                    { n: 4, cmd: 'FILTERS: filter yang berlaku untuk seluruh pivot sekaligus', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Produk',
                    cols: ['Q1', 'Q2', 'Q3', 'Total'],
                    rows: [['Laptop', '45 jt', '52 jt', '48 jt', '145 jt'], ['Monitor', '22 jt', '18 jt', '25 jt', '65 jt'], ['Mouse', '8 jt', '9 jt', '11 jt', '28 jt']],
                    totals: ['75 jt', '79 jt', '84 jt', '238 jt']
                },
                notes: 'Satu field bisa dipakai di beberapa area. Misal: "Tanggal" bisa di Rows (per baris) DAN di Columns (per kolom) sekaligus untuk cross-tab.',
                shortcuts: ['Drag & drop di Field List panel'],
                mistakes: ['Menaruh field teks di Values (hasilnya COUNT bukan SUM — sering bikin bingung)']
            },

            {
                id: 'field2', cat: 'field', icon: 'Σ', iconBg: '#fdf5e6', iconColor: 'var(--gold)',
                name: 'Mengubah Fungsi Agregasi Values', catLabel: 'Field & Area',
                short: 'Ganti SUM menjadi COUNT, AVERAGE, MAX, MIN, atau % sesuai kebutuhan analisis',
                tags: ['essential'],
                tip: 'Klik kanan field di area Values → Value Field Settings untuk akses semua opsi agregasi dan format angka.',
                steps: [
                    { n: 1, cmd: 'Klik field di area Values → Value Field Settings', color: '#5c3d6e' },
                    { n: 2, cmd: 'Tab "Summarize Values By": SUM, COUNT, AVERAGE, MAX, MIN, PRODUCT', color: '#a0485a' },
                    { n: 3, cmd: 'Tab "Show Values As": % of Grand Total, % of Row, Running Total, dll', color: '#b07a30' },
                    { n: 4, cmd: 'Klik OK dan format angka via "Number Format"', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Dept',
                    cols: ['Total Gaji', 'Rata-rata', 'Jml Karyawan', 'Gaji Tertinggi'],
                    rows: [['Finance', '135 jt', '16,9 jt', '8', '22 jt'], ['IT', '216 jt', '18 jt', '12', '28 jt'], ['Marketing', '108 jt', '15,4 jt', '7', '21 jt']],
                    totals: ['459 jt', '17,3 jt', '27', '28 jt']
                },
                notes: '"% of Grand Total" sangat berguna untuk laporan market share atau proporsi per kategori. "Running Total" untuk cumulative sales.',
                shortcuts: ['Klik kanan → Value Field Settings'],
                mistakes: ['Tidak mengubah nama field dari default "Sum of Penjualan" jadi nama yang lebih deskriptif']
            },

            // ── GROUPING ──
            {
                id: 'group1', cat: 'group', icon: '🗂️', iconBg: '#e4f4f2', iconColor: 'var(--teal)',
                name: 'Grouping Data Tanggal', catLabel: 'Grouping',
                short: 'Kelompokkan tanggal ke bulan, kuartal, atau tahun secara otomatis',
                tags: ['essential'],
                tip: 'Excel 2016+ otomatis mengelompokkan tanggal saat dimasukkan ke Rows/Cols. Untuk kontrol manual, klik kanan → Group.',
                steps: [
                    { n: 1, cmd: 'Masukkan field Tanggal ke area Rows', color: '#5c3d6e' },
                    { n: 2, cmd: 'Klik kanan tanggal di pivot → Group', color: '#a0485a' },
                    { n: 3, cmd: 'Pilih level: Days, Months, Quarters, Years (bisa pilih beberapa)', color: '#b07a30' },
                    { n: 4, cmd: 'Klik OK — pivot otomatis update dengan level grouping baru', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Bulan',
                    cols: ['Penjualan', '% of Total'],
                    rows: [['Jan 2024', 'Rp 145 jt', '12.1%'], ['Feb 2024', 'Rp 132 jt', '11.0%'], ['Mar 2024', 'Rp 168 jt', '14.0%'], ['Q2 2024', 'Rp 455 jt', '38.0%'], ['Q3 2024', 'Rp 300 jt', '25.0%']],
                    totals: ['Rp 1.200 jt', '100%']
                },
                notes: 'Grouping Quarters + Years sangat umum untuk laporan keuangan tahunan. Pisahkan ke dua level untuk drill-down.',
                shortcuts: ['Klik kanan → Group → pilih level'],
                mistakes: ['Data tanggal tersimpan sebagai teks — harus dikonversi ke date format dulu sebelum bisa di-group']
            },

            {
                id: 'group2', cat: 'group', icon: '🔢', iconBg: '#e4f4f2', iconColor: 'var(--teal)',
                name: 'Grouping Data Angka', catLabel: 'Grouping',
                short: 'Kelompokkan angka ke dalam range/bucket (0-10, 11-20, dst)',
                tags: ['essential'],
                tip: 'Grouping angka sangat berguna untuk membuat distribusi atau segmentasi: usia 20-30, 31-40, dll.',
                steps: [
                    { n: 1, cmd: 'Masukkan field angka (Usia, Harga, dll) ke Rows', color: '#5c3d6e' },
                    { n: 2, cmd: 'Klik kanan angka di pivot → Group', color: '#a0485a' },
                    { n: 3, cmd: 'Set Starting/Ending at dan By (ukuran interval)', color: '#b07a30' },
                    { n: 4, cmd: 'Klik OK — pivot mengelompokkan ke bucket yang ditentukan', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Rentang Usia',
                    cols: ['Jml Karyawan', '% Total'],
                    rows: [['20-29', '8', '25%'], ['30-39', '12', '37.5%'], ['40-49', '9', '28.1%'], ['50+', '3', '9.4%']],
                    totals: ['32', '100%']
                },
                notes: 'Kamu bisa group manual: tahan Ctrl, pilih beberapa baris, klik kanan → Group. Berguna untuk grouping non-numerik yang tidak berurutan.',
                shortcuts: ['Klik kanan → Group'],
                mistakes: ['Ada sel kosong di kolom yang di-group — pivot tidak bisa group jika ada blank']
            },

            {
                id: 'group3', cat: 'group', icon: '🏷️', iconBg: '#e4f4f2', iconColor: 'var(--teal)',
                name: 'Custom Grouping (Manual)', catLabel: 'Grouping',
                short: 'Buat grup khusus dengan menggabungkan item-item tertentu',
                tags: ['advanced'],
                tip: 'Custom grouping cocok untuk: menggabungkan region (Jabar+Jateng jadi "Jawa"), atau kategori yang tidak punya pola numerik/tanggal.',
                steps: [
                    { n: 1, cmd: 'Tahan Ctrl → klik item-item yang ingin digabung jadi satu grup', color: '#5c3d6e' },
                    { n: 2, cmd: 'Klik kanan → Group → Excel buat grup baru bernama "Group1"', color: '#a0485a' },
                    { n: 3, cmd: 'Rename grup: klik nama grup → ketik nama baru langsung di sel', color: '#b07a30' },
                    { n: 4, cmd: 'Ulangi untuk membuat grup lain sesuai kebutuhan', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Region',
                    cols: ['Penjualan'],
                    rows: [['Jawa (Group)', 'Rp 450 jt'], ['└ Jabar', 'Rp 180 jt'], ['└ Jateng', 'Rp 150 jt'], ['└ Jatim', 'Rp 120 jt'], ['Luar Jawa', 'Rp 210 jt']],
                    totals: ['Rp 660 jt']
                },
                notes: 'Custom group hanya ada di pivot — tidak mengubah data asli. Saat refresh, custom group tetap dipertahankan.',
                shortcuts: ['Ctrl+klik multi-item → klik kanan → Group'],
                mistakes: ['Lupa rename grup dari "Group1" sehingga laporan susah dibaca']
            },

            // ── FILTER ──
            {
                id: 'filter1', cat: 'filter', icon: '🔽', iconBg: '#fbedef', iconColor: 'var(--rose)',
                name: 'Report Filter & Label Filter', catLabel: 'Filter & Slicer',
                short: 'Filter seluruh pivot atau filter berdasarkan label/nilai tertentu',
                tags: ['essential'],
                tip: 'Taruh field di area Filters untuk filter yang berlaku global. Label Filter dan Value Filter ada di dropdown header pivot.',
                steps: [
                    { n: 1, cmd: 'Filter Area: drag field ke "Filters" → pilih dari dropdown di atas pivot', color: '#5c3d6e' },
                    { n: 2, cmd: 'Label Filter: klik dropdown Row/Column → Label Filters → Contains, Begins with, dll', color: '#a0485a' },
                    { n: 3, cmd: 'Value Filter: klik dropdown → Value Filters → Greater Than, Top 10, dll', color: '#b07a30' },
                    { n: 4, cmd: 'Top 10 Filter: klik dropdown → Value Filters → Top 10 (bisa top/bottom, item/percent)', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Produk (Top 3)',
                    cols: ['Penjualan'],
                    rows: [['Laptop', 'Rp 145 jt'], ['Monitor', 'Rp 98 jt'], ['Keyboard', 'Rp 67 jt']],
                    totals: ['Rp 310 jt']
                },
                notes: 'Filter Value "Top 10" adalah salah satu fitur paling berguna untuk laporan executive — langsung lihat top performer.',
                shortcuts: ['Klik dropdown header pivot untuk Label/Value Filter'],
                mistakes: ['Value Filter menggunakan nilai yang di-aggregasi, bukan nilai mentah dari data']
            },

            {
                id: 'filter2', cat: 'filter', icon: '🎛️', iconBg: '#fbedef', iconColor: 'var(--rose)',
                name: 'Slicer — Filter Visual Interaktif', catLabel: 'Filter & Slicer',
                short: 'Tombol filter bergambar yang bisa diklik — jauh lebih user-friendly dari dropdown',
                tags: ['essential'],
                tip: 'Satu Slicer bisa dihubungkan ke beberapa PivotTable sekaligus! Ideal untuk dashboard dengan banyak pivot.',
                steps: [
                    { n: 1, cmd: 'Klik pivot → PivotTable Analyze tab → Insert Slicer', color: '#5c3d6e' },
                    { n: 2, cmd: 'Centang field yang ingin jadi slicer, klik OK', color: '#a0485a' },
                    { n: 3, cmd: 'Klik tombol di slicer untuk filter — Ctrl+klik untuk multi-select', color: '#b07a30' },
                    { n: 4, cmd: 'Untuk hubungkan ke pivot lain: klik slicer → Report Connections', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Dept',
                    cols: ['Q1', 'Q2', 'Total'],
                    rows: [['IT', 'Rp 36 jt', 'Rp 40 jt', 'Rp 76 jt'], ['Finance', 'Rp 22 jt', 'Rp 25 jt', 'Rp 47 jt']],
                    totals: ['Rp 58 jt', 'Rp 65 jt', 'Rp 123 jt']
                },
                notes: 'Style slicer bisa disesuaikan: klik slicer → Slicer tab → pilih style. Sesuaikan warna dengan tema laporan.',
                shortcuts: ['PivotTable Analyze → Insert Slicer'],
                mistakes: ['Slicer terhubung ke satu pivot saja padahal ada banyak pivot di dashboard']
            },

            {
                id: 'filter3', cat: 'filter', icon: '📅', iconBg: '#fbedef', iconColor: 'var(--rose)',
                name: 'Timeline — Filter Tanggal Visual', catLabel: 'Filter & Slicer',
                short: 'Slicer khusus untuk filter berdasarkan periode waktu secara visual dan intuitif',
                tags: ['advanced'],
                tip: 'Timeline hanya tersedia jika pivot punya field bertipe DATE. Pastikan kolom tanggal sudah diformat sebagai Date, bukan teks.',
                steps: [
                    { n: 1, cmd: 'Klik pivot → PivotTable Analyze → Insert Timeline', color: '#5c3d6e' },
                    { n: 2, cmd: 'Pilih field tanggal → OK', color: '#a0485a' },
                    { n: 3, cmd: 'Klik-drag pada timeline untuk pilih range waktu', color: '#b07a30' },
                    { n: 4, cmd: 'Ubah level (Days/Months/Quarters/Years) dari dropdown kanan atas timeline', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Bulan',
                    cols: ['Revenue'],
                    rows: [['Jan 2024', 'Rp 95 jt'], ['Feb 2024', 'Rp 88 jt'], ['Mar 2024', 'Rp 112 jt']],
                    totals: ['Rp 295 jt']
                },
                notes: 'Timeline sangat menarik untuk presentasi. Drag kiri-kanan untuk memperluas atau mempersempit periode. Hover untuk lihat tooltip.',
                shortcuts: ['PivotTable Analyze → Insert Timeline'],
                mistakes: ['Field tanggal di pivot berupa teks — Timeline tidak muncul karena hanya bekerja dengan date serial Excel']
            },

            // ── CALCULATED FIELD ──
            {
                id: 'calc1', cat: 'calc', icon: '🧮', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'Calculated Field', catLabel: 'Calculated Field',
                short: 'Buat kolom formula baru langsung di dalam PivotTable tanpa mengubah data asli',
                tags: ['essential'],
                tip: 'Calculated Field ideal untuk: margin%, growth%, average per unit — angka turunan yang selalu ingin tampil di pivot.',
                steps: [
                    { n: 1, cmd: 'Klik pivot → PivotTable Analyze → Fields, Items, & Sets → Calculated Field', color: '#5c3d6e' },
                    { n: 2, cmd: 'Beri nama field baru, misal: "Profit Margin"', color: '#a0485a' },
                    { n: 3, cmd: 'Ketik formula menggunakan nama field yang ada: = Profit / Revenue', color: '#b07a30' },
                    { n: 4, cmd: 'Klik Add → OK — field baru muncul di Field List', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Produk',
                    cols: ['Revenue', 'Cost', 'Profit', 'Margin %'],
                    rows: [['Laptop', '145 jt', '98 jt', '47 jt', '32.4%'], ['Monitor', '82 jt', '54 jt', '28 jt', '34.1%'], ['Mouse', '28 jt', '16 jt', '12 jt', '42.9%']],
                    totals: ['255 jt', '168 jt', '87 jt', '34.1%']
                },
                notes: 'Calculated Field bekerja berdasarkan nilai yang sudah di-aggregate (SUM). Tidak bisa referensi cell individual atau pakai VLOOKUP.',
                shortcuts: ['PivotTable Analyze → Fields, Items & Sets → Calculated Field'],
                mistakes: ['Mengira Calculated Field bisa pakai VLOOKUP atau referensi cell — tidak bisa! Hanya bisa pakai nama field lain']
            },

            {
                id: 'calc2', cat: 'calc', icon: '🔣', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'Calculated Item', catLabel: 'Calculated Field',
                short: 'Tambahkan baris/kolom baru berisi formula yang melibatkan item lain dalam field yang sama',
                tags: ['advanced'],
                tip: 'Calculated Item lebih jarang dipakai tapi berguna untuk: variance (Aktual - Target), custom grouping dengan formula.',
                steps: [
                    { n: 1, cmd: 'Klik item di pivot (bukan Grand Total) → PivotTable Analyze → Fields, Items & Sets → Calculated Item', color: '#5c3d6e' },
                    { n: 2, cmd: 'Beri nama item baru, misal: "Variance"', color: '#a0485a' },
                    { n: 3, cmd: 'Formula: = Aktual - Target (gunakan nama item yang ada)', color: '#b07a30' },
                    { n: 4, cmd: 'Klik Add → OK — baris/kolom baru muncul di pivot', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Metrik',
                    cols: ['Q1', 'Q2', 'Q3'],
                    rows: [['Target', '100 jt', '110 jt', '120 jt'], ['Aktual', '95 jt', '118 jt', '115 jt'], ['Variance', '-5 jt', '+8 jt', '-5 jt']],
                    totals: ['', '', '']
                },
                notes: 'Calculated Field dan Calculated Item berbeda: Field = kolom baru dari operasi antar field. Item = baris/kolom dari operasi antar item dalam satu field.',
                shortcuts: ['PivotTable Analyze → Fields, Items & Sets → Calculated Item'],
                mistakes: ['Bingung kapan pakai Calculated Field vs Item — Field untuk kolom baru, Item untuk baris baru']
            },

            {
                id: 'calc3', cat: 'calc', icon: '📊', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'Show Values As (% dan Running Total)', catLabel: 'Calculated Field',
                short: 'Tampilkan nilai sebagai persentase, rank, running total, atau perbandingan tanpa formula tambahan',
                tags: ['essential'],
                tip: '"% of Parent" sangat berguna untuk hierarki data — misal % penjualan per salesperson terhadap total departemennya.',
                steps: [
                    { n: 1, cmd: 'Klik kanan field Values → Show Values As', color: '#5c3d6e' },
                    { n: 2, cmd: '% of Grand Total: kontribusi setiap item ke total keseluruhan', color: '#a0485a' },
                    { n: 3, cmd: '% of Row/Column: kontribusi dalam satu baris atau kolom', color: '#b07a30' },
                    { n: 4, cmd: 'Running Total In: akumulasi dari atas ke bawah (cumulative)', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Produk',
                    cols: ['Penjualan', '% Grand Total', 'Running Total'],
                    rows: [['Laptop', '145 jt', '40.8%', '145 jt'], ['Monitor', '98 jt', '27.5%', '243 jt'], ['Mouse', '67 jt', '18.8%', '310 jt'], ['Keyboard', '46 jt', '12.9%', '356 jt']],
                    totals: ['356 jt', '100%', '']
                },
                notes: 'Kamu bisa tambahkan field yang sama 2x ke Values — satu untuk SUM, satu lagi untuk "% of Grand Total". Sangat umum di laporan profesional.',
                shortcuts: ['Klik kanan field Values → Show Values As'],
                mistakes: ['Tidak tahu bahwa satu field bisa ditambahkan berkali-kali ke Values dengan tampilan berbeda']
            },

            // ── CHART ──
            {
                id: 'chart1', cat: 'chart', icon: '📈', iconBg: '#f0eaf6', iconColor: 'var(--plum)',
                name: 'Membuat PivotChart', catLabel: 'Pivot Chart',
                short: 'Chart yang terhubung langsung ke PivotTable — filter pivot otomatis update chart',
                tags: ['essential'],
                tip: 'PivotChart dan PivotTable selalu sinkron. Filter di pivot → chart update. Filter di chart → pivot update. Ideal untuk dashboard.',
                steps: [
                    { n: 1, cmd: 'Klik dalam pivot → PivotTable Analyze → PivotChart', color: '#5c3d6e' },
                    { n: 2, cmd: 'Pilih tipe chart: Column (perbandingan), Line (tren), Pie (proporsi), Bar (ranking)', color: '#a0485a' },
                    { n: 3, cmd: 'Format chart: Design & Format tab → tambah judul, ubah warna, legend', color: '#b07a30' },
                    { n: 4, cmd: 'Sembunyikan tombol field di chart: Analyze → Show/Hide → Field Buttons', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Bulan',
                    cols: ['Revenue', 'Target'],
                    rows: [['Jan', '95 jt', '100 jt'], ['Feb', '88 jt', '100 jt'], ['Mar', '112 jt', '100 jt'], ['Apr', '105 jt', '110 jt']],
                    totals: ['400 jt', '410 jt']
                },
                notes: 'Untuk dashboard profesional: sembunyikan Field Buttons di chart (berantakan). Gunakan Slicer sebagai pengganti filter yang lebih rapi.',
                shortcuts: ['PivotTable Analyze → PivotChart', 'Alt → N → SZ → C (Insert Chart)'],
                mistakes: ['Memilih tipe chart yang tidak sesuai data — Pie chart untuk data time series tidak informatif']
            },

            {
                id: 'chart2', cat: 'chart', icon: '🎨', iconBg: '#f0eaf6', iconColor: 'var(--plum)',
                name: 'Tipe Chart yang Tepat untuk Pivot', catLabel: 'Pivot Chart',
                short: 'Pilih tipe chart yang paling efektif sesuai tujuan analisis',
                tags: ['essential'],
                tip: 'Aturan dasar: Perbandingan → Bar/Column, Tren → Line, Proporsi → Pie/Donut, Distribusi → Histogram, Korelasi → Scatter.',
                steps: [
                    { n: 1, cmd: 'Perbandingan antar kategori: Clustered Column Chart (paling umum)', color: '#5c3d6e' },
                    { n: 2, cmd: 'Tren waktu: Line Chart dengan Markers — tampilkan data point jelas', color: '#a0485a' },
                    { n: 3, cmd: 'Proporsi/Share: Pie atau Donut — maksimal 5-6 slice agar mudah dibaca', color: '#b07a30' },
                    { n: 4, cmd: 'Ranking dengan part-of-whole: Stacked Bar Chart', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Use Case → Chart',
                    cols: ['Rekomendasi'],
                    rows: [['Penjualan per Dept', 'Column Chart'], ['Tren per Bulan', 'Line Chart'], ['Market Share', 'Donut Chart'], ['Budget vs Aktual', 'Clustered Bar'], ['Top 10 Produk', 'Bar Chart (sorted)']],
                    totals: ['']
                },
                notes: 'Hindari 3D chart — terlihat menarik tapi menyulitkan pembacaan nilai yang akurat. Flat 2D selalu lebih profesional.',
                shortcuts: ['Setelah chart dibuat: Design tab → Change Chart Type'],
                mistakes: ['3D chart yang "keren" justru menyulitkan pembacaan data', 'Terlalu banyak data series dalam satu chart']
            },

            // ── ADVANCED ──
            {
                id: 'adv1', cat: 'advanced', icon: '⚡', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'Refresh & Data Source', catLabel: 'Tips Lanjutan',
                short: 'Cara update pivot saat data berubah dan menghubungkan ke sumber data yang berkembang',
                tags: ['essential'],
                tip: 'Jadikan data sumber sebagai Excel Table (Ctrl+T) sebelum buat pivot. Table otomatis expand, jadi pivot selalu mencakup data baru tanpa ubah source.',
                steps: [
                    { n: 1, cmd: 'Refresh manual: klik kanan pivot → Refresh', color: '#5c3d6e' },
                    { n: 2, cmd: 'Refresh otomatis saat buka file: Analyze → PivotTable Options → Data → Refresh on open', color: '#a0485a' },
                    { n: 3, cmd: 'Ubah sumber data: Analyze → Change Data Source', color: '#b07a30' },
                    { n: 4, cmd: 'Refresh All: Data tab → Refresh All (update semua pivot sekaligus)', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Sumber Data',
                    cols: ['Kelebihan'],
                    rows: [['Range biasa', 'Sederhana, mudah dipahami'], ['Excel Table', 'Auto-expand, direkomendasikan'], ['Power Query', 'Data dari banyak sumber, transformasi kompleks'], ['External DB', 'Real-time, untuk data besar']],
                    totals: ['']
                },
                notes: 'Alt+F5 untuk refresh semua pivot sekaligus lebih cepat dari klik kanan satu per satu, terutama saat ada banyak pivot di workbook.',
                shortcuts: ['Alt+F5 (Refresh All)', 'Ctrl+Alt+F5 (Refresh All workbook)'],
                mistakes: ['Lupa refresh setelah update data — pivot menampilkan data lama', 'Data source masih range biasa sehingga pivot tidak include baris baru']
            },

            {
                id: 'adv2', cat: 'advanced', icon: '🔗', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'GETPIVOTDATA — Referensi Nilai Pivot', catLabel: 'Tips Lanjutan',
                short: 'Formula untuk mengambil nilai spesifik dari PivotTable ke sel lain secara dinamis',
                tags: ['advanced'],
                tip: 'Klik sel di luar pivot, ketik =, lalu klik sel dalam pivot — Excel otomatis buat formula GETPIVOTDATA. Matikan jika tidak ingin: Analyze → Options → Generate GETPIVOTDATA.',
                steps: [
                    { n: 1, cmd: 'Syntax: =GETPIVOTDATA("Sales", pivot_ref, "Dept", "IT", "Month", "Jan")', color: '#5c3d6e' },
                    { n: 2, cmd: 'Argumen: Field name → Pivot cell reference → [field, item] pairs', color: '#a0485a' },
                    { n: 3, cmd: 'Keunggulan: formula tetap akurat meski urutan pivot berubah', color: '#b07a30' },
                    { n: 4, cmd: 'Matikan auto-generate: Analyze → Options → uncheck "Generate GETPIVOTDATA"', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Formula',
                    cols: ['Deskripsi'],
                    rows: [['=GETPIVOTDATA("Sales",A1)', 'Total dari pivot di A1'], ['=GETPIVOTDATA("Sales",A1,"Dept","IT")', 'Sales IT saja'], ['=GETPIVOTDATA("Sales",A1,"Dept","IT","Q","Q1")', 'Sales IT Q1']],
                    totals: ['']
                },
                notes: 'GETPIVOTDATA lebih aman dari referensi sel biasa — tidak akan salah nilai saat pivot di-filter atau diurutkan ulang.',
                shortcuts: ['Analyze → PivotTable Options → Generate GETPIVOTDATA (toggle)'],
                mistakes: ['Pakai referensi sel biasa (=B5) yang akan berubah nilai saat pivot di-filter']
            },

            {
                id: 'adv3', cat: 'advanced', icon: '📋', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'Drill Down & Detail Data', catLabel: 'Tips Lanjutan',
                short: 'Double-click nilai di pivot untuk melihat baris data asli yang membentuk nilai tersebut',
                tags: ['essential'],
                tip: 'Drill down adalah fitur pivot yang paling mengesankan untuk presentasi — langsung buka detail di sheet baru dengan satu double-click.',
                steps: [
                    { n: 1, cmd: 'Double-click nilai manapun di area Values pivot', color: '#5c3d6e' },
                    { n: 2, cmd: 'Excel otomatis buat sheet baru berisi semua baris data yang membentuk nilai itu', color: '#a0485a' },
                    { n: 3, cmd: 'Expand/Collapse: klik tombol +/- di sisi kiri baris untuk drill down hierarki', color: '#b07a30' },
                    { n: 4, cmd: 'Matikan drill down: Analyze → PivotTable Options → Data → Disable drill down', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Total Penjualan IT',
                    cols: ['= Rp 72.000.000'],
                    rows: [['Double-click ↓', ''], ['Sheet baru muncul', 'berisi 12 baris'], ['Setiap baris', 'adalah transaksi IT'], ['Bisa langsung', 'analisis detail']],
                    totals: ['']
                },
                notes: 'Sheet drill down bersifat sementara — tidak otomatis update saat pivot di-refresh. Hapus sheet hasil drill down jika tidak lagi dibutuhkan.',
                shortcuts: ['Double-click nilai di Values', 'Alt+→ (Expand), Alt+← (Collapse)'],
                mistakes: ['Terlalu banyak sheet drill down yang menumpuk dan tidak dihapus']
            },

            {
                id: 'adv4', cat: 'advanced', icon: '🔄', iconBg: '#eaecf4', iconColor: 'var(--steel)',
                name: 'Conditional Formatting di Pivot', catLabel: 'Tips Lanjutan',
                short: 'Terapkan warna otomatis pada pivot berdasarkan nilai — heatmap, data bar, icon set',
                tags: ['advanced'],
                tip: 'Pilih "All cells showing X values for Y" agar conditional formatting berlaku ke semua sel pivot, bukan hanya sel yang dipilih.',
                steps: [
                    { n: 1, cmd: 'Klik nilai di pivot → Home → Conditional Formatting', color: '#5c3d6e' },
                    { n: 2, cmd: 'Pilih jenis: Color Scale (heatmap), Data Bars, atau Icon Sets', color: '#a0485a' },
                    { n: 3, cmd: 'Penting: di dialog CF, pilih "All cells showing [field] values"', color: '#b07a30' },
                    { n: 4, cmd: 'Manage Rules untuk edit atau hapus aturan yang sudah ada', color: '#2d7a72' },
                ],
                pivot: {
                    rowLabel: 'Produk',
                    cols: ['Jan', 'Feb', 'Mar'],
                    rows: [['Laptop', '🟩 145 jt', '🟨 88 jt', '🟩 156 jt'], ['Monitor', '🟨 82 jt', '🟥 54 jt', '🟨 78 jt'], ['Mouse', '🟥 28 jt', '🟥 22 jt', '🟨 35 jt']],
                    totals: ['', '', '']
                },
                notes: 'Heatmap (Color Scale) dengan merah-kuning-hijau adalah format paling umum di dashboard performa KPI. Langsung terlihat mana yang baik dan buruk.',
                shortcuts: ['Home → Conditional Formatting → Manage Rules'],
                mistakes: ['CF hanya berlaku ke sel terpilih (bukan semua pivot) karena memilih opsi yang salah di dialog']
            },
        ];

        // ═══════════════════════════════════════════════════════
        //  QUIZ DATA
        // ═══════════════════════════════════════════════════════
        const QUIZ = [
            {
                cat: 'create', q: 'Apa syarat utama data agar PivotTable bisa dibuat dengan benar?', ctx: '',
                opts: ['Data harus diurutkan A-Z terlebih dahulu', 'Header di baris pertama, tidak ada baris/kolom kosong, tidak ada merged cell', 'Data harus disimpan sebagai .xlsx bukan .xls', 'Data minimal 100 baris agar pivot bermakna'],
                ans: 1, exp: 'PivotTable membutuhkan: header unik di setiap kolom, tidak ada baris/kolom kosong di tengah data, dan tidak ada merged cell. Format file tidak mempengaruhi kemampuan pivot.'
            },
            {
                cat: 'create', q: 'Perbedaan Tabular Form dengan Compact Form di PivotTable layout adalah?', ctx: '',
                opts: ['Tabular Form lebih lambat untuk data besar', 'Tabular Form menempatkan tiap field di kolom berbeda, lebih mirip tabel biasa', 'Compact Form menggunakan lebih banyak warna', 'Tidak ada perbedaan, hanya tampilan visual'],
                ans: 1, exp: 'Tabular Form menempatkan setiap Row field di kolom terpisah — hasilnya mirip tabel biasa dan lebih mudah dipakai sebagai sumber data untuk analisis lanjutan. Compact Form menggabungkan semua Row fields ke satu kolom.'
            },
            {
                cat: 'create', q: 'Mengapa disarankan menggunakan Excel Table sebagai sumber data PivotTable?', ctx: '',
                opts: ['Table membuat pivot lebih cepat di-generate', 'Table auto-expand saat data baru ditambah, jadi pivot otomatis mencakup data baru', 'Table bisa punya lebih banyak kolom dari range biasa', 'Table otomatis refresh pivot tanpa klik manual'],
                ans: 1, exp: 'Excel Table (Ctrl+T) otomatis expand saat data baru ditambahkan. Ini berarti pivot yang mereferensi table tidak perlu ubah data source saat ada data baru — cukup Refresh.'
            },
            {
                cat: 'filter', q: 'Satu Slicer bisa dihubungkan ke berapa PivotTable?', ctx: '',
                opts: ['Hanya satu PivotTable', 'Maksimal 2 PivotTable', 'Beberapa PivotTable sekaligus via Report Connections', 'Hanya bisa untuk PivotChart, bukan PivotTable'],
                ans: 2, exp: 'Slicer bisa dihubungkan ke beberapa PivotTable sekaligus melalui fitur Report Connections (klik kanan slicer → Report Connections). Ini sangat berguna untuk dashboard dengan banyak pivot yang menggunakan filter yang sama.'
            },
            {
                cat: 'filter', q: 'Timeline di PivotTable hanya bisa digunakan jika?', ctx: '',
                opts: ['PivotTable memiliki lebih dari 100 baris data', 'Field tanggal sudah diformat sebagai Date (bukan teks) di data sumber', 'Excel versi 2013 ke atas saja', 'Data diurutkan berdasarkan tanggal'],
                ans: 1, exp: 'Timeline hanya bekerja dengan field yang bertipe Date (date serial Excel). Jika tanggal tersimpan sebagai teks, opsi Timeline tidak akan muncul. Konversi dulu dengan DATEVALUE() atau Text to Columns.'
            },
            {
                cat: 'calc', q: 'Apa keterbatasan utama Calculated Field di PivotTable?', ctx: '',
                opts: ['Hanya bisa melakukan operasi penjumlahan', 'Tidak bisa mereferensi cell individual atau menggunakan VLOOKUP — hanya bisa menggunakan nama field lain', 'Calculated Field menambah ukuran file secara signifikan', 'Hanya bisa dibuat satu Calculated Field per pivot'],
                ans: 1, exp: 'Calculated Field bekerja berdasarkan nilai yang sudah di-aggregate (total/SUM). Tidak bisa referensi sel individual ($A$1), tidak bisa pakai VLOOKUP/INDEX MATCH, dan hanya bisa menggunakan nama field dari pivot itu sendiri.'
            },
            {
                cat: 'calc', q: 'Apa fungsi "Show Values As → % of Grand Total"?', ctx: '',
                opts: ['Mengubah format angka menjadi persen', 'Menampilkan setiap nilai sebagai kontribusi persentase terhadap total keseluruhan pivot', 'Menghitung rata-rata dalam persentase', 'Membandingkan nilai dengan tahun sebelumnya'],
                ans: 1, exp: '% of Grand Total menampilkan setiap nilai sebagai proporsi dari Grand Total. Contoh: jika total penjualan 100 juta dan Laptop 40 juta, maka Laptop tampil sebagai 40%. Sangat berguna untuk laporan market share atau kontribusi.'
            },
            {
                cat: 'create', q: 'Apa yang terjadi saat kamu double-click nilai di area Values PivotTable?', ctx: '',
                opts: ['Nilai tersebut dihapus dari pivot', 'Excel membuka sheet baru berisi semua baris data asli yang membentuk nilai tersebut', 'Muncul dialog untuk edit nilai', 'Pivot di-filter hanya menampilkan baris tersebut'],
                ans: 1, exp: 'Double-click di nilai pivot = Drill Down. Excel otomatis membuat sheet baru berisi semua record data asli yang berkontribusi ke nilai tersebut. Fitur ini sangat berguna untuk investigasi anomali data.'
            },
            {
                cat: 'filter', q: 'Perbedaan Label Filter dan Value Filter di PivotTable adalah?', ctx: '',
                opts: ['Keduanya sama, hanya nama berbeda', 'Label Filter menyaring berdasarkan teks/nama item, Value Filter menyaring berdasarkan nilai angka yang di-aggregate', 'Label Filter hanya untuk kolom, Value Filter hanya untuk baris', 'Value Filter tidak bisa digunakan bersamaan dengan Slicer'],
                ans: 1, exp: 'Label Filter menyaring berdasarkan nama/teks item (misal: nama produk yang mengandung "Laptop"). Value Filter menyaring berdasarkan nilai agregat (misal: total penjualan > 50 juta). Keduanya bisa dipakai bersamaan.'
            },
            {
                cat: 'calc', q: 'Perbedaan Calculated Field dan Calculated Item adalah?', ctx: '',
                opts: ['Keduanya identik, hanya cara akses berbeda', 'Calculated Field = kolom/field baru dari operasi antar field; Calculated Item = baris/item baru dari operasi antar item dalam satu field', 'Calculated Field lebih akurat dari Calculated Item', 'Calculated Item hanya tersedia di Excel 365'],
                ans: 1, exp: 'Calculated Field membuat field (kolom) baru dari operasi matematika antar field yang ada — misal: Profit = Revenue - Cost. Calculated Item membuat item (baris) baru dari operasi antar item dalam satu field — misal: Variance = Aktual - Target.'
            },
        ];

        // ═══════════════════════════════════════════════════════
        //  STATE
        // ═══════════════════════════════════════════════════════
        let mastered = JSON.parse(localStorage.getItem('xpvt_mastered') || '[]');
        let curFilter = 'all', curSearch = '', curTab = 'learn', openExpand = null;
        let quizCatSel = 'all', quizQs = [], quizIdx = 0, quizScore = 0;
        let wellData = { rows: [], cols: [], vals: [], filter: [] };
        let slicerDept = 'all', slicerYear = 'all';

        // ═══════════════════════════════════════════════════════
        //  HELPERS
        // ═══════════════════════════════════════════════════════
        const fmt = n => typeof n === 'number' ? ('Rp ' + n.toLocaleString('id-ID')) : n;

        function renderPivotTable(p) {
            if (!p) return '';
            const cols = p.cols;
            const thCols = cols.map(c => `<th>${c}</th>`).join('');
            const rows = p.rows.map(r => {
                const isSubtotal = r[0].startsWith('└');
                const cells = r.slice(1).map(v => `<td>${v}</td>`).join('');
                return `<tr><td class="row-label" style="${isSubtotal ? 'padding-left:24px;font-weight:400;' : ''}">${r[0]}</td>${cells}</tr>`;
            }).join('');
            const totCells = p.totals.map(v => `<td class="total">${v}</td>`).join('');
            const totalRow = p.totals.some(v => v) ? `<tr><td class="row-label total">Grand Total</td>${totCells}</tr>` : '';
            return `<div class="vis-area" style="padding:0"><div style="overflow-x:auto"><table class="pv-table"><thead><tr><th class="row-hd">${p.rowLabel}</th>${thCols}</tr></thead><tbody>${rows}${totalRow}</tbody></table></div></div>`;
        }

        function tagHtml(tags) {
            const map = { essential: 'tag-essential 🔥 Wajib', advanced: 'tag-advanced 🎓 Mahir', chart: 'tag-chart 📈 Chart', formula: 'tag-formula 📐 Formula' };
            return tags.map(t => { const [cls, ...rest] = map[t]?.split(' ') || ['tag-advanced', t]; return `<span class="tag ${cls}">${rest.join(' ')}</span>`; }).join('');
        }

        function stepHtml(steps) {
            return steps.map((s, i) => `<div class="step-item">
    <div class="step-badge" style="background:${s.color}20;color:${s.color}">${i + 1}</div>
    <div class="step-text"><div class="cmd-chip">${s.cmd}</div></div>
  </div>`).join('');
        }

        // ═══════════════════════════════════════════════════════
        //  RENDER TOPICS
        // ═══════════════════════════════════════════════════════
        function getFiltered() {
            return TOPICS.filter(t => {
                const mc = curFilter === 'all' ? true : curFilter === 'mastered' ? mastered.includes(t.id) : curFilter === 'essential' ? t.tags.includes('essential') : t.cat === curFilter;
                const s = curSearch.toLowerCase();
                return mc && (!s || t.name.toLowerCase().includes(s) || t.short.toLowerCase().includes(s) || t.catLabel.toLowerCase().includes(s));
            });
        }

        function renderTopics() {
            const list = getFiltered();
            const g = document.getElementById('topicGrid');
            if (!list.length) {
                g.innerHTML = `<div style="text-align:center;padding:60px;grid-column:1/-1;color:var(--text-dim)"><div style="font-size:40px;margin-bottom:12px">🔍</div><p style="font-family:var(--display);font-size:18px;color:var(--text-mid)">Tidak ditemukan</p></div>`;
                return;
            }
            g.innerHTML = list.map((t, i) => {
                const done = mastered.includes(t.id);
                const scuts = t.shortcuts.map(s => `<span class="ep-shortcut">${s}</span>`).join('');
                const mistakes = t.mistakes.map(m => `<div class="mistake-item"><strong>⚠️</strong> ${m}</div>`).join('');
                return `<div class="tc ${done ? 'mastered' : ''}" id="tc-${t.id}" style="animation-delay:${Math.min(i * .04, .4)}s">
      <div class="tc-hd">
        <div class="tc-icon" style="background:${t.iconBg}">${t.icon}</div>
        <div class="tc-meta">
          <div class="tc-name">${t.name}</div>
          <div class="tc-cat" style="color:${t.iconColor}">${t.catLabel}</div>
          <div class="tc-short">${t.short}</div>
        </div>
        <div class="mastered-dot"></div>
      </div>
      <div class="tc-body">
        ${renderPivotTable(t.pivot)}
        <div style="height:12px"></div>
        <div class="steps-list">${stepHtml(t.steps)}</div>
        <div class="tip-box"><div class="tip-icon">💡</div><span>${t.tip}</span></div>
        <div class="tag-row">${tagHtml(t.tags)}</div>
        <button class="master-btn" onclick="toggleMaster('${t.id}')">${done ? '✅ Sudah Dikuasai' : '📌 Tandai Sudah Paham'}</button>
      </div>
      <div class="expand-wrap">
        <button class="expand-btn" id="ebtn-${t.id}" onclick="toggleExpand('${t.id}',this)">▼ Detail: Shortcut & Kesalahan Umum</button>
        <div class="expand-panel" id="epnl-${t.id}">
          ${scuts ? `<div><div class="ep-hd">⌨️ Shortcut</div>${scuts}</div><div style="height:12px"></div>` : ''}
          <div><div class="ep-hd">📝 Catatan</div><div class="ep-note">${t.notes}</div></div>
          <div style="height:12px"></div>
          <div><div class="ep-hd">⚠️ Kesalahan Umum</div>${mistakes}</div>
        </div>
      </div>
    </div>`;
            }).join('');
        }

        function toggleExpand(id, btn) {
            const p = document.getElementById('epnl-' + id);
            const isOpen = p.classList.contains('open');
            if (openExpand && openExpand !== id) {
                document.getElementById('epnl-' + openExpand)?.classList.remove('open');
                const ob = document.getElementById('ebtn-' + openExpand);
                if (ob) ob.textContent = '▼ Detail: Shortcut & Kesalahan Umum';
            }
            p.classList.toggle('open');
            openExpand = isOpen ? null : id;
            btn.textContent = p.classList.contains('open') ? '▲ Sembunyikan Detail' : '▼ Detail: Shortcut & Kesalahan Umum';
        }

        function toggleMaster(id) {
            mastered = mastered.includes(id) ? mastered.filter(x => x !== id) : [...mastered, id];
            localStorage.setItem('xpvt_mastered', JSON.stringify(mastered));
            updateStats();
            const card = document.getElementById('tc-' + id);
            if (card) { card.classList.toggle('mastered'); card.querySelector('.master-btn').textContent = mastered.includes(id) ? '✅ Sudah Dikuasai' : '📌 Tandai Sudah Paham'; }
        }

        function setFilter(cat, btn) {
            curFilter = cat;
            document.querySelectorAll('.sb-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const titles = { all: '📚 Semua Materi', create: '🏗️ Membuat Pivot', field: '📐 Field & Area', group: '🗂️ Grouping Data', filter: '🔽 Filter & Slicer', calc: '🧮 Calculated Field', chart: '📈 Pivot Chart', advanced: '⚙️ Tips Lanjutan', mastered: '✅ Sudah Dikuasai', essential: '🔥 Wajib Tahu' };
            document.getElementById('secTitle').textContent = titles[cat] || cat;
            if (curTab === 'learn') renderTopics();
        }

        function doSearch(v) { curSearch = v; if (curTab === 'learn') renderTopics(); }

        function updateStats() {
            const total = TOPICS.length, done = mastered.length;
            document.getElementById('masteredNum').textContent = done;
            document.getElementById('totalNum').textContent = total;
            const pct = total ? Math.round(done / total * 100) : 0;
            document.getElementById('psFill').style.width = pct + '%';
            document.getElementById('psPct').textContent = pct + '%';
            document.getElementById('sc-all').textContent = total;
            ['create', 'field', 'group', 'filter', 'calc', 'chart', 'advanced'].forEach(c => {
                const el = document.getElementById('sc-' + c);
                if (el) el.textContent = TOPICS.filter(t => t.cat === c).length;
            });
            document.getElementById('sc-mastered').textContent = done;
            document.getElementById('sc-essential').textContent = TOPICS.filter(t => t.tags.includes('essential')).length;
        }

        // ═══════════════════════════════════════════════════════
        //  SIMULATOR
        // ═══════════════════════════════════════════════════════
        const SIM_DATA = [
            { dept: 'IT', month: 'Jan', year: '2024', product: 'Laptop', sales: 8500000, qty: 2 },
            { dept: 'IT', month: 'Feb', year: '2024', product: 'Monitor', sales: 4200000, qty: 3 },
            { dept: 'IT', month: 'Mar', year: '2024', product: 'Laptop', sales: 9200000, qty: 2 },
            { dept: 'Finance', month: 'Jan', year: '2024', product: 'Keyboard', sales: 1800000, qty: 6 },
            { dept: 'Finance', month: 'Feb', year: '2024', product: 'Mouse', sales: 1200000, qty: 8 },
            { dept: 'Finance', month: 'Mar', year: '2024', product: 'Monitor', sales: 3800000, qty: 2 },
            { dept: 'Marketing', month: 'Jan', year: '2024', product: 'Laptop', sales: 7500000, qty: 2 },
            { dept: 'Marketing', month: 'Feb', year: '2024', product: 'Keyboard', sales: 2100000, qty: 7 },
            { dept: 'Marketing', month: 'Mar', year: '2024', product: 'Mouse', sales: 1600000, qty: 10 },
            { dept: 'HR', month: 'Jan', year: '2024', product: 'Monitor', sales: 2800000, qty: 2 },
            { dept: 'HR', month: 'Feb', year: '2024', product: 'Mouse', sales: 900000, qty: 6 },
            { dept: 'HR', month: 'Mar', year: '2024', product: 'Keyboard', sales: 1500000, qty: 5 },
            { dept: 'IT', month: 'Jan', year: '2025', product: 'Monitor', sales: 5100000, qty: 3 },
            { dept: 'Finance', month: 'Feb', year: '2025', product: 'Laptop', sales: 9800000, qty: 2 },
            { dept: 'Marketing', month: 'Mar', year: '2025', product: 'Monitor', sales: 4200000, qty: 3 },
        ];

        const FIELDS = [
            { id: 'dept', label: 'Dept', icon: '🏢', type: 'text' },
            { id: 'month', label: 'Month', icon: '📅', type: 'text' },
            { id: 'year', label: 'Year', icon: '📆', type: 'text' },
            { id: 'product', label: 'Product', icon: '📦', type: 'text' },
            { id: 'sales', label: 'Sales', icon: '💰', type: 'num' },
            { id: 'qty', label: 'Qty', icon: '🔢', type: 'num' },
        ];

        function initSim() {
            const src = document.getElementById('fieldSource');
            src.innerHTML = FIELDS.map(f => `<div class="field-chip" id="fc-${f.id}" draggable="true" ondragstart="dragField(event,'${f.id}')">${f.icon} ${f.label}</div>`).join('');
            ['rows', 'cols', 'vals', 'filter'].forEach(w => {
                document.getElementById('well-' + w + '-items').innerHTML = '';
                wellData[w] = [];
            });
            document.getElementById('pivotOutput').innerHTML = `<div class="pivot-empty"><div class="pe-icon">📋</div><p>Drag field ke Rows & Values<br>lalu klik Generate Pivot</p></div>`;
            document.getElementById('chartPreview').innerHTML = `<div class="pivot-empty" style="padding:20px;font-size:12px;"><div class="pe-icon" style="font-size:28px;">📊</div><p>Chart akan muncul setelah pivot di-generate</p></div>`;
            document.getElementById('simMsg').textContent = '';
        }

        function dragField(e, id) { e.dataTransfer.setData('field', id); }
        function allowDrop(e) { e.preventDefault(); e.currentTarget.classList.add('drag-over'); }

        document.addEventListener('dragend', () => { document.querySelectorAll('.well').forEach(w => w.classList.remove('drag-over')); });

        function dropField(e, well) {
            e.preventDefault();
            e.currentTarget.classList.remove('drag-over');
            const id = e.dataTransfer.getData('field');
            const f = FIELDS.find(x => x.id === id);
            if (!f) return;
            // remove from other wells
            ['rows', 'cols', 'vals', 'filter'].forEach(w => { wellData[w] = wellData[w].filter(x => x !== id); });
            // check if already in this well
            if (wellData[well].includes(id)) return;
            // validate: vals should be numeric
            if (well === 'vals' && f.type !== 'num') { document.getElementById('simMsg').textContent = '⚠️ Area Values hanya bisa menerima field angka (Sales, Qty)'; return; }
            wellData[well].push(id);
            renderWells();
            document.getElementById('simMsg').textContent = '';
        }

        function removeFromWell(well, id) {
            wellData[well] = wellData[well].filter(x => x !== id);
            renderWells();
        }

        function renderWells() {
            ['rows', 'cols', 'vals', 'filter'].forEach(w => {
                const cont = document.getElementById('well-' + w + '-items');
                cont.innerHTML = wellData[w].map(id => {
                    const f = FIELDS.find(x => x.id === id);
                    return `<div class="well-item" onclick="removeFromWell('${w}','${id}')">${f.icon} ${f.label} <span class="rm">×</span></div>`;
                }).join('');
            });
            // mark in-use
            FIELDS.forEach(f => {
                const used = ['rows', 'cols', 'vals', 'filter'].some(w => wellData[w].includes(f.id));
                const chip = document.getElementById('fc-' + f.id);
                if (chip) chip.className = 'field-chip' + (used ? ' in-use' : '');
            });
        }

        function fmt2(n) { return n >= 1000000 ? 'Rp ' + (n / 1000000).toFixed(1) + ' jt' : n >= 1000 ? 'Rp ' + (n / 1000).toFixed(0) + ' rb' : n; }

        function generatePivot() {
            const rows = wellData.rows, cols = wellData.cols, vals = wellData.vals;
            if (!rows.length || !vals.length) { document.getElementById('simMsg').textContent = '⚠️ Minimal isi Rows dan Values untuk generate pivot'; return; }
            document.getElementById('simMsg').textContent = '';

            // aggregate
            const agg = {};
            const colKeys = new Set(['TOTAL']);
            SIM_DATA.forEach(d => {
                const rKey = rows.map(r => d[r]).join(' | ');
                const cKey = cols.length ? cols.map(c => d[c]).join('|') : 'TOTAL';
                colKeys.add(cKey);
                if (!agg[rKey]) agg[rKey] = {};
                vals.forEach(v => {
                    if (!agg[rKey][cKey]) agg[rKey][cKey] = {};
                    if (!agg[rKey][cKey][v]) agg[rKey][cKey][v] = 0;
                    agg[rKey][cKey][v] += d[v];
                    if (!agg[rKey]['TOTAL']) agg[rKey]['TOTAL'] = {};
                    if (!agg[rKey]['TOTAL'][v]) agg[rKey]['TOTAL'][v] = 0;
                    agg[rKey]['TOTAL'][v] += d[v];
                });
            });

            const colArr = [...colKeys].filter(c => c !== 'TOTAL').sort();
            colArr.push('TOTAL');

            // build HTML
            const rowF = FIELDS.find(x => x.id === rows[0]);
            const valFs = vals.map(v => FIELDS.find(x => x.id === v));

            let thead = `<tr><th class="row-hd">${rowF.label}</th>`;
            colArr.forEach(c => {
                valFs.forEach(vf => {
                    thead += `<th>${c === 'TOTAL' ? 'Grand Total' : c}${vals.length > 1 ? ' (' + vf.label + ')' : ''}</th>`;
                });
            });
            thead += '</tr>';

            let tbody = '';
            const grandTotals = {};
            Object.keys(agg).sort().forEach(rk => {
                let tr = `<tr><td class="row-label">${rk}</td>`;
                colArr.forEach(c => {
                    valFs.forEach(vf => {
                        const v = agg[rk]?.[c]?.[vf.id] || 0;
                        if (!grandTotals[c + vf.id]) grandTotals[c + vf.id] = 0;
                        if (c !== 'TOTAL') grandTotals[c + vf.id] += v;
                        tr += `<td>${fmt2(v)}</td>`;
                    });
                });
                tr += '</tr>';
                tbody += tr;
            });

            // grand total row
            let gtRow = `<tr><td class="row-label total">Grand Total</td>`;
            let grandSum = 0;
            colArr.forEach(c => {
                valFs.forEach(vf => {
                    const v = c === 'TOTAL' ? Object.values(agg).reduce((s, r) => (r['TOTAL']?.[vf.id] || 0) + s, 0) : (grandTotals[c + vf.id] || 0);
                    if (c !== 'TOTAL' && vf.id === 'sales') grandSum += v;
                    gtRow += `<td class="total">${fmt2(v)}</td>`;
                });
            });
            gtRow += '</tr>';

            document.getElementById('pivotOutput').innerHTML = `<div style="overflow-x:auto"><table class="pv-table"><thead>${thead}</thead><tbody>${tbody}${gtRow}</tbody></table></div>`;

            // simple bar chart
            const chartData = Object.entries(agg).map(([k, v]) => ({ label: k, val: v['TOTAL']?.[vals[0]] || 0 })).sort((a, b) => b.val - a.val).slice(0, 6);
            const maxVal = Math.max(...chartData.map(d => d.val));
            const colors = ['#5c3d6e', '#a0485a', '#b07a30', '#2d7a72', '#4a5878', '#7a4f8c'];
            document.getElementById('chartPreview').innerHTML = `<div class="chart-area"><div class="bar-chart">${chartData.map((d, i) => `<div class="bar-row"><div class="bar-label">${d.label}</div><div class="bar-track"><div class="bar-fill" style="width:${maxVal ? d.val / maxVal * 100 : 0}%;background:${colors[i % colors.length]}"><span class="bar-val">${fmt2(d.val)}</span></div></div></div>`).join('')}</div></div>`;
        }

        function resetSim() { initSim(); }

        // Grouping demo
        const GROUP_DATA = [
            { month: 'Jan 2024', quarter: 'Q1 2024', year: '2024', sales: 2050000 },
            { month: 'Feb 2024', quarter: 'Q1 2024', year: '2024', sales: 1732000 },
            { month: 'Mar 2024', quarter: 'Q1 2024', year: '2024', sales: 2340000 },
            { month: 'Apr 2024', quarter: 'Q2 2024', year: '2024', sales: 1980000 },
            { month: 'Mei 2024', quarter: 'Q2 2024', year: '2024', sales: 2210000 },
            { month: 'Jun 2024', quarter: 'Q2 2024', year: '2024', sales: 1870000 },
        ];

        function showGroup(level) {
            ['month', 'quarter', 'year'].forEach(l => { document.getElementById('gb-' + l).classList.remove('primary'); document.getElementById('gb-' + l).className = 'sim-btn ghost'; });
            document.getElementById('gb-' + level).className = 'sim-btn primary';
            const res = document.getElementById('groupResult');
            if (level === 'month') {
                const rows = GROUP_DATA.map(d => `<tr><td class="row-label">${d.month}</td><td>${fmt2(d.sales)}</td></tr>`).join('');
                const tot = GROUP_DATA.reduce((s, d) => s + d.sales, 0);
                res.innerHTML = `<div style="overflow-x:auto"><table class="pv-table"><thead><tr><th class="row-hd">Bulan</th><th>Total Penjualan</th></tr></thead><tbody>${rows}<tr><td class="row-label total">Grand Total</td><td class="total">${fmt2(tot)}</td></tr></tbody></table></div>`;
            } else if (level === 'quarter') {
                const qtrs = {}; GROUP_DATA.forEach(d => { qtrs[d.quarter] = (qtrs[d.quarter] || 0) + d.sales; });
                const rows = Object.entries(qtrs).map(([q, v]) => `<tr><td class="row-label">${q}</td><td>${fmt2(v)}</td></tr>`).join('');
                const tot = Object.values(qtrs).reduce((s, v) => s + v, 0);
                res.innerHTML = `<div style="overflow-x:auto"><table class="pv-table"><thead><tr><th class="row-hd">Kuartal</th><th>Total Penjualan</th></tr></thead><tbody>${rows}<tr><td class="row-label total">Grand Total</td><td class="total">${fmt2(tot)}</td></tr></tbody></table></div>`;
            } else {
                const tot = GROUP_DATA.reduce((s, d) => s + d.sales, 0);
                res.innerHTML = `<div style="overflow-x:auto"><table class="pv-table"><thead><tr><th class="row-hd">Tahun</th><th>Total Penjualan</th></tr></thead><tbody><tr><td class="row-label">2024</td><td>${fmt2(tot)}</td></tr><tr><td class="row-label total">Grand Total</td><td class="total">${fmt2(tot)}</td></tr></tbody></table></div>`;
            }
        }

        // Slicer demo
        const SLICER_DATA = [
            { dept: 'IT', year: '2024', q: 'Q1', sales: 18500000 }, { dept: 'IT', year: '2024', q: 'Q2', sales: 21200000 },
            { dept: 'IT', year: '2025', q: 'Q1', sales: 22000000 }, { dept: 'Finance', year: '2024', q: 'Q1', sales: 12800000 },
            { dept: 'Finance', year: '2024', q: 'Q2', sales: 11500000 }, { dept: 'Finance', year: '2025', q: 'Q1', sales: 14200000 },
            { dept: 'Marketing', year: '2024', q: 'Q1', sales: 15200000 }, { dept: 'Marketing', year: '2024', q: 'Q2', sales: 17800000 },
            { dept: 'Marketing', year: '2025', q: 'Q1', sales: 19100000 }, { dept: 'HR', year: '2024', q: 'Q1', sales: 8500000 },
            { dept: 'HR', year: '2024', q: 'Q2', sales: 7900000 }, { dept: 'HR', year: '2025', q: 'Q1', sales: 9200000 },
        ];

        function initSlicer() {
            const depts = [...new Set(SLICER_DATA.map(d => d.dept))].sort();
            const years = [...new Set(SLICER_DATA.map(d => d.year))].sort();
            document.getElementById('slicerBtns').innerHTML = depts.map(d => `<button class="sim-btn ${slicerDept === d ? 'primary' : 'ghost'}" onclick="setSlicer('dept','${d}')">${d}</button>`).join('');
            document.getElementById('slicerYear').innerHTML = years.map(y => `<button class="sim-btn ${slicerYear === y ? 'primary' : 'ghost'}" onclick="setSlicer('year','${y}')">${y}</button>`).join('');
            renderSlicerOutput();
        }

        function setSlicer(type, val) {
            if (type === 'dept') slicerDept = slicerDept === val ? 'all' : val;
            else slicerYear = slicerYear === val ? 'all' : val;
            initSlicer();
        }

        function clearSlicer() { slicerDept = 'all'; slicerYear = 'all'; initSlicer(); }

        function renderSlicerOutput() {
            const filtered = SLICER_DATA.filter(d => (slicerDept === 'all' || d.dept === slicerDept) && (slicerYear === 'all' || d.year === slicerYear));
            const agg = {};
            filtered.forEach(d => { agg[d.dept] = (agg[d.dept] || 0) + d.sales; });
            if (!Object.keys(agg).length) { document.getElementById('slicerOutput').innerHTML = '<div class="pivot-empty" style="padding:20px;font-size:12px;"><div class="pe-icon" style="font-size:28px;">🔍</div><p>Tidak ada data untuk filter ini</p></div>'; return; }
            const rows = Object.entries(agg).sort().map(([k, v]) => `<tr><td class="row-label">${k}</td><td>${fmt2(v)}</td></tr>`).join('');
            const tot = Object.values(agg).reduce((s, v) => s + v, 0);
            const label = `${slicerDept !== 'all' ? slicerDept : 'Semua Dept'} · ${slicerYear !== 'all' ? slicerYear : 'Semua Tahun'}`;
            document.getElementById('slicerOutput').innerHTML = `<div style="font-size:11px;color:var(--text-dim);margin-bottom:8px;">📊 Filter aktif: <strong style="color:var(--plum)">${label}</strong></div><div style="overflow-x:auto"><table class="pv-table"><thead><tr><th class="row-hd">Dept</th><th>Total Sales</th></tr></thead><tbody>${rows}<tr><td class="row-label total">Grand Total</td><td class="total">${fmt2(tot)}</td></tr></tbody></table></div>`;
        }

        // ═══════════════════════════════════════════════════════
        //  QUIZ
        // ═══════════════════════════════════════════════════════
        function selQCat(cat, el) { quizCatSel = cat; document.querySelectorAll('.qcat').forEach(c => c.classList.remove('sel')); el.classList.add('sel'); }
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

        let currentQuizOptions = [];

        function renderQ() {
            if (quizIdx >= quizQs.length) { showResult(); return; }
            const q = quizQs[quizIdx];
            const pct = (quizIdx + 1) / quizQs.length * 100;
            document.getElementById('qpLbl').textContent = `${quizIdx + 1}/${quizQs.length}`;
            document.getElementById('qpFill2').style.width = pct + '%';
            document.getElementById('qpScore').textContent = quizScore;
            document.getElementById('qpQ').textContent = q.q;
            const ctx = document.getElementById('qpCtx');
            if (q.ctx) { ctx.textContent = q.ctx; ctx.style.display = 'block'; } else ctx.style.display = 'none';
            const ltrs = ['A', 'B', 'C', 'D'];
            currentQuizOptions = shuffle(q.opts.map((text, i) => ({ text, correct: i === q.ans })));
            document.getElementById('qpOpts').innerHTML = currentQuizOptions.map((o, i) => `<button class="qopt" onclick="ansQ(${i})"><span class="qopt-l">${ltrs[i]}</span>${o.text}</button>`).join('');
            document.getElementById('qpExp').className = 'qexp';
            document.getElementById('qpNext').className = 'qnext';
        }

        function ansQ(i) {
            const q = quizQs[quizIdx];
            const correctIdx = currentQuizOptions.findIndex(o => o.correct);
            document.querySelectorAll('.qopt').forEach(b => b.disabled = true);
            document.querySelectorAll('.qopt')[i].classList.add(i === correctIdx ? 'correct' : 'wrong');
            if (i !== correctIdx) document.querySelectorAll('.qopt')[correctIdx].classList.add('correct');
            if (i === correctIdx) quizScore++;
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
            const res = document.getElementById('qresult'); res.classList.add('on');
            const pct = Math.round(quizScore / quizQs.length * 100);
            document.getElementById('qrPct').textContent = pct + '%';
            document.getElementById('qrC').textContent = quizScore;
            document.getElementById('qrW').textContent = quizQs.length - quizScore;
            document.getElementById('qrT').textContent = quizQs.length;
            const msgs = [[80, '🎉 Luar Biasa!', 'Kamu sudah sangat menguasai PivotTable. Siap jadi data analyst profesional!'], [60, '👍 Solid!', 'Pemahaman kamu cukup baik. Review topik yang salah dan coba lagi.'], [40, '💪 Terus Belajar!', 'Masih ada yang perlu diperkuat. Baca materi dulu lalu quiz lagi.'], [0, '📚 Yuk Mulai!', 'Baca dulu materi di tab Belajar, lalu coba quiz ini kembali.']];
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

        // ═══════════════════════════════════════════════════════
        //  CHEAT SHEET
        // ═══════════════════════════════════════════════════════
        function renderCS() {
            const cats = [
                { key: 'create', label: '🏗️ Membuat Pivot', color: 'var(--plum)' },
                { key: 'field', label: '📐 Field & Area', color: 'var(--gold)' },
                { key: 'group', label: '🗂️ Grouping', color: 'var(--teal)' },
                { key: 'filter', label: '🔽 Filter & Slicer', color: 'var(--rose)' },
                { key: 'calc', label: '🧮 Calculated Field', color: 'var(--steel)' },
                { key: 'chart', label: '📈 Pivot Chart', color: 'var(--plum)' },
                { key: 'advanced', label: '⚙️ Tips Lanjutan', color: 'var(--steel)' },
            ];
            document.getElementById('csGrid').innerHTML = cats.map(c => {
                const list = TOPICS.filter(t => t.cat === c.key);
                return `<div class="cs-block"><div class="cs-hd" style="border-top:2px solid ${c.color}">${c.label}</div>
      ${list.map(t => `<div class="cs-row"><span class="cs-name">${t.icon} ${t.name}</span></div>`).join('')}
    </div>`;
            }).join('');
        }

        // ═══════════════════════════════════════════════════════
        //  TAB SWITCH
        // ═══════════════════════════════════════════════════════
        function switchTab(tab, btn) {
            curTab = tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            ['learn', 'sim', 'quiz', 'cheatsheet'].forEach(t => document.getElementById('tab-' + t).style.display = t === tab ? '' : 'none');
            if (tab === 'cheatsheet') renderCS();
        }

        // ═══════════════════════════════════════════════════════
        //  INIT
        // ═══════════════════════════════════════════════════════
        updateStats();
        renderTopics();
        initSim();
        initSlicer();
