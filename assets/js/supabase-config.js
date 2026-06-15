/* ============================================
   EXCEL ANALYST HUB — SUPABASE GLOBAL CONFIG
   ============================================ */

(function () {
  'use strict';

  // Cegah inisialisasi ganda jika sudah ada
  if (window.supaClient) return;

  if (!window.supabase) {
    console.error("Library Supabase belum dimuat di HTML!");
    return;
  }

  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  
  // Buat koneksi HANYA 1 KALI dan simpan di objek global 'window.supaClient'
  window.supaClient = window.supabase.createClient(supaUrl, supaKey);
  console.log("✅ Supabase Client terhubung secara global.");
})();
