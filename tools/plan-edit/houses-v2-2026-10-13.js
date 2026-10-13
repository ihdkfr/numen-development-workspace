#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner, in chat): "i want the houses to be much bigger better to have less bigger hoiuses
// that loads of small unuseable ones i want to them to also be redesigned and they need too have interior aswell".
//
// What it does (safe to run again; it never adds the same thing twice):
//  1. Adds owner decision OD20 (locked): fewer, bigger houses, redesigned, every one with an interior.
//  2. Adds task T03.26 "Design the house kit V2" in front of T03.16, so the catalogue, the floor plans and a grey-box
//     block are approved before the city is built with them. (The id is new; the task sits in the list where it is done.)
//  3. Changes T03.16, T03.18, T03.19 and T03.21 to build with the V2 kit (title, steps, estimates, decision link).
//  4. Adds the switched-off BuildingScale15 experiment to "Check what's built: Soul Society" (T01.08) next to
//     EnterableBuildings, so both are looked at first.
//  5. Adds OD20 to the codex "Owner decisions" page and the BuildingScale15 line to "What is built today".
//
// Usage (from the repo root): node tools/plan-edit/houses-v2-2026-10-13.js
// Then: node tools/set-plan-build.js <n> <date> "<note>"
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
const CODEX_FILE = path.join(ROOT, 'data', 'codex-data.js');
const SRC = 'owner 13 Oct (OD20)';

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

// ---- 1. The decision ----------------------------------------------------------------------------------------------
const OD20 = {
  id: 'OD20',
  status: 'locked',
  date: '13 Oct',
  topic: 'Soul Society',
  title: 'Fewer, bigger houses, redesigned, every one with an interior',
  detail:
    'Owner, 13 Oct, in chat: "i want the houses to be much bigger better to have less bigger hoiuses that loads of small unuseable ones i want to them to also be redesigned and they need too have interior aswell". ' +
    'Rule: the Soul Society houses (Seireitei and Rukongai) are rebuilt as a house kit V2: fewer houses per block, each much bigger (about 1.5x to 2.5x today\'s 18 to 56-stud footprints, settled in T03.26), redesigned, and every one has a working door and an interior you can walk into. Quality over count. ' +
    'The radial map and the 320 districts (OD06) stay; a district simply holds fewer, bigger houses. ' +
    'Two switched-off experiments already in the game (BuildingScale15: every building 1.5x; EnterableBuildings: a door and a furnished ground floor in every house) are looked at first and reused where they fit.',
  source: 'Owner, 13 Oct 2026 (chat)',
};

// ---- 2. The new task -----------------------------------------------------------------------------------------------
const MARK = '**Owner rule (OD20, 13 Oct):** fewer, bigger houses, redesigned, every one with an interior.';
const NEW_TASK = {
  id: 'T03.26',
  aliases: [],
  phase_id: '03',
  phase_title: 'Build the maps',
  title: 'Design the house kit V2: fewer, bigger houses with interiors',
  priority: 'CORE',
  effort: 'M',
  seed_status: 'todo',
  locked: false,
  why:
    'Today\'s houses are small solid boxes (18 to 56 studs wide) you can\'t go into. You want fewer, much bigger, redesigned houses, each with an interior. Settle the sizes, the floor plans and one grey-box block before the city is built with them.',
  implementation_instructions:
    '1. Ask Claude Code to switch on BuildingScale15 and EnterableBuildings in Studio, then press Play and judge: is 1.5x big enough, and is the walk-in ground floor a base to keep or a throwaway?\n' +
    '2. Ask Claude Code to write the house kit V2 contract: the house types for Seireitei and Rukongai, their sizes, a floor plan for each (rooms, door, stairs) and how many houses a block keeps.\n' +
    '3. Approve or change the sizes and the floor plans before anything is built.\n' +
    '4. Ask Claude Code to grey-box one Seireitei ward block and one Rukongai district (W01) with the V2 houses: empty shells with doors, no furniture yet.\n' +
    '5. Walk it: go into every house, up the stairs and across the roofs, and check the part count per district is no higher than today\'s.\n' +
    '6. Say yes, and the kit goes to Blender for the real exteriors and furniture in T03.16 and T03.19.',
  step_help: [
    [
      'Open Claude Code in the game folder and paste this task\'s Claude build brief.',
      'Type: "Do step 1 only: switch on BuildingScale15 and EnterableBuildings for this Studio session, put me at the Seireitei West Gate, and stop."',
      'Press Play, walk one street, go into three houses. Write in Notes: how much bigger the houses should be (1.5x, 2x, more) and whether the interiors are worth keeping.',
    ],
    [
      'Type: "Write docs/contracts/house_kit_v2.md from my notes: the house types, footprints, storeys, a floor plan per type, houses per block, and the part budget per house and per district. Then stop and report."',
      'Check the contract gives every type a floor plan and keeps the district part budget at today\'s or lower.',
    ],
    [
      'Read the contract. Change any size or room you don\'t like, in your own words, as a note on this task.',
      'Say "approved" in Notes when it is right. Nothing is built before that.',
    ],
    [
      'Type: "Grey-box one Seireitei ward block and Rukongai W01 with the V2 kit: shells, working doors, stairs, empty rooms. No materials, no furniture. Then stop and report with captures."',
      'Check the report gives the part count per district next to today\'s number.',
    ],
    [
      'Press Play. Go into every house in the block, up every stair, then Shunpo across the roofs.',
      'Write in Notes any door you couldn\'t pass, any room that feels small, any roof you couldn\'t land on.',
    ],
    [
      'Write your verdict in Notes. If yes, T03.16 and T03.19 build the real kit from this contract.',
    ],
  ],
  acceptance_test:
    'You have walked one grey-box ward block and one district of the new houses, been inside every one, and said yes to the sizes and the floor plans.',
  suggested_tools: 'Claude Code, Roblox Studio (MCP), Rojo, Lune, Blender (later)',
  phase_dependencies: 'Phase 02 (Decide the big things) is finished.',
  phase_exit_gate: 'Every map is finished, has its gameplay spots marked, and runs smoothly on an iPhone 13.',
  details:
    MARK + '\n\n' +
    '**Already in the game (build 246, both switches off):** `Config.Features.BuildingScale15` (src/shared/World/BuildingScaleKit.lua) scales every Soul Society building 1.5x on the same map: fewer, bigger houses, wider streets. ' +
    '`Config.Features.EnterableBuildings` (src/shared/World/SoulInteriors.lua, SoulInteriorsData.lua, src/client/SoulInteriorClient.lua) gives every house a working door and a furnished ground floor: generated per house type (60 parts) or hand-styled for key buildings (120 parts), the 3 nearest within 60 studs dressed on the client. ' +
    'Neither has been seen by the owner. Start from them; don\'t build the same thing twice.\n\n' +
    '**Today\'s houses (src/shared/Rukongai/HouseKit.lua):** family home 24 x 30, townhouse 22 x 26 (2 storeys), terrace row 45 x 24, merchant house 24 x 28, courtyard residence 40 x 40, inn 36 x 32, poor house 18 x 22 to 20 x 24, outer terrace up to 56 x 24. Seireitei ward houses come from src/shared/Seireitei/FabricKit.lua (1 to 2 storeys). All are solid boxes with door leaves on a solid wall.\n\n' +
    '**What the contract must settle:**\n' +
    '- The house types: about 6 to 8 for Seireitei (home, townhouse, officer\'s residence, shop, office, storehouse, inn) and about 6 to 8 for Rukongai (family home, farmhouse, terrace of 2 to 3 big units, merchant house, inn, courtyard residence, poor house). The inner, middle and outer tiers differ by weathering and repairs, not by shrinking the houses.\n' +
    '- Footprints and storeys: about 1.5x to 2.5x today\'s, settled from the BuildingScale15 look. Two storeys as the normal house, not the exception.\n' +
    '- A floor plan per type: entrance, main room, 1 to 3 side rooms, stairs where there is an upper floor, a yard or court where the type has one. Door clear width at least 5.2 studs and height 7.6 (R15).\n' +
    '- Houses per block: about half of today\'s, so the part count per district stays at today\'s or lower (the budgets in src/shared/Rukongai/Rollout.lua).\n' +
    '- Interiors: shells built with the house; furniture streamed near the player (the SoulInteriors way), budgets per room.\n' +
    '- Roofs still land Shunpo; streets widen with the houses.\n\n' +
    '**Pipeline (docs/PIPELINE.md):** contract, then grey-box blockout, then the measured gate, then detail in Blender (the mesh kit V2) and SoulMaterials (T03.20). Never jump to finished.\n\n' +
    '**Estimate:** about 2 sessions (3 if tricky): one for the look-and-contract round, one for the grey-box and the walk.',
  steps: [
    { text: 'Look at BuildingScale15 and EnterableBuildings in Studio first (both switched off today) and decide: how much bigger, and is the existing interior shell worth keeping?', note: '', done: false, state: '', src: SRC },
    { text: 'Write docs/contracts/house_kit_v2.md: house types for Seireitei and Rukongai, footprints (about 1.5x to 2.5x today\'s), storeys, a floor plan per type, houses per block (about half of today\'s), part budget per house and per district (no higher than today\'s)', note: '', done: false, state: '', src: SRC },
    { text: 'Owner approves the catalogue and the floor plans before anything is built', note: '', done: false, state: '', src: SRC },
    { text: 'Grey-box blockout: one Seireitei ward block and Rukongai W01 with V2 shells, working doors, stairs, empty rooms', note: '', done: false, state: '', src: SRC },
    { text: 'Measured gate: parts per district at or below today\'s, 45 fps in the busiest street, every door passes an R15 rig, roofs still land Shunpo', note: '', done: false, state: '', src: SRC },
    { text: 'Owner walks the blockout and approves; then T03.16 and T03.19 build the real kit from the contract', note: '', done: false, state: '', src: SRC },
  ],
  sources: ['Owner, 13 Oct 2026 (chat)'],
  decisions: ['OD20', 'OD06'],
  images: [],
  who: 'Claude designs and builds the grey-box; you approve the catalogue and walk it',
  estimate: 'About 2 sessions (3 if it gets tricky)',
  estimate_sessions: 2,
  estimate_tricky: 3,
  roadmap: '',
};

// ---- 3. Changes to the tasks that build houses --------------------------------------------------------------------
const EDITS = {
  'T03.16': {
    title: 'Build the Seireitei houses and streets: fewer, bigger, with interiors',
    why: 'Fill the empty grey areas of Seireitei (the Shinigami city) with fewer, much bigger, redesigned houses you can walk into, plus streets and props.',
    firstStep: 'Use the house kit V2 from T03.26: fewer, bigger houses per block, every one with a working door and an interior (ground floor furnished; the upper floor too where there is one)',
    firstInstruction: 'Wait for T03.26\'s yes. Every house below is a V2 house: bigger, redesigned, with an interior.',
    firstHelp: [
      'Check T03.26 says "approved" in its Notes before you start.',
      'Type: "Build the Seireitei ward with the house kit V2 only: fewer, bigger houses, each with a door and a furnished interior. Then stop and report."',
      'Press Play, walk into three houses and up any stairs.',
    ],
    acceptance_test: 'Streets, rooftops and the view from above all look real, with no obvious copy-paste, and you can walk into every house.',
    estimate_sessions: 3,
    estimate_tricky: 5,
  },
  'T03.18': {
    lastStep: 'The barracks, offices and houses round each HQ use the house kit V2: fewer, bigger, with interiors (OD20)',
  },
  'T03.19': {
    why: 'Build the middle districts of Rukongai (the poorer town outside Seireitei) with the V2 houses, so the look changes smoothly from rich to poor without the houses shrinking.',
    firstStep: 'Use the house kit V2 (T03.26): fewer, bigger houses with interiors; the mid tier differs by weathering and repairs, not by size',
    firstInstruction: 'Wait for T03.26\'s yes. Use the V2 houses: bigger, with interiors; make them look poorer, not smaller.',
    firstHelp: [
      'Check T03.26 says "approved" in its Notes before you start.',
      'Type: "Build the middle Rukongai districts with the house kit V2: fewer, bigger houses with interiors, weathered for the mid tier. Then stop and report."',
    ],
    estimate_sessions: 2,
    estimate_tricky: 3,
  },
  'T03.21': {
    lastStep: 'Roll out with the house kit V2: each district holds about half as many houses, all bigger, with interiors streamed near the player; the part budget per district stays at today\'s or lower (OD20)',
  },
};

const SCALE_LINE = 'Every Soul Society building 1.5x, fewer bigger houses, wider streets (switch off: BuildingScale15). Switch it on in Studio with EnterableBuildings and judge both for T03.26';

// ---------------------------------------------------------------------------------------------------------------
const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
let changed = [];

if (!P.decisions.some((d) => d.id === 'OD20')) {
  const at = P.decisions.findIndex((d) => d.id === 'A01');
  P.decisions.splice(at < 0 ? P.decisions.length : at, 0, OD20);
  changed.push('decision OD20');
}

if (!P.tasks.some((t) => t.id === 'T03.26')) {
  const at = P.tasks.findIndex((t) => t.id === 'T03.16');
  if (at < 0) throw new Error('no task T03.16');
  P.tasks.splice(at, 0, NEW_TASK);
  changed.push('task T03.26');
}

const byId = Object.fromEntries(P.tasks.map((t) => [t.id, t]));
function renumber(text) {
  let n = 0;
  return text.split('\n').map((l) => l.replace(/^\d+\. /, () => `${++n}. `)).join('\n');
}
for (const [id, e] of Object.entries(EDITS)) {
  const t = byId[id];
  if (!t) throw new Error('no task ' + id);
  if (t.decisions.includes('OD20')) continue; // already applied
  if (e.title) t.title = e.title;
  if (e.why) t.why = e.why;
  if (e.firstStep) t.steps.unshift({ text: e.firstStep, note: '', done: false, state: '', src: SRC });
  if (e.lastStep) t.steps.push({ text: e.lastStep, note: '', done: false, state: '', src: SRC });
  if (e.firstInstruction) t.implementation_instructions = renumber('1. ' + e.firstInstruction + '\n' + t.implementation_instructions);
  if (e.firstHelp) t.step_help = [e.firstHelp, ...(t.step_help || [])];
  if (e.acceptance_test) t.acceptance_test = e.acceptance_test;
  if (e.estimate_sessions) {
    t.estimate_sessions = e.estimate_sessions;
    t.estimate_tricky = e.estimate_tricky;
    t.estimate = `About ${e.estimate_sessions} sessions (${e.estimate_tricky} if it gets tricky)`;
  }
  t.decisions.push('OD20');
  t.details = MARK + ' Build with the house kit V2 from T03.26; nothing here starts before that task is approved.\n\n' + (t.details || '');
  changed.push('task ' + id);
}

{
  const t = byId['T01.08'];
  if (!t) throw new Error('no task T01.08');
  if (!t.steps.some((s) => s.text === SCALE_LINE)) {
    t.steps.push({ text: SCALE_LINE, note: '', done: true, state: 'built, needs a play check', src: 'game audit 13 Oct (build 246)' });
    changed.push('T01.08 step');
  }
}

const counts = {};
for (const t of P.tasks) counts[t.seed_status] = (counts[t.seed_status] || 0) + 1;
P.metadata.status_counts = counts;
P.metadata.task_count = P.tasks.length;
P.metadata.version = '2026-10-13c';

// ---- 4. Codex -----------------------------------------------------------------------------------------------------
const C = codex.data;
function patch(sec, from, to) {
  if (!sec || sec.content.includes(to) || !sec.content.includes(from)) return false;
  const before = sec.content;
  sec.content = before.replace(from, () => to);
  if (typeof C.full === 'string' && C.full.includes(before)) C.full = C.full.replace(before, () => sec.content);
  return true;
}
const od = C.sections.find((s) => s.title === 'Owner decisions');
const OD20_LINE =
  `- **OD20 ${OD20.title}** (Locked, 13 Oct). ${OD20.detail} _Source: ${OD20.source}._`;
if (od && !od.content.includes('OD20')) {
  const head = '## Locked and standing\n\n';
  if (patch(od, head, head + OD20_LINE + '\n')) changed.push('codex OD20');
}
const built = C.sections.find((s) => s.title === 'What is built today');
const ENTER = '- Furnished rooms you can walk into (switch off: EnterableBuildings)';
if (built && patch(built, ENTER, ENTER + '\n- ' + SCALE_LINE)) changed.push('codex BuildingScale15');

save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change (already applied).');
console.log(`${P.tasks.length} tasks, ${P.decisions.length} decisions.`);
