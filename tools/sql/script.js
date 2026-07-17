        // ═══════════════════════════════════════════════════
        //  DATABASE
        // ═══════════════════════════════════════════════════
        var DB = {
            users: [
                { id: 1, name: "Budi Santoso", age: 28, dept: "IT", salary: 8500000 },
                { id: 2, name: "Sari Dewi", age: 34, dept: "Finance", salary: 7200000 },
                { id: 3, name: "Andi Pratama", age: 25, dept: "IT", salary: 6800000 },
                { id: 4, name: "Rini Susanti", age: 31, dept: "HR", salary: 6000000 },
                { id: 5, name: "Deni Kurnia", age: 42, dept: "Finance", salary: 9500000 },
                { id: 6, name: "Maya Putri", age: 27, dept: "Marketing", salary: 7000000 },
                { id: 7, name: "Fajar Nugroho", age: 38, dept: "IT", salary: 9200000 },
                { id: 8, name: "Lita Wulandari", age: 22, dept: "Marketing", salary: 5500000 },
                { id: 9, name: "Hendra Wijaya", age: 45, dept: "HR", salary: 8000000 },
                { id: 10, name: "Citra Lestari", age: 29, dept: "IT", salary: 7800000 }
            ],
            orders: [
                { id: 101, user_id: 1, product_id: 1, amount: 2500000, status: "paid", order_date: "2024-01-15" },
                { id: 102, user_id: 2, product_id: 3, amount: 1200000, status: "paid", order_date: "2024-01-18" },
                { id: 103, user_id: 1, product_id: 2, amount: 850000, status: "pending", order_date: "2024-02-03" },
                { id: 104, user_id: 3, product_id: 1, amount: 2500000, status: "paid", order_date: "2024-02-10" },
                { id: 105, user_id: 5, product_id: 4, amount: 3200000, status: "paid", order_date: "2024-02-14" },
                { id: 106, user_id: 4, product_id: 2, amount: 850000, status: "paid", order_date: "2024-02-20" },
                { id: 107, user_id: 6, product_id: 3, amount: 1200000, status: "pending", order_date: "2024-03-05" },
                { id: 108, user_id: 7, product_id: 1, amount: 2500000, status: "paid", order_date: "2024-03-12" },
                { id: 109, user_id: 2, product_id: 4, amount: 3200000, status: "paid", order_date: "2024-03-18" },
                { id: 110, user_id: 8, product_id: 2, amount: 850000, status: "paid", order_date: "2024-03-22" },
                { id: 111, user_id: 10, product_id: 3, amount: 1200000, status: "pending", order_date: "2024-04-01" },
                { id: 112, user_id: 5, product_id: 1, amount: 2500000, status: "paid", order_date: "2024-04-08" }
            ],
            products: [
                { id: 1, name: "Laptop Pro", category: "Electronics", price: 2500000, stock: 45 },
                { id: 2, name: "Mouse Wireless", category: "Electronics", price: 850000, stock: 120 },
                { id: 3, name: "Keyboard Mech", category: "Electronics", price: 1200000, stock: 80 },
                { id: 4, name: "Monitor 4K", category: "Electronics", price: 3200000, stock: 30 },
                { id: 5, name: "Webcam HD", category: "Electronics", price: 750000, stock: 65 }
            ],
            departments: [
                { id: 1, name: "IT", budget: 500000000, manager: "Fajar Nugroho" },
                { id: 2, name: "Finance", budget: 400000000, manager: "Deni Kurnia" },
                { id: 3, name: "HR", budget: 250000000, manager: "Hendra Wijaya" },
                { id: 4, name: "Marketing", budget: 350000000, manager: "Maya Putri" }
            ]
        };

        // ═══════════════════════════════════════════════════
        //  LEARN DATA  (syntax as plain strings, no backticks)
        // ═══════════════════════════════════════════════════
        var LEARN = [
            {
                id: "select", cat: "basic", icon: "🟢", iconBg: "rgba(61,214,140,0.12)",
                name: "SELECT & FROM", catLabel: "SQL Dasar",
                short: "Perintah paling dasar untuk mengambil data dari tabel",
                tags: ["core"],
                syntax: '<span class="kw">SELECT</span> col1, col2\n<span class="kw">FROM</span> table_name;\n\n<span class="cm">-- Semua kolom:</span>\n<span class="kw">SELECT</span> * <span class="kw">FROM</span> table_name;',
                example: '<span class="kw">SELECT</span> id, name, dept\n<span class="kw">FROM</span> users;',
                result: { cols: ["id", "name", "dept"], rows: [["1", "Budi Santoso", "IT"], ["2", "Sari Dewi", "Finance"], ["3", "Andi Pratama", "IT"]], note: "3 kolom dari tabel users" },
                tip: "SELECT * mengambil semua kolom. Lebih baik sebutkan kolom spesifik untuk performa lebih baik di production.",
                notes: "SELECT dan FROM adalah pondasi semua query SQL. Urutan clause harus tepat.",
                mistakes: ["Lupa semicolon (;) di akhir query", "Salah nama tabel atau kolom"]
            },
            {
                id: "alias", cat: "basic", icon: "🟢", iconBg: "rgba(61,214,140,0.12)",
                name: "ALIAS (AS)", catLabel: "SQL Dasar",
                short: "Beri nama sementara pada kolom atau tabel",
                tags: ["core"],
                syntax: '<span class="kw">SELECT</span> column <span class="kw">AS</span> alias_name\n<span class="kw">FROM</span> table_name <span class="kw">AS</span> t;',
                example: '<span class="kw">SELECT</span>\n  name <span class="kw">AS</span> nama_lengkap,\n  dept <span class="kw">AS</span> departemen,\n  salary <span class="kw">AS</span> gaji\n<span class="kw">FROM</span> users;',
                result: { cols: ["nama_lengkap", "departemen", "gaji"], rows: [["Budi Santoso", "IT", "8500000"], ["Sari Dewi", "Finance", "7200000"]], note: "Nama kolom di output berubah sesuai alias" },
                tip: "Alias tabel sangat berguna saat JOIN — ganti nama panjang jadi satu huruf seperti u untuk users.",
                notes: "Alias hanya berlaku dalam query tersebut. Nama kolom asli di tabel tidak berubah.",
                mistakes: ["Pakai alias di WHERE (tidak bisa) — alias hanya bisa di SELECT dan ORDER BY"]
            },
            {
                id: "where", cat: "filter", icon: "🔵", iconBg: "rgba(96,165,250,0.12)",
                name: "WHERE", catLabel: "Filter & Kondisi",
                short: "Filter baris berdasarkan kondisi tertentu",
                tags: ["core", "filter"],
                syntax: '<span class="kw">SELECT</span> * <span class="kw">FROM</span> table\n<span class="kw">WHERE</span> condition;\n\n<span class="cm">-- Operator: =  !=  &gt;  &lt;  &gt;=  &lt;=</span>',
                example: '<span class="kw">SELECT</span> name, age, dept\n<span class="kw">FROM</span> users\n<span class="kw">WHERE</span> age <span class="op">&gt;</span> <span class="num">30</span>;',
                result: { cols: ["name", "age", "dept"], rows: [["Sari Dewi", "34", "Finance"], ["Deni Kurnia", "42", "Finance"], ["Fajar Nugroho", "38", "IT"], ["Hendra Wijaya", "45", "HR"]], note: "Hanya baris dengan age > 30" },
                tip: "WHERE dijalankan sebelum SELECT — tidak bisa pakai alias dari SELECT di dalam WHERE.",
                notes: "Kondisi string harus dalam tanda kutip tunggal. Angka tidak perlu tanda kutip.",
                mistakes: ["Pakai kutip ganda untuk string", "WHERE setelah GROUP BY — harusnya HAVING"]
            },
            {
                id: "and_or", cat: "filter", icon: "🔵", iconBg: "rgba(96,165,250,0.12)",
                name: "AND, OR, NOT", catLabel: "Filter & Kondisi",
                short: "Kombinasikan beberapa kondisi dalam WHERE",
                tags: ["core", "filter"],
                syntax: '<span class="kw">WHERE</span> cond1 <span class="kw">AND</span> cond2\n<span class="kw">WHERE</span> cond1 <span class="kw">OR</span> cond2\n<span class="kw">WHERE</span> <span class="kw">NOT</span> condition',
                example: "<span class=\"kw\">SELECT</span> name, dept, salary\n<span class=\"kw\">FROM</span> users\n<span class=\"kw\">WHERE</span> dept <span class=\"op\">=</span> <span class=\"str\">'IT'</span>\n  <span class=\"kw\">AND</span> salary <span class=\"op\">&gt;=</span> <span class=\"num\">8000000</span>;",
                result: { cols: ["name", "dept", "salary"], rows: [["Budi Santoso", "IT", "8500000"], ["Fajar Nugroho", "IT", "9200000"]], note: "Karyawan IT dengan gaji >= 8 juta" },
                tip: "Gunakan kurung untuk kontrol prioritas: WHERE (a OR b) AND c berbeda dengan WHERE a OR (b AND c).",
                notes: "AND lebih prioritas dari OR. Selalu pakai kurung untuk kondisi kompleks.",
                mistakes: ["WHERE dept='IT' OR dept='Finance' AND salary>8000000 — AND dieksekusi dulu, hasil bisa berbeda dari ekspektasi"]
            },
            {
                id: "like", cat: "filter", icon: "🔵", iconBg: "rgba(96,165,250,0.12)",
                name: "LIKE & Wildcard", catLabel: "Filter & Kondisi",
                short: "Cari data berdasarkan pola teks",
                tags: ["filter"],
                syntax: "<span class=\"kw\">WHERE</span> column <span class=\"kw\">LIKE</span> <span class=\"str\">'pattern'</span>\n\n<span class=\"cm\">-- % = karakter apa saja\n-- _ = satu karakter</span>",
                example: "<span class=\"kw\">SELECT</span> name, dept\n<span class=\"kw\">FROM</span> users\n<span class=\"kw\">WHERE</span> name <span class=\"kw\">LIKE</span> <span class=\"str\">'%Dewi%'</span>\n   <span class=\"kw\">OR</span> name <span class=\"kw\">LIKE</span> <span class=\"str\">'A%'</span>;",
                result: { cols: ["name", "dept"], rows: [["Sari Dewi", "Finance"], ["Andi Pratama", "IT"]], note: "% cocokkan semua karakter di posisi tersebut" },
                tip: "LIKE bisa lambat pada data besar tanpa index. Pertimbangkan FULL TEXT SEARCH untuk pencarian kompleks.",
                notes: "LIKE biasanya case-insensitive di MySQL tapi case-sensitive di PostgreSQL.",
                mistakes: ["WHERE name LIKE 'Budi' tanpa % hanya cocok jika nama persis 'Budi'"]
            },
            {
                id: "in_between", cat: "filter", icon: "🔵", iconBg: "rgba(96,165,250,0.12)",
                name: "IN, BETWEEN, IS NULL", catLabel: "Filter & Kondisi",
                short: "Filter dengan daftar nilai, range, atau nilai kosong",
                tags: ["filter"],
                syntax: "<span class=\"kw\">WHERE</span> col <span class=\"kw\">IN</span> (val1, val2, val3)\n<span class=\"kw\">WHERE</span> col <span class=\"kw\">BETWEEN</span> a <span class=\"kw\">AND</span> b\n<span class=\"kw\">WHERE</span> col <span class=\"kw\">IS NULL</span>",
                example: "<span class=\"kw\">SELECT</span> name, dept, age\n<span class=\"kw\">FROM</span> users\n<span class=\"kw\">WHERE</span> dept <span class=\"kw\">IN</span> (<span class=\"str\">'IT'</span>, <span class=\"str\">'Finance'</span>)\n  <span class=\"kw\">AND</span> age <span class=\"kw\">BETWEEN</span> <span class=\"num\">25</span> <span class=\"kw\">AND</span> <span class=\"num\">35</span>;",
                result: { cols: ["name", "dept", "age"], rows: [["Budi Santoso", "IT", "28"], ["Sari Dewi", "Finance", "34"], ["Andi Pratama", "IT", "25"], ["Citra Lestari", "IT", "29"]], note: "Dept IT atau Finance, usia 25-35" },
                tip: "IN lebih rapi dari banyak OR. BETWEEN bersifat inklusif (termasuk nilai batas).",
                notes: "IS NULL != = NULL. Selalu pakai IS NULL untuk cek nilai null.",
                mistakes: ["WHERE col = NULL (salah!) — harus WHERE col IS NULL"]
            },
            {
                id: "orderby", cat: "basic", icon: "🟢", iconBg: "rgba(61,214,140,0.12)",
                name: "ORDER BY", catLabel: "SQL Dasar",
                short: "Urutkan hasil query berdasarkan satu atau beberapa kolom",
                tags: ["core"],
                syntax: '<span class="kw">SELECT</span> * <span class="kw">FROM</span> table\n<span class="kw">ORDER BY</span> col1 <span class="kw">ASC</span>, col2 <span class="kw">DESC</span>;\n<span class="cm">-- ASC = kecil ke besar (default)\n-- DESC = besar ke kecil</span>',
                example: '<span class="kw">SELECT</span> name, dept, salary\n<span class="kw">FROM</span> users\n<span class="kw">ORDER BY</span> dept <span class="kw">ASC</span>, salary <span class="kw">DESC</span>;',
                result: { cols: ["name", "dept", "salary"], rows: [["Deni Kurnia", "Finance", "9500000"], ["Sari Dewi", "Finance", "7200000"], ["Hendra Wijaya", "HR", "8000000"], ["Fajar Nugroho", "IT", "9200000"]], note: "A-Z per dept, gaji terbesar dulu" },
                tip: "ORDER BY bisa pakai nomor kolom: ORDER BY 2, 3 — tapi gunakan nama kolom agar lebih jelas.",
                notes: "ORDER BY dieksekusi paling akhir dalam urutan SQL.",
                mistakes: ["ORDER BY di subquery tidak dijamin urutannya di semua database"]
            },
            {
                id: "limit", cat: "basic", icon: "🟢", iconBg: "rgba(61,214,140,0.12)",
                name: "LIMIT & OFFSET", catLabel: "SQL Dasar",
                short: "Batasi jumlah baris hasil, berguna untuk paginasi",
                tags: ["core"],
                syntax: '<span class="kw">SELECT</span> * <span class="kw">FROM</span> table <span class="kw">LIMIT</span> n;\n<span class="cm">-- Paginasi:</span>\n<span class="kw">LIMIT</span> n <span class="kw">OFFSET</span> m;',
                example: '<span class="kw">SELECT</span> name, salary\n<span class="kw">FROM</span> users\n<span class="kw">ORDER BY</span> salary <span class="kw">DESC</span>\n<span class="kw">LIMIT</span> <span class="num">3</span>;',
                result: { cols: ["name", "salary"], rows: [["Deni Kurnia", "9500000"], ["Fajar Nugroho", "9200000"], ["Budi Santoso", "8500000"]], note: "Top 3 gaji tertinggi" },
                tip: "Selalu kombinasikan LIMIT dengan ORDER BY — tanpa ORDER BY urutan tidak konsisten.",
                notes: "Syntax berbeda di SQL Server: TOP n. Di Oracle: FETCH FIRST n ROWS ONLY.",
                mistakes: ["LIMIT tanpa ORDER BY — hasil tidak konsisten antar eksekusi"]
            },
            {
                id: "count_sum", cat: "agg", icon: "🟣", iconBg: "rgba(167,139,250,0.12)",
                name: "COUNT, SUM, AVG, MAX, MIN", catLabel: "Aggregation",
                short: "Fungsi untuk meringkas banyak baris menjadi satu nilai",
                tags: ["core", "agg"],
                syntax: '<span class="fn">COUNT</span>(*) <span class="cm">-- hitung semua baris</span>\n<span class="fn">COUNT</span>(col) <span class="cm">-- hitung non-null</span>\n<span class="fn">SUM</span>(col) | <span class="fn">AVG</span>(col)\n<span class="fn">MAX</span>(col) | <span class="fn">MIN</span>(col)',
                example: '<span class="kw">SELECT</span>\n  <span class="fn">COUNT</span>(*) <span class="kw">AS</span> total,\n  <span class="fn">AVG</span>(salary) <span class="kw">AS</span> rata_gaji,\n  <span class="fn">MAX</span>(salary) <span class="kw">AS</span> tertinggi\n<span class="kw">FROM</span> users;',
                result: { cols: ["total", "rata_gaji", "tertinggi"], rows: [["10", "7550000", "9500000"]], note: "Satu baris ringkasan dari seluruh tabel" },
                tip: "COUNT(*) menghitung semua baris termasuk NULL. COUNT(kolom) hanya non-NULL.",
                notes: "Fungsi agregasi tidak bisa dipakai bersama kolom biasa tanpa GROUP BY.",
                mistakes: ["SELECT name, COUNT(*) FROM users — error! Harus ada GROUP BY name"]
            },
            {
                id: "groupby", cat: "agg", icon: "🟣", iconBg: "rgba(167,139,250,0.12)",
                name: "GROUP BY", catLabel: "Aggregation",
                short: "Kelompokkan baris berdasarkan nilai kolom, lalu agregasi tiap grup",
                tags: ["core", "agg"],
                syntax: '<span class="kw">SELECT</span> column, <span class="fn">AGG</span>(col)\n<span class="kw">FROM</span> table\n<span class="kw">GROUP BY</span> column\n<span class="kw">ORDER BY</span> ...;',
                example: '<span class="kw">SELECT</span>\n  dept,\n  <span class="fn">COUNT</span>(*) <span class="kw">AS</span> total,\n  <span class="fn">AVG</span>(salary) <span class="kw">AS</span> avg_sal\n<span class="kw">FROM</span> users\n<span class="kw">GROUP BY</span> dept\n<span class="kw">ORDER BY</span> avg_sal <span class="kw">DESC</span>;',
                result: { cols: ["dept", "total", "avg_sal"], rows: [["Finance", "2", "8350000"], ["IT", "4", "8075000"], ["HR", "2", "7000000"], ["Marketing", "2", "6250000"]], note: "Ringkasan per departemen" },
                tip: "Setiap kolom di SELECT yang bukan fungsi agregasi HARUS ada di GROUP BY.",
                notes: "Urutan eksekusi: FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT.",
                mistakes: ["SELECT dept, name, COUNT(*) GROUP BY dept — error! name harus ada di GROUP BY"]
            },
            {
                id: "having", cat: "agg", icon: "🟣", iconBg: "rgba(167,139,250,0.12)",
                name: "HAVING", catLabel: "Aggregation",
                short: "Filter SETELAH GROUP BY — filter hasil agregasi",
                tags: ["agg"],
                syntax: '<span class="kw">SELECT</span> col, <span class="fn">AGG</span>(col)\n<span class="kw">FROM</span> table\n<span class="kw">GROUP BY</span> col\n<span class="kw">HAVING</span> <span class="fn">AGG</span>(col) condition;',
                example: '<span class="kw">SELECT</span> dept,\n  <span class="fn">COUNT</span>(*) <span class="kw">AS</span> total,\n  <span class="fn">AVG</span>(salary) <span class="kw">AS</span> avg_sal\n<span class="kw">FROM</span> users\n<span class="kw">GROUP BY</span> dept\n<span class="kw">HAVING</span> <span class="fn">AVG</span>(salary) <span class="op">&gt;</span> <span class="num">7000000</span>;',
                result: { cols: ["dept", "total", "avg_sal"], rows: [["Finance", "2", "8350000"], ["IT", "4", "8075000"], ["HR", "2", "7000000"]], note: "Dept dengan rata-rata gaji > 7 juta" },
                tip: "WHERE = filter sebelum GROUP BY. HAVING = filter setelah GROUP BY (hasil agregasi).",
                notes: "HAVING dieksekusi setelah GROUP BY. WHERE tidak bisa pakai fungsi agregasi.",
                mistakes: ["WHERE AVG(salary) > X — tidak bisa! Harus HAVING"]
            },
            {
                id: "inner_join", cat: "join", icon: "🟡", iconBg: "rgba(251,191,36,0.12)",
                name: "INNER JOIN", catLabel: "JOIN",
                short: "Gabungkan dua tabel — hanya tampilkan baris yang ada di KEDUA tabel",
                tags: ["core", "join"],
                syntax: '<span class="kw">SELECT</span> t1.col, t2.col\n<span class="kw">FROM</span> table1 t1\n<span class="kw">INNER JOIN</span> table2 t2\n  <span class="kw">ON</span> t1.key <span class="op">=</span> t2.key;',
                example: '<span class="kw">SELECT</span> u.name, u.dept,\n  o.amount, o.status\n<span class="kw">FROM</span> users u\n<span class="kw">INNER JOIN</span> orders o\n  <span class="kw">ON</span> u.id <span class="op">=</span> o.user_id\n<span class="kw">ORDER BY</span> o.amount <span class="kw">DESC</span>;',
                result: { cols: ["name", "dept", "amount", "status"], rows: [["Deni Kurnia", "Finance", "3200000", "paid"], ["Sari Dewi", "Finance", "3200000", "paid"], ["Budi Santoso", "IT", "2500000", "paid"], ["Andi Pratama", "IT", "2500000", "paid"]], note: "Hanya user yang punya order" },
                tip: "INNER JOIN = irisan. User tanpa order tidak muncul. Gunakan LEFT JOIN jika ingin semua user.",
                notes: "JOIN tanpa kondisi ON menghasilkan Cartesian Product — sangat berbahaya untuk data besar!",
                mistakes: ["JOIN tanpa ON — Cartesian Product!", "Tidak pakai alias saat ada nama kolom sama di dua tabel"]
            },
            {
                id: "left_join", cat: "join", icon: "🟡", iconBg: "rgba(251,191,36,0.12)",
                name: "LEFT JOIN", catLabel: "JOIN",
                short: "Tampilkan SEMUA baris dari tabel kiri, dan data tabel kanan jika ada",
                tags: ["core", "join"],
                syntax: '<span class="kw">SELECT</span> t1.col, t2.col\n<span class="kw">FROM</span> table1 t1\n<span class="kw">LEFT JOIN</span> table2 t2\n  <span class="kw">ON</span> t1.key <span class="op">=</span> t2.key;\n<span class="cm">-- t2 kolom = NULL jika tidak match</span>',
                example: '<span class="kw">SELECT</span> u.name,\n  <span class="fn">COUNT</span>(o.id) <span class="kw">AS</span> orders,\n  <span class="fn">SUM</span>(o.amount) <span class="kw">AS</span> total\n<span class="kw">FROM</span> users u\n<span class="kw">LEFT JOIN</span> orders o\n  <span class="kw">ON</span> u.id <span class="op">=</span> o.user_id\n<span class="kw">GROUP BY</span> u.id, u.name\n<span class="kw">ORDER BY</span> total <span class="kw">DESC</span>;',
                result: { cols: ["name", "orders", "total"], rows: [["Deni Kurnia", "2", "5700000"], ["Sari Dewi", "2", "4400000"], ["Budi Santoso", "2", "3350000"], ["Lita Wulandari", "1", "850000"], ["Rini Susanti", "1", "850000"]], note: "Semua user muncul termasuk yang belum order" },
                tip: "LEFT JOIN adalah yang paling sering dipakai: semua dari kiri + yang cocok dari kanan.",
                notes: "NULL di kolom kanan berarti tidak ada match. Gunakan COALESCE(col, 0) untuk handle NULL.",
                mistakes: ["Tidak pakai COALESCE untuk handle NULL sehingga SUM menghasilkan NULL bukan 0"]
            },
            {
                id: "subquery", cat: "adv", icon: "🔴", iconBg: "rgba(248,113,113,0.12)",
                name: "Subquery", catLabel: "Lanjutan",
                short: "Query di dalam query — bisa di SELECT, FROM, atau WHERE",
                tags: ["adv"],
                syntax: '<span class="cm">-- Subquery di WHERE:</span>\n<span class="kw">WHERE</span> col <span class="op">=</span> (<span class="kw">SELECT</span> <span class="fn">MAX</span>(col) <span class="kw">FROM</span> t)\n\n<span class="cm">-- Subquery di FROM:</span>\n<span class="kw">FROM</span> (<span class="kw">SELECT</span> ... <span class="kw">FROM</span> ...) <span class="kw">AS</span> alias',
                example: '<span class="kw">SELECT</span> name, salary\n<span class="kw">FROM</span> users\n<span class="kw">WHERE</span> salary <span class="op">&gt;</span> (\n  <span class="kw">SELECT</span> <span class="fn">AVG</span>(salary)\n  <span class="kw">FROM</span> users\n);',
                result: { cols: ["name", "salary"], rows: [["Budi Santoso", "8500000"], ["Deni Kurnia", "9500000"], ["Fajar Nugroho", "9200000"], ["Hendra Wijaya", "8000000"], ["Citra Lestari", "7800000"]], note: "Gaji di atas rata-rata (7.550.000)" },
                tip: "Subquery yang dipakai berulang bisa dijadikan CTE (WITH clause) agar lebih mudah dibaca.",
                notes: "Subquery yang mengembalikan lebih dari satu nilai perlu IN, ANY, atau ALL — bukan =.",
                mistakes: ["Subquery mengembalikan >1 baris saat dipakai dengan = — harusnya pakai IN"]
            },
            {
                id: "case_when", cat: "adv", icon: "🔴", iconBg: "rgba(248,113,113,0.12)",
                name: "CASE WHEN & DISTINCT", catLabel: "Lanjutan",
                short: "Kondisi if-else dalam query dan menghapus duplikat dari hasil",
                tags: ["adv"],
                syntax: '<span class="kw">SELECT DISTINCT</span> col <span class="kw">FROM</span> table;\n\n<span class="kw">SELECT</span>\n  <span class="kw">CASE</span>\n    <span class="kw">WHEN</span> cond1 <span class="kw">THEN</span> result1\n    <span class="kw">WHEN</span> cond2 <span class="kw">THEN</span> result2\n    <span class="kw">ELSE</span> default\n  <span class="kw">END</span> <span class="kw">AS</span> alias',
                example: '<span class="kw">SELECT</span> name, salary,\n  <span class="kw">CASE</span>\n    <span class="kw">WHEN</span> salary <span class="op">&gt;=</span> <span class="num">9000000</span> <span class="kw">THEN</span> <span class="str">\'Senior\'</span>\n    <span class="kw">WHEN</span> salary <span class="op">&gt;=</span> <span class="num">7000000</span> <span class="kw">THEN</span> <span class="str">\'Middle\'</span>\n    <span class="kw">ELSE</span> <span class="str">\'Junior\'</span>\n  <span class="kw">END</span> <span class="kw">AS</span> level\n<span class="kw">FROM</span> users;',
                result: { cols: ["name", "salary", "level"], rows: [["Budi Santoso", "8500000", "Middle"], ["Deni Kurnia", "9500000", "Senior"], ["Fajar Nugroho", "9200000", "Senior"], ["Lita Wulandari", "5500000", "Junior"]], note: "Kolom level baru berdasarkan kondisi gaji" },
                tip: "CASE WHEN bisa dipakai di SELECT, ORDER BY, dan GROUP BY — sangat fleksibel.",
                notes: "SELECT DISTINCT bisa memperlambat query karena perlu deduplikasi. Gunakan hanya jika perlu.",
                mistakes: ["Lupa ELSE di CASE WHEN — hasilnya NULL jika tidak ada kondisi yang cocok"]
            }
        ];

        // ═══════════════════════════════════════════════════
        //  PRACTICE DATA
        // ═══════════════════════════════════════════════════
        var PRACTICE = [
            {
                id: "p1", cat: "basic", formula: "SELECT *", level: "easy",
                scenario: "Tampilkan semua kolom dari tabel users.",
                q: "Tulis query untuk menampilkan semua data dari tabel users:",
                hint: "Gunakan SELECT * untuk semua kolom, FROM untuk nama tabel",
                answers: ["select * from users"],
                exp: "SELECT * FROM users; — tanda * berarti semua kolom."
            },
            {
                id: "p2", cat: "basic", formula: "SELECT columns", level: "easy",
                scenario: "Tampilkan hanya kolom name dan dept dari tabel users.",
                q: "Tampilkan kolom name dan dept saja:",
                hint: "Sebutkan nama kolom yang diinginkan, pisah dengan koma",
                answers: ["select name, dept from users", "select name,dept from users"],
                exp: "SELECT name, dept FROM users; — sebutkan kolom spesifik, bukan SELECT *."
            },
            {
                id: "p3", cat: "filter", formula: "WHERE", level: "easy",
                scenario: "Tampilkan karyawan dari departemen IT saja.",
                q: "Filter data users hanya untuk dept = IT:",
                hint: "Gunakan WHERE, nilai string dalam tanda kutip tunggal",
                answers: ["select * from users where dept = 'it'", "select * from users where dept='it'"],
                exp: "SELECT * FROM users WHERE dept = 'IT'; — string selalu dalam tanda kutip tunggal."
            },
            {
                id: "p4", cat: "filter", formula: "WHERE + AND", level: "easy",
                scenario: "Tampilkan karyawan IT yang berusia di atas 25 tahun.",
                q: "Query dengan dua kondisi: dept IT dan age > 25:",
                hint: "Gunakan AND untuk menggabungkan dua kondisi",
                answers: ["select * from users where dept = 'it' and age > 25", "select name, dept, age from users where dept = 'it' and age > 25"],
                exp: "SELECT * FROM users WHERE dept = 'IT' AND age > 25; — AND memastikan kedua kondisi terpenuhi."
            },
            {
                id: "p5", cat: "basic", formula: "ORDER BY DESC", level: "easy",
                scenario: "Tampilkan semua user diurutkan dari salary terbesar ke terkecil.",
                q: "Query dengan pengurutan salary descending:",
                hint: "ORDER BY nama_kolom DESC untuk urutan terbesar ke terkecil",
                answers: ["select * from users order by salary desc", "select name, salary from users order by salary desc"],
                exp: "SELECT * FROM users ORDER BY salary DESC; — DESC = descending (besar ke kecil)."
            },
            {
                id: "p6", cat: "agg", formula: "GROUP BY + COUNT", level: "med",
                scenario: "Hitung jumlah karyawan per departemen.",
                q: "Query GROUP BY untuk hitung karyawan per dept:",
                hint: "GROUP BY dept, lalu COUNT(*) untuk hitung jumlah baris",
                answers: ["select dept, count(*) from users group by dept", "select dept, count(*) as total from users group by dept"],
                exp: "SELECT dept, COUNT(*) FROM users GROUP BY dept; — setiap kolom non-agregasi harus ada di GROUP BY."
            },
            {
                id: "p7", cat: "agg", formula: "HAVING", level: "med",
                scenario: "Tampilkan departemen yang rata-rata gajinya lebih dari 7 juta.",
                q: "Query GROUP BY dept dengan filter HAVING AVG salary > 7000000:",
                hint: "Gunakan GROUP BY dept, AVG(salary), lalu HAVING untuk filter setelah GROUP BY",
                answers: ["select dept, avg(salary) from users group by dept having avg(salary) > 7000000", "select dept, avg(salary) as avg_sal from users group by dept having avg(salary) > 7000000"],
                exp: "HAVING dipakai setelah GROUP BY untuk filter hasil agregasi. WHERE tidak bisa pakai fungsi agregasi."
            },
            {
                id: "p8", cat: "join", formula: "INNER JOIN", level: "med",
                scenario: "Tampilkan nama user beserta amount pesanan mereka.",
                q: "Query INNER JOIN antara users dan orders:",
                hint: "JOIN ON u.id = o.user_id, pilih kolom u.name dan o.amount",
                answers: ["select u.name, o.amount from users u inner join orders o on u.id = o.user_id", "select u.name, o.amount from users u join orders o on u.id = o.user_id"],
                exp: "INNER JOIN hanya menampilkan baris yang ada match di kedua tabel. User tanpa order tidak muncul."
            },
            {
                id: "p9", cat: "filter", formula: "WHERE IN", level: "med",
                scenario: "Tampilkan karyawan dari IT, Finance, atau Marketing saja.",
                q: "Gunakan WHERE IN untuk filter tiga departemen:",
                hint: "IN ('val1', 'val2', 'val3') lebih ringkas dari tiga kondisi OR",
                answers: ["select * from users where dept in ('it', 'finance', 'marketing')", "select name, dept from users where dept in ('it', 'finance', 'marketing')"],
                exp: "WHERE dept IN ('IT','Finance','Marketing') lebih bersih dari tiga kondisi OR."
            },
            {
                id: "p10", cat: "agg", formula: "Subquery", level: "hard",
                scenario: "Tampilkan karyawan yang gajinya di atas rata-rata semua karyawan.",
                q: "Query dengan subquery untuk mendapatkan rata-rata, lalu filter:",
                hint: "WHERE salary > (SELECT AVG(salary) FROM users)",
                answers: ["select name, salary from users where salary > (select avg(salary) from users)"],
                exp: "Subquery menghasilkan satu angka (rata-rata), lalu dipakai sebagai threshold di WHERE outer query."
            }
        ];

        // ═══════════════════════════════════════════════════
        //  QUIZ DATA
        // ═══════════════════════════════════════════════════
        var QUIZ = [
            {
                cat: "basic", q: "Apa fungsi tanda * dalam query SELECT * FROM users?", ctx: "",
                opts: ["Mengalikan semua nilai", "Mengambil semua kolom dari tabel", "Mengambil baris pertama saja", "Menghapus duplikat"],
                ans: 1, exp: "SELECT * berarti pilih semua kolom. Di production sebaiknya sebutkan kolom spesifik untuk performa lebih baik."
            },
            {
                cat: "filter", q: "Query mana yang benar untuk mencari user dengan nama mengandung kata 'Dewi'?", ctx: "",
                opts: ["WHERE name = 'Dewi'", "WHERE name CONTAINS 'Dewi'", "WHERE name LIKE '%Dewi%'", "WHERE name = '%Dewi%'"],
                ans: 2, exp: "LIKE '%Dewi%' mencari 'Dewi' di posisi mana saja. % adalah wildcard yang cocokkan nol atau lebih karakter."
            },
            {
                cat: "basic", q: "Apa perbedaan ORDER BY ASC dan DESC?", ctx: "",
                opts: ["ASC = terbaru, DESC = terlama", "ASC = A-Z / kecil ke besar (default), DESC = Z-A / besar ke kecil", "ASC lebih cepat", "Tidak ada perbedaan"],
                ans: 1, exp: "ASC = urutan naik (A→Z, 1→100). DESC = urutan turun (Z→A, 100→1). Default ORDER BY adalah ASC."
            },
            {
                cat: "agg", q: "Kapan menggunakan HAVING bukan WHERE?", ctx: "",
                opts: ["HAVING untuk teks, WHERE untuk angka", "HAVING untuk filter setelah GROUP BY, WHERE untuk filter sebelum GROUP BY", "HAVING lebih cepat", "Keduanya bisa dipakai di posisi yang sama"],
                ans: 1, exp: "WHERE dieksekusi SEBELUM GROUP BY. HAVING dieksekusi SETELAH GROUP BY — khusus untuk filter hasil agregasi."
            },
            {
                cat: "join", q: "Apa hasil INNER JOIN antara dua tabel?", ctx: "",
                opts: ["Semua baris tabel A + baris tabel B yang cocok", "Semua baris dari kedua tabel", "Hanya baris yang ada match di KEDUA tabel", "Semua baris tabel B + baris A yang cocok"],
                ans: 2, exp: "INNER JOIN = irisan. Hanya baris yang ada kecocokan di kedua tabel yang ditampilkan."
            },
            {
                cat: "agg", q: "SELECT dept, COUNT(*) FROM users GROUP BY dept — artinya?", ctx: "",
                opts: ["Hitung total seluruh baris", "Hitung jumlah karyawan untuk setiap departemen", "Filter users berdasarkan dept", "Urutkan users berdasarkan dept"],
                ans: 1, exp: "GROUP BY dept mengelompokkan baris per nilai dept. COUNT(*) menghitung jumlah baris di setiap kelompok."
            },
            {
                cat: "filter", q: "Perbedaan WHERE col = NULL dan WHERE col IS NULL?", ctx: "",
                opts: ["Tidak ada perbedaan", "WHERE col = NULL selalu menghasilkan FALSE di SQL; harus pakai IS NULL", "IS NULL lebih lambat", "= NULL lebih akurat"],
                ans: 1, exp: "NULL tidak bisa dibandingkan dengan =. NULL = NULL menghasilkan NULL bukan TRUE. Selalu gunakan IS NULL."
            },
            {
                cat: "join", q: "Jika user_id 5 ada di tabel users tapi tidak punya order, apa yang terjadi dengan LEFT JOIN?", ctx: "SELECT u.name, o.amount FROM users u LEFT JOIN orders o ON u.id = o.user_id",
                opts: ["User id 5 tidak muncul", "User id 5 muncul dengan amount = NULL", "Query error", "User id 5 muncul dengan amount = 0"],
                ans: 1, exp: "LEFT JOIN mempertahankan SEMUA baris dari tabel kiri. Jika tidak ada match di kanan, kolom kanan berisi NULL."
            },
            {
                cat: "basic", q: "Apa fungsi SELECT DISTINCT?", ctx: "",
                opts: ["Mengurutkan hasil", "Menghapus baris duplikat dari hasil query", "Memilih satu baris random", "Menggabungkan dua tabel"],
                ans: 1, exp: "SELECT DISTINCT menghapus baris duplikat. Misal: SELECT DISTINCT dept FROM users — hanya tampilkan dept unik."
            },
            {
                cat: "agg", q: "Mana yang BENAR untuk rata-rata gaji per dept hanya untuk dept dengan rata-rata > 7 juta?", ctx: "",
                opts: ["SELECT dept, AVG(salary) FROM users WHERE AVG(salary) > 7000000 GROUP BY dept",
                    "SELECT dept, AVG(salary) FROM users GROUP BY dept HAVING AVG(salary) > 7000000",
                    "SELECT dept, AVG(salary) FROM users HAVING AVG(salary) > 7000000",
                    "SELECT dept, AVG(salary) FROM users GROUP BY dept WHERE AVG(salary) > 7000000"],
                ans: 1, exp: "HAVING adalah cara yang benar untuk filter setelah GROUP BY. WHERE tidak bisa pakai fungsi agregasi."
            }
        ];

        // ═══════════════════════════════════════════════════
        //  STATE
        // ═══════════════════════════════════════════════════
        var learned = JSON.parse(localStorage.getItem("sql_learned") || "[]");
        var pracDone = JSON.parse(localStorage.getItem("sql_pracdone") || "[]");
        var curFilter = "all";
        var curSearch = "";
        var curTab = "learn";
        var openExp = null;
        var quizCatSel = "all";
        var quizQs = [];
        var quizIdx = 0;
        var quizScore = 0;

        // ═══════════════════════════════════════════════════
        //  HELPERS
        // ═══════════════════════════════════════════════════
        function tagHtml(tags) {
            var map = { core: "tag-core CORE", filter: "tag-filter FILTER", agg: "tag-agg AGG", join: "tag-join JOIN", adv: "tag-adv ADV" };
            return tags.map(function (t) {
                var parts = (map[t] || ("tag-adv " + t)).split(" ");
                return '<span class="tag ' + parts[0] + '">' + parts.slice(1).join(" ") + "</span>";
            }).join("");
        }

        function resultHtml(r) {
            if (!r) return "";
            var ths = r.cols.map(function (c) { return "<th>" + c + "</th>"; }).join("");
            var trs = r.rows.map(function (row) {
                return "<tr>" + row.map(function (c) { return "<td>" + c + "</td>"; }).join("") + "</tr>";
            }).join("");
            return '<div class="res-rows">&gt; ' + r.rows.length + ' row(s) — ' + r.note + "</div>" +
                '<div class="res-wrap"><table class="res-table"><thead><tr>' + ths + "</tr></thead><tbody>" + trs + "</tbody></table></div>";
        }

        // ═══════════════════════════════════════════════════
        //  RENDER LEARN
        // ═══════════════════════════════════════════════════
        function getFiltered() {
            return LEARN.filter(function (l) {
                var mc = curFilter === "all" ? true
                    : curFilter === "learned" ? learned.indexOf(l.id) > -1
                        : l.cat === curFilter;
                var s = curSearch.toLowerCase();
                return mc && (!s || l.name.toLowerCase().indexOf(s) > -1 || l.short.toLowerCase().indexOf(s) > -1);
            });
        }

        function renderLearn() {
            var list = getFiltered();
            var g = document.getElementById("learnGrid");
            if (!list.length) {
                g.innerHTML = '<div style="text-align:center;padding:50px;grid-column:1/-1;color:var(--text-dim);font-family:var(--mono)"><div style="font-size:32px;margin-bottom:10px">-- 0 rows</div><p>Tidak ada materi ditemukan</p></div>';
                return;
            }
            g.innerHTML = list.map(function (l, i) {
                var done = learned.indexOf(l.id) > -1;
                var mistakes = l.mistakes.map(function (m) {
                    return '<div class="ep-mistake"><strong>⚠</strong> ' + m + "</div>";
                }).join("");
                return '<div class="lc ' + (done ? "learned" : "") + '" id="lc-' + l.id + '" style="animation-delay:' + Math.min(i * 0.04, 0.4) + 's">' +
                    '<div class="lc-hd">' +
                    '<div class="lc-icon" style="background:' + l.iconBg + '">' + l.icon + "</div>" +
                    "<div style=\"flex:1\">" +
                    '<div class="lc-name">' + l.name + "</div>" +
                    '<div class="lc-cat">' + l.catLabel + "</div>" +
                    '<div class="lc-short">' + l.short + "</div>" +
                    "</div>" +
                    '<div class="learned-dot"></div>' +
                    "</div>" +
                    '<div class="lc-body">' +
                    '<div class="blk-label">-- Syntax</div>' +
                    '<div class="syntax-blk">' + l.syntax + "</div>" +
                    '<div class="blk-label">-- Contoh Query</div>' +
                    '<div class="syntax-blk">' + l.example + "</div>" +
                    '<div class="blk-label">-- Sample Result</div>' +
                    resultHtml(l.result) +
                    '<div class="tip-blk"><span>💡</span><span>' + l.tip + "</span></div>" +
                    '<div class="tag-row">' + tagHtml(l.tags) + "</div>" +
                    '<button class="learn-btn" onclick="toggleLearned(\'' + l.id + '\')">' + (done ? "✅ Sudah Dipelajari" : "📌 Tandai Sudah Dipelajari") + "</button>" +
                    "</div>" +
                    '<div class="exp-wrap">' +
                    '<button class="exp-btn" id="ebtn-' + l.id + '" onclick="toggleExp(\'' + l.id + '\',this)">▼ catatan &amp; kesalahan umum</button>' +
                    '<div class="exp-panel" id="epnl-' + l.id + '">' +
                    '<div class="ep-hd">-- catatan</div>' +
                    '<div class="ep-note">' + l.notes + "</div>" +
                    '<div class="ep-hd" style="margin-top:9px">-- jangan lakukan ini</div>' +
                    mistakes +
                    "</div>" +
                    "</div>" +
                    "</div>";
            }).join("");
        }

        function toggleExp(id, btn) {
            var p = document.getElementById("epnl-" + id);
            var isOpen = p.classList.contains("open");
            if (openExp && openExp !== id) {
                var op = document.getElementById("epnl-" + openExp);
                if (op) op.classList.remove("open");
                var ob = document.getElementById("ebtn-" + openExp);
                if (ob) ob.textContent = "▼ catatan & kesalahan umum";
            }
            p.classList.toggle("open");
            openExp = isOpen ? null : id;
            btn.textContent = p.classList.contains("open") ? "▲ sembunyikan catatan" : "▼ catatan & kesalahan umum";
        }

        function toggleLearned(id) {
            var idx = learned.indexOf(id);
            if (idx > -1) learned.splice(idx, 1);
            else learned.push(id);
            localStorage.setItem("sql_learned", JSON.stringify(learned));
            updateStats();
            var card = document.getElementById("lc-" + id);
            if (card) {
                card.classList.toggle("learned");
                card.querySelector(".learn-btn").textContent = learned.indexOf(id) > -1 ? "✅ Sudah Dipelajari" : "📌 Tandai Sudah Dipelajari";
            }
        }

        function setFilter(cat, btn) {
            curFilter = cat;
            document.querySelectorAll(".sb-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            var titles = { all: "Semua Materi", basic: "SQL Dasar", filter: "Filter & Kondisi", agg: "Aggregation", join: "JOIN", adv: "Lanjutan", learned: "Sudah Dipelajari" };
            document.getElementById("secTitle").textContent = titles[cat] || cat;
            if (curTab === "learn") renderLearn();
        }

        function doSearch(v) {
            curSearch = v;
            if (curTab === "learn") renderLearn();
        }

        function updateStats() {
            var total = LEARN.length, done = learned.length;
            document.getElementById("learnedN").textContent = done;
            document.getElementById("totalN").textContent = total;
            document.getElementById("pracDoneN").textContent = pracDone.length;
            document.getElementById("pracTotalN").textContent = PRACTICE.length;
            var pct = total ? Math.round(done / total * 100) : 0;
            document.getElementById("progFill").style.width = pct + "%";
            document.getElementById("progPct").textContent = pct + "%";
            document.getElementById("sc-all").textContent = total;
            ["basic", "filter", "agg", "join", "adv"].forEach(function (c) {
                var el = document.getElementById("sc-" + c);
                if (el) el.textContent = LEARN.filter(function (l) { return l.cat === c; }).length;
            });
            document.getElementById("sc-learned").textContent = done;
        }

        // ═══════════════════════════════════════════════════
        //  PRACTICE
        // ═══════════════════════════════════════════════════
        function renderPractice() {
            var cat = document.getElementById("pracFilter").value;
            var list = cat === "all" ? PRACTICE : PRACTICE.filter(function (p) { return p.cat === cat; });
            var g = document.getElementById("practiceGrid");
            var lvlMap = { easy: "lvl-easy", med: "lvl-med", hard: "lvl-hard" };
            var lvlLbl = { easy: "Mudah", med: "Menengah", hard: "Sulit" };
            g.innerHTML = list.map(function (p) {
                return '<div class="pc-card" id="pc-' + p.id + '">' +
                    '<div class="pc-hd">' +
                    '<span class="pc-num">#' + p.id.slice(1) + "</span>" +
                    '<span class="pc-formula">' + p.formula + "</span>" +
                    '<span class="pc-lvl ' + lvlMap[p.level] + '">' + lvlLbl[p.level] + "</span>" +
                    "</div>" +
                    '<div class="pc-body">' +
                    '<div class="pc-scenario">' + p.scenario + "</div>" +
                    '<div class="pc-q">' + p.q + "</div>" +
                    '<div class="pc-editor"><textarea id="pa-' + p.id + '" placeholder="-- Ketik query SQL..." rows="3" spellcheck="false"></textarea></div>' +
                    '<div class="pc-actions">' +
                    '<button class="pc-check" onclick="checkPrac(\'' + p.id + '\')">▶ Cek Jawaban</button>' +
                    '<button class="pc-hint-btn" onclick="togglePracHint(\'' + p.id + '\')">💡 Hint</button>' +
                    "</div>" +
                    '<div class="pc-hint-box" id="ph-' + p.id + '">💡 ' + p.hint + "</div>" +
                    '<div class="pc-feedback" id="pf-' + p.id + '"></div>' +
                    "</div>" +
                    "</div>";
            }).join("");
        }

        function normalizeSQL(s) {
            return s.trim().toLowerCase().replace(/;$/, "").replace(/\s+/g, " ")
                .replace(/'/g, "'").replace(/"/g, "'");
        }

        function checkPrac(id) {
            var p = PRACTICE.find(function (x) { return x.id === id; });
            var raw = document.getElementById("pa-" + id).value;
            var val = normalizeSQL(raw);
            var correct = p.answers.some(function (a) { return val === normalizeSQL(a); });
            // fuzzy: starts with correct keywords
            if (!correct) {
                var firstWords = normalizeSQL(p.answers[0]).split(" ").slice(0, 5).join(" ");
                correct = val.indexOf(firstWords) === 0 && val.length > firstWords.length;
            }
            var fb = document.getElementById("pf-" + id);
            var inp = document.getElementById("pa-" + id);
            if (correct) {
                fb.className = "pc-feedback ok";
                fb.innerHTML = "✅ <strong>Benar!</strong> " + p.exp;
                inp.style.borderColor = "var(--green-md)";
                if (pracDone.indexOf(id) === -1) {
                    pracDone.push(id);
                    localStorage.setItem("sql_pracdone", JSON.stringify(pracDone));
                    updateStats();
                }
            } else {
                fb.className = "pc-feedback err";
                fb.innerHTML = "❌ <strong>Belum tepat.</strong> " + p.exp + "<br><br><span style=\"color:var(--text-dim)\">Contoh:</span> <code style=\"color:var(--cyan);font-family:var(--mono);font-size:11px\">" + p.answers[0] + "</code>";
                inp.style.borderColor = "var(--rose)";
            }
        }

        function togglePracHint(id) {
            var h = document.getElementById("ph-" + id);
            h.classList.toggle("open");
        }

        // ═══════════════════════════════════════════════════
        //  SQL SIMULATOR ENGINE
        // ═══════════════════════════════════════════════════
        function updateLineNums() {
            var lines = document.getElementById("queryInput").value.split("\n").length;
            var nums = [];
            for (var i = 1; i <= Math.max(lines, 1); i++) nums.push(i);
            document.getElementById("lineNums").innerHTML = nums.join("<br>");
        }

        function clearQuery() {
            document.getElementById("queryInput").value = "";
            updateLineNums();
            document.getElementById("queryOutput").innerHTML = '<div class="out-empty"><span style="font-size:26px">⌗</span><span>Hasil query muncul di sini</span></div>';
            document.getElementById("resultMeta").textContent = "";
        }

        function loadSnip(q) {
            document.getElementById("queryInput").value = q;
            updateLineNums();
        }

        function loadAndRun(q) {
            document.getElementById("queryInput").value = q;
            updateLineNums();
            runQuery();
        }

        function showOutput(opts) {
            var out = document.getElementById("queryOutput");
            var meta = document.getElementById("resultMeta");
            if (opts.error) {
                out.innerHTML = '<div class="output-status st-err"><div class="status-dot"></div><span class="status-txt">' + opts.error + "</span></div>";
                meta.textContent = "";
                return;
            }
            var rows = opts.rows || [];
            var cols = opts.cols || (rows.length ? Object.keys(rows[0]) : []);
            if (!rows.length) {
                out.innerHTML = '<div class="output-status st-ok"><div class="status-dot"></div><span class="status-txt">Query OK — 0 rows</span></div>';
                meta.textContent = "0 rows";
                return;
            }
            var ths = cols.map(function (c) { return "<th>" + c + "</th>"; }).join("");
            var trs = rows.map(function (r) {
                return "<tr>" + cols.map(function (c) {
                    var v = r[c];
                    return "<td>" + (v === null || v === undefined ? '<em style="color:var(--text-dim)">NULL</em>' : v) + "</td>";
                }).join("") + "</tr>";
            }).join("");
            out.innerHTML = '<div class="output-status st-ok"><div class="status-dot"></div><span class="status-txt">OK — ' + rows.length + " row(s)</span></div>" +
                "<div style=\"overflow-x:auto\"><table class=\"out-table\"><thead><tr>" + ths + "</tr></thead><tbody>" + trs + "</tbody></table></div>";
            meta.textContent = rows.length + " rows";
        }

        function renderSchemaView() {
            var schema = {
                users: [{ n: "id", t: "INT", pk: true }, { n: "name", t: "VARCHAR" }, { n: "age", t: "INT" }, { n: "dept", t: "VARCHAR" }, { n: "salary", t: "BIGINT" }],
                orders: [{ n: "id", t: "INT", pk: true }, { n: "user_id", t: "INT", fk: true }, { n: "product_id", t: "INT", fk: true }, { n: "amount", t: "BIGINT" }, { n: "status", t: "VARCHAR" }, { n: "order_date", t: "DATE" }],
                products: [{ n: "id", t: "INT", pk: true }, { n: "name", t: "VARCHAR" }, { n: "category", t: "VARCHAR" }, { n: "price", t: "BIGINT" }, { n: "stock", t: "INT" }],
                departments: [{ n: "id", t: "INT", pk: true }, { n: "name", t: "VARCHAR" }, { n: "budget", t: "BIGINT" }, { n: "manager", t: "VARCHAR" }]
            };
            document.getElementById("schemaView").innerHTML = Object.keys(schema).map(function (tbl) {
                var cols = schema[tbl].map(function (c) {
                    var badge = c.pk ? '<span class="pk">PK</span>' : c.fk ? '<span class="fk">FK</span>' : '';
                    return '<div class="schema-col">' + badge + "<span>" + c.n + "</span><span class=\"tp\">" + c.t + "</span></div>";
                }).join("");
                return '<div class="schema-tbl"><div class="schema-tbl-hd">📋 ' + tbl + "</div>" + cols + "</div>";
            }).join("");
        }

        // ── SQL PARSER & EXECUTOR ──
        function runQuery() {
            var raw = (document.getElementById("queryInput").value || "").trim();
            if (!raw) { showOutput({ error: "-- Query kosong." }); return; }

            try {
                var result = execSQL(raw);
                showOutput({ rows: result.rows, cols: result.cols });
            } catch (e) {
                showOutput({ error: "-- Error: " + e.message });
            }
        }

        function execSQL(raw) {
            var sql = raw.replace(/;$/, "").trim();
            var up = sql.toUpperCase();

            // ── extract clauses ──
            function extractClause(kw) {
                var rx = new RegExp("\\b" + kw + "\\b", "i");
                var m = rx.exec(sql);
                if (!m) return null;
                var start = m.index + m[0].length;
                // next clause keywords
                var nextKws = ["SELECT", "FROM", "WHERE", "GROUP BY", "HAVING", "ORDER BY", "LIMIT", "OFFSET", "INNER JOIN", "LEFT JOIN", "RIGHT JOIN", "JOIN", "ON"];
                var end = sql.length;
                nextKws.forEach(function (nk) {
                    if (nk.toUpperCase() === kw.toUpperCase()) return;
                    var nr = new RegExp("\\b" + nk + "\\b", "i");
                    var nm = nr.exec(sql.slice(start));
                    if (nm && (start + nm.index) < end) end = start + nm.index;
                });
                return sql.slice(start, end).trim();
            }

            var selectStr = extractClause("SELECT");
            var fromStr = extractClause("FROM");
            var whereStr = extractClause("WHERE");
            var groupStr = extractClause("GROUP BY");
            var havingStr = extractClause("HAVING");
            var orderStr = extractClause("ORDER BY");
            var limitStr = extractClause("LIMIT");

            if (!selectStr || !fromStr) throw new Error("SELECT dan FROM wajib ada.");

            // ── detect JOINs ──
            var joinRx = /\b(INNER\s+JOIN|LEFT\s+JOIN|RIGHT\s+JOIN|JOIN)\s+(\w+)(?:\s+(?:AS\s+)?(\w+))?\s+ON\s+(.+?)(?=\b(?:INNER|LEFT|RIGHT|JOIN|WHERE|GROUP|HAVING|ORDER|LIMIT)\b|$)/gi;
            var joins = [];
            var jm;
            while ((jm = joinRx.exec(sql)) !== null) {
                joins.push({
                    type: jm[1].trim().toUpperCase(),
                    table: jm[2].toLowerCase(),
                    alias: (jm[3] || jm[2]).toLowerCase(),
                    on: jm[4].trim()
                });
            }

            // ── main table + alias ──
            var fromParts = fromStr.split(/\s+/);
            var mainTable = fromParts[0].toLowerCase();
            // strip join parts from fromStr
            var mainAlias = fromParts[1] && fromParts[1].toUpperCase() !== "AS" ? fromParts[1].toLowerCase()
                : fromParts[2] ? fromParts[2].toLowerCase()
                    : mainTable;

            if (!DB[mainTable]) throw new Error("Tabel '" + mainTable + "' tidak ada. Tersedia: " + Object.keys(DB).join(", "));

            // ── start with main table rows ──
            var rows = DB[mainTable].map(function (r) { return shallowCopy(r); });

            // ── apply JOINs ──
            joins.forEach(function (j) {
                var jData = DB[j.table];
                if (!jData) throw new Error("Tabel JOIN '" + j.table + "' tidak ada.");
                var onM = j.on.match(/(\w+)\.(\w+)\s*=\s*(\w+)\.(\w+)/);
                if (!onM) throw new Error("Format ON tidak dikenali: " + j.on);
                var la = onM[1].toLowerCase(), lc = onM[2].toLowerCase();
                var ra = onM[3].toLowerCase(), rc = onM[4].toLowerCase();

                var isLeft = j.type.indexOf("LEFT") > -1;

                var newRows = [];
                rows.forEach(function (lr) {
                    var lv = lr[lc] !== undefined ? lr[lc] : lr[la + "." + lc];
                    var matched = false;
                    jData.forEach(function (jr) {
                        var rv = jr[rc] !== undefined ? jr[rc] : jr[ra + "." + rc];
                        if (lv === rv) {
                            matched = true;
                            var merged = shallowCopy(lr);
                            Object.keys(jr).forEach(function (k) { if (merged[k] === undefined) merged[k] = jr[k]; });
                            newRows.push(merged);
                        }
                    });
                    if (!matched && isLeft) {
                        var nullRow = shallowCopy(lr);
                        Object.keys(jData[0] || {}).forEach(function (k) { if (nullRow[k] === undefined) nullRow[k] = null; });
                        newRows.push(nullRow);
                    }
                });
                rows = newRows;
            });

            // ── WHERE ──
            if (whereStr) {
                rows = rows.filter(function (r) { return evalWhere(whereStr, r); });
            }

            // ── GROUP BY + aggregation ──
            var finalCols = [];
            var selParts = parseSelect(selectStr);
            var hasAgg = selParts.some(function (p) { return p.agg; });

            if (groupStr) {
                var groupCols = groupStr.split(",").map(function (s) { return s.trim().split(".").pop().toLowerCase(); });
                var groups = {};
                var groupOrder = [];
                rows.forEach(function (r) {
                    var key = groupCols.map(function (c) { return r[c]; }).join("|");
                    if (!groups[key]) { groups[key] = []; groupOrder.push(key); }
                    groups[key].push(r);
                });
                rows = groupOrder.map(function (key) {
                    var grp = groups[key];
                    var out = {};
                    selParts.forEach(function (p) {
                        out[p.alias] = p.agg ? computeAgg(p.agg, p.aggCol, grp) : grp[0][p.col] !== undefined ? grp[0][p.col] : grp[0][p.expr];
                    });
                    out.__grp = grp;
                    return out;
                });
                // HAVING
                if (havingStr) {
                    rows = rows.filter(function (r) { return evalHaving(havingStr, r, r.__grp || []); });
                }
                rows.forEach(function (r) { delete r.__grp; });
                finalCols = selParts.map(function (p) { return p.alias; });

            } else if (hasAgg) {
                var out = {};
                selParts.forEach(function (p) {
                    out[p.alias] = p.agg ? computeAgg(p.agg, p.aggCol, rows) : rows[0] ? rows[0][p.col] : null;
                });
                rows = [out];
                finalCols = selParts.map(function (p) { return p.alias; });

            } else {
                // plain SELECT
                if (selectStr.trim() === "*") {
                    finalCols = Object.keys(rows[0] || {});
                } else {
                    rows = rows.map(function (r) {
                        var out = {};
                        selParts.forEach(function (p) {
                            var v = r[p.col] !== undefined ? r[p.col] : r[p.expr] !== undefined ? r[p.expr] : evalCaseWhen(p.expr, r);
                            out[p.alias] = v !== undefined ? v : null;
                        });
                        return out;
                    });
                    finalCols = selParts.map(function (p) { return p.alias; });
                }
            }

            // ── ORDER BY ──
            if (orderStr) {
                var orderParts = orderStr.split(",").map(function (s) {
                    var parts = s.trim().split(/\s+/);
                    return { col: parts[0].toLowerCase(), dir: (parts[1] || "ASC").toUpperCase() === "DESC" ? -1 : 1 };
                });
                rows.sort(function (a, b) {
                    for (var i = 0; i < orderParts.length; i++) {
                        var op = orderParts[i];
                        var av = a[op.col], bv = b[op.col];
                        if (av === null || av === undefined) av = "";
                        if (bv === null || bv === undefined) bv = "";
                        if (av < bv) return -op.dir;
                        if (av > bv) return op.dir;
                    }
                    return 0;
                });
            }

            // ── LIMIT ──
            if (limitStr) {
                var n = parseInt(limitStr, 10);
                if (!isNaN(n)) rows = rows.slice(0, n);
            }

            return { rows: rows, cols: finalCols.length ? finalCols : Object.keys(rows[0] || {}) };
        }

        function shallowCopy(obj) {
            var out = {};
            Object.keys(obj).forEach(function (k) { out[k] = obj[k]; });
            return out;
        }

        function parseSelect(selStr) {
            if (!selStr || selStr.trim() === "*") return [];
            // split by comma respecting parens
            var parts = [];
            var depth = 0, cur = "";
            for (var i = 0; i < selStr.length; i++) {
                var ch = selStr[i];
                if (ch === "(") depth++;
                else if (ch === ")") depth--;
                if (ch === "," && depth === 0) { parts.push(cur.trim()); cur = ""; }
                else cur += ch;
            }
            if (cur.trim()) parts.push(cur.trim());

            return parts.map(function (p) {
                // AS alias
                var asM = p.match(/^(.+?)\s+AS\s+(\w+)$/i);
                var expr = asM ? asM[1].trim() : p.trim();
                // derive alias: strip table prefix (t.col -> col), keep only word chars
                var rawAlias = asM ? asM[2] : expr.trim().split(".").pop().replace(/[^a-zA-Z0-9_]/g, "_");
                var alias = rawAlias.toLowerCase();

                // CASE WHEN
                if (/^\s*CASE\b/i.test(expr)) {
                    return { expr: expr, alias: alias, agg: null, col: null, aggCol: null, isCase: true };
                }

                // agg function e.g. SUM(o.amount), COUNT(*)
                var aggM = expr.match(/^(\w+)\s*\(([^)]*)\)$/i);
                if (aggM) {
                    var rawCol = aggM[2].trim();
                    // strip table alias prefix: o.amount -> amount
                    var aggCol = rawCol === "*" ? "*" : rawCol.split(".").pop().toLowerCase();
                    return { expr: expr, alias: alias, agg: aggM[1].toUpperCase(), aggCol: aggCol, col: null };
                }

                // plain col (possibly tbl.col) -- strip prefix
                var colName = expr.trim().split(".").pop().toLowerCase();
                return { expr: expr.trim(), alias: alias, agg: null, col: colName, aggCol: null };
            });
        }

        function computeAgg(fn, col, rows) {
            if (fn === "COUNT") {
                return col === "*" ? rows.length : rows.filter(function (r) { return r[col] !== null && r[col] !== undefined; }).length;
            }
            var vals = rows.map(function (r) {
                var v = r[col];
                return typeof v === "number" ? v : parseFloat(v);
            }).filter(function (v) { return !isNaN(v); });
            if (fn === "SUM") return vals.reduce(function (s, v) { return s + v; }, 0);
            if (fn === "AVG") return vals.length ? Math.round(vals.reduce(function (s, v) { return s + v; }, 0) / vals.length) : null;
            if (fn === "MAX") return vals.length ? Math.max.apply(null, vals) : null;
            if (fn === "MIN") return vals.length ? Math.min.apply(null, vals) : null;
            return null;
        }

        function getVal(col, row) {
            var c = col.trim().toLowerCase();
            if (row[c] !== undefined) return row[c];
            // alias.col
            var dotM = col.match(/(\w+)\.(\w+)/i);
            if (dotM) {
                var c2 = dotM[2].toLowerCase();
                if (row[c2] !== undefined) return row[c2];
            }
            return undefined;
        }

        function evalWhere(whereStr, row) {
            return evalCondStr(whereStr, row);
        }

        function evalHaving(havingStr, row, grp) {
            // replace AGG(...) with computed numeric values before parsing condition
            var s = havingStr.replace(/(\w+)\s*\(([^)]*?)\)/gi, function (m, fn, col) {
                var fns = ["COUNT", "SUM", "AVG", "MAX", "MIN"];
                if (fns.indexOf(fn.toUpperCase()) === -1) return m;
                var c = col.trim() === "*" ? "*" : col.trim().split(".").pop().toLowerCase();
                var v = computeAgg(fn.toUpperCase(), c, grp);
                return v !== null ? String(v) : "0";
            });
            // now eval the resulting numeric comparison e.g. "8075000 > 7000000"
            return evalCondStr(s, row);
        }

        function evalCondStr(condStr, row) {
            // handle AND / OR by splitting carefully
            // Use a simple recursive descent parser
            var tokens = tokenizeCond(condStr);
            return parseOrExpr(tokens, row);
        }

        function tokenizeCond(s) {
            // produce array of tokens: keywords AND/OR/NOT, parens, and raw condition strings
            var result = [];
            var i = 0;
            while (i < s.length) {
                // skip whitespace
                if (s[i] === " " || s[i] === "\t" || s[i] === "\n") { i++; continue; }
                // paren
                if (s[i] === "(") { result.push("("); i++; continue; }
                if (s[i] === ")") { result.push(")"); i++; continue; }
                // AND / OR / NOT keyword
                var rest = s.slice(i);
                var kw = rest.match(/^(AND|OR|NOT)\b/i);
                if (kw) { result.push(kw[1].toUpperCase()); i += kw[1].length; continue; }
                // collect condition atom until AND/OR/( /  ) (not inside quotes or parens)
                var atom = "";
                var depth = 0;
                var inQ = false;
                while (i < s.length) {
                    var ch = s[i];
                    if (ch === "'") inQ = !inQ;
                    if (!inQ && ch === "(") depth++;
                    if (!inQ && ch === ")") { if (depth === 0) break; depth--; }
                    if (!inQ && depth === 0 && /^(AND|OR)\b/i.test(s.slice(i))) break;
                    atom += ch;
                    i++;
                }
                if (atom.trim()) result.push(atom.trim());
            }
            return result;
        }

        function parseOrExpr(tokens, row) {
            var left = parseAndExpr(tokens, row);
            while (tokens.length && tokens[0] === "OR") {
                tokens.shift();
                var right = parseAndExpr(tokens, row);
                left = left || right;
            }
            return left;
        }

        function parseAndExpr(tokens, row) {
            var left = parseNotExpr(tokens, row);
            while (tokens.length && tokens[0] === "AND") {
                tokens.shift();
                var right = parseNotExpr(tokens, row);
                left = left && right;
            }
            return left;
        }

        function parseNotExpr(tokens, row) {
            if (tokens.length && tokens[0] === "NOT") {
                tokens.shift();
                return !parsePrimary(tokens, row);
            }
            return parsePrimary(tokens, row);
        }

        function parsePrimary(tokens, row) {
            if (!tokens.length) return true;
            if (tokens[0] === "(") {
                tokens.shift(); // consume (
                var val = parseOrExpr(tokens, row);
                if (tokens.length && tokens[0] === ")") tokens.shift();
                return val;
            }
            var atom = tokens.shift();
            return evalAtom(atom, row);
        }

        function evalAtom(atom, row) {
            atom = atom.trim();
            if (!atom) return true;

            // IS NULL / IS NOT NULL
            var isnullM = atom.match(/^(.+?)\s+IS\s+NOT\s+NULL$/i);
            if (isnullM) { var v0 = getVal(isnullM[1], row); return v0 !== null && v0 !== undefined; }
            var isnullM2 = atom.match(/^(.+?)\s+IS\s+NULL$/i);
            if (isnullM2) { var v1 = getVal(isnullM2[1], row); return v1 === null || v1 === undefined; }

            // BETWEEN
            var betM = atom.match(/^(.+?)\s+BETWEEN\s+(.+?)\s+AND\s+(.+)$/i);
            if (betM) {
                var bv = getVal(betM[1], row); var lo = parseNum(betM[2]); var hi = parseNum(betM[3]);
                bv = typeof bv === "string" ? parseFloat(bv) : bv;
                return bv >= lo && bv <= hi;
            }

            // NOT IN
            var ninM = atom.match(/^(.+?)\s+NOT\s+IN\s*\((.+)\)$/i);
            if (ninM) {
                var niv = String(getVal(ninM[1], row) || "").toLowerCase();
                var niList = ninM[2].split(",").map(function (x) { return x.trim().replace(/^'|'$/g, "").toLowerCase(); });
                return niList.indexOf(niv) === -1;
            }

            // IN
            var inM = atom.match(/^(.+?)\s+IN\s*\((.+)\)$/i);
            if (inM) {
                var iv = String(getVal(inM[1], row) || "").toLowerCase();
                var iList = inM[2].split(",").map(function (x) { return x.trim().replace(/^'|'$/g, "").toLowerCase(); });
                return iList.indexOf(iv) > -1;
            }

            // NOT LIKE
            var nlikeM = atom.match(/^(.+?)\s+NOT\s+LIKE\s+'([^']+)'$/i);
            if (nlikeM) { return !evalLike(getVal(nlikeM[1], row), nlikeM[2]); }

            // LIKE
            var likeM = atom.match(/^(.+?)\s+LIKE\s+'([^']+)'$/i);
            if (likeM) { return evalLike(getVal(likeM[1], row), likeM[2]); }

            // comparison: col OP value
            var cmpM = atom.match(/^(.+?)\s*(!=|<>|>=|<=|>|<|=)\s*(.+)$/);
            if (cmpM) {
                var lhs = getVal(cmpM[1].trim(), row);
                var op = cmpM[2];
                var rhs = cmpM[3].trim().replace(/^'|'$/g, "");
                if (lhs === undefined) lhs = cmpM[1].trim().replace(/^'|'$/g, "");
                // numeric compare
                var lNum = parseFloat(lhs), rNum = parseFloat(rhs);
                var isNum = !isNaN(lNum) && !isNaN(rNum) && cmpM[3].trim()[0] !== "'";
                if (isNum) {
                    if (op === "=") return lNum === rNum;
                    if (op === "!=") return lNum !== rNum;
                    if (op === "<>") return lNum !== rNum;
                    if (op === ">") return lNum > rNum;
                    if (op === "<") return lNum < rNum;
                    if (op === ">=") return lNum >= rNum;
                    if (op === "<=") return lNum <= rNum;
                }
                var ls = String(lhs).toLowerCase(), rs = rhs.toLowerCase();
                if (op === "=") return ls === rs;
                if (op === "!=") return ls !== rs;
                if (op === "<>") return ls !== rs;
                if (op === ">") return ls > rs;
                if (op === "<") return ls < rs;
                return false;
            }

            return true;
        }

        function evalLike(val, pattern) {
            var v = String(val || "");
            var rx = "^" + pattern.replace(/%/g, ".*").replace(/_/g, ".") + "$";
            return new RegExp(rx, "i").test(v);
        }

        function parseNum(s) {
            return parseFloat(String(s).replace(/'/g, ""));
        }

        function evalCaseWhen(expr, row) {
            if (expr.toUpperCase().indexOf("CASE") === -1) return undefined;
            // match WHEN cond THEN 'val' or "val" or bareword
            var whenRx = /WHEN\s+(.+?)\s+THEN\s+('[^']*'|"[^"]*"|\S+)/gi;
            var elseRx = /ELSE\s+('[^']*'|"[^"]*"|\S+)\s+END/i;
            var m;
            while ((m = whenRx.exec(expr)) !== null) {
                var cond = m[1].trim();
                var val = m[2].replace(/^['"]/, "").replace(/['"]$/, "");
                if (evalAtom(cond, row)) return val;
            }
            var em = elseRx.exec(expr);
            if (em) return em[1].replace(/^['"]/, "").replace(/['"]$/, "");
            return null;
        }

        // ═══════════════════════════════════════════════════
        //  QUIZ
        // ═══════════════════════════════════════════════════
        function selQCat(cat, el) {
            quizCatSel = cat;
            document.querySelectorAll(".qcat").forEach(function (c) { c.classList.remove("sel"); });
            el.classList.add("sel");
        }

        function shuffle(a) {
            var arr = a.slice();
            for (var i = arr.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var tmp = arr[i]; arr[i] = arr[j]; arr[j] = tmp;
            }
            return arr;
        }

        function startQuiz() {
            var pool = quizCatSel === "all" ? QUIZ : QUIZ.filter(function (q) { return q.cat === quizCatSel; });
            quizQs = shuffle(pool).slice(0, 10);
            quizIdx = 0; quizScore = 0;
            document.getElementById("quizStart").style.display = "none";
            document.getElementById("qresult").classList.remove("on");
            document.getElementById("qplay").classList.add("on");
            renderQ();
        }

        function renderQ() {
            if (quizIdx >= quizQs.length) { showResult(); return; }
            var q = quizQs[quizIdx];
            var pct = (quizIdx + 1) / quizQs.length * 100;
            document.getElementById("qpLbl").textContent = (quizIdx + 1) + "/" + quizQs.length;
            document.getElementById("qpFillQ").style.width = pct + "%";
            document.getElementById("qpScore").textContent = quizScore;
            document.getElementById("qpQ").textContent = q.q;
            var ctx = document.getElementById("qpCtx");
            if (q.ctx) { ctx.textContent = q.ctx; ctx.style.display = "block"; }
            else ctx.style.display = "none";
            var ltrs = ["A", "B", "C", "D"];
            document.getElementById("qpOpts").innerHTML = q.opts.map(function (o, i) {
                return '<button class="qopt" onclick="ansQ(' + i + ')"><span class="qopt-l">' + ltrs[i] + "</span>" + o + "</button>";
            }).join("");
            document.getElementById("qpExp").className = "qexp";
            document.getElementById("qpNext").className = "qnext";
        }

        function ansQ(i) {
            var q = quizQs[quizIdx];
            document.querySelectorAll(".qopt").forEach(function (b) { b.disabled = true; });
            document.querySelectorAll(".qopt")[i].classList.add(i === q.ans ? "correct" : "wrong");
            if (i !== q.ans) document.querySelectorAll(".qopt")[q.ans].classList.add("correct");
            if (i === q.ans) quizScore++;
            document.getElementById("qpScore").textContent = quizScore;
            document.getElementById("qpExp").innerHTML = "💡 " + q.exp;
            document.getElementById("qpExp").className = "qexp show";
            var nb = document.getElementById("qpNext");
            nb.className = "qnext show";
            nb.textContent = quizIdx + 1 >= quizQs.length ? "-- lihat hasil" : "-- soal berikutnya";
        }

        function nextQ() { quizIdx++; renderQ(); }

        function showResult() {
            document.getElementById("qplay").classList.remove("on");
            var res = document.getElementById("qresult");
            res.classList.add("on");
            var pct = Math.round(quizScore / quizQs.length * 100);
            document.getElementById("qrPct").textContent = pct + "%";
            document.getElementById("qrC").textContent = quizScore;
            document.getElementById("qrW").textContent = quizQs.length - quizScore;
            document.getElementById("qrT").textContent = quizQs.length;
            var msgs = [
                [80, "🎉 Expert!", "Pemahaman SQL kamu sudah sangat solid!"],
                [60, "✅ Solid!", "Bagus! Review topik yang masih salah."],
                [40, "📖 Keep Learning!", "Baca ulang materi dan coba lagi."],
                [0, "🚀 Mulai!", "Pelajari dulu materinya, lalu quiz lagi."]
            ];
            var found = msgs.filter(function (m) { return pct >= m[0]; })[0] || msgs[3];
            document.getElementById("qrTitle").textContent = found[1];
            document.getElementById("qrMsg").textContent = found[2];
            setTimeout(function () { document.getElementById("qrRing").setAttribute("stroke-dashoffset", 276 * (1 - pct / 100)); }, 200);
        }

        function backQStart() {
            document.getElementById("qresult").classList.remove("on");
            document.getElementById("qplay").classList.remove("on");
            document.getElementById("quizStart").style.display = "";
        }

        // ═══════════════════════════════════════════════════
        //  CHEAT SHEET
        // ═══════════════════════════════════════════════════
        var CHEAT = [
            {
                hd: "🟢 SELECT Basics", color: "var(--green)", items: [
                    { s: "SELECT col1, col2 FROM table", d: "Ambil kolom tertentu" },
                    { s: "SELECT * FROM table", d: "Ambil semua kolom" },
                    { s: "SELECT DISTINCT col FROM table", d: "Hapus duplikat" },
                    { s: "SELECT col AS alias FROM table", d: "Beri alias kolom" }
                ]
            },
            {
                hd: "🔵 WHERE & Filter", color: "var(--blue)", items: [
                    { s: "WHERE col = 'value'", d: "Filter sama dengan" },
                    { s: "WHERE col > 100 AND col < 200", d: "Dua kondisi AND" },
                    { s: "WHERE col LIKE '%pattern%'", d: "Cari pola teks" },
                    { s: "WHERE col IN ('a','b','c')", d: "Filter beberapa nilai" },
                    { s: "WHERE col BETWEEN 10 AND 20", d: "Range inklusif" },
                    { s: "WHERE col IS NULL", d: "Cek nilai null" }
                ]
            },
            {
                hd: "🟣 Aggregation", color: "var(--violet)", items: [
                    { s: "COUNT(*)", d: "Hitung semua baris" },
                    { s: "COUNT(col)", d: "Hitung non-null" },
                    { s: "SUM(col) / AVG(col)", d: "Total / rata-rata" },
                    { s: "MAX(col) / MIN(col)", d: "Terbesar / terkecil" },
                    { s: "GROUP BY col", d: "Kelompokkan per nilai" },
                    { s: "HAVING AGG() > n", d: "Filter hasil GROUP BY" }
                ]
            },
            {
                hd: "🟡 JOIN", color: "var(--amber)", items: [
                    { s: "INNER JOIN t2 ON t1.id = t2.fk", d: "Hanya baris yang match" },
                    { s: "LEFT JOIN t2 ON t1.id = t2.fk", d: "Semua t1 + match t2" },
                    { s: "RIGHT JOIN t2 ON t1.id = t2.fk", d: "Semua t2 + match t1" }
                ]
            },
            {
                hd: "📐 Sort & Limit", color: "var(--cyan)", items: [
                    { s: "ORDER BY col ASC", d: "Urutan naik (default)" },
                    { s: "ORDER BY col DESC", d: "Urutan turun" },
                    { s: "LIMIT n", d: "Ambil n baris pertama" },
                    { s: "LIMIT n OFFSET m", d: "Skip m, ambil n" }
                ]
            },
            {
                hd: "🔴 Lanjutan", color: "var(--rose)", items: [
                    { s: "WHERE col > (SELECT AVG(col) FROM t)", d: "Subquery di WHERE" },
                    { s: "CASE WHEN c THEN v ELSE d END", d: "Kondisi if-else" },
                    { s: "COALESCE(col, 0)", d: "Ganti NULL dengan nilai lain" }
                ]
            },
            {
                hd: "⚙️ Urutan Eksekusi", color: "var(--text-dim)", items: [
                    { s: "1. FROM / JOIN", d: "Tentukan tabel" },
                    { s: "2. WHERE", d: "Filter baris" },
                    { s: "3. GROUP BY", d: "Kelompokkan" },
                    { s: "4. HAVING", d: "Filter grup" },
                    { s: "5. SELECT", d: "Pilih kolom" },
                    { s: "6. ORDER BY", d: "Urutkan" },
                    { s: "7. LIMIT", d: "Batasi jumlah" }
                ]
            }
        ];

        function renderCS() {
            document.getElementById("csGrid").innerHTML = CHEAT.map(function (c) {
                var rows = c.items.map(function (it) {
                    return '<div class="cs-row"><div class="cs-syntax">' + it.s + '</div><div class="cs-desc">' + it.d + "</div></div>";
                }).join("");
                return '<div class="cs-blk"><div class="cs-hd" style="border-top:2px solid ' + c.color + '">' + c.hd + "</div>" + rows + "</div>";
            }).join("");
        }

        // ═══════════════════════════════════════════════════
        //  TAB SWITCH
        // ═══════════════════════════════════════════════════
        function switchTab(tab, btn) {
            curTab = tab;
            document.querySelectorAll(".tab-btn").forEach(function (b) { b.classList.remove("active"); });
            btn.classList.add("active");
            ["learn", "practice", "sim", "quiz", "cheatsheet"].forEach(function (t) {
                document.getElementById("tab-" + t).style.display = t === tab ? "" : "none";
            });
            if (tab === "practice") renderPractice();
            if (tab === "cheatsheet") renderCS();
        }

        // ═══════════════════════════════════════════════════
        //  INIT
        // ═══════════════════════════════════════════════════
        updateStats();
        renderLearn();
        renderSchemaView();
        updateLineNums();
        document.getElementById("queryInput").addEventListener("input", updateLineNums);
