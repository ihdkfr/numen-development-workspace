#!/usr/bin/env node
// 31 Oct: every Seireitei picture (Books 1 to 9, 481 jobs) is made and approved, so T03.34 is done.
// Also points T03.35 and T03.36 at the new Building sizes page. Safe to run twice.
// Usage (from the repo root): node tools/plan-edit/seireitei-pictures-2026-10-31.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const FILE = path.resolve(__dirname, '..', '..', 'data', 'plan-data.js');
const text = fs.readFileSync(FILE, 'utf8');
const marker = 'window.SS_PLAN = ';
const at = text.indexOf(marker);
const sandbox = { window: {} };
vm.runInNewContext(text, sandbox);
const plan = sandbox.window.SS_PLAN;
const get = id => { const t = plan.tasks.find(x => x.id === id); if (!t) throw new Error(id + ' not found'); return t; };
const t34 = get('T03.34');
t34.seed_status = 'done';
for (const s of t34.steps) { s.done = true; s.state = 'done'; }
t34.details = t34.details.replace(/\n\nStatus on [\s\S]*$/, '') +
  '\n\nStatus on 31 Oct: done. All 481 picture jobs in Books 1 to 9 are made and approved (Book 8: 90, Book 9: 68). 15.19 and 15.20 passed on a plainer rewrite. The old Book 7 Academy campus and dormitory are superseded by Book 8.';
const SIZES = '\n\n**Sizes:** build and check every building against Recipes/Seireitei build sizes/Building sizes.md (and building_sizes.json). Written numbers win for every size; the pictures decide the look and what goes where.';
for (const id of ['T03.35', 'T03.36']) {
  const t = get(id);
  if (!t.details.includes('Building sizes.md')) t.details += SIZES;
}
const counts = {};
for (const t of plan.tasks) counts[t.seed_status] = (counts[t.seed_status] || 0) + 1;
plan.metadata.status_counts = counts;
plan.metadata.version = '2026-10-31a';
for (const bad of ['—', '–']) for (const id of ['T03.34', 'T03.35', 'T03.36']) if (JSON.stringify(get(id)).includes(bad)) throw new Error('dash in ' + id);
fs.writeFileSync(FILE, text.slice(0, at) + marker + JSON.stringify(plan) + ';\n');
console.log('T03.34 done; sizes note on T03.35 and T03.36');
