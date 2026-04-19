/* ============================================
   EXCEL ANALYST HUB — FORMULA GENERATOR
   formula-gen.js: Pattern database, matching logic, output rendering
   ============================================ */

(function () {
  'use strict';

  /* ------------------------------------------
     FORMULA PATTERN DATABASE
  ------------------------------------------ */
  var FORMULAS = {
    lookup: [
      {
        name: 'VLOOKUP',
        syntax: '=VLOOKUP(lookup_value, table_array, col_index_num, [range_lookup])',
        description: 'Searches the first column of a range for a value and returns a value in the same row from another column. Use FALSE (or 0) for exact match — almost always what you want.',
        example: '=VLOOKUP(A2, $D$2:$F$100, 2, FALSE)',
        tip: 'Lock the table_array with $ signs so it doesn\'t shift when you copy the formula down.',
        keywords: ['find', 'search', 'lookup', 'match', 'value in table', 'look up', 'find value', 'get value', 'retrieve', 'fetch']
      },
      {
        name: 'INDEX-MATCH',
        syntax: '=INDEX(return_range, MATCH(lookup_value, lookup_range, 0))',
        description: 'More flexible than VLOOKUP — can look left, handles column insertions gracefully, and is faster on large datasets. Preferred by experienced analysts.',
        example: '=INDEX(C2:C100, MATCH(A2, B2:B100, 0))',
        tip: 'MATCH finds the row position (as a number), INDEX uses that number to retrieve the value. Think of them as two separate lookups working together.',
        keywords: ['index', 'match', 'flexible lookup', 'look left', 'index match', 'better than vlookup', 'two-way lookup', 'bi-directional']
      },
      {
        name: 'HLOOKUP',
        syntax: '=HLOOKUP(lookup_value, table_array, row_index_num, [range_lookup])',
        description: 'Like VLOOKUP but searches horizontally across the first row instead of down the first column. Used when your data headers are in a row rather than a column.',
        example: '=HLOOKUP("Q3", $B$1:$E$10, 3, FALSE)',
        tip: 'If your data is in a normal table (headers in row 1, data below), use VLOOKUP. HLOOKUP is for transposed/horizontal layouts.',
        keywords: ['hlookup', 'horizontal lookup', 'search row', 'lookup row', 'row lookup']
      },
      {
        name: 'XMATCH',
        syntax: '=XMATCH(lookup_value, lookup_array, [match_mode], [search_mode])',
        description: 'The modern replacement for MATCH — supports wildcard search, approximate match, and reverse search. Available in Excel 365 and Excel 2021+.',
        example: '=XMATCH(A2, B2:B100, 0)',
        tip: 'Pair with XLOOKUP or INDEX for even more flexibility than INDEX-MATCH.',
        keywords: ['xmatch', 'modern match', '365', 'find position', 'position of']
      }
    ],
    math: [
      {
        name: 'SUMIF',
        syntax: '=SUMIF(range, criteria, [sum_range])',
        description: 'Sums values in a range that meet a single condition. The range is where you check the condition; sum_range is what gets added up.',
        example: '=SUMIF(B2:B100, "West", C2:C100)',
        tip: 'If sum_range is omitted, it sums the range itself. Use double quotes for text criteria: "West", not West.',
        keywords: ['sum if', 'conditional sum', 'total by', 'add if', 'sum where', 'total where', 'sum by region', 'sum by category']
      },
      {
        name: 'SUMIFS',
        syntax: '=SUMIFS(sum_range, criteria_range1, criteria1, [criteria_range2, criteria2, ...])',
        description: 'Sums values that meet multiple conditions simultaneously. More flexible than SUMIF — and note that the sum_range comes first.',
        example: '=SUMIFS(C2:C100, B2:B100, "West", D2:D100, "Q3")',
        tip: 'SUMIFS always requires the sum_range as the first argument, unlike SUMIF where it\'s optional and at the end.',
        keywords: ['sumifs', 'sum multiple conditions', 'sum two criteria', 'sum and', 'total multiple', 'conditional sum multiple']
      },
      {
        name: 'COUNTIF',
        syntax: '=COUNTIF(range, criteria)',
        description: 'Counts the number of cells in a range that meet a single condition. Use it to find how many employees are in a department, how many orders exceeded a threshold, etc.',
        example: '=COUNTIF(A2:A100, "Active")',
        tip: 'You can use wildcards: COUNTIF(A:A, "Budi*") counts all cells starting with "Budi". Use ">100" with quotes to count values greater than 100.',
        keywords: ['count if', 'conditional count', 'how many', 'count where', 'number of', 'count by', 'tally']
      },
      {
        name: 'AVERAGEIF',
        syntax: '=AVERAGEIF(range, criteria, [average_range])',
        description: 'Returns the average of cells that meet a single condition. Useful for calculating average sales by region, average score by department, etc.',
        example: '=AVERAGEIF(B2:B100, "North", C2:C100)',
        tip: 'Like SUMIF, if average_range is omitted, it averages the range itself.',
        keywords: ['average if', 'conditional average', 'mean by', 'average where', 'average for', 'mean for']
      },
      {
        name: 'LARGE',
        syntax: '=LARGE(array, k)',
        description: 'Returns the k-th largest value in a data set. =LARGE(D1:D50, 1) is the same as MAX. =LARGE(D1:D50, 3) gives the 3rd highest value without sorting.',
        example: '=LARGE(D1:D50, 3)',
        tip: 'Use SMALL() for the k-th smallest value. These functions ignore empty cells and text.',
        keywords: ['largest', 'top', 'highest', 'kth largest', 'third largest', 'second largest', 'rank', 'nth highest']
      },
      {
        name: 'SUBTOTAL',
        syntax: '=SUBTOTAL(function_num, ref1, [ref2, ...])',
        description: 'Returns an aggregate result that automatically excludes hidden rows. Use function_num 9 for SUM, 2 for COUNT, 1 for AVERAGE. Ideal for filtered tables.',
        example: '=SUBTOTAL(9, C2:C100)',
        tip: 'Unlike SUM, SUBTOTAL ignores rows hidden by a filter. This makes it the right function for subtotals in filtered tables.',
        keywords: ['subtotal', 'filtered sum', 'visible only', 'sum visible', 'filter total', 'exclude hidden']
      }
    ],
    text: [
      {
        name: 'LEFT',
        syntax: '=LEFT(text, [num_chars])',
        description: 'Extracts a specified number of characters from the left side of a text string. Useful for extracting codes, prefixes, or the first part of a name.',
        example: '=LEFT(A2, 3)',
        tip: 'To extract up to a dynamic character (like a space), combine with FIND: =LEFT(A2, FIND(" ", A2) - 1)',
        keywords: ['left', 'extract', 'first characters', 'first letters', 'prefix', 'starting characters']
      },
      {
        name: 'RIGHT',
        syntax: '=RIGHT(text, [num_chars])',
        description: 'Extracts a specified number of characters from the right side of a text string. Useful for extracting extensions, suffixes, or the last part of a code.',
        example: '=RIGHT(A2, 4)',
        tip: 'To extract after a dynamic character, use: =RIGHT(A2, LEN(A2) - FIND("-", A2))',
        keywords: ['right', 'last characters', 'extract end', 'suffix', 'end of text', 'last letters']
      },
      {
        name: 'MID',
        syntax: '=MID(text, start_num, num_chars)',
        description: 'Extracts a substring from the middle of a text string. Specify where to start (1 = first character) and how many characters to take.',
        example: '=MID(A2, 5, 8)',
        tip: 'Count characters carefully: in "EMP-20240315-001", the date starts at position 5 and is 8 characters long.',
        keywords: ['mid', 'middle', 'substring', 'extract middle', 'extract from position', 'slice', 'portion of text']
      },
      {
        name: 'CONCATENATE / CONCAT',
        syntax: '=CONCAT(text1, text2, ...) or =text1 & " " & text2',
        description: 'Joins two or more text strings into one. The & operator is the simplest approach. TEXTJOIN is better when combining many values with a delimiter.',
        example: '=CONCAT(A2, " ", B2)  or  =A2 & " " & B2',
        tip: 'Use TEXTJOIN(", ", TRUE, A2:A10) to join a range of values with a comma-separator, skipping empty cells.',
        keywords: ['join', 'combine', 'merge text', 'concatenate', 'connect', 'append', 'combine columns', 'full name']
      },
      {
        name: 'TEXT',
        syntax: '=TEXT(value, format_text)',
        description: 'Converts a number or date to text with a specific format. Essential for creating readable dates, formatted currency, or percentage text in concatenated strings.',
        example: '=TEXT(A2, "dd mmmm yyyy")',
        tip: 'Common formats: "dd/mm/yyyy" for dates, "#,##0" for numbers with commas, "0.0%" for percentages. The result is text — you can\'t do math with it.',
        keywords: ['text format', 'number to text', 'date format', 'format date', 'format number', 'display as', 'indonesian date']
      },
      {
        name: 'TRIM',
        syntax: '=TRIM(text)',
        description: 'Removes all extra spaces from text — leading, trailing, and multiple spaces between words (leaving only single spaces). First thing to run when cleaning imported data.',
        example: '=TRIM(A2)',
        tip: 'TRIM only removes the standard space character (ASCII 32). If data has non-breaking spaces (from web/HTML), use SUBSTITUTE(TRIM(A2), CHAR(160), " ")',
        keywords: ['trim', 'remove spaces', 'clean text', 'leading spaces', 'trailing spaces', 'extra spaces']
      }
    ],
    date: [
      {
        name: 'TODAY',
        syntax: '=TODAY()',
        description: 'Returns today\'s date, updating automatically every time the worksheet recalculates. Use with no arguments. Perfect for calculating ages, days overdue, or days until a deadline.',
        example: '=TODAY() - A2  →  days since date in A2',
        tip: 'TODAY() returns only the date. Use NOW() if you also need the current time. Both recalculate automatically.',
        keywords: ['today', 'current date', 'date now', 'todays date', 'this date']
      },
      {
        name: 'NOW',
        syntax: '=NOW()',
        description: 'Returns the current date and time as a serial number. Useful for timestamping entries or calculating time elapsed. Updates every time the sheet recalculates.',
        example: '=NOW()',
        tip: 'To get just the time component of NOW, use =NOW() - TODAY(). Format the cell as "h:mm AM/PM" to display it.',
        keywords: ['now', 'current time', 'datetime', 'timestamp', 'current datetime']
      },
      {
        name: 'DATEDIF',
        syntax: '=DATEDIF(start_date, end_date, unit)',
        description: 'Calculates the difference between two dates. Units: "Y" = complete years, "M" = complete months, "D" = days. Use "YM" for months ignoring years. Useful for calculating employee tenure or customer age.',
        example: '=DATEDIF(B2, TODAY(), "Y") & " years"',
        tip: 'DATEDIF is an undocumented but fully functional formula. It won\'t appear in autocomplete, but it works perfectly. Always put the earlier date first.',
        keywords: ['date difference', 'age', 'years between', 'months between', 'tenure', 'how long', 'duration', 'masa kerja']
      },
      {
        name: 'EOMONTH',
        syntax: '=EOMONTH(start_date, months)',
        description: 'Returns the last day of the month, a specified number of months before or after a date. months=0 gives last day of current month; months=1 gives last day of next month.',
        example: '=EOMONTH(TODAY(), 0)',
        tip: 'Add 1 to EOMONTH to get the first day of the next month: =EOMONTH(A2, 0) + 1',
        keywords: ['end of month', 'last day', 'month end', 'eomonth', 'last date of month', 'close period']
      },
      {
        name: 'NETWORKDAYS',
        syntax: '=NETWORKDAYS(start_date, end_date, [holidays])',
        description: 'Calculates the number of working days between two dates, automatically excluding weekends. Pass a range of holiday dates as the optional third argument.',
        example: '=NETWORKDAYS(A2, B2, HolidayList)',
        tip: 'For Indonesian public holidays, maintain a named range "HolidayList" with all holiday dates for the year.',
        keywords: ['working days', 'business days', 'workdays', 'exclude weekends', 'hari kerja', 'weekdays between']
      }
    ],
    logical: [
      {
        name: 'IF',
        syntax: '=IF(logical_test, value_if_true, value_if_false)',
        description: 'The most fundamental decision formula in Excel. Returns one value when a condition is true and another when false. Nest IFs for multiple conditions, or use IFS for cleaner syntax.',
        example: '=IF(C2 >= 100, "Target Met", "Below Target")',
        tip: 'Avoid deeply nesting IFs (more than 2 levels). If you need more conditions, IFS is more readable. If the false result doesn\'t matter, use "" (empty string).',
        keywords: ['if', 'condition', 'check', 'true false', 'when', 'conditional', 'test', 'either or']
      },
      {
        name: 'IFS',
        syntax: '=IFS(condition1, value1, condition2, value2, ..., TRUE, default)',
        description: 'Checks multiple conditions in order and returns the first matching result. Much cleaner than nested IFs. Always end with TRUE as the last condition to provide a default value.',
        example: '=IFS(A2>=90, "A", A2>=80, "B", A2>=70, "C", TRUE, "D")',
        tip: 'IFS has no built-in "else" — that\'s what the TRUE at the end does. Without it, unmatched conditions return #N/A.',
        keywords: ['ifs', 'multiple conditions', 'nested if', 'grade', 'multiple if', 'several conditions', 'cascading if']
      },
      {
        name: 'IFERROR',
        syntax: '=IFERROR(value, value_if_error)',
        description: 'Returns your specified value if the formula produces any error (#N/A, #VALUE!, #DIV/0!, etc.), otherwise returns the formula result. Essential when working with VLOOKUP or any formula that might not find a match.',
        example: '=IFERROR(VLOOKUP(A2, D:F, 2, FALSE), "Not Found")',
        tip: 'Don\'t overuse IFERROR to hide real errors during development — it can mask bugs. Use it only in final formulas where errors are expected.',
        keywords: ['iferror', 'error handling', 'if error', '#n/a', '#value', 'handle error', 'no error', 'suppress error', 'catch error']
      },
      {
        name: 'AND',
        syntax: '=AND(logical1, logical2, ...)',
        description: 'Returns TRUE only when all conditions are true. Commonly used inside an IF to combine multiple tests: IF(AND(A>0, B="Active"), "Yes", "No")',
        example: '=IF(AND(A2 > 0, B2 = "Active"), "Valid", "Invalid")',
        tip: 'AND evaluates all conditions even if the first one is FALSE (unlike some programming languages). Keep this in mind with large formulas.',
        keywords: ['and', 'all conditions', 'both', 'all true', 'multiple AND', 'all must be true']
      },
      {
        name: 'OR',
        syntax: '=OR(logical1, logical2, ...)',
        description: 'Returns TRUE if any one condition is true. Useful when something should happen if a value matches any item in a list.',
        example: '=IF(OR(A2="Bandung", A2="Surabaya", A2="Medan"), "Regional", "Jakarta")',
        tip: 'For long lists, COUNTIF is often cleaner than OR: =IF(COUNTIF({"Bandung","Surabaya","Medan"}, A2) > 0, "Regional", "Jakarta")',
        keywords: ['or', 'any condition', 'either', 'any of', 'at least one', 'one of these']
      },
      {
        name: 'NOT',
        syntax: '=NOT(logical)',
        description: 'Reverses a logical value — TRUE becomes FALSE, FALSE becomes TRUE. Use it when it\'s easier to define what you don\'t want.',
        example: '=IF(NOT(ISBLANK(A2)), "Has data", "Empty")',
        tip: 'NOT is often combined with IS functions: NOT(ISERROR()), NOT(ISBLANK()), NOT(ISNUMBER()).',
        keywords: ['not', 'reverse', 'opposite', 'is not', 'not equal', 'exclude', 'except']
      }
    ]
  };

  /* ------------------------------------------
     MATCHING LOGIC
  ------------------------------------------ */
  function generateFormula(query, category) {
    var q = (query || '').toLowerCase().trim();
    var pool;

    if (!category || category === 'all') {
      pool = Object.values(FORMULAS).reduce(function (acc, arr) {
        return acc.concat(arr);
      }, []);
    } else {
      pool = FORMULAS[category] || [];
    }

    if (!pool.length) return null;

    // Score each formula by keyword match quality
    var scored = pool.map(function (f) {
      var score = 0;
      // Exact name match gets highest score
      if (f.name.toLowerCase() === q) score += 100;
      // Name contains query
      if (f.name.toLowerCase().includes(q)) score += 50;
      // Keyword full match
      f.keywords.forEach(function (k) {
        if (q.includes(k)) score += 20;
        if (k.includes(q)) score += 10;
      });
      // Partial word match in description
      var words = q.split(/\s+/).filter(function (w) { return w.length > 2; });
      words.forEach(function (word) {
        if (f.name.toLowerCase().includes(word)) score += 8;
        f.keywords.forEach(function (k) {
          if (k.includes(word)) score += 5;
        });
        if (f.description.toLowerCase().includes(word)) score += 2;
      });
      return { formula: f, score: score };
    });

    scored.sort(function (a, b) { return b.score - a.score; });

    // Only return a match if there's some relevance, else return first in pool
    return scored[0].score > 0 ? scored[0].formula : pool[0];
  }

  /* ------------------------------------------
     RENDER OUTPUT
  ------------------------------------------ */
  function renderResult(formula) {
    var output = document.getElementById('formula-output');
    if (!output) return;

    output.innerHTML =
      '<div class="formula-result">' +
        '<div class="formula-name">' + escapeHtml(formula.name) + '</div>' +
        '<div class="formula-block">' + escapeHtml(formula.syntax) + '</div>' +
        '<p class="formula-desc">' + escapeHtml(formula.description) + '</p>' +
        (formula.tip
          ? '<div class="callout callout-tip" style="margin:var(--space-3) 0;">' +
              '<p class="callout-title">💡 Analyst Tip</p>' +
              '<p>' + escapeHtml(formula.tip) + '</p>' +
            '</div>'
          : '') +
        '<div class="formula-example-label">Example</div>' +
        '<div class="formula-block formula-example">' + escapeHtml(formula.example) + '</div>' +
        '<div style="margin-top:var(--space-4);">' +
          '<button class="btn-ghost btn-sm copy-formula-btn" id="copy-formula-btn" data-copy="' + escapeAttr(formula.example) + '">Copy Formula</button>' +
        '</div>' +
      '</div>';

    var copyBtn = document.getElementById('copy-formula-btn');
    if (copyBtn) {
      copyBtn.addEventListener('click', function () {
        window.copyToClipboard(this.dataset.copy, this, '✓ Copied!');
      });
    }

    output.classList.add('visible');
  }

  function renderEmpty() {
    var output = document.getElementById('formula-output');
    if (!output) return;
    output.innerHTML =
      '<div class="formula-result" style="text-align:center;padding:var(--space-8);">' +
        '<p style="color:var(--text-muted);font-size:0.9rem;">No match found for that description. Try different keywords, or select a specific category.</p>' +
      '</div>';
    output.classList.add('visible');
  }

  /* ------------------------------------------
     UTILITIES
  ------------------------------------------ */
  function escapeHtml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  function escapeAttr(str) {
    return String(str).replace(/"/g, '&quot;');
  }

  /* ------------------------------------------
     WIRE UP FORM
  ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function () {
    var form = document.getElementById('formula-form');
    if (!form) return;

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var query = (document.getElementById('formula-query').value || '').trim();
      var category = document.getElementById('formula-category').value || 'all';

      if (!query) {
        // If no query, just show first formula in chosen category
        var pool = category === 'all'
          ? Object.values(FORMULAS).reduce(function (a, b) { return a.concat(b); }, [])
          : FORMULAS[category] || [];
        if (pool.length) renderResult(pool[0]);
        return;
      }

      var result = generateFormula(query, category);
      if (result) {
        renderResult(result);
      } else {
        renderEmpty();
      }
    });

    // Live suggestions on category change with existing query
    document.getElementById('formula-category').addEventListener('change', function () {
      var query = (document.getElementById('formula-query').value || '').trim();
      if (query) {
        var result = generateFormula(query, this.value);
        if (result) renderResult(result);
      }
    });
  });

})();
