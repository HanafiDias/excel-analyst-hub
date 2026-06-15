document.addEventListener('DOMContentLoaded', async function() {
  if (!window.supabase) return;
  const supa = window.supabase.createClient('https://laowissohsnhfsbiwcpd.supabase.co', 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC');

  // 1. Ambil container tempat kartu portofolio akan dirender di HTML
  // (Pastikan ada elemen <div id="portfolio-container"></div> atau sesuaikan class-nya)
  const container = document.querySelector('.portfolio-grid') || document.getElementById('portfolio-container');
  if (!container) return; // Jika bukan di halaman portfolio, skip script ini

  // Berikan efek loading cantik
  container.innerHTML = '<p style="text-align:center; color:var(--text-muted); width:100%;">Memverifikasi akses Premium & menarik materi dari Cloud...</p>';

  try {
    // 2. CEK SESI USER
    const { data: { session } } = await supa.auth.getSession();
    if (!session) {
      container.innerHTML = '<div style="padding:2rem; text-align:center; color:#ef4444; background:rgba(239, 68, 68, 0.1); border-radius:12px;">Sesi Anda habis. Silakan Login kembali.</div>';
      return;
    }

    // 3. TARIK DATA DARI DATABASE (Server akan memblokir otomatis jika bukan Premium!)
    const { data: portfolios, error } = await supa
      .from('portfolios')
      .select('*')
      .order('created_at', { ascending: true });

    // 4. PENANGANAN GEMBOK RLS
    if (error || !portfolios || portfolios.length === 0) {
      container.innerHTML = `
        <div style="padding: 3rem 2rem; text-align: center; border: 1px solid rgba(239, 68, 68, 0.3); border-radius: 16px; background: rgba(15, 23, 42, 0.8);">
          <h2 style="color: #ef4444; margin-bottom: 1rem;">Akses Terkunci 🔒</h2>
          <p style="color: #cbd5e1; margin-bottom: 1.5rem;">Materi Portofolio Masterclass ini disimpan dengan enkripsi khusus untuk member Premium. Masa aktif Anda mungkin telah habis.</p>
          <button onclick="window.location.href='pricing.html'" class="btn-primary" style="background: linear-gradient(135deg, #f59e0b, #e11d48); border: none;">Perpanjang Akses Sekarang ⚡</button>
        </div>
      `;
      return;
    }

    // 5. RENDER DATA (Jika user sah dan Premium)
    container.innerHTML = ''; // Bersihkan loading
    portfolios.forEach(item => {
      // Ubah array tags menjadi elemen HTML span
      const tagsHTML = item.tags.map(tag => `<span class="badge" style="background: rgba(59, 130, 246, 0.1); color: #60a5fa; border: 1px solid rgba(59, 130, 246, 0.2); margin-right: 6px; padding: 4px 8px; font-size: 0.7rem; border-radius: 4px;">${tag}</span>`).join('');
      
      // Template Kartu (Gunakan backtick)
      const cardHTML = `
        <div class="portfolio-card" style="background: var(--surface-2); border: 1px solid var(--border); border-radius: 16px; padding: 1.5rem; transition: transform 0.3s;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 1rem;">
            <h3 style="margin: 0; font-size: 1.1rem; color: white;">${item.title}</h3>
            <span class="badge" style="background: #10b981; color: white; padding: 2px 8px; border-radius: 20px; font-size: 0.7rem; font-weight: bold;">${item.difficulty}</span>
          </div>
          <p style="color: var(--text-muted); font-size: 0.85rem; line-height: 1.5; margin-bottom: 1.2rem; min-height: 40px;">${item.description}</p>
          <div style="margin-bottom: 1.5rem; display: flex; flex-wrap: wrap; gap: 4px;">
            ${tagsHTML}
          </div>
          <a href="${item.link}" class="btn-primary" style="display: block; text-align: center; width: 100%; text-decoration: none;">Kerjakan Case Study →</a>
        </div>
      `;
      container.innerHTML += cardHTML;
    });

  } catch (err) {
    console.error(err);
    container.innerHTML = '<p style="color:#ef4444; text-align:center;">Gagal terhubung ke server materi.</p>';
  }
});
