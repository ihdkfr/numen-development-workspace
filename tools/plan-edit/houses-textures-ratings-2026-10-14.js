#!/usr/bin/env node
// Plan edit, 14 Oct 2026 (second): the house texture pass and the ratings against competitors.
// Owner: "then i need you to do the textures bit the textures should be amazing and then i want you to rate all the
// buildiongs at the end and compare them to conpetetors".
// Usage (from the repo root): node tools/plan-edit/houses-textures-ratings-2026-10-14.js
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
function addStep(t, text, done, state, src) { if (!t.steps.some((x) => x.text === text)) { t.steps.push({ text, note: '', done, state, src }); changed.push(`${t.id} new step`); } }
function prependDetails(t, marker, text) { if (!t.details.includes(marker)) { t.details = text + '\n\n' + t.details; changed.push(`${t.id} details`); } }

const TEX = [
  '**House texture pass (14 Oct 2026, plan build 14):** all seven V2 houses now share one material library (HV2S_*) made from CC0 scans (Poly Haven, ambientCG), graded to your pictures. Average material score against the pictures 5.2 to 6.8 out of 10:',
  'timber 4 to 7, boards 6 to 7, plaster 5 to 7, roof tiles 5 to 7, ridge 5 to 6, granite 4 to 7, shoji 6 to 7, noren 7 to 8, lanterns 7 to 7.5, bamboo 4 to 6.5, foliage 3 to 5.5, interiors 5 to 6, poor-house wear 6 to 7.5.',
  '- The look lives in the colour maps (works on low graphics); contact shadow comes from thin shadow cards (26 to 68 triangles per house).',
  '- No tint above 1.0 anywhere; the old stone scan with brick lines is used by nothing.',
  '- The townhouse lost its sculpted demon tiles for the plain plaque every other house uses.',
  '- Still weak: roofs a little darker than the pictures, granite dark in places, timber fine detail, shaggy pines.',
  'Report: SoulSurvival-project/docs/contracts/house_texture_pass_brief.md and docs/renders/house_v2/texture_pass/.',
].join('\n');

const RATE = [
  '**Ratings against competitors (14 Oct 2026):** rubric in SoulSurvival-project/docs/research/house_competitor_benchmark.md, scores in docs/research/house_ratings_2026-10-14.md.',
  '| House | Looks score /100 | Today |',
  '|---|---|---|',
  '| Inn | 72 | 60 (capped) |', '| Family home | 69 | 60 |', '| Courtyard residence | 69 | 60 |', '| Townhouse | 68 | 60 |',
  '| Poor house | 68 | 60 |', '| Merchant shop | 67 | 60 |', '| Terrace row | 67 | 60 |',
  'Competitors: Slayers 2 51, VV: Ultimatum 49, Peroxide 45, Type Soul 39; The Inn (Roblox horror) 71; AAA 68 to 94. Every house beats every Roblox open world on looks; the cap (60) applies until the houses are in the game and pass the iPhone 13 test. Export with mesh splits, LOD and streamed interiors lifts them to about 72 to 77.',
].join('\n');

const t26 = task('T03.26');
prependDetails(t26, '**House texture pass (14 Oct 2026', TEX + '\n\n' + RATE);
addStep(t26, 'Texture pass over all seven houses: one shared scanned-material library graded to the pictures, contact shadows, no brick lines on stone (14 Oct)', true, 'built, needs the owner\'s verdict', 'owner + Claude 14 Oct');
addStep(t26, 'Rate every house against competitors (14 Oct): looks 67 to 72, capped at 60 until the phone test', true, 'done', 'owner + Claude 14 Oct');
addImages(t26, [
  { src: 'plan-assets/117fc5049a6b47657e1b98670f3581eb.jpg', cap: 'Texture pass (14 Oct): each material in your picture (gold label) beside the model after the pass (blue label), same framing. Average 5.2 to 6.8 out of 10.' },
  { src: 'plan-assets/f56ecd390a5caab07a9428b6eb06fbdd.jpg', cap: 'Family home after the texture pass (14 Oct): your picture, before and after, close-ups and an interior view. Needle-tuft pines, rope ties, own shoji paper.' },
  { src: 'plan-assets/4b06f2fba3cf265039edf7357bbe2b79.jpg', cap: 'Inn after the texture pass (14 Oct): glowing panes with hot spots, needle-card pines and bonsai, stronger lantern ribs.' },
  { src: 'plan-assets/ecdfcaca28b5df7af893923744273282.jpg', cap: 'Poor house after the texture pass (14 Oct): the "cartoon spot" plaster replaced by larger irregular losses showing straw clay outside and woven lath inside, deeper board gaps, a sun-faded noren.' },
]);

const t20 = task('T03.20');
prependDetails(t20, '**House texture pass (14 Oct 2026', TEX);

const t27 = task('T03.27');
prependDetails(t27, '**Ratings against competitors (14 Oct 2026)', RATE);

P.metadata.version = '2026-10-14b';

const sec = codex.data.sections.find((s) => s.title.startsWith('Houses: kit V2'));
const MARK = '## Textures and ratings (14 Oct)';
if (sec && !sec.content.includes(MARK)) {
  const before = sec.content;
  sec.content += '\n\n' + [MARK, 'Texture pass: one shared scanned-material library for all seven houses; materials 5.2 to 6.8 out of 10 against the pictures.', '', 'Ratings (looks, out of 100): inn 72, family home 69, courtyard 69, townhouse 68, poor house 68, merchant 67, terrace 67. Best Roblox open-world competitor 51 (Slayers 2), The Inn 71, AAA 68 to 94. Capped at 60 until the houses pass the phone test in game.'].join('\n');
  if (typeof codex.data.full === 'string' && codex.data.full.includes(before)) codex.data.full = codex.data.full.replace(before, () => sec.content);
  changed.push('codex');
}
save(PLAN_FILE, plan); save(CODEX_FILE, codex);
console.log(changed.length ? 'Changed: ' + changed.join(', ') : 'Nothing to change.');
