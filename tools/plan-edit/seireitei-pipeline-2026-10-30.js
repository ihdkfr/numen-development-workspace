#!/usr/bin/env node
// Adds the owner's Seireitei pipeline (30 Oct) to phase 03 as six tasks, T03.34 to T03.39,
// placed before T03.16 and marked to start in the Workshop (seed_workshop).
// Safe to run twice: tasks that already exist are left alone.
// Usage (from the repo root): node tools/plan-edit/seireitei-pipeline-2026-10-30.js
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const FILE = path.resolve(__dirname, '..', '..', 'data', 'plan-data.js');
const text = fs.readFileSync(FILE, 'utf8');
const marker = 'window.SS_PLAN = ';
const at = text.indexOf(marker);
const sandbox = { window: {} };
vm.runInNewContext(text, sandbox);
const plan = sandbox.window.SS_PLAN;
const phase = plan.phases.find(p => p.idx === '03');
const SRC = 'owner 30 Oct';

function task(id, title, status, effort, est, tricky, why, steps, acceptance, tools, details) {
  return {
    id, aliases: [], phase_id: '03', phase_title: phase.title, title, priority: 'CORE', effort,
    seed_status: status, seed_workshop: true, locked: false, why,
    implementation_instructions: steps.map((s, i) => `${i + 1}. ${s.text}`).join('\n'),
    step_help: steps.map(s => s.help),
    acceptance_test: acceptance, suggested_tools: tools,
    phase_dependencies: phase.depends, phase_exit_gate: phase.gate,
    details: `**Owner's order of work (30 Oct):** finish the pictures, build everything in Blender, check every build, map the whole Seireitei with terrain, put the Seireitei in the game, then the Rukongai.\n\n${details}`,
    steps: steps.map(s => ({ text: s.text, note: '', done: false, state: '', src: SRC })),
    sources: [SRC], decisions: [], images: [], who: 'Owner and Claude',
    estimate: `About ${est} sessions (${tricky} if it gets tricky)`, estimate_sessions: est, estimate_tricky: tricky,
    roadmap: 'Stage 1.5',
  };
}

const NEW = [
  task('T03.34', 'Seireitei pictures: remake, check and finish the rest', 'doing', 'M', 3, 4,
    'Every building is built from its approved pictures, so the picture set has to be complete and right before Blender starts on the rest.',
    [
      { text: 'Remake the 20 pictures that have a correction in fixes.txt (23 minus the three the filter blocks): interiors for Divisions 8, 9, 12 and 13, the Central 46 hall and towers, Senzaikyū, Sōkyoku Hill and its ritual frame.',
        help: ['Double-click "2 Make pictures.bat" in Recipes/Seireitei picture prompts/Picture runner.', '13.20, 15.19 and 15.20 have been blocked by the safety filter every time, even after rewording, because the finished picture is judged as violent. Leave them out of this run: build the ritual frame from its approved hero picture, and the vault from its section.', 'Tell Claude "check the remakes" when it finishes.'] },
      { text: 'Claude checks the 51 Book 7 pictures waiting in "to check": the noble manors, the Academy and the shops.',
        help: ['Tell Claude "check Book 7".', 'Approved pictures move into Images/Seireitei; anything wrong gets a line in fixes.txt and goes back to step 1.'] },
      { text: 'Claude writes Book 8: city landmarks and street kit (gatekeeper posts, Kasumiōji manor, the shops from the show, bell tower, bathhouse, training cave, waterway tunnels, lantern kit, market stall, square kit and bridge).',
        help: ['The list is in Recipes/Seireitei picture prompts/Books 8 and 9 plan.md.', 'No shrines.'] },
      { text: 'Run Book 8 and Claude checks it.', help: ['Run "3 Make pictures overnight.bat".', 'Tell Claude "check Book 8" in the morning.'] },
      { text: 'Claude writes Book 9: 18 variations of the buildings that repeat, in 5 wealth levels.', help: ['Every variation must fit the same plot as its base building.'] },
      { text: 'Run Book 9 and Claude checks it.', help: ['Run "3 Make pictures overnight.bat".', 'Tell Claude "check Book 9".'] },
    ],
    'Every Seireitei building in the master plan has an approved set of pictures, and nothing is left in "to check" or fixes.txt.',
    'Picture runner (OpenAI images), Claude for checks',
    'Status on 30 Oct: 256 pictures approved, 23 to remake, 51 waiting to be checked, Books 8 and 9 not written yet.'),
  task('T03.35', 'Build every Seireitei building in Blender', 'todo', 'L', 8, 12,
    'The Roblox build copies the Blender kit, so every building needs a finished Blender model first.',
    [
      { text: 'Compare the Blender models page (116 models) with the approved pictures and list what is missing.', help: ['Open "Images/Blender models/Blender models.md" in the vault.'] },
      { text: 'Build what is missing: the rest of Division 9, Divisions 10 to 13, the centre (Central 46, Senzaikyū, Sōkyoku Hill), then the Book 7, 8 and 9 buildings.', help: ['Ask Claude Code to build one building at a time from its approved pictures, then stop and report.'] },
      { text: 'Finish the empty interiors: the 8th Division headquarters and office pavilion.', help: ['Use their approved room and cutaway pictures.'] },
      { text: 'Check each building as soon as it is built (task T03.36), not all at the end.', help: ['Faults found early stop them being copied into the next building.'] },
      { text: 'Re-render the Blender models page after each batch.', help: ['Double-click run_gallery.bat in Recipes/Blender gallery.'] },
    ],
    'Every approved picture set has a matching Blender model, shown on the Blender models page.',
    'Blender, Claude Code',
    'Built on 27 Oct: the city kit, Divisions 1 to 8 with their compounds, and the Division 9 gate.'),
  task('T03.36', 'Check every Seireitei build', 'todo', 'M', 3, 5,
    'The 22 Oct audit found flickering faces, floating and sunk props, decorations through walls and door gaps. Every building has to pass before it goes on the map.',
    [
      { text: 'Run the automatic build audit on a copy of the kit: flicker, sunk and floating props, pieces through walls, door gaps, buildings not on the ground.', help: ['Ask Claude to "run the build audit". It works on a copy and never saves the real file.'] },
      { text: 'Compare each model with its approved pictures: shape, size, colours and details.', help: ['Claude puts the render and the picture side by side.'] },
      { text: 'Fix every red fault, then run the audit again until it is clean.', help: ['Ask Claude Code to fix one building at a time.'] },
      { text: 'Owner approves each building.', help: ['Write "approved" in this task\'s Notes with the building names.'] },
    ],
    'No red faults in the audit, and the owner has approved every building against its pictures.',
    'Blender, Claude (audit), Claude Code (fixes)',
    'The audit scripts are in Recipes/Seireitei build audit in the vault.'),
  task('T03.37', 'Map out the whole Seireitei, with terrain', 'todo', 'L', 5, 8,
    'Decide exactly where every building, path, tree and nature piece goes, and the shape of the ground, before anything goes into Roblox.',
    [
      { text: 'Put every built compound on master plan v2 in its real Blender shape.', help: ['Claude runs blender_topdown.py on a copy and redraws the plan.'] },
      { text: 'Lay out the wards, streets, lanes and alleys from the layout standard and the city budget.', help: ['The rules are in Recipes/Seireitei layout.'] },
      { text: 'Place trees and other nature kit pieces: on the real surface, spaced out, never on paths or in doorways.', help: ['Rules T1 to T6 and G6 in the layout standard.'] },
      { text: 'Add the terrain: ground levels, stairs, terraces, Sōkyoku Hill, ponds and the edge where the Rukongai starts.', help: ['Ground levels.md lists every raised and sunken spot.'] },
      { text: 'Run the layout checks (World audit, Tour and walk) and fix the faults.', help: ['Ask Claude to "run the layout checks".'] },
      { text: 'Owner approves the final map.', help: ['Check the top-down map and the walk-through pictures.'] },
    ],
    'One approved map with every building, path, tree, nature piece and ground level placed, passing the layout standard\'s checks.',
    'Claude (plan scripts), Blender, Claude Code',
    'Master plan v2: wall at radius 4,520, Divisions spread out at their Blender sizes, 1st Division at the head of the North avenue.'),
  task('T03.38', 'Put the Seireitei into the game', 'todo', 'L', 5, 8,
    'Move the checked kit and the approved map into Roblox exactly as planned.',
    [
      { text: 'Export the kit from Blender and import it into Roblox Studio.', help: ['Ask Claude Code to import one building first and check its size and materials.'] },
      { text: 'Place everything from the approved map, with the terrain.', help: ['Ask Claude Code to place one ward at a time, then stop and report.'] },
      { text: 'Check it runs smoothly on an iPhone 13: part budget, far roofs, and real lights only near players.', help: ['Use the /perf route for the Seireitei.'] },
      { text: 'Play-test: walk the gates, avenues, compounds and rooftops, using Shunpo.', help: ['Write anything wrong in Notes.'] },
      { text: 'Owner approves it in play.', help: ['Write "approved" in Notes.'] },
    ],
    'The Seireitei in the game matches the approved map and runs smoothly on an iPhone 13.',
    'Claude Code, Roblox Studio (MCP), Rojo',
    'Never save the place file from a script; the owner saves it.'),
  task('T03.39', 'Then the Rukongai: map it and put it in the game', 'todo', 'L', 6, 9,
    'Once the Seireitei is in, do the same for the Rukongai, with the house kit, the wealth tiers and the nature kit.',
    [
      { text: 'Check the Rukongai houses and their worn versions against the wealth tiers (T03.28).', help: ['The houses are on the Blender models page.'] },
      { text: 'Map the districts, roads, rivers, forests and terrain around the pushed-out Seireitei wall.', help: ['The Rukongai rings now start 1,120 studs further out.'] },
      { text: 'Run the same build and layout checks.', help: ['As in T03.36 and T03.37.'] },
      { text: 'Put it in the game and play-test it.', help: ['One district at a time.'] },
      { text: 'Owner approves it in play.', help: ['Write "approved" in Notes.'] },
    ],
    'The Rukongai matches its approved map in the game, runs smoothly on an iPhone 13, and its districts get poorer further from the wall.',
    'Claude, Blender, Claude Code, Roblox Studio (MCP)',
    'Starts after T03.38 is approved.'),
];

const have = new Set(plan.tasks.map(t => t.id));
const add = NEW.filter(t => !have.has(t.id));
const before = plan.tasks.findIndex(t => t.id === 'T03.16');
plan.tasks.splice(before < 0 ? plan.tasks.length : before, 0, ...add);

const counts = {};
for (const t of plan.tasks) counts[t.seed_status] = (counts[t.seed_status] || 0) + 1;
const p3 = plan.tasks.filter(t => t.phase_id === '03');
phase.estimate_sessions = p3.reduce((a, t) => a + (t.estimate_sessions || 0), 0);
phase.estimate_tricky = p3.reduce((a, t) => a + (t.estimate_tricky || 0), 0);
plan.metadata.task_count = plan.tasks.length;
plan.metadata.status_counts = counts;
plan.metadata.estimate_sessions_total = plan.tasks.reduce((a, t) => a + (t.estimate_sessions || 0), 0);
plan.metadata.estimate_tricky_total = plan.tasks.reduce((a, t) => a + (t.estimate_tricky || 0), 0);
plan.metadata.version = '2026-10-30a';

const out = JSON.stringify(plan);
for (const bad of ['—', '–']) if (NEW.some(t => JSON.stringify(t).includes(bad))) throw new Error('dash in new tasks');
fs.writeFileSync(FILE, text.slice(0, at) + marker + out + ';\n');
console.log(`Added ${add.length} tasks (${add.map(t => t.id).join(', ') || 'none'}); ${plan.tasks.length} tasks in all.`);
