/* NUMEN unified legacy + new plan. Original requirements display within existing pages.
   Never writes to Supabase or replaces team-saved records. */
(function(){
'use strict';
var L=window.NUMEN_LEGACY;if(!L)return;
// Historical reconciliation pages remain accessible by direct link, but are not separate primary navigation destinations.
for(var ni=NAV.length-1;ni>=0;ni--){if(NAV[ni][0]==='legacy'||NAV[ni][0]==='integration')NAV.splice(ni,1);}
var byId=Object.fromEntries(L.items.map(function(x){return [x.id,x];}));
var groups=[];
L.items.forEach(function(x,i){if(x.indent!==0)return;var children=[];for(var n=i+1;n<L.items.length&&L.items[n].phase===x.phase&&L.items[n].indent>0;n++)children.push(L.items[n]);groups.push({parent:x,children:children});});
var primary=Object.fromEntries((L.taskMappings||[]).concat(L.subtaskMappings||[]).map(function(m){return [m.oldId,m.taskId];}));
function mapping(id){return primary[id]||'';}
function originalBody(x){return [x.summary||'',x.body||''].filter(Boolean).join('\n\n');}
function groupText(g){return [g.parent].concat(g.children).map(function(x){return (x.id===g.parent?'':'• ')+x.title+'\n'+originalBody(x)+(x.complete?'\nOriginal checklist: checked; not NUMEN-verified.':'')}).join('\n\n');}
var combatIds=new Set(['legacy-001','legacy-007','legacy-012','legacy-017','legacy-021','legacy-025','legacy-026','legacy-027','legacy-031','legacy-032','legacy-033','legacy-074','legacy-075','legacy-143','legacy-144','legacy-145']);
var labels={'legacy-001':'Standard Cero — approved visual lock','legacy-007':'Standard Cero — camera feedback','legacy-012':'Standard Cero — sound design','legacy-017':'Standard Cero — performance','legacy-027':'Hadō techniques','legacy-031':'Bakudō techniques'};
function kind(g){var id=g.parent.id;if(['legacy-001','legacy-007','legacy-012','legacy-017','legacy-032','legacy-033'].includes(id))return 'vfx';if(['legacy-143','legacy-144','legacy-145'].includes(id))return 'mechanic';return 'move';}
function record(g){var p=g.parent;return {id:'original-'+p.id,kind:kind(g),name:labels[p.id]||p.title,summary:p.summary||p.title,gameplay:groupText(g),vfx:groupText(g),acceptance:'Original checklist is historical evidence only. Verify against approved latest designs and test in Studio before marking complete.',status:p.complete?'Original / historical checked':'Original / pending',taskIds:[...new Set([p].concat(g.children).map(function(x){return mapping(x.id);}).filter(Boolean))],related:[],links:[{title:'Original SoulSurvival plan in GitHub',url:'https://github.com/ihdkfr/numen-development-workspace/blob/main/docs/legacy/SoulSurvival_original_plan_2026-10-12.md'}],media:[],notes:[],origin:'original',originalSource:p.id};}
var combat=groups.filter(function(g){return combatIds.has(g.parent.id);}).map(record);
var oldItems=libraryItems;
libraryItems=function(type){var live=oldItems(type);if(type!=='combat')return live;var used=new Set(live.map(function(x){return x.id;}));return live.concat(combat.filter(function(x){return !used.has(x.id);}).map(function(x){return Object.assign({},x);}));};
var oldItem=libraryItem;
libraryItem=function(type,id){var saved=oldItem(type,id);if(saved.name||type!=='combat')return saved;return combat.find(function(x){return x.id===id;})||saved;};
/* Render the old requirements inline in the standard Roadmap rows, rather than in a separate page. */
var inherited={};
L.items.forEach(function(x){var id=mapping(x.id);if(id)(inherited[id]||(inherited[id]=[])).push(x);});
var previousRow=taskRow;
taskRow=function(t,showPin){
 var row=previousRow(t,showPin);
 if(state.page!=='roadmap')return row;
 var old=inherited[t.id]||[];
 var badgeNew='<span class="badge" style="font-size:10px;margin-left:8px">New</span>';
 if(!old.length)return row.replace('</button><div class="taskdesc">','</button>'+badgeNew+'<div class="taskdesc">');
 var entries=old.map(function(x){
  return '<details style="padding:9px 13px;margin:5px 0;background:var(--panel2);border-radius:8px;border-left:2px solid var(--blue)">'+
   '<summary style="cursor:pointer;display:flex;gap:10px;align-items:center;flex-wrap:wrap"><span class="badge">Original</span><strong>'+esc(x.title)+'</strong><span class="small muted">'+esc(x.complete?'Checked in old plan':'Planned in old plan')+'</span></summary>'+
   '<div class="small" style="white-space:pre-wrap;line-height:1.7;padding:12px 4px">'+esc(originalBody(x)||'Original child requirement; refer to the complete specification below.')+'</div>'+
   '<div class="row wrap"><button class="btn sm" data-act="task" data-id="'+attr(t.id)+'">Open combined NUMEN task '+esc(t.id)+' →</button></div></details>';
 }).join('');
 return '<div class="panel" style="padding:6px 8px;margin:6px 0;border-left:3px solid var(--blue)">'+
   row.replace('</button><div class="taskdesc">','</button>'+badgeNew+'<div class="taskdesc">')+
   '<div style="padding:5px 10px 7px 32px"><div class="small muted" style="margin:7px 0">'+old.length+' original requirements integrated into this task · click to read full details</div>'+entries+'</div></div>';
};
window.numenOriginalMatches=function(id,query){var q=String(query||'').toLowerCase();return (inherited[id]||[]).some(function(x){return [x.title,x.summary,x.body,x.id].join(' ').toLowerCase().includes(q);});};
var previousTask=taskPage;
taskPage=function(id){
 var html=previousTask(id);
 var links=(L.taskMappings||[]).concat(L.subtaskMappings||[]).filter(function(m){return m.taskId===id;});
 if(!links.length)return html;
 var rows=links.map(function(m){var x=byId[m.oldId];if(!x)return '';var status=x.complete?'Original marked ✓':'Original planned';return '<details class="panel" style="margin:9px 0;padding:12px"><summary style="cursor:pointer"><span class="badge">Original</span> <b>'+esc(x.title)+'</b> <small class="muted">'+esc(status)+'</small></summary><div style="white-space:pre-wrap;line-height:1.65;margin-top:12px">'+esc(originalBody(x)||'See inherited original project notes.')+'</div><div class="small muted" style="margin-top:9px">Legacy reference: '+esc(x.id)+' · Historical completion is not Studio verification.</div></details>';}).join('');
 var section='<section class="panel" style="margin:0 0 18px;border-left:3px solid var(--blue)"><div class="row between wrap"><h2 class="cardTitle">Original SoulSurvival requirements</h2><span class="badge">Original + New</span></div><p class="small muted">These original specifications are part of this task, with original wording preserved. Later explicitly approved changes take precedence only where they directly supersede a requirement.</p>'+rows+'</section>';
 var at=html.indexOf('<div class="taskLayout">');return at>=0?html.slice(0,at)+section+html.slice(at):section+html;
};
var oldCodex=codexPage;
codexPage=function(){
 var html=oldCodex();
 var section='<section class="panel" style="margin:18px 0"><div class="row between wrap"><h2 class="cardTitle">Original SoulSurvival design specification</h2><span class="badge">Original</span></div><p class="small muted">The original design decisions are retained alongside the independent codex. Open this reference directly here; new proposals cannot silently replace approved original requirements.</p><details><summary style="cursor:pointer;font-weight:650">Read complete original project specification</summary><div class="markdown" style="white-space:pre-wrap;max-height:650px;overflow:auto;margin-top:14px">'+esc(L.source)+'</div></details></section>';
 return html+section;
};
var oldCombatDetail=combatDetail;
combatDetail=function(id){var html=oldCombatDetail(id),r=combat.find(function(x){return x.id===id;});if(!r)return html;var t='<div class="panel" style="margin:14px 0;border-left:3px solid var(--green)"><b>Original design · '+esc(r.originalSource)+'</b><p class="small muted">Full specification and child checklists are displayed above. Original checklist ticks are historic, not verified game completion. Editing this entry saves a team override without changing the archived source.</p><div class="row wrap">'+r.taskIds.map(function(x){return '<button class="btn sm" data-act="task" data-id="'+attr(x)+'">NUMEN '+esc(x)+'</button>';}).join('')+'</div></div>';return html+t;};
})();
