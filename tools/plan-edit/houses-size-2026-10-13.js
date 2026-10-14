#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner, in Studio with BuildingScale15 on, looking at a 1.5x family home in West District 1):
// "no it needs to be 2-3 times bigger than this to be honest".
// So the target is 2 to 3 times the 1.5x look: about 3x to 4.5x today's houses. Records it on OD20 and T03.26.
// Usage (from the repo root): node tools/plan-edit/houses-size-2026-10-13.js
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

const ANSWER =
  'Size answered by the owner on 13 Oct 2026, in Studio, looking at a 1.5x family home (36 x 45 studs, one storey) in West District 1: ' +
  '"no it needs to be 2-3 times bigger than this to be honest". Target: 2 to 3 times the 1.5x look, so about 3x to 4.5x today\'s houses. ' +
  'A family home goes from 24 x 30 to about 72 x 90 up to 108 x 135 studs, two storeys as the normal house. The 1.5x switch is not enough; the hand-built gate quarter (BenchWest) must be rebuilt to the same size.';
const STEP_OLD = 'Look at BuildingScale15 and EnterableBuildings in Studio first (both switched off today) and decide: how much bigger, and is the existing interior shell worth keeping?';
const STEP_NEW = 'Size decided 13 Oct: 2 to 3 times the 1.5x look (3x to 4.5x today\'s houses), two storeys as normal. Still open: is the existing interior shell worth keeping?';
const CONTRACT_OLD = 'footprints (about 1.5x to 2.5x today\'s)';
const CONTRACT_NEW = 'footprints (3x to 4.5x today\'s, owner 13 Oct)';

const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
const changed = [];

const od = P.decisions.find((d) => d.id === 'OD20');
if (!od) throw new Error('no OD20');
if (!od.detail.includes('2-3 times bigger')) {
  od.detail = od.detail.replace('about 1.5x to 2.5x today\'s 18 to 56-stud footprints, settled in T03.26', 'about 3x to 4.5x today\'s 18 to 56-stud footprints, see below');
  od.detail += '\n\n' + ANSWER;
  changed.push('OD20');
}

const t = P.tasks.find((x) => x.id === 'T03.26');
if (!t) throw new Error('no T03.26');
if (!t.details.includes('2-3 times bigger')) {
  const s = t.steps.find((x) => x.text === STEP_OLD);
  if (s) s.text = STEP_NEW;
  const c = t.steps.find((x) => x.text.includes(CONTRACT_OLD));
  if (c) c.text = c.text.replace(CONTRACT_OLD, CONTRACT_NEW);
  t.why = 'Today\'s houses are small solid boxes (18 to 56 studs wide) you can\'t go into. You want them 3x to 4.5x bigger, fewer of them, redesigned, each with an interior. Settle the floor plans and one grey-box block before the city is built with them.';
  t.implementation_instructions = t.implementation_instructions.replace(
    '1. Ask Claude Code to switch on BuildingScale15 and EnterableBuildings in Studio, then press Play and judge: is 1.5x big enough, and is the walk-in ground floor a base to keep or a throwaway?',
    '1. Size is decided (3x to 4.5x today\'s). Ask Claude Code to switch on EnterableBuildings in Studio, press Play, go into a house and judge: is the walk-in ground floor a base to keep or a throwaway?'
  );
  if (t.step_help[0]) {
    t.step_help[0] = [
      'Open Claude Code in the game folder and paste this task\'s Claude build brief.',
      'Type: "Do step 1 only: switch on EnterableBuildings for this Studio session, put me in front of a house with an interior in West District 1, and stop."',
      'Press Play, go into three houses. Write in Notes whether the interiors are worth keeping as a base.',
    ];
  }
  t.details = t.details.replace(
    '- Footprints and storeys: about 1.5x to 2.5x today\'s, settled from the BuildingScale15 look. Two storeys as the normal house, not the exception.',
    '- Footprints and storeys: 3x to 4.5x today\'s (the owner\'s answer, 13 Oct: 2 to 3 times the 1.5x look). A family home about 72 x 90 to 108 x 135 studs. Two storeys as the normal house, not the exception. Streets and plots widen to match; a block keeps about a third of today\'s houses.'
  );
  t.details += '\n\n**' + ANSWER + '**';
  changed.push('T03.26');
}

// codex: the OD20 line
const C = codex.data;
const sec = C.sections.find((s) => s.title === 'Owner decisions');
if (sec && sec.content.includes('OD20') && !sec.content.includes('2-3 times bigger')) {
  const before = sec.content;
  sec.content = sec.content.replace(/(- \*\*OD20 [^\n]*?)( _Source: Owner, 13 Oct 2026 \(chat\)\._)/, (m, a, b) => a + ' ' + ANSWER + b);
  if (sec.content !== before) {
    if (typeof C.full === 'string' && C.full.includes(before)) C.full = C.full.replace(before, () => sec.content);
    changed.push('codex OD20');
  }
}

P.metadata.version = '2026-10-13d';
save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change (already applied).');
