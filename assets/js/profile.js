(function() {
  'use strict';

  // --- 1. DAILY STREAK LOGIC ---
  function updateStreak() {
    let streakData = JSON.parse(localStorage.getItem('eah_streak')) || { count: 0, lastLogin: null };
    
    // Use Indonesian timezone context for date
    const today = new Date().toLocaleDateString('en-CA'); // YYYY-MM-DD format
    
    if (streakData.lastLogin !== today) {
      if (!streakData.lastLogin) {
        streakData.count = 1;
      } else {
        const lastDate = new Date(streakData.lastLogin);
        const currDate = new Date(today);
        const diffTime = Math.abs(currDate - lastDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        
        if (diffDays === 1) {
          streakData.count += 1; // Logged in yesterday
        } else if (diffDays > 1) {
          streakData.count = 1; // Streak broken
        }
      }
      streakData.lastLogin = today;
      localStorage.setItem('eah_streak', JSON.stringify(streakData));
    }
    return streakData.count;
  }

  // --- 2. RENDER DASHBOARD ---
  document.addEventListener('DOMContentLoaded', function() {
    if (!window.EAH) return;

    var progress = window.EAH.getProgress() || {};
    var doneCount = 0;
    
    var totalBeginner = 5;
    var totalIntermediate = 6;
    var totalAdvanced = 5;

    var countBeginner = 0;
    var countIntermediate = 0;
    var countAdvanced = 0;

    var beginnerIds = ['excel-interface', 'basic-formulas', 'cell-formatting', 'basic-charts', 'data-entry'];
    var intermediateIds = ['conditional-formatting', 'data-cleaning', 'vlookup', 'index-match', 'sumif-countif', 'pivot-tables'];
    var advancedIds = ['power-query', 'advanced-pivot', 'dashboard-design', 'dynamic-arrays', 'data-validation'];

    for(var topicId in progress) {
      if(progress[topicId] === 'done') {
        doneCount++;
        if(beginnerIds.indexOf(topicId) !== -1) countBeginner++;
        else if(advancedIds.indexOf(topicId) !== -1) countAdvanced++;
        else countIntermediate++;
      }
    }

    // Update Stats
    const statCompleted = document.getElementById('stat-completed');
    if(statCompleted) statCompleted.textContent = doneCount;
    
    const statStreak = document.getElementById('stat-streak');
    if(statStreak) statStreak.textContent = updateStreak();

    // --- KALKULASI XP & LEVEL CERDAS ---
    
    // 1. Ambil data Streak saat ini
    const currentStreak = updateStreak(); 
    
    // 2. Hitung Total XP (50 per topik + 10 per hari streak)
    const topicXP = doneCount * 50;
    const streakXP = currentStreak * 10;
    const totalXP = topicXP + streakXP;
    
    // Update angka XP di Dashboard
    const statXP = document.getElementById('stat-tools');
    if(statXP) statXP.textContent = totalXP + " XP";

    // 3. Tentukan Level berdasarkan TOTAL XP
    var levelName = "Newbie Spreadsheet";
    if(totalXP >= 200) levelName = "Data Explorer";
    if(totalXP >= 500) levelName = "Advanced Modeler";
    if(totalXP >= 800) levelName = "Excel Analyst Master";
    if(totalXP >= 1500) levelName = "Spreadsheet God"; // Secret Level!

    // Update Teks Level di UI
    const levelEl = document.getElementById('user-level');
    if(levelEl) levelEl.textContent = "Level: " + levelName;

    // Update Bars
    function updateBar(barId, pctId, count, total) {
      var pct = Math.min(Math.round((count / total) * 100), 100);
      var bar = document.getElementById(barId);
      var label = document.getElementById(pctId);
      if(bar && label) {
        bar.style.width = pct + '%';
        label.textContent = pct + '%';
        if(pct === 100) {
           bar.style.background = '#10b981';
           // Tambahkan glow pada wadah luarnya (parent)
           bar.parentElement.classList.add('progress-glow');
        } else {
           bar.parentElement.classList.remove('progress-glow');
        }
      }
    }
    updateBar('bar-beginner', 'pct-beginner', countBeginner, totalBeginner);
    updateBar('bar-intermediate', 'pct-intermediate', countIntermediate, totalIntermediate);
    updateBar('bar-advanced', 'pct-advanced', countAdvanced, totalAdvanced);

    // --- 4. RICH BADGE GENERATION (XP-BASED) ---
    const badgesContainer = document.getElementById('badges-container');
    if(badgesContainer) {
      // Badges kini didasarkan pada target XP, bukan jumlah materi
      const badges = [
        { icon: '🌱', title: 'Pemula Tangguh', reqXP: 50, desc: 'Kumpulkan 50 XP' },
        { icon: '🧭', title: 'Data Explorer', reqXP: 200, desc: 'Kumpulkan 200 XP' },
        { icon: '⚙️', title: 'Advanced Modeler', reqXP: 500, desc: 'Kumpulkan 500 XP' },
        { icon: '🏆', title: 'Excel Analyst', reqXP: 800, desc: 'Kumpulkan 800 XP' }
      ];

      badgesContainer.innerHTML = '';
      badges.forEach(b => {
        const isUnlocked = totalXP >= b.reqXP;
        const remaining = b.reqXP - totalXP;
        
        const card = document.createElement('div');
        card.style.background = 'var(--surface-2)';
        card.style.borderRadius = '8px';
        card.style.padding = '15px';
        card.style.display = 'flex';
        card.style.gap = '15px';
        card.style.alignItems = 'center';
        card.style.border = isUnlocked ? '1px solid #f59e0b' : '1px solid var(--border)';
        card.style.opacity = isUnlocked ? '1' : '0.6';
        card.style.transition = 'all 0.3s';
        
        const iconDiv = document.createElement('div');
        iconDiv.style.fontSize = '2rem';
        iconDiv.style.filter = isUnlocked ? 'none' : 'grayscale(100%)';
        iconDiv.textContent = b.icon;
        
        const textDiv = document.createElement('div');
        const title = document.createElement('div');
        title.style.fontWeight = 'bold';
        title.style.color = isUnlocked ? '#f59e0b' : 'var(--text)';
        title.textContent = b.title;
        
        const sub = document.createElement('div');
        sub.style.fontSize = '0.8rem';
        sub.style.color = 'var(--text-muted)';
        sub.style.marginTop = '4px';
        sub.textContent = isUnlocked ? 'Terbuka! 🎉' : `Kumpulkan ${remaining} XP lagi`;
        
        textDiv.appendChild(title);
        textDiv.appendChild(sub);
        
        card.appendChild(iconDiv);
        card.appendChild(textDiv);
        badgesContainer.appendChild(card);
      });
    }
  });
})();
