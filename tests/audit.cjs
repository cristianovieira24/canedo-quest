'use strict';
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const root=path.join(__dirname,'..'),content={innerHTML:''};
const element=()=>({innerHTML:'',textContent:'',style:{},classList:{add(){},remove(){},toggle(){}},insertAdjacentHTML(){},setAttribute(){},prepend(){}});
const saved=new Map(),intervals=[];
const ctx={console,Date,Math,setInterval:f=>(intervals.push(f),intervals.length),clearInterval(){},setTimeout:()=>0,clearTimeout(){},localStorage:{getItem:k=>saved.get(k)||null,setItem:(k,v)=>saved.set(k,v)},document:{body:element(),querySelector:s=>s==='#content'?content:s==='#toast'?element():null,querySelectorAll:()=>[],addEventListener(){}},navigator:{userAgent:''},addEventListener(){}};
ctx.window=ctx;vm.createContext(ctx);
for(const file of ['state-validation.js','app.js','visual-questions.js','content-boost.js','curriculum.js','module-map.js','rapid.js']){
 let code=fs.readFileSync(path.join(root,file),'utf8').replace(/\nrender\(\);?/g,'\n');vm.runInContext(code,ctx,{filename:file});
}
const run=code=>vm.runInContext(code,ctx),plain=v=>JSON.parse(JSON.stringify(v));
const bank=plain(run('QUESTIONS')),mods=plain(run('MODULES')),lessons=plain(run('LESSONS'));
assert.equal(bank.length,526);assert.equal(new Set(bank.map(q=>q.uid)).size,bank.length);
for(const q of bank){assert.equal(q.o.length,4,q.uid);assert.equal(new Set(q.o.map(v=>v.normalize('NFC').trim().toLowerCase())).size,4,q.uid);assert.ok(Number.isInteger(q.a)&&q.a>=0&&q.a<4,q.uid);assert.ok(q.e.length,q.uid);assert.ok(q.modules.length,q.uid);for(const i of q.modules)assert.ok(mods[q.s][i],q.uid);}
for(const [s,arr] of Object.entries(mods))assert.equal(arr.length,lessons[s].length,s);
assert.equal(Object.values(mods).flat().length,113);
const corrected={q198:'14',q199:'15',q200:'21',q201:'27',q202:'28'};
for(const [id,value] of Object.entries(corrected)){const q=bank.find(q=>q.uid===id);assert.equal(q.o[q.a],value);}
const stems=new Map();for(const q of bank){const k=q.q.normalize('NFC').replace(/\s+/g,' ').trim();assert.ok(!stems.has(k),'duplicate '+q.uid);stems.set(k,q.uid);}
assert.ok(run("moduleQuestions('info',11).some(q=>q.t==='E-mail')"));assert.ok(!run("moduleQuestions('info',11).some(q=>q.t==='Backup')"));
assert.ok(run("moduleQuestions('direito',12).every(q=>q.t.includes('5'))"));
assert.ok(run("moduleQuestions('math',15).every(q=>q.t==='Conjuntos')"));
// One click is one attempt; finalization and reload are idempotent.
run("state=clone(DEFAULT);render=()=>{};renderQuiz=()=>{};renderQuizResult=()=>{};startQuiz([QUESTIONS[0]],'practice');answer(QUESTIONS[0].a)");
const xp=run('state.xp');assert.equal(run('state.answered[QUESTIONS[0].uid].attempts'),1);run('finalizeQuiz();finalizeQuiz()');assert.equal(run('state.xp'),xp);assert.equal(run('state.history.length'),1);assert.equal(run('state.answered[QUESTIONS[0].uid].attempts'),1);
// An unanswered question is counted once, answered practice items aren't counted twice.
run("state=clone(DEFAULT);startQuiz(QUESTIONS.slice(0,2),'practice');answer(QUESTIONS[0].a);finalizeQuiz()");assert.equal(run('state.mastery.pt.total'),2);
// Failure resets review spacing regardless of historical attempt count.
run("state=clone(DEFAULT);for(let i=0;i<10;i++)recordAnswer(QUESTIONS[0],false);recordAnswer(QUESTIONS[0],true)");assert.equal(run('state.answered[QUESTIONS[0].uid].correctStreak'),1);assert.ok(Math.abs(run('state.answered[QUESTIONS[0].uid].nextReview-Date.now()')-600000)<1000);
// Exam answer changes do not score until delivery.
run("state=clone(DEFAULT);startQuiz(QUESTIONS.slice(0,2),'exam');answer(1);answer(0)");assert.equal(run('state.xp'),0);assert.equal(run('state.quiz.answers[QUESTIONS[0].uid]'),0);run('finalizeQuiz()');assert.equal(run('state.mastery.pt.total'),2);
// Both exam variants retain 10 Portuguese, 10 other general, 20 Design; no duplicates.
for(const type of ['final','hard'])for(let i=0;i<30;i++){run(`state=clone(DEFAULT);startExam('${type}')`);const qs=plain(run('state.quiz.qs.map(id=>QUESTIONS.find(q=>q.uid===id))'));assert.equal(qs.length,40);assert.equal(new Set(qs.map(q=>q.uid)).size,40);assert.equal(qs.filter(q=>q.s==='pt').length,10);assert.equal(qs.filter(q=>q.s==='design').length,20);}
// Stable per-session shuffled choices. Correctness still uses original indexes.
const orders=new Set();for(let i=0;i<50;i++){run("startQuiz([QUESTIONS[0]],'exam')");orders.add(run('state.quiz.optionOrders[QUESTIONS[0].uid].join()'));}assert.ok(orders.size>=4);const stored=run('JSON.stringify(state.quiz.optionOrders)');run('save();state=loadState()');assert.equal(run('JSON.stringify(state.quiz.optionOrders)'),stored);
run("state=clone(DEFAULT);startFreshExam()");assert.equal(run('state.quiz.mode'),'diagnostic');
run("state=clone(DEFAULT);startQuiz([])");assert.equal(run('state.quiz'),null);
run("state=clone(DEFAULT);completeLesson('design',0)");assert.equal(run('guidedNext().s'),'pt');
// Dashboard must reach 100% and its ring must reflect the displayed percentage.
run("state=clone(DEFAULT);Object.entries(MODULES).forEach(([s,ms])=>ms.forEach((_,i)=>state.lessonDone[s+':'+i]=true));QUESTIONS.forEach(q=>state.answered[q.uid]={correct:true});home()");assert.ok(content.innerHTML.includes('<strong>100%</strong>'));assert.ok(content.innerHTML.includes('var(--accent) 0 100%'));
run("state.streak=8;state.lastStudy='2020-01-01';home()");assert.equal(run('currentStreak()'),0);assert.ok(content.innerHTML.includes('<strong>0</strong><small>dias de sequência'));
// Validate old-format exports, reject corruption and prototype pollution.
assert.equal(run('validateProgress(clone(DEFAULT)).xp'),0);
for(const value of ['[]','null','{xp:"100"}','{mastery:{pt:null}}','{quiz:{qs:[]}}','{settings:{sound:{}}}',`JSON.parse('{"__proto__":{"polluted":true}}')`])assert.throws(()=>run(`validateProgress(${value})`));
assert.equal(run('({}).polluted'),undefined);
const before=run('state.xp');ctx.localStorage.setItem=()=>{throw new Error('quota')};assert.equal(run('save()'),false);assert.equal(run('state.xp'),before);
// Re-create render functions in a separate context to inspect generated quiz HTML.
let app=fs.readFileSync(path.join(root,'app.js'),'utf8');const line=app.split('\n').find(l=>l.startsWith('function renderQuiz('));run(line);
run("state=clone(DEFAULT);startQuiz([QUESTIONS[0]],'exam');answer(QUESTIONS[0].a);renderQuiz()");assert.ok(!content.innerHTML.includes('choice correct'));assert.ok(!content.innerHTML.includes('choice wrong'));assert.ok(content.innerHTML.includes('choice  selected'));assert.ok(content.innerHTML.includes('Entregar simulado agora'));
// Review handlers execute in global scope just as inline onclick does.
run("state=clone(DEFAULT);recordAnswer(QUESTIONS[0],false);state.answered[QUESTIONS[0].uid].nextReview=0;recordAnswer(QUESTIONS[1],false);review()");
const handlers=[...content.innerHTML.matchAll(/onclick="([^"]*startQuiz[^\"]*)"/g)].map(m=>m[1].replace(/&amp;/g,'&').replace(/&lt;/g,'<').replace(/&gt;/g,'>'));
assert.equal(handlers.length,4);for(const h of handlers)assert.doesNotThrow(()=>run(h),h);
// Generated math alternatives must not offer two equivalent numerical answers or filler.
run('state=clone(DEFAULT)');for(let i=0;i<1000;i++){const q=plain(run('CQRapidTest.getQuestion()'));assert.equal(q.o.length,4);assert.ok(!q.o.some(o=>o.startsWith('Outra opção')));assert.ok(q.o[q.a]);}
assert.equal(run("CQRapidTest.makeQuestion({answer:'1/2',wrong:['2/4','1/3','3/4']})"),null);
// Every referenced shell asset exists; cleanup is scoped to this app.
const sw=fs.readFileSync(path.join(root,'sw.js'),'utf8');for(const match of sw.matchAll(/'\.\/([^']+)'/g))assert.ok(fs.existsSync(path.join(root,match[1])),match[1]);assert.ok(sw.includes("k.startsWith('canedo-quest-')"));
console.log('PASS: 526 questões, 113 aulas, gabaritos corrigidos, vínculos explícitos, pontuação única, revisão, simulados, importação, opções e 1000 questões rápidas.');
for(const [s,arr] of Object.entries(mods)){const pools=arr.map((m,i)=>({title:m[0],questions:bank.filter(q=>q.s===s&&q.modules.includes(i)).length}));console.log(s,JSON.stringify(pools));}
