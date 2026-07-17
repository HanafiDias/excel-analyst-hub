        // ══════════════════════════════════════════════
        //  DATA
        // ══════════════════════════════════════════════
        const shortcuts = [
            // NAVIGASI
            { id: 1, cat: 'navigate', keys: [['Ctrl', 'Home']], desc: 'Pergi ke sel A1 (awal spreadsheet)', tip: 'Berguna saat kamu ingin langsung ke pojok kiri atas setelah scroll jauh.', tags: ['essential'], color: '#00d4ff' },
            { id: 2, cat: 'navigate', keys: [['Ctrl', 'End']], desc: 'Pergi ke sel terakhir yang berisi data', tip: 'Cepat cek seberapa besar dataset-mu tanpa scroll.', tags: ['essential', 'analyst'], color: '#00d4ff' },
            { id: 3, cat: 'navigate', keys: [['Ctrl', '→']], desc: 'Loncat ke ujung data ke kanan', tip: 'Atau ↑ ↓ ← tergantung arah. Lewati sel kosong sekaligus.', tags: ['essential'], color: '#00d4ff' },
            { id: 4, cat: 'navigate', keys: [['Ctrl', '↓']], desc: 'Loncat ke ujung data ke bawah', tip: 'Kombinasi favorit analyst untuk check panjang data dengan cepat.', tags: ['essential', 'analyst'], color: '#00d4ff' },
            { id: 5, cat: 'navigate', keys: [['Ctrl', 'G']], desc: 'Go To — pergi ke sel/range tertentu', tip: 'Bisa langsung ketik "A1000" untuk lompat. Juga buka dialog Go To Special.', tags: [], color: '#00d4ff' },
            { id: 6, cat: 'navigate', keys: [['Ctrl', 'F']], desc: 'Find — cari data dalam worksheet', tip: 'Tekan Ctrl+H untuk Find & Replace sekaligus.', tags: ['essential'], color: '#00d4ff' },
            { id: 7, cat: 'navigate', keys: [['Ctrl', 'H']], desc: 'Find & Replace', tip: 'Ganti semua "N/A" jadi kosong, atau ubah format teks massal.', tags: ['essential', 'analyst'], color: '#00d4ff' },
            { id: 8, cat: 'navigate', keys: [['F5']], desc: 'Go To (sama dengan Ctrl+G)', tip: 'Shortcut alternatif untuk Go To dialog.', tags: [], color: '#00d4ff' },
            { id: 9, cat: 'navigate', keys: [['Ctrl', 'PageDown']], desc: 'Pindah ke sheet berikutnya', tip: 'Ctrl+PageUp untuk balik ke sheet sebelumnya.', tags: ['essential'], color: '#00d4ff' },
            { id: 10, cat: 'navigate', keys: [['Ctrl', 'PageUp']], desc: 'Pindah ke sheet sebelumnya', tip: 'Navigasi antar sheet tanpa klik tab bawah.', tags: [], color: '#00d4ff' },

            // SELEKSI DATA
            { id: 11, cat: 'select', keys: [['Ctrl', 'Shift', 'End']], desc: 'Seleksi dari sel aktif ke sel data terakhir', tip: 'Cara cepat seleksi semua data hingga baris/kolom terakhir.', tags: ['essential', 'analyst'], color: '#7c3aed' },
            { id: 12, cat: 'select', keys: [['Ctrl', 'Shift', 'Home']], desc: 'Seleksi dari sel aktif ke A1', tip: 'Berguna untuk pilih semua dari posisi sekarang ke awal.', tags: [], color: '#7c3aed' },
            { id: 13, cat: 'select', keys: [['Ctrl', 'A']], desc: 'Pilih semua sel / seluruh tabel', tip: 'Tekan dua kali untuk pilih seluruh worksheet.', tags: ['essential'], color: '#7c3aed' },
            { id: 14, cat: 'select', keys: [['Ctrl', 'Shift', '→']], desc: 'Seleksi data ke kanan', tip: 'Kombinasikan dengan ↑ ↓ ← untuk seleksi blok besar.', tags: ['essential', 'analyst'], color: '#7c3aed' },
            { id: 15, cat: 'select', keys: [['Ctrl', 'Shift', '↓']], desc: 'Seleksi data ke bawah', tip: 'Paling sering dipakai analyst untuk pilih kolom data sekaligus.', tags: ['essential', 'analyst'], color: '#7c3aed' },
            { id: 16, cat: 'select', keys: [['Shift', 'Space']], desc: 'Pilih seluruh baris', tip: 'Lalu Ctrl+Shift+Plus untuk insert baris baru.', tags: [], color: '#7c3aed' },
            { id: 17, cat: 'select', keys: [['Ctrl', 'Space']], desc: 'Pilih seluruh kolom', tip: 'Berguna untuk delete/format satu kolom penuh.', tags: [], color: '#7c3aed' },
            { id: 18, cat: 'select', keys: [['Ctrl', 'Shift', '*']], desc: 'Pilih seluruh region data (current region)', tip: 'Memilih blok data yang terhubung di sekitar sel aktif.', tags: ['analyst'], color: '#7c3aed' },

            // EDIT & FORMAT
            { id: 19, cat: 'edit', keys: [['Ctrl', 'Z']], desc: 'Undo — batalkan aksi terakhir', tip: 'Bisa dipencet berkali-kali untuk undo bertahap.', tags: ['essential'], color: '#f59e0b' },
            { id: 20, cat: 'edit', keys: [['Ctrl', 'Y']], desc: 'Redo — ulangi aksi yang di-undo', tip: 'Atau F4 untuk repeat aksi terakhir.', tags: ['essential'], color: '#f59e0b' },
            { id: 21, cat: 'edit', keys: [['Ctrl', 'C']], desc: 'Copy', tip: 'Akan muncul garis putus-putus (marching ants) di sel yang di-copy.', tags: ['essential'], color: '#f59e0b' },
            { id: 22, cat: 'edit', keys: [['Ctrl', 'X']], desc: 'Cut', tip: 'Data dipindah, bukan diduplikasi.', tags: ['essential'], color: '#f59e0b' },
            { id: 23, cat: 'edit', keys: [['Ctrl', 'V']], desc: 'Paste', tip: 'Gunakan Ctrl+Alt+V untuk Paste Special (pilih paste value, format, dll).', tags: ['essential'], color: '#f59e0b' },
            { id: 24, cat: 'edit', keys: [['Ctrl', 'Alt', 'V']], desc: 'Paste Special — pilih apa yang di-paste', tip: 'Pilih "Values Only" untuk paste tanpa formula. Analyst wajib tahu!', tags: ['essential', 'analyst'], color: '#f59e0b' },
            { id: 25, cat: 'edit', keys: [['Ctrl', 'D']], desc: 'Fill Down — isi ke bawah dengan nilai sel atas', tip: 'Seleksi range dulu lalu Ctrl+D untuk mengisi semua.', tags: ['essential', 'analyst'], color: '#f59e0b' },
            { id: 26, cat: 'edit', keys: [['Ctrl', 'R']], desc: 'Fill Right — isi ke kanan', tip: 'Sama seperti Ctrl+D tapi ke arah kanan.', tags: ['essential'], color: '#f59e0b' },
            { id: 27, cat: 'edit', keys: [['Ctrl', 'B']], desc: 'Bold — tebalkan teks', tip: '', tags: [], color: '#f59e0b' },
            { id: 28, cat: 'edit', keys: [['Ctrl', 'I']], desc: 'Italic — miringkan teks', tip: '', tags: [], color: '#f59e0b' },
            { id: 29, cat: 'edit', keys: [['Ctrl', 'U']], desc: 'Underline — garis bawah', tip: '', tags: [], color: '#f59e0b' },
            { id: 30, cat: 'edit', keys: [['Ctrl', '1']], desc: 'Format Cells dialog (format angka, border, dll)', tip: 'Shortcut terpenting untuk formatting! Buka semua opsi format.', tags: ['essential', 'analyst'], color: '#f59e0b' },
            { id: 31, cat: 'edit', keys: [['Ctrl', 'Shift', '!']], desc: 'Format angka: Number (ribuan, 2 desimal)', tip: 'Format standar angka dengan pemisah ribuan.', tags: ['analyst'], color: '#f59e0b' },
            { id: 32, cat: 'edit', keys: [['Ctrl', 'Shift', '$']], desc: 'Format angka: Currency (mata uang)', tip: 'Tambah simbol mata uang sesuai regional setting.', tags: ['analyst'], color: '#f59e0b' },
            { id: 33, cat: 'edit', keys: [['Ctrl', 'Shift', '%']], desc: 'Format angka: Percentage', tip: 'Kalikan 100 dan tambah %. Ingat: 0.1 jadi 10%.', tags: ['essential', 'analyst'], color: '#f59e0b' },
            { id: 34, cat: 'edit', keys: [['Ctrl', 'Shift', '#']], desc: 'Format: Date (tanggal)', tip: 'Format standar DD/MM/YYYY atau sesuai regional.', tags: ['analyst'], color: '#f59e0b' },
            { id: 35, cat: 'edit', keys: [['Ctrl', '-']], desc: 'Delete baris/kolom yang terseleksi', tip: 'Pilih baris/kolom dulu dengan Shift+Space atau Ctrl+Space.', tags: ['essential'], color: '#f59e0b' },
            { id: 36, cat: 'edit', keys: [['Ctrl', 'Shift', '+']], desc: 'Insert baris/kolom baru', tip: 'Seleksi baris/kolom dulu untuk hasil yang tepat.', tags: ['essential'], color: '#f59e0b' },
            { id: 37, cat: 'edit', keys: [['F2']], desc: 'Edit isi sel yang sedang aktif', tip: 'Masuk mode edit tanpa double-klik. Lebih cepat!', tags: ['essential'], color: '#f59e0b' },
            { id: 38, cat: 'edit', keys: [['Delete']], desc: 'Hapus isi sel (tidak hapus format)', tip: 'Berbeda dengan Backspace yang langsung masuk mode edit.', tags: ['essential'], color: '#f59e0b' },
            { id: 39, cat: 'edit', keys: [['Alt', 'Enter']], desc: 'Baris baru di dalam satu sel', tip: 'Berguna untuk menulis keterangan panjang di satu sel.', tags: [], color: '#f59e0b' },

            // FORMULA
            { id: 40, cat: 'formula', keys: [['=']], desc: 'Mulai mengetik formula', tip: 'Setiap formula Excel wajib diawali tanda "=".', tags: ['essential'], color: '#10b981' },
            { id: 41, cat: 'formula', keys: [['Alt', '=']], desc: 'AutoSum — jumlahkan otomatis kolom/baris', tip: 'Shortcut paling sering dipakai. Langsung deteksi range dan SUM.', tags: ['essential', 'analyst'], color: '#10b981' },
            { id: 42, cat: 'formula', keys: [['F4']], desc: 'Toggle referensi absolut/relatif ($A$1, A1, $A1)', tip: 'Tekan F4 berulang saat kursor di referensi sel untuk toggle $. Sangat penting!', tags: ['essential', 'analyst'], color: '#10b981' },
            { id: 43, cat: 'formula', keys: [['Ctrl', 'Shift', 'Enter']], desc: 'Array Formula (formula CSE)', tip: 'Untuk formula yang memproses banyak sel sekaligus. Hasilnya {}.', tags: ['analyst'], color: '#10b981' },
            { id: 44, cat: 'formula', keys: [['F9']], desc: 'Hitung ulang semua formula', tip: 'Atau Shift+F9 untuk hitung sheet aktif saja.', tags: [], color: '#10b981' },
            { id: 45, cat: 'formula', keys: [['Ctrl', '`']], desc: 'Toggle tampilkan formula / nilai', tip: 'Ganti tampilan dari hasil jadi formula di semua sel. Berguna untuk audit.', tags: ['analyst'], color: '#10b981' },
            { id: 46, cat: 'formula', keys: [['Ctrl', 'Shift', 'A']], desc: 'Insert function arguments setelah nama fungsi', tip: 'Ketik nama fungsi, lalu Ctrl+Shift+A untuk lihat semua argumen.', tags: [], color: '#10b981' },
            { id: 47, cat: 'formula', keys: [['Shift', 'F3']], desc: 'Buka Function Wizard / Insert Function', tip: 'Dialog lengkap untuk cari dan masukkan fungsi.', tags: [], color: '#10b981' },
            { id: 48, cat: 'formula', keys: [['Ctrl', '[']], desc: 'Pergi ke sel yang direferensi formula', tip: 'Ctrl+] untuk pergi ke sel yang merujuk sel ini. Berguna untuk trace.', tags: ['analyst'], color: '#10b981' },

            // DATA & ANALISIS
            { id: 49, cat: 'data', keys: [['Ctrl', 'T']], desc: 'Buat Excel Table dari range data', tip: 'Wajib! Table otomatis expand, punya filter, dan mudah dipakai di formula.', tags: ['essential', 'analyst'], color: '#ef4444' },
            { id: 50, cat: 'data', keys: [['Ctrl', 'Shift', 'L']], desc: 'Toggle AutoFilter (filter dropdown)', tip: 'Aktifkan/matikan filter di baris header. Analyst pakai ini terus.', tags: ['essential', 'analyst'], color: '#ef4444' },
            { id: 51, cat: 'data', keys: [['Alt', '↓']], desc: 'Buka dropdown filter / dropdown list validasi', tip: 'Saat di header filter, ini buka menu pilihan filter.', tags: ['essential', 'analyst'], color: '#ef4444' },
            { id: 52, cat: 'data', keys: [['Ctrl', 'Shift', 'F']], desc: 'Advanced Filter (filter dengan kriteria kompleks)', tip: 'Untuk filter dengan multiple criteria yang tidak bisa di AutoFilter biasa.', tags: ['analyst'], color: '#ef4444' },
            { id: 53, cat: 'data', keys: [['Alt', 'A', 'S', 'S']], desc: 'Sort dialog (urutan sort kustom)', tip: 'Buka dialog Sort lengkap dengan multiple level sort.', tags: ['analyst'], color: '#ef4444' },
            { id: 54, cat: 'data', keys: [['Alt', 'H', 'O', 'I']], desc: 'AutoFit lebar kolom', tip: 'Otomatis sesuaikan lebar semua kolom dengan kontennya. Rapi seketika!', tags: ['essential'], color: '#ef4444' },
            { id: 55, cat: 'data', keys: [['Ctrl', 'Shift', 'U']], desc: 'Expand/collapse formula bar', tip: 'Berguna untuk melihat formula panjang secara penuh.', tags: [], color: '#ef4444' },
            { id: 56, cat: 'data', keys: [['F11']], desc: 'Buat Chart dari data yang diseleksi', tip: 'Chart otomatis di sheet baru. Alt+F1 untuk chart di sheet yang sama.', tags: ['analyst'], color: '#ef4444' },
            { id: 57, cat: 'data', keys: [['Alt', 'F1']], desc: 'Insert Chart di sheet aktif (embedded)', tip: 'Chart langsung muncul di sheet yang sama dengan data.', tags: ['analyst'], color: '#ef4444' },
            { id: 58, cat: 'data', keys: [['Ctrl', 'Q']], desc: 'Quick Analysis Tool', tip: 'Seleksi data, tekan Ctrl+Q untuk opsi format, chart, total, dll. Power feature!', tags: ['analyst'], color: '#ef4444' },
            { id: 59, cat: 'data', keys: [['Alt', 'D', 'P']], desc: 'Buka PivotTable Wizard', tip: 'Cara lama tapi masih works untuk buat pivot dengan opsi advanced.', tags: ['analyst'], color: '#ef4444' },
            { id: 60, cat: 'data', keys: [['Ctrl', 'Shift', 'P']], desc: 'Buka Format Cells > Font size', tip: '', tags: [], color: '#ef4444' },

            // PIVOT TABLE
            { id: 61, cat: 'pivot', keys: [['Alt', 'N', 'V']], desc: 'Insert PivotTable baru', tip: 'Shortcut ribbon untuk langsung buka dialog Insert PivotTable.', tags: ['essential', 'analyst'], color: '#a78bfa' },
            { id: 62, cat: 'pivot', keys: [['Alt', 'JT']], desc: 'Aktifkan PivotTable Tools tab', tip: 'Muncul saat sel aktif ada di dalam PivotTable.', tags: ['analyst'], color: '#a78bfa' },
            { id: 63, cat: 'pivot', keys: [['F5']], desc: 'Refresh PivotTable aktif', tip: 'Perbarui data pivot jika sumber data berubah. Alt+F5 refresh semua.', tags: ['essential', 'analyst'], color: '#a78bfa' },
            { id: 64, cat: 'pivot', keys: [['Alt', 'F5']], desc: 'Refresh All PivotTables', tip: 'Update semua pivot di workbook sekaligus.', tags: ['analyst'], color: '#a78bfa' },
            { id: 65, cat: 'pivot', keys: [['Ctrl', 'Shift', '*']], desc: 'Pilih seluruh PivotTable', tip: 'Seleksi semua area pivot sekaligus.', tags: ['analyst'], color: '#a78bfa' },
            { id: 66, cat: 'pivot', keys: [['Enter']], desc: 'Drill down (lihat detail baris/kolom pivot)', tip: 'Double click atau Enter di nilai untuk buka detail di sheet baru.', tags: ['analyst'], color: '#a78bfa' },
            { id: 67, cat: 'pivot', keys: [['Alt', 'J', 'T', 'I']], desc: 'Buka Field List PivotTable', tip: 'Tampilkan/sembunyikan panel field list untuk drag & drop field.', tags: ['analyst'], color: '#a78bfa' },

            // FILE & WORKBOOK
            { id: 68, cat: 'file', keys: [['Ctrl', 'S']], desc: 'Save — simpan file', tip: 'Biasakan tekan ini sesering mungkin! Ctrl+Shift+S untuk Save As.', tags: ['essential'], color: '#64748b' },
            { id: 69, cat: 'file', keys: [['Ctrl', 'Shift', 'S']], desc: 'Save As — simpan dengan nama/lokasi baru', tip: 'Untuk buat versi baru file tanpa menimpa yang lama.', tags: ['essential'], color: '#64748b' },
            { id: 70, cat: 'file', keys: [['Ctrl', 'W']], desc: 'Close workbook (tutup file)', tip: 'Ctrl+F4 juga works. Excel tanya save dulu jika ada perubahan.', tags: [], color: '#64748b' },
            { id: 71, cat: 'file', keys: [['Ctrl', 'N']], desc: 'New workbook (buka file baru)', tip: 'Membuka workbook kosong baru.', tags: [], color: '#64748b' },
            { id: 72, cat: 'file', keys: [['Ctrl', 'O']], desc: 'Open file', tip: 'Buka dialog untuk pilih file Excel yang ada.', tags: [], color: '#64748b' },
            { id: 73, cat: 'file', keys: [['Ctrl', 'P']], desc: 'Print / Print Preview', tip: 'Lihat preview sebelum cetak. Atur margin, orientasi, dll.', tags: [], color: '#64748b' },
            { id: 74, cat: 'file', keys: [['F12']], desc: 'Save As dialog langsung', tip: 'Lebih cepat dari Ctrl+Shift+S untuk pilih lokasi/format file.', tags: [], color: '#64748b' },
            { id: 75, cat: 'file', keys: [['Ctrl', 'F2']], desc: 'Print Preview', tip: 'Lihat tampilan cetak sebelum print.', tags: [], color: '#64748b' },
            { id: 76, cat: 'file', keys: [['Ctrl', 'Z']], desc: 'Undo (multiple steps)', tip: '', tags: [], color: '#64748b' },
            { id: 77, cat: 'file', keys: [['Alt', 'F4']], desc: 'Tutup Excel sepenuhnya', tip: 'Keluar dari aplikasi Excel. Akan tanya save jika ada perubahan.', tags: [], color: '#64748b' },
            { id: 78, cat: 'file', keys: [['Ctrl', 'F6']], desc: 'Pindah antar workbook yang terbuka', tip: 'Jika buka beberapa file Excel, ini untuk switch antar file.', tags: [], color: '#64748b' },
        ];

        // ══════════════════════════════════════════════
        //  STATE
        // ══════════════════════════════════════════════
        let learned = JSON.parse(localStorage.getItem('xl_learned') || '[]');
        let currentCat = 'all';
        let currentSearch = '';
        let currentTab = 'learn';

        // ══════════════════════════════════════════════
        //  RENDER
        // ══════════════════════════════════════════════
        function renderKeys(keys) {
            return keys.map(combo => {
                if (!Array.isArray(combo)) return `<span class="key">${combo}</span>`;
                return combo.map((k, i) => `<span class="key">${k}</span>${i < combo.length - 1 ? '<span class="key plus">+</span>' : ''}`).join('');
            }).join('<span class="key plus" style="margin:0 4px">atau</span>');
        }

        function renderCard(s) {
            const isLearned = learned.includes(s.id);
            const tagHtml = s.tags.map(t => {
                const label = t === 'essential' ? '🔥 Essential' : t === 'analyst' ? '🎓 Analyst' : t === 'hot' ? '🔥 Hot' : t;
                const cls = t === 'essential' ? 'essential' : t === 'analyst' ? 'analyst' : '';
                return `<span class="tag ${cls}">${label}</span>`;
            }).join('');

            return `
  <div class="shortcut-card ${isLearned ? 'learned' : ''}" style="--card-accent:${s.color}" id="card-${s.id}">
    <div class="card-top">
      <div class="card-desc">${s.desc}</div>
      <span class="learned-badge">✅</span>
    </div>
    <div class="keys-row">${renderKeys(s.keys)}</div>
    ${s.tip ? `<div class="card-tip">💡 ${s.tip}</div>` : ''}
    ${tagHtml ? `<div class="tag-row">${tagHtml}</div>` : ''}
    <button class="learn-btn" onclick="toggleLearn(${s.id})">
      ${isLearned ? '✅ Sudah Hafal!' : '📝 Tandai Sudah Hafal'}
    </button>
  </div>`;
        }

        function filteredShortcuts() {
            return shortcuts.filter(s => {
                const matchCat =
                    currentCat === 'all' ? true :
                        currentCat === 'learned' ? learned.includes(s.id) :
                            currentCat === 'essential' ? s.tags.includes('essential') :
                                currentCat === 'analyst' ? s.tags.includes('analyst') :
                                    s.cat === currentCat;

                const searchTerm = currentSearch.toLowerCase();
                const matchSearch = !searchTerm ||
                    s.desc.toLowerCase().includes(searchTerm) ||
                    s.tip.toLowerCase().includes(searchTerm) ||
                    s.keys.flat().join(' ').toLowerCase().includes(searchTerm);

                return matchCat && matchSearch;
            });
        }

        function render() {
            const list = filteredShortcuts();
            const grid = document.getElementById('shortcutsGrid');

            if (!list.length) {
                grid.innerHTML = `<div class="empty" style="grid-column:1/-1">
      <div class="e-icon">🔍</div>
      <h3>Tidak ada shortcut ditemukan</h3>
      <p>Coba kata kunci lain atau pilih kategori berbeda</p>
    </div>`;
                return;
            }

            grid.innerHTML = list.map(renderCard).join('');
            updateCounts();
            updateStats();
        }

        function updateCounts() {
            const cats = ['navigate', 'select', 'edit', 'formula', 'data', 'pivot', 'file'];
            document.getElementById('cnt-all').textContent = shortcuts.length;
            cats.forEach(c => {
                const el = document.getElementById('cnt-' + c);
                if (el) el.textContent = shortcuts.filter(s => s.cat === c).length;
            });
            document.getElementById('cnt-learned').textContent = learned.length;
            document.getElementById('cnt-essential').textContent = shortcuts.filter(s => s.tags.includes('essential')).length;
            document.getElementById('cnt-analyst').textContent = shortcuts.filter(s => s.tags.includes('analyst')).length;
        }

        function updateStats() {
            const total = shortcuts.length;
            const done = learned.length;
            const pct = total ? Math.round(done / total * 100) : 0;
            document.getElementById('learnedCount').textContent = done;
            document.getElementById('totalCount').textContent = total;
            document.getElementById('progressFill').style.width = pct + '%';
            const wrap = document.getElementById('progressBarWrap');
            if (wrap) wrap.setAttribute('aria-valuenow', String(pct));

            const bestScore = parseInt(localStorage.getItem('xl_best_score') || '0', 10);
            const chip = document.getElementById('bestScoreChip');
            const chipVal = document.getElementById('bestScoreVal');
            if (chip && chipVal) {
                if (bestScore > 0) {
                    chip.style.display = 'inline-flex';
                    chipVal.textContent = bestScore + '%';
                } else {
                    chip.style.display = 'none';
                }
            }
        }

        // ══════════════════════════════════════════════
        //  ACTIONS
        // ══════════════════════════════════════════════
        function resetProgress() {
            if (!confirm('Reset semua progress hafalan shortcut? Skor terbaik quiz juga akan dihapus. Tindakan ini tidak bisa dibatalkan.')) return;
            learned = [];
            localStorage.removeItem('xl_learned');
            localStorage.removeItem('xl_best_score');
            render();
            if (window.EAH && window.EAH.showToast) {
                window.EAH.showToast('Direset', 'Progress shortcut sudah dikosongkan.', '↺');
            }
        }

        function toggleLearn(id) {
            if (learned.includes(id)) {
                learned = learned.filter(x => x !== id);
            } else {
                learned.push(id);
            }
            localStorage.setItem('xl_learned', JSON.stringify(learned));
            const card = document.getElementById('card-' + id);
            if (card) {
                card.classList.toggle('learned');
                const btn = card.querySelector('.learn-btn');
                const badge = card.querySelector('.learned-badge');
                if (learned.includes(id)) {
                    btn.textContent = '✅ Sudah Hafal!';
                } else {
                    btn.textContent = '📝 Tandai Sudah Hafal';
                }
            }
            updateStats();
            updateCounts();
        }

        function filterCat(cat, btn) {
            currentCat = cat;
            document.querySelectorAll('.cat-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-pressed', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');

            const titles = {
                all: '⚡ Semua Shortcut', navigate: '🧭 Navigasi', select: '✅ Seleksi Data',
                edit: '✏️ Edit & Format', formula: '📐 Formula', data: '📊 Data & Analisis',
                pivot: '🔄 PivotTable', file: '💾 File & Workbook',
                learned: '✅ Sudah Dikuasai', essential: '🔥 Paling Penting', analyst: '🎓 Analyst Specific'
            };
            document.getElementById('sectionTitle').textContent = titles[cat] || cat;

            if (currentTab === 'learn') render();
        }

        function filterSearch() {
            currentSearch = document.getElementById('searchInput').value;
            render();
        }

        function switchTab(tab, btn) {
            currentTab = tab;
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById('tab-learn').style.display = tab === 'learn' ? '' : 'none';
            document.getElementById('tab-cheatsheet').style.display = tab === 'cheatsheet' ? '' : 'none';
            if (tab === 'cheatsheet') renderCheatSheet();
        }

        // ══════════════════════════════════════════════
        //  CHEAT SHEET
        // ══════════════════════════════════════════════
        function renderCheatSheet() {
            const cats = [
                { key: 'navigate', label: '🧭 Navigasi', color: '#00d4ff' },
                { key: 'select', label: '✅ Seleksi', color: '#7c3aed' },
                { key: 'edit', label: '✏️ Edit & Format', color: '#f59e0b' },
                { key: 'formula', label: '📐 Formula', color: '#10b981' },
                { key: 'data', label: '📊 Data & Analisis', color: '#ef4444' },
                { key: 'pivot', label: '🔄 PivotTable', color: '#a78bfa' },
                { key: 'file', label: '💾 File', color: '#64748b' },
            ];

            const grid = document.getElementById('cheatsheetGrid');
            grid.innerHTML = cats.map(c => {
                const list = shortcuts.filter(s => s.cat === c.key);
                const rows = list.map(s => `
      <div class="cs-row">
        <div class="cs-desc">${s.desc}</div>
        <div class="cs-keys">${renderKeys(s.keys)}</div>
      </div>
    `).join('');
                return `<div class="cs-card">
      <div class="cs-header" style="border-top:2px solid ${c.color}">${c.label}</div>
      ${rows}
    </div>`;
            }).join('');
        }

        // ══════════════════════════════════════════════
        //  QUIZ
        // ══════════════════════════════════════════════
        let quizData = [];
        let quizIndex = 0;
        let quizScore = 0;

        function openQuiz() {
            // Shuffle and pick 10 from essential + analyst
            const pool = shortcuts.filter(s => s.tags.includes('essential') || s.tags.includes('analyst'));
            quizData = shuffle(pool).slice(0, 10);
            quizIndex = 0;
            quizScore = 0;
            document.getElementById('quizOverlay').classList.add('active');
            renderQuestion();
        }

        function closeQuiz() {
            document.getElementById('quizOverlay').classList.remove('active');
        }

        function shuffle(arr) {
            const a = [...arr];
            for (let i = a.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [a[i], a[j]] = [a[j], a[i]];
            }
            return a;
        }

        function renderQuestion() {
            if (quizIndex >= quizData.length) {
                renderQuizResult();
                return;
            }

            const q = quizData[quizIndex];
            const correctKeys = q.keys[0].join ? q.keys[0].join(' + ') : q.keys[0];

            // Generate 3 unique wrong answers (dedupe by text so we never show
            // two options with an identical key combo, and never accidentally
            // reuse the correct answer's own combo as a "wrong" option)
            const seenTexts = new Set([correctKeys]);
            const wrong = [];
            shuffle(shortcuts.filter(s => s.id !== q.id)).forEach(s => {
                if (wrong.length >= 3) return;
                const txt = s.keys[0].join ? s.keys[0].join(' + ') : s.keys[0];
                if (seenTexts.has(txt)) return;
                seenTexts.add(txt);
                wrong.push(txt);
            });

            const options = shuffle([correctKeys, ...wrong]);
            const letters = ['A', 'B', 'C', 'D'];

            document.getElementById('quizContent').innerHTML = `
    <div class="quiz-progress" aria-live="polite">SOAL ${quizIndex + 1} / ${quizData.length} &nbsp;·&nbsp; SKOR: ${quizScore}</div>
    <div class="quiz-question">${q.desc}</div>
    <div class="quiz-sub">Shortcut apa yang digunakan untuk fungsi ini? <span style="opacity:.7">(tekan 1-4 atau A-D)</span></div>
    <div class="quiz-options">
      ${options.map((opt, i) => `<button class="quiz-opt" onclick="checkAnswer(this, '${opt.replace(/'/g, "\\'")}', '${correctKeys.replace(/'/g, "\\'")}', ${q.id})"><span aria-hidden="true" style="opacity:.55;margin-right:4px">${letters[i]}.</span>${opt}</button>`).join('')}
    </div>
    <div style="font-size:12px;color:var(--text-dim);text-align:center">Klik atau tekan tombol keyboard untuk jawaban yang benar</div>
  `;
        }

        function checkAnswer(btn, chosen, correct, id) {
            document.querySelectorAll('.quiz-opt').forEach(b => b.disabled = true);

            if (chosen === correct) {
                btn.classList.add('correct');
                quizScore++;
            } else {
                btn.classList.add('wrong');
                document.querySelectorAll('.quiz-opt').forEach(b => {
                    if (b.textContent.trim() === correct) b.classList.add('correct');
                });
            }

            setTimeout(() => {
                quizIndex++;
                renderQuestion();
            }, 1200);
        }

        function renderQuizResult() {
            const pct = Math.round(quizScore / quizData.length * 100);
            const msg = pct >= 80 ? '🔥 Luar biasa! Kamu sudah menguasai shortcut ini.' :
                pct >= 60 ? '👍 Bagus! Terus latihan untuk hafalin yang tersisa.' :
                    '💪 Tetap semangat! Review lagi kartu yang belum hafal.';

            const prevBest = parseInt(localStorage.getItem('xl_best_score') || '0', 10);
            const isNewBest = pct > prevBest && pct > 0;
            if (pct > prevBest) {
                localStorage.setItem('xl_best_score', String(pct));
            }
            updateStats();

            document.getElementById('quizContent').innerHTML = `
    <div class="quiz-result">
      <div class="score">${quizScore}/${quizData.length}</div>
      <div style="font-family:'Syne',sans-serif;font-size:22px;font-weight:700;margin-bottom:12px">${pct}% Benar</div>
      ${isNewBest ? '<div style="color:var(--accent3);font-size:13px;font-weight:600;margin-bottom:10px">🏆 Rekor skor baru!</div>' : ''}
      <p>${msg}</p>
      <button class="quiz-btn" onclick="openQuiz()" style="margin-right:8px">🔄 Ulangi Quiz</button>
      <button class="quiz-btn" onclick="closeQuiz()" style="background:var(--surface2);border:1px solid var(--border);color:var(--text-mid)">Tutup</button>
    </div>
  `;

            celebrateQuizPass(pct, isNewBest);
        }

        // ══════════════════════════════════════════════
        //  REWARD ANIMATION — reuses the same celebration
        //  overlay (confetti + glowing badge pop-up) as the
        //  quiz on learn.html. Purely client-side, no XP,
        //  no database write — just a congratulations moment.
        // ══════════════════════════════════════════════
        function celebrateQuizPass(pct, isNewBest) {
            if (pct < 60) return; // only celebrate a passing attempt
            if (!window.EAH_Badge || typeof window.EAH_Badge.celebrate !== 'function') return;

            let title, desc, icon;
            if (isNewBest) {
                title = 'Rekor Baru!'; desc = `Skor ${pct}% — yang terbaik sejauh ini. Terus pertahankan!`; icon = '🏆';
            } else if (pct >= 90) {
                title = 'Shortcut Master!'; desc = `Skor ${pct}% — hampir sempurna, kamu benar-benar hafal!`; icon = '⌨️';
            } else if (pct >= 80) {
                title = 'Kerja Bagus!'; desc = `Skor ${pct}% — penguasaan shortcut kamu sudah solid.`; icon = '🎉';
            } else {
                title = 'Selamat, Lulus!'; desc = `Skor ${pct}% — terus berlatih untuk makin lancar.`; icon = '✅';
            }

            setTimeout(function () {
                window.EAH_Badge.celebrate([{
                    badge_key: 'shortcut_quiz_pass',
                    badge_name: title,
                    badge_description: desc,
                    icon_emoji: icon
                }]);
            }, 300);
        }

        // ══════════════════════════════════════════════
        //  KEYBOARD SHORTCUTS FOR QUIZ (1-4 / A-D, Esc to close)
        // ══════════════════════════════════════════════
        document.addEventListener('keydown', function (e) {
            const overlay = document.getElementById('quizOverlay');
            if (!overlay || !overlay.classList.contains('active')) return;

            if (e.key === 'Escape') {
                closeQuiz();
                return;
            }

            const opts = Array.from(document.querySelectorAll('.quiz-opt:not(:disabled)'));
            if (!opts.length) return;

            let idx = -1;
            if (/^[1-4]$/.test(e.key)) idx = parseInt(e.key, 10) - 1;
            else if (/^[a-dA-D]$/.test(e.key)) idx = e.key.toUpperCase().charCodeAt(0) - 65;

            if (idx >= 0 && idx < opts.length) {
                opts[idx].click();
            }
        });

        // ══════════════════════════════════════════════
        //  INIT
        // ══════════════════════════════════════════════
        render();
