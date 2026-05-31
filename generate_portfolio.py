import pandas as pd
from datetime import datetime, timedelta
import random
import os

# Buat folder khusus untuk dataset jika belum ada
output_dir = "assets/datasets"
os.makedirs(output_dir, exist_ok=True)

print("🚀 Memulai proses pembuatan 6 File Excel Portofolio...")

# ==========================================
# 1. CASE RETAIL & INVENTORY
# ==========================================
dates = pd.date_range(start="2026-04-01", periods=30)
retail_data = []
for d in dates:
    # Gas (Fast Moving)
    retail_data.append([d.date(), "SKU-G01", "Refill Gas LPG 3kg", "Gas", random.randint(100, 150), random.randint(30, 80)])
    # Sandal (Slow Moving / Variative)
    retail_data.append([d.date(), "SKU-S42", "Sandal Pria Size 42", "Sandal", random.randint(20, 50), random.randint(0, 5)])
    retail_data.append([d.date(), "SKU-S38", "Sandal Wanita Size 38", "Sandal", random.randint(10, 30), random.randint(2, 10)])

df_retail = pd.DataFrame(retail_data, columns=["Tanggal", "ID_Produk", "Nama_Produk", "Kategori", "Stok_Awal_Hari", "Barang_Terjual"])
df_retail.to_excel(f"{output_dir}/Case_Study_Retail_Optimization.xlsx", index=False, engine='xlsxwriter')
print("✅ File 1: Retail & Inventory berhasil dibuat.")

# ==========================================
# 2. CASE SALES MULTI-REGION
# ==========================================
regions = ["Jakarta", "Bandung", "Solo", "Semarang"]
sales_data = []
for i in range(500):
    reg = random.choice(regions)
    harga = random.choice([50000, 150000, 300000])
    qty = random.randint(1, 10)
    # Solo punya biaya logistik termurah di skenario kita
    logistik = random.randint(2000, 5000) if reg == "Solo" else random.randint(10000, 25000)
    sales_data.append([
        (datetime(2026, 1, 1) + timedelta(days=random.randint(0, 90))).date(),
        reg, f"Sales-{random.randint(1, 10)}", "Produk " + str(random.randint(1,5)), 
        qty, harga, harga * 0.6, logistik
    ])
df_sales = pd.DataFrame(sales_data, columns=["Tanggal", "Cabang", "ID_Sales", "Produk", "Qty", "Harga_Satuan", "HPP_Satuan", "Biaya_Logistik"])
df_sales.to_excel(f"{output_dir}/Case_Study_Sales_Region.xlsx", index=False, engine='xlsxwriter')
print("✅ File 2: Sales Multi-Region berhasil dibuat.")

# ==========================================
# 3. CASE HR & OVERTIME
# ==========================================
hr_data = []
for day in range(1, 31):
    for emp in range(1, 11):
        # Jam masuk normal jam 08:00 - 09:00
        in_time = f"{random.randint(8, 9):02d}:{random.randint(0, 59):02d}"
        # Jam keluar acak, beberapa lembur sampai jam 19-21
        out_time = f"{random.randint(16, 21):02d}:{random.randint(0, 59):02d}"
        hr_data.append([f"2026-05-{day:02d}", f"EMP-{emp:03d}", f"Karyawan {emp}", in_time, out_time])

df_hr = pd.DataFrame(hr_data, columns=["Tanggal", "ID_Karyawan", "Nama", "Jam_Masuk", "Jam_Keluar"])
df_hr.to_excel(f"{output_dir}/Case_Study_HR_Overtime.xlsx", index=False, engine='xlsxwriter')
print("✅ File 3: HR Attendance & Overtime berhasil dibuat.")

# ==========================================
# 4. CASE PAYMENT RECONCILIATION (2 SHEETS)
# ==========================================
# Data POS Internal
pos_data = pd.DataFrame({
    "Trx_ID": [f"TRX-10{i}" for i in range(10)],
    "Channel": ["QRIS", "Shopee", "Tokopedia", "QRIS", "QRIS", "Shopee", "QRIS", "Tokopedia", "Shopee", "QRIS"],
    "Nominal": [100000, 250000, 150000, 50000, 75000, 300000, 120000, 80000, 210000, 95000]
})
# Data Bank Settlement (Sengaja dibuat selisih/hilang untuk bahan analisis)
bank_data = pos_data.copy()
bank_data.loc[2, "Nominal"] = 145000 # Selisih admin
bank_data = bank_data.drop(5) # Trx hilang (belum cair)

with pd.ExcelWriter(f"{output_dir}/Case_Study_Payment_Reconciliation.xlsx", engine='xlsxwriter') as writer:
    pos_data.to_excel(writer, sheet_name='Data_POS_Internal', index=False)
    bank_data.to_excel(writer, sheet_name='Data_Bank_Settlement', index=False)
print("✅ File 4: Payment Reconciliation (2 Sheets) berhasil dibuat.")

# ==========================================
# 5. CASE CREDIT SCORING
# ==========================================
credit_data = []
for i in range(1, 101):
    pendapatan = random.randint(4000000, 20000000)
    hutang = random.randint(0, pendapatan) # Hutang bervariasi
    credit_data.append([
        f"NAS-{i:03d}", pendapatan, hutang, random.randint(0, 4), 
        random.choice(["Karyawan Tetap", "Kontrak", "Wirausaha"]), random.randint(10000000, 50000000)
    ])
df_credit = pd.DataFrame(credit_data, columns=["ID_Nasabah", "Pendapatan_Bulan", "Cicilan_Hutang_Aktif", "Tanggungan", "Status_Pekerjaan", "Pengajuan_Kredit"])
df_credit.to_excel(f"{output_dir}/Case_Study_Credit_Scoring.xlsx", index=False, engine='xlsxwriter')
print("✅ File 5: Credit Scoring berhasil dibuat.")

# ==========================================
# 6. CASE MARKETING RFM
# ==========================================
rfm_data = []
for i in range(1, 201):
    last_trx = (datetime(2026, 5, 1) - timedelta(days=random.randint(1, 180))).date()
    freq = random.randint(1, 50)
    spend = freq * random.randint(50000, 200000)
    rfm_data.append([f"CUST-{i:03d}", last_trx, freq, spend])
df_rfm = pd.DataFrame(rfm_data, columns=["ID_Pelanggan", "Tanggal_Trx_Terakhir", "Total_Frekuensi_Belanja", "Total_Nominal_Belanja"])
df_rfm.to_excel(f"{output_dir}/Case_Study_RFM_Marketing.xlsx", index=False, engine='xlsxwriter')
print("✅ File 6: Marketing RFM berhasil dibuat.")

print("🎉 SEMUA FILE SELESAI! Silakan cek folder 'assets/datasets'.")