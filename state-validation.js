/* Reject malformed imports without touching current progress. Loaded before app.js. */
function validateProgress(input){
 const object=v=>v!==null&&typeof v==='object'&&!Array.isArray(v);
 if(!object(input))throw new Error('Progresso deve ser um objeto');
 const checkTree=(v,depth=0)=>{if(depth>24)throw new Error('Estrutura excessiva');if(typeof v==='number'&&!Number.isFinite(v))throw new Error('Número inválido');if(v&&typeof v==='object')for(const k of Object.keys(v)){if(['__proto__','constructor','prototype'].includes(k))throw new Error('Chave inválida');checkTree(v[k],depth+1)}};checkTree(input);
 const nonneg=(v)=>Number.isFinite(v)&&v>=0;
 for(const key of ['xp','streak'])if(key in input&&!nonneg(input[key]))throw new Error('Contagem inválida');
 const maps=['answered','wrong','mastery','lessonDone','lessonChecks','lessonNotes','reviewAttempts','cards','planDone','settings','labAttempts','guidedProgress'];
 for(const k of maps)if(k in input&&!object(input[k]))throw new Error('Mapa inválido: '+k);
 if(input.history!==undefined&&!Array.isArray(input.history))throw new Error('Histórico inválido');
 if(input.page!==undefined&&!['home','study','review','train','sim','errors','plan','cards','board','sources','rapid'].includes(input.page))throw new Error('Página inválida');
 if(input.lastStudy!=null&&(!/^\d{4}-\d{2}-\d{2}$/.test(input.lastStudy)||Number.isNaN(Date.parse(input.lastStudy))))throw new Error('Data inválida');
 if(input.settings?.sound!==undefined&&typeof input.settings.sound!=='boolean')throw new Error('Som inválido');
 for(const key of ['wrong','lessonDone','planDone'])for(const v of Object.values(input[key]||{}))if(typeof v!=='boolean')throw new Error('Marca inválida');
 for(const v of Object.values(input.lessonChecks||{}))if(!Array.isArray(v)||v.some(a=>a!==null&&typeof a!=='boolean'))throw new Error('Checklist inválido');
 for(const v of Object.values(input.lessonNotes||{}))if(typeof v!=='string')throw new Error('Anotação inválida');
 for(const v of Object.values(input.answered||{}))if(!object(v)||typeof v.correct!=='boolean'||!nonneg(v.attempts||0)||!nonneg(v.ts||0)||v.nextReview!==undefined&&!nonneg(v.nextReview))throw new Error('Resposta inválida');
 for(const v of Object.values(input.mastery||{})){if(!object(v)||!nonneg(v.right)||!nonneg(v.total)||v.right>v.total||!object(v.byTopic))throw new Error('Domínio inválido');for(const t of Object.values(v.byTopic)){if(!object(t)||!nonneg(t.r)||!nonneg(t.t)||t.r>t.t)throw new Error('Tópico inválido')}}
 for(const v of Object.values(input.reviewAttempts||{}))if(!object(v)||typeof v.text!=='string')throw new Error('Revisão inválida');
 if(input.board!==undefined){const b=input.board;if(!object(b)||!Array.isArray(b.paths))throw new Error('Lousa inválida');for(const p of b.paths){if(!object(p)||!Array.isArray(p.pts)||typeof p.c!=='string'||!nonneg(p.w))throw new Error('Traço inválido');if(p.pts.some(pt=>!object(pt)||!Number.isFinite(pt.x)||!Number.isFinite(pt.y)))throw new Error('Coordenada inválida')}}
 if(input.rapid!==undefined){const r=input.rapid;if(!object(r)||!Array.isArray(r.seen)||!Array.isArray(r.mistakes)||!Array.isArray(r.history)||!object(r.topic))throw new Error('Modo rápido inválido');for(const k of ['total','correct','bestScore','bestCombo'])if(!nonneg(r[k]))throw new Error('Contagem rápida inválida');for(const q of r.mistakes)if(!object(q)||!Array.isArray(q.o)||q.o.length!==4||!Number.isInteger(q.a)||q.a<0||q.a>=4||typeof q.q!=='string'||typeof q.e!=='string')throw new Error('Questão rápida inválida');}
 if(input.quiz!=null){const q=input.quiz;if(!object(q)||!Array.isArray(q.qs)||!q.qs.length||q.qs.some(id=>typeof id!=='string')||new Set(q.qs).size!==q.qs.length||!Number.isInteger(q.idx)||q.idx<0||q.idx>=q.qs.length||!object(q.answers)||!object(q.marked)||!nonneg(q.started)||typeof q.mode!=='string')throw new Error('Sessão inválida');for(const v of Object.values(q.answers))if(!Number.isInteger(v)||v<0||v>3)throw new Error('Alternativa inválida');if(q.optionOrders!==undefined){if(!object(q.optionOrders))throw new Error('Ordem inválida');for(const order of Object.values(q.optionOrders))if(!Array.isArray(order)||order.length!==4||new Set(order).size!==4||order.some(j=>!Number.isInteger(j)||j<0||j>3))throw new Error('Ordem inválida');}}
 if(input.guideView!==undefined&&typeof input.guideView!=='boolean')throw new Error('Modo guiado inválido');
 for(const [k,v] of Object.entries(input.guidedProgress||{}))if(!/^(pt|info|math|direito|municipio|design):\d+$/.test(k)||!object(v)||typeof v.completed!=='boolean'||!nonneg(v.completedAt)||!nonneg(v.nextReview)||!nonneg(v.firstRight)||!nonneg(v.firstTotal)||v.firstRight>v.firstTotal||!nonneg(v.reviews))throw new Error('Progresso guiado inválido');
 if(input.guided!=null){const g=input.guided;if(!object(g)||!['pt','info','math','direito','municipio','design'].includes(g.s)||!Number.isInteger(g.i)||g.i<0||!Number.isInteger(g.pos)||g.pos<0||!['main','retry','done'].includes(g.phase)||!Array.isArray(g.retry)||g.retry.some(x=>!Number.isInteger(x)||x<0)||!nonneg(g.started)||typeof g.reviewOnly!=='boolean')throw new Error('Aula guiada inválida');
  for(const k of ['answers','passed','orders','first','recorded'])if(!object(g[k]))throw new Error('Resposta guiada inválida');
  for(const v of Object.values(g.answers))if(!object(v)||typeof v.correct!=='boolean'||!['string','number'].includes(typeof v.value))throw new Error('Tentativa guiada inválida');
  for(const k of ['passed','first','recorded'])for(const v of Object.values(g[k]))if(typeof v!=='boolean')throw new Error('Marca guiada inválida');
  for(const v of Object.values(g.orders))if(!Array.isArray(v)||new Set(v).size!==v.length||v.some(x=>!Number.isInteger(x)||x<0))throw new Error('Ordem guiada inválida');
 }
 const result=merge(clone(DEFAULT),input);
 return result;
}
