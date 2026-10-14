#!/usr/bin/env node
// Plan edit, 13 Oct 2026. Pins two owner problems so they are never forgotten:
//  1. Interior prompts v1 were wrong (owner: "chat gpt made this but i dont think all of this interior will fit in the
//     current house model it doesnt even look like the same house also you can see under this room"; "dont build the
//     interior yet since we got the interior prompts rong"; "dont forget this"). T03.27 gets the problem, the v2 method
//     and the fallback (Claude's own interior shell renders), and a gate: no interior building until the pictures work.
//  2. The roof gap (owner: "this gap in the roof iis a big problem weve always had that needs to change"). T03.26 gets
//     a step and a rule.
'use strict';
const fs = require('fs'); const path = require('path'); const vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..'); const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
function load(file, key) { const text = fs.readFileSync(file, 'utf8'); const marker = `window.${key} = `; const at = text.indexOf(marker); const sb = { window: {} }; vm.runInNewContext(text, sb); return { text, at, marker, data: sb.window[key] }; }
function save(file, f) { fs.writeFileSync(file, f.text.slice(0, f.at) + f.marker + JSON.stringify(f.data) + ';\n'); }
const SRC = 'owner 13 Oct';
const plan = load(PLAN_FILE, 'SS_PLAN');
const changed = [];
const t27 = plan.data.tasks.find((x) => x.id === 'T03.27');
const KEY = '**Problem found 13 Oct (do not forget):**';
if (t27 && !t27.details.includes(KEY)) {
  t27.details = KEY + ' the first interior prompts described a generic Edo townhouse, not our buildings (passage down the left when the townhouse door is centred; a garden, bath house and storeroom that do not fit inside the walls). ChatGPT\'s townhouse cutaway came out bigger, different, with upper rooms floating so you could see under them. Owner: "i dont think all of this interior will fit in the current house model it doesnt even look like the same house also you can see under this room"; "dont build the interior yet since we got the interior prompts rong"; "dont forget this".\n\n' +
    '**Fix (prompts v2, docs/contracts/house_kit_v2_interior_prompts.md):** every interior comes from that building\'s own exterior picture. The cutaway is an EDIT of the picture (same camera, footprint, doors, windows; only the roof lifted off); every room is placed behind a window or door you can see; nothing outside the walls; every upper floor rests on the walls and posts below it. One ChatGPT chat per building.\n\n' +
    '**Fallback if ChatGPT still changes the building:** Claude builds the real interior shell inside the approved outside in Blender (floors, inner walls, doorways, stairs, upper floor on beams and posts), renders each floor and each room, and ChatGPT only furnishes those renders. A first townhouse shell exists (SoulSurvival-blender/scripts/ss_house_v2_townhouse_interior.py), parked.\n\n' +
    '**Gate:** no interior is built until the owner says the v2 pictures work.\n\n' + t27.details;
  t27.steps.unshift({ text: 'Test prompts v2 on the townhouse cutaway: it must be the same house, rooms inside the walls, no floating floors (owner judges)', note: '', done: false, state: '', src: SRC });
  changed.push('T03.27');
}
const t26 = plan.data.tasks.find((x) => x.id === 'T03.26');
const GAP = 'Close the gap between every wall top and its roof (front, back, gables, small roofs): a solid beam and frieze board all the way round, checked from below on all sides and from inside. Owner: "this gap in the roof iis a big problem weve always had that needs to change"';
if (t26 && !t26.steps.some((s) => s.text === GAP)) {
  const at = t26.steps.findIndex((s) => s.text.startsWith('Townhouse finish:'));
  t26.steps.splice(at >= 0 ? at : t26.steps.length, 0, { text: GAP, note: '', done: false, state: '', src: SRC });
  changed.push('T03.26');
}
plan.data.metadata.version = '2026-10-13j';
save(PLAN_FILE, plan);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change.');
