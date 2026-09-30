const CACHE='canedo-quest-v10-audit-1';
const APP_SHELL=['./','./index.html','./styles.css','./rapid.css','./visual.css','./learning-labs.css','./app.js','./state-validation.js','./pwa.js','./rapid.js','./visual-questions.js','./content-boost.js','./curriculum.js','./module-map.js','./lesson-visuals.css','./lesson-visuals.js','./lesson-visuals-expanded.js','./learning-labs.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
self.addEventListener('install',event=>{event.waitUntil(caches.open(CACHE).then(cache=>cache.addAll(APP_SHELL)).then(()=>self.skipWaiting()));});
self.addEventListener('activate',event=>{event.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k.startsWith('canedo-quest-')&&k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));});
self.addEventListener('fetch',event=>{
 if(event.request.method!=='GET')return;
 const url=new URL(event.request.url);
 if(url.origin!==self.location.origin||!url.href.startsWith(self.registration.scope))return;
 event.respondWith(caches.open(CACHE).then(async cache=>{
  const cached=await cache.match(event.request);
  if(cached)return cached;
  try{return await fetch(event.request)}catch(error){
   if(event.request.mode==='navigate')return await cache.match('./index.html')||Response.error();
   return Response.error();
  }
 }));
});
