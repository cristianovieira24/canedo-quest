(function(){
'use strict';

const esc = v => String(v ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const txt=(x,y,s,size=18,fill='#243042',weight='400',anchor='start')=>'<text x="'+x+'" y="'+y+'" text-anchor="'+anchor+'" font-family="Arial,sans-serif" font-size="'+size+'" fill="'+fill+'" font-weight="'+weight+'">'+esc(s)+'</text>';
const rect=(x,y,w,h,fill='#eef3f8',stroke='#cbd5e1',r=16)=>'<rect x="'+x+'" y="'+y+'" width="'+w+'" height="'+h+'" rx="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
const line=(x1,y1,x2,y2,stroke='#64748b',dash='')=>'<line x1="'+x1+'" y1="'+y1+'" x2="'+x2+'" y2="'+y2+'" stroke="'+stroke+'" stroke-width="3"'+(dash?' stroke-dasharray="'+dash+'"':'')+'/>';
const arrow=(x1,y1,x2,y2)=>line(x1,y1,x2,y2,'#475569')+'<polygon points="'+x2+','+y2+' '+(x2-10)+','+(y2-5)+' '+(x2-10)+','+(y2+5)+'" fill="#475569"/>';
const circ=(cx,cy,r,fill='#dbeafe',stroke='#64748b')=>'<circle cx="'+cx+'" cy="'+cy+'" r="'+r+'" fill="'+fill+'" stroke="'+stroke+'" stroke-width="2"/>';
const svg=(inner,label)=>'<svg class="lesson-svg" viewBox="0 0 820 340" role="img" aria-label="'+esc(label)+'">'+inner+'</svg>';

function flow(title,labels,caption){
  const xs=[45,300,555];
  let h=txt(45,34,title,22,'#111827','700');
  labels.slice(0,3).forEach((x,i)=>{
    h+=rect(xs[i],78,220,105,i===0?'#e8f1ff':i===1?'#eefbf2':'#fff6db');
    h+=txt(xs[i]+110,124,x,21,'#111827','700','middle');
    if(i<2)h+=arrow(xs[i]+220,130,xs[i+1],130);
  });
  if(labels.length>3)h+=txt(45,205,'Depois: '+labels.slice(3).join(' → '),18,'#111827','700');
  h+=txt(45,245,caption||'Veja a relação entre as partes antes de decorar os termos.',17,'#475569');
  return svg(h,title+'. '+(caption||'Relação entre três etapas.'));
}
function compare(title,left,right,caption){
  let h=txt(45,34,title,22,'#111827','700')+rect(45,68,330,170,'#f8fafc','#cbd5e1')+rect(445,68,330,170,'#f8fafc','#cbd5e1');
  h+=txt(65,105,left[0],21,'#111827','700')+txt(465,105,right[0],21,'#111827','700');
  (left.slice(1,4)).forEach((x,i)=>h+=txt(70,145+i*31,'• '+x,16,'#475569'));
  (right.slice(1,4)).forEach((x,i)=>h+=txt(470,145+i*31,'• '+x,16,'#475569'));
  h+=txt(45,277,caption||'Compare pela função, não só pelo nome.',17,'#475569');
  return svg(h,title+'. Comparação lado a lado.');
}
function timeline(title,items,caption){
  let h=txt(45,34,title,22,'#111827','700')+line(80,138,740,138,'#94a3b8');
  items.slice(0,4).forEach((x,i)=>{
    const cx=95+i*210; h+=circ(cx,138,18,i===0?'#dbeafe':i===1?'#dcfce7':i===2?'#fef3c7':'#fee2e2');
    h+=txt(cx,92,x[0],19,'#111827','700','middle'); h+=txt(cx,186,x[1],16,'#475569','400','middle');
  });
  h+=txt(45,245,caption||'A ordem temporal ajuda a evitar confusão entre etapas próximas.',17,'#475569');
  return svg(h,title+'. Linha do tempo visual.');
}
function tree(title,root,children,caption){
  let h=txt(45,34,title,22,'#111827','700')+rect(300,65,220,60,'#e8f1ff','#94a3b8')+txt(410,102,root,19,'#111827','700','middle');
  const xs=[100,270,440,610];
  children.slice(0,4).forEach((x,i)=>{h+=line(410,125,xs[i],185);h+=rect(xs[i]-65,185,130,62,'#f8fafc','#cbd5e1',12)+txt(xs[i],222,x,16,'#111827','700','middle')});
  h+=txt(45,280,caption||'Estrutura de cima para baixo: núcleo → ramificações.',17,'#475569');
  return svg(h,title+'. Diagrama hierárquico.');
}
function matrix(title,cols,rows,caption){
  let h=txt(45,34,title,22,'#111827','700');
  const x0=45,y0=70,w=180,hg=44;
  cols.slice(0,4).forEach((c,i)=>h+=rect(x0+i*w,y0,w,42,'#e8f1ff','#cbd5e1',8)+txt(x0+i*w+w/2,y0+27,c,15,'#111827','700','middle'));
  rows.forEach((row,r)=>row.slice(0,4).forEach((cell,c)=>h+=rect(x0+c*w,y0+52+r*52,w,44,r%2?'#fff':'#f8fafc','#e2e8f0',8)+txt(x0+c*w+w/2,y0+80+r*52,cell,14,'#475569','400','middle')));
  const bottom=70+52+rows.length*52+25;h+=txt(45,bottom,caption||'Compare os critérios.',16,'#475569');
  return '<svg class="lesson-svg" viewBox="0 0 820 '+(bottom+35)+'" role="img" aria-label="'+esc(title)+'. Tabela de comparação.">'+h+'</svg>';
}
function decision(title,steps,caption){
  let h=txt(45,34,title,22,'#111827','700');
  steps.forEach((x,i)=>{
    const y=70+i*55; h+=rect(45,y,260,42,i===steps.length-1?'#dcfce7':'#f8fafc','#cbd5e1',10)+txt(58,y+27,x,15,'#111827','700');
    if(i<steps.length-1)h+=line(175,y+42,175,y+55,'#475569');
  });
  h+=txt(410,94,'Critérios em sequência',16,'#475569')+txt(410,140,'Confira cada etapa',16,'#475569');
  const bottom=70+steps.length*55+20;h+=txt(45,bottom,caption||'Confira a sequência dos critérios.',16,'#475569');
  return '<svg class="lesson-svg" viewBox="0 0 820 '+(bottom+35)+'" role="img" aria-label="'+esc(title)+'. Sequência de critérios.">'+h+'</svg>';
}
function equation(title,formula,parts,caption){
  let h=txt(45,34,title,22,'#111827','700')+rect(45,70,730,75,'#f8fafc','#cbd5e1')+txt(410,117,formula,30,'#111827','700','middle');
  parts.slice(0,4).forEach((x,i)=>{h+=rect(55+i*180,178,165,55,i===0?'#e8f1ff':i===1?'#eefbf2':i===2?'#fff6db':'#f4e8ff','#d1d5db',10)+txt(137+i*180,211,x,15,'#475569','700','middle')});
  h+=txt(45,275,caption||'Identifique o que cada símbolo representa antes de calcular.',17,'#475569');
  return svg(h,title+'. Fórmula e partes.');
}
function grammar(title,phrase,focus,caption){
  let h=txt(45,34,title,22,'#111827','700')+rect(45,75,730,78,'#f8fafc','#cbd5e1')+txt(410,121,phrase,24,'#111827','700','middle');
  h+=line(110,175,690,175,'#cbd5e1');
  focus.slice(0,4).forEach((x,i)=>h+=rect(55+i*180,192,165,54,i===0?'#e8f1ff':i===1?'#eefbf2':i===2?'#fff6db':'#f4e8ff','#d1d5db',10)+txt(137+i*180,225,x,15,'#475569','700','middle'));
  h+=txt(45,290,caption||'A análise visual começa pela estrutura e depois identifica a função de cada parte.',17,'#475569');
  return svg(h,title+'. Exemplo de análise de frase.');
}
function bars(title,labels,values,caption){
  let h=txt(45,34,title,22,'#111827','700'); const max=Math.max.apply(null,values.concat([1]));
  labels.slice(0,4).forEach((x,i)=>{const bar=Math.max(18,440*values[i]/max);const y=78+i*53;h+=txt(45,y+22,x,15,'#475569','700');h+=rect(180,y,bar,34,i%2?'#dbeafe':'#dcfce7','#cbd5e1',8);h+=txt(190+bar,y+23,String(values[i]),14,'#111827','700')});
  h+=txt(45,303,caption||'Visualize a distribuição para interpretar, não apenas calcular.',17,'#475569');
  return svg(h,title+'. Barras de comparação.');
}
function mockUI(title,parts,caption){
  let h=txt(45,34,title,22,'#111827','700')+rect(45,64,730,205,'#ffffff','#cbd5e1',16)+rect(45,64,730,34,'#e5e7eb','#cbd5e1',16);
  parts.slice(0,5).forEach((x,i)=>{const x0=70+(i%3)*230,y=116+Math.floor(i/3)*70;h+=rect(x0,y,190,46,i===0?'#e8f1ff':'#f8fafc','#d1d5db',10)+txt(x0+95,y+29,x,14,'#111827','700','middle')});
  h+=txt(45,302,caption||'Mockups ajudam a relacionar conceito e uso em uma interface real.',17,'#475569');
  return svg(h,title+'. Mockup conceitual de interface.');
}
function numberLine(title,marks,caption){
  let h=txt(45,34,title,22,'#111827','700')+line(70,150,750,150,'#475569');
  marks.slice(0,7).forEach((m,i)=>{const x=80+i*105;h+=line(x,140,x,160,'#475569');h+=txt(x,124,m,15,'#111827','700','middle')});
  h+=txt(45,208,caption||'Use a representação visual para perceber ordem, distância e variação.',17,'#475569');
  return svg(h,title+'. Linha numérica ou escala.');
}
function shapes(title,kind,caption){
  let h=txt(45,34,title,22,'#111827','700');
  if(kind==='plane')h+=rect(70,80,180,120,'#e8f1ff')+'<polygon points="360,200 445,80 530,200" fill="#dcfce7" stroke="#64748b" stroke-width="2"/><circle cx="660" cy="145" r="62" fill="#fff6db" stroke="#64748b" stroke-width="2"/>';
  else if(kind==='solid')h+=rect(70,95,150,95,'#dbeafe')+'<path d="M330 110 h140 l55 35 v90 H385 l-55-35z" fill="#dcfce7" stroke="#64748b" stroke-width="2"/><path d="M610 110 a55 35 0 1 0 110 0 a55 35 0 1 0 -110 0 M610 110 v105 M720 110 v105" fill="#fff6db" stroke="#64748b" stroke-width="2"/>';
  else h+=rect(60,90,180,95,'#f8fafc')+txt(150,145,'unidade',20,'#111827','700','middle')+arrow(250,138,350,138)+rect(360,90,180,95,'#e8f1ff')+txt(450,145,'conversão',20,'#111827','700','middle')+arrow(550,138,650,138)+rect(660,90,100,95,'#dcfce7')+txt(710,145,'resultado',16,'#111827','700','middle');
  h+=txt(45,245,caption||'Veja a forma ou a unidade antes de aplicar a fórmula.',17,'#475569');
  return svg(h,title+'. Representação geométrica ou de medidas.');
}
function flowchart(title,steps,caption){
  let h=txt(45,34,title,22,'#111827','700');
  steps.slice(0,5).forEach((x,i)=>{const y=64+i*52; const r=i===1?'#fff6db':i===steps.length-1?'#dcfce7':'#e8f1ff';h+=rect(55,y,230,40,r,'#cbd5e1',10)+txt(170,y+26,x,14,'#111827','700','middle');if(i<steps.length-1)h+=arrow(285,y+20,380,y+20);});
  h+=rect(390,64,330,195,'#f8fafc','#d1d5db',14)+txt(555,95,'RACIOCÍNIO',18,'#111827','700','middle')+txt(410,130,'1. identificar',15,'#475569')+txt(410,162,'2. relacionar',15,'#475569')+txt(410,194,'3. concluir',15,'#475569')+txt(410,226,'4. conferir',15,'#475569');
  h+=txt(45,298,caption||'O desenho representa a sequência mental do assunto.',17,'#475569');
  return svg(h,title+'. Fluxograma conceitual.');
}

const P={
  pt:[
    ['flow',['Texto','pistas','contexto','inferência'],'Interpretação visual: texto → pistas → contexto → conclusão.'],
    ['compare',[['Gênero','finalidade','público','situação'],['Tipo','organização','predomínio','estrutura']],'Gênero e tipo se relacionam, mas não são sinônimos.'],
    ['flow',['frase → oração','período','coesão','coerência'],'A construção sai da unidade local e chega ao sentido global.'],
    ['matrix',['Contexto','Forma','Público','Adequação'],[['formal','norma','institucional','alta'],['informal','coloquial','cotidiano','compatível'],['técnico','preciso','especializado','adequada']],'Escolha linguística depende de situação e finalidade.'],
    ['decision',['É tônica?','Qual posição ocupa?','Qual regra se aplica?','Acentua?'],'Não decore casos isolados: siga a regra.'],
    ['decision',['Há preposição A?','Há artigo A?','Os dois se encontram?','Use “à” ou “a”'],'Crase nasce do encontro de dois “a”.'],
    ['tree','Palavra',['radical','prefixo','sufixo','classe'],'Morfologia desmonta a palavra e identifica sua classe/flexão.'],
    ['grammar','O designer revisou o arquivo ontem.',['verbo','sujeito','complemento','adjunto'],'Comece pelo verbo e descubra as funções.'],
    ['flowchart',['oração 1','conector','relação de sentido','oração 2'],'Conectivo não basta: identifique a relação semântica.'],
    ['compare',[['Regência','preposição','verbo/nome','complemento'],['Concordância','núcleo','gênero/número','pessoa']],'Uma olha a relação com complemento; a outra, a combinação entre termos.'],
    ['decision',['Há palavra atrativa?','Negação/subordinativa?','posição do pronome','revise a norma'],'A colocação depende da estrutura, não só do hábito de fala.'],
    ['grammar','Os relatórios, porém, foram revisados.',['vírgula','oração','conector','efeito'],'Pontuação organiza estrutura e sentido.'],
    ['compare',[['Literal','sentido básico','referência direta','contexto'],['Figurado','associação','efeito','contexto']],'Pergunte qual relação de sentido a frase constrói.'],
    ['compare',[['Antes','sentido','estrutura','norma'],['Depois','mesma ideia','nova ordem','novo encaixe']],'Na reescrita, teste se o sentido e a correção foram preservados.']
  ],
  info:[
    ['flowchart',['entrada','processamento','decisão/repetição','saída'],'Fluxogramas tornam a lógica de execução visível.'],
    ['flow',['sequência','seleção','repetição'],'Algoritmos estruturados podem ser vistos como blocos de controle.'],
    ['tree','Sistema operacional',['arquivos','pastas','permissões','processos'],'O sistema organiza recursos e media programas e hardware.'],
    ['mockUI',['janela','barra','pasta','atalho','configuração'],'O conceito fica concreto quando você visualiza os elementos da interface.'],
    ['tree','/ (raiz Linux)',['home','etc','var','usr'],'Diretórios formam uma árvore; permissões afetam quem pode agir.'],
    ['compare',[['CPU','processa','cálculos','controle'],['RAM/Storage','RAM: volátil','SSD: persistente','I/O: periféricos']],'Separe processamento, memória e armazenamento.'],
    ['flow',['dado original','cópia','versão','restauração'],'Backup existe para permitir recuperação, não só para “ter uma cópia”.'],
    ['mockUI',['Docs','Sheets','Slides','Drive','Gmail'],'Visualize o ecossistema como ferramentas com funções diferentes.'],
    ['flow',['arquivo fonte','exportar','formato','abrir/importar'],'Formato é uma escolha de intercâmbio e compatibilidade.'],
    ['flow',['cliente','rede','servidor'],'Endereços e protocolos conectam dispositivos e serviços.'],
    ['flow',['URL','servidor','resposta','cache/histórico'],'Navegação envolve pedido, resposta e armazenamento local de certos dados.'],
    ['mockUI',['remetente','destinatário','assunto','anexo','resposta'],'Um e-mail tem partes e ações diferentes.'],
    ['tree','Nuvem',['IaaS','PaaS','SaaS','responsabilidade'],'Os modelos diferem pelo que o provedor gerencia.'],
    ['matrix',['Objetivo','Pergunta','Defesa','Exemplo'],[['Confidencialidade','quem vê?','controle de acesso','permissão'],['Integridade','foi alterado?','hash/controle','backup'],['Disponibilidade','está acessível?','redundância','continuidade']],'A tríade CIA separa objetivos de segurança.'],
    ['decision',['mensagem suspeita?','phishing?','malware?','defesa'],'Ataques podem explorar técnica e comportamento humano.'],
    ['tree','Ambiente corporativo',['domínio','usuário','grupo','recurso'],'Autenticação responde “quem é?”; autorização responde “pode fazer?”.']
  ],
  math:[
    ['numberLine',['-2','-1','0','1','2','3','4'],'A reta numérica ajuda a comparar sinais, ordem e distância.'],
    ['compare',[['Direta','↑ A → ↑ B','mesma razão','ex.: escala'],['Inversa','↑ A → ↓ B','produto constante','ex.: trabalho']],'Reconheça o tipo de relação antes da conta.'],
    ['matrix',['Grandeza A','Grandeza B','Operação','Resultado'],[['a1','b1','×/÷','?'],['a2','b2','mesma relação','x']],'Monte a proporcionalidade de forma organizada.'],
    ['compare',[['Antes','100%','preço inicial','base'],['Depois','% de variação','aumento/desconto','novo valor']],'Percentual é variação relativa à base.'],
    ['equation','J = C × i × t',['C = capital','i = taxa','t = tempo','M = C + J'],'Separe juros do montante e confira unidades.'],
    ['equation','2x + 3 = 11',['isolar x','operações inversas','equilíbrio','x = 4'],'A equação pode ser pensada como uma balança.'],
    ['flow',['sistema','equação 1','equação 2','solução'],'Duas condições são combinadas para descobrir valores compatíveis.'],
    ['shapes','plane','Perceba a diferença entre contorno, área e forma.'],
    ['shapes','solid','Volume mede espaço ocupado; área mede superfície.'],
    ['shapes','units','Converta unidades antes de combinar medidas.'],
    ['timeline',[['PA','+ d'],['termos','a1,a2…'],['PG','× q'],['comparar','razão']],'PA soma uma diferença; PG multiplica por uma razão.'],
    ['tree','Escolha',['1ª opção','2ª opção','3ª opção','produto total'],'Princípio multiplicativo transforma etapas em uma árvore de possibilidades.'],
    ['flow',['espaço amostral','evento','casos favoráveis','probabilidade'],'Probabilidade é razão entre casos favoráveis e possíveis em cenários equiprováveis.'],
    ['bars',['valor 1','valor 2','valor 3','valor 4'],[2,4,4,10],'Dados ilustrativos 2, 4, 4, 10: média 5; mediana 4; moda 4.'],
    ['flowchart',['proposição','valor lógico','conectivo','conclusão'],'Sequências e lógica pedem identificação de padrão ou relação.']
  ],
  direito:[
    ['matrix',['Princípio','Pergunta','Exemplo','Risco'],[['Legalidade','qual base?','lei','agir sem base'],['Impessoalidade','quem beneficia?','interesse público','promoção pessoal'],['Moralidade','é íntegro?','boa-fé','desvio'],['Publicidade/Eficiência','é transparente/eficaz?','informação/resultado','opacidade/desperdício']],'O art. 37 reúne princípios que devem orientar a Administração.'],
    ['tree','Poder administrativo',['hierárquico','disciplinar','regulamentar','polícia'],'Cada poder tem função própria; não confunda alcance e finalidade.'],
    ['flow',['fato/competência','ato','efeito','controle'],'Ato administrativo pode ser analisado pelos elementos e pelos efeitos.'],
    ['flow',['necessidade pública','organização','prestação','usuário'],'Serviço público conecta dever estatal e atendimento ao usuário.'],
    ['compare',[['Cargo','atribuições','criação legal','provimento'],['Emprego/Função','vínculo','contrato/função','atividade']],'Separe formas de atuação no serviço público.'],
    ['tree','Administração',['órgão','entidade','agente','competência'],'Órgão é parte da estrutura; não é pessoa jurídica autônoma.'],
    ['flow',['conduta','violação','responsabilização','efeito jurídico'],'Improbidade envolve conduta e consequências legais; não é sinônimo de qualquer ilegalidade.'],
    ['flowchart',['instauração','instrução','motivação','decisão'],'Processo administrativo segue etapas e exige fundamentação adequada.'],
    ['timeline',[['planejar','demanda'],['preparar','termo/estudo'],['selecionar','disputa'],['contratar','execução']],'A licitação é um processo; o planejamento vem antes da disputa.'],
    ['matrix',['Modalidade','Uso típico','Critério','Observação'],[['Pregão','bens/serviços comuns','julgamento','ritual próprio'],['Concorrência','contratações diversas','critério','ampla utilização'],['Concurso','trabalho técnico','prêmio','resultado específico'],['Leilão','bens','maior lance','alienação'],['Diálogo competitivo','casos complexos','fase de diálogo','art. 32']],'Visualize as modalidades pelo objeto e finalidade.'],
    ['decision',['Competição inviável → inexigibilidade','Competição possível + hipótese legal','Hipótese de dispensa → dispensa','Sempre: instrução e fundamento'],'Contratação direta não significa ausência de fundamento legal.'],
    ['tree','CF — princípios fundamentais',['República','Federação','Estado Democrático','objetivos'],'Os primeiros artigos estruturam fundamentos e objetivos da República.'],
    ['matrix',['Direito','Garantia','Exemplo','Proteção'],[['vida','liberdade','igualdade','segurança'],['propriedade','imagem','intimidade','devido processo'],['liberdades','expressão','crença','associação']],'O art. 5º reúne direitos e garantias fundamentais com proteção específica.'],
    ['tree','CF — arts. 6–13',['sociais','trabalho','nacionalidade','direitos correlatos'],'Agrupe os artigos por tema para memorizar melhor.'],
    ['tree','CF — municípios',['direitos políticos','eleição','autonomia municipal','fiscalização'],'Os arts. 14–16 tratam de direitos políticos e 29–31 da organização/fiscalização municipal.'],
    ['matrix',['Art. 37+','Tema','Exemplo','Atenção'],[['37','princípios','LIMPE','regra geral'],['38','servidor','mandato','compatibilidades'],['39','regime','servidores','normas'],['40–41','previdência/estabilidade','servidor','requisitos']],'Visualize o bloco constitucional como um mapa de temas.']
  ],
  municipio:[
    ['timeline',[['núcleo','ferrovia'],['Esplanada','homenagem'],['1953','distrito'],['1989','instalação']],'A história local fica mais fácil quando os marcos são vistos como sequência.'],
    ['timeline',[['núcleo','formação'],['Esplanada','nome histórico'],['homenagem','Antônio Amaro'],['Canedo','nome atual']],'Relacionar nome e contexto evita memorizar fatos soltos.'],
    ['flowchart',['povoado','distrito','Goiânia','município'],'Distrito e município autônomo são etapas diferentes.'],
    ['timeline',[['1953','distrito'],['1988','emancipação'],['01/06/1989','instalação'],['atual','autonomia']],'Não confunda emancipação política com instalação administrativa.'],
    ['tree','Evolução administrativa',['distrito','vínculo','desmembramento','município'],'Relação territorial e subordinação administrativa não são a mesma coisa.'],
    ['mockUI',['Goiás','RMG','Senador Canedo','área/população','dados IBGE'],'Localização deve ser lida em camadas: Estado → região → município.'],
    ['compare',[['Vizinhança','divisa','posição regional','municípios limítrofes'],['Administração','autonomia','competência','órgãos']],'Estar ao lado não significa estar subordinado.'],
    ['bars',['indústria','serviços','comércio','ocupação urbana'],[8,7,6,9],'Use o gráfico como modelo de leitura de dinâmica econômica; os números são ilustrativos.'],
    ['tree','Câmara + Prefeito',['projeto','sanção','veto','lei'],'A competência legislativa depende da matéria e do processo previsto.'],
    ['tree','Câmara Municipal',['Mesa','comissões','sessões','fiscalização'],'Competência privativa não é a mesma coisa que toda competência legislativa.'],
    ['compare',[['Legislativo','leis','fiscalização','Câmara'],['Executivo','administração','serviços','Prefeito']],'Pense em funções e competências, não em pessoas específicas.'],
    ['tree','Câmara',['Mesa','vereadores','comissões','plenário'],'A estrutura interna explica como a atuação legislativa se organiza.'],
    ['flow',['informação pública','transparência','comunicação','cidadão'],'Publicidade institucional é diferente de promoção pessoal.'],
    ['tree','Servidor municipal',['direitos','deveres','proibições','responsabilidades'],'O Estatuto deve ser estudado como sistema de direitos e deveres, conforme a lei local.']
  ],
  design:[
    ['tree','Elementos',['ponto/linha','forma','cor','textura/espaço'],'Elementos básicos são matéria-prima; princípios organizam sua relação.'],
    ['compare',[['Proximidade','distância','agrupamento','gestalt'],['Semelhança','forma/cor','agrupamento','gestalt']],'A percepção agrupa elementos por mais de um mecanismo.'],
    ['flow',['fragmentos','fechamento','continuidade','leitura'],'O olho completa e acompanha trajetórias.'],
    ['compare',[['Figura','foco','forma','destaque'],['Fundo','campo','espaço','contraste']],'A percepção separa e alterna relações de figura/fundo.'],
    ['matrix',['Princípio','Recurso','Efeito','Objetivo'],[['Hierarquia','escala','ordem','guiar'],['Equilíbrio','peso','estabilidade','organizar'],['Ritmo','repetição','cadência','unificar'],['Alinhamento','eixo','coerência','relacionar']],'Composição transforma elementos em uma leitura controlada.'],
    ['tree','Grid',['margem','coluna','módulo','baseline'],'Grid é uma estrutura invisível que organiza alinhamento e ritmo.'],
    ['compare',[['Serifa','terminais','tradicional','editorial'],['Sem serifa','traços limpos','interface','sinalização']],'Família tipográfica altera voz e aplicação.'],
    ['matrix',['Legibilidade','Controle','Efeito','Mídia'],[['corpo','tamanho','leitura','impresso/tela'],['entrelinha','respiro','ritmo','leitura'],['linha','comprimento','fadiga','texto'],['contraste','diferença','clareza','acesso']],'Tipografia é decisão de leitura, não só estilo.'],
    ['compare',[['RGB','luz','tela','aditivo'],['CMYK','tinta','impressão','subtrativo']],'Escolha o modelo conforme o meio de reprodução.'],
    ['matrix',['Harmonia','Relação','Uso','Efeito'],[['análoga','vizinhas','coesa','suave'],['complementar','opostas','contraste','forte'],['triádica','três pontos','equilíbrio','viva']],'Harmonia é uma relação entre cores, não uma lista fixa de “cores bonitas”.'],
    ['compare',[['Cor','associação','contexto','cultura'],['Significado','público','combinação','situação']],'Psicologia da cor não é universal: contexto altera a leitura.'],
    ['flow',['público','objetivo','mensagem','forma'],'Na comunicação institucional, a forma deve servir à finalidade pública.'],
    ['tree','Identidade',['símbolo','tipografia','cor','aplicações'],'Identidade é sistema, não apenas um desenho isolado.'],
    ['matrix',['Regra','Exemplo','Evitar','Motivo'],[['área de proteção','respiro','colagem','legibilidade'],['tamanho mínimo','escala mínima','micrologo','reconhecimento'],['fundos','versões','contraste ruim','clareza'],['cores','códigos','aproximações','consistência']],'O manual transforma a identidade em regras reproduzíveis.'],
    ['compare',[['Brasão','símbolo estatal','protocolo','oficial'],['Logotipo','assinatura','sistema visual','aplicação']],'Símbolos públicos têm função institucional e não devem virar propaganda pessoal.'],
    ['flow',['conteúdo','grid','hierarquia','produção'],'Na publicação, texto e imagem precisam dividir espaço com intenção.'],
    ['flow',['arquivo','prova','material','acabamento'],'Produção gráfica depende de especificações técnicas e do processo.'],
    ['decision',['sangria?','marcas/área segura','perfil de cor','fontes/imagens'],'O fechamento é uma sequência de conferências antes da produção.'],
    ['compare',[['Raster','pixels','foto','resolução'],['Vetor','formas','logo','escala']],'Use o tipo de imagem de acordo com o problema.'],
    ['mockUI',['desktop','tablet','celular','hierarquia','toque'],'Responsividade reorganiza o conteúdo conforme espaço e interação.'],
    ['matrix',['Canal','Formato','Leitura','Cuidados'],[['feed','quadrado/vertical','rápida','texto legível'],['story','vertical','rápida','zona segura'],['carrossel','sequencial','escaneável','consistência'],['vídeo','movimento','tempo','legendas']],'O mesmo conteúdo pode exigir adaptação por canal.'],
    ['compare',[['UX','fluxo','tarefa','feedback'],['UI','componentes','tipografia','estado visual']],'UX e UI se complementam, mas respondem a perguntas diferentes.'],
    ['matrix',['Barreira','Solução visual','Sinal','Resultado'],[['contraste','relação adequada','texto','legibilidade'],['cor isolada','rótulo','texto/ícone','redundância'],['foco','estado visível','borda','teclado'],['imagem','alt text','descrição','percepção']],'Acessibilidade é redução de barreiras, não apenas “deixar bonito”.'],
    ['tree','WCAG',['Perceptível','Operável','Compreensível','Robusto'],'POUR é um mapa conceitual para estudar acessibilidade na web.'],
    ['compare',[['Comunicação inclusiva','reduzir barreiras','representar','contextualizar'],['Estereótipo','generalizar','excluir','empobrecer']],'Inclusão exige contexto e cuidado com linguagem e representação.'],
    ['flow',['obra','autoria','licença','uso permitido'],'Acesso público não significa ausência de direito autoral.'],
    ['decision',['qual ativo?','qual licença?','qual uso?','documente a origem'],'Rastreabilidade evita assumir que “grátis” significa “sem condições”.'],
    ['matrix',['Ética','Decisão','Impacto','Cuidado'],[['precisão','dado/gráfico','interpretação','não distorcer'],['autoria','ativo','crédito','registrar'],['sigilo','arquivo','acesso','proteger'],['responsabilidade','entrega','serviço','qualidade']],'Ética também aparece em decisões técnicas.'],
    ['flow',['necessidade','serviço','uso','resultado'],'Design de serviço organiza uma experiência pública do ponto de vista da necessidade.'],
    ['tree','Projeto',['briefing','editáveis','provas','backup'],'Organização técnica cria rastreabilidade e reduz erro.'],
    ['flow',['briefing','produção','revisão','entrega'],'Atribuição profissional é um fluxo de trabalho, não apenas domínio de software.']
  ]
};

function visualFor(s,i,title){
  const p=P[s]?.[i];
  if(!p)return null;
  const t=p[0],d=p.slice(1);
  if(t==='flow')return flow(title,d[0],d[1]);
  if(t==='compare')return compare(title,d[0][0],d[0][1],d[1]);
  if(t==='timeline')return timeline(title,d[0],d[1]);
  if(t==='tree')return tree(title,d[0],d[1],d[2]);
  if(t==='matrix')return matrix(title,d[0],d[1],d[2]);
  if(t==='decision')return decision(title,d[0],d[1]);
  if(t==='equation')return equation(title,d[0],d[1],d[2]);
  if(t==='grammar')return grammar(title,d[0],d[1],d[2]);
  if(t==='bars')return bars(title,d[0],d[1],d[2]);
  if(t==='mockUI')return mockUI(title,d[0],d[1]);
  if(t==='numberLine')return numberLine(title,d[0],d[1]);
  if(t==='shapes')return shapes(title,d[0],d[1]);
  if(t==='flowchart')return flowchart(title,d[0],d[1]);
  return null;
}

const oldLesson=window.lesson;
if(typeof oldLesson==='function'){
  window.lesson=function(s,i){
    oldLesson(s,i);
    let card=document.querySelector('.lesson-visual-card');
    const domTitle=document.querySelector('.lesson h1')?.textContent?.trim();
    const title=domTitle||s+' · módulo '+(i+1);
    const v=visualFor(s,i,title);
    if(!v)return;if(!card){const body=document.querySelector('.lesson-body');if(!body)return;card=document.createElement('section');card.className='lesson-visual-card';body.before(card);}
    card.innerHTML='<div class="eyebrow">🖼️ VISUAL EXPLICATIVO · '+esc(title)+'</div><h2>Veja o conceito funcionando</h2>'+v+'<p class="lesson-visual-caption">Esquema didático do assunto. Use-o para comparar, lembrar relações e depois resolver as questões.</p>';
    card.dataset.visualCoverage='expanded';
  };
}
})();