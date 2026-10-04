const CACHE='canedo-quest-v21-foundations';
const APP_SHELL=['./','./index.html','./forced-subject.css?v=21','./forced-subject.js?v=21','./cq-boot.js?v=21','./state-validation.js','./app.js','./study-depth.js','./visual-questions.js','./content-boost.js','./curriculum.js','./module-map.js','./chapter-content.js','./foundations.js','./foundations-ui.js','./manifest.webmanifest','./icon-192.png','./icon-512.png'];
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