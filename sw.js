const CACHE='canedo-quest-v12-forced-final';
const APP_SHELL=['./chapter-content.js','./chapter-study.js','./chapter-study.css','./guided-study.css','./guided-visuals.js','./guided-content.js','./guided-study.js','./assets/oficina.jpg','./','./index.html','./styles.css','./forced-subject.css','./forced-subject.js','./rapid.css','./visual.css','./learning-labs.css','./app.js','./state-validation.js','./pwa.js','./rapid.js','./visual-questions.js','./content-boost.js','./curriculum.js','./module-map.js','./lesson-visuals.css','./study-depth.css','./route-learning.css','./lesson-visuals.js','./lesson-visuals-expanded.js','./study-depth.js','./route-learning.js','./learning-labs.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('canedo-quest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith((async()=>{
  try{
   const fresh=await fetch(event.request);
   if(fresh&&fresh.ok){const cache=await caches.open(CACHE);cache.put(event.request,fresh.clone());}
   return fresh;
  }catch(error){
   const cache=await caches.open(CACHE);
   return await cache.match(event.request)|| (event.request.mode==='navigate'?await cache.match('./index.html'):Response.error());
  }
 })());
});