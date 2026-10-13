#!/usr/bin/env node
// Plan edit, 13 Oct 2026: the owner re-sent the four reference pictures as files ("here i just gave you all of them
// again"). Adds them to T03.26 with descriptions, marks the references step done, updates the codex table.
// Usage (from the repo root): node tools/plan-edit/houses-refs-2026-10-13.js
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

const IMAGES = [
  { src: 'plan-assets/fcc3980b823097b13f6ddfd369423fe6.jpg', cap: 'LOCKED reference: the family home. One storey under a deep S-tile gable with demon tiles; a wide veranda bench before four glowing shoji; slatted shutters at the left; the lattice entrance with the navy crest noren and a crest lantern; a lit stone lantern, pruned pine, fern, boulder and bamboo fence on a stepped granite base.' },
  { src: 'plan-assets/12c79ff737b4279ade893eca4a096791.jpg', cap: 'LOCKED reference: the merchant (rice) shop. The townhouse upper floor and roof over a wide open shop: three crest noren, a big "米" sign with two crests on the front eave, rice bales, pottery and rolled cloth on shelves, a corner lantern, a hanging sign, a long bench, barrels and buckets.' },
  { src: 'plan-assets/b2863ac73e9a6695cd8f1c4a03b6d6dd.jpg', cap: 'LOCKED reference: the terrace row. Three small homes under one S-tile roof split by tiled-top plaster fire walls; each with a lattice door, its own coloured noren and crest (navy leaf, red house crest, olive diamond) and a lattice window; plants, buckets, a wall lantern, a laundry pole.' },
  { src: 'plan-assets/0160526e079229544596d04d9f1c8e93.jpg', cap: 'LOCKED reference: the inn. Hip-and-gable roof with a centre cross gable; a full upstairs balcony of glowing paper rooms and lanterns; the "旅籠" sign; a row of navy noren with a flower crest; glowing lattice doors; big lanterns, banners, "御宿" sign, stone lanterns, red benches, pots, barrels, a bonsai garden and bamboo fence.' },
];
const plan = load(PLAN_FILE, 'SS_PLAN'); const codex = load(CODEX_FILE, 'SS_CODEX');
const t = plan.data.tasks.find((x) => x.id === 'T03.26');
const changed = [];
for (const im of IMAGES) if (!t.images.some((x) => x.src === im.src)) { t.images.splice(3, 0, im); changed.push('image'); }
const st = t.steps.find((s) => s.text.startsWith('Reference pictures for all seven types'));
if (st && !st.done) { st.done = true; st.state = 'done'; st.note = 'All seven saved as files on 13 Oct (docs/reference/houses/).'; changed.push('step'); }
const sec = codex.data.sections.find((s) => s.title === 'Houses: kit V2 (13 Oct)');
if (sec && sec.content.includes('in chat only')) {
  const before = sec.content;
  sec.content = sec.content.replace(/\| in chat only \|/g, '| saved, locked |');
  if (typeof codex.data.full === 'string' && codex.data.full.includes(before)) codex.data.full = codex.data.full.replace(before, () => sec.content);
  changed.push('codex');
}
plan.data.metadata.version = '2026-10-13i';
save(PLAN_FILE, plan); save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change.');
