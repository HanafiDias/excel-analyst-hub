/* ============================================
   EXCEL ANALYST HUB — DATASET GENERATOR
   assets/js/dataset-gen.js
   ============================================ */

(function () {
  'use strict';

  /* ---- Master data pools ---- */
  var NAMES = [
    'Budi Santoso','Sari Dewi','Ahmad Fauzi','Rina Kusuma','Dodi Pratama',
    'Fitri Handayani','Agus Wijaya','Dewi Rahayu','Rudi Hermawan','Lina Marlina',
    'Hendra Kurniawan','Nisa Pratiwi','Yusuf Hakim','Sri Mulyani','Bambang Susilo',
    'Ayu Lestari','Faisal Rahman','Mega Putri','Tono Setiawan','Indah Permata',
    'Rizki Hidayat','Wulan Sari','Anton Budiman','Ely Susanti','Hadi Purnomo'
  ];

  var CITIES = ['Jakarta','Surabaya','Bandung','Medan','Makassar','Semarang','Yogyakarta'];
  var CITIES_TYPO = ['Jakrta','Surabya','Badnung','Medn','Makassar','Semarang','Yogyakarta'];

  var PRODUCTS = {
    penjualan: [
      {nama:'Laptop',kategori:'Elektronik',harga:8500000},
      {nama:'Mouse',kategori:'Aksesoris',harga:150000},
      {nama:'Keyboard',kategori:'Aksesoris',harga:350000},
      {nama:'Monitor',kategori:'Elektronik',harga:3500000},
      {nama:'Headset',kategori:'Elektronik',harga:500000}
    ]
  };

  var DEPARTMENTS = ['Finance','Marketing','IT','Operations','HR'];
  var POSITIONS = {
    Finance: ['Staff Keuangan','Analis Keuangan','Manager Keuangan'],
    Marketing: ['Staff Marketing','Digital Marketing','Manager Marketing'],
    IT: ['Junior Developer','Senior Developer','IT Manager'],
    Operations: ['Staff Operasional','Supervisor Operasional','Manager Operasional'],
    HR: ['Staff HR','Recruiter','Manager HR']
  };
  var SALARIES = {
    'Staff Keuangan':6500000,'Analis Keuangan':9500000,'Manager Keuangan':18000000,
    'Staff Marketing':6000000,'Digital Marketing':7500000,'Manager Marketing':15000000,
    'Junior Developer':7500000,'Senior Developer':13500000,'IT Manager':20000000,
    'Staff Operasional':5500000,'Supervisor Operasional':10000000,'Manager Operasional':17000000,
    'Staff HR':6000000,'Recruiter':8000000,'Manager HR':15000000
  };

  var INVENTORY_ITEMS = [
    {kode:'BRG001',nama:'Laptop Asus VivoBook',kategori:'Elektronik',beli:7800000,jual:9500000,supplier:'PT Asus Indonesia'},
    {kode:'BRG002',nama:'Mouse Logitech M90',kategori:'Aksesoris',beli:85000,jual:150000,supplier:'CV Mitra Komputer'},
    {kode:'BRG003',nama:'Keyboard Logitech K380',kategori:'Aksesoris',beli:220000,jual:350000,supplier:'CV Mitra Komputer'},
    {kode:'BRG004',nama:'Monitor Samsung 24"',kategori:'Elektronik',beli:2800000,jual:3500000,supplier:'PT Samsung'},
    {kode:'BRG005',nama:'Headset JBL Tune 500',kategori:'Elektronik',beli:320000,jual:500000,supplier:'PT JBL'},
    {kode:'BRG006',nama:'USB Hub 4 Port',kategori:'Aksesoris',beli:70000,jual:120000,supplier:'CV Ugreen Store'},
    {kode:'BRG007',nama:'Webcam Logitech C270',kategori:'Elektronik',beli:350000,jual:500000,supplier:'CV Mitra Komputer'},
    {kode:'BRG008',nama:'SSD Crucial 500GB',kategori:'Komponen',beli:550000,jual:800000,supplier:'PT Crucial'},
    {kode:'BRG009',nama:'RAM Kingston 8GB',kategori:'Komponen',beli:380000,jual:580000,supplier:'PT Kingston'},
    {kode:'BRG010',nama:'Flashdisk Sandisk 32GB',kategori:'Aksesoris',beli:55000,jual:95000,supplier:'PT Sandisk'}
  ];

  var ATTEND_STATUS = ['Hadir','Hadir','Hadir','Hadir','Hadir','Izin','Sakit','Alpha'];
  var SALES_REPS = ['Budi Santoso','Sari Dewi','Ahmad Fauzi','Rina Kusuma','Dodi Pratama'];
  var REGIONS = ['Jakarta','Surabaya','Bandung','Medan','Makassar'];

  /* ---- Utility helpers ---- */
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function randInt(min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; }
  function randFloat(min, max, dec) { return parseFloat((Math.random() * (max - min) + min).toFixed(dec)); }

  function randomDate(daysBack) {
    var d = new Date();
    d.setDate(d.getDate() - randInt(0, daysBack));
    var dd = String(d.getDate()).padStart(2, '0');
    var mm = String(d.getMonth() + 1).padStart(2, '0');
    var yyyy = d.getFullYear();
    return dd + '/' + mm + '/' + yyyy;
  }

  function randomDateAlt(daysBack) {
    var d = new Date();
    d.setDate(d.getDate() - randInt(0, daysBack));
    return d.getFullYear() + '-' + String(d.getMonth()+1).padStart(2,'0') + '-' + String(d.getDate()).padStart(2,'0');
  }

  function maybeBlank(val, chance) {
    return Math.random() < chance ? '' : val;
  }

  function injectErrors(rows, ratio) {
    // 1. Duplicate ~5%
    var nDup = Math.max(1, Math.floor(rows.length * 0.05));
    for (var d = 0; d < nDup; d++) {
      var src = rows[randInt(0, rows.length - 1)];
      rows.push(Object.assign({}, src));
    }
    // 2. Blank some fields
    rows.forEach(function (r) {
      Object.keys(r).forEach(function (k) {
        if (Math.random() < 0.04) r[k] = '';
      });
    });
    // 3. Typos in city/region fields
    rows.forEach(function (r) {
      ['Region','Kota'].forEach(function (f) {
        if (r[f] && Math.random() < 0.06) {
          var idx = CITIES.indexOf(r[f]);
          if (idx >= 0) r[f] = CITIES_TYPO[idx];
        }
      });
    });
    // 4. Negative numbers (~3%)
    rows.forEach(function (r) {
      ['Qty','Stok_Masuk','Gaji'].forEach(function (f) {
        if (r[f] && Math.random() < 0.03) r[f] = -Math.abs(r[f]);
      });
    });
    // 5. Mixed date formats (~10%)
    rows.forEach(function (r) {
      ['Tanggal','Tanggal_Masuk'].forEach(function (f) {
        if (r[f] && Math.random() < 0.10 && r[f].includes('/')) {
          var parts = r[f].split('/');
          r[f] = parts[2] + '-' + parts[1] + '-' + parts[0];
        }
      });
    });
    return rows;
  }

  /* ---- Generators ---- */
  function generatePenjualan(n, errors) {
    var rows = [];
    for (var i = 0; i < n; i++) {
      var prod = rand(PRODUCTS.penjualan);
      var qty = randInt(1, 20);
      rows.push({
        Tanggal: randomDate(365),
        Produk: prod.nama,
        Kategori: prod.kategori,
        Region: rand(REGIONS),
        Sales_Rep: rand(SALES_REPS),
        Qty: qty,
        Harga_Satuan: prod.harga,
        Total_Penjualan: qty * prod.harga
      });
    }
    return errors ? injectErrors(rows, 0.05) : rows;
  }

  function generateKaryawan(n, errors) {
    var rows = [];
    for (var i = 0; i < n; i++) {
      var dept = rand(DEPARTMENTS);
      var pos = rand(POSITIONS[dept]);
      var gaji = SALARIES[pos] || 6000000;
      rows.push({
        ID_Karyawan: 'EMP' + String(i + 1).padStart(3, '0'),
        Nama: rand(NAMES),
        Departemen: dept,
        Jabatan: pos,
        Tanggal_Masuk: randomDate(365 * 8),
        Gaji: gaji + randInt(-500000, 500000),
        Status: rand(['Aktif','Aktif','Aktif','Aktif','Resign','Cuti']),
        Kota: rand(CITIES)
      });
    }
    return errors ? injectErrors(rows, 0.05) : rows;
  }

  function generateInventory(n, errors) {
    var rows = [];
    for (var i = 0; i < n; i++) {
      var item = INVENTORY_ITEMS[i % INVENTORY_ITEMS.length];
      var stokAwal = randInt(5, 60);
      var stokMasuk = randInt(10, 80);
      var stokKeluar = randInt(5, stokAwal + stokMasuk - 1);
      rows.push({
        Kode_Barang: item.kode + (i >= INVENTORY_ITEMS.length ? '_' + i : ''),
        Nama_Barang: item.nama,
        Kategori: item.kategori,
        Stok_Awal: stokAwal,
        Stok_Masuk: stokMasuk,
        Stok_Keluar: stokKeluar,
        Stok_Akhir: stokAwal + stokMasuk - stokKeluar,
        Harga_Beli: item.beli,
        Harga_Jual: item.jual,
        Supplier: item.supplier
      });
    }
    return errors ? injectErrors(rows, 0.05) : rows;
  }

  function generateAbsensi(n, errors) {
    var rows = [];
    var empCount = Math.min(10, Math.ceil(n / 20));
    var emps = NAMES.slice(0, empCount);
    var count = 0;
    var daysBack = 90;
    for (var day = daysBack; day >= 0 && count < n; day--) {
      var d = new Date();
      d.setDate(d.getDate() - day);
      if (d.getDay() === 0 || d.getDay() === 6) continue;
      var dd = String(d.getDate()).padStart(2,'0');
      var mm = String(d.getMonth()+1).padStart(2,'0');
      var tgl = dd + '/' + mm + '/' + d.getFullYear();
      for (var e = 0; e < emps.length && count < n; e++) {
        var status = rand(ATTEND_STATUS);
        var terlambat = (status === 'Hadir') ? (Math.random() < 0.25 ? randInt(5, 90) : 0) : 0;
        var overtime = (status === 'Hadir') ? (Math.random() < 0.3 ? randFloat(0.5, 4, 1) : 0) : 0;
        var masuk = (status === 'Hadir') ? ('0' + Math.floor(8 + terlambat / 60)).slice(-2) + ':' + ('0' + (terlambat % 60)).slice(-2) : '-';
        var keluar = (status === 'Hadir') ? (overtime > 0 ? String(17 + Math.floor(overtime)) + ':00' : '17:00') : '-';
        rows.push({
          Tanggal: tgl,
          ID_Karyawan: 'EMP' + String(e + 1).padStart(3,'0'),
          Nama: emps[e],
          Status_Hadir: status,
          Jam_Masuk: masuk,
          Jam_Keluar: keluar,
          Keterlambatan_Menit: terlambat,
          Overtime_Jam: overtime
        });
        count++;
      }
    }
    return errors ? injectErrors(rows, 0.05) : rows;
  }

  /* ---- Public API ---- */
  function generateDataset(type, rows, includeErrors) {
    switch (type) {
      case 'penjualan': return generatePenjualan(rows, includeErrors);
      case 'karyawan':  return generateKaryawan(rows, includeErrors);
      case 'inventory': return generateInventory(rows, includeErrors);
      case 'absensi':   return generateAbsensi(rows, includeErrors);
      default: return [];
    }
  }

  function previewDataset(data, containerId, maxRows) {
    maxRows = maxRows || 5;
    var container = document.getElementById(containerId);
    if (!container || !data || !data.length) return;
    var preview = data.slice(0, maxRows);
    var keys = Object.keys(preview[0]);
    var html = '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">';
    html += '<table class="ref-table" style="min-width:600px;">';
    html += '<thead><tr>' + keys.map(function(k){ return '<th>' + k + '</th>'; }).join('') + '</tr></thead>';
    html += '<tbody>';
    preview.forEach(function(row) {
      html += '<tr>' + keys.map(function(k){
        var v = row[k] === '' ? '<span style="color:var(--danger);font-size:0.75em;">(kosong)</span>' : row[k];
        return '<td>' + v + '</td>';
      }).join('') + '</tr>';
    });
    html += '</tbody></table></div>';
    container.innerHTML = html;
  }

  function downloadCSV(data, filename) {
    if (!data || !data.length) return;
    var keys = Object.keys(data[0]);
    var bom = '\uFEFF';
    var csv = bom + keys.join(';') + '\n';
    data.forEach(function(row) {
      csv += keys.map(function(k){ return String(row[k] === null || row[k] === undefined ? '' : row[k]); }).join(';') + '\n';
    });
    var blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url;
    a.download = filename || 'dataset.csv';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  function copyAsJSON(data, btn) {
    if (!data || !data.length) return;
    var json = JSON.stringify(data, null, 2);
    navigator.clipboard.writeText(json).then(function() {
      if (btn) {
        var orig = btn.textContent;
        btn.textContent = '✓ Tersalin!';
        setTimeout(function(){ btn.textContent = orig; }, 2000);
      }
    }).catch(function() {
      var ta = document.createElement('textarea');
      ta.value = json;
      ta.style.cssText = 'position:fixed;opacity:0;';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      if (btn) { btn.textContent = '✓ Tersalin!'; setTimeout(function(){ btn.textContent = 'Copy JSON'; }, 2000); }
    });
  }

  /* ---- Dataset card preview via fetch ---- */
  function previewCSV(csvUrl, containerId, maxRows) {
    maxRows = maxRows || 10;
    fetch(csvUrl)
      .then(function(r){ return r.text(); })
      .then(function(text) {
        var lines = text.trim().split('\n').filter(Boolean);
        if (lines.length < 2) { document.getElementById(containerId).innerHTML = '<p>Data tidak ditemukan.</p>'; return; }
        var headers = lines[0].split(';');
        var preview = lines.slice(1, maxRows + 1);
        var html = '<div style="overflow-x:auto;-webkit-overflow-scrolling:touch;">';
        html += '<table class="ref-table" style="min-width:500px;">';
        html += '<thead><tr>' + headers.map(function(h){ return '<th>' + h.trim() + '</th>'; }).join('') + '</tr></thead>';
        html += '<tbody>';
        preview.forEach(function(line) {
          var cols = line.split(';');
          html += '<tr>' + cols.map(function(c){ return '<td>' + c.trim() + '</td>'; }).join('') + '</tr>';
        });
        html += '</tbody></table></div>';
        html += '<p style="font-size:0.78rem;color:var(--text-muted);margin-top:var(--space-3);">Menampilkan ' + preview.length + ' dari ' + (lines.length - 1) + ' baris</p>';
        document.getElementById(containerId).innerHTML = html;
      })
      .catch(function() {
        document.getElementById(containerId).innerHTML = '<p style="color:var(--danger);">Gagal memuat preview. Coba download langsung.</p>';
      });
  }

  function downloadCSVFile(csvUrl, filename) {
    var a = document.createElement('a');
    a.href = csvUrl;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  /* ---- Expose globally ---- */
  window.DatasetGen = {
    generate: generateDataset,
    preview: previewDataset,
    previewCSV: previewCSV,
    download: downloadCSV,
    downloadFile: downloadCSVFile,
    copyJSON: copyAsJSON
  };

  /* ---- Wire up generator form ---- */
  document.addEventListener('DOMContentLoaded', function() {
    var form = document.getElementById('dataset-gen-form');
    if (!form) return;

    var lastData = null;
    var lastType = 'penjualan';

    var btnGenerate = document.getElementById('btn-generate-dataset');
    var btnDownload = document.getElementById('btn-download-dataset');
    var btnCopyJson = document.getElementById('btn-copy-json');
    var previewWrap = document.getElementById('gen-preview-wrap');
    var previewCont = document.getElementById('gen-preview-table');
    var previewInfo = document.getElementById('gen-preview-info');

    if (btnGenerate) {
      btnGenerate.addEventListener('click', function() {
        var type   = document.getElementById('gen-type').value;
        var rows   = parseInt(document.getElementById('gen-rows').value, 10) || 50;
        var errors = document.getElementById('gen-errors') && document.getElementById('gen-errors').checked;

        rows = Math.max(10, Math.min(500, rows));
        lastType = type;
        lastData = generateDataset(type, rows, errors);

        previewDataset(lastData, 'gen-preview-table', 5);
        if (previewWrap) previewWrap.style.display = 'block';
        if (previewInfo) previewInfo.textContent = lastData.length + ' baris, ' + Object.keys(lastData[0] || {}).length + ' kolom.';
        if (btnDownload) btnDownload.disabled = false;
        if (btnCopyJson) btnCopyJson.disabled = false;
      });
    }

    if (btnDownload) {
      btnDownload.addEventListener('click', function() {
        if (!lastData) return;
        downloadCSV(lastData, lastType + '-generated.csv');
      });
    }

    if (btnCopyJson) {
      btnCopyJson.addEventListener('click', function() {
        copyAsJSON(lastData, btnCopyJson);
      });
    }

    /* ---- Wire dataset card preview modals ---- */
    document.querySelectorAll('[data-preview-csv]').forEach(function(btn) {
      btn.addEventListener('click', function() {
        var csvUrl = btn.dataset.previewCsv;
        var title  = btn.dataset.previewTitle || 'Preview Dataset';
        var modal  = document.getElementById('dataset-modal');
        var modalTitle = document.getElementById('modal-dataset-title');
        var modalBody  = document.getElementById('modal-dataset-body');
        var modalDl    = document.getElementById('modal-download-btn');

        if (!modal) return;
        if (modalTitle) modalTitle.textContent = title;
        if (modalBody)  modalBody.innerHTML = '<p style="color:var(--text-muted);">Memuat data...</p>';
        if (modalDl) { modalDl.onclick = function(){ downloadCSVFile(csvUrl, csvUrl.split('/').pop()); }; }

        modal.classList.add('open');
        document.body.style.overflow = 'hidden';

        previewCSV(csvUrl, 'modal-dataset-body', 10);
      });
    });

    /* close modal */
    var modalClose = document.querySelectorAll('[data-close-modal]');
    modalClose.forEach(function(el) {
      el.addEventListener('click', function() {
        var modal = document.getElementById('dataset-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape') {
        var modal = document.getElementById('dataset-modal');
        if (modal) modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

})();
