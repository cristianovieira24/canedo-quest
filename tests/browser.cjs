/* Usage: PLAYWRIGHT_MODULE=/path/to/playwright CHROMIUM_EXECUTABLE=/path/to/chromium node tests/browser.cjs
   Optional AGENT_BROWSER_BIN verifies the server using the installed CLI before the tests. */
'use strict';
const fs=require('node:fs'),http=require('node:http'),path=require('node:path'),assert=require('node:assert/strict'),{execFile}=require('node:child_process'),{promisify}=require('node:util');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.join(__dirname,'..'),shots=process.env.SCREENSHOT_DIR||'/tmp/canedo-qa';fs.mkdirSync(shots,{recursive:true});
const types={'.html':'text/html','.js':'application/javascript','.css':'text/css','.png':'image/png','.webmanifest':'application/manifest+json'};
const server=http.createServer((req,res)=>{const name=decodeURIComponent(req.url.split('?')[0]);const file=path.join(root,name==='/'?'index.html':name);if(!file.startsWith(root+path.sep)){res.writeHead(403);res.end();return;}try{const data=fs.readFileSync(file);res.writeHead(200,{'Content-Type':types[path.extname(file)]||'text/plain'});res.end(data)}catch{res.writeHead(404);res.end('Not found')}});
(async()=>{await new Promise(r=>server.listen(0,'127.0.0.1',r));const url=`http://127.0.0.1:${server.address().port}/`;let browser;
 try{
  if(process.env.AGENT_BROWSER_BIN){try{const result=await promisify(execFile)(process.env.AGENT_BROWSER_BIN,['--executable-path',process.env.CHROMIUM_EXECUTABLE,'open',url],{timeout:20000});console.log('agent-browser',result.stdout);await promisify(execFile)(process.env.AGENT_BROWSER_BIN,['snapshot','-i'],{timeout:10000});}catch(e){console.log('agent-browser unavailable:',e.stderr||e.message,'; verifying through Playwright.')}}
  browser=await chromium.launch({executablePath:process.env.CHROMIUM_EXECUTABLE||undefined,headless:true,args:['--no-sandbox','--disable-dev-shm-usage','--use-gl=angle','--use-angle=swiftshader']});
  const ctx=await browser.newContext({viewport:{width:1365,height:900}}),page=await ctx.newPage(),errors=[];page.setDefaultTimeout(8000);
  page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text())});
  await page.goto(url);await page.waitForSelector('h1');assert.ok((await page.locator('h1').innerText()).includes('Um passo'));await page.waitForTimeout(350);await page.screenshot({path:path.join(shots,'home-desktop.png')});
  const modules=await page.evaluate(()=>Object.entries(MODULES).flatMap(([s,mods])=>mods.map((m,i)=>({s,i,title:m[0]}))));
  for(const m of modules){await page.evaluate(({s,i})=>CQGuide.reference(s,i),m);assert.equal(await page.locator('.lesson h1').innerText(),m.title);assert.equal(await page.locator('#transfer-recall').count(),1);assert.equal(await page.locator('.lesson-visual-card,.learning-lab').count()>0,true);}
  console.log('Desktop lessons passed');assert.equal(modules.length,113);assert.deepEqual(errors,[]);
  await page.evaluate(()=>CQGuide.reference('design',8));await page.locator('#rgb-G').fill('255');assert.equal(await page.locator('#rgb-result').innerText(),'RGB(255, 255, 0)');await page.screenshot({path:path.join(shots,'colors-desktop.png'),fullPage:true,timeout:60000});
  await page.evaluate(()=>CQGuide.reference('math',3));await page.locator('#lab-0').fill('96');await page.getByRole('button',{name:'Conferir raciocínio'}).first().click();assert.ok((await page.locator('#lab-feedback-0').innerText()).startsWith('Correto.'));
  // Genuine click flow: the HTML handlers must resolve global state.
  await page.evaluate(()=>{state=clone(DEFAULT);recordAnswer(QUESTIONS[0],false);recordAnswer(QUESTIONS[1],false);state.answered[QUESTIONS[0].uid].nextReview=0;review()});
  await page.getByRole('button',{name:'Revisar erros',exact:true}).click();assert.equal(await page.locator('.choices .choice').count(),4);
  // Scoring once using visible choice text. Stable shuffled order survives reload.
  await page.evaluate(()=>{state=clone(DEFAULT);startQuiz([QUESTIONS[0]],'practice')});
  await page.getByRole('button',{name:/inferência/}).click();const xp=await page.evaluate(()=>state.xp);await page.getByRole('button',{name:'Finalizar',exact:true}).click();assert.equal(await page.evaluate(()=>state.xp),xp);
  await page.reload();assert.ok((await page.locator('body').innerText()).includes('Resultado'));
  await page.evaluate(()=>{state=clone(DEFAULT);startExam('final')});await page.evaluate(()=>{const uid='audit-09';const qs=state.quiz.qs;const j=qs.indexOf(uid);if(j>=0)[qs[0],qs[j]]=[qs[j],qs[0]];else {const k=qs.findIndex(id=>QUESTIONS.find(q=>q.uid===id).s==='design');qs[k]=uid;[qs[0],qs[k]]=[qs[k],qs[0]];state.quiz.optionOrders[uid]=[2,0,3,1];}save();render()});const original=await page.locator('.choices').innerText();await page.locator('.choice').first().click();assert.equal(await page.locator('.choice.correct,.choice.wrong').count(),0);await page.locator('.choice').nth(1).click();assert.equal(await page.locator('.choice[aria-pressed="true"]').count(),1);await page.reload();assert.equal(await page.locator('.choices').innerText(),original);
  await page.locator('.choice').first().focus();await page.waitForTimeout(1100);assert.equal(await page.evaluate(()=>document.activeElement?.classList.contains('choice')),true);
  await page.getByRole('button',{name:'Entregar simulado agora'}).click();assert.equal(await page.evaluate(()=>state.history[0].total),40);await page.reload();assert.ok((await page.locator('body').innerText()).includes('Resultado da prova'));
  // Rapid mode keeps a question and remaining time while the board is open.
  await page.evaluate(()=>go('rapid'));await page.getByRole('button',{name:/Começar Run/}).click();
  const beforeRapid=await page.evaluate(()=>({sig:CQRapidTest.getRun().current.sig,total:CQRapidTest.getRun().total}));await page.getByRole('button',{name:'✏️ Lousa',exact:true}).click();await page.locator('button[onclick="closeBoard()"]').click();assert.equal(await page.evaluate(()=>CQRapidTest.getRun().current.sig),beforeRapid.sig);
  await page.locator('.rapid-option').first().click();const rTotal=await page.evaluate(()=>CQRapidTest.getRun().total);await page.waitForTimeout(1200);assert.equal(await page.evaluate(()=>CQRapidTest.getRun().total),rTotal);assert.ok((await page.locator('#rapid-feedback').innerText()).length>0);await page.getByRole('button',{name:/Encerrar Run/}).click();
  console.log('Quiz, exam and rapid flows passed');
  // Import: reject invalid, retain current state; accept an exported valid state.
  await page.evaluate(()=>go('sources'));const invalid=Buffer.from('{"xp":"oops"}');await page.locator('#imp').setInputFiles({name:'invalid.json',mimeType:'application/json',buffer:invalid});await page.waitForTimeout(50);assert.equal(typeof await page.evaluate(()=>state.xp),'number');
  const exportText=await page.evaluate(()=>JSON.stringify(state));await page.locator('#imp').setInputFiles({name:'valid.json',mimeType:'application/json',buffer:Buffer.from(exportText)});await page.waitForTimeout(50);assert.ok((await page.locator('body').innerText()).includes('Seu progresso'));
  // Mobile layout audit of every lesson and screenshots of representative subjects.
  await page.setViewportSize({width:390,height:844});
  const navRows=await page.locator('.bottom-nav button').evaluateAll(bs=>bs.map(b=>Math.round(b.getBoundingClientRect().top)));assert.equal(new Set(navRows).size,1,'mobile navigation must fit in one row');
  for(const m of modules){await page.evaluate(({s,i})=>CQGuide.reference(s,i),m);const bounds=await page.evaluate(()=>({body:document.documentElement.scrollWidth,viewport:innerWidth}));assert.ok(bounds.body<=bounds.viewport+1,`${m.s}:${m.i} page overflow ${JSON.stringify(bounds)}`);}
  for(const [s,i] of [['pt',5],['info',1],['math',16],['direito',16],['municipio',3],['design',8]]){await page.evaluate(({s,i})=>CQGuide.reference(s,i),{s,i});await page.screenshot({path:path.join(shots,`${s}-mobile.png`),fullPage:true,timeout:60000});}
  // Every original module has a rendered expanded visual; new modules have instructional tables/diagram.
  for(const m of modules.filter(x=>x.i<( {pt:14,info:16,math:15,direito:16,municipio:14,design:31}[x.s]))){await page.evaluate(({s,i})=>CQGuide.reference(s,i),m);assert.ok(await page.locator('.lesson-visual-card,.color-lab-grid,.hue-wheel').count(),`${m.s}:${m.i} visual missing`);}
  await page.evaluate(async()=>{await navigator.serviceWorker.ready});await page.reload();await page.waitForFunction(()=>navigator.serviceWorker.controller!==null);
  await ctx.setOffline(true);await page.reload();await page.waitForSelector('.lesson,.guided-card,h1');await page.evaluate(()=>CQGuide.reference('math',16));assert.ok((await page.locator('.lesson h1').innerText()).includes('Trigonometria'));await page.evaluate(()=>startExam('final'));assert.equal(await page.locator('.choice').count(),4);await ctx.setOffline(false);
  assert.deepEqual(errors,[]);console.log('PASS: browser, 113 desktop/mobile lessons, real click/reload/import flows, scoring, exam focus, rapid board, RGB, offline. Screenshots:',shots);
 }finally{if(browser)await browser.close();server.close();}
})().catch(e=>{console.error(e);process.exitCode=1});
