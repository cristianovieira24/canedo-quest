(function(){
'use strict';
const e=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
function content(s,i){
 const own=window.CQFoundations?.[s]?.[i];if(own)return own;
 const c=window.CQChapterContent?.[s+':'+i];if(!c)return null;
 return {intro:c.intro,parts:[[c.concept.title,c.concept.paragraphs.join('\n\n')]],worked:[c.worked.context,c.worked.steps.join('\n\n')+'\n\n'+c.worked.conclusion],comparison:c.comparison};
}
function render(s,i){
 const d=content(s,i);if(!d)return '';
 return '<section class="cq-foundation" id="cq-foundation"><span class="cq-block-kicker">APRENDA DESDE A BASE</span><h2>Entenda os conceitos desta aula</h2><p class="cq-foundation-intro">'+e(d.intro)+'</p><p class="cq-foundation-hint">Abra uma explicação de cada vez. Os exemplos aparecem junto das definições.</p>'+d.parts.map((p,j)=>'<details class="cq-concept" '+(j===0?'open':'')+'><summary><span>'+String(j+1).padStart(2,'0')+'</span>'+e(p[0])+'</summary><div>'+p[1].split('\n\n').map(t=>'<p>'+e(t)+'</p>').join('')+'</div></details>').join('')+(d.comparison?'<div class="cq-concept-table"><table><thead><tr>'+d.comparison[0].map(t=>'<th scope="col">'+e(t)+'</th>').join('')+'</tr></thead><tbody>'+d.comparison.slice(1).map(row=>'<tr>'+row.map(t=>'<td>'+e(t)+'</td>').join('')+'</tr>').join('')+'</tbody></table></div>':'')+'<section class="cq-worked"><span class="cq-block-kicker">EXEMPLO ANALISADO</span><h3>'+e(d.worked[0])+'</h3>'+d.worked[1].split('\n\n').map(t=>'<p>'+e(t)+'</p>').join('')+'</section></section>';
}
function lookup(){return '<details class="cq-lookup"><summary>Não entendi um termo · consultar explicações</summary><label for="cq-concept-search">Qual palavra ou conceito?</label><input id="cq-concept-search" type="search" placeholder="Ex.: advérbio, predicativo, ditongo" oninput="CQFoundationUI.search(this.value)" autocomplete="off"><p class="cq-foundation-hint">Consulta às explicações de Português. Buscar não altera sua tentativa.</p><div id="cq-concept-results" aria-live="polite"></div></details>';}
function search(query){const root=document.getElementById('cq-concept-results');if(!root)return;const term=norm(query.trim());if(term.length<2){root.innerHTML='<p>Digite pelo menos duas letras.</p>';return;}const hits=[];window.CQFoundations.pt.forEach((m,i)=>m.parts.forEach(p=>{if(norm(p.join(' ')).includes(term))hits.push({i,p});}));hits.sort((a,b)=>Number(norm(b.p[0]).includes(term))-Number(norm(a.p[0]).includes(term)));root.innerHTML=hits.length?hits.slice(0,8).map(x=>'<article><small>'+e(MODULES.pt[x.i][0])+'</small><h3>'+e(x.p[0])+'</h3><p>'+e(x.p[1])+'</p></article>').join('')+(hits.length>8?'<p>Há outras explicações. Use um termo mais específico para refinar.</p>':''):'<p>Nenhuma explicação encontrada para esse termo. Tente o nome no singular ou consulte o material da aula.</p>';}
window.CQFoundationUI={render,lookup,search,has:(s,i)=>!!content(s,i)};
})();
