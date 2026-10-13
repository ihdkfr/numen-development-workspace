#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner, after seeing 1.5x, 3x, 2.3x and setting up 1.15x in Studio):
// "instead of 1.15 make it 1.5 as final". The house size is final at 1.5x today's (the BuildingScale15 factor).
// Records it on OD20 and T03.26. Usage (from the repo root): node tools/plan-edit/houses-size-final-2026-10-13.js
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

const KEY = 'make it 1.5 as final';
const FINAL =
  'FINAL size, owner 13 Oct 2026, after seeing 1.5x, 3x and 2.3x in Studio and setting up 1.15x: "instead of 1.15 make it 1.5 as final". ' +
  'The houses are 1.5x today\'s: a family home 24 x 30 becomes 36 x 45 studs, a townhouse 22 x 26 becomes 33 x 39. This is the existing BuildingScale15 factor (CityFix.BUILDING_SCALE = 1.5). ' +
  'Every house has an interior; the look is redesigned afterwards in the house kit V2 ("as long as we can edit the look of the houses after"). Storeys and doors stay human scale in the redesign. This replaces the 3x to 4.5x, 2.3x and half-of-2.3x answers given earlier the same day.';
const STEP_NEW = 'Size FINAL 13 Oct: 1.5x today\'s houses ("instead of 1.15 make it 1.5 as final"), the existing BuildingScale15 factor. Still open: is the existing interior shell worth keeping?';

function fix(s) {
  return s
    .replace(/You want them bigger, fewer of them/g, 'You want them 1.5x bigger, fewer of them')
    .replace(/1\. The stretch preview is done \(1\.5x, 3x, 2\.3x, then about 1\.15x\)\. Size the footprint and the storey height separately\./g, '1. Size is final: 1.5x today\'s (BuildingScale15). Keep storeys and doors human scale in the redesign.')
    .replace(/footprints \(sized separately from the storey height; human-scale storeys and doors, owner 13 Oct\)/g, 'footprints (1.5x today\'s, final, owner 13 Oct; human-scale storeys and doors)')
    .replace(/- Footprints and storeys: sized separately\.[^\n]*/g, '- Footprints and storeys: 1.5x today\'s, FINAL (owner 13 Oct, after trying 1.5x, 3x and 2.3x). A family home 36 x 45, a townhouse 33 x 39. Storeys and doors stay human scale in the redesign; two storeys where the type has them.');
}

const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
const changed = [];

const od = P.decisions.find((d) => d.id === 'OD20');
if (!od) throw new Error('no OD20');
if (!od.detail.includes(KEY)) {
  od.detail = od.detail.replace(/each much bigger \([^)]*\)/, 'each 1.5x bigger (final, see the last paragraph)');
  od.detail += '\n\n' + FINAL;
  changed.push('OD20');
}
const t = P.tasks.find((x) => x.id === 'T03.26');
if (!t) throw new Error('no T03.26');
if (!t.details.includes(KEY)) {
  t.why = fix(t.why);
  t.implementation_instructions = fix(t.implementation_instructions);
  for (const s of t.steps) {
    if (s.text.startsWith('Size 13 Oct:') || s.text.startsWith('Size decided 13 Oct:')) s.text = STEP_NEW;
    else s.text = fix(s.text);
  }
  t.details = fix(t.details) + '\n\n**' + FINAL + '**';
  changed.push('T03.26');
}
const C = codex.data;
const sec = C.sections.find((s) => s.title === 'Owner decisions');
if (sec && !sec.content.includes(KEY)) {
  const before = sec.content;
  sec.content = sec.content.replace(/(- \*\*OD20 [^\n]*?)( _Source: Owner, 13 Oct 2026 \(chat\)\._)/, (m, a, b) => a + ' ' + FINAL + b);
  if (sec.content !== before) {
    if (typeof C.full === 'string' && C.full.includes(before)) C.full = C.full.replace(before, () => sec.content);
    changed.push('codex OD20');
  }
}
P.metadata.version = '2026-10-13g';
save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change (already applied).');
