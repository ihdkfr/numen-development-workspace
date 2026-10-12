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
 var out=pageHeader('APPROVED DESIGN','Five decisions now in force','These owner-approved choices are linked to the relevant roadmap task descriptions. They do not automatically change code or historical notes.', '<button class="btn" data-act="nav" data-page="integration">← Back to task mappings</button>');
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
function filterRows(){
 var q=(document.getElementById('integrationSearch')?.value||'').toLowerCase(),p=document.getElementById('integrationPhase')?.value||'all';
 document.querySelectorAll('.integrationRow').forEach(function(e){
  e.style.display=(p==='all'||e.dataset.phase===p)&&(!q||e.dataset.filter?.includes(q))?'':'none';
 });
}
document.addEventListener('input',function(e){if(e.target.id==='integrationSearch')filterRows();});
document.addEventListener('change',function(e){if(e.target.id==='integrationPhase')filterRows();});
})();