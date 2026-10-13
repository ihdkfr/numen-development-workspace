#!/usr/bin/env node
// Reorders the Soul Survival plan (13 Oct 2026): 14 phases in strict order, 29 new tasks,
// plain-English wording, time estimates and new T ids with the old S ids kept as aliases.
//
// Run once from the repo root:  node tools/plan-reorder/reorder.js
// It reads data/plan-data.js and data/codex-data.js, changes them and writes them back,
// and writes docs/PLAN_REORDER.md. It refuses to run on a plan that already has T ids.
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const ROOT = path.resolve(__dirname, '..', '..');
const HERE = __dirname;
const PLAN_FILE = path.join(ROOT, 'data', 'plan-data.js');
const CODEX_FILE = path.join(ROOT, 'data', 'codex-data.js');
const DOC_FILE = path.join(ROOT, 'docs', 'PLAN_REORDER.md');
const read = f => fs.readFileSync(path.join(HERE, f), 'utf8').replace(/\r/g, '');
const fail = msg => { console.error('STOP: ' + msg); process.exit(1); };

function loadWindowFile(file, key) {
  const sandbox = { window: {} };
  vm.runInNewContext(fs.readFileSync(file, 'utf8'), sandbox, { filename: file });
  return sandbox.window[key];
}

const PLAN = loadWindowFile(PLAN_FILE, 'SS_PLAN');
const CODEX = loadWindowFile(CODEX_FILE, 'SS_CODEX');
if (PLAN.tasks.some(t => /^T\d\d\.\d\d$/.test(t.id))) fail('the plan already has T ids; this script has run before.');
const OLD = Object.fromEntries(PLAN.tasks.map(t => [t.id, t]));
const OLD_PHASE = Object.fromEntries(PLAN.phases.map(p => [p.idx, p]));

// ---- Parse the rewrite files: "ID | Title", "W: what it is", "1. step", "D: done when" ----
function parseBlocks(text) {
  const out = {};
  for (const block of text.split(/\n\s*\n/)) {
    const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
    if (!lines.length) continue;
    const m = lines[0].match(/^(\S+) \| (.+)$/);
    if (!m) fail('bad block header: ' + lines[0]);
    const item = { title: m[2].trim(), why: '', steps: [], how: [], done: '' };
    for (const l of lines.slice(1)) {
      if (l.startsWith('W: ')) item.why = l.slice(3).trim();
      else if (l.startsWith('D: ')) item.done = l.slice(3).trim();
      else if (/^\d+\. /.test(l)) { item.steps.push(l.replace(/^\d+\. /, '').trim()); item.how.push([]); }
      else if (l.startsWith('- ') && item.steps.length) item.how[item.how.length - 1].push(l.slice(2).trim());
      else fail('bad line in ' + m[1] + ': ' + l);
    }
    if (!item.why || !item.done || !item.steps.length) fail('incomplete block ' + m[1]);
    if (item.steps.length > 6) fail(m[1] + ' has more than 6 steps');
    if (out[m[1]]) fail('duplicate block ' + m[1]);
    out[m[1]] = item;
  }
  return out;
}
const REWRITE = {};
for (const f of fs.readdirSync(HERE).filter(f => /^rewrites-old-phase-\d\d\.txt$/.test(f)).sort()) Object.assign(REWRITE, parseBlocks(read(f)));
const NEWTASK = parseBlocks(read('new-tasks.txt'));

// ---- Parse the order and phases ----
const ORDER = [];
for (const line of read('order.txt').split('\n')) {
  if (!line.trim() || line.startsWith('#')) continue;
  const m = line.match(/^(\d\d): (.+)$/);
  if (!m) fail('bad order line: ' + line);
  for (const part of m[2].split(',').map(s => s.trim())) {
    const e = part.match(/^((?:S\d\d\.\d\d)|(?:NEW:[a-z0-9-]+))(?:\(([\d.]+)\/([\d.]+)\))?$/);
    if (!e) fail('bad order entry: ' + part);
    ORDER.push({ phase: m[1], ref: e[1], best: e[2] === undefined ? null : Number(e[2]), tricky: e[3] === undefined ? null : Number(e[3]) });
  }
}
const PHASES = [];
for (const block of read('phases.txt').split(/\n\s*\n/)) {
  const lines = block.split('\n').map(l => l.trim()).filter(Boolean);
  if (!lines.length) continue;
  const h = lines[0].match(/^(\d\d) \| (.+) \| (\w+)$/);
  if (!h) fail('bad phase header: ' + lines[0]);
  const goal = (lines.find(l => l.startsWith('G: ')) || '').slice(3);
  const gate = (lines.find(l => l.startsWith('X: ')) || '').slice(3);
  PHASES.push({ idx: h[1], title: h[2], kind: h[3], goal, gate });
}

// ---- Checks: every old id once, every new task once, 211 in all ----
const seen = new Map();
for (const o of ORDER) seen.set(o.ref, (seen.get(o.ref) || 0) + 1);
const oldIds = Object.keys(OLD);
const missing = oldIds.filter(id => !seen.has(id));
const dupes = [...seen].filter(([, n]) => n > 1).map(([r]) => r);
const unknown = ORDER.filter(o => o.ref.startsWith('S') ? !OLD[o.ref] : !NEWTASK[o.ref]).map(o => o.ref);
const unusedNew = Object.keys(NEWTASK).filter(k => !seen.has(k));
const noRewrite = oldIds.filter(id => !REWRITE[id]);
if (missing.length || dupes.length || unknown.length || unusedNew.length || noRewrite.length)
  fail(JSON.stringify({ missing, dupes, unknown, unusedNew, noRewrite }));
if (ORDER.length !== 211) fail('expected 211 tasks, got ' + ORDER.length);

// ---- Give every task its T id in the new order ----
const counter = {};
for (const o of ORDER) { counter[o.phase] = (counter[o.phase] || 0) + 1; o.id = 'T' + o.phase + '.' + String(counter[o.phase]).padStart(2, '0'); }
const S_TO_T = Object.fromEntries(ORDER.filter(o => o.ref.startsWith('S')).map(o => [o.ref, o.id]));
const unmapped = new Set();
const remap = s => typeof s === 'string' ? s.replace(/\bS(\d\d)\.(\d\d)\b/g, m => { if (S_TO_T[m]) return S_TO_T[m]; unmapped.add(m); return m; }) : s;
const remapDeep = v => Array.isArray(v) ? v.map(remapDeep) : v && typeof v === 'object' ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, remapDeep(x)])) : remap(v);

const num = n => String(n);
function estimateText(best, tricky) {
  if (best === null) return 'Not estimated';
  if (best === 0 && tricky === 0) return 'No new work: already done or on hold';
  return `About ${num(best)} session${best === 1 ? '' : 's'} (${num(tricky)} if it gets tricky)`;
}
const effortFor = best => best === null ? 'L' : best <= 1 ? 'S' : best <= 3 ? 'M' : 'L';
const numbered = steps => steps.map((s, i) => `${i + 1}. ${s}`).join('\n');
// The owner is "you" in the plan (13 Oct: "Usman is my second name").
const WHO_FIX = {
  'Claude Code, then Usman pushes': 'Claude Code, then you push', 'Usman plays': 'You play', 'Usman imports and uploads': 'You import and upload',
  'Usman': 'You', 'Usman decides, Claude Code edits the docs': 'You decide, Claude Code edits the docs', 'Usman judges the renders': 'You judge the renders',
  'Usman tests and saves': 'You test and save', 'Usman runs the round trip': 'You run the round trip', 'Claude Code bakes, Usman saves': 'Claude Code bakes, you save',
  'Usman judges in game': 'You judge in game', 'Claude Code; Usman judges': 'Claude Code; you judge', 'Claude Code + Usman (phone and party tests)': 'Claude Code + you (phone and party tests)',
  'Claude Code; Usman picks': 'Claude Code; you pick', 'Claude Code builds; Usman answers Q1 to Q7, picks variants, re-bakes': 'Claude Code builds; you answer Q1 to Q7, pick variants and re-bake',
  'Claude Code; Usman answers the owner questions, picks variants and re-bakes': 'Claude Code; you answer the owner questions, pick variants and re-bake',
  'Claude Code + Usman': 'Claude Code + you', 'Usman + Claude': 'You + Claude', 'Claude designed; Usman reviews each line': 'Claude designed; you review each line',
  'Usman (sheets in ChatGPT) + Claude': 'You (sheets in ChatGPT) + Claude', 'Claude Code, Usman signs off by ear': 'Claude Code; you sign off by ear',
  'ChatGPT images, uploaded by Usman': 'ChatGPT images, uploaded by you', 'Usman decides (C06)': 'You decide (C06)', 'Usman approves the flow, then Claude Code': 'You approve the flow, then Claude Code' };
const fixWho = w => { if (WHO_FIX[w] !== undefined) return WHO_FIX[w]; if (/Usman/.test(w || '')) fail('no "who" wording for: ' + w); return w; };
const DECISION_KEYS = new Set(['core-loop', 'version-1', 'death-rules', 'races-clans-vizard', 'money-plan', 'server-size', 'ip-names', 'maturity-draft']);

function originalDetail(t) {
  const op = OLD_PHASE[t.phase_id] || {};
  const parts = ['## Original detail', '',
    `**Original title:** ${t.title}`, '',
    `**Original phase:** ${t.phase_id} ${t.phase_title}`, '',
    `**Why (original):** ${t.why || ''}`, '',
    '**Instructions (original):**', '', t.implementation_instructions || '', '',
    `**Acceptance (original):** ${t.acceptance_test || 'None written.'}`];
  if (t.estimate) parts.push('', `**Original estimate:** ${t.estimate}`);
  if (t.phase_dependencies || op.depends) parts.push('', `**Original phase dependencies:** ${t.phase_dependencies || op.depends}`);
  if (t.phase_exit_gate || op.gate) parts.push('', `**Original phase gate:** ${t.phase_exit_gate || op.gate}`);
  if (t.details) parts.push('', '### Plan notes', '', t.details);
  return parts.join('\n');
}

const phaseById = Object.fromEntries(PHASES.map(p => [p.idx, p]));
const tasks = ORDER.map(o => {
  const ph = phaseById[o.phase];
  const depends = o.phase === '01' ? 'Nothing. Start here.' : `Phase ${PHASES[PHASES.indexOf(ph) - 1].idx} (${PHASES[PHASES.indexOf(ph) - 1].title}) is finished.`;
  const common = { id: o.id, phase_id: o.phase, phase_title: ph.title, estimate_sessions: o.best, estimate_tricky: o.tricky, estimate: estimateText(o.best, o.tricky), phase_dependencies: depends, phase_exit_gate: ph.gate };
  if (o.ref.startsWith('S')) {
    const t = OLD[o.ref], r = REWRITE[o.ref];
    return { ...t, ...common, aliases: [o.ref], title: r.title, why: r.why, implementation_instructions: numbered(r.steps), step_help: r.how, acceptance_test: r.done, details: originalDetail(t), who: fixWho(t.who) };
  }
  const key = o.ref.slice(4), r = NEWTASK[o.ref];
  return { ...common, aliases: [], key, title: r.title, priority: 'CORE', effort: effortFor(o.best), seed_status: 'todo', locked: false, why: r.why, implementation_instructions: numbered(r.steps), step_help: r.how, acceptance_test: r.done, suggested_tools: '', details: '', steps: r.steps.map((s, i) => ({ text: s, note: '', done: false, state: '', src: `new-${key}-${i + 1}` })), sources: ['Owner brief, 13 Oct 2026 plan reorder'], decisions: [], images: [], who: DECISION_KEYS.has(key) ? 'You' : 'Claude Code', roadmap: '' };
});
// Keep the field order of the old tasks, with the new fields after "estimate".
const FIELD_ORDER = ['id', 'aliases', 'key', 'phase_id', 'phase_title', 'title', 'priority', 'effort', 'seed_status', 'locked', 'why', 'implementation_instructions', 'step_help', 'acceptance_test', 'suggested_tools', 'phase_dependencies', 'phase_exit_gate', 'details', 'steps', 'sources', 'decisions', 'images', 'who', 'estimate', 'estimate_sessions', 'estimate_tricky', 'roadmap'];
const ordered = tasks.map(t => { const o = {}; for (const k of FIELD_ORDER) if (k in t) o[k] = t[k]; for (const k of Object.keys(t)) if (!(k in o)) o[k] = t[k]; return o; });
// Swap S ids for T ids in every text field (aliases keep the S id on purpose).
const finalTasks = ordered.map(t => { const aliases = t.aliases; const x = remapDeep(t); x.aliases = aliases; return x; });

const sum = (arr, k) => Math.round(arr.reduce((a, t) => a + (t[k] || 0), 0) * 10) / 10;
const phases = PHASES.map(p => {
  const ts = finalTasks.filter(t => t.phase_id === p.idx);
  const prev = PHASES[PHASES.indexOf(p) - 1];
  return { idx: p.idx, title: p.title, goal: p.goal, depends: prev ? `Phase ${prev.idx} (${prev.title}) is finished.` : 'Nothing. Start here.', gate: p.gate, kind: p.kind, next_up: `${ts[0].id}: ${ts[0].title}.`, estimate_sessions: p.idx === '14' ? null : sum(ts, 'estimate_sessions'), estimate_tricky: p.idx === '14' ? null : sum(ts, 'estimate_tricky') };
});

const statusCounts = {};
for (const t of finalTasks) statusCounts[t.seed_status] = (statusCounts[t.seed_status] || 0) + 1;
const best = sum(finalTasks, 'estimate_sessions'), tricky = sum(finalTasks, 'estimate_tricky');
const metadata = { ...PLAN.metadata, version: '2026-10-13b', phase_count: phases.length, task_count: finalTasks.length, status_counts: statusCounts,
  order_note: 'Reordered on 13 Oct into 14 phases done one after another. Old S ids are kept as aliases; see docs/PLAN_REORDER.md.',
  reordered: '2026-10-13', sessions_per_week: 7, estimate_sessions_total: best, estimate_tricky_total: tricky };
const newPlan = { metadata, phases, tasks: finalTasks, decisions: PLAN.decisions, combat: remapDeep(PLAN.combat) };

// ---- Codex ----
const sections = CODEX.sections.map(s => ({ ...s }));
const idx = title => { const i = sections.findIndex(s => s.title === title); if (i < 0) fail('codex section missing: ' + title); return i; };
sections[idx('Read first: how this plan works')].content = read('codex-read-first.md').trim();
const oq = idx('Open questions for the owner');
sections[oq].content = sections[oq].content.trimEnd() + '\n' + read('codex-open-questions-add.md').trimEnd();
const mv = sections.findIndex(s => s.title === 'About the move (13 Oct)');
if (mv >= 0) sections[mv].content = sections[mv].content.trimEnd() + '\n\n## Reorder (13 Oct, later the same day)\n\nThe plan was put into 14 phases done one after another, 29 tasks were added, every task was rewritten in plain English with a time estimate, and task ids changed from S01.01 style to T01.01 style. Each moved task keeps its old S id as an alias, so notes, files, checklists and history saved under the old id show on the new task. The full old-to-new table is in docs/PLAN_REORDER.md.';
sections.splice(1, 0, { title: 'How to: the basics', content: read('codex-basics.md').trim() }, { title: 'Words explained', content: read('codex-words.md').trim() });
const finalSections = sections.map(s => ({ title: s.title, content: remap(s.content).replace(/Built so far: /g, "Check what's built: ") }));

function fullExport() {
  const out = [`# Soul Survival plan (${metadata.version})`, '', metadata.source, '',
    `14 phases, ${finalTasks.length} tasks. Time: about ${best} sessions (${tricky} if things get tricky), ${Math.round(best / 7)} to ${Math.round(tricky / 7)} weeks at 7 sessions a week.`, ''];
  for (const p of phases) {
    out.push(`## ${p.idx} ${p.title}`, '', p.goal, '', `**Depends on:** ${p.depends}`, '', `**Phase gate:** ${p.gate}`, '');
    if (p.estimate_sessions !== null) out.push(`**Time:** about ${p.estimate_sessions} sessions (${p.estimate_tricky} if it gets tricky).`, '');
    for (const t of finalTasks.filter(t => t.phase_id === p.idx)) {
      out.push(`- **${t.id} ${t.title}** [${t.seed_status}, ${t.priority}${t.aliases.length ? ', was ' + t.aliases.join(', ') : ''}] ${t.why} *Done when:* ${t.acceptance_test} *Time:* ${t.estimate}.`);
      t.implementation_instructions.split('\n').forEach((st, i) => { out.push(`  ${st}`); for (const h of (t.step_help || [])[i] || []) out.push(`     - ${h}`); });
      for (const s of t.steps || []) out.push(`  - [${s.done ? 'x' : ' '}] ${s.text}`);
    }
    out.push('', '');
  }
  return out.join('\n') + finalSections.map(s => s.content).join('\n\n');
}
const newCodex = { sections: finalSections, full: fullExport() };

for (const t of finalTasks) for (const k of ['title', 'why', 'implementation_instructions', 'acceptance_test', 'who']) if (/Usman/.test(t[k] || '')) fail(t.id + ' still says Usman in ' + k);
for (const t of finalTasks) if (/Usman/.test(JSON.stringify(t.step_help || []))) fail(t.id + ' still says Usman in its how lines');
if (unmapped.size) fail('S ids with no new id: ' + [...unmapped].join(', '));

// ---- Write ----
fs.writeFileSync(PLAN_FILE, '/* Soul Survival plan for NUMEN. Generated 2026-10-13 from the sources named in metadata, then reordered on 13 Oct by tools/plan-reorder/reorder.js. Edit tasks in the website; change this file only with a script. */\nwindow.SS_PLAN = ' + JSON.stringify(newPlan) + ';\n');
fs.writeFileSync(CODEX_FILE, '/* Soul Survival codex for NUMEN. Generated 2026-10-13, reordered 13 Oct by tools/plan-reorder/reorder.js. */\nwindow.SS_CODEX = ' + JSON.stringify(newCodex) + ';\n');

const doc = ['# Plan reorder, 13 October 2026', '',
  'The owner asked for the plan to be put into 14 phases done one after another, with 29 missing tasks added, a time estimate on every task and every task rewritten in plain English. This file records what changed and the old-to-new id table.', '',
  '## What changed', '',
  '- **Phases.** 14 new phases (01 Set up and check what you have, to 14 After launch), each with a goal and a gate.',
  '- **Tasks.** 182 tasks moved into the new order and 29 new tasks added: 211 in all. Every old task is used exactly once.',
  '- **Ids.** Every task has a new id, T01.01 and up, in its new order. No S id or old 01.01-style id is reused. Each moved task keeps its old S id in `aliases`.',
  '- **Saved team work.** NUMEN reads a task\'s team record from `task:<T id>`. If there is none, it reads the first alias that has one, so notes, files, checklists and history saved under the S id show on the new task. The first save then writes the record under the T id. The old S record is never changed or deleted. Records whose id is an alias no longer show on the Archive page.',
  '- **Wording.** Every task has a short title, a plain "What it is", up to six numbered steps and a one-line "Done when". The old title, why, instructions, acceptance, estimate and notes are kept word for word in the task\'s details under "Original detail", shown on the task page as "Extra detail (for Claude Code)" and included in the Claude build brief.',
  '- **Status.** Each moved task keeps its starting status and locked flag. New tasks start as To do. Tasks named "Built so far" are now "Check what\'s built".',
  '- **Time.** Each task has `estimate_sessions` (best case) and `estimate_tricky`, exactly as the owner gave them. A session is one sitting with Claude Code, about 1 to 3 hours, at 7 sessions a week.',
  '- **Owner decisions.** Unchanged, with the same ids.',
  '- **Codex.** "Read first" rewritten, "Words explained" added, the new Phase 02 decisions added to "Open questions for the owner", and every S id in the codex and Combat & VFX records changed to its T id.', '',
  '## Totals', '',
  '| Phase | Tasks | Best case (sessions) | If tricky (sessions) |', '|---|---|---|---|',
  ...phases.map(p => `| ${p.idx} ${p.title} | ${finalTasks.filter(t => t.phase_id === p.idx).length} | ${p.estimate_sessions ?? 'not estimated'} | ${p.estimate_tricky ?? 'not estimated'} |`),
  `| **All** | **${finalTasks.length}** | **${best}** | **${tricky}** |`, '',
  `About ${Math.round(best / 7)} to ${Math.round(tricky / 7)} weeks at 7 sessions a week.`, '',
  '## Old id to new id', '', '| Old id | New id | New title |', '|---|---|---|',
  ...oldIds.map(id => `| ${id} | ${S_TO_T[id]} | ${finalTasks.find(t => t.id === S_TO_T[id]).title} |`), '',
  '## New tasks', '', '| New id | Title | Who |', '|---|---|---|',
  ...finalTasks.filter(t => t.key).map(t => `| ${t.id} | ${t.title} | ${t.who} |`), '',
  '## How it was made', '',
  '`tools/plan-reorder/reorder.js` reads the plan, the order (`order.txt`), the phases (`phases.txt`), the rewrites (`rewrites-old-phase-*.txt`), the new tasks (`new-tasks.txt`) and the codex text, then writes `data/plan-data.js`, `data/codex-data.js` and this file. It refuses to run twice.', ''];
fs.writeFileSync(DOC_FILE, doc.join('\n'));

console.log(`phases ${phases.length}, tasks ${finalTasks.length} (${oldIds.length} moved, ${Object.keys(NEWTASK).length} new)`);
console.log(`estimate: ${best} best, ${tricky} tricky (${Math.round(best / 7)} to ${Math.round(tricky / 7)} weeks)`);
for (const p of phases) console.log(`  ${p.idx} ${p.title}: ${finalTasks.filter(t => t.phase_id === p.idx).length} tasks, ${p.estimate_sessions}/${p.estimate_tricky}`);
console.log('status counts', JSON.stringify(statusCounts));
