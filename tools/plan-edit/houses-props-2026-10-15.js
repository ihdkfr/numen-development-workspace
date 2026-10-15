#!/usr/bin/env node
// Plan edit, 15 Oct 2026: Poly Haven props in the houses, the final titled interior images, the owner's fixes, and the
// two new owner rules (Poly Haven first for textures and props; weekly usage cap shared by both chats).
// Usage (from the repo root): node tools/plan-edit/houses-props-2026-10-15.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ROOT = path.resolve(__dirname, '..', '..');
const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
function load(file, key) {
  const text = fs.readFileSync(file, 'utf8'); const marker = `window.${key} = `; const at = text.indexOf(marker);
  const sandbox = { window: {} }; vm.runInNewContext(text, sandbox, { filename: file }); return { text, at, marker, data: sandbox.window[key] };
}
function save(file, f) { fs.writeFileSync(file, f.text.slice(0, f.at) + f.marker + JSON.stringify(f.data) + ';\n'); }
const plan = load(PLAN_FILE, 'SS_PLAN'); const P = plan.data; const changed = [];
const t27 = P.tasks.find((x) => x.id === 'T03.27');
const MARK = '**Props, final images and fixes (15 Oct 2026';
if (!t27.details.includes(MARK)) {
  t27.details = [
    MARK + ', plan build 15):**',
    '- Poly Haven (CC0) props swapped into all seven houses: wooden buckets and tubs, glazed jars, lidded baskets, cutting boards, ladles, sweet potatoes and Asian pears, the courtyard sword stand with two katanas, mossy boulders and ferns. Kept round and premium up close (600-900 triangles near the cameras, 300 far away). Props that read Chinese or Western against your pictures were left out.',
    '- Your linked textures: rough_linen on every noren, cracked_concrete_wall on the poor house plaster (kept cream), rock_01 on the courtyard stepping stones; dark_wood tested and the current timber kept (closer to the pictures). Your three grass models (224k to 1.6M triangles) became 130 light grass clumps (12 triangles each).',
    '- 42 titled interior images and one sheet per house, rendered fresh: SoulSurvival-project/docs/renders/house_v2/interior/final_14oct/.',
    '- Your fixes: inn granite back step and a dining room almost twice as wide with its own street door; three more real roof holes on the poor house (3-4 light shafts inside) and a door that opens cleanly; lighter roofs matched to each house\'s own picture.',
    '- New rules: search Poly Haven first before texturing anything important or modelling a generic prop; the weekly usage cap (83%) is shared by both Claude chats.',
  ].join('\n') + '\n\n' + t27.details;
  changed.push('T03.27 details');
}
const step = 'Swap in Poly Haven props, render the final titled interior images, apply the owner\'s inn, poor-house and roof fixes (15 Oct)';
if (!t27.steps.some((s) => s.text === step)) { t27.steps.push({ text: step, note: '', done: true, state: 'built, needs the owner\'s verdict', src: 'owner + Claude 15 Oct' }); changed.push('T03.27 step'); }
const IMGS = [
  { src: 'plan-assets/7b25587aed153c3c3eaab3e39bd0f8b9.jpg', cap: 'Family home: all six interior views, titled, rendered fresh with the Poly Haven props and the texture pass (15 Oct).' },
  { src: 'plan-assets/61d621131f2cddb9ae55e9f2fa9e0aee.jpg', cap: 'Inn: all nine interior views, titled (15 Oct), before the dining-room widening.' },
  { src: 'plan-assets/9483eeb1f8aa26c5f6be21c9bd0ef764.jpg', cap: 'Poly Haven props close up (15 Oct): glazed jars and buckets on the shelves, the inn kitchen with sweet potatoes and Asian pears, the courtyard sword stand with two katanas.' },
  { src: 'plan-assets/858258971b4c71e11ad76537e5023106.jpg', cap: 'Roofs matched to the pictures (15 Oct): your townhouse picture, before, after (roof brightness within a few shades of the picture).' },
];
for (const im of IMGS) if (!t27.images.some((x) => x.src === im.src)) { t27.images.push(im); changed.push('T03.27 image'); }
P.metadata.version = '2026-10-15a';
save(PLAN_FILE, plan);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change.');
