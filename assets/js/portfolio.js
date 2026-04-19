/* ============================================
   EXCEL ANALYST HUB — PORTFOLIO FILTERS
   portfolio.js: Project data, render, filter, animations
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     PROJECT DATA
  ------------------------------------------ */
  var PROJECTS = [
    {
      id: 1,
      title: 'Sales Dashboard Q3',
      desc: 'Analisis penjualan regional dengan grafik interaktif dan kalkulasi KPI otomatis di 8 wilayah. Melacak performa vs target dengan perbandingan bulan ke bulan dan kuartal ke kuartal yang langsung terpasang di dashboard.',
      tags: ['Dashboard', 'Charts'],
      icon: '📊',
      difficulty: 'intermediate'
    },
    {
      id: 2,
      title: 'Analisis Segmentasi Pelanggan',
      desc: 'Segmentasi RFM (Recency, Frequency, Monetary) dari 5.000+ data pelanggan menggunakan PivotTable dan PERCENTRANK. Secara otomatis menempatkan pelanggan ke dalam tier (Champion, Loyal, Berisiko, Hilang) dengan rekomendasi retensi yang dapat ditindaklanjuti.',
      tags: ['PivotTable', 'Analysis'],
      icon: '👥',
      difficulty: 'advanced'
    },
    {
      id: 3,
      title: 'HR Attendance Tracker',
      desc: 'Pemantauan kehadiran karyawan bulanan untuk 150+ karyawan dengan peringatan conditional formatting untuk ketidakhadiran, keterlambatan, dan lembur. Terhubung langsung ke kalkulasi potongan gaji melalui VLOOKUP.',
      tags: ['Dashboard', 'HR'],
      icon: '📅',
      difficulty: 'intermediate'
    },
    {
      id: 4,
      title: 'Sistem Manajemen Inventaris',
      desc: 'Pelacakan stok real-time untuk 300+ SKU dengan peringatan pemesanan ulang otomatis ketika jumlah di bawah ambang minimum. Termasuk kalkulasi lead time pemasok dan database kontak pemasok berbasis VLOOKUP.',
      tags: ['Automation', 'Finance'],
      icon: '📦',
      difficulty: 'intermediate'
    },
    {
      id: 5,
      title: 'Template Laporan Keuangan',
      desc: 'P&L bulanan dengan analisis varians otomatis vs anggaran, total bergulir 12 bulan, dan pemformatan satu klik untuk presentasi manajemen. Menggunakan named ranges dan structured references di seluruh file untuk kemudahan pemeliharaan.',
      tags: ['Finance', 'Template'],
      icon: '💰',
      difficulty: 'advanced'
    },
    {
      id: 6,
      title: 'Scorecard Kinerja Karyawan',
      desc: 'Dashboard pelacakan KPI untuk 12 metrik kinerja per karyawan di seluruh periode tinjauan kuartalan. Penilaian otomatis dengan panah tren, perbandingan rekan kerja, dan conditional formatting untuk menyoroti kuartil teratas dan terbawah.',
      tags: ['Dashboard', 'HR'],
      icon: '🏆',
      difficulty: 'advanced'
    },
    {
      id: 7,
      title: 'Kalkulator Komisi Penjualan',
      desc: 'Kalkulasi komisi otomatis di 4 tier dengan kemampuan override untuk penyesuaian per deal. Menggunakan nested IFS dan VLOOKUP terhadap tabel tarif — memperbarui tabel secara otomatis menghitung ulang semua pembayaran.',
      tags: ['Automation', 'Finance'],
      icon: '💵',
      difficulty: 'intermediate'
    },
    {
      id: 8,
      title: 'Konsolidator Data Power Query',
      desc: 'Menggabungkan 12 file ekspor bulanan dari 3 sistem berbeda menjadi satu dataset bersih secara otomatis. Power Query menangani penamaan ulang kolom yang berantakan, inkonsistensi format tanggal, dan penghapusan duplikat — satu tombol Refresh.',
      tags: ['Power Query', 'Automation'],
      icon: '⚡',
      difficulty: 'advanced'
    },
    {
      id: 9,
      title: 'Alat Audit Formula VLOOKUP',
      desc: 'Template untuk mengaudit spreadsheet dengan ketergantungan VLOOKUP yang berat — mengidentifikasi referensi rusak, konsentrasi #N/A, dan menyarankan penggantian INDEX-MATCH. Digunakan dalam proyek migrasi spreadsheet.',
      tags: ['VLOOKUP', 'Template'],
      icon: '🔍',
      difficulty: 'intermediate'
    }
  ];

  var currentFilter = 'All';

  /* ------------------------------------------
     RENDER PROJECTS
  ------------------------------------------ */
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

  function renderProjects(filter) {
    var grid = document.getElementById('project-grid');
    if (!grid) return;

    var filtered = filter === 'All'
      ? PROJECTS
      : PROJECTS.filter(function (p) {
          return p.tags.indexOf(filter) !== -1;
        });

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
          '<a href="#" class="btn-ghost btn-sm" aria-label="Lihat proyek ' + escapeHtml(p.title) + '">Lihat Proyek →</a>' +
        '</div>' +
      '</div>';
    }).join('');

    // Trigger fade-in after a tick
    requestAnimationFrame(function () {
      grid.querySelectorAll('.fade-in').forEach(function (el) {
        // Force reflow
        el.offsetHeight; // eslint-disable-line
        el.classList.add('visible');
      });
    });
  }

  /* ------------------------------------------
     FILTER LOGIC
  ------------------------------------------ */
  function initFilters() {
    document.querySelectorAll('.filter-btn').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.dataset.filter || 'All';
        if (filter === currentFilter) return; // No change

        currentFilter = filter;
        document.querySelectorAll('.filter-btn').forEach(function (b) {
          b.classList.remove('active');
        });
        btn.classList.add('active');

        renderProjects(currentFilter);

        // Update result count
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
     UTILITIES
  ------------------------------------------ */
  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  /* ------------------------------------------
     INIT
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    initFilters();
    renderProjects('All');
  });

})();
