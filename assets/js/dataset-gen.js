/* ============================================
   EXCEL ANALYST HUB — SUPER DATASET GENERATOR V2
   Mendukung: Data Kotor, Multi-Table, Konteks Lokal, Kolom Bisnis Lanjutan & Gamifikasi XP
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const btnGenerate = document.getElementById('btn-generate-csv');
  if (!btnGenerate) return;

  // 1. Data Pools (Lokalisasi & Bisnis)
  const regions = ["Jakarta", "Bandung", "Surabaya", "Medan", "Makassar", "Semarang", "Yogyakarta", "Bali", "Palembang", "Balikpapan"];
  const salesNames = ["Budi Santoso", "Siti Aminah", "Andi Pratama", "Dewi Lestari", "Reza Rahadian", "Ayu Tingting", "Fajar Nugraha", "Dina Mariana", "Kevin Wijaya", "Nisa Sabyan", "Hanafi Dias", "Putri Indah"];
  const paymentMethods = ["Tunai", "QRIS", "Transfer BCA", "VA Mandiri", "ShopeePay", "GoPay"];
  const custTypes = ["Baru", "Reguler", "Reguler", "Member", "Member"]; // Reguler & Member lebih sering
  const statuses = ["Selesai", "Selesai", "Selesai", "Selesai", "Selesai", "Selesai", "Selesai", "Retur", "Batal", "Batal"]; // 70% Selesai, 10% Retur, 20% Batal
  
  // Database Produk Relasional (Ditambah atribut 'cost' untuk Modal)
  const products = [
    { id: "PRD-001", name: "Laptop Pro 15", category: "Elektronik", price: 15000000, cost: 12500000 },
    { id: "PRD-002", name: "Smartphone X", category: "Elektronik", price: 8500000, cost: 7000000 },
    { id: "PRD-003", name: "Sandal Pria Kulit", category: "Pakaian", price: 150000, cost: 85000 },
    { id: "PRD-004", name: "Kemeja Flanel", category: "Pakaian", price: 250000, cost: 140000 },
    { id: "PRD-005", name: "Gas LPG 3kg", category: "Kebutuhan", price: 21000, cost: 16000 },
    { id: "PRD-006", name: "Beras Premium 5kg", category: "Kebutuhan", price: 75000, cost: 62000 },
    { id: "PRD-007", name: "Meja Kerja Minimalis", category: "Perabotan", price: 1200000, cost: 850000 },
    { id: "PRD-008", name: "Kursi Ergonomis", category: "Perabotan", price: 850000, cost: 550000 }
  ];

  const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
  const randomDate = (start, end) => new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
  
  const makeDirty = (val, isDirty) => {
    if (!isDirty) return val;
    const rand = Math.random();
    if (rand < 0.05) return `  ${val}  `; 
    if (rand > 0.95) return ""; 
    if (rand > 0.90 && typeof val === "string") return val.toLowerCase(); 
    return val;
  };

  btnGenerate.addEventListener('click', async function() {
    let rowCount = parseInt(document.getElementById('ds-rows').value) || 500;
    if (rowCount > 10000) rowCount = 10000; 
    if (rowCount < 10) rowCount = 10; // Mencegah user iseng mengetik minus atau 0
    
    const isDirty = document.getElementById('ds-dirty-data') ? document.getElementById('ds-dirty-data').checked : false;
    const isMulti = document.getElementById('ds-multi-table') ? document.getElementById('ds-multi-table').checked : false;
    const isAdvanced = document.getElementById('ds-advanced-cols') ? document.getElementById('ds-advanced-cols').checked : false;

    btnGenerate.innerHTML = "⏳ Menghasilkan Data...";
    
    setTimeout(async () => {
      if (isMulti) {
        // --- LOGIKA MULTI-TABLE ---
        let masterCsv = isAdvanced 
          ? "ID_Produk;Nama_Produk;Kategori;Harga_Satuan;Harga_Modal\n"
          : "ID_Produk;Nama_Produk;Kategori;Harga_Satuan\n";
          
        products.forEach(p => { 
          masterCsv += isAdvanced 
            ? `${p.id};${p.name};${p.category};${p.price};${p.cost}\n`
            : `${p.id};${p.name};${p.category};${p.price}\n`; 
        });

        let transCsv = isAdvanced 
          ? "ID_Transaksi;Tanggal;ID_Sales;Region;ID_Produk;Qty;Metode_Pembayaran;Tipe_Pelanggan;Status_Transaksi\n"
          : "ID_Transaksi;Tanggal;ID_Sales;Region;ID_Produk;Qty\n";

        for (let i = 1; i <= rowCount; i++) {
          let date = randomDate(new Date(2023, 0, 1), new Date());
          let dateStr = makeDirty(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, isDirty);
          let sales = makeDirty(getRandom(salesNames), isDirty);
          let region = makeDirty(getRandom(regions), isDirty);
          let prod = getRandom(products);
          let qty = Math.floor(Math.random() * 10) + 1;
          
          let baseRow = `TRX-${10000 + i};${dateStr};${sales};${region};${prod.id};${qty}`;

          if (isAdvanced) {
            let pay = makeDirty(getRandom(paymentMethods), isDirty);
            let cust = makeDirty(getRandom(custTypes), isDirty);
            let stat = makeDirty(getRandom(statuses), isDirty);
            transCsv += `${baseRow};${pay};${cust};${stat}\n`;
          } else {
            transCsv += `${baseRow}\n`;
          }
        }

        downloadCSV(masterCsv, "Master_Produk.csv");
        setTimeout(() => downloadCSV(transCsv, "Data_Transaksi.csv"), 500);

      } else {
        // --- LOGIKA FLAT TABLE ---
        let csvContent = isAdvanced 
          ? "ID_Transaksi;Tanggal;Nama_Sales;Region;Kategori;Nama_Produk;Harga_Satuan;Qty;Total_Penjualan;Metode_Pembayaran;Tipe_Pelanggan;Status_Transaksi;Harga_Modal;Total_Keuntungan\n"
          : "ID_Transaksi;Tanggal;Nama_Sales;Region;Kategori;Nama_Produk;Harga_Satuan;Qty;Total_Penjualan\n";

        for (let i = 1; i <= rowCount; i++) {
          let date = randomDate(new Date(2023, 0, 1), new Date());
          let dateStr = makeDirty(`${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`, isDirty);
          let sales = makeDirty(getRandom(salesNames), isDirty);
          let region = makeDirty(getRandom(regions), isDirty);
          let prod = getRandom(products);
          let qty = Math.floor(Math.random() * 10) + 1;
          let total = prod.price * qty;

          let baseRow = `TRX-${10000 + i};${dateStr};${sales};${region};${makeDirty(prod.category, isDirty)};${makeDirty(prod.name, isDirty)};${prod.price};${qty};${total}`;

          if (isAdvanced) {
            let pay = makeDirty(getRandom(paymentMethods), isDirty);
            let cust = makeDirty(getRandom(custTypes), isDirty);
            let stat = makeDirty(getRandom(statuses), isDirty);
            let totalModal = prod.cost * qty;
            let profit = total - totalModal;
            csvContent += `${baseRow};${pay};${cust};${stat};${prod.cost};${profit}\n`;
          } else {
            csvContent += `${baseRow}\n`;
          }
        }
        downloadCSV(csvContent, "Data_Penjualan_Flat.csv");
      }

      btnGenerate.innerHTML = "✓ Berhasil Diunduh!";
      setTimeout(() => { btnGenerate.innerHTML = "Generate Dataset"; }, 3000);

      await rewardXP(rowCount, isDirty, isMulti, isAdvanced);
    }, 500);
  });

  function downloadCSV(content, filename) {
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement("a");
    if (link.download !== undefined) {
      const url = URL.createObjectURL(blob);
      link.setAttribute("href", url);
      link.setAttribute("download", filename);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }

  async function rewardXP(rows, isDirty, isMulti, isAdvanced) {
    if (!window.supabase) return;
    const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
    const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
    const supa = window.supabase.createClient(supaUrl, supaKey);

    try {
      const { data: { session } } = await supa.auth.getSession();
      if (!session) return; 

      const userId = session.user.id;
      const { data: currentData } = await supa.from('user_progress').select('total_xp').eq('user_id', userId).single();
      
      if (currentData) {
        let earnedXp = 10; // Base
        if (rows >= 1000) earnedXp += 15; 
        if (isDirty) earnedXp += 20; 
        if (isMulti) earnedXp += 25; 
        if (isAdvanced) earnedXp += 20; // Bonus Opsi Lanjutan

        const newXp = (currentData.total_xp || 0) + earnedXp;
        let newLevel = 'Pemula';
        if (newXp >= 150) newLevel = 'Menengah';
        if (newXp >= 500) newLevel = 'Lanjutan';
        if (newXp >= 1000) newLevel = 'Master';

        await supa.from('user_progress').update({ total_xp: newXp, current_level: newLevel }).eq('user_id', userId);
        
        if (window.EAH && window.EAH.showToast) {
           window.EAH.showToast('Pencapaian Terbuka!', `☁️ +${earnedXp} XP berhasil disimpan ke awan!`, '🏆');
        } else {
           alert(`☁️ Hebat! +${earnedXp} XP ditambahkan ke profil Anda karena mengeksplorasi Tools Generator.`);
        }
      }
    } catch (err) {
      console.error("Gagal menyimpan XP:", err);
    }
  }
});
