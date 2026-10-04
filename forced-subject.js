/* Canedo Quest — fluxo obrigatório: ESTUDAR de verdade -> PROVA -> reforço -> próximo módulo. */
(function(){
'use strict';
const V=3, DAY=86400000;
const REVIEW_GAPS=[1,3,7,14,30].map(function(d){return d*DAY;});
const MODULE_TEST_SIZE=6, SUBJECT_TEST_SIZE=12;
const N={pt:'Português',info:'Informática',math:'Matemática',direito:'Direito',municipio:'Senador Canedo',design:'Design Gráfico'};
const I={pt:'📚',info:'💻',math:'∑',direito:'⚖️',municipio:'🏙️',design:'🎨'};
const GENERIC=/^(Como pode aparecer|Autoexplicação|Resumo de bolso|Antes de consultar|Antes de olhar|Recupere sem olhar|Teste de transferência|Recupere o mecanismo|O que você precisa saber|Como usar esta parte)/i;
const esc=function(x){return String(x==null?'':x).replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];});};
const shuffle=function(arr){arr=arr.slice();for(var i=arr.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=arr[i];arr[i]=arr[j];arr[j]=t;}return arr;};
const subjectName=function(s){return N[s]||s;};
const modKey=function(s,i){return s+':'+i;};
function mods(s){
  return (MODULES[s]||[]).map(function(m,i){
    return {s:s,i:i,key:modKey(s,i),title:m[0],desc:m[1],lesson:(LESSONS[s]||[])[i]};
  }).filter(function(x){return !!x.lesson;});
}
function subjects(){return Object.keys(MODULES||{}).filter(function(s){return mods(s).length;});}
function getQuestions(s,i){
  try{
    return (moduleQuestions(s,i)||[]).filter(function(q){
      return Array.isArray(q.o)&&q.o.length>=2&&Number.isInteger(q.a);
    });
  }catch(e){return [];}
}
function parseSections(lesson){
  return (lesson&&lesson.sections||[]).map(function(raw){
    var parts=String(raw).split('\n');
    var title=(parts.shift()||'').replace(/^[^\p{L}\p{N}]+/u,'').trim();
    return {title:title,body:parts.join('\n').trim()};
  }).filter(function(x){return x.title&&x.body&&!GENERIC.test(x.title);});
}
function paragraphs(text){
  return String(text||'').split(/\n\s*\n/).filter(Boolean).map(function(p){return '<p>'+esc(p).replace(/\n/g,'<br>')+'</p>';}).join('');
}
function save(){try{window.save&&window.save();}catch(e){}}
function award(n){try{window.addXP&&window.addXP(n);}catch(e){}}
function root(){
  var r=document.getElementById('cq-forced');
  if(!r){document.body.innerHTML='<div id="cq-forced"></div>';r=document.getElementById('cq-forced');}
  return r;
}
function path(){
  if(!state.subjectPath||state.subjectPath.v!==V){
    state.subjectPath={v:V,done:{},choice:[],active:null,reviews:{},note:''};
    save();
  }
  return state.subjectPath;
}
function completedSubjects(){
  return subjects().filter(function(s){return path().done[s]&&path().done[s].done;});
}
function dueReviews(){
  var now=Date.now(),p=path(),out=[];
  subjects().forEach(function(s){
    mods(s).forEach(function(m){
      var r=p.reviews[m.key];
      if(r&&r.completed&&r.next<=now) out.push(m);
    });
  });
  return out.sort(function(a,b){return path().reviews[a.key].next-path().reviews[b.key].next;});
}
function remainingChoices(){
  var p=path(),left=subjects().filter(function(s){return !(p.done[s]&&p.done[s].done);});
  if(!left.length){p.choice=[];return [];}
  if(Array.isArray(p.choice)){
    p.choice=p.choice.filter(function(s){return left.indexOf(s)>=0;});
    if(p.choice.length) return p.choice;
  }
  p.choice=shuffle(left).slice(0,Math.min(3,left.length));
  save();
  return p.choice;
}
function sessionHeader(label,sub){
  var a=path().active, total=a?mods(a.s).length:0, idx=a?Math.min(a.mi,total-1):0;
  var pct=total?Math.round(((idx+(a&&a.phase&&a.phase.indexOf('test')===0?0.72:0))/total)*100):0;
  return '<div class="cq-session"><button class="cq-x" onclick="CQForced.leave()" aria-label="Sair da sessão">×</button>'+
    '<div class="cq-session-title"><span>'+esc(subjectName(a?a.s:''))+'</span><strong>'+esc(sub||'')+'</strong></div>'+
    '<div class="cq-session-progress"><small>'+esc(label||'Estudo')+' · módulo '+(idx+1)+'/'+Math.max(1,total)+'</small><i><b style="width:'+Math.min(100,pct)+'%"></b></i></div></div>';
}
function page(inner,tab){
  tab=tab||'home';
  var d=dueReviews();
  root().innerHTML='<header class="cq-header">'+
    '<div class="cq-logo"><b>CQ</b><span><strong>CANEDO QUEST</strong><small>Trilha de aprovação</small></span></div>'+
    '<nav>'+
      '<button class="'+(tab==='home'?'on':'')+'" onclick="CQForced.home()">Trilha</button>'+
      '<button class="'+(tab==='reviews'?'on':'')+'" onclick="CQForced.reviews()">Revisão'+(d.length?' <em>'+d.length+'</em>':'')+'</button>'+
      '<button class="'+(tab==='errors'?'on':'')+'" onclick="CQForced.errors()">Erros</button>'+
      '<button class="'+(tab==='method'?'on':'')+'" onclick="CQForced.method()">Método</button>'+
    '</nav>'+
    '<div class="cq-count"><b>'+completedSubjects().length+'/'+subjects().length+'</b><small>matérias concluídas</small></div>'+
  '</header><main class="cq-main">'+inner+'</main>';
  window.scrollTo(0,0);
}
function home(){
  var p=path(), d=dueReviews(), all=completedSubjects().length===subjects().length;
  if(p.active){
    var a=p.active,m=mods(a.s)[a.mi];
    var action=a.phase==='study'?'Continuar estudo':a.phase==='moduleTest'||a.phase==='moduleRetry'?'Continuar prova':a.phase==='subjectTest'||a.phase==='subjectRetry'?'Continuar prova da matéria':a.phase==='reviewStudy'||a.phase==='reviewTest'||a.phase==='reviewRetry'?'Continuar revisão':'Continuar';
    return page(
      '<section class="cq-hero compact"><div><span>MATÉRIA EM ANDAMENTO</span><h1>'+esc(subjectName(a.s))+'</h1><p>Você escolheu esta matéria. Novas matérias ficam travadas até que todos os módulos e a prova de conclusão sejam feitos.</p></div>'+
      '<strong class="cq-big">'+(a.mi+1)+'<small>módulo atual</small></strong></section>'+
      '<section class="cq-gate"><div class="cq-gate-icon">'+(a.phase.indexOf('Test')>=0?'📝':a.phase.indexOf('review')>=0?'🧠':'📖')+'</div><div><span>'+esc(m&&m.title||subjectName(a.s))+'</span><h2>'+esc(action)+'</h2><p>'+esc(m&&m.desc||'Retome exatamente de onde parou.')+'</p><button class="cq-btn primary" onclick="CQForced.resume()">'+esc(action)+' →</button></div></section>',
      'home'
    );
  }
  if(d.length){
    return page(
      '<section class="cq-hero compact"><div><span>REVISÃO OBRIGATÓRIA</span><h1>Antes de liberar matéria nova, recupere o que já estudou.</h1><p>As revisões programadas fazem parte da trilha. Você não perde a matéria antiga só porque começou outra.</p></div><strong class="cq-big">'+d.length+'<small>revisões devidas</small></strong></section>'+
      '<section class="cq-gate"><div class="cq-gate-icon">🧠</div><div><span>MEMÓRIA EM MANUTENÇÃO</span><h2>Há conteúdo esperando para ser recuperado.</h2><p>'+d.slice(0,6).map(function(m){return esc(subjectName(m.s)+' · '+m.title);}).join('<br>')+'</p><button class="cq-btn primary" onclick="CQForced.startDue()">Começar revisão →</button></div></section>',
      'home'
    );
  }
  if(all){
    return page(
      '<section class="cq-hero"><div><span>TRILHA CONCLUÍDA</span><h1>Todas as matérias foram estudadas.</h1><p>Agora o percurso é de consolidação: revisar módulos, atacar erros e refazer provas antigas. O sistema não precisa mais sortear matéria nova.</p></div><strong class="cq-big">✓<small>'+subjects().length+' matérias</small></strong></section>'+
      '<section class="cq-gate"><div class="cq-gate-icon">🧠</div><div><span>PRÓXIMA FASE</span><h2>Revisão contínua</h2><p>Você pode reabrir qualquer aula completa e depois fazer a prova de revisão dela.</p><button class="cq-btn primary" onclick="CQForced.reviews()">Abrir revisão →</button></div></section>',
      'home'
    );
  }
  var c=remainingChoices();
  return page(
    '<section class="cq-hero"><div><span>PRÓXIMA MATÉRIA</span><h1>Você não escolhe o conteúdo inteiro. Escolhe só 1 de 3.</h1><p>As três opções abaixo são sorteadas entre as matérias ainda não concluídas. Depois da escolha, a matéria fica travada até terminar todos os módulos.</p><div class="cq-bar"><b style="width:'+Math.round(completedSubjects().length/Math.max(1,subjects().length)*100)+'%"></b></div><small>'+completedSubjects().length+' de '+subjects().length+' matérias concluídas</small></div><strong class="cq-big">3<small>opções</small></strong></section>'+
    '<h2 class="cq-section-title">Qual matéria você vai estudar agora?</h2>'+
    '<section class="cq-choice-grid">'+c.map(function(s,i){
      var ms=mods(s),count=ms.reduce(function(n,m){return n+getQuestions(s,m.i).length;},0);
      return '<article class="cq-choice"><span class="cq-num">0'+(i+1)+'</span><div class="cq-subject">'+(I[s]||'📘')+' '+esc(subjectName(s))+'</div><h2>'+esc(subjectName(s))+'</h2><p>'+ms.length+' módulos com aulas de conteúdo, exemplos e provas. Você só recebe novas matérias depois de fechar esta.</p><div><b>'+ms.length+'</b> módulos <b>'+count+'</b> questões no banco</div><button class="cq-btn primary" onclick="CQForced.choose(\''+s+'\')">Começar esta matéria →</button></article>';
    }).join('')+'</section>'+
    '<section class="cq-science"><b>📖 ESTUDAR ≠ RESPONDER</b><p>Cada módulo tem uma etapa separada de leitura: conceitos, exemplos, diferenças, pegadinhas e pontos que caem em prova. Só depois o botão da prova é liberado.</p></section>',
    'home'
  );
}
function choose(s){
  var p=path();
  if(subjects().indexOf(s)<0||p.done[s]||p.active)return;
  p.choice=[];
  p.active={s:s,mi:0,phase:'study',section:0,started:Date.now(),qid:0,qids:[],answers:{},retry:[],score:0,subjectQids:[],subjectAnswers:{},subjectRetry:[],reviewKey:null,reviewScheduled:false};
  save(); render();
}
function currentModule(){
  var a=path().active;if(!a)return null;
  var m=mods(a.s)[a.mi];
  return m?{a:a,m:m}:null;
}
function moduleQuestionIds(s,i,size,exclude){
  var all=shuffle(getQuestions(s,i)),seen={};
  (exclude||[]).forEach(function(x){seen[x]=true;});
  return all.filter(function(q){if(seen[q.uid])return false;seen[q.uid]=true;return true;}).slice(0,Math.min(size,all.length)).map(function(q){return q.uid;});
}
function render(){
  var c=currentModule();
  if(!c){home();return;}
  var a=c.a;
  if(a.phase==='study')study(c);
  else if(a.phase==='moduleTest')moduleTest(c,false);
  else if(a.phase==='moduleRetry')moduleTest(c,true);
  else if(a.phase==='subjectTest')subjectTest(c,false);
  else if(a.phase==='subjectRetry')subjectTest(c,true);
  else if(a.phase==='reviewStudy')reviewStudy(c);
  else if(a.phase==='reviewTest'||a.phase==='reviewRetry')reviewTest(c);
  else home();
}
function study(c){
  var a=c.a,m=c.m,sections=parseSections(m.lesson),key=m.s+':'+m.i,depth=window.CQStudyDepth&&window.CQStudyDepth[m.s]&&window.CQStudyDepth[m.s][m.i],min=(m.lesson&&m.lesson.minutes)||Math.max(8,sections.length*3);
  var foundation=window.CQFoundationUI&&CQFoundationUI.render(m.s,m.i);
  var contents=sections.map(function(x,i){
    if(foundation&&m.s==='pt'||/^Conceito central$/i.test(x.title)&&depth)return '';
    return '<article class="cq-study-block" id="cq-block-'+i+'"><div class="cq-block-kicker">PARTE '+String(i+1).padStart(2,'0')+'</div><h2>'+esc(x.title)+'</h2>'+paragraphs(x.body)+'</article>';
  }).join('');
  var focus=[];
  if(depth&&Array.isArray(depth[2]))focus=depth[2].filter(Boolean);
  else focus=(m.lesson&&m.lesson.check||[]).filter(function(x){return x&&!/^Consigo (resolver|explicar|dar|diferenciar)/i.test(x);});
  var depthHtml=foundation|| (depth?'<section class="cq-study-depth"><div class="cq-study-depth-kicker">📚 LEITURA PRINCIPAL</div><h2>Conteúdo-base para estudar antes da prova</h2><div class="cq-study-depth-text">'+paragraphs(String(depth[1]||''))+'</div>'+(focus.length?'<div class="cq-study-depth-focus"><strong>🎯 Pontos que você precisa dominar</strong><ul>'+focus.map(function(x){return '<li>'+esc(x)+'</li>';}).join('')+'</ul></div>':'')+'</section>':'');
  page(
    sessionHeader('ESTUDO','Aula do módulo')+
    '<section class="cq-study-heading"><div><span>📖 ETAPA 1 · ESTUDAR</span><h1>'+esc(m.title)+'</h1><p>'+esc(m.desc)+'</p></div><div class="cq-study-meta"><b>'+(foundation?(window.CQFoundations?.[m.s]?.[m.i]?.parts.length||1):sections.filter(function(x){return !(/^Conceito central$/i.test(x.title)&&depth)}).length)+'</b><small>partes de estudo</small><b>'+min+' min</b><small>tempo de estudo sugerido</small></div></section>'+
    '<div class="cq-study-grid"><aside class="cq-study-index"><strong>Nesta aula</strong><a href="#cq-depth"><span>01</span>Conceitos e exemplos</a>'+sections.map(function(x,i){if(foundation&&m.s==='pt'||/^Conceito central$/i.test(x.title)&&depth)return '';return '<a href="#cq-block-'+i+'"><span>'+String((depth?i+2:i+1)).padStart(2,'0')+'</span>'+esc(x.title)+'</a>';}).join('')+'<div class="cq-study-index-note">Leia primeiro o conteúdo. A prova só aparece depois que esta etapa for concluída.</div></aside>'+
      '<div class="cq-study-paper" id="cq-depth">'+depthHtml+contents+(m.s==='pt'?CQFoundationUI.lookup():'')+
        '<section class="cq-study-callout warning"><strong>⚠️ Armadilha principal</strong><p>'+esc(m.lesson.trap||'Revise a diferença central antes da prova.')+'</p></section>'+
        '<section class="cq-study-finish"><div><span>ESTUDO CONCLUÍDO?</span><h2>Agora demonstre que você consegue aplicar.</h2><p>Consegue explicar os conceitos e reconhecer os exemplos? Comece a prática quando estiver pronto. Se faltar uma base, você poderá voltar à aula.</p></div><button class="cq-btn primary" onclick="CQForced.finishStudy()">Entendi os conceitos · começar prática →</button></section>'+
      '</div></div>',
    'home'
  );
}
function finishStudy(){
  var c=currentModule();if(!c)return;
  var a=c.a,qids=moduleQuestionIds(c.m.s,c.m.i,MODULE_TEST_SIZE);
  a.studyDone=true;a.qids=qids;a.qid=0;a.answers={};a.retry=[];a.score=0;a.phase=qids.length?'moduleTest':'subjectTest';a.started=Date.now();save();render();
}
function answerModule(index){
  var c=currentModule(),a=c.a;if(!c||!a)return;
  var ids=a.phase==='moduleRetry'?a.retry:a.qids,qid=ids[a.qid],q=QUESTIONS.find(function(x){return x.uid===qid;});
  if(!q||a.answers[qid])return;
  if(!Number.isInteger(index)||index<0||index>=q.o.length)return;
  var correct=index===q.a;
  a.answers[qid]={choice:index,correct:correct};
  if(correct)a.score=(a.score||0)+1;
  try{recordAnswer(q,correct);}catch(e){}
  if(!correct&&!a.retry.includes(qid))a.retry.push(qid);
  save();render();
}
function moduleTest(c,retryMode){
  var a=c.a,ids=retryMode?a.retry:a.qids,q=QUESTIONS.find(function(x){return x.uid===ids[a.qid];});
  if(!q){return finishModuleTest(c);}
  var ans=a.answers[q.uid],pos=a.qid+1,total=ids.length;
  page(
    sessionHeader(retryMode?'REFORÇO':'PROVA DO MÓDULO','Prova')+
    '<section class="cq-test-head"><span>📝 ETAPA 2 · '+(retryMode?'ERROS DA PROVA':'PROVA DO MÓDULO')+'</span><h1>'+esc(c.m.title)+'</h1><p>'+ (retryMode?'Você errou esta questão antes. Ela volta até o conceito ficar seguro.':'Tente aplicar o que aprendeu. Se faltar uma definição, volte à aula e retome esta mesma questão.')+'</p><div class="cq-test-count">Questão '+pos+' de '+total+'</div></section>'+
    '<section class="cq-test-card"><div class="cq-question-label">'+(retryMode?'REFORÇO':'PROVA')+'</div><h2>'+esc(q.q)+'</h2><div class="cq-options">'+q.o.map(function(opt,i){
      var cls=ans?(i===q.a?'ok':i===ans.choice?'bad':''):'';
      return '<button class="cq-option '+cls+'" '+(ans?'disabled':'')+' onclick="CQForced.answerModule('+i+')"><span>'+String.fromCharCode(65+i)+'</span><b>'+esc(opt)+'</b></button>';
    }).join('')+'</div>'+
    (ans?'<div class="cq-feedback '+(ans.correct?'good':'bad')+'"><b>'+(ans.correct?'Correto.':'Incorreto — veja o raciocínio.')+'</b><p>'+esc(q.e||'Revise o conceito e a justificativa da resposta.')+'</p>'+(ans.correct?'':'<small>Esta questão entra no reforço antes de você concluir o módulo.</small>')+'</div><button class="cq-btn primary cq-next" onclick="CQForced.nextModuleQuestion()">'+(pos===total?'Concluir esta etapa':'Próxima questão')+' →</button>':'')+
    (c.m.s==='pt'&&ans?CQFoundationUI.lookup():'')+'<div class="cq-relearn"><button class="cq-btn" onclick="CQForced.relearn()">Ainda não entendi · voltar à aula</button></div></section>',
    'home'
  );
}
function nextModuleQuestion(){
  var c=currentModule(),a=c.a,ids=a.phase==='moduleRetry'?a.retry:a.qids,qid=ids[a.qid];
  if(!a.answers[qid])return;
  if(a.phase==='moduleRetry'){
    if(a.answers[qid].correct)a.retry.splice(a.qid,1);else{delete a.answers[qid];a.qid++;}
    if(!a.retry.length){finishModuleTest(c);return;}
    if(a.qid>=a.retry.length)a.qid=0;
    save();render();return;
  }
  if(a.qid<ids.length-1){a.qid++;save();render();return;}
  var needed=Math.ceil(ids.length*0.7);
  if((a.score||0)<needed){
    a.retry=ids.filter(function(id){return !a.answers[id].correct;});
    a.qid=0;a.phase='moduleRetry';save();render();return;
  }
  finishModuleTest(c);
}
function finishModuleTest(c){
  var a=c.a,m=c.m;
  if(a.retry&&a.retry.length&&a.phase==='moduleRetry')return;
  scheduleModuleReview(m,false);
  if(a.mi<mods(a.s).length-1){
    a.mi++;a.phase='study';a.studyDone=false;a.section=0;a.qids=[];a.retry=[];a.answers={};a.qid=0;a.score=0;save();award(15);render();return;
  }
  a.subjectQids=moduleQuestionIdsForSubject(a.s,SUBJECT_TEST_SIZE);
  a.subjectAnswers={};a.subjectRetry=[];a.qid=0;a.score=0;a.phase=a.subjectQids.length?'subjectTest': 'done';
  save();award(25);
  if(a.phase==='done')finishSubject(c);else render();
}
function moduleQuestionIdsForSubject(s,size){
  var all=[];
  mods(s).forEach(function(m){all=all.concat(getQuestions(s,m.i));});
  return shuffle(all).filter(function(q,i,arr){return arr.findIndex(function(x){return x.uid===q.uid;})===i;}).slice(0,size).map(function(q){return q.uid;});
}
function answerSubject(index){
  var c=currentModule(),a=c.a,ids=a.phase==='subjectRetry'?a.subjectRetry:a.subjectQids,qid=ids[a.qid],q=QUESTIONS.find(function(x){return x.uid===qid;});
  if(!q||a.subjectAnswers[qid])return;
  if(!Number.isInteger(index)||index<0||index>=q.o.length)return;
  var correct=index===q.a;a.subjectAnswers[qid]={choice:index,correct:correct};
  if(correct)a.score=(a.score||0)+1;
  try{recordAnswer(q,correct);}catch(e){}
  if(!correct&&!a.subjectRetry.includes(qid))a.subjectRetry.push(qid);
  save();render();
}
function subjectTest(c,retryMode){
  var a=c.a,ids=retryMode?a.subjectRetry:a.subjectQids,q=QUESTIONS.find(function(x){return x.uid===ids[a.qid];});
  if(!q)return finishSubject(c);
  var ans=a.subjectAnswers[q.uid],pos=a.qid+1,total=ids.length;
  page(
    sessionHeader(retryMode?'REFORÇO FINAL':'PROVA DA MATÉRIA','Conclusão')+
    '<section class="cq-test-head"><span>🏁 ETAPA 3 · PROVA DA MATÉRIA</span><h1>'+esc(subjectName(a.s))+'</h1><p>'+ (retryMode?'Última cobrança: os erros voltam antes de liberar outra matéria.':'Você terminou todos os módulos. Esta prova mistura conteúdos da matéria para verificar se consegue alternar entre assuntos.')+'</p><div class="cq-test-count">Questão '+pos+' de '+total+'</div></section>'+
    '<section class="cq-test-card"><div class="cq-question-label">'+(retryMode?'REFORÇO FINAL':'PROVA FINAL')+'</div><h2>'+esc(q.q)+'</h2><div class="cq-options">'+q.o.map(function(opt,i){
      var cls=ans?(i===q.a?'ok':i===ans.choice?'bad':''):'';
      return '<button class="cq-option '+cls+'" '+(ans?'disabled':'')+' onclick="CQForced.answerSubject('+i+')"><span>'+String.fromCharCode(65+i)+'</span><b>'+esc(opt)+'</b></button>';
    }).join('')+'</div>'+
    (ans?'<div class="cq-feedback '+(ans.correct?'good':'bad')+'"><b>'+(ans.correct?'Correto.':'Incorreto.')+'</b><p>'+esc(q.e||'Veja a explicação da questão.')+'</p></div><button class="cq-btn primary cq-next" onclick="CQForced.nextSubjectQuestion()">'+(pos===total?'Concluir prova':'Próxima questão')+' →</button>':'')+
    (a.s==='pt'&&ans?CQFoundationUI.lookup():'')+'</section>',
    'home'
  );
}
function nextSubjectQuestion(){
  var c=currentModule(),a=c.a,ids=a.phase==='subjectRetry'?a.subjectRetry:a.subjectQids,qid=ids[a.qid];
  if(!a.subjectAnswers[qid])return;
  if(a.phase==='subjectRetry'){
    if(a.subjectAnswers[qid].correct)a.subjectRetry.splice(a.qid,1);else{delete a.subjectAnswers[qid];a.qid++;}
    if(!a.subjectRetry.length){finishSubject(c);return;}
    if(a.qid>=a.subjectRetry.length)a.qid=0;
    save();render();return;
  }
  if(a.qid<ids.length-1){a.qid++;save();render();return;}
  var needed=Math.ceil(ids.length*0.7);
  if((a.score||0)<needed){
    a.subjectRetry=ids.filter(function(id){return !a.subjectAnswers[id].correct;});
    a.qid=0;a.phase='subjectRetry';save();render();return;
  }
  finishSubject(c);
}
function scheduleModuleReview(m,manual){
  var p=path();p.reviews[m.key]={completed:true,stage:0,reviews:p.reviews[m.key]?p.reviews[m.key].reviews||0:0,next:Date.now()+REVIEW_GAPS[0],manual:!!manual};save();
}
function finishSubject(c){
  var a=c.a,now=Date.now();path().done[a.s]={done:true,at:now};path().choice=[];path().active=null;save();award(40);
  page('<section class="cq-completion"><span>MATÉRIA CONCLUÍDA</span><div>✓</div><h1>'+esc(subjectName(a.s))+' foi fechada.</h1><p>Você estudou os módulos, passou pelas provas e concluiu a avaliação da matéria. Só agora novas matérias podem ser sorteadas.</p><button class="cq-btn primary" onclick="CQForced.home()">Sortear próximas 3 matérias →</button><button class="cq-btn" onclick="CQForced.reviews()">Ver revisões programadas</button></section>','home');
}
function startDue(){
  var d=dueReviews()[0];if(d)startReview(d,true);
}
function startReview(m,scheduled){
  var p=path();
  p.active={s:m.s,mi:m.i,phase:'reviewStudy',section:0,started:Date.now(),reviewKey:m.key,reviewScheduled:!!scheduled,qid:0,qids:moduleQuestionIds(m.s,m.i,Math.min(5,getQuestions(m.s,m.i).length)),answers:{},retry:[],score:0,studyDone:false};
  save();render();
}
function reviewStudy(c){
  var a=c.a,m=c.m,sections=parseSections(m.lesson);
  page(
    sessionHeader('REVISÃO','Revisão da aula')+
    '<section class="cq-study-heading"><div><span>🧠 REVISÃO · LEIA NOVAMENTE</span><h1>'+esc(m.title)+'</h1><p>Revisar também é estudar. Leia o material, relembre os exemplos e só então vá para a prova de revisão.</p></div><div class="cq-study-meta"><b>'+sections.length+'</b><small>partes para reler</small></div></section>'+
    '<div class="cq-study-paper cq-review-paper">'+(window.CQFoundationUI&&CQFoundationUI.render(m.s,m.i)||sections.map(function(x,i){return '<article class="cq-study-block"><div class="cq-block-kicker">REVISÃO '+String(i+1).padStart(2,'0')+'</div><h2>'+esc(x.title)+'</h2>'+paragraphs(x.body)+'</article>';}).join(''))+(m.s==='pt'?CQFoundationUI.lookup():'')+
    '<section class="cq-study-callout warning"><strong>⚠️ Armadilha</strong><p>'+esc(m.lesson.trap||'Revise a diferença central.')+'</p></section>'+
    '<section class="cq-study-finish"><div><span>AGORA RECUPERE</span><h2>A leitura terminou. A revisão ativa começa agora.</h2></div><button class="cq-btn primary" onclick="CQForced.beginReviewTest()">Abrir prova de revisão →</button></section></div>',
    'reviews'
  );
}
function beginReviewTest(){
  var c=currentModule();if(!c)return;
  c.a.phase='reviewTest';c.a.qid=0;c.a.answers={};c.a.retry=[];c.a.score=0;save();render();
}
function answerReview(index){
  var c=currentModule(),a=c.a,ids=a.phase==='reviewRetry'?a.retry:a.qids,qid=ids[a.qid],q=QUESTIONS.find(function(x){return x.uid===qid;});
  if(!q||a.answers[qid])return;
  if(!Number.isInteger(index)||index<0||index>=q.o.length)return;
  var correct=index===q.a;a.answers[qid]={choice:index,correct:correct};
  if(correct)a.score=(a.score||0)+1;
  try{recordAnswer(q,correct);}catch(e){}
  if(!correct&&!a.retry.includes(qid))a.retry.push(qid);
  save();render();
}
function reviewTest(c){
  var a=c.a,ids=a.phase==='reviewRetry'?a.retry:a.qids,q=QUESTIONS.find(function(x){return x.uid===ids[a.qid];});
  if(!q)return finishReview(c);
  var ans=a.answers[q.uid],pos=a.qid+1,total=ids.length;
  page(
    sessionHeader(a.phase==='reviewRetry'?'REFORÇO':'REVISÃO','Recuperação')+
    '<section class="cq-test-head"><span>🧠 '+(a.phase==='reviewRetry'?'ERRO DA REVISÃO':'PROVA DE REVISÃO')+'</span><h1>'+esc(c.m.title)+'</h1><p>Tente recuperar sem consultar. Se faltar uma base, releia a explicação e retome esta questão.</p><div class="cq-test-count">Questão '+pos+' de '+total+'</div></section>'+
    '<section class="cq-test-card"><h2>'+esc(q.q)+'</h2><div class="cq-options">'+q.o.map(function(opt,i){
      var cls=ans?(i===q.a?'ok':i===ans.choice?'bad':''):'';
      return '<button class="cq-option '+cls+'" '+(ans?'disabled':'')+' onclick="CQForced.answerReview('+i+')"><span>'+String.fromCharCode(65+i)+'</span><b>'+esc(opt)+'</b></button>';
    }).join('')+'</div>'+
    (ans?'<div class="cq-feedback '+(ans.correct?'good':'bad')+'"><b>'+(ans.correct?'Recuperou.':'Ainda precisa reforçar.')+'</b><p>'+esc(q.e||'Revise a explicação.')+'</p></div><button class="cq-btn primary cq-next" onclick="CQForced.nextReviewQuestion()">'+(pos===total?'Concluir revisão':'Próxima')+' →</button>':'')+
    (a.s==='pt'&&ans?CQFoundationUI.lookup():'')+'<div class="cq-relearn"><button class="cq-btn" onclick="CQForced.relearn()">Voltar à explicação</button></div></section>',
    'reviews'
  );
}
function nextReviewQuestion(){
  var c=currentModule(),a=c.a,ids=a.phase==='reviewRetry'?a.retry:a.qids,qid=ids[a.qid];
  if(!a.answers[qid])return;
  if(a.phase==='reviewRetry'){
    if(a.answers[qid].correct)a.retry.splice(a.qid,1);else{delete a.answers[qid];a.qid++;}
    if(!a.retry.length){finishReview(c);return;}
    if(a.qid>=a.retry.length)a.qid=0;save();render();return;
  }
  if(a.qid<ids.length-1){a.qid++;save();render();return;}
  var needed=Math.ceil(ids.length*0.7);
  if((a.score||0)<needed){a.retry=ids.filter(function(id){return !a.answers[id].correct;});a.qid=0;a.phase='reviewRetry';save();render();return;}
  finishReview(c);
}
function finishReview(c){
  var p=path(),a=c.a,r=p.reviews[a.reviewKey],now=Date.now();
  if(r){
    var pass=(a.score||0)>=Math.ceil(Math.max(1,a.qids.length)*0.7);
    if(pass){r.stage=Math.min(REVIEW_GAPS.length-1,(r.stage||0)+1);r.next=now+REVIEW_GAPS[r.stage];r.reviews=(r.reviews||0)+1;}
    else {r.next=now+REVIEW_GAPS[0];}
  }
  p.active=null;save();
  page('<section class="cq-completion"><span>REVISÃO '+((a.score||0)>=Math.ceil(Math.max(1,a.qids.length)*0.7)?'CONCLUÍDA':'REFORÇADA')+'</span><div>'+((a.score||0)>=Math.ceil(Math.max(1,a.qids.length)*0.7)?'✓':'↻')+'</div><h1>'+((a.score||0)>=Math.ceil(Math.max(1,a.qids.length)*0.7)?'Conhecimento recuperado.':'Esse módulo continua no intervalo curto.')+'</h1><p>'+esc(String(a.score||0)+'/'+String(a.qids.length)+' acertos na revisão.')+'</p><button class="cq-btn primary" onclick="CQForced.home()">Voltar à trilha →</button></section>','reviews');
}
function reviews(){
  var p=path(),groups={};
  subjects().forEach(function(s){
    var arr=mods(s).filter(function(m){return p.reviews[m.key]&&p.reviews[m.key].completed;});
    if(arr.length)groups[s]=arr;
  });
  var html=Object.keys(groups).map(function(s){
    return '<section class="cq-review-group"><h2>'+(I[s]||'📘')+' '+esc(subjectName(s))+'</h2>'+groups[s].map(function(m){
      var r=p.reviews[m.key],due=r.next<=Date.now();
      return '<article><div><b>'+esc(m.title)+'</b><small>'+esc(m.desc)+'</small><span>'+(r.reviews||0)+' revisão(ões) · '+(due?'devida agora':'programada')+'</span></div><button class="cq-btn '+(due?'primary':'')+'" onclick="CQForced.revisit(\''+m.key+'\')">'+(due?'Revisar agora':'Revisitar aula')+'</button></article>';
    }).join('')+'</section>';
  }).join('');
  page(
    '<section class="cq-hero compact"><div><span>REVISÃO E REVISITA</span><h1>Uma área separada para estudar novamente o que você já concluiu.</h1><p>Revisitar não abre matéria nova, mas mantém o conteúdo acessível. Revisões vencidas bloqueiam conteúdo novo até serem feitas.</p></div><strong class="cq-big">'+dueReviews().length+'<small>devidas</small></strong></section>'+
    (dueReviews().length?'<section class="cq-gate"><div class="cq-gate-icon">🧠</div><div><span>BLOQUEIO ATIVO</span><h2>'+dueReviews().length+' revisão(ões) precisam ser feitas.</h2><button class="cq-btn primary" onclick="CQForced.startDue()">Começar revisão →</button></div></section>':'')+
    (html||'<section class="cq-card"><h2>Nenhum módulo estudado ainda.</h2><p>Comece pela Trilha para receber três matérias.</p></section>'),
    'reviews'
  );
}
function revisit(k){
  var p=String(k).split(':'),s=p.shift(),i=Number(p.join(':')),m=mods(s)[i];
  if(m)startReview(m,false);
}
function errors(){
  var badIds=Object.keys(state.wrong||{}).filter(function(k){return state.wrong[k];});
  var arr=badIds.map(function(id){return (QUESTIONS||[]).find(function(q){return q.uid===id;});}).filter(Boolean);
  page(
    '<section class="cq-hero compact"><div><span>CADERNO DE ERROS</span><h1>Questões que mostraram onde sua recuperação falhou.</h1><p>Um erro não some quando você vê a alternativa correta. Use esta área para reler a aula e tentar de novo.</p></div><strong class="cq-big">'+arr.length+'<small>erros ativos</small></strong></section>'+
    (arr.length?'<section class="cq-error-list">'+arr.map(function(q){return '<article><div><b>'+esc(subjectName(q.s))+'</b><h3>'+esc(q.q)+'</h3><small>'+esc(q.e||'')+'</small></div><button class="cq-btn primary" onclick="CQForced.error(\''+q.uid+'\')">Estudar e refazer</button></article>';}).join('')+'</section>':'<section class="cq-card"><h2>✅ Nenhum erro pendente.</h2><p>Quando uma prova revelar um erro, ele aparece aqui.</p></section>'),
    'errors'
  );
}
function error(uid){
  var q=(QUESTIONS||[]).find(function(x){return x.uid===uid;});if(!q)return;
  var m=mods(q.s).find(function(x){return (x.lesson&&x.lesson.sections||[]).length&&((x.lesson.module===q.modules?.[0])||x.i===(q.modules?.[0]??0));});
  if(!m)m=mods(q.s)[q.modules?.[0]??0];if(!m)return;
  startReview(m,false);
  var a=path().active;a.qids=[uid];a.phase='reviewTest';a.qid=0;a.answers={};a.retry=[];save();render();
}
function method(){
  page(
    '<section class="cq-hero compact"><div><span>MÉTODO DE ESTUDO</span><h1>Conteúdo primeiro. Recuperação depois.</h1><p>A arquitetura agora separa claramente leitura/estudo de prova. A parte de estudo serve para aprender; a prova serve para verificar se você consegue recuperar e aplicar.</p></div></section>'+
    '<section class="cq-method"><article><b>01</b><h2>Estude a aula completa</h2><p>Você lê conceitos, exemplos, comparações e armadilhas do módulo antes de ver qualquer alternativa.</p></article><article><b>02</b><h2>Faça a prova sem consulta</h2><p>As questões aparecem somente depois de concluir o estudo. A explicação vem após cada tentativa.</p></article><article><b>03</b><h2>Reforce os erros</h2><p>Questões erradas retornam antes da conclusão e continuam disponíveis no caderno de erros.</p></article><article><b>04</b><h2>Revise em intervalos</h2><p>Módulos concluídos voltam em 1, 3, 7, 14 e 30 dias conforme o resultado das revisões.</p></article></section>',
    'method'
  );
}
function relearn(){
  var c=currentModule();if(!c)return;
  study(c);
  var finish=document.querySelector('.cq-study-finish');
  if(finish)finish.innerHTML='<div><span>RELEITURA</span><h2>Volte ao ponto que ficou confuso.</h2><p>Sua questão e suas respostas continuam salvas.</p></div><button class="cq-btn primary" onclick="CQForced.resume()">Retomar a questão →</button>';
}
function resume(){render();}
function leave(){
  save();home();
}
function boot(){
  try{if(state.quiz)state.quiz=null;}catch(e){}
  try{state.guideView=false;}catch(e){}
  path();
  if(path().active)render();else home();
}
window.CQForced={
  relearn:relearn,home:home,reviews:reviews,errors:errors,method:method,choose:choose,resume:resume,leave:leave,
  finishStudy:finishStudy,answerModule:answerModule,nextModuleQuestion:nextModuleQuestion,
  answerSubject:answerSubject,nextSubjectQuestion:nextSubjectQuestion,
  startDue:startDue,revisit:revisit,error:error,
  beginReviewTest:beginReviewTest,answerReview:answerReview,nextReviewQuestion:nextReviewQuestion
};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',boot,{once:true});else boot();
})();