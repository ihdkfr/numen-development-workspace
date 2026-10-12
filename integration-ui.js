/* Owner-approved C16-C40 planning supplement. Additive to legacy mapping and task data. */
(function(){
'use strict';
var L=window.NUMEN_LEGACY;if(!L)return;
var additions=[{"id":"C16","choice":"A","title":"StreamingEnabled initially disabled","decision":"Keep StreamingEnabled OFF in the future separate Hueco Mundo Place until new benchmarking and approval.","tasks":["13.11","13.06","17.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C17","choice":"A","title":"Full Hueco Mundo world loading","decision":"No custom region unloading or additional regional Places; benchmark whole-world loading.","tasks":["13.11","13.06","17.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C18","choice":"B","title":"Cinematic Garganta transfer","decision":"Short dimensional-passage cinematic and custom loading during cross-Place teleportation.","tasks":["13.13","13.10","09.20"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C19","choice":"B","title":"Protected Garganta arrival","decision":"Server-controlled temporary protection and no attacks until arrival readiness; safe failure recovery.","tasks":["13.13","13.10","09.20"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C20","choice":"B","title":"Progress-based respawn checkpoints","decision":"Use progression-valid checkpoints. Active spawn selection follows C23, not last-activated automatically.","tasks":["13.10","09.20","02.04"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C21","choice":"C","title":"Hybrid checkpoint unlocking","decision":"Story checkpoints auto-unlock; optional ones require interaction. C23 governs active spawn selection.","tasks":["13.10","09.20","02.04"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C22","choice":"C","title":"Hybrid checkpoint visuals","decision":"Visible story Reiatsu markers and subtle environment-integrated optional markers.","tasks":["13.01","13.10","16.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C23","choice":"A","title":"Character-persistent selected spawn","decision":"Players choose eligible active spawn NPC/marker; saved per character and validated on server, safe fallback.","tasks":["13.10","09.20","02.04"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C24","choice":"A","title":"No Hueco Mundo fast travel","decision":"Players physically traverse Hueco Mundo. Cross-Place Garganta remains a separate travel system.","tasks":["13.06","13.13"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C25","choice":"B","title":"Selective hazards","decision":"Most desert safe from environment damage; selected areas dangerous.","tasks":["13.01","13.06"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C26","choice":"C","title":"Race and progression hazard resistance","decision":"Race-, ability-, and progression-based hazard resistance separate from PvP damage.","tasks":["13.06","12.01"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C27","choice":"A","title":"Environmental warnings only","decision":"No hazard warning HUD/popups; danger conveyed through weather, lighting, sound and terrain.","tasks":["13.01","13.06"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C28","choice":"B","title":"Hazard-specific effects","decision":"Storms damage and obscure vision; unstable Reiatsu slows energy recovery; corrosive ground damages.","tasks":["13.06","12.01"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C29","choice":"A","title":"Immediate hazard recovery","decision":"Remove temporary environment effects immediately on exit; do not refund lost health.","tasks":["13.06","12.01"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C30","choice":"C","title":"Roaming hazards","decision":"Storms move and disturbances appear dynamically in selected areas.","tasks":["13.01","13.06"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C31","choice":"B","title":"Balanced hazard frequency","decision":"Minor disturbances regular, major storms rare and dangerous regions more active.","tasks":["13.01","13.06"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C32","choice":"B","title":"Combat hazard boundaries","decision":"Hazards affect ordinary PvE/PvP, while major bosses, progression encounters and arenas are protected.","tasks":["13.06","15.01"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C33","choice":"A","title":"Player-only hazards","decision":"Environmental hazard consequences apply only to players, never NPCs or wildlife.","tasks":["13.06"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C34","choice":"B","title":"Shared simulation, adaptive client VFX","decision":"Server shares positions/timing/intensity; client visual quality adapts; resistance individually applies.","tasks":["13.06","13.11","17.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C35","choice":"B","title":"High-quality adaptive visuals","decision":"Layered spiritual storms, sand and distortion adapt to performance.","tasks":["13.01","16.07","17.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C36","choice":"B","title":"Selective movement disruption","decision":"Severe storms give limited pressure; Shunpo/Sonído/Hirenkyaku remain functional.","tasks":["13.06","12.01"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C37","choice":"A","title":"Fully protected safe zones","decision":"Storms avoid settlements, hubs, checkpoints and key NPC locations; no hazard effects inside.","tasks":["13.06","13.10"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C38","choice":"B","title":"Long-distance storm visibility","decision":"Lightweight horizon storms, increased visual detail when approaching.","tasks":["13.01","17.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C39","choice":"B","title":"Local atmospheric response","decision":"Near storms: darker surroundings, sand visibility and Reiatsu distortion; protected zones unaffected.","tasks":["13.01","16.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"},{"id":"C40","choice":"B","title":"Modular tested delivery","decision":"Implement in stages with independent tests and small verified commits when owner separately authorises work.","tasks":["13.06","13.11","17.07"],"scope":"Approved planning requirement, not built or scheduled","tests":["Preserve previous owner decisions and legacy task mapping","Verify relevant functionality in Roblox Studio before marking any task complete"],"notes":"Planning cross-reference. Source: docs/integration/APPROVED_HUECO_C16_C40_2026-10-12.md"}];
var c16=(L.conflicts||[]).find(function(c){return c.id==='C16';});
if(c16){c16.status='owner_approved';c16.choice='A';c16.resolution='StreamingEnabled remains OFF initially. See approved C16-C40 supplement.';}
additions.forEach(function(a){
if(!L.approvedChoices.some(function(x){return x.id===a.id;}))L.approvedChoices.push(a);
a.tasks.forEach(function(id){
var g=L.taskGuidance[id]||(L.taskGuidance[id]={approvalIds:[],note:''});
if(g.approvalIds.indexOf(a.id)<0)g.approvalIds.push(a.id);
var line='['+a.id+' '+a.choice+'] '+a.title+': '+a.decision;
if(g.note.indexOf(line)<0)g.note+=(g.note?'\n\n':'')+line;
});
});
})();
/* NUMEN reconciliation layer – additive, never writes existing task records. */
(function(){
'use strict';
var L=window.NUMEN_LEGACY;
if(!L)return;
state.integrationTab='mapping';
NAV.splice(6,0,['integration','↔','Plan reconciliation']);
function rootUrl(){return 'https://github.com/ihdkfr/SoulSurvival/blob/rukongai-v2/';}
function mappings(){return [].concat(L.taskMappings||[],L.subtaskMappings||[]).sort(function(a,b){return Number(a.oldId.split('-').pop())-Number(b.oldId.split('-').pop());});}
function related(tid){return mappings().filter(function(m){return m.taskId===tid;});}
function pill(t){return '<span class="badge">'+esc(t)+'</span>';}
function newTask(t){return getTask(t);}
var previousTaskPage=taskPage;
taskPage=function(id){
 var html=previousTaskPage(id),policy=L.taskGuidance?.[id],rels=related(id),coded=(L.codeMappings||[]).filter(function(m){return m.taskId===id;});
 if(!policy&&!rels.length&&!coded.length)return html;
 var involved=(policy?.approvalIds||[]).map(function(k){return L.approvedChoices.find(function(c){return c.id===k;});}).filter(Boolean);
 var panel='<div class="panel" style="margin-bottom:18px;border-left:3px solid var(--blue)"><div class="row between wrap"><h2 class="cardTitle">Approved design & existing game context</h2>'+pill(rels.length+' legacy link'+(rels.length===1?'':'s'))+'</div>';
 if(policy){panel+='<div class="notice" style="margin-top:12px"><b>Required direction for this task:</b><div style="white-space:pre-wrap;margin-top:8px;line-height:1.7">'+esc(policy.note)+'</div></div>';}
 if(involved.length)panel+='<div class="row wrap" style="margin:12px 0">'+involved.map(function(c){return pill(c.id+' · owner approved: '+c.choice);}).join('')+'</div>';
 if(rels.length){
  panel+='<h3 class="cardTitle" style="margin:15px 0 9px">Where old work maps into this task</h3><p class="small muted">The old ✓ state is historical evidence only. It does not complete this new task or confirm latest Studio testing.</p>';
  panel+=rels.slice(0,9).map(function(m){
   return '<div class="row between wrap" style="padding:10px 0;border-bottom:1px solid var(--border)"><div style="flex:1"><span class="tiny muted">'+esc(m.oldId)+' · '+(m.legacyMarkedDone?'Original checked':'Original open')+(m.parentOldId?' · Provisional subtask':' · Curated parent link')+'</span><div class="small">'+esc(m.oldTitle)+'</div></div><button class="btn sm" data-act="integration-old" data-id="'+attr(m.oldId)+'">Read old notes ↗</button></div>';
  }).join('');
  if(rels.length>9)panel+='<div class="tiny muted" style="padding:12px">+'+(rels.length-9)+' more legacy entries mapped here. Open Plan reconciliation for the full list.</div>';
 }
 if(coded.length){panel+='<h3 class="cardTitle" style="margin:16px 0 8px">Reported game code – verify in Studio</h3><p class="small muted">These statements are linked to source history. They are NOT approvals or proof the current build works.</p>'+coded.map(function(e){var it=L.codeStatus.find(function(r){return r.id===e.codeId;});return '<div class="infoBox" style="margin:8px 0"><div class="eyebrow">'+esc(e.codeId)+' · '+esc(e.codeStatus)+'</div><b>'+esc(it?.title||e.codeId)+'</b><div class="small" style="margin:6px 0">'+esc(e.note)+'</div><div class="tiny muted">Source: '+esc(e.source)+'</div></div>';}).join('');}
 panel+='<div class="row wrap" style="margin-top:15px"><button class="btn" data-act="nav" data-page="integration">Browse old-to-new mappings →</button><button class="btn" data-act="integration-choices">Review all approved choices →</button></div></div>';
 return html.replace('<div class="taskLayout">',panel+'<div class="taskLayout">');
};
var previousRoadmap=roadmapPage;
roadmapPage=function(){
 var html=previousRoadmap();
 var notice='<div class="notice" style="margin-bottom:18px"><b>Older game code and decisions are linked to this roadmap.</b> All 156 previous tasks and subtasks are mapped for review, without changing completion percentages. '+(L.approvedChoices||[]).length+' owner-approved design choices are applied as task instructions. <button class="btn sm" data-act="nav" data-page="integration">View the mapping ↗</button></div>';
 return html.replace('<div class="filterbar">',notice+'<div class="filterbar">');
};
var previousPageRender=pageRender;
pageRender=function(){
 if(state.page==='integration')return integrationPage();
 return previousPageRender();
};
function integrationPage(){
 var list=mappings(),pending=L.conflicts.filter(function(c){return c.status==='needs_choice';}),known=L.approvedChoices||[],codeLinks=L.codeMappings||[];
 var actions='<button class="btn" data-act="integration-choices">Approved design choices</button><button class="btn" data-act="integration-conflicts">Unresolved choices ('+pending.length+')</button>';
 var out=pageHeader('PLAN RECONCILIATION','Existing work → independent roadmap','Everything you already built or planned, connected to the new 281 tasks without inventing completion or discarding the original notes.',actions);
 out+='<div class="statrow"><div class="stat"><span>Original entries mapped</span><b>'+list.length+'</b><span>63 curated + 93 provisional</span></div><div class="stat"><span>New roadmap tasks</span><b>'+allTasks().length+'</b><span>Progress is unchanged</span></div><div class="stat"><span>Approved owner decisions</span><b>'+known.length+'</b><span>Recorded 12 October 2026</span></div><div class="stat"><span>Open design conflicts</span><b>'+pending.length+'</b><span>Awaiting your choice</span></div></div>';
 out+='<div class="notice" style="margin:18px 0"><b>Integrity rule:</b> original checkboxes reflect the old planner, source-code inventory is evidence of implementation, Studio testing is separate, and only actual task approval changes the current roadmap. The game repository has not been edited.</div>';
 out+='<div class="panel" style="margin-bottom:17px"><h2 class="cardTitle">Code audit evidence</h2><p class="small muted">'+(L.codeStatus||[]).length+' source-code implementation categories and '+codeLinks.length+' links to the independent roadmap have been recorded. Open any matching task to see the evidence and acceptance requirements. There are no automatic completion approvals.</p><button class="btn" data-act="legacy-tab-shortcut">Review game code inventory →</button></div>';
 out+='<div class="panel" style="margin-bottom:17px"><h2 class="cardTitle">Plan what to verify first</h2><p class="small muted" style="margin:9px 0">Suggested order: compare existing code against the new task brief; confirm gameplay in a fresh Studio session; attach screenshots/logs; only then mark tasks ready for review. Hueco Mundo relocation is an approved *future migration*, not a completed map move.</p><button class="btn" data-act="integration-old" data-id="legacy-080">Read old Hueco Mundo plan</button> <button class="btn" data-act="task" data-id="13.06">Open world migration task 13.06</button> <button class="btn" data-act="task" data-id="12.10">Open reiatsu task 12.10</button></div>';
 out+='<div class="filterbar"><input id="integrationSearch" class="inp" style="flex:1;min-width:220px" placeholder="Search old tasks, new task IDs or notes…"><select class="sel" id="integrationPhase"><option value="all">All 9 original phases</option>'+L.phases.map(function(p){return '<option value="'+attr(p.id)+'">'+p.id+' · '+esc(p.title)+'</option>';}).join('')+'</select></div>';
 out+='<div class="stack" id="integrationRows">';
 out+=list.map(function(m){
  var t=newTask(m.taskId),mark=m.legacyMarkedDone?'Marked ✓ in old plan':'Open in old plan';
  return '<div class="panel integrationRow" data-phase="'+attr(m.oldPhase)+'" data-filter="'+attr([m.oldId,m.oldTitle,m.taskId,t?.title||'',m.rationale].join(' ').toLowerCase())+'"><div class="row between wrap"><div class="grow"><div class="eyebrow">Old '+esc(m.oldId)+' → NUMEN '+esc(m.taskId)+' · '+esc(m.oldPhase)+'</div><div style="font-weight:650;margin:7px 0">'+esc(m.oldTitle)+'</div></div><div class="row wrap">'+pill(mark)+pill(m.parentOldId?'Provisional mapping':'Curated mapping')+'</div></div><p class="small muted">'+esc(m.rationale)+'</p><div class="row wrap"><button class="btn sm" data-act="integration-old" data-id="'+attr(m.oldId)+'">Old specification</button><button class="btn sm primary" data-act="task" data-id="'+attr(m.taskId)+'">New: '+esc(t?.title||m.taskId)+' →</button></div></div>';
 }).join('');
 out+='</div><div class="small muted" style="margin:12px 0">All mapping entries are review aids, not automatically applied progress.</div>';
 return out;
}
function approvedPage(){
 var ap=L.approvedChoices||[];
 var out=pageHeader('APPROVED DESIGN','Owner-approved decisions','These owner-approved choices are linked to the relevant roadmap task descriptions. They do not automatically change code or historical notes.', '<button class="btn" data-act="nav" data-page="integration">← Back to task mappings</button>');
 out+='<div class="stack">'+ap.map(function(a){
  return '<div class="panel" style="border-left:3px solid var(--green)"><div class="row between wrap"><h2 class="cardTitle">'+esc(a.id)+' · '+esc(a.title)+'</h2>'+pill('Approved '+a.choice)+'</div><div class="eyebrow" style="margin:8px 0">'+esc(a.scope)+'</div><p class="small" style="line-height:1.65">'+esc(a.decision)+'</p><div class="infoBox"><b>Build and verification requirements</b><p class="small">'+esc(a.tests.join(' · '))+'</p></div><p class="small muted">'+esc(a.notes)+'</p><div class="row wrap">'+a.tasks.map(function(id){return '<button class="btn sm" data-act="task" data-id="'+attr(id)+'">'+esc(id)+' →</button>';}).join('')+'</div></div>';
 }).join('')+'</div>';
 return out;
}
var previousPageRender2=pageRender;
pageRender=function(){
 if(state.page==='approved-decisions')return approvedPage();
 return previousPageRender2();
};
NAV.splice(7,0,['approved-decisions','✓','Approved designs']);
var previousHandleAct=handleAct;
handleAct=async function(act,el){
 if(act==='integration-old'){
  var old=L.items.find(function(i){return i.id===el.dataset.id;});
  if(!old)throw new Error('Original task could not be found.');
  state.legacyPhase=old.phase;state.legacyDetail=old.id;state.legacyTab='inventory';go('legacy');return;
 }
 if(act==='integration-choices'){go('approved-decisions');return;}
 if(act==='integration-conflicts'){state.legacyTab='conflicts';go('legacy');return;}
 if(act==='legacy-tab-shortcut'){state.legacyTab='code';go('legacy');return;}
 return previousHandleAct(act,el);
};
// NUMEN approved handoff prompt: preserve independent plan detail AND earlier accepted constraints.
var previousCopyPrompt=copyPrompt;
copyPrompt=function(id){
 var policy=L.taskGuidance?.[id],old=related(id),code=(L.codeMappings||[]).filter(function(x){return x.taskId===id;});
 var ap=(policy?.approvalIds||[]).map(function(a){return L.approvedChoices.find(function(c){return c.id===a;});}).filter(Boolean);
 if(!policy&&!old.length&&!code.length)return previousCopyPrompt(id);
 var t=getTask(id),p=allPhases().find(function(ph){return ph.idx===t.phase_id;});
 var prompt=[
  'NUMEN task '+id+' · '+t.title,
  'PHASE: '+(p?.title||t.phase_title)+' · PRIORITY: '+t.priority+' · EFFORT: '+t.effort,
  'IMPORTANT: This is an existing Roblox game, NOT an empty project. Inspect the current SoulSurvival repository first, then implement only missing pieces or verified improvements.',
  'PURPOSE:\n'+t.why,
  'BASE TASK INSTRUCTIONS:\n'+t.implementation_instructions,
  'RECOMMENDED TOOLS:\n'+t.suggested_tools,
  policy?.note?'APPROVED GAME-SPECIFIC TASK GUIDANCE:\n'+policy.note:'',
  ap.length?'OWNER-APPROVED DECISIONS:\n'+ap.map(function(a){return a.id+': '+a.decision+'\nRequired tests: '+a.tests.join('; ');}).join('\n\n'):'',
  old.length?'OLD DEVELOPMENT WORK TO INSPECT (not a completion claim):\n'+old.map(function(m){return m.oldId+' '+m.oldTitle+' — '+(m.legacyMarkedDone?'ticked in old planner':'open in old planner')+'; validate in current Studio before claiming complete';}).join('\n'):'',
  code.length?'REPORTED SOURCE CODE TO VERIFY:\n'+code.map(function(c){return c.codeId+': '+c.note+' (source: '+c.source+')';}).join('\n'):'',
  'ACCEPTANCE TEST:\n'+t.acceptance_test,
  'PHASE DEPENDENCIES:\n'+(p?.depends||'None listed'),
  'WORKING RULES: Preserve all existing game content, source, old approval decisions and saved player data. Locked Standard Cero visuals require explicit owner unlock. The expanded Soul Reaper Academy remains on hold. Never treat coded as tested or auto-approve a task. Record files changed, proof from Roblox Studio and unanswered decisions. No paid tools/assets without approval.',
  'TASK CHECKLIST:\n'+(taskState(id).checklist.map(function(x){return (x.done?'[x] ':'[ ] ')+x.text;}).join('\n')||'No new checklist yet.')
 ].filter(Boolean).join('\n\n');
 copyText(prompt);
};
function filterRows(){
 var q=(document.getElementById('integrationSearch')?.value||'').toLowerCase(),p=document.getElementById('integrationPhase')?.value||'all';
 document.querySelectorAll('.integrationRow').forEach(function(e){
  e.style.display=(p==='all'||e.dataset.phase===p)&&(!q||e.dataset.filter?.includes(q))?'':'none';
 });
}
document.addEventListener('input',function(e){if(e.target.id==='integrationSearch')filterRows();});
document.addEventListener('change',function(e){if(e.target.id==='integrationPhase')filterRows();});
})();
/* NUMEN old-plan overlap reconciliation: supplementary task guidance only. */
(function(){
'use strict';
var L=window.NUMEN_LEGACY;if(!L)return;
var guidance={
'00.01':'Existing game already has design documents and code. Audit and reconcile its current pitch instead of replacing the project with a fresh pitch. C14 still needs explicit owner confirmation.',
'02.02':'Spiritual Legacy cross-slot bonuses are a proposal only; C06 unresolved. Keep character-specific records independent until approved.',
'03.11':'Legacy rig/animation work spans playable Hollow rigs and model QA; animation priority rules alone do not satisfy the rig deliverable.',
'08.05':'C04: maintain/test existing Academy onboarding, but do not begin the expanded 80-minute Academy until owner lifts the hold.',
'08.09':'C04: preserve existing Kido lessons. Expanded Academy lesson schedule remains on hold.',
'08.11':'C04: preserve existing assignments. Expanded Academy timetable remains on hold.',
'09.01':'C07: ten-line humanoid Hollow design is current; older Q/F body proposals are retained as superseded historical references.',
'09.03':'Legacy Hollow modelling overlaps 09.12 and 16.09. Do not treat older rejected or superseded multi-rig designs as approved build requirements.',
'09.12':'Legacy Adjuchas models overlap art, rigging and evolution work. Track individual form approvals; no inferred model sign-off.',
'09.20':'Existing Garganta movement is same-Place; approved A01/C18/C19 require cross-Place travel at a future migration phase, preserving current story/progression hooks.',
'12.10':'Approved C03: Focus (0–100 transformation meter) and Channel (blade/body/technique/aura allocation) are separate, as are reserve and sensing.',
'13.05':'Existing Academy campus work and expanded dorm proposals must be distinguished. C04 holds expanded content.',
'13.06':'Hueco Mundo migration and hazards C16–C40 are approved **future roadmap requirements**, not an instruction to start building now.',
'13.10':'Distinguish cross-Place Garganta from in-place transport; C24 forbids fast travel *within* Hueco Mundo. Dangai normal-route safety remains C09 unresolved.',
'13.11':'C16 A/C17 A override streamed-world wording: StreamingEnabled OFF and no custom region unloading; optimise complete-place loading and benchmark instead.',
'13.13':'C19 and C23 require protected cinematic arrivals, eligible persistent selected spawns, failed-teleport recovery and safe faction/progression fallbacks.',
'16.05':'Standard Cero visual structure is locked. Only authorised camera/audio/performance maintenance; Sōkatsui is a separate owner-approved volumetric VFX target.',
'16.09':'New ten-line humanoid Hollow kit supersedes historical Q/F multi-rig proposals; locked individual model references retain priority.',
'16.11':'Cero audio/sound library overlaps VFX hooks, but source/licence audit and sound design are the canonical deliverable here.',
'17.06':'Old Cero performance tests overlap VFX but are independently verifiable; never auto-approve based on legacy checks.'
};
Object.keys(guidance).forEach(function(id){var g=L.taskGuidance[id]||(L.taskGuidance[id]={approvalIds:[],note:''});var line='Legacy reconciliation: '+guidance[id]+' See docs/integration/LEGACY_TO_NUMEN_DEDUPLICATION_2026-10-12.md.';if(g.note.indexOf(line)<0)g.note+=(g.note?'\n\n':'')+line;});
})();
