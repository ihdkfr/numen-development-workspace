#!/usr/bin/env node
// Plan edit, 13 Oct 2026 (owner: "make sure you add ... all updates to the plan add all images aswell and dscribe what
// they are"). Records the house kit V2 progress on T03.26 with seven described pictures, adds T03.27 for the interiors
// (owner: "i want you to give me prompts for good quality interiors all different for al of them"), notes the
// recommended order (all outsides first, then all insides) and adds a codex section. Safe to run again.
// Usage (from the repo root): node tools/plan-edit/houses-progress-2026-10-13.js
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
  const sandbox = { window: {} };
  vm.runInNewContext(text, sandbox, { filename: file });
  return { text, at, marker, data: sandbox.window[key] };
}
function save(file, f) { fs.writeFileSync(file, f.text.slice(0, f.at) + f.marker + JSON.stringify(f.data) + ';\n'); }

const SRC = 'owner + Claude 13 Oct';
const IMAGES = [
  { src: 'plan-assets/42c5e1696eb5bcc3061bdd59a600e235.jpg', cap: 'LOCKED reference: the townhouse (machiya), the owner\'s ChatGPT picture, 13 Oct. Lattice bays, centre lattice door with the navy crest noren, lantern under a small roof, hanging sign, bamboo splash guards, tiled front eave, the slatted upper window, an S-tile gable with demon tiles facing the street.' },
  { src: 'plan-assets/3df55388b91fdce034a12656c2c50c79.jpg', cap: 'LOCKED reference: the courtyard residence. Walled compound with tiled wall tops, roofed gate with crest lanterns, raked-gravel garden with a pine and stone lantern, hip-and-gable main house with shoji and veranda, white two-storey storehouse with a diagonal tile base.' },
  { src: 'plan-assets/617c52e88689dd3461f91d0fbb55f231.jpg', cap: 'LOCKED reference: the poor house (outer districts). Patched board roof with a few broken tiles, cracked plaster showing the earth wall, plank door, torn crest noren, rain barrel with a bamboo downpipe, firewood shelter. Same kit, worn down.' },
  { src: 'plan-assets/22441d6bce22e9e691498eb249495a6d.jpg', cap: 'Townhouse grey blockout, round 2, beside the picture (shapes only). Built as blocks in Play and walked by the owner: "size looks good".' },
  { src: 'plan-assets/5024c7540f091f192c3950855ec3864d.jpg', cap: 'The model laid over the picture at 50%. The picture\'s camera was solved from four wall corners (3 px), so the front lines up post for post; the picture is 42 x 42 studs at the approved storey height.' },
  { src: 'plan-assets/bd2dd32d938ea03d5cffd3bfedaddbb3.jpg', cap: 'Townhouse round 11: the picture (left) beside the Blender model from the same camera, with the door and roof close up. Realistic textures with relief maps. Claude\'s score 72/100 (layout 90, noren/lantern/sign 85, walls 80, bamboo 78, roof 68, demon tiles 40, finish 60, game-ready 50).' },
  { src: 'plan-assets/dee08ff8a50758f9800d8b2211617dfc.jpg', cap: 'Round 11 close-ups at the same spots, picture left, model right: the noren crest, a lattice bay with the bamboo guard, the roof edge, the lantern, the hanging sign, the side window (no longer covered by a beam).' },
];
const PROGRESS = [
  ['Research: how top Roblox builders make high-end buildings, and Edo townhouse anatomy (docs/research/house_kit_v2_research.md)', true, 'done'],
  ['Contract written and the four choices answered: townhouse first, sliding doors that close by themselves, ChatGPT picture first, S-tiles on Rukongai (docs/contracts/house_kit_v2_exterior.md)', true, 'done'],
  ['Reference pictures for all seven types made by the owner; townhouse, courtyard residence and poor house saved; family home, merchant shop, terrace row and inn still to be saved as files', false, 'doing'],
  ['Townhouse blockout walked in Play: "size looks good"', true, 'approved by the owner'],
  ['Townhouse matched to its picture: measured proportions, the noren crest, lantern, sign and side window, realistic textures (round 11, 72/100)', true, 'built, needs the owner\'s verdict'],
  ['Townhouse finish: a sculpted demon tile, a deeper glossier roof, soft corner shading baked into the textures', false, ''],
  ['Export: cut hidden triangles (about 47k now), distance versions, FBX + textures; owner imports; Claude wires the sliding doors; measure a full street on the iPhone 13', false, ''],
  ['Repeat for the other six types from their pictures, sharing the kit (recommended order: all outsides first, then all insides)', false, ''],
];
const DETAIL =
  '**Progress (13 Oct 2026, plan build 10):**\n' +
  '- Scripts in SoulSurvival-blender/scripts: ss_house_v2_townhouse.py (geometry to the measured picture), ss_house_v2_tex2.py and ss_house_v2_tex.py (textures, relief maps, materials), ss_house_v2_review.py (the picture\'s camera, side-by-side, 50/50 overlay, close-ups). Blend: SoulSurvival-blender/HouseKit_V2.blend. Renders: docs/renders/house_v2/.\n' +
  '- Owner rules added 13 Oct: "it should look midentical to my picture"; "also see the difference on the textures it should match more like in the image" (realistic material detail for houses); "so we adapt and make it look great yet loading time and game speed stays top quality".\n' +
  '- Pictures draw the avatar about 30% small, so each type is matched for look and proportions and scaled to the approved storey height.\n' +
  '- Standards and every picture, described: the owner\'s Obsidian vault, Standards/Houses and Recipes/House recipe.';

const T27 = {
  id: 'T03.27', aliases: [], phase_id: '03', phase_title: 'Build the maps',
  title: 'Design the house interiors: all seven types',
  priority: 'CORE', effort: 'L', seed_status: 'todo', locked: false,
  why: 'Every house gets a full interior you can walk through: rooms, stairs, kitchens, baths, and what is in them, all different per type and fitted to its locked outside.',
  implementation_instructions:
    '1. Make the interior pictures in ChatGPT from docs/contracts/house_kit_v2_interior_prompts.md: 54 views across the seven types (a cutaway overview first, then every room, the stairs and the back areas). Attach each building\'s exterior picture.\n' +
    '2. Save them in docs/reference/houses/interiors/ as <building>_<number>.webp.\n' +
    '3. Claude builds each interior from its pictures, fitted to that building\'s locked outside: doorways at least 1.5 avatars tall, ceilings at least 2 avatars (low attic floors excepted), a clear path 2 avatars wide, real walkable stairs.\n' +
    '4. Furniture loads only near the player, so a street of houses stays fast.\n' +
    '5. You walk every room in Play and approve it.',
  step_help: [
    ['Open docs/contracts/house_kit_v2_interior_prompts.md.', 'For each prompt: attach the building\'s exterior picture, paste the shared header, then the prompt. Make 2 to 3 and pick 1.'],
    ['Save the picked images into docs/reference/houses/interiors/ with the names the file gives (for example inn_04.webp).'],
    ['Paste this task\'s brief into Claude Code and say which building to start with.'],
    ['Press Play, walk every room and up every stair. Write anything wrong in Notes.'],
    ['Write your verdict in Notes for each building.'],
  ],
  acceptance_test: 'You have walked every room of all seven houses in Play, every door and stair works, and the rooms look like their pictures.',
  suggested_tools: 'ChatGPT (pictures), Claude Code, Blender (MCP), Roblox Studio (MCP)',
  phase_dependencies: 'T03.26 (the outsides) first: recommended order is all outsides as one kit, then all insides.',
  phase_exit_gate: 'Every map is finished, has its gameplay spots marked, and runs smoothly on an iPhone 13.',
  details:
    '**Owner, 13 Oct:** "i want you to give me prompts for good quality interiors all different for al of them and it must include views from everywhere indoors so i need for the inn for example i need to see evrything inside i the stairs, rooms whats in the rooms everything youd find in this type of inn".\n\n' +
    '**Prompts:** docs/contracts/house_kit_v2_interior_prompts.md. Townhouse 8 views (passage and kitchen, front room, hearth room, box staircase, attic rooms under the slatted window, back room and garden, bath and yard); family home 7; merchant shop 8 (shop floor, counting desk, rice store, living room, clerks\' attic, courtyard, storehouse); terrace row 6 (three different homes: seamstress, woodworker, poor family; the fire wall; the shared alley); inn 11 (entrance hall and reception, main staircase, upper corridor, guest room by day and night, banquet room, dining room, kitchen, bath house, staff and linen rooms); courtyard residence 9 (gate view, entrance hall, reception room, veranda, living room and kitchen, tea room, storehouse both floors); poor house 5.\n\n' +
    '**Already in the game:** EnterableBuildings (switch off) gives a door and a furnished ground floor (generated per house type, 3 nearest within 60 studs). Reuse its streaming; the furniture itself is redone from the pictures.',
  steps: [
    { text: 'Owner makes the 54 interior pictures from the prompts file and saves them', note: '', done: false, state: '', src: SRC },
    { text: 'Claude builds each interior fitted to its locked outside (walkable sizes, real stairs)', note: '', done: false, state: '', src: SRC },
    { text: 'Furniture streams in near the player only; measure a full street on the iPhone 13', note: '', done: false, state: '', src: SRC },
    { text: 'Owner walks every room in Play and approves each building', note: '', done: false, state: '', src: SRC },
  ],
  sources: ['Owner, 13 Oct 2026 (chat)'], decisions: ['OD20'], images: [], who: 'You make the pictures; Claude builds; you walk and approve',
  estimate: 'About 7 sessions (10 if it gets tricky)', estimate_sessions: 7, estimate_tricky: 10, roadmap: '',
};

const plan = load(PLAN_FILE, 'SS_PLAN');
const codex = load(CODEX_FILE, 'SS_CODEX');
const P = plan.data;
const changed = [];
const t = P.tasks.find((x) => x.id === 'T03.26');
if (!t) throw new Error('no T03.26');
t.images = t.images || [];
for (const im of IMAGES) if (!t.images.some((x) => x.src === im.src)) { t.images.push(im); changed.push('image'); }
for (const [text, done, state] of PROGRESS) {
  if (!t.steps.some((s) => s.text === text)) { t.steps.push({ text, note: '', done, state, src: SRC }); changed.push('step'); }
}
if (!t.details.includes('**Progress (13 Oct 2026, plan build 10):**')) { t.details = DETAIL + '\n\n' + t.details; changed.push('T03.26 details'); }
if (t.seed_status === 'todo') { t.seed_status = 'doing'; changed.push('T03.26 doing'); }
if (!P.tasks.some((x) => x.id === 'T03.27')) {
  const at = P.tasks.findIndex((x) => x.id === 'T03.26');
  P.tasks.splice(at + 1, 0, T27);
  changed.push('T03.27');
}
const counts = {};
for (const x of P.tasks) counts[x.seed_status] = (counts[x.seed_status] || 0) + 1;
P.metadata.status_counts = counts;
P.metadata.task_count = P.tasks.length;
P.metadata.version = '2026-10-13h';

const C = codex.data;
const TITLE = 'Houses: kit V2 (13 Oct)';
if (!C.sections.some((s) => s.title === TITLE)) {
  const content = [
    '# Houses: kit V2 (13 Oct)',
    '',
    'Decision **OD20**: fewer, bigger houses (final size 1.5x today\'s), redesigned, every one with an interior. Outsides: **T03.26**. Insides: **T03.27**.',
    '',
    '## The rules',
    '- Each house matches its locked reference picture: layout, proportions, crest, colours, props. Pictures draw the avatar about 30% small, so the look is matched and the size scaled to the approved storey height.',
    '- Realistic material detail like the pictures: weathered timber grain, stained plaster, granite, glazed S-tiles that vary tile by tile, a brick-like clay ridge, relief maps.',
    '- Real sliding lattice doors: a prompt opens them, they close after about 6 s and block you when shut.',
    '- Look great AND run great: a scripted Blender kit cloned by code, full detail only near the player, lighter versions further away, measured on the iPhone 13.',
    '- Order: all seven outsides first as one shared kit, then all seven insides.',
    '',
    '## The seven reference pictures',
    '| Type | State | What it shows |',
    '|---|---|---|',
    '| Townhouse | saved, locked | lattice bays, crest noren, lantern, sign, bamboo guards, slatted upper window, S-tile gable with demon tiles |',
    '| Family home | in chat only | one storey, veranda bench before shoji, slatted shutters, lattice entrance, stone lantern, pine, bamboo fence |',
    '| Merchant shop | in chat only | open rice shop under the townhouse upper floor: three crest noren, big rice sign, bales, pottery, cloth, bench |',
    '| Terrace row | in chat only | three homes under one roof with tiled fire walls, three coloured crest noren, laundry pole |',
    '| Inn | in chat only | hip-and-gable roof with cross gable, upstairs balcony of lit paper rooms, inn sign, noren row, big lanterns, benches, garden |',
    '| Courtyard residence | saved, locked | walled compound, roofed gate with lanterns, pine garden, hip-and-gable house, white storehouse with diagonal tile base |',
    '| Poor house | saved, locked | patched board roof, cracked plaster, plank door, torn noren, rain barrel, firewood shelter |',
    '',
    '## Files',
    '- Contract: docs/contracts/house_kit_v2_exterior.md. Research: docs/research/house_kit_v2_research.md.',
    '- Prompts: house_kit_v2_townhouse_prompt.md, house_kit_v2_type_prompts.md, house_kit_v2_interior_prompts.md (54 interior views).',
    '- Blender scripts: ss_house_v2_townhouse.py, ss_house_v2_tex2.py, ss_house_v2_tex.py, ss_house_v2_review.py; blend HouseKit_V2.blend.',
    '- The owner\'s vault: Standards/Houses (every rule and picture, described) and Recipes/House recipe.',
  ].join('\n');
  C.sections.push({ title: TITLE, content });
  if (typeof C.full === 'string') C.full += '\n\n' + content;
  changed.push('codex section');
}
save(PLAN_FILE, plan);
save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + [...new Set(changed)].join(', ') + ` (${changed.filter((c) => c === 'image').length} images)` : 'Nothing to change.');
