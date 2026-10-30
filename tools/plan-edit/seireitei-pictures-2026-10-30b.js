#!/usr/bin/env node
// Brings T03.34 (Seireitei pictures) up to date on the evening of 30 Oct: the remakes were already made on 23 Oct
// (only 15.19 and 15.20 are on hold), Book 7 is checked, Books 8 and 9 are written and Book 8 is running.
// Safe to run twice. Usage (from the repo root): node tools/plan-edit/seireitei-pictures-2026-10-30b.js
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
const t = plan.tasks.find(x => x.id === 'T03.34');
if (!t) throw new Error('T03.34 not found: run seireitei-pipeline-2026-10-30.js first');
const SRC = 'owner 30 Oct';
const steps = [
  { text: 'Remake the pictures that have a correction in fixes.txt.', done: true,
    help: ['Done: the 22 remakes were made on 23 Oct and checked on 30 Oct.', '15.19 and 15.20 are on hold while the owner rewrites their prompts; build them from their approved hero and section until then.'] },
  { text: 'Claude checks the 51 Book 7 pictures: the noble manors, the Academy and the shops.', done: true,
    help: ['Done 30 Oct: 44 approved, the old Academy campus and dormitory (18.07, 18.08, 18.14 to 18.18) held because Book 8 replaces them.', 'Accepted faults are in Known faults log.md.'] },
  { text: 'Claude writes Book 8: the Academy part 2, city landmarks, street kit, gatekeepers\' posts, the violet noble house and the shops from the show (93 pictures, phases 20 to 23).', done: true,
    help: ['The record is Recipes/Seireitei picture prompts/9 Book 8.md and the copy-button page is Seireitei Prompt Book 8.html.', 'No shrines.'] },
  { text: 'Run Book 8 and Claude checks it.', done: false, state: 'doing',
    help: ['Double-click "2 Make pictures.bat" (20 pictures a run) or "3 Make pictures overnight.bat".', 'Claude checks each batch as it lands in "to check".'] },
  { text: 'Claude writes Book 9: 18 variations of the buildings that repeat, in wealth levels 1 to 4 (68 pictures, phases 24 and 25).', done: true,
    help: ['The record is 10 Book 9.md and the page is Seireitei Prompt Book 9.html.', 'Every variation attaches its approved base design and fits the same plot.'] },
  { text: 'Run Book 9 and Claude checks it.', done: false,
    help: ['The runner does it after Book 8 (runner settings: phases=20,21,22,23,24,25).', 'The two noble estates wait for the lesser noble manor hero (23.01) to be approved.'] },
];
t.seed_status = 'doing';
t.implementation_instructions = steps.map((s, i) => `${i + 1}. ${s.text}`).join('\n');
t.step_help = steps.map(s => s.help);
t.steps = steps.map(s => ({ text: s.text, note: '', done: s.done, state: s.state || (s.done ? 'done' : ''), src: SRC }));
t.details = t.details.replace(/\n\nStatus on [\s\S]*$/, '') +
  '\n\nStatus on the evening of 30 Oct: remakes made, Book 7 checked, Books 8 and 9 written (161 pictures), Book 8 phase 20 (the Academy) being made and checked; 15.19 and 15.20 on hold.';
plan.metadata.version = '2026-10-30b';
for (const bad of ['—', '–']) if (JSON.stringify(t).includes(bad)) throw new Error('dash in T03.34');
fs.writeFileSync(FILE, text.slice(0, at) + marker + JSON.stringify(plan) + ';\n');
console.log('T03.34 updated:', t.steps.filter(s => s.done).length, 'of', t.steps.length, 'steps done');
