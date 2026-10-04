'use strict';
const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.join(__dirname,'..');
const server=http.createServer((req,res)=>{try{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.join(root,name==='/'?'index.html':name);res.setHeader('Content-Type',file.endsWith('.js')?'application/javascript':file.endsWith('.css')?'text/css':'text/html');res.end(fs.readFileSync(file));}catch{res.writeHead(404);res.end();}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));let browser;try{
 browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE,args:['--no-sandbox','--disable-dev-shm-usage']});const context=await browser.newContext({viewport:{width:1365,height:900}}),page=await context.newPage(),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:'+server.address().port);await page.locator('#cq-forced').waitFor();
 await page.evaluate(()=>CQForced.choose('pt'));await page.getByRole('heading',{name:'Entenda os conceitos desta aula'}).waitFor();
 assert.equal(await page.evaluate(()=>CQFoundations.pt.length),16);
 // Real clicks open definitions and search explanations without starting a test.
 await page.evaluate(()=>{state.subjectPath.active.mi=7;CQForced.resume()});
 await page.locator('.cq-concept summary').filter({hasText:'Transitividade, objeto direto e indireto'}).click();assert.ok(await page.getByText(/Objeto direto completa o verbo/).isVisible());
 await page.locator('.cq-lookup summary').click();await page.getByLabel('Qual palavra ou conceito?').fill('ditongo');assert.match(await page.locator('#cq-concept-results').innerText(),/mesma sílaba/);
 assert.equal(await page.evaluate(()=>state.subjectPath.active.phase),'study');
 await page.screenshot({path:'/tmp/cq-foundations-desktop.png'});
 // Test, return to lesson, close, reload and resume all retain exactly the same active session.
 await page.getByRole('button',{name:'Entendi os conceitos · começar prática →'}).click();
 let saved=await page.evaluate(()=>JSON.stringify(state.subjectPath.active));
 await page.getByRole('button',{name:'Ainda não entendi · voltar à aula'}).click();assert.ok(await page.locator('.cq-foundation').isVisible());assert.equal(await page.evaluate(()=>JSON.stringify(state.subjectPath.active)),saved);
 await page.getByRole('button',{name:'Retomar a questão →'}).click();assert.equal(await page.evaluate(()=>JSON.stringify(state.subjectPath.active)),saved);
 await page.locator('.cq-option').first().click();saved=await page.evaluate(()=>JSON.stringify(state.subjectPath.active));await page.getByRole('button',{name:'Ainda não entendi · voltar à aula'}).click();await page.getByRole('button',{name:'Retomar a questão →'}).click();assert.equal(await page.evaluate(()=>JSON.stringify(state.subjectPath.active)),saved);
 await page.getByRole('button',{name:'Sair da sessão'}).click();await page.reload();assert.equal(await page.evaluate(()=>JSON.stringify(state.subjectPath.active)),saved);
 // Exercise each Portuguese module with its actual bank through completion.
 for(let i=0;i<16;i++){
  await page.evaluate(i=>{const a=state.subjectPath.active;a.mi=i;a.phase='study';CQForced.resume();},i);
  assert.ok(await page.locator('.cq-foundation').isVisible());assert.ok(await page.locator('.cq-worked').isVisible());
  await page.evaluate(()=>CQForced.finishStudy());
  await page.evaluate(()=>{let a=state.subjectPath.active,guard=0;while(a.phase==='moduleTest'&&guard++<20){const q=QUESTIONS.find(q=>q.uid===a.qids[a.qid]);CQForced.answerModule(q.a);CQForced.nextModuleQuestion();a=state.subjectPath.active;}if(guard>=20)throw Error('stalled practice');});
 }
 // All 113 modules remain readable. All 16 new Portuguese lessons fit on mobile with every definition open.
 await page.setViewportSize({width:390,height:844});const modules=await page.evaluate(()=>Object.entries(MODULES).flatMap(([s,ms])=>ms.map((_,i)=>({s,i}))));
 for(const {s,i} of modules){await page.evaluate(({s,i})=>{const a=state.subjectPath.active;a.s=s;a.mi=i;a.phase='study';CQForced.resume();document.querySelectorAll('.cq-concept').forEach(x=>x.open=true);},{s,i});assert.equal(await page.locator('.cq-study-heading h1').count(),1);if(!(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1))){console.log(await page.evaluate(()=>[...document.querySelectorAll('body *')].filter(el=>el.getBoundingClientRect().right>innerWidth+1).map(el=>({tag:el.tagName,cls:el.className,width:el.getBoundingClientRect().width,right:el.getBoundingClientRect().right})).slice(0,15)));throw Error(s+':'+i+' overflow');}}
 await page.evaluate(()=>{const a=state.subjectPath.active;a.s='pt';a.mi=14;a.phase='study';CQForced.resume();});await page.locator('.cq-concept summary').filter({hasText:'Tritongo e hiato'}).click();await page.screenshot({path:'/tmp/cq-foundations-mobile.png',fullPage:true});
 // Review displays the same definitions, not the previous shallow text.
 await page.evaluate(()=>{state.subjectPath.active.phase='reviewStudy';save();CQForced.resume()});assert.ok(await page.locator('.cq-foundation').isVisible());
 await page.evaluate(async()=>navigator.serviceWorker.ready);await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller);await context.setOffline(true);await page.reload();await page.locator('.cq-foundation').waitFor();await context.setOffline(false);
 assert.deepEqual(errors,[]);console.log('PASS: definitions in 16 Portuguese lessons, 113 module views, real concept lookup, test/reread/resume, close/reload persistence, 16 bank practices, mobile bounds, review and offline.');
 }finally{if(browser)await browser.close();server.close();}})().catch(e=>{console.error(e);process.exitCode=1});
