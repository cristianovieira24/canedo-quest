/* One concept per screen; saved attempts, delayed retries and explicit retrieval practice. */
(function(){
'use strict';
const fullLesson=window.lesson,previousRender=window.render,previousGo=window.go,previousReview=window.review;
const route=['design:0','design:1','pt:0','math:3','design:2','design:3','info:0','direito:0','design:4','design:5','pt:5','municipio:3','design:6','design:7','math:5','info:5','design:8','design:9','pt:7','math:1','design:18','design:31','info:1','direito:16','design:16','design:22','pt:11','math:10','info:7','math:11','pt:2','info:13','math:13','math:15'];
const shortNames={design:'Design',pt:'Português',math:'Matemática',info:'Informática',direito:'Direito',municipio:'Município'};
const cloneStep=x=>JSON.parse(JSON.stringify(x));
const isQuestion=st=>st?.type==='choice'||st?.type==='input';
const norm=v=>String(v).normalize('NFC').trim().toLowerCase().replace(/\s+/g,' ');
const keyOf=g=>`${g.s}:${g.i}`;
function progress(){return state.guidedProgress||(state.guidedProgress={});}
function splitText(text,max=370){
 const sentences=String(text).split(/(?<=[.!?])\s+/u);const result=[];let chunk='';
 for(let phrase of sentences){phrase=phrase.trim();if(!phrase)continue;if(chunk&&(chunk+' '+phrase).length>max){result.push(chunk);chunk='';}if(phrase.length>max){if(chunk){result.push(chunk);chunk='';}const words=phrase.split(/\s+/);for(const word of words){if((chunk+' '+word).length>max&&chunk){result.push(chunk);chunk='';}chunk+=(chunk?' ':'')+word;}}else chunk+=(chunk?' ':'')+phrase;}
 if(chunk)result.push(chunk);return result;
}
function bankStep(q){return {type:'choice',title:q.q,options:q.o,answer:q.a,explain:q.o.map(()=>q.e),bankId:q.uid,bankVisual:q.visual||null,text:'Aplique ao caso. Leia a situação antes de escolher.'};}
function pack(s,i){
 const key=`${s}:${i}`,custom=CQGuideContent[key];if(custom)return {...custom,steps:custom.steps.map(cloneStep)};
 const L=LESSONS[s][i],steps=[];
 const useful=(L.sections||[]).filter(x=>!/(Como pode aparecer|Autoexplicação|Resumo de bolso|Antes de consultar|Antes de olhar)/i.test(x.split('\n')[0]));
 for(const section of useful){const [raw,...body]=section.split('\n');const title=raw.replace(/^[^\p{L}\p{N}]+/u,'');const chunks=splitText(body.join('\n'));chunks.forEach((text,j)=>steps.push({type:'teach',title:title+(j?' · continuação':''),text}));}
 const qs=moduleQuestions(s,i).slice(0,3);if(qs.length){const middle=Math.max(1,Math.floor(steps.length/2));steps.splice(middle,0,bankStep(qs[0]));qs.slice(1).forEach(q=>steps.push(bankStep(q)));}
 if(!steps.length)steps.push({type:'teach',title:MODULES[s][i][0],text:MODULES[s][i][1]});
 return {goal:MODULES[s][i][1],summary:L.trap||L.summary||MODULES[s][i][1],steps,source:L.source};
}
function valid(g){if(!g||!MODULES[g.s]?.[g.i]||!Number.isInteger(g.pos)||g.pos<0||!Array.isArray(g.retry)||!g.answers||!g.passed||!g.orders||!g.first||!g.recorded)return false;const p=pack(g.s,g.i);if(g.pos>p.steps.length||g.retry.some(j=>!isQuestion(p.steps[j])))return false;for(const [key,order] of Object.entries(g.orders)){const st=p.steps[Number(key)];if(st?.type!=='choice'||order.length!==st.options.length||new Set(order).size!==order.length||order.some(j=>j<0||j>=st.options.length))return false;}for(const [key,a] of Object.entries(g.answers)){const st=p.steps[Number(key)];if(!isQuestion(st)||st.type==='choice'&&(!Number.isInteger(a.value)||a.value<0||a.value>=st.options.length))return false;}return true;}
function next(){const p=progress();for(const key of route){if(!p[key]?.completed){const [s,i]=key.split(':');return {s,i:Number(i)}}}return guidedNext();}
function due(){return Object.entries(progress()).filter(([key,v])=>v.completed&&v.nextReview<=Date.now()&&v.nextReview>0&&CQGuideContent[key]).sort((a,b)=>a[1].nextReview-b[1].nextReview)[0];}
function current(){const g=state.guided;if(!valid(g))return null;const p=pack(g.s,g.i),index=g.phase==='retry'?g.retry[0]:g.pos;return {g,p,index,step:p.steps[index]};}
function open(s,i,restart=false,reviewOnly=false){
 if(!MODULES[s]?.[i])return;if(timerHandle)clearInterval(timerHandle);state.quiz=null;state.page='study';state.guideView=true;
 if(restart||!valid(state.guided)||state.guided.s!==s||state.guided.i!==i||state.guided.phase==='done'){
 const p=pack(s,i);state.guided={s,i,pos:0,phase:'main',answers:{},passed:{},orders:{},retry:[],first:{},recorded:{},started:Date.now(),reviewOnly};
 if(reviewOnly){state.guided.phase='retry';state.guided.pos=p.steps.length;state.guided.retry=p.steps.map((st,j)=>isQuestion(st)?j:null).filter(j=>j!==null);}
 }
 save();renderGuide();
}
function begin(){if(valid(state.guided)&&state.guided.phase!=='done'){state.page='study';state.guideView=true;state.quiz=null;save();renderGuide();return;}const d=due();if(d){const [s,i]=d[0].split(':');open(s,Number(i),true,true);return;}const n=next();if(n.s!==undefined)open(n.s,n.i);else startAdaptive();}
function frame(g,p){shell(shortNames[g.s]+' · estudo guiado');document.body.classList.add('guide-focus');const total=p.steps.length;return `<div class="g-study"><header class="g-top"><button class="g-icon" onclick="CQGuide.pause()" aria-label="Pausar aula e voltar ao início">×</button><div class="g-track" role="progressbar" aria-label="Passos da aula" aria-valuemin="0" aria-valuemax="${total}" aria-valuenow="${g.pos}"><span style="width:${Math.round(g.pos/total*100)}%"></span></div><span class="g-step-count">${g.phase==='retry'?'Reforço':g.phase==='done'?'Concluído':`${Math.min(g.pos+1,total)}/${total}`}</span></header>`;}
function renderGuide(){
 const c=current();if(!c){state.guideView=false;state.guided=null;save();previousRender();return;}
 const {g,p,index,step}=c;if(g.phase==='done'){renderDone(g,p);return;}if(window.CQChapter&&!g.reviewOnly&&!g.practiceMode){CQChapter.render(g,p);return;}if(!step){finish();return;}
 const key=String(index),a=g.answers[key];if(step.type==='choice'&&!g.orders[key]){g.orders[key]=shuffle(step.options.map((_,j)=>j));save();}
 let body=frame(g,p)+(!g.reviewOnly?`<button class="g-back ch-practice-return" onclick="CQGuide.showChapters()">← Capítulos de ${esc(MODULES[g.s][g.i][0])}</button>`:'')+`<main class="g-card"><div class="g-kicker">${g.phase==='retry'?'VAMOS RETOMAR':isQuestion(step)?'SUA VEZ':'OBSERVE E ENTENDA'} <span>· ${esc(shortNames[g.s])}</span></div><h1 tabindex="-1" id="g-title">${esc(step.title)}</h1>${step.text?`<p class="g-copy">${esc(step.text)}</p>`:''}`;
 if(step.visual)body+=CQGuideVisual.render(step.visual);
 if(step.bankVisual){const q=QUESTIONS.find(q=>q.uid===step.bankId);if(q&&typeof window.renderQuestionVisual==='function')body+=window.renderQuestionVisual(q);else if(q&&typeof q.visual==='string')body+=`<div class="g-bank-image">${q.visual}</div>`;}
 if(step.type==='choice')body+=`<div class="g-choices">${g.orders[key].map((j,n)=>`<button class="g-choice ${a?(a.value===j?'chosen ':'')+(j===step.answer?'is-correct':a.value===j?'is-wrong':''):''}" ${a?'disabled':''} onclick="CQGuide.answer(${j})"><span class="g-choice-number">${n+1}</span><span>${esc(step.options[j])}</span>${a&&j===step.answer?'<span class="g-choice-mark">✓</span>':''}</button>`).join('')}</div>`;
 if(step.type==='input')body+=`<form class="g-answer-form" onsubmit="event.preventDefault();CQGuide.answer(document.getElementById('g-answer').value)"><label for="g-answer">Sua resposta</label><div><input id="g-answer" autocomplete="off" maxlength="160" ${a?'disabled':''} value="${a?esc(a.value):''}" inputmode="decimal" placeholder="Digite aqui"><button class="g-primary" ${a?'disabled':''}>Conferir</button></div></form>`;
 if(a){const explanation=step.type==='choice'?step.explain[a.value]:step.explain;body+=`<section class="g-feedback ${a.correct?'good':'again'}" role="status"><strong>${a.correct?'Isso mesmo.':'Vamos entender esse ponto.'}</strong><p>${esc(explanation||'Compare o raciocínio com a referência.')}</p>${!a.correct?`<p class="g-answer-reference">Resposta: ${esc(step.type==='choice'?step.options[step.answer]:step.accepted[0])}</p><small>Esse ponto volta no reforço antes de concluir.</small>`:''}</section>`;}
 body+=`</main><footer class="g-footer"><button class="g-back" onclick="CQGuide.back()" ${g.pos===0||g.phase==='retry'?'disabled':''}>← Voltar</button><button class="g-primary" onclick="CQGuide.advance()" ${isQuestion(step)&&!a?'disabled':''}>${a&&!a.correct?'Entendi. Continuar':'Continuar'} →</button></footer><div class="g-secondary"><button onclick="CQGuide.reference('${g.s}',${g.i})">Consultar aula completa</button><span>Seu ponto fica salvo.</span></div></div>`;
 document.querySelector('#content').innerHTML=body;CQGuideVisual.mount();window.scrollTo(0,0);document.getElementById('g-title')?.focus({preventScroll:true});
}
function answer(value){
 const c=current();if(!c)return;const {g,step,index}=c;if(!isQuestion(step)||g.answers[index])return;
 if(step.type==='choice'&&(!Number.isInteger(value)||value<0||value>=step.options.length))return;
 if(step.type==='input'&&!String(value).trim())return;
 const correct=step.type==='choice'?value===step.answer:step.accepted.some(x=>norm(x)===norm(value));
 g.answers[index]={value,correct};if(!(index in g.first))g.first[index]=correct;
 if(correct)g.passed[index]=true;else {delete g.passed[index];if(!g.retry.includes(index))g.retry.push(index);}
 if(step.bankId&&!g.recorded[index]){const q=QUESTIONS.find(q=>q.uid===step.bankId);if(q){recordAnswer(q,correct);g.recorded[index]=true;}}
 save();renderGuide();
}
function advance(){const c=current();if(!c||!c.step)return;const {g,step,index,p}=c;if(isQuestion(step)&&!g.answers[index])return;
 if(g.phase==='retry'){g.retry.shift();if(!g.passed[index])g.retry.push(index);if(g.retry.length){delete g.answers[g.retry[0]];delete g.orders[g.retry[0]];}else {finish();return;}}
 else {g.pos++;if(g.practiceMode)while(g.pos<p.steps.length&&!isQuestion(p.steps[g.pos]))g.pos++;if(g.pos>=p.steps.length){g.retry=g.retry.filter(j=>!g.passed[j]);if(g.retry.length){g.phase='retry';delete g.answers[g.retry[0]];delete g.orders[g.retry[0]];}else{finish();return;}}}
 save();renderGuide();}
function finish(){
 const g=state.guided;if(!valid(g)||g.phase==='done')return;const p=pack(g.s,g.i);if(p.steps.some((st,j)=>isQuestion(st)&&!g.passed[j]))return;
 const key=keyOf(g),old=progress()[key]||{},first=Object.values(g.first),right=first.filter(Boolean).length;const reviews=(old.reviews||0)+(g.reviewOnly?1:0);
 progress()[key]={completed:true,completedAt:Date.now(),firstRight:right,firstTotal:first.length,nextReview:Date.now()+(right<first.length?86400000:(reviews<1?86400000:reviews===1?3*86400000:7*86400000)),reviews};
 if(!state.lessonDone[key]){state.lessonDone[key]=true;addXP(12);}g.phase='done';g.pos=p.steps.length;touchStudy();save();renderDone(g,p);
}
function renderDone(g,p){const first=Object.values(g.first),right=first.filter(Boolean).length;
 document.querySelector('#content');const body=frame(g,p)+`<main class="g-card g-done"><span class="g-done-mark">✓</span><div class="g-kicker">UMA ETAPA CONCLUÍDA</div><h1>Você praticou o mecanismo.</h1><p class="g-copy">${esc(p.summary)}</p><div class="g-result"><strong>${right}/${first.length}</strong><span>acertos na primeira tentativa${right<first.length?'<br>Os erros foram retomados antes de concluir.':''}</span></div><p class="g-quiet">Uma revisão curta fica agendada para conferir o que permaneceu na memória.</p><button class="g-primary" onclick="CQGuide.nextLesson()">Próximo passo →</button><button class="g-back" onclick="CQGuide.pause()">Encerrar por agora</button>${p.source?`<a class="g-source" href="${esc(p.source)}" target="_blank" rel="noopener">Consultar fonte desta aula ↗</a>`:''}</main></div>`;document.querySelector('#content').innerHTML=body;window.scrollTo(0,0);
}
function reference(s,i){state.guideView=false;document.body.classList.remove('guide-focus');fullLesson(s,i);document.querySelector('.lesson-top')?.insertAdjacentHTML('afterend',`<div class="g-reference-return"><button class="g-primary" onclick="CQGuide.open('${s}',${i})">Voltar aos capítulos →</button></div>`);}
function home(){
 shell('Seu próximo passo');const g=valid(state.guided)&&state.guided.phase!=='done'?state.guided:null,d=!g?due():null,n=g||d?g||{s:d[0].split(':')[0],i:Number(d[0].split(':')[1])}:next();
 const known=n.s!==undefined,p=known?pack(n.s,n.i):null,completed=Object.values(progress()).filter(x=>x.completed).length;
 document.querySelector('#content').innerHTML=`<div class="g-home"><div class="g-home-heading"><span class="g-kicker">CANEDO QUEST</span><h1>Um passo. Depois, o próximo.</h1><p>Veja o exemplo, tente resolver e entenda o porquê.</p></div><section class="g-mission"><div><span class="g-mission-tag">${g?'CONTINUE DE ONDE PAROU':d?'HORA DE RECUPERAR':'SEU PRÓXIMO PASSO'}</span><p class="g-subject-label">${known?esc(shortNames[n.s]):'Treino misto'}</p><h2>${known?esc(MODULES[n.s][n.i][0]):'Consolide com questões'}</h2><p>${p?esc(p.goal):'Pratique os pontos que ainda precisam de atenção.'}</p><div class="g-mission-meta">${p?`4 capítulos · explicação, exemplos e prática`:'Questões de todas as matérias'}</div><button class="g-primary" onclick="CQGuide.begin()">${g?'Continuar':d?'Revisar agora':'Começar'} →</button></div><div class="g-mission-art" aria-hidden="true"><div></div><div></div><div></div><span>perceber<br>entender<br>aplicar</span></div></section><div class="g-home-bottom"><span><b>${completed}</b> aulas praticadas no percurso guiado</span><button class="g-back" onclick="go('study')">Explorar matérias →</button></div>${!progress()['design:1']?.completed&&!(n.s==='design'&&n.i===1)?'<button class="g-spotlight" onclick="CQGuide.open(\'design\',1)"><span>Experimente uma aula visual</span><strong>Gestalt: veja os grupos se formando →</strong></button>':''}<p class="g-home-tools">Simulados, revisão e ferramentas continuam no menu.</p></div>`;
}
window.review=function(){previousReview();const d=due();if(d){document.querySelector('#content').insertAdjacentHTML('afterbegin','<section class="g-review-due"><strong>Recupere o que aprendeu nas aulas</strong><p>Uma revisão curta do percurso guiado está pronta.</p><button class="g-primary" onclick="CQGuide.reviewDue()">Revisar a aula →</button></section>');}};
window.lesson=open;window.home=home;window.startGuided=begin;
window.go=function(page){document.body.classList.remove('guide-focus');state.guideView=false;previousGo(page);};
window.render=function(){if(state.page==='study'&&state.guideView&&valid(state.guided)&&!state.quiz){renderGuide();return;}document.body.classList.remove('guide-focus');previousRender();};
window.CQGuide={startPractice(){const g=state.guided;if(!valid(g))return;g.practiceMode=true;const p=pack(g.s,g.i);if(g.phase==='main')while(g.pos<p.steps.length&&!isQuestion(p.steps[g.pos]))g.pos++;save();renderGuide();},showChapters(){state.guided.practiceMode=false;save();renderGuide();},reviewDue(){const d=due();if(d){const [s,i]=d[0].split(':');open(s,Number(i),true,true);}},open,begin,pack,next,answer,advance,fullLesson,reference,render:renderGuide,pause(){state.guideView=false;go('home');},back(){const g=state.guided;if(valid(g)&&g.phase==='main'&&g.pos>0){g.pos--;if(g.practiceMode)while(g.pos>0&&!isQuestion(pack(g.s,g.i).steps[g.pos]))g.pos--;if(g.practiceMode&&!isQuestion(pack(g.s,g.i).steps[g.pos])){g.practiceMode=false;}save();renderGuide();}},nextLesson(){const n=next();if(n.s!==undefined)open(n.s,n.i,true);else {state.guideView=false;go('home');}}};
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>render(),{once:true});else render();
})();
