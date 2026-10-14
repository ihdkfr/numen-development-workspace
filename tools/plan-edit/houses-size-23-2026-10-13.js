#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner, in Studio, after seeing a 3x family home): "3x is too much scale it down from the 3x to 2.3x".
// The house size is settled at 2.3x today's footprints. Records it on OD20 and T03.26 (replaces the 3x to 4.5x range).
// Usage (from the repo root): node tools/plan-edit/houses-size-23-2026-10-13.js
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

const FINAL =
  'Final size, owner 13 Oct 2026 in Studio after seeing 1.5x and then 3x: "3x is too much scale it down from the 3x to 2.3x". ' +
  'The house kit V2 is 2.3x today\'s footprints: a family home 24 x 30 becomes about 55 x 69 studs, a townhouse 22 x 26 about 51 x 60, two storeys as the normal house. The look is still redesigned afterwards (T03.16, T03.19); the scale switch was only a size preview.';

function fix(s) {
  return s
    .replace(/about 3x to 4\.5x today's 18 to 56-stud footprints, see below/g, '2.3x today\'s 18 to 56-stud footprints, see below')
    .replace(/Target: 2 to 3 times the 1\.5x look, so about 3x to 4\.5x today's houses\./g, 'First answer: 2 to 3 times the 1.5x look. Final answer below: 2.3x today\'s.')
    .replace(/A family home goes from 24 x 30 to about 72 x 90 up to 108 x 135 studs, two storeys as the normal house\./g, 'A family home goes from 24 x 30 to about 55 x 69 studs, two storeys as the normal house.')
    .replace(/Size decided 13 Oct: 2 to 3 times the 1\.5x look \(3x to 4\.5x today's houses\), two storeys as normal\./g, 'Size decided 13 Oct: 2.3x today\'s houses (seen at 1.5x and 3x in Studio; 3x was too much), two storeys as normal.')
    .replace(/footprints \(3x to 4\.5x today's, owner 13 Oct\)/g, 'footprints (2.3x today\'s, owner 13 Oct)')
    .replace(/You want them 3x to 4\.5x bigger, fewer of them/g, 'You want them 2.3x bigger, fewer of them')
    .replace(/1\. Size is decided \(3x to 4\.5x today's\)\./g, '1. Size is decided (2.3x today\'s).')
    .replace(/- Footprints and storeys: 3x to 4\.5x today's \(the owner's answer, 13 Oct: 2 to 3 times the 1\.5x look\)\. A family home about 72 x 90 to 108 x 135 studs\. Two storeys as the normal house, not the exception\. Streets and plots widen to match; a block keeps about a third of today's houses\./g,
      '- Footprints and storeys: 2.3x today\'s (the owner\'s final answer, 13 Oct, after seeing 1.5x and 3x in Studio). A family home about 55 x 69 studs, a townhouse about 51 x 60. Two storeys as the normal house, not the exception. Streets and plots widen to match; a block keeps a little under half of today\'s houses.');
}

const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
const changed = [];

const od = P.decisions.find((d) => d.id === 'OD20');
if (!od) throw new Error('no OD20');
if (!od.detail.includes('to 2.3x')) {
  od.detail = fix(od.detail) + '\n\n' + FINAL;
  changed.push('OD20');
}
const t = P.tasks.find((x) => x.id === 'T03.26');
if (!t) throw new Error('no T03.26');
if (!t.details.includes('to 2.3x')) {
  t.why = fix(t.why);
  t.implementation_instructions = fix(t.implementation_instructions);
  for (const s of t.steps) s.text = fix(s.text);
  t.details = fix(t.details) + '\n\n**' + FINAL + '**';
  changed.push('T03.26');
}
const C = codex.data;
const sec = C.sections.find((s) => s.title === 'Owner decisions');
if (sec && !sec.content.includes('to 2.3x')) {
  const before = sec.content;
  sec.content = sec.content.replace(/(- \*\*OD20 [^\n]*?)( _Source: Owner, 13 Oct 2026 \(chat\)\._)/, (m, a, b) => fix(a) + ' ' + FINAL + b);
  if (sec.content !== before) {
    if (typeof C.full === 'string' && C.full.includes(before)) C.full = C.full.replace(before, () => sec.content);
    changed.push('codex OD20');
  }
}
P.metadata.version = '2026-10-13e';
save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change (already applied).');
