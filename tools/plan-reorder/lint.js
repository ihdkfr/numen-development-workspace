#!/usr/bin/env node
// Checks the rewrite files against HOW_STEPS_GUIDE.md. Usage: node tools/plan-reorder/lint.js [file ...]
'use strict';
const fs = require('fs'), path = require('path');
const files = process.argv.slice(2).length ? process.argv.slice(2) : fs.readdirSync(__dirname).filter(f => /^(rewrites-old-phase-\d\d|new-tasks)\.txt$/.test(f)).map(f => path.join(__dirname, f));
const words = s => s.trim().split(/\s+/).filter(Boolean).length;
let problems = 0, tasks = 0, steps = 0, hows = 0;
const bad = (f, id, msg) => { problems++; console.log(`${path.basename(f)} ${id}: ${msg}`); };
for (const f of files) {
  const text = fs.readFileSync(f, 'utf8').replace(/\r/g, '');
  for (const block of text.split(/\n\s*\n/)) {
    const lines = block.split('\n').filter(l => l.trim());
    if (!lines.length) continue;
    const m = lines[0].match(/^(\S+) \| (.+)$/);
    if (!m) { bad(f, '?', 'bad header: ' + lines[0]); continue; }
    const id = m[1]; tasks++;
    if (words(m[2]) > 8 && !id.startsWith('NEW:')) bad(f, id, 'title over 8 words'); // new-task titles are the owner's own words
    let cur = null, n = 0, w = '', d = '';
    const stepHows = [];
    for (const raw of lines.slice(1)) {
      const l = raw.trim();
      if (l.startsWith('W: ')) w = l.slice(3);
      else if (l.startsWith('D: ')) d = l.slice(3);
      else if (/^\d+\. /.test(l)) { n++; steps++; cur = { text: l.replace(/^\d+\. /, ''), how: [] }; stepHows.push(cur); if (words(cur.text) > 20) bad(f, id, `step ${n} over 20 words`); if (!/^[A-Z]/.test(cur.text)) bad(f, id, `step ${n} should start with a capital verb`); }
      else if (l.startsWith('- ')) { if (!cur) bad(f, id, 'how line before any step'); else { cur.how.push(l.slice(2)); hows++; if (words(l) > 32) bad(f, id, `step ${n} how line over 30 words`); } }
      else bad(f, id, 'unknown line: ' + l);
    }
    if (!w || !d) bad(f, id, 'missing W: or D:');
    if (n < 1 || n > 6) bad(f, id, `${n} steps (need 1 to 6)`);
    stepHows.forEach((s, i) => { if (s.how.length < 2 || s.how.length > 6) bad(f, id, `step ${i + 1} has ${s.how.length} how lines (need 2 to 6)`); });
    if (/Usman/.test(block)) bad(f, id, 'mentions Usman: say "you" instead');
    if (/—/.test(block)) bad(f, id, 'contains an em dash');
  }
}
console.log(`${files.length} files, ${tasks} tasks, ${steps} steps, ${hows} how lines, ${problems} problems`);
process.exit(problems ? 1 : 0);
