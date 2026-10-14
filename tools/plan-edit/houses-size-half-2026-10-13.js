#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner, in Studio at the door of a 2.3x house, with a screenshot):
// "the houses need to be half of what they are now there so big my body is the size of the floor".
// Half of 2.3x is about 1.15x. The preview switch stretches EVERYTHING (storey height, doors, windows), so what read
// as too big is the storey height. Records the answer on OD20 and T03.26 and makes the contract size footprint and
// storey height separately. Usage (from the repo root): node tools/plan-edit/houses-size-half-2026-10-13.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
const CODEX_FILE = path.join(ROOT, 'data', 'codex-data.js');

function load(file, key) {
  const text = fs.readFileSync(file, 'utf8');
  const marker = `window.${key} = `;
  const at = text.indexOf(marker);
  if (at < 0) throw new Error('no ' + marker + ' in ' + file);
  const sandbox = { window: {} };
  vm.runInNewContext(text, sandbox, { filename: file });
  return { text, at, marker, data: sandbox.window[key] };
}
function save(file, f) {
  fs.writeFileSync(file, f.text.slice(0, f.at) + f.marker + JSON.stringify(f.data) + ';\n');
}

const KEY = 'my body is the size of the floor';
const ANSWER =
  'Size, owner 13 Oct 2026 in Studio at the door of a 2.3x house: "the houses need to be half of what they are now there so big my body is the size of the floor". ' +
  'Half of 2.3x is about 1.15x of today, shown in Studio the same day. The preview switch stretched everything evenly (storey height, doors, windows), so a 2.3x storey was about 25 studs tall and dwarfed the player. ' +
  'Rule for the V2 kit: size the footprint and the storey height separately. Storeys, doors and windows stay human scale (a storey about 10 to 12 studs, a door about 7.6 clear); the extra size goes into the footprint, more rooms and a second storey. The final footprint is settled on the grey-box walk in T03.26.';

const STEP_PREFIX = 'Size decided 13 Oct:';
const STEP_NEW = 'Size 13 Oct: seen at 1.5x, 3x and 2.3x by stretching; 2.3x was "so big my body is the size of the floor", half of it (about 1.15x) shown next. Size the footprint and the storey height separately: human-scale storeys and doors, the extra size in footprint and rooms. Still open: is the existing interior shell worth keeping?';

function fix(s) {
  return s
    .replace(/You want them 2\.3x bigger, fewer of them/g, 'You want them bigger, fewer of them')
    .replace(/1\. Size is decided \(2\.3x today's\)\./g, '1. The stretch preview is done (1.5x, 3x, 2.3x, then about 1.15x). Size the footprint and the storey height separately.')
    .replace(/footprints \(2\.3x today's, owner 13 Oct\)/g, 'footprints (sized separately from the storey height; human-scale storeys and doors, owner 13 Oct)')
    .replace(/- Footprints and storeys: 2\.3x today's \(the owner's final answer[^\n]*/g,
      '- Footprints and storeys: sized separately. Storeys stay human scale (about 10 to 12 studs), doors 7.6 clear, windows at a person\'s height; the extra size goes into the footprint, more rooms and a second storey. The 1.5x / 3x / 2.3x stretch previews showed that stretching the storey is what reads as too big ("my body is the size of the floor"). Settle the footprint on the grey-box walk.');
}

const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
const changed = [];

const od = P.decisions.find((d) => d.id === 'OD20');
if (!od) throw new Error('no OD20');
if (!od.detail.includes(KEY)) {
  od.detail = od.detail.replace('The house kit V2 is 2.3x today\'s footprints', 'First final answer was 2.3x today\'s footprints (replaced the same day, see below)');
  od.detail += '\n\n' + ANSWER;
  changed.push('OD20');
}
const t = P.tasks.find((x) => x.id === 'T03.26');
if (!t) throw new Error('no T03.26');
if (!t.details.includes(KEY)) {
  t.why = fix(t.why);
  t.implementation_instructions = fix(t.implementation_instructions);
  for (const s of t.steps) {
    if (s.text.startsWith(STEP_PREFIX)) s.text = STEP_NEW;
    else s.text = fix(s.text);
  }
  t.details = fix(t.details) + '\n\n**' + ANSWER + '**';
  changed.push('T03.26');
}
const C = codex.data;
const sec = C.sections.find((s) => s.title === 'Owner decisions');
if (sec && !sec.content.includes(KEY)) {
  const before = sec.content;
  sec.content = sec.content.replace(/(- \*\*OD20 [^\n]*?)( _Source: Owner, 13 Oct 2026 \(chat\)\._)/, (m, a, b) => a + ' ' + ANSWER + b);
  if (sec.content !== before) {
    if (typeof C.full === 'string' && C.full.includes(before)) C.full = C.full.replace(before, () => sec.content);
    changed.push('codex OD20');
  }
}
P.metadata.version = '2026-10-13f';
save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change (already applied).');
