(function(){
"use strict";
function rk(s,i){return s+":"+i}
function routeState(){
  state.route=state.route||{};
  state.route.offer=Array.isArray(state.route.offer)?state.route.offer:[];
  state.route.currentLessonKey=state.route.currentLessonKey||null;
  state.route.authorizedKey=state.route.authorizedKey||null;
  state.route.mode=state.route.mode||"route";
  state.route.recallGate=state.route.recallGate||{};
  state.route.lessonReviews=state.route.lessonReviews||{};
  return state.route;
}
function allDone(){return Object.keys(MODULES).every(function(s){return MODULES[s].every(function(_,i){return !!state.lessonDone[rk(s,i)]})})}
function pendingSubjects(){return Object.keys(SUBJECTS).filter(function(s){return nextIdx(s)>=0})}
function nextIdx(s){return MODULES[s]?MODULES[s].findIndex(function(_,i){return !state.lessonDone[rk(s,i)]}):-1}
function esc2(v){return String(v==null?"":v).replace(/[&<>'"]/g,function(m){return {"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[m]})}
function shuffle2(a){var x=[].concat(a);for(var i=x.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=x[i];x[i]=x[j];x[j]=t}return x}
function offer(){
  var r=routeState(),p=pendingSubjects(),old=(r.offer||[]).slice(),pick=[];
  if(!p.length){r.offer=[];return []}
  for(var tries=0;tries<20;tries++){
    pick=shuffle2(p).slice(0,Math.min(3,p.length));
    if(pick.slice().sort().join("|")!==old.slice().sort().join("|")||pick.length<3)break;
  }
  r.offer=pick;r.offerAt=Date.now();save();return pick;
}
function currentOffer(){
  var r=routeState(),p=pendingSubjects(),valid=(r.offer||[]).filter(function(s){return p.indexOf(s)>=0});
  if(valid.length===Math.min(3,p.length))return valid;
  return offer();
}
function icon(s){return SUBJECTS[s]&&SUBJECTS[s][0]||"📚"}
function optionCard(s){
  var i=nextIdx(s),m=MODULES[s][i],done=MODULES[s].reduce(function(n,_,k){return n+(state.lessonDone[rk(s,k)]?1:0)},0),pct=Math.round(done/MODULES[s].length*100);
  return '<article class="route-choice card"><div class="route-choice-head"><span class="route-icon">'+icon(s)+'</span><div><div class="eyebrow">MATÉRIA DISPONÍVEL</div><h2>'+esc2(SUBJECTS[s][1])+'</h2></div></div><div class="route-module"><span class="route-number">'+(i+1)+'</span><div><strong>Próxima aula</strong><p>'+esc2(m[0])+'</p><small>'+esc2(m[1])+'</small></div></div><div class="route-progress"><div><span>'+done+'/'+MODULES[s].length+' aulas</span><span>'+pct+'%</span></div><div class="progress-track"><div class="progress-fill" style="width:'+pct+'%"></div></div></div><button class="btn primary btn-big" onclick="chooseRouteSubject(\''+s+'\')">Começar esta matéria →</button></article>'
}
function showOffers(){
  routeState().mode="route";var opts=currentOffer();shell("Trilha de estudo");var c=document.querySelector("#content");
  if(!opts.length){c.innerHTML='<section class="route-complete card"><div class="eyebrow">TRILHA CONCLUÍDA</div><h1>Você concluiu todo o conteúdo.</h1><p>Agora o próximo passo é a avaliação completa.</p><div class="route-complete-stat"><strong>'+sumDone()+'</strong><span>módulos concluídos</span></div><button class="btn primary btn-big" onclick="startGuided()">🎯 Iniciar avaliação final</button></section>';return}
  c.innerHTML='<section class="route-head card"><div><div class="eyebrow">PRÓXIMA ETAPA</div><h1>Escolha 1 de '+opts.length+' matérias</h1><p>O sistema sorteia as opções. Você escolhe apenas uma delas; depois da aula, outro trio é sorteado.</p></div><div class="route-count"><strong>'+sumDone()+'</strong><span>de '+sumModules()+' aulas concluídas</span></div></section><section class="route-options">'+opts.map(optionCard).join("")+'</section><section class="route-method card"><div class="eyebrow">🧠 MÉTODO DE APRENDIZAGEM</div><h2>O caminho principal usa recuperação, espaçamento e mistura de matérias.</h2><div class="method-steps"><div><b>1</b><span>Leia o conteúdo e observe o exemplo/visual.</span></div><div><b>2</b><span>Recupere o que aprendeu sem consultar a resposta.</span></div><div><b>3</b><span>Troque de matéria entre etapas para evitar treino sempre igual.</span></div><div><b>4</b><span>Revisite conteúdos em intervalos posteriores.</span></div></div></section>';
}
function sumDone(){return Object.keys(state.lessonDone||{}).filter(function(k){return MODULES[k.split(":")[0]]}).length}
function registerRecall(s,i){
  var key=rk(s,i),areas=[].slice.call(document.querySelectorAll(".recall-input"));
  if(areas.length<1||areas.some(function(x){return x.value.trim().length<20})){toast("Responda as perguntas de recuperação com suas próprias palavras antes de concluir.");var f=areas.find(function(x){return x.value.trim().length<20});if(f)f.focus();return}
  routeState().recallGate[key]={ts:Date.now(),chars:areas.map(function(x){return x.value.trim().length})};save();
  var st=document.querySelector(".recall-gate-status"),b=document.querySelector(".route-recall-gate button");if(st)st.textContent="✅ Recuperação registrada. Você pode concluir.";if(b){b.textContent="✓ Registrada";b.disabled=true}toast("Recuperação registrada.");
}
function injectGate(s,i){
  var r=routeState(),key=rk(s,i),actions=document.querySelector(".lesson-actions");
  if(!actions||state.lessonDone[key]||r.mode==="revisit"||document.querySelector(".route-recall-gate"))return;
  var g=document.createElement("section");g.className="route-recall-gate card";
  g.innerHTML='<div class="eyebrow">🧠 RECUPERAÇÃO ATIVA · ETAPA OBRIGATÓRIA</div><h2>Agora tente lembrar antes de avançar</h2><p>Responda as perguntas de revisão da aula sem consultar o texto. Depois confira as referências e registre a recuperação.</p><div class="recall-gate-status">Ainda não registrada.</div><button class="btn primary" onclick="registerRouteRecall(\''+s+'\','+i+')">✓ Registrar minha recuperação</button>';
  actions.parentNode.insertBefore(g,actions);
}
function cleanLesson(){
  document.querySelectorAll(".lesson-body section").forEach(function(sec){var h=sec.querySelector("h3")&&sec.querySelector("h3").textContent.trim()||"";if(/Como estudar e resolver|Como pode aparecer na prova|Autoexplicação/i.test(h)||/^🧠 Resumo de bolso/i.test(h))sec.remove()});
  var d=document.querySelector(".lesson .deep-box");if(d)d.remove();
  var rule=document.querySelector(".study-depth-rule");if(rule)rule.remove();
  var body=document.querySelector(".lesson-body"),depth=document.querySelector(".study-depth-card");if(body&&depth)body.parentNode.insertBefore(depth,body);
}
function finishLesson(s,i){
  var r=routeState(),key=rk(s,i);
  if(!state.lessonDone[key]&&!r.recallGate[key]){toast("Antes de avançar, faça a recuperação ativa.");var g=document.querySelector(".route-recall-gate");if(g)g.scrollIntoView({behavior:"smooth",block:"center"});return}
  if(!state.lessonDone[key]){state.lessonDone[key]=true;state.xp+=12}
  r.lessonReviews[key]={nextReview:Date.now()+86400000,step:0};r.currentLessonKey=null;r.authorizedKey=null;r.mode="route";save();touchStudy();uiSound("unlock");toast("Módulo concluído. Novo trio chegando ✅");setTimeout(showOffers,120);
}
function openRevisit(s,i){var key=rk(s,i);if(!state.lessonDone[key]){showOffers();return}var r=routeState();r.mode="revisit";r.currentLessonKey=key;save();lesson(s,i)}
function advanceRevisit(key){
  var r=routeState(),v=r.lessonReviews[key];if(v){var ints=[3,7,14,30],step=Math.min((v.step||0)+1,ints.length-1);v.step=step;v.nextReview=Date.now()+ints[step]*86400000}
  r.mode="route";r.currentLessonKey=null;save();review()
}
function revisit(){
  routeState().mode="revisit";shell("Revisitar");var c=document.querySelector("#content"),now=Date.now(),reviews=routeState().lessonReviews||{},dueLessons=Object.entries(reviews).filter(function(e){return e[1]&&e[1].nextReview<=now&&state.lessonDone[e[0]]}),wrong=QUESTIONS.filter(function(q){return state.wrong[q.uid]}),dueQ=QUESTIONS.filter(function(q){return state.answered[q.uid]&&state.answered[q.uid].nextReview<=now});
  var groups=Object.entries(MODULES).map(function(e){var s=e[0],mods=e[1],items=mods.map(function(m,i){var key=rk(s,i);return state.lessonDone[key]?'<button class="revisit-module" onclick="openRevisit(\''+s+'\','+i+')"><span>'+icon(s)+'</span><div><strong>'+esc2(m[0])+'</strong><small>'+esc2(m[1])+'</small></div><b>↗</b></button>':""}).join("");return items?'<section class="revisit-subject"><h3>'+icon(s)+' '+esc2(SUBJECTS[s][1])+'</h3><div class="revisit-list">'+items+'</div></section>':""}).join("");
  var dl=dueLessons[0]&&dueLessons[0][0],ds=dl?dl.split(":")[0]:"design",di=dl?Number(dl.split(":")[1]):0;
  c.innerHTML='<section class="content-hero card"><div><div class="eyebrow">REVISÃO FORA DA ROTA</div><h1>🔁 Revisitar</h1><p>Aqui você pode voltar a qualquer conteúdo já concluído. A trilha obrigatória não é alterada.</p></div><div class="content-hero-badge"><strong>'+dueLessons.length+'</strong><span>revisões vencidas</span></div></section><section class="grid grid-3 revisit-priority"><article class="card"><div class="eyebrow">ESPAÇADA</div><h2>'+dueLessons.length+'</h2><p>Conteúdos que chegaram ao próximo intervalo de revisão.</p><button class="btn primary" '+(dl?"":"disabled")+' onclick="openRevisit(\''+ds+'\','+di+')">Revisitar agora</button></article><article class="card"><div class="eyebrow">QUESTÕES</div><h2>'+dueQ.length+'</h2><p>Questões que já estão prontas para nova recuperação.</p><button class="btn" '+(dueQ.length?"":"disabled")+' onclick="startQuiz(shuffle(QUESTIONS.filter(function(q){return state.answered[q.uid]&&state.answered[q.uid].nextReview<=Date.now()})).slice(0,15),\'spaced-review\')">Revisar questões</button></article><article class="card"><div class="eyebrow">ERROS</div><h2>'+wrong.length+'</h2><p>Questões ainda marcadas como erro.</p><button class="btn" '+(wrong.length?"":"disabled")+' onclick="startQuiz(shuffle(QUESTIONS.filter(function(q){return state.wrong[q.uid]})).slice(0,20),\'errors\')">Corrigir erros</button></article></section><section class="card revisit-all"><div class="section-head"><div><h2>Conteúdos concluídos</h2><p>Revisite qualquer aula quando precisar reforçar um assunto.</p></div></div>'+groups+'</section>';
}
function guardedSim(){if(!allDone()){toast("A avaliação final só será liberada quando toda a trilha estiver concluída.");showOffers();return}shell("Avaliação final");document.querySelector("#content").innerHTML='<section class="route-complete card"><div class="eyebrow">ETAPA FINAL</div><h1>🎯 Avaliação completa</h1><p>Você terminou todos os módulos. Agora faça o simulado no formato da prova.</p><div class="route-complete-stat"><strong>40</strong><span>questões · 3 horas</span></div><button class="btn primary btn-big" onclick="startExam(\'final\')">Iniciar avaliação</button></section>'}
function onLesson(s,i){
  var r=routeState(),key=rk(s,i);
  if(!state.lessonDone[key]&&r.mode!=="revisit"&&r.authorizedKey!==key){toast("Você não pode pular para essa aula. Escolha uma das matérias sorteadas.");showOffers();return}
  r.currentLessonKey=key;save();baseLesson(s,i);cleanLesson();injectGate(s,i);
  if(r.mode==="revisit"&&state.lessonDone[key]){
    var b=document.querySelector(".lesson-actions .btn.primary");if(b){b.textContent="✓ Encerrar revisão";b.onclick=function(){advanceRevisit(key)}}
  }
}
var baseLesson=window.lesson;
if(typeof baseLesson==="function")window.lesson=onLesson;
window.completeLesson=finishLesson;
window.registerRouteRecall=registerRecall;
window.chooseRouteSubject=function(s){var r=routeState(),opts=currentOffer();if(opts.indexOf(s)<0){showOffers();return}var i=nextIdx(s);if(i<0){showOffers();return}r.authorizedKey=rk(s,i);r.currentLessonKey=rk(s,i);r.mode="route";save();lesson(s,i)};
window.openRevisit=openRevisit;
window.startGuided=function(){routeState().mode="route";if(allDone()){startExam("final");return}showOffers()};
window.guidedNext=function(){return allDone()?{type:"final"}:{type:"offer",options:currentOffer()}};
window.guidedAction=window.guidedNext;
window.guidedLabel=function(){if(allDone())return {eyebrow:"AVALIAÇÃO FINAL",title:"Toda a trilha foi concluída",desc:"O conteúdo foi percorrido. O próximo passo é a avaliação completa.",button:"Iniciar avaliação"};var n=currentOffer().length;return {eyebrow:"PRÓXIMA ETAPA",title:"Escolha 1 de "+n+" matérias",desc:"As opções são sorteadas pelo sistema.",button:"Ver matérias"}};
window.study=function(){var r=routeState();if(r.mode!=="revisit"&&r.currentLessonKey&&!state.lessonDone[r.currentLessonKey]){var p=r.currentLessonKey.split(":");if(r.authorizedKey===r.currentLessonKey){lesson(p[0],Number(p[1]));return}}showOffers()};
window.review=revisit;
window.sim=guardedSim;
window.startAdaptive=function(){revisit()};
window.navButtons=function(){var items={home:["⌂","Início","Seu próximo passo"],study:["📖","Trilha","Escolha guiada"],review:["🔁","Revisitar","Conteúdos concluídos"]};if(allDone())items.sim=["🎯","Avaliação","Simulado final"];return Object.entries(items).map(function(e){var id=e[0],a=e[1];return '<button class="'+(state.page===id?"active":"")+'" onclick="go(\''+id+'\')"><span class="icon">'+a[0]+'</span><span><strong>'+a[1]+'</strong><small>'+a[2]+'</small></span></button>'}).join("")};
window.moreMenu=function(){return '<div class="more-panel" id="more-panel"><div class="more-head"><div><div class="eyebrow">FERRAMENTAS</div><h3>Recursos de apoio</h3><p>Esses recursos não mudam a ordem da trilha.</p></div><button class="icon-btn" onclick="toggleMore()" aria-label="Fechar">×</button></div><div class="more-grid"><button onclick="go(\'cards\');toggleMore()"><b>🧠</b><span><strong>Flashcards</strong><small>Recuperação rápida</small></span></button><button onclick="go(\'board\');toggleMore()"><b>✏️</b><span><strong>Lousa</strong><small>Rascunhar e resolver</small></span></button><button onclick="go(\'sources\');toggleMore()"><b>📚</b><span><strong>Fontes</strong><small>Referências do estudo</small></span></button></div></div>'};
var prevGo=window.go;window.go=function(page){if(page==="train"||page==="plan"){showOffers();return}if(page==="sim"&&!allDone()){toast("Termine a trilha antes da avaliação.");showOffers();return}if(timerHandle)clearInterval(timerHandle);state.page=page;state.quiz=null;save();render()};
routeState();
})();