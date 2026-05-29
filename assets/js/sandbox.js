/* ============================================
   EXCEL ANALYST HUB — FORMULA SANDBOX ENGINE
   Lightweight parser for basic Excel formulas
   ============================================ */

document.addEventListener('DOMContentLoaded', function() {
  const formulaInput = document.getElementById('sandbox-formula');
  const resultDisplay = document.getElementById('sandbox-result');
  const gridCells = document.querySelectorAll('#sandbox-grid td[contenteditable="true"]');

  if (!formulaInput || !resultDisplay) return;

  // Listen for changes in formula input and grid values
  formulaInput.addEventListener('input', evaluateSandbox);
  gridCells.forEach(cell => {
    cell.addEventListener('input', evaluateSandbox);
    // Prevent non-numeric typing mostly
    cell.addEventListener('keypress', function(e) {
      if (isNaN(String.fromCharCode(e.which)) && e.which !== 45 && e.which !== 46) e.preventDefault();
    });
  });

  // Helper to expand A1:B2 into A1,A2,B1,B2
  function expandRange(start, end) {
    const cols = ['A', 'B', 'C'];
    const startCol = cols.indexOf(start[0]);
    const startRow = parseInt(start[1]);
    const endCol = cols.indexOf(end[0]);
    const endRow = parseInt(end[1]);
    
    if (startCol === -1 || endCol === -1) return [];

    let cells = [];
    for (let r = Math.min(startRow, endRow); r <= Math.max(startRow, endRow); r++) {
      for (let c = Math.min(startCol, endCol); c <= Math.max(startCol, endCol); c++) {
        cells.push(cols[c] + r);
      }
    }
    return cells;
  }

  // Get current value from HTML grid
  function getCellValue(cellId) {
    const el = document.getElementById('cell-' + cellId);
    if (!el) return 0;
    const val = parseFloat(el.innerText);
    return isNaN(val) ? 0 : val;
  }

  function evaluateSandbox() {
    let raw = formulaInput.value.trim().toUpperCase();
    
    // If it's just a number or text without '='
    if (!raw.startsWith('=')) {
      resultDisplay.textContent = raw;
      resultDisplay.style.color = 'var(--text)';
      return;
    }

    let expr = raw.substring(1); // Remove '='

    try {
      // 1. Expand Ranges (e.g. SUM(A1:B2) -> SUM(A1,A2,B1,B2))
      expr = expr.replace(/([A-C][1-3]):([A-C][1-3])/g, function(match, start, end) {
        return expandRange(start, end).join(',');
      });

      // 2. Replace Cell References with actual numbers
      expr = expr.replace(/[A-C][1-3]/g, function(match) {
        return getCellValue(match);
      });

      // 3. Process Functions to Math arrays
      // SUM
      expr = expr.replace(/SUM\(([^)]+)\)/g, function(m, args) {
        return '(' + args.split(',').reduce((a, b) => Number(a) + Number(b), 0) + ')';
      });
      // AVERAGE
      expr = expr.replace(/AVERAGE\(([^)]+)\)/g, function(m, args) {
        let arr = args.split(',');
        return '(' + (arr.reduce((a, b) => Number(a) + Number(b), 0) / arr.length) + ')';
      });
      // MAX
      expr = expr.replace(/MAX\(([^)]+)\)/g, function(m, args) {
        return Math.max(...args.split(',').map(Number));
      });
      // MIN
      expr = expr.replace(/MIN\(([^)]+)\)/g, function(m, args) {
        return Math.min(...args.split(',').map(Number));
      });

      // 4. Safe calculation using new Function (filtered string)
      // Only allow numbers, math operators, dots, and parentheses
      if (!/^[\d\.\+\-\*\/\(\)\s]+$/.test(expr)) throw new Error("Invalid characters");

      // Calculate
      let finalResult = new Function('return ' + expr)();
      
      // Handle infinity or NaN
      if (!isFinite(finalResult)) throw new Error("Math Error");

      // Format rounding to 2 decimals max if float
      finalResult = Math.round(finalResult * 100) / 100;

      resultDisplay.textContent = finalResult;
      resultDisplay.style.color = '#10b981'; // Green success

    } catch (err) {
      resultDisplay.textContent = '#ERROR!';
      resultDisplay.style.color = '#ef4444'; // Red error
    }
  }

  // Trigger initial calculation
  evaluateSandbox();
});
