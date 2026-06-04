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

    // Calculate XP (50 XP per completed topic)
    const totalXP = doneCount * 50;
    const statXP = document.getElementById('stat-tools');
    if(statXP) statXP.textContent = totalXP;

    // Update Level
    var levelName = "Newbie Spreadsheet";
    if(doneCount >= 4) levelName = "Data Explorer";
    if(doneCount >= 9) levelName = "Advanced Modeler";
    if(doneCount >= 14) levelName = "Excel Analyst Master";
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
        if(pct === 100) bar.style.background = '#10b981';
      }
    }
    updateBar('bar-beginner', 'pct-beginner', countBeginner, totalBeginner);
    updateBar('bar-intermediate', 'pct-intermediate', countIntermediate, totalIntermediate);
    updateBar('bar-advanced', 'pct-advanced', countAdvanced, totalAdvanced);

    // --- 3. RICH BADGE GENERATION ---
    const badgesContainer = document.getElementById('badges-container');
    if(badgesContainer) {
      const badges = [
        { icon: '🌱', title: 'Pemula Tangguh', req: 1, desc: 'Menyelesaikan 1 topik' },
        { icon: '🧭', title: 'Data Explorer', req: 4, desc: 'Menyelesaikan 4 topik' },
        { icon: '⚙️', title: 'Advanced Modeler', req: 9, desc: 'Menyelesaikan 9 topik' },
        { icon: '🏆', title: 'Excel Analyst', req: 14, desc: 'Menyelesaikan 14 topik' }
      ];

      badgesContainer.innerHTML = '';
      badges.forEach(b => {
        const isUnlocked = doneCount >= b.req;
        const remaining = b.req - doneCount;
        
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
        sub.textContent = isUnlocked ? 'Terbuka! 🎉' : `Selesaikan ${remaining} topik lagi`;
        
        textDiv.appendChild(title);
        textDiv.appendChild(sub);
        
        card.appendChild(iconDiv);
        card.appendChild(textDiv);
        badgesContainer.appendChild(card);
      });
    }
  });
})();
