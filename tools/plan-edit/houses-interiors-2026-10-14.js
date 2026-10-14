#!/usr/bin/env node
// Plan edit, 14 Oct 2026: house kit V2 progress overnight and through the day (owner: "log all of this in my vault and
// also the numen plan ... add it as tasks and if there completed then mark them as completed and add the images").
// - T03.26: courtyard re-laid to the picture (60 x 50), family-home windows, steps marked done, new pictures.
// - T03.27: all seven interiors built from the owner's pictures; steps marked done; reference + result pictures.
// - New tasks T03.28 to T03.33 and proposed decision OD21: the rich-to-poor Rukongai plan (owner asked for it).
// - Codex "Houses: kit V2": progress table.
// Usage (from the repo root): node tools/plan-edit/houses-interiors-2026-10-14.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..');
const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
const CODEX_FILE = path.join(ROOT, 'data', 'codex-data.js');
function load(file, key) {
  const text = fs.readFileSync(file, 'utf8'); const marker = `window.${key} = `; const at = text.indexOf(marker);
  const sandbox = { window: {} }; vm.runInNewContext(text, sandbox, { filename: file }); return { text, at, marker, data: sandbox.window[key] };
}
function save(file, f) { fs.writeFileSync(file, f.text.slice(0, f.at) + f.marker + JSON.stringify(f.data) + ';\n'); }

const plan = load(PLAN_FILE, 'SS_PLAN'); const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data; const changed = [];
const task = (id) => P.tasks.find((x) => x.id === id);
function addImages(t, list) { for (const im of list) if (!t.images.some((x) => x.src === im.src)) { t.images.push(im); changed.push(`${t.id} image`); } }
function doneStep(t, startsWith, state, note) {
  const s = t.steps.find((x) => x.text.startsWith(startsWith));
  if (!s) throw new Error(`${t.id}: no step starting "${startsWith}"`);
  if (!s.done || s.state !== state) { s.done = true; s.state = state; if (note) s.note = note; changed.push(`${t.id} step`); }
}
function addStep(t, text, done, state, src) { if (!t.steps.some((x) => x.text === text)) { t.steps.push({ text, note: '', done, state, src }); changed.push(`${t.id} new step`); } }
function prependDetails(t, marker, text) { if (!t.details.includes(marker)) { t.details = text + '\n\n' + t.details; changed.push(`${t.id} details`); } }

// ---------------------------------------------------------------- T03.26 (outsides)
const t26 = task('T03.26');
prependDetails(t26, '**Progress (14 Oct 2026, plan build 13):**', [
  '**Progress (14 Oct 2026, plan build 13):**',
  '- All seven outsides are built in Blender (SoulSurvival-blender/HouseKit_V2_AllHouses.blend, one house per collection, laid out along x). Claude\'s scores against the pictures: townhouse 72, family home 78, merchant 78, terrace 74, inn 78, courtyard 78, poor house 74.',
  '- Courtyard: you asked for the detail sheet to be applied, then said "the courtyard layout wasnt right before". It is re-laid from the picture at **60 x 50** (Claude first misread the picture as 60 x 42; measured properly it is nearly square). Gate left of centre on the stepping-stone path, main house back-left, kura back-right level with the veranda, lighter main roof.',
  '- Stone fixed everywhere it was touched: no brick-wall scan on rocks or lanterns ("everything is a stone brick texture so the brick outline shows on the rock").',
  '- Family home: you approved the back door and the two side windows its interior pictures draw. Rule since 14 Oct: an opening drawn in an approved interior picture may be built, in the outside\'s own style.',
  '- Townhouse: you chose to keep 42 x 42 (the size you walked), not the 33 x 39 plot.',
  '- Rounds: no fixed number of checks any more ("5 checks ... will take too long and too many credits"): check once, fix everything in one batch, one final full-quality render.',
].join('\n'));
doneStep(t26, 'Close the gap between every wall top and its roof', 'built, owner to judge', 'Frieze board and gables tight to the roof on every house (13-14 Oct); checked from below and inside.');
doneStep(t26, 'Repeat for the other six types from their pictures', 'built, needs the owner\'s verdict', 'All seven outsides built 13-14 Oct; courtyard re-laid to 60 x 50 on 14 Oct.');
addImages(t26, [
  { src: 'plan-assets/308fa746cfd30956e4423777f0457545.jpg', cap: 'Courtyard residence detail sheet (owner, ChatGPT, 14 Oct): the gate with crest lanterns, round mossy stepping stones on gravel, the stone lantern and jar, the front and side gardens, the kura door and window. Applied to the model.' },
  { src: 'plan-assets/09169c18e32411bc360053911308990b.jpg', cap: 'Courtyard re-laid to the picture at 60 x 50 (14 Oct, round 14): the sheet (left) beside the model from a matching raised view. Claude\'s score 78/100. Planting less lush and colours less warm than the sheet; the texture pass follows.' },
  { src: 'plan-assets/3be25b26665601d4723ea04406279fd1.jpg', cap: 'Family home, the two side windows you approved (14 Oct): a two-bay shoji window for the bedroom and a high slatted window over the stoves, before and after, in the house\'s own timber and paper.' },
]);

// ---------------------------------------------------------------- T03.27 (insides)
const t27 = task('T03.27');
prependDetails(t27, '**Progress (14 Oct 2026, plan build 13):**', [
  '**Progress (14 Oct 2026, plan build 13):** all seven interiors are built in Blender from your pictures (docs/reference/houses/interiors/, 33 pictures), each fitted inside its locked outside, walk-checked (routes at least 3 wide, doorways at least 7.5 tall) and checked against the pictures. Not in the game yet.',
  '',
  '| Building | Score | Triangles | Notes |',
  '|---|---|---|---|',
  '| Family home | 77 | 55k | Your 6 pictures; back door and 2 side windows added with your OK |',
  '| Townhouse | 77 | 59k | Your 8 pictures; ChatGPT\'s second hearth in the back room is a tea table |',
  '| Merchant shop | 74 | 60k | Sheet B (it has the tiled eave the shop has); emptier and less golden than the sheet |',
  '| Inn | 77 | 79k | Cutaway A; no picture of the upper floor yet (corridor, five rooms, banquet room) |',
  '| Courtyard residence | 68 | 62k | Cutaway B, kura contents from A; lower ceilings, new armour, gold screen |',
  '| Terrace row | 72 | 25k | Seamstress, carpenter and poor-family homes, each from its own picture |',
  '| Poor house | 66 | 19k | Hearth, loft, light shaft through the real roof hole |',
  '',
  'Brief every builder follows: SoulSurvival-project/docs/contracts/house_interior_builder_brief.md. Plans per building: docs/contracts/house_interior_pipeline.md. The gate below ("no interior is built until the owner says the v2 pictures work") was passed when you sent the pictures and asked for the build (14 Oct).',
].join('\n'));
doneStep(t27, 'Test prompts v2 on the townhouse cutaway', 'done', 'You made the townhouse set with the v2 prompts (13 Oct); same house, rooms inside the walls.');
doneStep(t27, 'Owner makes the 54 interior pictures', 'done', '33 pictures saved 13-14 Oct (some views come as sheets). Still missing: the inn\'s upper floor.');
doneStep(t27, 'Claude builds each interior fitted to its locked outside', 'built, needs the owner\'s verdict', 'All seven built 14 Oct; scores and sheets in the details and images.');
if (t27.seed_status === 'todo') { t27.seed_status = 'doing'; changed.push('T03.27 status'); }
addImages(t27, [
  { src: 'plan-assets/e5cfdfea96cfbde2fa6ee61bdb7a628f.jpg', cap: 'LOCKED reference: family home cutaway (owner, ChatGPT, 14 Oct). Front room, hearth room, bedroom and altar room on the left; the earth strip from the entrance to the kitchen on the right.' },
  { src: 'plan-assets/9cdde9cb95325e7e08f14c1fc6e7dc4e.jpg', cap: 'LOCKED reference: townhouse ground floor cutaway (owner, 13 Oct). Centre earth passage with stoves; front room, hearth room with box stair, back room; work room, bath, store.' },
  { src: 'plan-assets/afb401137fd196171cdead8bc5bae5a4.jpg', cap: 'LOCKED reference: merchant shop sheet B (owner, 14 Oct). Ground and upper cutaways, shop floor, counting desk, rice store, living room and kitchen, clerks\' attic.' },
  { src: 'plan-assets/51c4b57cee462096c93abf59e6d869eb.jpg', cap: 'LOCKED reference: inn ground floor cutaway A (owner, 14 Oct). Kitchen, dining hall, reception and big stair, bath with a wooden tub, guest rooms.' },
  { src: 'plan-assets/9037c5603d9541bf6aa99f3be85a2dff.jpg', cap: 'LOCKED reference: courtyard residence cutaway B (owner, 14 Oct). Hearth room, bedroom, kitchen, guest room with round window, stone entrance.' },
  { src: 'plan-assets/f6d4369ef95cf1b13e613e6df19c821c.jpg', cap: 'LOCKED reference: terrace row cutaway (owner, 14 Oct). Three one-room homes: seamstress, carpenter, poor family.' },
  { src: 'plan-assets/25ced1403cdc43a66a425d967b21a3f4.jpg', cap: 'LOCKED reference: poor house, hearth and loft (owner, 14 Oct). Light through the broken roof, pot on a rope, straw loft, patched futon.' },
  { src: 'plan-assets/e3b7536849cc8400669e84a4c211c193.jpg', cap: 'Family home interior, built (14 Oct, round 18): your pictures left, the model right. Claude\'s score 77/100.' },
  { src: 'plan-assets/6966ac5ea44bee7fd0bdde9a5d97d621.jpg', cap: 'Townhouse interior, built (14 Oct): your 8 pictures left, the model right. 77/100; front room 88, upper floor views weakest (68-70).' },
  { src: 'plan-assets/4b27a394bd3a9aa0736955d8bb9b03c2.jpg', cap: 'Merchant shop interior, built (14 Oct): sheet B left, the model right. 74/100; the shop floor is emptier than the sheet.' },
  { src: 'plan-assets/651a5383f3f203012c041b01b93ad962.jpg', cap: 'Inn interior, built (14 Oct): your cutaways left, the model\'s cutaways and room views right. 77/100; dining room narrower than drawn; upper floor has no picture yet.' },
  { src: 'plan-assets/56672f4220efb212914414461a2060bb.jpg', cap: 'Courtyard residence interior, built (14 Oct, round 5): your pictures left, the model right. 68/100; the kura (76) is the best room.' },
  { src: 'plan-assets/5e5e29e26d19d3c18efac98c55b53aaa.jpg', cap: 'Terrace row interior, built (14 Oct): your pictures left, the model right. 72/100.' },
  { src: 'plan-assets/428f9b3473329b272ace1a7fd1c23e3d.jpg', cap: 'Poor house interior, built (14 Oct): your pictures left, the model right. 66/100; the plaster patches are fixed in the texture pass.' },
]);

// ---------------------------------------------------------------- OD21 (proposed)
if (!P.decisions.some((d) => d.id === 'OD21')) {
  const at = P.decisions.findIndex((d) => d.id === 'OD20') + 1;
  P.decisions.splice(at, 0, {
    id: 'OD21', status: 'open', date: '14 Oct', topic: 'Soul Society',
    title: 'Rukongai wealth: five tiers, poverty shown by wear, not size (proposed)',
    detail: 'You asked on 14 Oct: "establish how we transition our builds in rukongai from rich districts to poor districts we only have 1 extremely poor house". Claude\'s proposal (SoulSurvival-project/docs/contracts/rukongai_wealth_transition.md): wealth runs in five tiers by district number (Rich, Comfortable, Working, Poor, Destitute), each ring a 75/25 blend of two tiers so streets get poorer step by step, richest by the great roads. Poverty shows through wear (pristine, lived-in, worn, derelict), crowding and wildness, never through smaller houses or grey colour. At most half of any district is poor-class. Only three new poor buildings are needed (shack, back-alley row, abandoned house) plus market stalls and a well yard. Waits for your answers to the 8 questions in the contract.',
    source: 'Claude proposal, 14 Oct 2026, from the owner\'s request',
  });
  changed.push('OD21');
}

// ---------------------------------------------------------------- new tasks T03.28 to T03.33
const COMMON = {
  aliases: [], phase_id: '03', phase_title: 'Build the maps', locked: false,
  suggested_tools: 'Claude Code, Blender (MCP), Roblox Studio (MCP), Lune',
  phase_dependencies: 'T03.26 (the house kit V2 outsides) and T03.27 (the insides).',
  phase_exit_gate: 'Every map is finished, has its gameplay spots marked, and runs smoothly on an iPhone 13.',
  sources: ['Owner, 14 Oct 2026 (chat): "establish how we transition our builds in rukongai from rich districts to poor districts"', 'SoulSurvival-project/docs/contracts/rukongai_wealth_transition.md'],
  decisions: ['OD21', 'OD20'], images: [], roadmap: '',
};
function mk(o) {
  const lines = o.how.map((h, i) => `${i + 1}. ${h[0]}`).join('\n');
  return Object.assign({}, COMMON, {
    id: o.id, title: o.title, why: o.why, priority: o.priority, effort: o.effort, seed_status: 'todo',
    implementation_instructions: lines, step_help: o.how.map((h) => h[1]),
    acceptance_test: o.accept, details: o.details,
    steps: o.how.map((h) => ({ text: h[0], note: '', done: false, state: '', src: 'Claude proposal 14 Oct (rukongai_wealth_transition.md)' })),
    who: o.who, estimate: `About ${o.s} session${o.s === 1 ? '' : 's'} (${o.t} if it gets tricky)`, estimate_sessions: o.s, estimate_tricky: o.t,
  });
}
const NEW = [
  mk({ id: 'T03.28', title: 'Set the Rukongai wealth tiers', priority: 'CORE', effort: 'S', s: 0.5, t: 1,
    why: 'Rukongai should get poorer step by step from the Seireitei wall outwards, never in one jump, and we only have one extremely poor house. This settles the rules before anything is built.',
    how: [
      ['Read the rich-to-poor contract (docs/contracts/rukongai_wealth_transition.md).', ['Open the contract and read the summary and the tier table.', 'Look at the wear ladder: pristine, lived-in, worn, derelict.']],
      ['Answer the 8 questions at the end of the contract.', ['Answer in Notes, numbered, the way you usually do.', 'Say if any tier feels too rich or too poor.']],
      ['Approve the contract; that locks decision OD21.', ['Write "approved" in Notes when it is right.', 'Nothing in T03.29 to T03.33 starts before that.']],
    ],
    accept: 'You have answered the 8 questions and approved the tiers, the wear ladder and the 50% poor cap.',
    details: 'Proposed 14 Oct. Five tiers by district number; poverty by wear, crowding and wildness, never by smaller houses; at most half of any district poor-class. Most of the rules already exist in code (3 tiers by ring and 4 building conditions in src/shared/Rukongai/Tiers.lua and BlockPlanner.lua); the plan moves them onto the new Blender houses.',
    who: 'You decide; Claude wrote the contract' }),
  mk({ id: 'T03.29', title: 'Build the house wear system', priority: 'CORE', effort: 'L', s: 3, t: 5,
    why: 'So each of the seven V2 houses can stand in a rich street or a poor one: roof bays from tiles to patched boards to a hole, cracked plaster, faded and torn noren, torn shoji, clutter and weeds.',
    how: [
      ['Make the wear sheet pictures (Claude writes the ChatGPT prompts).', ['Ask Claude for the wear-sheet prompts.', 'Make the family home at wear 0, 1, 2 and 3 side by side in ChatGPT and save it.']],
      ['Claude builds the wear prototype on the family home.', ['Claude shows wear 0 to 3 side by side from the same cameras.']],
      ['Pick the wear look.', ['Say which look is right, or what to change.']],
      ['Claude rolls the wear out to the other six types and repairs the poor house into tidy versions.', ['Check one sheet per house.']],
    ],
    accept: 'Every V2 house shows wear 0 to 3 from one model, the extra triangles stay under 10% per house, and you approved the look.',
    details: 'Contract section 4. Roof bays are the biggest win (seen from Shunpo height). One shared wear texture set; pieces picked at plan time, never switched in play. Covers TEXTURE-06 (Rukongai gradient) in T03.20 for houses.',
    who: 'Claude builds; you make the pictures and pick the look' }),
  mk({ id: 'T03.30', title: 'Build the poor-district buildings', priority: 'ALPHA', effort: 'L', s: 3, t: 4.5,
    why: 'Even a worn poor house still reads as a proper house. The outer districts need a shack, a back-alley row and an abandoned house, plus market stalls and a well yard.',
    how: [
      ['Make the reference pictures (Claude writes the prompts).', ['Ask Claude for the prompts for the shack, the back-alley row with its well yard, and the abandoned house.']],
      ['Claude builds each one from its picture with the house recipe.', ['Each gets a measured blockout first, then detail.']],
      ['Judge each one against its picture.', ['Write your verdict in Notes for each building.']],
    ],
    accept: 'The shack, back-alley row, abandoned house, stall kit and well yard are built from your pictures and you approved each.',
    details: 'Contract section 5. Workshop, lodging and farmhouse reuse the merchant shop, the worn inn and the family home instead of new models.',
    who: 'You make the pictures; Claude builds' }),
  mk({ id: 'T03.31', title: 'Code the wealth gradient in the planner', priority: 'CORE', effort: 'M', s: 1, t: 2,
    why: 'The district planner has to place the right houses at the right wear in each district, with gradual blending at the edges.',
    how: [
      ['Claude codes the wealth position, the five tiers, the edge blending and the wear sockets.', ['Claude runs the Lune tests and reports the numbers.']],
      ['Claude reports the shares per ring.', ['Check no district is over half poor-class.']],
    ],
    accept: 'The Lune test proves the tier shares per ring, the 50% cap and no wear 0 next to wear 3.',
    details: 'Contract section 6 and step 8: Tiers.lua, BlockPlanner.lua, the assembler and a ruk_wealth_test. Bumps the build.',
    who: 'Claude' }),
  mk({ id: 'T03.32', title: 'Walk the rich-to-poor strip', priority: 'ALPHA', effort: 'S', s: 1, t: 1.5,
    why: 'Check the change from rich to poor feels gradual in play and runs fast.',
    how: [
      ['Claude sets up the West road from the gate to the forest edge.', ['Claude measures fps, parts and triangles per district.']],
      ['Walk it in Play.', ['Walk from the gate outwards and write anything that jumps or looks wrong.']],
    ],
    accept: 'Walking outwards, the districts get rougher step by step with no sudden jump, at the target fps.',
    details: 'Contract step 9. Measured gate: fps per tier, parts and triangles per district, doors at every wear, roof landings.',
    who: 'Claude sets it up; you walk it' }),
  mk({ id: 'T03.33', title: 'Night, life and roads by tier', priority: 'BETA', effort: 'S', s: 1, t: 1.5,
    why: 'Rich districts glow at night with busy streets; the outer rings are darker and wilder.',
    how: [
      ['Claude sets lit windows, lanterns, souls and road surfaces per tier.', ['Claude shows a night capture per tier.']],
      ['Judge the night look.', ['Say if ring 8 is too dark or too bright.']],
    ],
    accept: 'Each tier has its own night look and street life, and you approved it.',
    details: 'Contract step 10. About 57% of windows lit in the richest tier, about 5% in ring 8. Could fold into T03.22.',
    who: 'Claude builds; you judge' }),
];
let at = P.tasks.findIndex((x) => x.id === 'T03.27') + 1;
for (const nt of NEW) { if (!P.tasks.some((x) => x.id === nt.id)) { P.tasks.splice(at, 0, nt); changed.push(nt.id); } at = P.tasks.findIndex((x) => x.id === nt.id) + 1; }

// ---------------------------------------------------------------- counts
const counts = {}; for (const t of P.tasks) counts[t.seed_status] = (counts[t.seed_status] || 0) + 1;
P.metadata.status_counts = counts; P.metadata.task_count = P.tasks.length;
P.metadata.version = '2026-10-14a';

// ---------------------------------------------------------------- codex
const sec = codex.data.sections.find((s) => s.title.startsWith('Houses: kit V2'));
const MARK = '## Progress 14 Oct';
if (sec && !sec.content.includes(MARK)) {
  const before = sec.content;
  sec.content += '\n\n' + [
    MARK,
    'All seven outsides and all seven insides are built in Blender from your pictures. Not in the game yet.',
    '',
    '| Building | Outside | Inside |',
    '|---|---|---|',
    '| Townhouse | 72 | 77 |', '| Family home | 78 | 77 |', '| Merchant shop | 78 | 74 |', '| Terrace row | 74 | 72 |',
    '| Inn | 78 | 77 |', '| Courtyard residence (60 x 50) | 78 | 68 |', '| Poor house | 74 | 66 |',
    '',
    'Rich-to-poor Rukongai: proposed decision **OD21** and tasks **T03.28** to **T03.33**.',
  ].join('\n');
  if (typeof codex.data.full === 'string' && codex.data.full.includes(before)) codex.data.full = codex.data.full.replace(before, () => sec.content);
  changed.push('codex');
}

save(PLAN_FILE, plan); save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change.');
