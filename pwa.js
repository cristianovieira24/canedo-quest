let deferredInstallPrompt = null;

function isIOS(){
  return /iphone|ipad|ipod/i.test(navigator.userAgent) ||
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
}
function isStandalone(){
  return window.matchMedia('(display-mode: standalone)').matches || window.navigator.standalone === true;
}
function ensureMobileChrome(){
  const top = document.querySelector('.topbar-right');
  if (top && !document.querySelector('#install-app-btn')) {
    const b = document.createElement('button');
    b.id = 'install-app-btn';
    b.className = 'btn small install-btn hidden';
    b.type = 'button';
    b.textContent = '📲 Instalar';
    top.prepend(b);
  }
  if (!document.querySelector('.bottom-nav') && document.querySelector('.main')) {
    const nav = document.createElement('nav');
    nav.className = 'bottom-nav';
    const items = [
      ['home','⌂','Início'],
      ['study','📖','Estudar'],
      ['train','⚡','Treinar'],
      ['review','🔁','Revisar'],
      ['sim','🎯','Provas']
    ];
    nav.innerHTML = items.map(([id,icon,label]) => `<button class="${state.page===id?'active':''}" onclick="go('${id}')"><span class="bn-icon">${icon}</span><span>${label}</span></button>`).join('');
    document.body.appendChild(nav);
  }
}

function wirePwaUI(){
  const btn = document.querySelector('#install-app-btn');
  if (!btn) return;
  if (isStandalone()) { btn.classList.add('hidden'); return; }
  if (deferredInstallPrompt || isIOS()) {
    btn.classList.remove('hidden');
    btn.textContent = isIOS() ? '📲 Como instalar' : '📲 Instalar';
  } else {
    btn.classList.add('hidden');
  }
}

window.addEventListener('beforeinstallprompt', e => {
  e.preventDefault();
  deferredInstallPrompt = e;
  wirePwaUI();
});

window.addEventListener('appinstalled', () => {
  deferredInstallPrompt = null;
  wirePwaUI();
  if (typeof toast === 'function') toast('Canedo Quest instalado no celular ✅');
});

document.addEventListener('click', async e => {
  const btn = e.target.closest('#install-app-btn');
  if (!btn) return;
  if (isIOS()) {
    alert('No iPhone/iPad: toque em Compartilhar no Safari e depois em “Adicionar à Tela de Início”.');
    return;
  }
  if (!deferredInstallPrompt) return;
  deferredInstallPrompt.prompt();
  await deferredInstallPrompt.userChoice;
  deferredInstallPrompt = null;
  wirePwaUI();
});

const originalShell = window.shell;
// shell() is defined with function declaration and is visible globally.
// We wrap it after app.js has loaded so every dynamically-rendered screen gets the PWA controls.
window.shell = function(title=''){
  originalShell(title);
  ensureMobileChrome();
  wirePwaUI();
};

window.addEventListener('load', () => {
  ensureMobileChrome();
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
  wirePwaUI();
});
