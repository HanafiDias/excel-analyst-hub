// ==========================================================
// 1. TAHAP INSTAN (ANTI-KEDIP PUTIH & BLINDFOLD)
// ==========================================================
let currentPath = window.location.pathname;
let pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1).split('?')[0].split('#')[0];

// NORMALISASI NAMA: Hapus ".html" dari nama file (Mencegah bypass URL bersih)
pageName = pageName.replace('.html', ''); 
if (pageName === '') pageName = 'index'; 

// DAFTAR HALAMAN RAHASIA (Sekarang tanpa .html agar cocok dengan semua format)
const protectedPagesList = ['learn', 'portfolio', 'tools', 'profile'];
const isProtectedPage = protectedPagesList.includes(pageName);

if (isProtectedPage) {
  document.documentElement.style.backgroundColor = '#0b1120';
  
  const premiumLoader = document.createElement('div');
  premiumLoader.id = 'premium-auth-loader';
  premiumLoader.innerHTML = `
    <div style="position: fixed; top: 0; left: 0; width: 100vw; height: 100vh; background: #0b1120; z-index: 999999; display: flex; flex-direction: column; align-items: center; justify-content: center; transition: opacity 0.4s ease;">
      <div style="font-size: 4rem; animation: pulseGlow 1.5s infinite ease-in-out;">⊞</div>
      <div style="margin-top: 25px; color: #94a3b8; font-family: sans-serif; font-size: 0.9rem; font-weight: 700; letter-spacing: 3px; text-transform: uppercase;">
        Memverifikasi Akses
      </div>
      <style>
        @keyframes pulseGlow {
          0%, 100% { transform: scale(0.9); opacity: 0.6; text-shadow: 0 0 10px rgba(59,130,246,0.1); color: #60a5fa; }
          50% { transform: scale(1.1); opacity: 1; text-shadow: 0 0 40px rgba(59,130,246,0.9); color: #ffffff; }
        }
      </style>
    </div>
  `;
  document.documentElement.appendChild(premiumLoader);
}

// ==========================================================
// FUNGSI SAPU BERSIH AMAN
// ==========================================================
function forceRemoveLoader() {
  const loader = document.getElementById('premium-auth-loader');
  if (loader) loader.remove();
  document.documentElement.style.backgroundColor = '';
}

// ==========================================================
// 2. TAHAP PEMROSESAN DATABASE (THE PAYWALL)
// ==========================================================
document.addEventListener('DOMContentLoaded', async function() {
  // KEAMANAN FAIL-SECURE: Jika alat deteksi rusak, usir pengunjung!
  if (!window.supabase) {
    console.error("Library Supabase belum dimuat!");
    if (isProtectedPage) {
      window.location.replace('index.html'); // Tendang keluar (Anti-tembus)
    } else {
      forceRemoveLoader();
    }
    return;
  }

  const supaUrl = 'https://laowissohsnhfsbiwcpd.supabase.co';
  const supaKey = 'sb_publishable_Y_DHtQY18OILqZnAqxaZaw_NC0STTLC';
  const supa = window.supabase.createClient(supaUrl, supaKey);

  const { data: { session } } = await supa.auth.getSession();

  // Update Navbar (Berlaku global)
  const navAuthBtn = document.getElementById('nav-auth-btn');
  const mobileAuthBtn = document.getElementById('mobile-auth-btn');
  if (session) {
    if (navAuthBtn) { navAuthBtn.innerText = 'Dashboard Profil'; navAuthBtn.href = 'profile.html'; }
    if (mobileAuthBtn) { mobileAuthBtn.innerText = 'Dashboard Profil'; mobileAuthBtn.href = 'profile.html'; }
  }

  // JIKA TAMU (Belum Login) Mencoba masuk halaman rahasia
  if (!session && isProtectedPage) {
    window.location.replace('register.html');
    return; // Layar hitam tetap menutupi sampai pindah halaman
  }

  // JIKA PUNYA AKUN, Cek Kasta Premium
  if (session && isProtectedPage) {
    try {
      const { data: profile } = await supa
        .from('profiles')
        .select('is_premium, subscription_end')
        .eq('id', session.user.id)
        .maybeSingle();

      const isPremium = profile?.is_premium;
      const subEnd = profile?.subscription_end ? new Date(profile.subscription_end) : null;
      const today = new Date();

      // LOGIKA PEMBLOKIRAN
      if (!isPremium || (subEnd && subEnd < today)) {
        if (pageName !== 'profile') {
          window.location.replace('pricing.html');
          return; // Layar hitam tetap menutupi sampai pindah halaman
        }
      }

      // LOLOS PEMERIKSAAN! Bukakan pintu pelan-pelan.
      const loaderEl = document.getElementById('premium-auth-loader');
      if (loaderEl) {
        const loaderDiv = loaderEl.querySelector('div');
        if (loaderDiv) loaderDiv.style.opacity = '0';
        setTimeout(() => forceRemoveLoader(), 400); 
      }

    } catch (err) {
      // FAIL-SECURE KEDUA: Jika database gangguan, usir keluar!
      console.error("Gagal mengecek status premium:", err);
      window.location.replace('index.html'); 
    }
  } else if (!isProtectedPage) {
    // Pastikan halaman umum tidak pernah tertutup layar hitam
    forceRemoveLoader(); 
  }
});
