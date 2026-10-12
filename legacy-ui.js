/* NUMEN existing work, design decisions and two-person task allocation. All existing app data stays unchanged. */
(function(){
  'use strict';
  var L=window.NUMEN_LEGACY;
  if(!L){console.warn('NUMEN original plan not loaded');return;}
  NAV.splice(5,0,['legacy','◫','Existing work & decisions']);
  state.legacyTab='inventory';state.legacyPhase='01';state.legacyDetail=null;state.legacyQuery='';
  var basicPage=pageRender;
  pageRender=function(){
    if(state.page==='legacy')return legacyView();
    var result=basicPage();
    if(state.page==='team')result+=assignmentView();
    return result;
  };
  var basicTask=taskPage;
  taskPage=function(id){
    var html=basicTask(id),t=getTask(id);
    if(!t)return html;
    var older=t.phase_id==='08'||t.phase_id==='09'?'Soul Reaper research':t.phase_id==='10'?'Quincy planning':t.phase_id==='13'?'Hueco Mundo and existing worlds':t.phase_id==='06'||t.phase_id==='04'?'Cero and combat VFX':null;
    var linked='<div class="notice" style="margin-bottom:13px"><b>Existing project history:</b> '+(older?'Related older work exists for '+esc(older)+'. ':'')+'The previous plan is preserved separately. <button class="btn sm" data-act="goto-legacy">Review old tasks and design choices →</button></div>';
    return html.replace('<div class="taskLayout">',linked+'<div class="taskLayout">')
      .replace('<div class="section"><label class="label">Working in Workshop</label>',
        '<div class="section"><label class="label">Future teammate assignment</label><button class="btn wide" data-act="reserve-friend" data-id="'+attr(id)+'">'+(taskState(id).pendingFriend?'✓ Reserved · Cancel reservation':'Reserve for teammate')+'</button><div class="tiny muted">In Team & activity you can assign a registered person. Reservations stay visible until someone joins.</div></div><div class="section"><label class="label">Working in Workshop</label>');
  };
  function bttn(verb,text,extra){return '<button class="btn '+(extra||'')+'" data-act="'+verb+'">'+esc(text)+'</button>';}
  function legacyView(){
    var out=pageHeader('PROJECT HISTORY','Existing game & design decisions','Read your complete original SoulSurvival project archive, including built work, paused plans and potential conflicts. This screen does not alter or mark the 281 independent roadmap tasks.');
    out+='<div class="notice"><b>Preserved without merging:</b> 9 old phases, 156 tasks and subtasks, original specifications and notes. “Done” here means ticked in the original plan, not independently re-tested in Roblox Studio.</div>';
    out+='<div class="row wrap" style="margin:16px 0">'+[['inventory','Original plan'],['code','Actual game code'],['decisions','Design decisions'],['conflicts','Resolve overlaps']].map(function(x){return '<button class="btn '+(state.legacyTab===x[0]?'primary':'')+'" data-act="legacy-tab" data-value="'+x[0]+'">'+x[1]+'</button>';}).join('')+'</div>';
    if(state.legacyTab==='inventory'){
      var p=L.phases.find(function(x){return x.id===state.legacyPhase;})||L.phases[0];
      out+='<div class="grid2" style="grid-template-columns:minmax(180px,.4fr) minmax(0,1fr)"><div class="panel stack"><h2 class="cardTitle">Old project phases</h2>';
      out+=L.phases.map(function(x){return '<button class="btn '+(p.id===x.id?'primary':'')+'" data-act="legacy-phase" data-id="'+x.id+'" style="text-align:left;white-space:normal">'+x.id+' · '+esc(x.title)+' ('+x.items.length+')</button>';}).join('');
      out+='</div><div class="panel"><div class="row between wrap"><h2 class="cardTitle">'+p.id+' · '+esc(p.title)+'</h2><a class="btn sm" target="_blank" rel="noopener" href="docs/legacy/SoulSurvival_original_plan_2026-10-12.md">Full original text ↗</a></div>';
      out+='<p class="small muted" style="white-space:pre-wrap">'+esc(p.description)+'</p><input class="inp" id="legacySearch" value="'+attr(state.legacyQuery)+'" placeholder="Search this phase…" style="width:100%;margin:13px 0">';
      var arr=L.items.filter(function(item){return item.phase===p.id;});
      out+='<div class="small muted" style="margin:8px 0">'+arr.length+' original entries · '+arr.filter(function(x){return x.complete;}).length+' marked complete</div><div id="legacyRows">';
      out+=arr.filter(function(x){return !state.legacyQuery||[x.title,x.summary,x.body].join(' ').toLowerCase().includes(state.legacyQuery.toLowerCase());}).map(function(x){return '<button class="btn" data-act="legacy-item" data-id="'+attr(x.id)+'" style="display:flex;white-space:normal;width:100%;text-align:left;margin:5px 0;padding-left:'+Math.min(13+x.indent*4,40)+'px;background:var(--panel2)"><span style="margin-right:8px">'+(x.complete?'☑':'☐')+'</span><span><b>'+esc(x.title)+'</b><div class="tiny muted">'+esc(x.meta)+(x.indent?' · Subtask':'')+'</div></span></button>';}).join('');
      out+='</div>';
      var sel=L.items.find(function(x){return x.id===state.legacyDetail && x.phase===p.id;});
      if(sel)out+='<div class="panel" style="margin-top:14px;border-left:3px solid var(--blue)"><div class="row between wrap"><h2 class="cardTitle">'+esc(sel.title)+'</h2><button class="btn sm" data-act="copy-legacy" data-id="'+attr(sel.id)+'">Copy specification</button></div><div class="eyebrow" style="margin:8px 0">'+esc(sel.id)+' · '+(sel.complete?'Original marked done':'Original open task')+'</div><h3>Task information</h3><div class="infoBox" style="white-space:pre-wrap;line-height:1.7">'+esc(sel.summary)+'</div><h3 style="margin:16px 0 8px">Notes and specifications</h3><div class="infoBox" style="white-space:pre-wrap;line-height:1.7;max-height:550px;overflow:auto">'+esc(sel.body||'No notes recorded.')+'</div></div>';
      out+='</div></div>';
    } else if(state.legacyTab==='code'){
      out+='<div class="notice"><b>Source code is not the same as a completed feature.</b> The game repository currently reports Build 245; some features were switched off or last verified earlier. These are evidence links for review, not automatic completion ticks.</div>';
      out+='<div class="stack">'+(L.codeStatus||[]).map(function(x){
        var url='https://github.com/ihdkfr/SoulSurvival/blob/rukongai-v2/'+encodeURI(x.source.split(' / ')[0]);
        return '<div class="panel"><div class="row between wrap"><h2 class="cardTitle">'+esc(x.id)+' · '+esc(x.title)+'</h2>'+badge(x.status)+'</div><div class="eyebrow" style="margin:8px 0">'+esc(x.category)+' · <a href="'+attr(url)+'" target="_blank" rel="noopener">Game source / status documentation ↗</a></div><p class="small">'+esc(x.details)+'</p></div>';
      }).join('')+'</div>';
    } else if(state.legacyTab==='decisions'){
      out+='<div class="stack">'+L.decisions.map(function(d){return '<div class="panel"><div class="row between wrap"><h2 class="cardTitle">'+esc(d.id)+' · '+esc(d.title)+'</h2>'+badge(d.status)+'</div><div class="eyebrow" style="margin:8px 0">'+esc(d.topic)+' · '+esc(d.source)+'</div><div class="infoBox">'+esc(d.detail)+'</div></div>';}).join('')+'</div>';
    }else{
      var pending=L.conflicts.filter(function(x){return x.status==='needs_choice';}).length;
      out+='<div class="notice"><b>'+pending+' owner choices remain.</b> Conflicting directions have NOT overwritten old or new task statuses. Tell ChatGPT your choice for each conflict, or review them one at a time.</div><div class="stack">';
      out+=L.conflicts.map(function(c){return '<div class="panel" style="border-left:3px solid '+(c.status==='needs_choice'?'var(--amber)':'var(--green)')+'"><div class="row between wrap"><h2 class="cardTitle">'+esc(c.id)+' · '+esc(c.topic)+'</h2>'+badge(c.status==='needs_choice'?'Choice needed':'Previously settled')+'</div><div class="grid2" style="margin:14px 0"><div class="infoBox"><b>Option A</b><p class="small">'+esc(c.a)+'</p></div><div class="infoBox"><b>Option B</b><p class="small">'+esc(c.b)+'</p></div></div><div class="small muted"><b>Recommended:</b> '+esc(c.recommend)+'</div></div>';}).join('');
      out+='</div>';
    }
    return out;
  }
  function assignmentView(){
    var all=allTasks(),members=getPeople(),me=personId(),other=members.filter(function(x){return x.user_id!==me;}),reserved=all.filter(function(t){return !!taskState(t.id).pendingFriend;}),active=all.filter(function(t){return t && taskState(t.id).status!=='done' && taskState(t.id).assignees.some(function(x){return x!==me;});});
    var html='<div class="panel" style="margin-top:16px"><h2 class="cardTitle">Assign a task to your teammate</h2><p class="small muted" style="margin:12px 0">Assignments link to the actual roadmap task and appear in the shared Workshop. Your teammate must sign in before you can select their account. Until then, reserve a job for them.</p>';
    html+='<div class="grid2"><div><label class="label">Choose task</label><select class="sel" id="assignTask" style="width:100%;margin:8px 0">'+all.filter(function(t){return taskState(t.id).status!=='done';}).map(function(t){return '<option value="'+attr(t.id)+'">'+esc(t.id)+' · '+esc(snip(t.title,85))+'</option>';}).join('')+'</select></div><div><label class="label">Assign to</label><select class="sel" id="assignPerson" style="width:100%;margin:8px 0">'+members.map(function(p){return '<option value="'+attr(p.user_id)+'">'+esc(p.display_name)+(p.user_id===me?' (you)':'')+'</option>';}).join('')+'<option value="pending-friend">Reserve for teammate (not yet joined)</option></select></div></div>';
    html+='<button class="btn primary" style="margin-top:9px" data-act="assign-selected">Assign and add to Workshop</button><div class="barSeparator"></div>';
    html+='<h3 class="cardTitle">Reserved for teammate · '+reserved.length+'</h3>';
    html+=reserved.length?reserved.map(function(t){return '<div class="row between wrap" style="margin:10px 0"><button class="titlelink" data-act="task" data-id="'+attr(t.id)+'">'+esc(t.id)+' · '+esc(t.title)+'</button>'+(other.length===1?'<button class="btn sm" data-act="assign-reserved" data-id="'+attr(t.id)+'">Assign to '+esc(other[0].display_name)+'</button>':'<span class="tiny muted">'+(other.length===0?'Awaiting teammate login':'Select member from task')+'</span>')+'</div>';}).join(''):'<p class="small muted">None reserved yet.</p>';
    html+='<div class="barSeparator"></div><h3 class="cardTitle">Teammate work · '+active.length+'</h3>';
    html+=active.slice(0,30).map(function(t){return '<div style="margin:8px 0"><button class="titlelink" data-act="task" data-id="'+attr(t.id)+'">'+esc(t.id)+' · '+esc(t.title)+'</button> <span class="tiny muted">— '+esc(taskState(t.id).assignees.filter(function(p){return p!==me;}).map(personName).join(', '))+'</span></div>';}).join('')||'<p class="small muted">No assignments yet.</p>';
    html+='</div>';return html;
  }
  var originalAct=handleAct;
  handleAct=async function(act,el){
    var id=el.dataset.id;
    if(act==='goto-legacy'){go('legacy');return;}
    if(act==='legacy-tab'){state.legacyTab=el.dataset.value;state.legacyDetail=null;render();return;}
    if(act==='legacy-phase'){state.legacyPhase=id;state.legacyDetail=null;state.legacyQuery='';go('legacy');return;}
    if(act==='legacy-item'){state.legacyDetail=id;render();return;}
    if(act==='copy-legacy'){var item=L.items.find(function(x){return x.id===id;});if(item)copyText(item.title+'\n'+item.summary+'\n'+item.body);return;}
    if(act==='reserve-friend'){
      await updateTask(id,{pendingFriend:!taskState(id).pendingFriend,workshop:true},'updated teammate reservation');return;
    }
    if(act==='assign-selected'){
      var tid=inputValue('assignTask'),to=inputValue('assignPerson');
      if(!getTask(tid))throw new Error('Select a valid roadmap task');
      if(to==='pending-friend'){await updateTask(tid,{pendingFriend:true,workshop:true},'reserved job for teammate');return;}
      if(!getPeople().some(function(p){return p.user_id===to;}))throw new Error('Member is not registered yet');
      var existing=taskState(tid).assignees;
      await updateTask(tid,{assignees:[...new Set(existing.concat(to))],workshop:true,pendingFriend:false},'assigned to '+personName(to));return;
    }
    if(act==='assign-reserved'){
      var teammate=getPeople().filter(function(p){return p.user_id!==personId();});
      if(teammate.length!==1)throw new Error('Exactly one other registered teammate is needed for quick assignment');
      var prior=taskState(id).assignees;
      await updateTask(id,{assignees:[...new Set(prior.concat(teammate[0].user_id))],pendingFriend:false,workshop:true},'assigned reserved job to '+teammate[0].display_name);return;
    }
    return originalAct(act,el);
  };
  document.addEventListener('input',function(e){
    if(e.target.id!=='legacySearch')return;
    state.legacyQuery=e.target.value;
    var area=document.getElementById('legacyRows');
    if(!area)return;
    var arr=L.items.filter(function(x){return x.phase===state.legacyPhase && [x.title,x.summary,x.body].join(' ').toLowerCase().includes(state.legacyQuery.toLowerCase());});
    area.innerHTML=arr.map(function(x){return '<button class="btn" data-act="legacy-item" data-id="'+attr(x.id)+'" style="display:flex;white-space:normal;width:100%;text-align:left;margin:5px 0;background:var(--panel2)"><span style="margin-right:8px">'+(x.complete?'☑':'☐')+'</span><span><b>'+esc(x.title)+'</b><div class="tiny muted">'+esc(x.meta)+'</div></span></button>';}).join('')||'<div class="small muted">No matches in this phase.</div>';
  });
})();