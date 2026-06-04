/* ============================================
   EXCEL ANALYST HUB — DATASET GENERATOR
   Generates logical dummy data for CSV downloads
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const btnGenerate = document.getElementById('btn-generate-csv');
  if (!btnGenerate) return;

  btnGenerate.addEventListener('click', function() {
    // 1. Get input values
    let rowCount = parseInt(document.getElementById('ds-rows').value) || 500;
    if (rowCount > 10000) rowCount = 10000; // Cap at 10,000 for browser safety
    if (rowCount < 1) rowCount = 10;

    // 2. Get checked columns
    const cols = [];
    document.querySelectorAll('.ds-col-checkbox:checked').forEach(cb => cols.push(cb.value));

    if (cols.length === 0) {
      alert("⚠️ Pilih minimal satu kolom untuk di-generate!");
      return;
    }

    // 3. Data Pools (Dictionary)
    const regions = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar", "Semarang", "Yogyakarta", "Bali"];
    const salesNames = ["Budi Santoso", "Siti Aminah", "Andi Pratama", "Dewi Lestari", "Reza Rahadian", "Ayu Tingting", "Fajar Nugraha", "Dina Mariana", "Kevin Wijaya", "Nisa Sabyan"];
    
    // Structured logic so prices match categories
    const categories = {
      "Elektronik": [
        {name: "Laptop Pro 15", min: 12000000, max: 20000000},
        {name: "Smartphone X", min: 5000000, max: 12000000},
        {name: "Wireless Earbuds", min: 500000, max: 1500000},
        {name: "Monitor 27 Inch", min: 2500000, max: 4000000}
      ],
      "Pakaian": [
        {name: "Kemeja Flanel", min: 150000, max: 300000},
        {name: "Celana Jeans Slim", min: 200000, max: 500000},
        {name: "Kaos Polos Basic", min: 50000, max: 100000},
        {name: "Jaket Bomber", min: 250000, max: 600000}
      ],
      "Office": [
        {name: "Kursi Ergonomis", min: 1000000, max: 3000000},
        {name: "Meja Kerja Minimalis", min: 800000, max: 2000000},
        {name: "Buku Catatan Premium", min: 40000, max: 80000},
        {name: "Lampu Meja LED", min: 150000, max: 350000}
      ]
    };

    // 4. Helper Functions
    function getRandomDate() {
      const start = new Date(2023, 0, 1).getTime(); // Start from Jan 1, 2023
      const end = new Date().getTime(); // Until today
      const d = new Date(start + Math.random() * (end - start));
      return d.toISOString().split('T')[0]; // Format: YYYY-MM-DD
    }
    function randomItem(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
    function randomInt(min, max) { 
      // Round to nearest 1000 to make prices look realistic
      return Math.round((Math.floor(Math.random() * (max - min + 1)) + min) / 1000) * 1000; 
    }

    // 5. Generate CSV Content
    let csvContent = "";
    // Header
    csvContent += cols.join(";") + "\n"; // Using semicolon for Indonesian Excel standard

    // Body
    for (let i = 1; i <= rowCount; i++) {
      let row = [];
      
      // Pre-calculate coherent row data so Product matches Category & Price
      let catName = randomItem(Object.keys(categories));
      let prodObj = randomItem(categories[catName]);
      let price = randomInt(prodObj.min, prodObj.max);
      let qty = Math.floor(Math.random() * 15) + 1; // 1 to 15 items
      
      cols.forEach(col => {
        switch(col) {
          case "Order_ID": row.push("ORD-" + (10000 + i)); break;
          case "Tanggal": row.push(getRandomDate()); break;
          case "Region": row.push(randomItem(regions)); break;
          case "Nama_Sales": row.push(randomItem(salesNames)); break;
          case "Kategori": row.push(catName); break;
          case "Produk": row.push(prodObj.name); break;
          case "Harga_Satuan": row.push(price); break;
          case "Kuantitas": row.push(qty); break;
          case "Total_Penjualan": row.push(price * qty); break;
          default: row.push("");
        }
      });
      csvContent += row.join(";") + "\n";
    }

    // 6. Trigger Download
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "Dataset_Latihan_EAH.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // 7. Generate Live Preview Table (First 5 Rows)
    const previewContainer = document.getElementById('dataset-preview-container');
    const previewTable = document.getElementById('dataset-preview-table');
    
    if (previewContainer && previewTable) {
      let tableHTML = '<table style="width:100%; border-collapse: collapse; font-size: 0.9rem;"><thead><tr>';
      
      // Headers
      cols.forEach(col => {
        tableHTML += `<th style="background:var(--surface-2); padding:10px; border-bottom:1px solid var(--border);">${col.replace(/_/g, ' ')}</th>`;
      });
      tableHTML += '</tr></thead><tbody>';
      
      // Limit preview to max 5 rows
      const previewRows = Math.min(5, rowCount);
      const dataRows = csvContent.trim().split('\n').slice(1);
      for (let i = 0; i < previewRows; i++) {
        tableHTML += '<tr>';
        const rowData = dataRows[i].split(';');
        rowData.forEach(cell => {
          tableHTML += `<td style="padding:10px; border-bottom:1px solid var(--border);">${cell}</td>`;
        });
        tableHTML += '</tr>';
      }
      tableHTML += '</tbody></table>';
      
      previewTable.innerHTML = tableHTML;
      previewContainer.style.display = 'block';
    }

    // 8. Trigger Global Toast & Button Feedback
    if (window.EAH && window.EAH.showToast) {
       window.EAH.showToast('Dataset Siap!', `${rowCount} Baris Data Berhasil Dibuat`, '🎲');
    }
    
    const originalText = btnGenerate.innerHTML;
    btnGenerate.innerHTML = "✓ Berhasil Diunduh!";
    btnGenerate.style.background = "rgba(16, 185, 129, 0.1)"; 
    btnGenerate.style.borderColor = "#10b981";
    btnGenerate.style.color = "#10b981";
    
    setTimeout(() => {
      btnGenerate.innerHTML = originalText;
      btnGenerate.style.background = ""; 
      btnGenerate.style.borderColor = ""; 
      btnGenerate.style.color = "";
    }, 3000);

  });
});
