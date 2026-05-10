const display = document.getElementById('display');

 document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const val = btn.dataset.value;
    const action = btn.dataset.action;
    if (action === 'clear') { display.value = ''; return; }
    if (action === 'back') { display.value = display.value.slice(0, -1); return; }
    if (action === 'equals') { compute(); return; }
    // map ÷ and × and − to JS operators
    if (val === '÷') display.value += '/';
    else if (val === '×') display.value += '*';
    else if (val === '−') display.value += '-';
    else display.value += val;
  });
});

function compute() {
  const expr = display.value;
  if (!expr) return;
  // very small sanitize: allow digits, operators, parentheses, decimal and spaces
  if (/[^0-9+\-*/().% ]/.test(expr)) { display.value = 'Error'; return; }
  try {
    // safer eval using Function
    const result = Function('"use strict";return (' + expr + ')')();
    display.value = (result === undefined || Number.isNaN(result)) ? 'Error' : String(result);
  } catch {
    display.value = 'Error';
  }
}

// keyboard support
window.addEventListener('keydown', (e) => {
  if (e.key >= '0' && e.key <= '9') { display.value += e.key; return; }
  if ('+-*/().%'.includes(e.key)) { display.value += e.key; return; }
  if (e.key === 'Enter') { compute(); return; }
  if (e.key === 'Backspace') { display.value = display.value.slice(0, -1); return; }
  if (e.key === 'Escape') { display.value = ''; return; }
});