#!/usr/bin/env node
// Sets the plan build number shown on the NUMEN dashboard, like Config.Build in the game.
// Bump it whenever data/plan-data.js changes.
// Usage (from the repo root): node tools/set-plan-build.js <build> <yyyy-mm-dd> "<what changed>"
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const FILE = path.resolve(__dirname, '..', 'data', 'plan-data.js');
const [build, date, note] = process.argv.slice(2);
if (!/^\d+$/.test(build || '') || !/^\d{4}-\d\d-\d\d$/.test(date || '') || !note) {
  console.error('Usage: node tools/set-plan-build.js <build> <yyyy-mm-dd> "<what changed>"');
  process.exit(1);
}
const text = fs.readFileSync(FILE, 'utf8');
const marker = 'window.SS_PLAN = ';
const at = text.indexOf(marker);
if (at < 0) { console.error('Could not find window.SS_PLAN in ' + FILE); process.exit(1); }
const sandbox = { window: {} };
vm.runInNewContext(text, sandbox);
const plan = sandbox.window.SS_PLAN;
const n = Number(build);
const builds = (plan.metadata.builds || []).filter(b => b.build !== n);
builds.push({ build: n, date, note, phases: plan.phases.length, tasks: plan.tasks.length });
builds.sort((a, b) => a.build - b.build);
plan.metadata = { ...plan.metadata, build: n, build_date: date, builds };
fs.writeFileSync(FILE, text.slice(0, at) + marker + JSON.stringify(plan) + ';\n');
console.log(`Plan build ${n} (${date}): ${plan.phases.length} phases, ${plan.tasks.length} tasks.`);
