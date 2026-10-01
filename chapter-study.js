/* Reading and retrieval are separate: navigation never awards mastery. */
(function(){
'use strict';
const labels=['Fundamento','Exemplo comentado','Comparações','Prática'];
const clean=s=>String(s).replace(/^[^\p{L}\p{N}]+/u,'');
const paras=xs=>xs.map(x=>`<p>${esc(x)}</p>`).join('');
function render(g,p){
 const key=`${g.s}:${g.i}`,d=window.CQChapterContent[key],L=LESSONS[g.s][g.i],chapter=Number.isInteger(g.chapter)?Math.max(0,Math.min(3,g.chapter)):0;
 const teach=p.steps.filter(x=>x.type==='teach'),visuals=[...new Set(teach.map(x=>x.visual).filter(Boolean))];
 const sections=(L.sections||[]).filter(x=>!/(Como pode aparecer|Autoexplicação|Resumo de bolso|Antes de consultar|Antes de olhar)/i.test(x.split('\n')[0]));
 const questions=p.steps.filter(x=>x.type==='choice'||x.type==='input');
 shell('Aula · '+MODULES[g.s][g.i][0]);document.body.classList.add('guide-focus');
 let content='';
 if(chapter===0){
 content=`<p class="ch-lead">${esc(d?.intro||p.goal)}</p><section class="ch-objectives"><h2>O que você vai aprender</h2><ul>${(d?.objectives||[p.goal,'Reconhecer o conceito em exemplos','Aplicar e conferir seu raciocínio']).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section>`;
 if(visuals[0])content+=CQGuideVisual.render(visuals[0]);
 content+=d?`<h2>${esc(d.concept.title)}</h2>${paras(d.concept.paragraphs)}`:sections.map(x=>{const [title,...text]=x.split('\n');return `<section><h2>${esc(clean(title))}</h2>${paras(text.filter(Boolean))}</section>`;}).join('');
 }else if(chapter===1){
 if(d){content=`<h2>${esc(d.worked.title)}</h2><p class="ch-scenario">${esc(d.worked.context)}</p><ol class="ch-reasoning">${d.worked.steps.map((x,i)=>`<li><span>${i+1}</span><p>${esc(x)}</p></li>`).join('')}</ol><div class="ch-takeaway"><strong>O que o raciocínio mostra</strong><p>${esc(d.worked.conclusion)}</p></div>`;}
 else {const q=questions[0];content=q?`<h2>Do conceito à resposta</h2><p class="ch-scenario">${esc(q.title)}</p><details class="ch-solution"><summary>Ver resolução comentada</summary><p><strong>Resposta:</strong> ${esc(q.type==='choice'?q.options[q.answer]:q.accepted[0])}</p><p>${esc(q.type==='choice'?q.explain[q.answer]:q.explain)}</p></details><p>Antes de abrir a resolução, identifique qual conceito decide a resposta. Depois compare sua justificativa com o comentário.</p>`:paras([p.goal,p.summary]);}
 visuals.slice(d?1:0,3).forEach(v=>content+=CQGuideVisual.render(v));
 }else if(chapter===2){
 content='<h2>Aprenda a distinguir</h2>';
 if(d){content+=`<div class="ch-table-wrap"><table><thead><tr>${d.comparison[0].map(x=>`<th scope="col">${esc(x)}</th>`).join('')}</tr></thead><tbody>${d.comparison.slice(1).map(row=>`<tr>${row.map(x=>`<td>${esc(x)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;}
 else content+=teach.map(x=>`<section><h3>${esc(x.title)}</h3><p>${esc(x.text||'')}</p></section>`).join('');
 content+=`<aside class="ch-takeaway"><strong>Atenção à armadilha</strong><p>${esc(d?.trap||L.trap||p.summary)}</p></aside><h3>Explique com suas palavras</h3><p>Qual pista permite reconhecer esse conceito? Em que situação uma ideia parecida levaria a outra resposta?</p>`;
 }else content=`<h2>Agora, recupere sem consultar</h2><p>Você vai responder ${questions.length} questões, uma por vez, com explicação após cada tentativa. Os pontos que errar voltam no reforço.</p><div class="ch-takeaway"><strong>Ler e acertar são etapas diferentes</strong><p>Navegar pelos capítulos não conclui a aula. A conclusão acontece depois de resolver a prática e retomar os erros.</p></div><button class="g-primary" onclick="CQGuide.startPractice()">${Object.keys(g.answers).length?'Continuar prática':'Começar prática'} →</button>`;
 document.querySelector('#content').innerHTML=`<div class="ch-shell"><header class="ch-header"><button class="g-back" onclick="CQGuide.pause()">← Meu percurso</button><span>CANEDO QUEST · AULA</span><button class="g-back" onclick="CQGuide.reference('${g.s}',${g.i})">Material de apoio ↗</button></header><div class="ch-heading"><p class="g-kicker">ENTENDER · OBSERVAR · APLICAR</p><h1>${esc(MODULES[g.s][g.i][0])}</h1><p>Uma aula em capítulos. Explore no seu ritmo e termine com a prática.</p></div><div class="ch-layout"><nav class="ch-index" aria-label="Capítulos da aula"><strong>Nesta aula</strong>${labels.map((label,i)=>`<button ${chapter===i?'aria-current="step"':''} onclick="CQChapter.select(${i})"><span>0${i+1}</span>${label}</button>`).join('')}<small>Seu capítulo fica salvo.</small></nav><main class="ch-paper"><div class="ch-chapter-label">CAPÍTULO ${chapter+1} DE 4 · ${labels[chapter].toUpperCase()}</div><div id="ch-reading" tabindex="-1">${content}</div><footer class="ch-footer"><button class="g-back" ${chapter===0?'disabled':''} onclick="CQChapter.select(${chapter-1})">← Anterior</button>${chapter<3?`<button class="g-primary" onclick="CQChapter.select(${chapter+1})">${labels[chapter+1]} →</button>`:''}</footer>${p.source?`<a class="g-source" href="${esc(p.source)}" target="_blank" rel="noopener">Fonte e leitura complementar ↗</a>`:''}</main></div></div>`;
 CQGuideVisual.mount();window.scrollTo(0,0);
}
window.CQChapter={render,select(index){if(!Number.isInteger(index)||index<0||index>3)return;state.guided.chapter=index;state.guided.practiceMode=false;save();CQGuide.render();document.getElementById('ch-reading')?.focus({preventScroll:true});}};
})();
