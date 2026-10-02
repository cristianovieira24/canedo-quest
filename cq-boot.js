/* Boot do Canedo Quest novo. Usa query no Service Worker para escapar de caches antigos. */
(function(){
  'use strict';
  window.addEventListener('load',function(){
    if(!('serviceWorker' in navigator)) return;
    navigator.serviceWorker.register('./sw.js?v=20',{updateViaCache:'none'}).then(function(reg){
      return reg.update();
    }).catch(function(){});
  });
})();
