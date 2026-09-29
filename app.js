const EXAM_DATE = new Date('2026-10-18T15:00:00-03:00');
const STORAGE_KEY = 'canedoQuest.v2';
const SOURCE = {
  edital:'https://www.consulpam.com.br/arquivos/20260915_115832_EDITAL%20001.%202026%20C%C3%82MARA%20SENADOR%20CANEDO.pdf',
  concurso:'https://www.consulpam.com.br/index.php?menu=concursos&acao=ver&id=814&tipo=bo',
  camara:'https://senadorcanedo.go.leg.br/',
  ibge:'https://www.ibge.gov.br/cidades-e-estados/go/senador-canedo.html',
  ibgeHistorico:'https://www.ibge.gov.br/biblioteca/visualizacao/dtb/goias/senadorcanedo.pdf',
  leiOrganica:'https://senadorcanedo.go.leg.br/wp-content/uploads/2025/12/Lei-organica-Senador-Canedo-Atualizada-2025.pdf',
  lei14133:'https://www.planalto.gov.br/ccivil_03/_ato2019-2022/2021/lei/l14133.htm',
  lei9610:'https://www.planalto.gov.br/ccivil_03/leis/l9610.htm',
  wcag:'https://www.w3.org/TR/wcag/'
};

const subjects = {
  pt:{name:'Língua Portuguesa',short:'Português',icon:'📚'},
  info:{name:'Informática',short:'Informática',icon:'💻'},
  math:{name:'Matemática & Lógica',short:'Matemática',icon:'🧠'},
  direito:{name:'Direito Adm. & Const.',short:'Direito',icon:'⚖️'},
  municipio:{name:'Senador Canedo',short:'Município',icon:'🏙️'},
  design:{name:'Designer Gráfico',short:'Design',icon:'🎨'}
};

const syllabus = [
  {id:'pt', ...subjects.pt, weight:10, color:'cyan', topics:[
    'Compreensão e interpretação: situação comunicativa, pressuposição, inferência, ambiguidade, ironia, figurativização, polissemia, intertextualidade e linguagem não verbal.',
    'Tipos e gêneros: narrativo, descritivo, expositivo, argumentativo, instrucional, propaganda, editorial, cartaz, anúncio, artigo de opinião, divulgação científica, ofício e carta.',
    'Estrutura textual: progressão temática, parágrafo, frase, oração, período, enunciado, pontuação, coesão e coerência.',
    'Variedade linguística, formalidade/informalidade, formas de tratamento, propriedade lexical e adequação comunicativa.',
    'Norma culta: ortografia, acentuação, crase, pontuação, formação de palavras, classes, regência, concordância, flexões e colocação pronominal.',
    'Produção textual; semântica; tempos e modos verbais; fonologia; morfologia; termos da oração; coordenação e subordinação; transitividade; estilística; reescrita.'
  ]},
  {id:'info', ...subjects.info, weight:10, topics:[
    'Algoritmos e programação: fundamentos, construção/análise, pseudocódigo, fluxogramas e programação estruturada (Python/JavaScript etc.).',
    'Sistemas operacionais: arquivos, pastas, programas, arquitetura, backup e recuperação, Ubuntu Linux e Windows 11.',
    'Entrada/saída e periféricos; Microsoft Office e Google Workspace; importação, exportação, formatos e conversões.',
    'Redes: fundamentos, endereçamento, Internet/Intranet, navegadores (Edge/Firefox/Chrome), e-mail e mensageria.',
    'Cloud computing: IaaS, PaaS, SaaS, modelos de implementação e provedores.',
    'Segurança: princípios, procedimentos, malware (vírus, worms, trojan), antivírus, firewall, anti-spyware; ambientes corporativos, autenticação/autorização, domínio e compartilhamento.'
  ]},
  {id:'math', ...subjects.math, weight:10, topics:[
    'Raciocínio lógico; conjuntos: pertinência, inclusão, igualdade e operações.',
    'Razão e proporção; regra de três simples e composta; porcentagem e juros simples.',
    'Geometria plana e espacial; perímetros, áreas, volumes; trigonometria no triângulo retângulo.',
    'Sistemas lineares e álgebra básica.',
    'PA e PG; sequência lógica.',
    'Análise combinatória, probabilidade e estatística: média, moda e mediana.'
  ]},
  {id:'direito', ...subjects.direito, weight:10, topics:[
    'Administração Pública: princípios, poderes, atos administrativos, serviços públicos, servidores, cargo/emprego/função, órgãos, improbidade, processo administrativo.',
    'Licitações e contratos administrativos — Lei 14.133/2021 e atualizações.',
    'CF/88: arts. 1º–4º (princípios fundamentais), art. 5º, arts. 6º–11, 12–13, 14–16, 18–19, 29–31 e 37–41.'
  ]},
  {id:'municipio', ...subjects.municipio, weight:10, topics:[
    'História de Senador Canedo; formação ligada à ferrovia; antigo nome Esplanada; distrito criado em 1953; emancipação e instalação.',
    'Aspectos geográficos e municípios circunvizinhos; economia e administração municipal.',
    'Lei Orgânica do Município e estrutura do Poder Legislativo.',
    'Estatuto do Servidor e temas municipais previstos no edital.'
  ]},
  {id:'design', ...subjects.design, weight:20, topics:[
    'Conceitos e princípios do design; ponto, linha, forma, cor, textura e espaço; Gestalt.',
    'Hierarquia visual e composição; tipografia, classificação e legibilidade; teoria/psicologia das cores.',
    'Comunicação visual institucional e pública; linguagem visual no setor público; clareza, acessibilidade, objetividade e padronização.',
    'Identidade visual, manual, logotipos, símbolos oficiais, brasões, selos e padronização gráfica institucional.',
    'Diagramação, layout, grid, margens, publicações, impressão, papel, formatos, acabamentos e fechamento.',
    'Web/mídias digitais, responsividade, redes institucionais, apresentações e UX/UI conceitual.',
    'Illustrator/CorelDRAW, Photoshop, InDesign/equivalentes; GIMP, Inkscape, Scribus; tratamento de imagem.',
    'Arquivos para impressão/digital; offset/digital; RGB/CMYK; resolução.',
    'Design acessível, comunicação inclusiva, contraste, leitura, WCAG conceitual e públicos diversos.',
    'Direitos autorais (Lei 9.610/1998), imagens/fontes/licenças, ética, responsabilidade pública, segurança, transparência, neutralidade e impessoalidade.'
  ]}
];

const questions = [
// PORTUGUÊS
{id:'pt01',s:'pt',t:'Interpretação',q:'Em um texto, o leitor conclui algo que não está literalmente escrito, mas que é sustentado por pistas do enunciado. Esse processo é chamado de:',o:['pressuposição','inferência','polissemia','regência'],a:1,e:'Inferência é a construção de uma conclusão a partir de informações e pistas presentes no texto e no contexto.'},
{id:'pt02',s:'pt',t:'Semântica',q:'A frase “Ele viu o banco” pode indicar uma instituição financeira ou um assento. A ambiguidade decorre principalmente de:',o:['polissemia','concordância','crase','paralelismo'],a:0,e:'Banco possui mais de um sentido possível; a interpretação depende do contexto.'},
{id:'pt03',s:'pt',t:'Gêneros',q:'Um texto que apresenta tese e procura defender um ponto de vista por meio de argumentos é predominantemente:',o:['narrativo','argumentativo','descritivo','instrucional'],a:1,e:'O tipo argumentativo organiza ideias para sustentar uma posição ou tese.'},
{id:'pt04',s:'pt',t:'Coesão',q:'A substituição de um termo repetido por um pronome para manter a referência no texto é um recurso de:',o:['coesão referencial','variação linguística','prosódia','polissemia'],a:0,e:'A coesão referencial liga elementos do texto por meio de pronomes, elipses, sinônimos e outros mecanismos.'},
{id:'pt05',s:'pt',t:'Crase',q:'Assinale a alternativa em que o uso da crase está adequado à norma-padrão:',o:['Entreguei o documento à diretora.','Começou à estudar cedo.','Fui à pé para casa.','Referi-me à pessoas interessadas.'],a:0,e:'“À diretora” resulta da fusão da preposição a com o artigo a.'},
{id:'pt06',s:'pt',t:'Concordância',q:'Assinale a frase em conformidade com a norma-padrão:',o:['Haviam muitos documentos na mesa.','Fazem dois anos que trabalho aqui.','Havia muitos documentos na mesa.','Existe muitos problemas no processo.'],a:2,e:'No sentido de existir, “haver” é impessoal e fica no singular: havia muitos documentos.'},
{id:'pt07',s:'pt',t:'Regência',q:'A construção “assistimos ao evento” é adequada porque, no sentido de ver/presenciar, o verbo assistir:',o:['rege preposição a','é transitivo direto','exige objeto com em','é sempre intransitivo'],a:0,e:'Na norma-padrão, assistir no sentido de presenciar rege a preposição “a”.'},
{id:'pt08',s:'pt',t:'Colocação pronominal',q:'Em “Não se deve ignorar o contexto”, a colocação do pronome é:',o:['ênclise','próclise','mesóclise','apassivação'],a:1,e:'A palavra de negação “não” atrai o pronome, caracterizando próclise.'},
{id:'pt09',s:'pt',t:'Pontuação',q:'A vírgula pode ser usada para isolar:',o:['o sujeito simples do verbo, sempre','um vocativo','o objeto direto, obrigatoriamente','o núcleo do predicado'],a:1,e:'Vocativos são termos independentes e podem ser isolados por vírgulas.'},
{id:'pt10',s:'pt',t:'Figuras',q:'“A cidade acordou cedo” apresenta, em linguagem figurada:',o:['metonímia','personificação','hipérbole','eufemismo'],a:1,e:'Atribuir uma ação humana (“acordou”) à cidade é personificação.'},
{id:'pt11',s:'pt',t:'Acentuação',q:'Qual palavra é acentuada por ser uma oxítona terminada em “a(s), e(s), o(s), em, ens”?',o:['fácil','café','tórax','lâmpada'],a:1,e:'“Café” é oxítona terminada em “e” e recebe acento.'},
{id:'pt12',s:'pt',t:'Fonologia',q:'Em “chave”, a sequência “ch” representa:',o:['dois fonemas','um dígrafo','um encontro consonantal','um hiato'],a:1,e:'“Ch” é um dígrafo consonantal: duas letras representam um único fonema.'},
{id:'pt13',s:'pt',t:'Sintaxe',q:'Em “Os candidatos resolveram a questão”, o termo “a questão” é:',o:['sujeito','objeto direto','objeto indireto','predicativo'],a:1,e:'Quem resolve, resolve algo; “a questão” completa o verbo sem preposição.'},
{id:'pt14',s:'pt',t:'Reescrita',q:'Na reescrita, o paralelismo sintático busca principalmente:',o:['misturar estruturas para variar o texto','manter correspondência estrutural entre termos ou orações correlatas','eliminar toda pontuação','substituir o sentido original'],a:1,e:'Paralelismo é a manutenção de estruturas gramaticais equivalentes em construções correlatas.'},
{id:'pt15',s:'pt',t:'Adequação',q:'Em comunicação institucional, a escolha entre linguagem formal e informal deve considerar sobretudo:',o:['somente a preferência do autor','a situação comunicativa e o público','apenas o tamanho do texto','a quantidade de adjetivos'],a:1,e:'O edital cobra adequação comunicativa: registro, finalidade, público e contexto importam.'},

// INFORMÁTICA
{id:'info01',s:'info',t:'Windows',q:'No gerenciamento de arquivos, uma pasta serve principalmente para:',o:['executar antivírus','organizar arquivos e outras pastas','substituir a memória RAM','criptografar toda a rede'],a:1,e:'Pastas são contêineres usados para organizar arquivos e subpastas.'},
{id:'info02',s:'info',t:'Backup',q:'O objetivo principal de um backup é:',o:['aumentar a resolução da tela','manter uma cópia recuperável dos dados','impedir qualquer ataque virtual','substituir o sistema operacional'],a:1,e:'Backup é uma cópia de dados destinada à recuperação após perda, corrupção ou desastre.'},
{id:'info03',s:'info',t:'Nuvem',q:'Qual modelo de cloud computing entrega ao usuário um ambiente para desenvolver e executar aplicações, sem exigir a gestão direta da infraestrutura física?',o:['IaaS','PaaS','SaaS','LAN'],a:1,e:'PaaS (Platform as a Service) oferece uma plataforma para desenvolvimento e execução de aplicações.'},
{id:'info04',s:'info',t:'Segurança',q:'Um programa malicioso que pode se anexar a arquivos e se propagar quando o arquivo é executado é tipicamente:',o:['vírus','firewall','backup','proxy'],a:0,e:'Vírus é malware capaz de se inserir ou associar a arquivos, dependendo da execução para propagação.'},
{id:'info05',s:'info',t:'Segurança',q:'Firewall tem como função central:',o:['filtrar/controlar tráfego de rede conforme regras','editar imagens','formatar documentos','gerar gráficos'],a:0,e:'Firewalls controlam comunicações de entrada e saída segundo políticas/regras de segurança.'},
{id:'info06',s:'info',t:'Autenticação',q:'Autenticação responde à pergunta:',o:['“O que este usuário pode fazer?”','“Quem é você?”','“Qual é o nome do arquivo?”','“Qual é o tamanho da pasta?”'],a:1,e:'Autenticação verifica a identidade; autorização define o que a identidade pode acessar.'},
{id:'info07',s:'info',t:'Formatos',q:'Em um fluxo de exportação, converter um arquivo .docx para PDF é um exemplo de:',o:['formatação física de HD','conversão/exportação de dados ou documento','autorização de usuário','backup incremental obrigatório'],a:1,e:'O edital inclui importação/exportação, formatos e conversões.'},
{id:'info08',s:'info',t:'Redes',q:'A Intranet é melhor descrita como:',o:['uma rede interna que utiliza tecnologias de Internet','uma rede mundial sem qualquer controle','um antivírus corporativo','um tipo de impressora'],a:0,e:'Intranet é uma rede privada/interna que utiliza tecnologias e protocolos da Internet.'},
{id:'info09',s:'info',t:'Algoritmos',q:'Um fluxograma é usado principalmente para:',o:['armazenar backups','representar graficamente o fluxo de um processo ou algoritmo','criar tipografia','medir resolução'],a:1,e:'Fluxogramas representam etapas e decisões de um procedimento de forma visual.'},
{id:'info10',s:'info',t:'Office',q:'Em uma planilha, uma fórmula geralmente inicia-se com:',o:['#','@','=','$'],a:2,e:'Em ferramentas de planilha como Excel e Sheets, fórmulas são normalmente iniciadas com “=”.'},
{id:'info11',s:'info',t:'Nuvem',q:'Em SaaS, o usuário normalmente consome:',o:['uma aplicação pronta como serviço','somente cabos e roteadores','um processador físico','um algoritmo sem interface'],a:0,e:'SaaS (Software as a Service) entrega software como serviço.'},
{id:'info12',s:'info',t:'Ambiente corporativo',q:'Em um domínio corporativo, o compartilhamento de pastas depende principalmente de:',o:['permissões e políticas de acesso','apenas do nome do computador','somente do brilho da tela','do papel da impressora'],a:0,e:'Compartilhamentos corporativos envolvem autenticação, autorização e permissões.'},

// MATEMÁTICA
{id:'math01',s:'math',t:'Porcentagem',q:'Um produto de R$ 200 recebeu desconto de 15%. Qual o novo preço?',o:['R$ 160','R$ 170','R$ 175','R$ 185'],a:1,e:'15% de 200 = 30. Então 200 − 30 = 170.'},
{id:'math02',s:'math',t:'Regra de três',q:'Se 4 máquinas produzem 120 peças em certo tempo, mantendo a mesma produtividade, 6 máquinas produzirão:',o:['160','180','200','240'],a:1,e:'Produtividade proporcional: 120 × 6/4 = 180.'},
{id:'math03',s:'math',t:'Média',q:'A média de 6, 8 e 10 é:',o:['7','8','9','10'],a:1,e:'(6+8+10)/3 = 8.'},
{id:'math04',s:'math',t:'Mediana',q:'Na sequência ordenada 2, 5, 7, 9, 11, a mediana é:',o:['5','7','8','9'],a:1,e:'Com cinco valores ordenados, a mediana é o valor central: 7.'},
{id:'math05',s:'math',t:'Moda',q:'Na lista 2, 3, 3, 4, 5, 5, 5, 6, a moda é:',o:['3','4','5','6'],a:2,e:'Moda é o valor que mais se repete: 5.'},
{id:'math06',s:'math',t:'Conjuntos',q:'Se A={1,2,3} e B={3,4}, então A∩B é:',o:['{1,2,3,4}','{1,2}','{3}','∅'],a:2,e:'Interseção contém os elementos comuns aos conjuntos: {3}.'},
{id:'math07',s:'math',t:'Juros simples',q:'Em juros simples, um capital de R$ 1.000 aplicado a 2% ao mês por 3 meses gera juros de:',o:['R$ 20','R$ 40','R$ 60','R$ 80'],a:2,e:'J = C·i·t = 1000·0,02·3 = 60.'},
{id:'math08',s:'math',t:'PA',q:'Na PA 3, 7, 11, 15, o próximo termo é:',o:['17','18','19','20'],a:2,e:'A razão é 4; 15+4=19.'},
{id:'math09',s:'math',t:'Probabilidade',q:'Ao lançar um dado honesto de 6 faces, a probabilidade de sair número par é:',o:['1/6','1/3','1/2','2/3'],a:2,e:'Há 3 resultados pares (2,4,6) em 6 possíveis: 3/6=1/2.'},
{id:'math10',s:'math',t:'Geometria',q:'A área de um retângulo de 8 cm por 5 cm é:',o:['13 cm²','26 cm²','40 cm²','80 cm²'],a:2,e:'Área = base × altura = 8×5 = 40 cm².'},
{id:'math11',s:'math',t:'Trigonometria',q:'Em um triângulo retângulo, seno de um ângulo agudo é igual a:',o:['cateto adjacente/hipotenusa','cateto oposto/hipotenusa','hipotenusa/cateto oposto','cateto oposto/cateto adjacente'],a:1,e:'sen(θ)=cateto oposto/hipotenusa.'},
{id:'math12',s:'math',t:'Álgebra',q:'Se 2x + 6 = 14, então x é:',o:['2','3','4','5'],a:2,e:'2x=8, logo x=4.'},

// DIREITO
{id:'dir01',s:'direito',t:'Princípios',q:'No art. 37 da Constituição, o conjunto clássico de princípios da Administração Pública é:',o:['LIBERDADE','LEGALIDADE, IMPESSOALIDADE, MORALIDADE, PUBLICIDADE E EFICIÊNCIA','apenas legalidade e moralidade','autonomia, soberania e cidadania'],a:1,e:'O caput do art. 37 consagra legalidade, impessoalidade, moralidade, publicidade e eficiência.'},
{id:'dir02',s:'direito',t:'Atos',q:'Ato administrativo vinculado é aquele em que:',o:['a Administração escolhe livremente qualquer solução','a lei deixa espaço amplo de conveniência','a atuação deve observar estritamente os requisitos legais','não existe controle'],a:2,e:'No ato vinculado, a lei predetermina os elementos decisórios, reduzindo a margem de escolha administrativa.'},
{id:'dir03',s:'direito',t:'Poderes',q:'O poder hierárquico relaciona-se principalmente à:',o:['organização e distribuição de funções dentro da Administração','aplicação de pena criminal pelo Judiciário','produção de moeda','criação de partidos'],a:0,e:'É o poder de organização interna, delegação, avocação e coordenação na estrutura administrativa.'},
{id:'dir04',s:'direito',t:'Serviços',q:'Serviço público é, em termos gerais:',o:['atividade de interesse coletivo assumida/regulada pelo Estado conforme o ordenamento','qualquer atividade privada','somente atividade gratuita','atividade exclusiva do Judiciário'],a:0,e:'O conceito jurídico enfatiza o atendimento de necessidades coletivas sob regime jurídico próprio.'},
{id:'dir05',s:'direito',t:'Constitucional',q:'Os fundamentos da República estão no:',o:['art. 1º da CF','art. 37 da CF','art. 60 da CF','art. 170 da CF'],a:0,e:'O edital exige arts. 1º–4º; o art. 1º traz os fundamentos da República.'},
{id:'dir06',s:'direito',t:'Constitucional',q:'O princípio da igualdade está entre os direitos e garantias fundamentais do:',o:['art. 5º','art. 29','art. 37','art. 41'],a:0,e:'O art. 5º inicia o catálogo de direitos e deveres individuais e coletivos, incluindo a igualdade perante a lei.'},
{id:'dir07',s:'direito',t:'Municípios',q:'A autonomia municipal é tratada na Constituição dentro da Organização Político-Administrativa, incluindo o:',o:['art. 18','art. 5º','art. 12','art. 41'],a:0,e:'O edital destaca os arts. 18 e 19 e os arts. 29–31 para municípios.'},
{id:'dir08',s:'direito',t:'CF',q:'A Administração Pública direta e indireta de qualquer dos Poderes obedece aos princípios do art. 37:',o:['apenas nos estados','somente no Executivo federal','em todos os níveis e poderes alcançados pelo dispositivo','somente em autarquias'],a:2,e:'O art. 37 é aplicado à Administração direta e indireta nos termos constitucionais.'},
{id:'dir09',s:'direito',t:'Licitações',q:'A Lei 14.133/2021 trata principalmente de:',o:['direitos autorais','licitações e contratos administrativos','crimes eleitorais','processo penal'],a:1,e:'A Lei 14.133 é a Lei de Licitações e Contratos Administrativos.'},
{id:'dir10',s:'direito',t:'Licitações',q:'A Lei 14.133 estabelece normas gerais de licitação e contratação para Administrações Públicas e alcança, entre outros, órgãos do Legislativo municipal quando:',o:['sempre, sem exceção','no desempenho de função administrativa','somente em função jurisdicional','apenas se houver eleição'],a:1,e:'O art. 1º explicita a incidência nos órgãos do Legislativo municipal quando desempenham função administrativa.'},
{id:'dir11',s:'direito',t:'Improbidade',q:'Improbidade administrativa, conforme a disciplina constitucional/legal cobrada no edital, relaciona-se a:',o:['condutas ilícitas contra a Administração e a probidade pública','somente erros de digitação','regras de tipografia','somente acidentes de trânsito'],a:0,e:'É tema de integridade/probidade da Administração e possui disciplina legal específica.'},
{id:'dir12',s:'direito',t:'Ato',q:'A revogação de um ato administrativo, em regra, decorre de:',o:['ilegalidade necessariamente','razões de conveniência e oportunidade dentro dos limites legais','ordem de um particular','erro de ortografia'],a:1,e:'Revogação é retirada por razões de mérito administrativo; ilegalidade conduz à anulação.'},
{id:'dir13',s:'direito',t:'Ato',q:'A anulação de ato administrativo está associada à:',o:['conveniência','oportunidade','ilegalidade','publicidade'],a:2,e:'Anulação se vincula ao reconhecimento de ilegalidade.'},
{id:'dir14',s:'direito',t:'Direitos sociais',q:'No programa, os direitos sociais da CF cobrados incluem os arts.:',o:['1º–4º','6º–11','29º–31','44º–69º'],a:1,e:'O edital de nível superior especifica arts. 6º a 11 para direitos sociais.'},
{id:'dir15',s:'direito',t:'Direitos políticos',q:'Os direitos políticos são estudados, conforme o edital, nos arts.:',o:['12º–13º','14º–16º','18º–19º','37º–41º'],a:1,e:'O edital aponta arts. 14º–16º.'},

// MUNICÍPIO
{id:'mun01',s:'municipio',t:'História',q:'A origem da formação de Senador Canedo está ligada principalmente à:',o:['estrada de ferro da Rede Ferroviária Federal','construção de Brasília','mineração de ouro do século XVIII','atividade portuária'],a:0,e:'Segundo o histórico do IBGE, o crescimento do município está relacionado à construção da ferrovia.'},
{id:'mun02',s:'municipio',t:'História',q:'Antes de se chamar Senador Canedo, o povoado era denominado:',o:['Esplanada','Vila Nova','Campinas','Boa Vista'],a:0,e:'O histórico do IBGE informa que o povoado antes era denominado Esplanada.'},
{id:'mun03',s:'municipio',t:'História',q:'O distrito de Senador Canedo foi criado em:',o:['1930','1953','1968','1989'],a:1,e:'O IBGE registra distrito criado pela lei municipal nº 239 em 31/03/1953.'},
{id:'mun04',s:'municipio',t:'Emancipação',q:'A instalação do município de Senador Canedo foi efetivada em:',o:['31 de março de 1953','9 de janeiro de 1988','1º de junho de 1989','7 de setembro de 1990'],a:2,e:'O histórico administrativo do IBGE registra instalação em 01/06/1989.'},
{id:'mun05',s:'municipio',t:'Formação',q:'Senador Canedo foi desmembrado, segundo o histórico do IBGE, de:',o:['Goiânia, Bela Vista de Goiás e Aparecida de Goiânia','Trindade e Anápolis','Nerópolis e Goianira','Itumbiara e Goiatuba'],a:0,e:'O registro do IBGE informa desmembramento de Goiânia, Bela Vista de Goiás e Aparecida de Goiânia.'},
{id:'mun06',s:'municipio',t:'Lei Orgânica',q:'A Lei Orgânica municipal é:',o:['a norma básica de organização do município no âmbito de sua autonomia constitucional','uma lei federal de trânsito','um decreto estadual','um regulamento de escola'],a:0,e:'Ela funciona como norma fundamental de organização político-administrativa local, observada a Constituição.'},
{id:'mun07',s:'municipio',t:'Câmara',q:'No âmbito municipal, a Câmara exerce principalmente a função:',o:['legislativa e fiscalizadora','judicial criminal','militar','diplomática'],a:0,e:'A Câmara Municipal exerce função legislativa e de fiscalização, nos termos constitucionais e da Lei Orgânica.'},
{id:'mun08',s:'municipio',t:'Economia',q:'O edital pede especificamente estudo dos fatores:',o:['econômicos da cidade','somente esportivos','somente militares','somente climáticos'],a:0,e:'“Fatores Econômicos da Cidade” aparece expressamente no programa de conhecimentos sobre o município.'},
{id:'mun09',s:'municipio',t:'Geografia',q:'O programa de conhecimentos sobre o município inclui:',o:['aspectos geográficos e municípios circunvizinhos','somente fronteiras internacionais','somente oceanos','somente capitais estrangeiras'],a:0,e:'Esses dois itens aparecem diretamente no Anexo III.'},
{id:'mun10',s:'municipio',t:'Legislação',q:'Além da Lei Orgânica, o edital inclui no estudo municipal o:',o:['Estatuto do Servidor','Código Penal inteiro','Código Tributário Nacional inteiro','Código de Trânsito inteiro'],a:0,e:'O edital termina o tópico municipal com “Estatuto do Servidor”.'},

// DESIGN
{id:'des01',s:'design',t:'Gestalt',q:'Na Gestalt, o princípio da proximidade indica que elementos próximos tendem a ser percebidos como:',o:['um grupo','uma cor','uma textura','um ruído'],a:0,e:'A proximidade favorece a percepção de agrupamento entre elementos visualmente próximos.'},
{id:'des02',s:'design',t:'Gestalt',q:'A tendência de completar visualmente uma forma incompleta corresponde ao princípio de:',o:['fechamento','proporção áurea','saturação','grid'],a:0,e:'O fechamento descreve a tendência de completar lacunas para formar uma unidade perceptiva.'},
{id:'des03',s:'design',t:'Composição',q:'Hierarquia visual ajuda o leitor a:',o:['perceber a ordem de importância dos elementos','eliminar todo contraste','impedir alinhamentos','usar apenas uma fonte'],a:0,e:'Hierarquia organiza a atenção e indica o que deve ser percebido primeiro, depois e por último.'},
{id:'des04',s:'design',t:'Grid',q:'O grid em uma diagramação serve principalmente para:',o:['criar uma estrutura consistente de alinhamento e organização','aumentar automaticamente a resolução','transformar RGB em CMYK','licenciar fontes'],a:0,e:'Grades estruturam colunas, margens, módulos e alinhamentos.'},
{id:'des05',s:'design',t:'Tipografia',q:'Serifas são elementos tipográficos que:',o:['são pequenos traços/terminações nas extremidades das letras em determinadas famílias','são sempre sombras digitais','definem o tamanho do papel','substituem a cor'],a:0,e:'Serifas são extensões/terminações características de famílias serifadas.'},
{id:'des06',s:'design',t:'Legibilidade',q:'Para melhorar a legibilidade de um texto institucional, uma medida adequada é:',o:['aumentar contraste e respeitar espaçamento e tamanho apropriados','reduzir contraste ao mínimo','usar fontes decorativas em todo o texto','alinhar tudo aleatoriamente'],a:0,e:'Legibilidade depende de contraste, corpo, espaçamento, extensão de linha, hierarquia e escolha tipográfica.'},
{id:'des07',s:'design',t:'Cor',q:'RGB é um modelo de cor associado principalmente a:',o:['luz e meios digitais','mistura de tintas de impressão','papel jornal','acabamento de verniz'],a:0,e:'RGB é um modelo aditivo usado em telas e outros meios emissores de luz.'},
{id:'des08',s:'design',t:'Cor',q:'CMYK é associado principalmente à:',o:['impressão por processo de cores de tinta','iluminação de monitores','tipografia serifada','organização de arquivos'],a:0,e:'CMYK é um modelo/subtrativo utilizado na produção gráfica de impressão.'},
{id:'des09',s:'design',t:'Cor',q:'Saturação descreve, em termos gerais, a:',o:['intensidade/pureza aparente da cor','quantidade de margens','resolução do arquivo','distância entre colunas'],a:0,e:'Saturação está relacionada à intensidade relativa de uma cor.'},
{id:'des10',s:'design',t:'Institucional',q:'Em comunicação pública, a padronização visual tem como finalidade:',o:['garantir consistência e reconhecimento institucional','eliminar acessibilidade','permitir qualquer uso de logotipo','substituir conteúdo por decoração'],a:0,e:'Padronização fortalece consistência, reconhecimento e aplicação correta dos elementos institucionais.'},
{id:'des11',s:'design',t:'Identidade',q:'Um manual de identidade visual normalmente documenta:',o:['regras de aplicação da marca e seus elementos','somente o preço dos serviços','apenas o nome do designer','as leis penais'],a:0,e:'Manuais definem usos, versões, áreas de proteção, cores, tipografia e outras regras da identidade.'},
{id:'des12',s:'design',t:'Símbolos públicos',q:'O uso de brasões e símbolos públicos em peças institucionais deve:',o:['respeitar regras de aplicação e contexto institucional','ser modificado livremente para cada campanha','ignorar normas oficiais','usar sempre efeitos 3D'],a:0,e:'O edital cobra uso adequado de brasões, selos e símbolos públicos.'},
{id:'des13',s:'design',t:'Impressão',q:'A preparação de um arquivo para impressão exige atenção especial a:',o:['modo de cor, resolução, sangria/fechamento e especificações do processo','somente ao nome do arquivo','apenas ao wallpaper','apenas ao cursor do mouse'],a:0,e:'Produção gráfica exige parâmetros técnicos para evitar problemas na saída.'},
{id:'des14',s:'design',t:'Impressão',q:'Offset e impressão digital são:',o:['processos/tipos de impressão','tipos de fonte','formatos de imagem','modelos de grid'],a:0,e:'São processos de impressão previstos explicitamente no edital.'},
{id:'des15',s:'design',t:'Layout',q:'Margens em uma página ajudam a:',o:['criar respiro e organizar a área útil da composição','aumentar a saturação','criar um novo espaço de cor','substituir a tipografia'],a:0,e:'Margens delimitam a área de composição e contribuem para clareza e leitura.'},
{id:'des16',s:'design',t:'Digital',q:'Layout responsivo significa, em termos gerais:',o:['adaptar a apresentação ao tamanho/condições diferentes de tela','usar somente desktop','imprimir em A3','remover imagens'],a:0,e:'Responsividade adapta estrutura e conteúdo a diferentes dispositivos e resoluções.'},
{id:'des17',s:'design',t:'UX/UI',q:'UX está mais relacionada a:',o:['experiência do usuário ao interagir com o produto/serviço','somente escolha de tinta','apenas arquivos PDF','somente o logotipo'],a:0,e:'UX considera experiência, necessidades, fluxos e interação; UI trata mais diretamente da interface visual.'},
{id:'des18',s:'design',t:'WCAG',q:'Os quatro princípios da WCAG são:',o:['perceptível, operável, compreensível, robusto','rápido, bonito, barato, grande','RGB, CMYK, Pantone, HEX','grid, logo, fonte, papel'],a:0,e:'A WCAG 2 organiza suas diretrizes em quatro princípios: Perceivable, Operable, Understandable e Robust.'},
{id:'des19',s:'design',t:'Acessibilidade',q:'Uma prática coerente com acessibilidade digital é:',o:['não depender apenas da cor para comunicar uma diferença','usar somente cor para indicar erro','reduzir contraste para “ficar elegante”','bloquear teclado'],a:0,e:'WCAG inclui o critério de não usar a cor como único meio de transmitir informação.'},
{id:'des20',s:'design',t:'Direitos autorais',q:'A Lei 9.610/1998 trata de:',o:['direitos autorais','licitações','trânsito','impostos municipais'],a:0,e:'É a Lei de Direitos Autorais.'},
{id:'des21',s:'design',t:'Fontes',q:'Usar uma fonte em projeto profissional sem observar a licença pode gerar:',o:['problema jurídico/licenciamento','aumento automático de DPI','mudança de CMYK para RGB','melhor acessibilidade automaticamente'],a:0,e:'Fontes podem ter licenças específicas; uso profissional deve respeitar as condições aplicáveis.'},
{id:'des22',s:'design',t:'Imagens',q:'Uma fotografia encontrada na Internet deve ser usada em peça institucional:',o:['somente após verificar direitos/licença e finalidade de uso','sempre livremente porque está na Internet','sem crédito e sem licença','apenas se tiver alta resolução'],a:0,e:'Disponibilidade online não significa licença livre para qualquer uso.'},
{id:'des23',s:'design',t:'Comunicação pública',q:'No setor público, um projeto visual deve priorizar:',o:['clareza, acessibilidade, objetividade e adequação institucional','excesso de efeitos e ambiguidades','linguagem exclusivamente promocional de pessoa','desinformação visual'],a:0,e:'Esses princípios aparecem expressamente no programa do cargo.'},
{id:'des24',s:'design',t:'Impersonalidade',q:'A impessoalidade na comunicação institucional significa, entre outros aspectos:',o:['evitar promoção pessoal e manter foco institucional/público','dar destaque ao autor do projeto','usar a foto do gestor em toda peça','transformar comunicação pública em publicidade pessoal'],a:0,e:'Impessoalidade é princípio constitucional e aparece também no conteúdo específico do designer.'},
{id:'des25',s:'design',t:'Formatos',q:'Ao definir um arquivo para uma imagem fotográfica destinada à web, uma preocupação importante é:',o:['dimensões, compressão e resolução adequadas ao uso digital','usar sempre 3000 DPI sem considerar contexto','converter tudo para CMYK obrigatoriamente','eliminar qualquer texto alternativo'],a:0,e:'Meios digitais exigem equilíbrio entre qualidade, peso e dimensões, além de acessibilidade.'},
];

const extraQuestions = [
  {
    "id": "pt16",
    "s": "pt",
    "t": "Interpretação",
    "d": "medium",
    "q": "Leia: “A Câmara publicou o calendário da audiência. O documento, porém, não informa se haverá transmissão ao vivo.” A conclusão de que a audiência terá transmissão ao vivo é, em relação ao texto, uma:",
    "o": [
      "inferência obrigatória",
      "inferência não sustentada",
      "pressuposição linguística",
      "informação explícita"
    ],
    "a": 1,
    "e": "O texto informa apenas que o documento não diz se haverá transmissão. Não há base textual para concluir que haverá transmissão."
  },
  {
    "id": "pt17",
    "s": "pt",
    "t": "Ambiguidade",
    "d": "hard",
    "q": "Em “O diretor informou ao servidor que ele deveria revisar o relatório”, o pronome “ele” pode gerar ambiguidade porque:",
    "o": [
      "não há verbo na oração",
      "pode retomar mais de um referente possível no contexto",
      "pronomes nunca podem retomar pessoas",
      "o verbo informar é necessariamente impessoal"
    ],
    "a": 1,
    "e": "Tanto “diretor” quanto “servidor” podem, isoladamente, ser interpretados como antecedente de “ele”. O contexto precisa desambiguar a referência."
  },
  {
    "id": "pt18",
    "s": "pt",
    "t": "Coesão e conectivos",
    "d": "medium",
    "q": "Em “O relatório estava incompleto; por isso, a equipe adiou a publicação”, a expressão “por isso” estabelece relação de:",
    "o": [
      "conclusão/consequência",
      "oposição",
      "condição",
      "concessão"
    ],
    "a": 0,
    "e": "“Por isso” introduz uma conclusão ou consequência decorrente da informação anterior."
  },
  {
    "id": "pt19",
    "s": "pt",
    "t": "Paralelismo",
    "d": "medium",
    "q": "Assinale a redação que preserva paralelismo sintático: “A equipe precisa ____ os arquivos, ____ as pendências e ____ o índice.”",
    "o": [
      "organizar / conferir / atualizar",
      "de organizar / conferindo / atualizar",
      "organização / conferir / atualização",
      "organizar / a conferência / atualizar"
    ],
    "a": 0,
    "e": "As três ações aparecem no infinitivo, mantendo a mesma estrutura sintática: organizar, conferir, atualizar."
  },
  {
    "id": "pt20",
    "s": "pt",
    "t": "Crase",
    "d": "hard",
    "q": "Assinale a alternativa em que o emprego do acento indicativo de crase está adequado à norma-padrão:",
    "o": [
      "O parecer é favorável àquelas medidas.",
      "A comissão começou à revisar o texto.",
      "O setor entregou o arquivo à um servidor.",
      "A reunião ocorreu de segunda à sexta, sem contexto adicional."
    ],
    "a": 0,
    "e": "Em “favorável àquelas”, há a preposição exigida por “favorável a” + o demonstrativo “aquelas”. As demais alternativas trazem construções inadequadas ou dependentes de contexto que não autoriza a crase apresentada."
  },
  {
    "id": "pt21",
    "s": "pt",
    "t": "Concordância",
    "d": "hard",
    "q": "Assinale a alternativa de acordo com a norma-padrão:",
    "o": [
      "Mais de um candidato apresentaram recurso.",
      "Fui eu que organizou os arquivos.",
      "Mais de um documento foi revisado pela equipe.",
      "Houveram alterações no cronograma."
    ],
    "a": 2,
    "e": "A expressão “mais de um”, em regra, leva o verbo ao singular quando indica unidade: “mais de um documento foi revisado”. “Haver” no sentido de existir também é impessoal: “houve”, não “houveram”."
  },
  {
    "id": "pt22",
    "s": "pt",
    "t": "Regência",
    "d": "hard",
    "q": "Segundo a norma-padrão, assinale a construção adequada:",
    "o": [
      "Prefiro revisar o texto do que diagramá-lo.",
      "Prefiro revisar o texto a diagramá-lo.",
      "Prefiro mais revisar o texto a diagramá-lo.",
      "Prefiro revisar o texto que diagramá-lo."
    ],
    "a": 1,
    "e": "O verbo “preferir”, na construção normativa clássica, rege a estrutura “preferir X a Y”, sem “mais” e sem “do que”."
  },
  {
    "id": "pt23",
    "s": "pt",
    "t": "Colocação pronominal",
    "d": "hard",
    "q": "Assinale a opção em conformidade com o padrão geral de colocação pronominal: ",
    "o": [
      "Quando publicar-se o edital, avisaremos.",
      "Quando se publicar o edital, avisaremos.",
      "Quando publicará-se o edital, avisaremos.",
      "Quando o edital publicar-se, avisaremos."
    ],
    "a": 1,
    "e": "A conjunção subordinativa “quando” favorece a próclise: “quando se publicar”."
  },
  {
    "id": "pt24",
    "s": "pt",
    "t": "Período composto",
    "d": "medium",
    "q": "Em “Embora o prazo fosse curto, a equipe concluiu a revisão”, a oração iniciada por “Embora” expressa ideia de:",
    "o": [
      "causa",
      "concessão",
      "condição",
      "finalidade"
    ],
    "a": 1,
    "e": "“Embora” é conjunção subordinativa concessiva e introduz um fato que não impede a realização da oração principal."
  },
  {
    "id": "pt25",
    "s": "pt",
    "t": "Pontuação e sentido",
    "d": "hard",
    "q": "Compare: I. “Os servidores, que participaram da reunião, receberam o documento.” II. “Os servidores que participaram da reunião receberam o documento.” A diferença principal é que:",
    "o": [
      "na I, a oração entre vírgulas tem valor explicativo; na II, tende a restringir o grupo de servidores",
      "na I, há erro obrigatório de concordância",
      "na II, a oração é sempre explicativa",
      "as duas frases são semanticamente idênticas em qualquer contexto"
    ],
    "a": 0,
    "e": "As vírgulas alteram a relação da oração relativa com o antecedente. Sem vírgulas, a oração tende a restringir quais servidores receberam o documento."
  },
  {
    "id": "info13",
    "s": "info",
    "t": "Algoritmos",
    "d": "hard",
    "q": "Considere o pseudocódigo: “x ← 2; para i de 1 até 3 faça x ← x × i; fim”. Ao final da execução, o valor de x será:",
    "o": [
      "6",
      "10",
      "12",
      "24"
    ],
    "a": 2,
    "e": "Começando em 2: após i=1, x=2; i=2, x=4; i=3, x=12."
  },
  {
    "id": "info14",
    "s": "info",
    "t": "Sistemas operacionais",
    "d": "medium",
    "q": "Em um sistema operacional, uma estrutura como “pasta” é usada principalmente para:",
    "o": [
      "organizar arquivos e outras pastas de forma hierárquica",
      "substituir a memória RAM",
      "converter RGB em CMYK",
      "autenticar automaticamente qualquer usuário na rede"
    ],
    "a": 0,
    "e": "Pastas/diretórios organizam arquivos e subdiretórios, formando uma estrutura hierárquica."
  },
  {
    "id": "info15",
    "s": "info",
    "t": "Importação e exportação",
    "d": "medium",
    "q": "Ao exportar uma planilha para CSV, uma consequência típica é que:",
    "o": [
      "o formato preserva integralmente todos os recursos visuais da planilha original",
      "os dados são representados como texto delimitado, com perda de recursos específicos da planilha",
      "o arquivo passa a ser obrigatoriamente um banco de dados relacional",
      "o conteúdo deixa de poder ser aberto em outros programas"
    ],
    "a": 1,
    "e": "CSV é um formato de dados tabulares delimitados. Recursos como fórmulas, estilos e gráficos específicos da planilha podem não ser preservados."
  },
  {
    "id": "info16",
    "s": "info",
    "t": "Redes",
    "d": "hard",
    "q": "Em uma rede corporativa, o serviço DHCP tem como função típica:",
    "o": [
      "resolver nomes de domínio em endereços IP",
      "atribuir/configurar automaticamente parâmetros de rede aos dispositivos",
      "filtrar todo tráfego malicioso como um antivírus",
      "armazenar páginas web"
    ],
    "a": 1,
    "e": "DHCP distribui configurações de rede, como endereço IP, gateway e DNS, conforme a configuração do ambiente."
  },
  {
    "id": "info17",
    "s": "info",
    "t": "Internet",
    "d": "medium",
    "q": "A principal diferença funcional entre autenticação e autorização é que:",
    "o": [
      "autenticação verifica identidade; autorização define permissões",
      "autenticação define permissões; autorização verifica identidade",
      "ambas são sinônimos",
      "autorização só existe em redes sem fio"
    ],
    "a": 0,
    "e": "Autenticação responde “quem é você?”. Autorização responde “o que você pode acessar/fazer?”."
  },
  {
    "id": "info18",
    "s": "info",
    "t": "Segurança",
    "d": "hard",
    "q": "Um usuário recebe mensagem urgente pedindo que clique em um link e informe senha em página que imita o portal institucional. O fenômeno descrito é, principalmente:",
    "o": [
      "phishing/engenharia social",
      "fragmentação de disco",
      "compressão de dados",
      "topologia em estrela"
    ],
    "a": 0,
    "e": "A técnica tenta induzir o usuário a fornecer dados por meio de fraude e manipulação. Isso caracteriza phishing e engenharia social."
  },
  {
    "id": "info19",
    "s": "info",
    "t": "Cloud computing",
    "d": "hard",
    "q": "Uma equipe usa uma plataforma na nuvem na qual já recebe ambiente de execução, ferramentas e recursos necessários para desenvolver e publicar aplicações, sem administrar diretamente a infraestrutura física. O modelo descrito é mais compatível com:",
    "o": [
      "IaaS",
      "PaaS",
      "SaaS",
      "rede ponto a ponto"
    ],
    "a": 1,
    "e": "PaaS oferece uma plataforma/ambiente para desenvolvimento e execução de aplicações, abstraindo boa parte da infraestrutura subjacente."
  },
  {
    "id": "info20",
    "s": "info",
    "t": "Backup",
    "d": "hard",
    "q": "Uma política de backup é mais robusta quando, além de criar cópias, define também:",
    "o": [
      "somente o nome do arquivo",
      "periodicidade, retenção, localização das cópias e procedimento de restauração/teste",
      "apenas o papel de parede dos computadores",
      "somente a cor dos ícones"
    ],
    "a": 1,
    "e": "Backup útil depende de estratégia: quando copiar, por quanto tempo manter, onde guardar e como restaurar/verificar as cópias."
  },
  {
    "id": "math13",
    "s": "math",
    "t": "Regra de três composta",
    "d": "hard",
    "q": "Uma equipe de 4 pessoas produz 120 páginas em 6 horas. Mantendo a mesma produtividade, quantas páginas 6 pessoas produzirão em 5 horas?",
    "o": [
      "150",
      "180",
      "200",
      "240"
    ],
    "a": 1,
    "e": "A produção é proporcional ao número de pessoas e ao tempo: 120 × (6/4) × (5/6) = 150. Portanto, a alternativa correta é 150."
  },
  {
    "id": "math14",
    "s": "math",
    "t": "Porcentagem",
    "d": "hard",
    "q": "Um equipamento custa R$ 800. Recebe desconto de 10% e, depois, acréscimo de 10% sobre o novo preço. O preço final é:",
    "o": [
      "R$ 800,00",
      "R$ 792,00",
      "R$ 810,00",
      "R$ 880,00"
    ],
    "a": 1,
    "e": "Após 10% de desconto: 800×0,90=720. Acréscimo de 10%: 720×1,10=792. Percentuais sucessivos não se anulam."
  },
  {
    "id": "math15",
    "s": "math",
    "t": "Juros simples",
    "d": "medium",
    "q": "Um capital de R$ 2.500 é aplicado a juros simples de 1,6% ao mês por 5 meses. O montante será:",
    "o": [
      "R$ 2.540",
      "R$ 2.600",
      "R$ 2.700",
      "R$ 2.900"
    ],
    "a": 2,
    "e": "J = 2.500×0,016×5 = 200. Montante = 2.500+200 = 2.700."
  },
  {
    "id": "math16",
    "s": "math",
    "t": "Sistemas lineares",
    "d": "hard",
    "q": "Resolva o sistema: x + y = 11 e 2x − y = 7. O par ordenado (x,y) é:",
    "o": [
      "(4,7)",
      "(5,6)",
      "(6,5)",
      "(7,4)"
    ],
    "a": 2,
    "e": "Somando as equações: 3x=18, então x=6. Logo y=5."
  },
  {
    "id": "math17",
    "s": "math",
    "t": "PG",
    "d": "medium",
    "q": "Em uma PG, o primeiro termo é 3 e a razão é 2. O quinto termo é:",
    "o": [
      "24",
      "36",
      "48",
      "60"
    ],
    "a": 2,
    "e": "a5 = a1·q^(5−1) = 3×2^4 = 48."
  },
  {
    "id": "math18",
    "s": "math",
    "t": "Combinatória",
    "d": "hard",
    "q": "Cinco arquivos diferentes serão organizados em uma sequência, sem repetição. Quantas ordens distintas são possíveis?",
    "o": [
      "20",
      "60",
      "100",
      "120"
    ],
    "a": 3,
    "e": "É uma permutação de 5 elementos: 5! = 120."
  },
  {
    "id": "math19",
    "s": "math",
    "t": "Probabilidade",
    "d": "hard",
    "q": "Uma caixa contém 3 cartões azuis e 2 vermelhos. Retiram-se 2 cartões sem reposição. A probabilidade de ambos serem azuis é:",
    "o": [
      "1/5",
      "3/10",
      "2/5",
      "1/2"
    ],
    "a": 1,
    "e": "P = 3/5 × 2/4 = 6/20 = 3/10."
  },
  {
    "id": "math20",
    "s": "math",
    "t": "Estatística",
    "d": "hard",
    "q": "Os valores 4, 5, 5, 8 e x têm média 6. Qual é a mediana do conjunto quando x=8?",
    "o": [
      "5",
      "6",
      "7",
      "8"
    ],
    "a": 0,
    "e": "A média 6 em 5 valores implica soma total 30. Assim, x=8. Ordenando 4,5,5,8,8, a mediana é 5."
  },
  {
    "id": "dir16",
    "s": "direito",
    "t": "CF — concurso público",
    "d": "hard",
    "q": "Segundo o art. 37 da Constituição, a investidura em cargo ou emprego público depende, em regra, de:",
    "o": [
      "indicação política sem exceções",
      "aprovação prévia em concurso público, ressalvadas as nomeações para cargos em comissão declarados em lei de livre nomeação e exoneração",
      "apenas entrevista",
      "sorteio público"
    ],
    "a": 1,
    "e": "O art. 37, II, estabelece concurso público como regra para investidura, ressalvadas as nomeações para cargos em comissão de livre nomeação e exoneração."
  },
  {
    "id": "dir17",
    "s": "direito",
    "t": "CF — acumulação",
    "d": "hard",
    "q": "A acumulação remunerada de cargos públicos, quando excepcionalmente permitida pela Constituição, exige também:",
    "o": [
      "incompatibilidade de horários",
      "compatibilidade de horários e observância das hipóteses constitucionais",
      "autorização de qualquer particular",
      "ausência de concurso público"
    ],
    "a": 1,
    "e": "A Constituição admite hipóteses específicas de acumulação, desde que haja compatibilidade de horários e sejam atendidos os requisitos constitucionais."
  },
  {
    "id": "dir18",
    "s": "direito",
    "t": "CF — municípios",
    "d": "medium",
    "q": "A Lei Orgânica do Município é promulgada pela:",
    "o": [
      "Câmara Municipal, observados os princípios da Constituição Federal e da Constituição estadual",
      "Presidência da República",
      "Assembleia Legislativa, sozinha",
      "Tribunal de Justiça"
    ],
    "a": 0,
    "e": "O art. 29 da CF prevê a Lei Orgânica municipal promulgada pela Câmara Municipal, conforme o procedimento constitucional."
  },
  {
    "id": "dir19",
    "s": "direito",
    "t": "CF — direitos políticos",
    "d": "medium",
    "q": "O voto, segundo o art. 14 da Constituição Federal, é, em regra, direto, secreto, universal e:",
    "o": [
      "periódico",
      "hereditário",
      "censitário",
      "corporativo"
    ],
    "a": 0,
    "e": "O art. 14 estabelece o sufrágio universal e o voto direto e secreto, com valor igual para todos, nos termos constitucionais; ele é também periódico."
  },
  {
    "id": "dir20",
    "s": "direito",
    "t": "CF — nacionalidade",
    "d": "hard",
    "q": "É brasileiro nato, nos termos do art. 12, aquele que:",
    "o": [
      "nasce no Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país",
      "nasce no exterior em qualquer circunstância",
      "é naturalizado por decisão administrativa",
      "possui apenas residência no Brasil"
    ],
    "a": 0,
    "e": "A Constituição considera brasileiros natos os nascidos na República Federativa do Brasil, ainda que de pais estrangeiros, desde que estes não estejam a serviço de seu país."
  },
  {
    "id": "dir21",
    "s": "direito",
    "t": "Lei 14.133/2021",
    "d": "hard",
    "q": "Na Lei 14.133/2021, a inexigibilidade de licitação está relacionada principalmente à hipótese em que:",
    "o": [
      "a competição é inviável",
      "a Administração quer ignorar o planejamento",
      "há sempre vários fornecedores perfeitamente substituíveis",
      "a licitação é obrigatória e já terminou"
    ],
    "a": 0,
    "e": "A inexigibilidade decorre de situações em que a competição é inviável, diferentemente da dispensa, em que a competição é possível, mas a lei autoriza não licitar em hipóteses previstas."
  },
  {
    "id": "dir22",
    "s": "direito",
    "t": "Lei 14.133/2021",
    "d": "medium",
    "q": "Entre as modalidades de licitação previstas na Lei 14.133/2021 está:",
    "o": [
      "pregão",
      "consulta pública",
      "tomada de preços",
      "carta-convite"
    ],
    "a": 0,
    "e": "A Lei 14.133/2021 prevê, entre outras, pregão, concorrência, concurso, leilão e diálogo competitivo. Tomada de preços e convite são modalidades do regime anterior."
  },
  {
    "id": "dir23",
    "s": "direito",
    "t": "Atos administrativos",
    "d": "hard",
    "q": "A retirada de um ato administrativo por ilegalidade é, em regra, chamada de:",
    "o": [
      "revogação",
      "anulação",
      "delegação",
      "avocação"
    ],
    "a": 1,
    "e": "Anulação está ligada à ilegalidade. Revogação decorre de razões de conveniência e oportunidade, respeitados os limites legais."
  },
  {
    "id": "dir24",
    "s": "direito",
    "t": "Poder de polícia",
    "d": "medium",
    "q": "O poder de polícia administrativa é voltado, em termos gerais, a:",
    "o": [
      "condicionar ou restringir atividades e direitos em benefício do interesse coletivo, conforme a lei",
      "julgar definitivamente crimes",
      "editar a Constituição",
      "substituir o Poder Legislativo"
    ],
    "a": 0,
    "e": "O poder de polícia administrativa limita ou disciplina direitos, interesses e liberdades em favor do interesse público, dentro da competência legal."
  },
  {
    "id": "dir25",
    "s": "direito",
    "t": "Princípios",
    "d": "medium",
    "q": "No caput do art. 37, a publicidade na Administração Pública deve ser compreendida juntamente com os demais princípios, não significando que:",
    "o": [
      "todo e qualquer dado possa ser divulgado sem considerar exceções legais",
      "a atuação administrativa deva observar transparência nos termos do ordenamento",
      "a publicidade integra o conjunto de princípios expressos do dispositivo",
      "a divulgação institucional deva observar limites legais"
    ],
    "a": 0,
    "e": "Publicidade é princípio constitucional, mas o ordenamento admite hipóteses de sigilo e proteção de informações, quando previstas legalmente."
  },
  {
    "id": "mun11",
    "s": "municipio",
    "t": "História administrativa",
    "d": "medium",
    "q": "Segundo o histórico do IBGE, em 1988 a Assembleia Legislativa aprovou a emancipação de Senador Canedo, e a instalação do município ocorreu em:",
    "o": [
      "1953",
      "1988",
      "1º de junho de 1989",
      "2001"
    ],
    "a": 2,
    "e": "O distrito foi criado em 1953; a lei estadual de emancipação é de 09/01/1988 e a instalação do município foi efetivada em 01/06/1989."
  },
  {
    "id": "mun12",
    "s": "municipio",
    "t": "História",
    "d": "hard",
    "q": "A sequência cronológica correta é:",
    "o": [
      "instalação do município → criação do distrito → emancipação",
      "criação do distrito → emancipação → instalação do município",
      "emancipação → instalação → criação do distrito",
      "emancipação → criação do distrito → instalação"
    ],
    "a": 1,
    "e": "O distrito foi criado em 31/03/1953; a emancipação foi aprovada em 1988; a instalação ocorreu em 01/06/1989."
  },
  {
    "id": "mun13",
    "s": "municipio",
    "t": "História",
    "d": "medium",
    "q": "O antigo nome do povoado que deu origem ao atual Senador Canedo era:",
    "o": [
      "Esplanada",
      "Vargem Alta",
      "Vila Canedo",
      "Estação Goiás"
    ],
    "a": 0,
    "e": "O histórico do IBGE informa que o povoado era denominado Esplanada antes de receber o nome Senador Canedo."
  },
  {
    "id": "mun14",
    "s": "municipio",
    "t": "Formação",
    "d": "hard",
    "q": "Segundo o histórico administrativo do IBGE, o município de Senador Canedo foi desmembrado de:",
    "o": [
      "Goiânia, Bela Vista de Goiás e Aparecida de Goiânia",
      "Goiânia e Trindade apenas",
      "Anápolis e Goianápolis",
      "Bela Vista e Bonfinópolis"
    ],
    "a": 0,
    "e": "O registro do IBGE indica desmembramento de Goiânia, Bela Vista de Goiás e Aparecida de Goiânia."
  },
  {
    "id": "mun15",
    "s": "municipio",
    "t": "História",
    "d": "medium",
    "q": "Segundo o histórico do IBGE, as primeiras famílias de trabalhadores ligadas à construção da ferrovia eram oriundas, principalmente, dos estados de:",
    "o": [
      "Minas Gerais e Bahia",
      "Pará e Amazonas",
      "São Paulo e Paraná",
      "Ceará e Pernambuco"
    ],
    "a": 0,
    "e": "O histórico do IBGE registra que as primeiras famílias de trabalhadores eram oriundas de Minas Gerais e Bahia."
  },
  {
    "id": "mun16",
    "s": "municipio",
    "t": "História",
    "d": "hard",
    "q": "Qual associação está correta?",
    "o": [
      "1953 — criação do distrito; 1988 — aprovação da emancipação; 1989 — instalação do município",
      "1953 — instalação; 1988 — criação do distrito; 1989 — emancipação",
      "1988 — criação do distrito; 1989 — aprovação da emancipação; 1995 — instalação",
      "1953 — emancipação; 1988 — instalação; 1989 — criação do distrito"
    ],
    "a": 0,
    "e": "Essa é a sequência histórica registrada pelo IBGE."
  },
  {
    "id": "des26",
    "s": "design",
    "t": "Gestalt",
    "d": "medium",
    "q": "Uma composição apresenta vários elementos agrupados visualmente por proximidade e, ao mesmo tempo, separados de outro conjunto por maior distância. O princípio de Gestalt mais diretamente envolvido é:",
    "o": [
      "proximidade",
      "fechamento",
      "saturação",
      "perspectiva"
    ],
    "a": 0,
    "e": "A proximidade favorece a percepção de elementos como pertencentes a um mesmo grupo."
  },
  {
    "id": "des27",
    "s": "design",
    "t": "Gestalt",
    "d": "hard",
    "q": "Em um cartaz, linhas descontínuas são percebidas como pertencentes a uma mesma trajetória devido ao alinhamento e à continuidade visual. O princípio mais diretamente relacionado é:",
    "o": [
      "continuidade",
      "proximidade apenas",
      "simetria cromática",
      "textura"
    ],
    "a": 0,
    "e": "A continuidade orienta a percepção para trajetórias e formas contínuas, mesmo quando há interrupções."
  },
  {
    "id": "des28",
    "s": "design",
    "t": "Hierarquia visual",
    "d": "hard",
    "q": "Um informativo tem título, subtítulo, corpo e nota de rodapé com o mesmo tamanho, peso e contraste. O problema de comunicação mais provável é:",
    "o": [
      "falta de hierarquia visual",
      "excesso de resolução",
      "uso obrigatório de CMYK",
      "presença de fechamento de arquivo"
    ],
    "a": 0,
    "e": "Sem diferenciação visual, o leitor tem dificuldade para perceber a ordem de importância das informações."
  },
  {
    "id": "des29",
    "s": "design",
    "t": "Tipografia",
    "d": "medium",
    "q": "Para um relatório institucional extenso, uma escolha tipográfica adequada deve considerar prioritariamente:",
    "o": [
      "legibilidade, consistência e adequação ao meio e ao público",
      "apenas o estilo decorativo da fonte",
      "usar o maior número possível de famílias",
      "efeitos 3D para destacar todo parágrafo"
    ],
    "a": 0,
    "e": "Em texto corrido, legibilidade e consistência são critérios centrais. A escolha também depende do meio e do público."
  },
  {
    "id": "des30",
    "s": "design",
    "t": "Tipografia",
    "d": "hard",
    "q": "Ao ajustar a distância entre linhas de um texto corrido, o objetivo principal do entrelinhamento adequado é:",
    "o": [
      "facilitar o percurso visual entre uma linha e outra",
      "substituir a hierarquia do título",
      "transformar o texto em imagem vetorial",
      "aumentar automaticamente a saturação"
    ],
    "a": 0,
    "e": "O entrelinhamento influencia ritmo, conforto e legibilidade, ajudando o leitor a acompanhar as linhas."
  },
  {
    "id": "des31",
    "s": "design",
    "t": "Cor",
    "d": "medium",
    "q": "RGB é mais diretamente associado a:",
    "o": [
      "meios luminosos, como telas",
      "processos de impressão exclusivamente",
      "acabamentos de papel",
      "tipografia serifada"
    ],
    "a": 0,
    "e": "RGB é um modelo de cor aditivo associado principalmente a telas e outros meios emissores de luz."
  },
  {
    "id": "des32",
    "s": "design",
    "t": "Cor",
    "d": "hard",
    "q": "Uma peça criada inicialmente em RGB será enviada para impressão. Antes da produção, uma etapa relevante é:",
    "o": [
      "avaliar a conversão/adequação para o processo de impressão e o espaço de cor utilizado",
      "aumentar o brilho da tela para 100%",
      "eliminar todas as imagens",
      "transformar todo texto em fotografia"
    ],
    "a": 0,
    "e": "A preparação para impressão exige verificar o espaço de cor e como as cores serão reproduzidas no processo escolhido."
  },
  {
    "id": "des33",
    "s": "design",
    "t": "Produção gráfica",
    "d": "hard",
    "q": "Uma arte será impressa com corte posterior. Para que elementos que chegam à borda tenham margem de segurança para o corte, é importante prever:",
    "o": [
      "sangria e configuração correta de fechamento, quando exigidas pelo processo",
      "somente aumento de zoom no editor",
      "apenas fundo transparente",
      "somente compressão JPEG máxima"
    ],
    "a": 0,
    "e": "A sangria estende a arte além do limite final para acomodar pequenas variações de corte; o fechamento deve seguir a especificação da gráfica."
  },
  {
    "id": "des34",
    "s": "design",
    "t": "Imagem digital",
    "d": "medium",
    "q": "A principal diferença entre um elemento vetorial e uma fotografia rasterizada é que:",
    "o": [
      "vetores são descritos por formas matemáticas e podem ser redimensionados sem a mesma perda de definição típica de uma imagem raster",
      "raster nunca usa pixels",
      "vetor é sempre uma fotografia",
      "raster só existe em impressão"
    ],
    "a": 0,
    "e": "Gráficos vetoriais representam formas por descrições geométricas; imagens raster são formadas por pixels e podem perder definição quando ampliadas além de sua resolução."
  },
  {
    "id": "des35",
    "s": "design",
    "t": "Resolução",
    "d": "hard",
    "q": "Uma imagem tem 800 × 600 pixels. Aumentar seu valor de DPI em um editor, sem acrescentar novos pixels nem alterar o tamanho físico de saída de forma correspondente, não cria automaticamente:",
    "o": [
      "mais detalhes reais na imagem",
      "um novo perfil de cor",
      "uma nova tipografia",
      "uma nova camada vetorial"
    ],
    "a": 0,
    "e": "Resolução de saída e densidade não inventam detalhes que não estão presentes nos dados da imagem original."
  },
  {
    "id": "des36",
    "s": "design",
    "t": "Produção gráfica",
    "d": "hard",
    "q": "Antes de liberar uma cartilha institucional para uma gráfica, a revisão mais adequada inclui, entre outros itens:",
    "o": [
      "texto, alinhamentos, imagens, sangria, cores, resolução e especificações do acabamento",
      "somente o nome do arquivo",
      "apenas o tamanho do monitor",
      "somente a cor do aplicativo usado"
    ],
    "a": 0,
    "e": "A revisão pré-impressão deve conferir conteúdo e parâmetros técnicos que impactam a saída final."
  },
  {
    "id": "des37",
    "s": "design",
    "t": "Softwares",
    "d": "medium",
    "q": "Para um relatório de muitas páginas com estilos, páginas-mestre e organização editorial, a ferramenta mais diretamente associada a essa tarefa é:",
    "o": [
      "Adobe InDesign ou equivalente de editoração",
      "Adobe Photoshop apenas",
      "calculadora do sistema",
      "editor de áudio"
    ],
    "a": 0,
    "e": "Softwares de editoração, como InDesign, são voltados a documentos multipáginas, estilos e composição editorial."
  },
  {
    "id": "des38",
    "s": "design",
    "t": "Softwares",
    "d": "medium",
    "q": "Para criar um logotipo composto principalmente por formas geométricas que precisam ser ampliadas para diferentes tamanhos, uma ferramenta vetorial como Illustrator ou CorelDRAW é adequada porque:",
    "o": [
      "trabalha com elementos vetoriais escaláveis",
      "grava apenas pixels fixos",
      "é exclusiva para correção fotográfica",
      "não permite curvas"
    ],
    "a": 0,
    "e": "Ferramentas vetoriais são adequadas para logotipos e formas escaláveis."
  },
  {
    "id": "des39",
    "s": "design",
    "t": "Tratamento de imagem",
    "d": "hard",
    "q": "Ao corrigir exposição e enquadramento de uma fotografia para uma peça institucional, o trabalho está mais relacionado a:",
    "o": [
      "tratamento/edição de imagens",
      "fechamento jurídico do documento",
      "topologia de rede",
      "criação de tabela de dados"
    ],
    "a": 0,
    "e": "Correções de exposição, enquadramento e cor são tarefas típicas de tratamento de imagem."
  },
  {
    "id": "des40",
    "s": "design",
    "t": "Identidade visual",
    "d": "hard",
    "q": "O principal papel de um manual de identidade visual é:",
    "o": [
      "estabelecer regras consistentes de uso dos elementos da identidade",
      "permitir alterações arbitrárias do logotipo em cada peça",
      "substituir todo conteúdo textual",
      "definir a legislação municipal"
    ],
    "a": 0,
    "e": "O manual documenta regras de aplicação para manter consistência e reconhecimento da identidade."
  },
  {
    "id": "des41",
    "s": "design",
    "t": "Identidade institucional",
    "d": "hard",
    "q": "Um símbolo oficial aparece em um card com proporção distorcida e cores diferentes das versões institucionais aprovadas. A primeira ação de controle visual deve ser:",
    "o": [
      "restaurar a aplicação conforme as regras oficiais/identidade definida",
      "aumentar os efeitos visuais",
      "deixar a distorção para destacar o card",
      "apagar todas as margens"
    ],
    "a": 0,
    "e": "Símbolos oficiais e identidades institucionais devem seguir as regras estabelecidas e não ser alterados arbitrariamente."
  },
  {
    "id": "des42",
    "s": "design",
    "t": "Comunicação pública",
    "d": "hard",
    "q": "Uma peça institucional destinada a divulgar uma prestação de contas deve priorizar:",
    "o": [
      "clareza dos dados, legibilidade, contexto e foco no interesse público",
      "promoção pessoal de uma autoridade",
      "linguagem ambígua para aumentar curiosidade",
      "excesso de efeitos para esconder informações"
    ],
    "a": 0,
    "e": "Comunicação pública deve facilitar compreensão das informações e preservar o caráter institucional."
  },
  {
    "id": "des43",
    "s": "design",
    "t": "Impersonalidade",
    "d": "hard",
    "q": "Em um banner institucional sobre uma obra pública, qual solução é mais compatível com o princípio da impessoalidade?",
    "o": [
      "destacar informações sobre a obra e o serviço público, sem transformar a peça em promoção pessoal de agente público",
      "usar foto do agente em tamanho maior que a informação principal",
      "associar o nome da obra ao slogan pessoal do gestor",
      "usar cores de campanha eleitoral"
    ],
    "a": 0,
    "e": "A comunicação institucional deve se concentrar no serviço/informação pública e evitar promoção pessoal."
  },
  {
    "id": "des44",
    "s": "design",
    "t": "Infográficos",
    "d": "medium",
    "q": "Ao transformar dados públicos em infográfico, uma decisão de design adequada é:",
    "o": [
      "usar hierarquia e representação visual que preserve a compreensão dos dados",
      "distorcer escalas para deixar o gráfico mais chamativo",
      "retirar unidades para simplificar",
      "usar somente efeitos 3D"
    ],
    "a": 0,
    "e": "O designer deve facilitar leitura sem distorcer o significado dos dados."
  },
  {
    "id": "des45",
    "s": "design",
    "t": "Wayfinding",
    "d": "medium",
    "q": "Placas de orientação interna em um prédio público são exemplos de uma aplicação relacionada a:",
    "o": [
      "wayfinding/sinalização",
      "tratamento fotográfico",
      "análise combinatória",
      "código-fonte"
    ],
    "a": 0,
    "e": "Wayfinding compreende recursos que orientam pessoas em ambientes físicos, como placas e mapas."
  },
  {
    "id": "des46",
    "s": "design",
    "t": "Web",
    "d": "medium",
    "q": "Uma interface responsiva deve:",
    "o": [
      "reorganizar ou adaptar conteúdo e componentes para diferentes tamanhos/condições de tela",
      "manter sempre a mesma largura fixa",
      "funcionar apenas em desktop",
      "eliminar navegação por teclado"
    ],
    "a": 0,
    "e": "Responsividade adapta a apresentação e a interação a diferentes dispositivos e condições de tela."
  },
  {
    "id": "des47",
    "s": "design",
    "t": "UX/UI",
    "d": "hard",
    "q": "Um portal público tem menus visualmente bonitos, mas usuários não conseguem descobrir onde consultar um serviço. O problema aponta principalmente para uma deficiência de:",
    "o": [
      "experiência/arquitetura de interação e informação, não apenas estética visual",
      "espaço de cor CMYK",
      "sangria",
      "perfil de impressão"
    ],
    "a": 0,
    "e": "UX envolve a experiência e a facilidade de realizar tarefas. Uma interface esteticamente agradável pode ainda ter navegação ruim."
  },
  {
    "id": "des48",
    "s": "design",
    "t": "Acessibilidade",
    "d": "hard",
    "q": "Em um formulário digital, indicar campos obrigatórios somente com a cor vermelha é uma prática problemática porque:",
    "o": [
      "faz a compreensão depender exclusivamente da cor",
      "aumenta a resolução da tela",
      "impede qualquer uso de tipografia",
      "transforma RGB em CMYK"
    ],
    "a": 0,
    "e": "Acessibilidade recomenda não usar cor como único meio de transmitir informação; o estado deve ser percebido por outros meios também."
  },
  {
    "id": "des49",
    "s": "design",
    "t": "Acessibilidade",
    "d": "hard",
    "q": "Uma imagem informativa usada em página institucional contém informação que não aparece em nenhum outro lugar. Para acessibilidade, é especialmente importante considerar:",
    "o": [
      "uma alternativa textual equivalente quando aplicável",
      "remover toda descrição",
      "reduzir o contraste",
      "usar apenas imagem sem texto"
    ],
    "a": 0,
    "e": "Conteúdo informativo transmitido por imagem pode precisar de alternativa textual para pessoas que não conseguem perceber a imagem."
  },
  {
    "id": "des50",
    "s": "design",
    "t": "Direitos autorais",
    "d": "hard",
    "q": "Encontrar uma fotografia em um buscador de imagens significa que:",
    "o": [
      "ela pode ter restrições de direitos/licença e deve ter seu uso verificado antes de ser usada",
      "ela é automaticamente domínio público",
      "qualquer uso comercial é permitido",
      "a resolução define a licença"
    ],
    "a": 0,
    "e": "Estar disponível na internet não elimina direitos autorais ou condições de licença."
  },
  {
    "id": "des51",
    "s": "design",
    "t": "Fontes e licenças",
    "d": "hard",
    "q": "Ao incorporar uma fonte baixada da internet em materiais institucionais, o procedimento profissional adequado é:",
    "o": [
      "verificar licença e condições de uso da fonte",
      "usar sem verificar porque toda fonte digital é livre",
      "converter para imagem e ignorar licença",
      "aplicar somente em preto"
    ],
    "a": 0,
    "e": "Fontes possuem termos de licenciamento. Converter o texto em imagem não apaga automaticamente obrigações existentes."
  },
  {
    "id": "des52",
    "s": "design",
    "t": "Ética",
    "d": "hard",
    "q": "Um banco de imagens institucional contém fotos obtidas para uso restrito. A organização correta desse banco deve incluir:",
    "o": [
      "informações de origem, licença/restrições e identificação dos arquivos",
      "somente o nome do fotógrafo, sem contexto",
      "somente o tamanho em pixels",
      "apenas a cor predominante"
    ],
    "a": 0,
    "e": "Organização documental ajuda a controlar direitos, versões, origem e condições de uso."
  },
  {
    "id": "des53",
    "s": "design",
    "t": "Segurança da informação",
    "d": "hard",
    "q": "Arquivos-fonte editáveis de campanhas institucionais devem ser organizados de modo a:",
    "o": [
      "reduzir risco de perda e confusão de versões, com estrutura e cópias apropriadas",
      "ficar todos na área de trabalho sem nomes",
      "ser enviados a qualquer pessoa por link público",
      "ser substituídos pelos arquivos exportados"
    ],
    "a": 0,
    "e": "Organização, versionamento e cópias apropriadas ajudam na continuidade e segurança do trabalho."
  },
  {
    "id": "des54",
    "s": "design",
    "t": "Comunicação integrada",
    "d": "medium",
    "q": "Na rotina prevista para o designer da Câmara, acompanhar cronogramas e guias editoriais serve principalmente para:",
    "o": [
      "integrar a produção visual às demandas e padrões da área de Comunicação",
      "impedir qualquer revisão",
      "substituir o trabalho de captação audiovisual",
      "definir leis municipais"
    ],
    "a": 0,
    "e": "As atribuições oficiais mencionam respeito a cronogramas e guias editoriais, integração com a Comunicação e produção dentro dos padrões institucionais."
  },
  {
    "id": "des55",
    "s": "design",
    "t": "Audiovisual",
    "d": "medium",
    "q": "Um lower third em uma transmissão institucional é, conceitualmente:",
    "o": [
      "um elemento gráfico sobreposto ao vídeo para identificar pessoa, informação ou contexto",
      "um tipo de impressora",
      "um formato de papel",
      "uma técnica de corte de madeira"
    ],
    "a": 0,
    "e": "Lower third é um elemento gráfico sobreposto, geralmente próximo à parte inferior da tela, usado para identificação/informação."
  }
];
questions.push(...extraQuestions);


const difficultyByPrefix={
  pt:{easy:5,medium:5,hard:5}, info:{easy:4,medium:4,hard:4}, math:{easy:4,medium:4,hard:4},
  dir:{easy:5,medium:5,hard:5}, mun:{easy:4,medium:3,hard:3}, des:{easy:8,medium:9,hard:8}
};
function autoDifficulty(q){
  if(q.d) return q.d;
  const m=q.id.match(/^([a-z]+)(\d+)$/); const n=m?Number(m[2]):1; const p=m?m[1]:'';
  const ranges=difficultyByPrefix[p]; if(!ranges) return 'medium';
  const e=ranges.easy, md=e+ranges.medium;
  return n<=e?'easy':n<=md?'medium':'hard';
}
questions.forEach(q=>{q.d=autoDifficulty(q);q.section=q.s==='design'?'specific':'basic';});
const difficultyLabel={easy:'Fácil',medium:'Médio',hard:'Difícil'};
const difficultyIcon={easy:'🟢',medium:'🟡',hard:'🔴'};
function diffTag(q){return `<span class="difficulty ${q.d}">${difficultyIcon[q.d]} ${difficultyLabel[q.d]}</span>`}
function shuffle(a){return a.slice().sort(()=>Math.random()-0.5)}
function takeByDifficulty(pool,total,weights={easy:0.2,medium:0.45,hard:0.35}){
 const out=[]; const used=new Set();
 for(const d of ['easy','medium','hard']){
   const target=Math.round(total*weights[d]);
   for(const q of shuffle(pool.filter(x=>x.d===d)).slice(0,target)){out.push(q);used.add(q.id)}
 }
 let rest=shuffle(pool.filter(x=>!used.has(x.id)));
 while(out.length<total && rest.length) out.push(rest.shift());
 return shuffle(out).slice(0,total);
}
function chooseDiverse(pool,total){return takeByDifficulty(pool,total,{easy:0.2,medium:0.45,hard:0.35});}
function finalExamPool(){
 const pt=takeByDifficulty(questions.filter(q=>q.s==='pt'),10,{easy:.15,medium:.35,hard:.50});
 const generalPlan=[['info',3],['math',3],['direito',2],['municipio',2]];
 const general=generalPlan.flatMap(([id,n])=>takeByDifficulty(questions.filter(q=>q.s===id),n,{easy:.25,medium:.35,hard:.40}));
 const design=takeByDifficulty(questions.filter(q=>q.s==='design'),20,{easy:.15,medium:.40,hard:.45});
 return shuffle([...pt,...general,...design]);
}
function recordAttempt(q,selected){
 const correct=selected===q.a;
 state.answered[q.id]={correct,at:new Date().toISOString(),difficulty:q.d};
 state.stats.total=(state.stats.total||0)+1; state.stats.correct=(state.stats.correct||0)+(correct?1:0);
 state.mastery[q.t]=state.mastery[q.t]||{attempts:0,correct:0}; state.mastery[q.t].attempts++; if(correct)state.mastery[q.t].correct++;
 if(!correct) state.wrong[q.id]=(state.wrong[q.id]||0)+1;
 state.xp+=(correct?12:4)+(q.d==='hard'?3:0); updateStreak();
}
const flashcards = [
['Gestalt — Proximidade','Elementos próximos tendem a ser percebidos como agrupados.'],
['Gestalt — Fechamento','A mente tende a completar formas incompletas.'],
['RGB','Modelo aditivo usado principalmente em telas e meios digitais.'],
['CMYK','Modelo associado principalmente à impressão.'],
['Grid','Estrutura de alinhamento e organização da página.'],
['Hierarquia visual','Ordem de atenção criada por tamanho, peso, contraste, posição etc.'],
['Próclise','Pronome vem antes do verbo; palavras como “não” costumam atrair o pronome.'],
['Crase','Fusão de preposição a + artigo/pronome iniciado por a, nos contextos em que ambos se encontram.'],
['Inferência','Conclusão construída a partir de pistas/informações do texto e contexto.'],
['PaaS','Plataforma como serviço; ambiente para desenvolver/executar aplicações.'],
['SaaS','Software como serviço; aplicação entregue ao usuário como serviço.'],
['Firewall','Controle/filtragem de tráfego de rede segundo regras.'],
['Autenticação','Verificação de identidade — “quem é você?”.'],
['Autorização','Definição do que uma identidade pode acessar/fazer.'],
['Backup','Cópia recuperável de dados para restauração em caso de perda.'],
['Art. 37 CF','Administração Pública: legalidade, impessoalidade, moralidade, publicidade e eficiência.'],
['Lei 14.133/2021','Lei de Licitações e Contratos Administrativos.'],
['Lei 9.610/1998','Direitos autorais.'],
['WCAG — 4 princípios','Perceptível, Operável, Compreensível, Robusto.'],
['Senador Canedo — origem','Formação ligada à estrada de ferro; antigo nome Esplanada.'],
['Senador Canedo — distrito','Criado em 31/03/1953.'],
['Senador Canedo — instalação','Município instalado em 01/06/1989.'],
['Mediana','Valor central de uma lista ordenada; em quantidade par, média dos dois centrais.'],
['Moda','Valor que mais se repete.'],
['Juros simples','J = C × i × t.'],
['Trigonometria','sen=oposto/hipotenusa; cos=adjacente/hipotenusa; tg=oposto/adjacente.'],
];

const plan = [
{day:1,title:'Mapa + interpretação',items:['Diagnóstico: 20 questões','Português: interpretação, inferência, ambiguidade','Design: fundamentos + Gestalt'],q:12},
{day:2,title:'Gramática + tipografia',items:['Português: classes, formação e acentuação','Design: tipografia, anatomia e legibilidade'],q:14},
{day:3,title:'Informática essencial',items:['Windows/Ubuntu, arquivos e backup','Office/Workspace e formatos','Design: grid e composição'],q:16},
{day:4,title:'Matemática que mais rende',items:['Regra de três, porcentagem e juros simples','Conjuntos, média/moda/mediana','Design: teoria da cor'],q:16},
{day:5,title:'Direito constitucional',items:['CF: arts. 1º–5º','CF: direitos sociais','Design: comunicação pública'],q:16},
{day:6,title:'Português avançado',items:['Sintaxe, regência, concordância','Pronomes, pontuação e reescrita','Design: identidade visual'],q:18},
{day:7,title:'Redes + nuvem + segurança',items:['Internet/Intranet, navegadores e e-mail','IaaS/PaaS/SaaS','Malware, firewall, autenticação'],q:18},
{day:8,title:'Lógica + geometria',items:['Sequências, álgebra e sistemas','Geometria plana/espacial','Design: impressão, RGB/CMYK'],q:18},
{day:9,title:'Direito administrativo',items:['Princípios, poderes e atos','Serviços, servidores e processo','Lei 14.133/2021'],q:20},
{day:10,title:'Senador Canedo',items:['História e formação','Geografia e municípios circunvizinhos','Lei Orgânica + Estatuto: leitura guiada'],q:20},
{day:11,title:'Design acessível',items:['WCAG conceitual','Contraste, legibilidade e inclusão','UX/UI e digital'],q:20},
{day:12,title:'Produção gráfica',items:['Software: Illustrator/Corel, Photoshop, InDesign/equivalentes','GIMP/Inkscape/Scribus','Fechamento, papel e acabamentos'],q:20},
{day:13,title:'Matemática final + design institucional',items:['PA/PG, combinatória e probabilidade','Relatórios, cartilhas, folders e informativos','Brasões, selos e símbolos públicos'],q:20},
{day:14,title:'Lei + ética + revisão',items:['CF arts. 12–16, 18–19, 29–31, 37–41','Direitos autorais e licenças','Ética, transparência, impessoalidade'],q:22},
{day:15,title:'SIMULADO DE 40 + correção',items:['40 questões, 3h, sem consulta','Separar erros por assunto','Revisar cada erro com flashcard'],q:40},
{day:16,title:'Caderno de erros',items:['Somente assuntos com pior desempenho','Flashcards + 20 questões mistas'],q:20},
{day:17,title:'SIMULADO DE 40',items:['Prova completa','Treino de tempo','Correção e revisão'],q:40},
{day:18,title:'Revisão leve + descanso estratégico',items:['Flashcards difíceis','10 questões de design + 10 de básicos','Nada de virar a madrugada'],q:20},
{day:19,title:'DIA DA PROVA',items:['15:00–18:00 — prova para demais cargos superiores','Chegue com antecedência','Leve documento e caneta; confira cartão/local'],q:0},
];

function defaultState(){return {page:'home',xp:0,streak:0,lastStudy:null,answered:{},wrong:{},mastery:{},lessonDone:{},planDone:{},settings:{sound:true},stats:{sessions:0,correct:0,total:0},quiz:null};}
let state = loadState();
function loadState(){try{return {...defaultState(),...JSON.parse(localStorage.getItem(STORAGE_KEY)||'{}')};}catch{return defaultState()}}
function save(){localStorage.setItem(STORAGE_KEY,JSON.stringify(state));}
function esc(s){return String(s).replace(/[&<>"']/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m]));}
function qs(sel){return document.querySelector(sel)}
function daysLeft(){const now=new Date(); return Math.max(0,Math.ceil((EXAM_DATE-now)/86400000));}
function pct(a,b){return b?Math.round(a/b*100):0}
function allAnswered(){return Object.keys(state.answered).length}
function subjectStats(id){const qs=questions.filter(q=>q.s===id); let done=0,correct=0; qs.forEach(q=>{if(state.answered[q.id]){done++; if(state.answered[q.id].correct)correct++;}}); return {done,correct,total:qs.length,rate:pct(correct,done)};}
function mastery(id){const m=state.mastery[id]; return m ? Math.min(100,Math.round((m.correct/(m.attempts||1))*100)) : 0;}
function todayPlan(){const passed = 19-daysLeft()+1; return plan[Math.min(Math.max(passed-1,0),plan.length-1)];}
function nav(){return `<aside class="sidebar"><div class="brand"><div class="brand-mark">CQ</div><div><div class="brand-title">Canedo Quest</div><div class="brand-sub">Escola de concurso</div></div></div><nav class="nav">
${[['home','🏠','Início'],['study','📖','Estudar'],['quiz','⚡','Treinar'],['mock','🎯','Simulado'],['errors','🧩','Meus erros'],['plan','🗓️','Plano 19 dias'],['cards','🧠','Flashcards'],['syllabus','🗂️','Edital'],['sources','🔗','Fontes oficiais'],['board','✏️','Lousa']].map(([id,ic,label])=>`<button class="${state.page===id?'active':''}" data-nav="${id}"><span class="icon">${ic}</span><span>${label}</span></button>`).join('')}</nav><div class="sidebar-footer"><div class="small">Prova: 18/10/2026<br/>15:00–18:00</div></div></aside>`}
function topbar(){return `<header class="topbar"><div><strong>${state.page==='home'?'Painel':state.page==='study'?'Aula':state.page==='quiz'?'Treino':state.page==='mock'?'Simulados':state.page==='errors'?'Caderno de erros':state.page==='plan'?'Plano de estudos':state.page==='cards'?'Flashcards':state.page==='syllabus'?'Edital completo':state.page==='board'?'Lousa':'Fontes oficiais'}</strong></div><div class="topbar-right"><span class="pill streak">🔥 ${state.streak||0} dias</span><span class="pill">⭐ ${state.xp||0} XP</span><span class="pill">D-${daysLeft()}</span></div></header>`}
function shell(body){qs('#app').innerHTML=`<div class="app-shell">${nav()}<div class="main">${topbar()}<main class="content">${body}<div class="footer-note">Conteúdo-base montado a partir do edital retificado da Consulpam. Questões do app são autorais e servem para treino.</div></main></div></div>`; bind();}
function toast(msg){const root=qs('#toast-root'); const el=document.createElement('div'); el.className='toast';el.textContent=msg;root.appendChild(el);setTimeout(()=>el.classList.add('show'),10);setTimeout(()=>{el.classList.remove('show');setTimeout(()=>el.remove(),220)},2200)}
function bind(){}
function handleAction(action,d){
 if(action==='start-lesson'){state.page='study';state.study={subject:d.subject,topic:Number(d.topic||0)};save();render();return}
 if(action==='start-quiz'){startQuiz(d.subject||'mixed',Number(d.count||10));return}
 if(action==='start-mock'){startMock();return}
 if(action==='toggle-plan'){const k=String(d.day);state.planDone[k]=!state.planDone[k];state.xp+=(state.planDone[k]?25:-25);save();render();return}
 if(action==='open-board'){state.page='board';save();render();return}
 if(action==='reset'){localStorage.removeItem(STORAGE_KEY);state=defaultState();render();toast('Progresso zerado.');return}
 if(action==='export'){const blob=new Blob([JSON.stringify(state,null,2)],{type:'application/json'});const url=URL.createObjectURL(blob);const a=document.createElement('a');a.href=url;a.download='canedo-quest-progresso.json';a.click();URL.revokeObjectURL(url);return}
 if(action==='import'){qs('#import-file').click();return}
 if(action==='retry-errors'){startQuiz('errors',Math.min(20,Object.keys(state.wrong).length||10));return}
 if(action==='quick-review'){state.page='cards';save();render();}
}
function render(){if(state.page==='home')return renderHome();if(state.page==='study')return renderStudy();if(state.page==='quiz')return renderQuiz();if(state.page==='mock')return renderMockMenu();if(state.page==='errors')return renderErrors();if(state.page==='plan')return renderPlan();if(state.page==='cards')return renderCards();if(state.page==='syllabus')return renderSyllabus();if(state.page==='board')return renderBoard();return renderSources();}

function lessonFor(id,idx){
 const data={
 pt:[
  {title:'Interpretação: entender antes de marcar',summary:'Interpretação não é “achar o que o autor quis dizer” livremente. É construir o sentido a partir do texto, do contexto e das pistas linguísticas.',trap:'Uma alternativa pode parecer verdadeira na vida real e ainda estar errada porque não é sustentada pelo texto.',points:['Separe informação explícita de inferência.','Observe ironia, pressupostos e escolhas lexicais.','Em linguagem não verbal, leia composição, símbolos e contexto junto com o texto verbal.']},
  {title:'Gramática e norma-padrão',summary:'A banca pode cobrar identificação e uso: classes, formação de palavras, acentuação, crase, concordância e regência.',trap:'Não decore frases isoladas: regência e concordância dependem da estrutura da oração.',points:['Revise prefixo/sufixo e classes gramaticais.','Para crase, verifique se há preposição “a” + termo feminino compatível com artigo.','Em concordância, localize o núcleo do sujeito e tome cuidado com verbos impessoais.']},
  {title:'Coesão, coerência e reescrita',summary:'Coesão liga as partes do texto; coerência diz respeito à construção global de sentido. Reescrita deve preservar o sentido proposto quando a questão assim exigir.',trap:'Trocar uma palavra por outra “parecida” pode alterar sentido, referência, intensidade ou formalidade.',points:['Identifique pronomes e conectivos.','Compare versões observando sentido e estrutura.','Revise progressão temática, paralelismo e pontuação.']},
  {title:'Sintaxe e oração',summary:'O foco é reconhecer termos da oração e relações entre eles: sujeito, predicado, objetos, complementos e processos de coordenação/subordinação.',trap:'Objeto direto e indireto não se distinguem apenas pelo verbo “parecer”; observe a regência e a presença da preposição.',points:['Localize o verbo e depois pergunte quem/o quê/ a quem.','Reconheça orações coordenadas e subordinadas.','Use transitividade e regência para confirmar a função do termo.']},
  {title:'Pontuação e figuras de linguagem',summary:'Pontuação organiza a estrutura e pode alterar o sentido. Figuras de linguagem usam recursos expressivos para produzir efeitos de sentido.',trap:'Vírgula não serve para “marcar pausa para respirar” em qualquer lugar.',points:['Aprenda vocativo, aposto, orações intercaladas e enumerações.','Reveja personificação, metáfora, metonímia, hipérbole e ironia.','Pergunte sempre que efeito a pontuação/figura produz.']},
  {title:'Fonologia, morfologia e revisão',summary:'Fonologia trata dos sons/estrutura sonora; morfologia, da estrutura e classes das palavras.',trap:'Dígrafo não é encontro consonantal: duas letras podem representar um único fonema.',points:['Revise sílaba, encontro vocálico, encontro consonantal e dígrafo.','Reveja flexão nominal e verbal.','Feche o assunto com reescrita e questões mistas.']}
 ],
 info:[
  {title:'Sistema operacional, arquivos e backup',summary:'O sistema operacional administra recursos do computador e fornece meios para executar programas e organizar informações.',trap:'Backup não é simplesmente “salvar na mesma pasta”: a cópia precisa ajudar na recuperação após perda/corrupção/desastre.',points:['Organize arquivos e pastas de forma lógica.','Conheça noções de Windows 11 e Ubuntu Linux.','Diferencie armazenamento, backup e sincronização.']},
  {title:'Office, Workspace e formatos',summary:'O edital inclui textos, planilhas, apresentações, banco de dados e conversões/importações/exportações.',trap:'Extensão de arquivo indica o formato, mas não significa que todo formato preserve os mesmos recursos.',points:['Revise operações básicas de Excel/Sheets.','Entenda PDF, DOCX, XLSX e formatos de imagem de modo conceitual.','Saiba distinguir edição, importação, exportação e conversão.']},
  {title:'Redes, Internet e Intranet',summary:'Uma rede permite comunicação entre dispositivos. Internet é a rede mundial; Intranet é uma rede privada que usa tecnologias de Internet.',trap:'Internet, Intranet e Wi‑Fi não são sinônimos.',points:['Revise endereço, navegador e serviços básicos.','Diferencie rede interna de Internet pública.','Conheça o papel de navegador, e-mail e mensageria.']},
  {title:'Nuvem: IaaS, PaaS e SaaS',summary:'Cloud computing entrega recursos de computação via rede. Os modelos de serviço variam em quanto o provedor gerencia.',trap:'SaaS não é sinônimo de “ter um servidor na nuvem”; é software consumido como serviço.',points:['IaaS: infraestrutura.','PaaS: plataforma para desenvolver/executar.','SaaS: software pronto como serviço.']},
  {title:'Segurança da informação',summary:'Pense em proteger dados, sistemas e acessos. O edital cita malware e ferramentas como antivírus, firewall e anti-spyware.',trap:'Antivírus e firewall têm funções diferentes.',points:['Vírus, worm e trojan são categorias/tipos de malware.','Firewall controla tráfego conforme regras.','Antivírus busca detectar/bloquear software malicioso.']},
  {title:'Ambiente corporativo',summary:'Em ambientes corporativos, o controle de acesso normalmente combina identidade, permissões, domínio e compartilhamento de recursos.',trap:'Autenticação confirma identidade; autorização define o que a identidade pode fazer.',points:['Memorize: autenticação = quem é você?','Autorização = o que você pode acessar?','Domínio e compartilhamentos ajudam a centralizar políticas e recursos.']}
 ],
 math:[
  {title:'Regra de três, razão e porcentagem',summary:'Transforme relações em proporções antes de calcular. Em porcentagem, converta o percentual para fração/decimal.',trap:'Aumentos e descontos sucessivos não devem ser somados diretamente como se fossem um único percentual.',points:['1% = 1/100.','Regra de três exige identificar a relação direta ou inversa.','Faça uma estimativa para conferir se o resultado é plausível.']},
  {title:'Juros simples',summary:'No regime simples, os juros incidem sobre o capital inicial: J = C · i · t.',trap:'Converta a taxa e o tempo para unidades compatíveis.',points:['J é o juro; C, capital; i, taxa; t, tempo.','Montante M = C + J.','Se a taxa é mensal, use tempo em meses.']},
  {title:'Conjuntos e lógica',summary:'Conjuntos organizam elementos; lógica ajuda a analisar relações, condições e sequências.',trap:'Interseção não é união: interseção guarda somente os elementos comuns.',points:['A∪B = elementos de A ou B.','A∩B = elementos comuns.','Treine leitura cuidadosa de condições e negações.']},
  {title:'Geometria e trigonometria',summary:'Memorize relações fundamentais e identifique qual grandeza a questão pede.',trap:'Área, perímetro e volume são grandezas diferentes e têm unidades diferentes.',points:['Retângulo: A=b·h.','Triângulo: A=b·h/2.','No triângulo retângulo: seno = oposto/hipotenusa; cosseno = adjacente/hipotenusa.']},
  {title:'PA, PG e sequências',summary:'PA tem diferença constante; PG tem razão multiplicativa constante.',trap:'Olhe dois ou três pares consecutivos antes de afirmar a regra da sequência.',points:['PA: aₙ = a₁+(n−1)r.','PG: aₙ = a₁·q^(n−1).','Em sequência lógica, teste operações simples antes de padrões sofisticados.']},
  {title:'Combinatória, probabilidade e estatística',summary:'Conte possibilidades sem repetir casos e calcule probabilidades como casos favoráveis/casos possíveis em situações equiprováveis.',trap:'Média, mediana e moda medem aspectos diferentes do conjunto.',points:['Média = soma/n.','Mediana = posição central após ordenar.','Moda = valor mais frequente.']}
 ],
 direito:[
  {title:'Princípios da Administração Pública',summary:'No art. 37, caput, aparecem legalidade, impessoalidade, moralidade, publicidade e eficiência.',trap:'Impessoalidade não significa “não poder comunicar”: significa atuação voltada ao interesse público, sem promoção pessoal indevida.',points:['LIMPE é um atalho útil para lembrar os cinco princípios.','Legalidade: agir conforme a lei.','Publicidade relaciona-se à transparência, respeitadas as hipóteses legais de sigilo.']},
  {title:'Poderes e atos administrativos',summary:'O edital cobra poderes administrativo e a teoria básica dos atos: requisitos, atributos, classificação, anulação e revogação.',trap:'Revogar não é o mesmo que anular.',points:['Anulação: ilegalidade.','Revogação: mérito/conveniência e oportunidade, dentro dos limites jurídicos.','Poder hierárquico organiza a estrutura interna da Administração.']},
  {title:'Serviços públicos e servidores',summary:'Serviços públicos atendem necessidades coletivas sob regime jurídico próprio. O edital também aborda regimes, cargo, emprego e função.',trap:'Cargo, emprego e função pública são conceitos relacionados, mas não idênticos.',points:['Estude o vocabulário do edital literalmente.','Revise diferença entre Administração direta/indireta.','Lembre que agentes públicos são submetidos a deveres e regras legais.']},
  {title:'Licitações e Lei 14.133/2021',summary:'A Lei 14.133/2021 estabelece normas gerais de licitação e contratação e é expressamente indicada no programa.',trap:'Não misture conceitos de licitação com direitos autorais ou gestão de documentos.',points:['Leia os princípios e conceitos iniciais da Lei 14.133.','Observe o âmbito de aplicação.','Faça questões sobre conceitos e situações práticas.']},
  {title:'Constituição: direitos e organização',summary:'O edital delimita os blocos de artigos: 1º–4º, 5º, 6º–11, 12–13, 14–16, 18–19, 29–31 e 37–41.',trap:'A questão pode cobrar qual artigo trata de determinado assunto antes de cobrar o conteúdo em si.',points:['1º–4º: princípios fundamentais.','5º: direitos e deveres individuais e coletivos.','37–41: Administração Pública e servidores públicos.']},
  {title:'Revisão constitucional por artigos',summary:'A reta final deve ser por associação: assunto → artigo → palavras-chave.',trap:'Não tente memorizar o texto inteiro de uma vez. Associe o tema ao bloco de artigos do edital.',points:['12–13: nacionalidade.','14–16: direitos políticos.','29–31: municípios.']}
 ],
 municipio:[
  {title:'Origem e ferrovia',summary:'O histórico do IBGE relaciona a origem de Senador Canedo à estrada de ferro e à ocupação ao redor da estação.',trap:'A data do distrito, a lei estadual de emancipação e a instalação são eventos diferentes.',points:['Antes, o povoado era denominado Esplanada.','A formação central esteve ligada à ferrovia.','Use o histórico do IBGE como fonte-base.']},
  {title:'1953: distrito',summary:'O IBGE registra o distrito criado pela Lei Municipal nº 239, de 31/03/1953, subordinado a Goiânia.',trap:'Distrito em 1953 não é a mesma coisa que instalação do município em 1989.',points:['31/03/1953 → criação do distrito.','O distrito permaneceu ligado a Goiânia em registros territoriais posteriores.','Treine datas em linha do tempo.']},
  {title:'1988–1989: emancipação e instalação',summary:'A emancipação municipal foi aprovada em 1988; o histórico do IBGE registra a instalação efetiva em 01/06/1989.',trap:'Não troque o ano da lei estadual com a data de instalação.',points:['Lei estadual nº 10.435: 09/01/1988.','Instalação: 01/06/1989.','Desmembramento registrado: Goiânia, Bela Vista de Goiás e Aparecida de Goiânia.']},
  {title:'Geografia e circunvizinhos',summary:'O edital exige aspectos geográficos e municípios circunvizinhos; a prova pode explorar relações regionais e localização.',trap:'Não vale decorar uma lista sem localização: faça associação espacial.',points:['Revise posição na Região Metropolitana de Goiânia.','Monte uma pequena lista/mapa dos municípios vizinhos.','Relacione geografia com urbanização e economia.']},
  {title:'Lei Orgânica e Câmara',summary:'A Lei Orgânica é a norma fundamental municipal dentro do espaço de autonomia local. A Câmara exerce funções legislativa e fiscalizadora.',trap:'Lei Orgânica não é lei federal nem substitui a Constituição Federal.',points:['Leia os capítulos iniciais e a parte do Legislativo.','Observe competências da Câmara e do Município.','Use a versão disponibilizada pela própria Câmara como fonte primária.']},
  {title:'Estatuto do Servidor e economia',summary:'O edital exige Estatuto do Servidor e fatores econômicos da cidade; esses temas pedem leitura direta das fontes locais.',trap:'Como a lei municipal pode receber alterações, não use resumo antigo como fonte final.',points:['Leia o texto vigente indicado pela Câmara.','Marque definições, direitos, deveres, proibições e responsabilidades.','Relacione fatores econômicos a atividades e indicadores do município.']}
 ],
 design:[
  {title:'Fundamentos + elementos visuais',summary:'Ponto, linha, forma, cor, textura e espaço são recursos que estruturam uma composição antes mesmo de escolher softwares.',trap:'Ferramenta não é fundamento: saber usar Photoshop não substitui saber resolver hierarquia e comunicação.',points:['Pense em função de cada elemento.','Use espaço como elemento ativo da composição.','Pergunte: o que precisa ser percebido primeiro?']},
  {title:'Gestalt',summary:'A Gestalt explica tendências de organização perceptiva, como proximidade, semelhança, fechamento, continuidade, unificação e pregnância.',trap:'Não confunda proximidade com semelhança: uma pode agrupar pela distância; a outra, pelas características visuais compartilhadas.',points:['Proximidade → agrupamento pela distância.','Semelhança → agrupamento por características comuns.','Fechamento → completar formas incompletas.']},
  {title:'Hierarquia, grid e composição',summary:'Hierarquia organiza a atenção; grid organiza alinhamentos, módulos e consistência.',trap:'Grid não é “uma grade que precisa aparecer”: ele é uma estrutura que pode ficar invisível ao usuário.',points:['Use escala, peso, contraste e posição para criar prioridade.','Mantenha alinhamentos consistentes.','Controle espaços e margens.']},
  {title:'Tipografia e legibilidade',summary:'Tipografia envolve famílias, classificação, anatomia, escolha e legibilidade. Em peças institucionais, leitura e clareza pesam mais que enfeite.',trap:'Uma fonte “bonita” pode ser inadequada para texto corrido ou comunicação pública.',points:['Revise serifada, sem serifa e usos típicos.','Contraste entre tamanhos/pesos ajuda a hierarquia.','Evite excesso de famílias e efeitos.']},
  {title:'Cor: RGB, CMYK e psicologia',summary:'RGB é aditivo e associado a telas; CMYK é associado à impressão. Psicologia das cores trata das associações e efeitos perceptivos, que dependem de contexto.',trap:'Não trate “vermelho sempre significa X” como regra universal.',points:['RGB → meios luminosos/digitais.','CMYK → produção gráfica/impresso.','Contraste e acessibilidade são tão importantes quanto estética.']},
  {title:'Identidade visual institucional',summary:'No setor público, identidade precisa de consistência, regras de aplicação e respeito ao caráter institucional.',trap:'Símbolos e marcas públicas não devem ser alterados livremente para cada peça.',points:['Manual define regras de aplicação.','Respeite versões, áreas de proteção e cores oficiais quando existirem.','Evite personalização que gere promoção pessoal.']},
  {title:'Diagramação e produção impressa',summary:'Relatórios, cartilhas, folders e informativos exigem estrutura, margem, grid, sangria quando aplicável, imagens e fechamento adequados.',trap:'O melhor layout na tela pode sair errado na gráfica se o arquivo estiver preparado incorretamente.',points:['Revise papel, formatos e acabamentos.','Entenda diferenças entre offset e digital.','Cheque resolução, modo de cor e fechamento.']},
  {title:'Web, redes e UX/UI',summary:'Peças digitais precisam considerar telas diferentes, escaneabilidade, responsividade e experiência. UX não se resume a estética.',trap:'Interface visual bonita não garante experiência boa.',points:['Responsivo = adaptação a diferentes telas/condições.','UX considera experiência, necessidades e fluxos.','UI lida diretamente com elementos visuais da interface.']},
  {title:'Acessibilidade e WCAG',summary:'O W3C organiza a WCAG pelos princípios Perceptível, Operável, Compreensível e Robusto.',trap:'Acessibilidade não é só “deixar o texto grande”. Cor, teclado, alternativas textuais e previsibilidade também importam.',points:['Não use somente cor para transmitir informação.','Ofereça texto alternativo quando aplicável.','Pense em diferentes formas de perceber, operar e compreender.']},
  {title:'Direitos autorais, ética e serviço público',summary:'A Lei 9.610/1998 trata dos direitos autorais. O edital ainda cobra licenças, ética, segurança, transparência, neutralidade e impessoalidade.',trap:'Encontrar uma imagem ou fonte na Internet não significa que ela seja livre para qualquer uso.',points:['Verifique licença de imagens e fontes.','Respeite autoria e condições de uso.','Em comunicação pública, mantenha foco institucional e interesse público.']}
 ]};
 const arr=data[id]||[];return arr[idx%arr.length]||{title:'Tópico do edital',summary:'Estude este tópico e prove o domínio nas questões.',trap:'Questões podem cobrar diferenças entre conceitos próximos.',points:['Leia o texto do edital.','Faça questões.','Revise seus erros.']};
}

function renderHome(){
 const dl=daysLeft(), tp=todayPlan(); const ans=allAnswered(), cor=Object.values(state.answered).filter(x=>x.correct).length, overall=pct(cor,ans);
 const subj=syllabus.map(s=>({...s,st:subjectStats(s.id)}));
 shell(`<section class="hero"><div class="hero-card"><div class="eyebrow">Design Gráfico · Câmara Municipal de Senador Canedo</div><h1>Treinar. Errar. Corrigir.<br/>Chegar na prova preparado.</h1><p>Uma central de estudo feita para transformar o edital em missões, questões, revisões e simulados — com progresso salvo neste navegador.</p><div class="countdown">D-${dl}</div><div class="count-label">18 de outubro de 2026 · 15:00–18:00 para os demais cargos de nível superior</div><div class="toolbar" style="margin-top:18px"><button class="btn primary" data-action="start-quiz" data-subject="adaptive" data-count="12">▶ Missão adaptativa</button><button class="btn" data-action="start-mock">🎯 Prova final</button></div></div><div class="card"><div class="eyebrow">Missão do dia</div><h2>${esc(tp.title)}</h2>${tp.items.map(x=>`<p>• ${esc(x)}</p>`).join('')}<div style="margin-top:14px" class="small">Meta sugerida: ${tp.q||'revisão final'} ${tp.q?'questões':''}</div></div></section>
 <div class="stats"><div class="stat"><div class="v">${ans}</div><div class="l">Questões respondidas</div></div><div class="stat"><div class="v">${overall}%</div><div class="l">Aproveitamento geral</div></div><div class="stat"><div class="v">${state.xp}</div><div class="l">XP</div></div><div class="stat"><div class="v">${Object.keys(state.wrong).length}</div><div class="l">No caderno de erros</div></div></div>
 <div class="section-head"><div><h2>Mapa das matérias</h2><p>O edital tem 20 questões específicas de Design e 20 de conhecimentos básicos.</p></div></div>
 <div class="grid grid-3">${subj.map(s=>`<div class="card"><div class="subject"><div class="subject-row"><div class="subject-icon">${s.icon}</div><div class="subject-main"><h3>${esc(s.name)}</h3><div class="small">${s.id==='design'?'20 questões específicas':'parte dos 20 básicos'} · ${s.st.done}/${s.st.total} treinadas</div></div></div><span class="tag">${s.st.rate||0}%</span></div><div class="progress-track" style="margin-top:13px"><div class="progress-fill" style="width:${s.st.rate||0}%"></div></div><button class="btn small" style="margin-top:12px" data-action="start-quiz" data-subject="${s.id}" data-count="10">Treinar ${esc(s.short)}</button></div>`).join('')}</div>
 <div class="section-head"><div><h2>Plano inteligente</h2><p>O app prioriza revisão e erros; você não precisa “zerar” tudo antes de praticar.</p></div><button class="btn" data-nav="plan">Abrir plano</button></div>
 <div class="card"><div class="plan-day"><div class="day-badge"><div class="small">HOJE</div><div class="day-num">${tp.day}</div></div><div><h3 style="margin:0">${esc(tp.title)}</h3><p>${tp.items.slice(0,2).map(esc).join(' · ')}</p></div><button class="btn primary" data-action="start-lesson" data-subject="design" data-topic="0">Começar</button></div></div>`);}

function renderStudy(){const s=subjects[state.study?.subject||'design'];const topics=syllabus.find(x=>x.id===s.id); const idx=state.study?.topic||0; const topic=(topics?.topics||[])[idx]||topics?.topics?.[0]||''; const learned=!!state.lessonDone[`${s.id}:${idx}`];const note=lessonFor(s.id,idx);shell(`<div class="toolbar"><button class="btn ghost" data-nav="home">← Voltar</button><span class="tag">${s.icon} ${esc(s.name)}</span><div class="toolbar-spacer"></div><button class="btn" data-action="start-quiz" data-subject="${s.id}" data-count="10">⚡ Testar depois</button></div><div class="question-wrap" style="margin-top:18px"><div class="card lesson"><div class="eyebrow">Aula curta ${idx+1}/${topics.topics.length}</div><div class="title">${esc(note.title)}</div><div class="body"><p>${esc(note.summary)}</p><div class="tip"><strong>⚠️ Armadilha de prova:</strong><br/>${esc(note.trap)}</div><h3>O que você precisa lembrar</h3><ul>${note.points.map(x=>`<li>${esc(x)}</li>`).join('')}</ul><div class="tip"><strong>Como estudar em 60 segundos:</strong><br/>Leia → explique em voz alta → faça 5–10 questões → revise o erro.</div></div><div class="toolbar"><button class="btn ${learned?'':'primary'}" data-action="mark-lesson" data-subject="${s.id}" data-topic="${idx}">${learned?'✓ Aula marcada como concluída':'Marcar aula como concluída (+15 XP)'}</button>${idx<topics.topics.length-1?`<button class="btn" data-action="next-topic" data-subject="${s.id}" data-topic="${idx}">Próximo tópico →</button>`:''}</div></div></div></div>`);}

function buildPracticePool(subject,count){
 if(subject==='errors') return shuffle(questions.filter(q=>state.wrong[q.id])).slice(0,count);
 if(subject==='hard') return shuffle(questions.filter(q=>q.d==='hard')).slice(0,count);
 if(subject==='adaptive') {
   const scoreQ=(q)=>{
     const wrong=(state.wrong[q.id]||0)*8;
     const m=state.mastery[q.t] ? mastery(q.t) : 0;
     const weakness=(100-m)/8;
     const diff=q.d==='hard'?3:q.d==='medium'?2:1;
     return wrong+weakness+diff+Math.random()*2;
   };
   const generalN=Math.ceil(count/2), designN=count-generalN;
   const rank=(pool)=>pool.slice().sort((a,b)=>scoreQ(b)-scoreQ(a));
   return shuffle([...rank(questions.filter(q=>q.s!=='design')).slice(0,generalN),...rank(questions.filter(q=>q.s==='design')).slice(0,designN)]);
 }
 if(subject==='mixed') {
   const designN=Math.floor(count/2), generalN=count-designN;
   return shuffle([...chooseDiverse(questions.filter(q=>q.s!=='design'),generalN),...chooseDiverse(questions.filter(q=>q.s==='design'),designN)]);
 }
 return chooseDiverse(questions.filter(q=>q.s===subject),Math.min(count,questions.filter(q=>q.s===subject).length));
}
function startQuiz(subject,count){
 const pool=buildPracticePool(subject,count); if(!pool.length){toast('Ainda não há questões suficientes para essa fila.');return}
 state.quiz={mode:'practice',subject,count:pool.length,ids:shuffle(pool.map(q=>q.id)),i:0,score:0,started:Date.now(),deadline:null,answered:false,selected:null,answers:{},finished:false};state.page='quiz';save();render();
}
function startMock(){
 const pool=finalExamPool();
 state.quiz={mode:'mock',subject:'mixed',count:40,ids:pool.map(q=>q.id),i:0,score:0,basicScore:0,specScore:0,started:Date.now(),deadline:Date.now()+180*60*1000,answered:false,selected:null,answers:{},finished:false,marked:{}};
 state.page='quiz';save();render();
}
function renderQuiz(){
 const z=state.quiz;if(!z)return renderHome();
 const q=questions.find(x=>x.id===z.ids[z.i]);
 const timer=z.deadline?Math.max(0,z.deadline-Date.now()):null;
 const selected=z.mode==='mock'?(z.answers?.[q.id]??null):z.selected;
 const done=z.mode==='practice'&&z.answered;
 const choices=q.o.map((op,i)=>`<button class="choice ${done&&i===q.a?'correct':''} ${done&&z.selected===i&&i!==q.a?'wrong':''} ${z.mode==='mock'&&selected===i?'selected':''}" data-choice="${i}" ${done?'disabled':''}><span class="letter">${String.fromCharCode(65+i)}</span><span>${esc(op)}</span></button>`).join('');
 const navGrid=z.mode==='mock'?`<div class="exam-nav"><div class="small">Navegação da prova</div><div class="exam-grid">${z.ids.map((id,i)=>`<button class="exam-dot ${i===z.i?'current':''} ${z.answers?.[id]!==undefined?'answered':''} ${z.marked?.[id]?'marked':''}" data-exam-jump="${i}">${i+1}</button>`).join('')}</div><div class="exam-legend"><span>● respondida</span><span>◆ revisar</span></div></div>`:'';
 const footerButtons=z.mode==='mock'?`<div class="quiz-actions"><button class="btn" data-action="prev-exam">← Anterior</button><div class="toolbar"><button class="btn" data-action="toggle-mark">${z.marked?.[q.id]?'◆ Desmarcar':'◇ Marcar para revisar'}</button><button class="btn" data-action="next-exam">Próxima →</button><button class="btn danger" data-action="submit-mock">Finalizar prova</button></div></div>`:`<div class="quiz-actions"><button class="btn ghost" data-action="quit-quiz">Sair</button><span class="small">Escolha uma alternativa para receber a correção.</span>${done?`<button class="btn primary" data-action="next-question">${z.i+1===z.count?'Ver resultado':'Próxima →'}</button>`:''}</div>`;
 shell(`<div class="question-wrap"><div class="q-meta"><span>${z.mode==='mock'?'🎯 SIMULADO FINAL · PROVA':'⚡ TREINO'} · ${z.i+1}/${z.count}</span><span>${timer!==null?`⏱ <span id="q-timer" class="timer">${fmtMs(timer)}</span>`:''}</span></div><div class="progress-track"><div class="progress-fill" style="width:${((z.mode==='mock'?Object.keys(z.answers||{}).length:z.i)/z.count)*100}%"></div></div><div class="toolbar" style="margin-top:12px"><span class="tag">${subjects[q.s].icon} ${esc(subjects[q.s].short)} · ${esc(q.t)}</span>${diffTag(q)}${z.mode==='mock'?'<span class="tag">⏱ 3h · sem feedback</span>':''}<div class="toolbar-spacer"></div><button class="btn small" data-action="open-board">✏️ Abrir lousa</button></div><div class="card" style="margin-top:18px"><div class="q-text">${esc(q.q)}</div><div class="choices">${choices}</div>${done?`<div class="feedback ${z.selected===q.a?'good':'bad'}"><strong>${z.selected===q.a?'✅ Acertou!':'❌ Errou.'}</strong><p>${esc(q.e)}</p>${z.selected!==q.a?`<p class="small">Resposta correta: <strong>${String.fromCharCode(65+q.a)} — ${esc(q.o[q.a])}</strong></p>`:''}</div>`:''}${footerButtons}</div>${examGridHTML(navGrid)}</div>${z.mode==='mock'?'<p class="footer-note">Modo prova: sem correção até a entrega. Você pode navegar, revisar e marcar questões. O resultado só aparece ao finalizar.</p>':''}`);
 if(timer!==null)startTimer();
}
function examGridHTML(html){return html||'';}
function fmtMs(ms){const sec=Math.floor(ms/1000);return `${String(Math.floor(sec/60)).padStart(2,'0')}:${String(sec%60).padStart(2,'0')}`}
let timerHandle;function startTimer(){clearInterval(timerHandle);timerHandle=setInterval(()=>{if(!state.quiz?.deadline)return;const ms=Math.max(0,state.quiz.deadline-Date.now());const el=qs('#q-timer');if(el)el.textContent=fmtMs(ms);if(ms<=0){clearInterval(timerHandle);finishQuiz(true)}},500)}
function answer(i){
 const z=state.quiz;if(!z)return;const q=questions.find(x=>x.id===z.ids[z.i]);
 if(z.mode==='mock'){z.answers=z.answers||{};z.answers[q.id]=i;z.selected=i;z.answered=true;save();render();return;}
 if(z.answered)return;z.selected=i;z.answered=true;z.score+=(i===q.a?1:0);recordAttempt(q,i);save();render();
}
function finishQuiz(timeout=false){clearInterval(timerHandle);if(!state.quiz)return;const z=state.quiz;
 if(z.mode==='mock') finalizeMock(timeout); else {z.finished=true;z.timeout=timeout;save();renderResult();}
}
function finalizeMock(timeout=false){
 const z=state.quiz; let score=0,basic=0,spec=0,unanswered=0; const breakdown={};
 z.ids.forEach(id=>{const q=questions.find(x=>x.id===id);const sel=z.answers?.[id];if(sel===undefined){unanswered++;return;}const correct=sel===q.a;score+=correct?1:0;if(q.s==='design')spec+=correct?1:0;else basic+=correct?1:0;recordAttempt(q,sel);breakdown[q.s]=(breakdown[q.s]||{total:0,correct:0});breakdown[q.s].total++;breakdown[q.s].correct+=correct?1:0;});
 z.score=score;z.basicScore=basic;z.specScore=spec;z.unanswered=unanswered;z.breakdown=breakdown;z.finished=true;z.timeout=timeout;save();renderResult();
}
function renderResult(){const z=state.quiz;const score100=Math.round((z.score||0)/(z.count||1)*100);const basic=z.basicScore??null,spec=z.specScore??null;const basicPct=basic===null?null:pct(basic,20),specPct=spec===null?null:pct(spec,20);const threshold= z.mode==='mock' ? (basic>=10&&spec>=10) : null;const hardIds=(z.ids||[]).filter(id=>questions.find(q=>q.id===id)?.d==='hard');const hardAnswered=hardIds.filter(id=>z.mode==='mock'?z.answers?.[id]!==undefined:state.answered[id]).length;const hardCorrect=hardIds.filter(id=>{const q=questions.find(q=>q.id===id);const a=z.mode==='mock'?z.answers?.[id]:state.answered[id]?null:null;return z.mode==='mock'&&a!==undefined&&a===q.a}).length; const hardRate=z.mode==='mock'?pct(hardCorrect,hardAnswered):null;
 const breakdown=z.breakdown||{};
 shell(`<div class="question-wrap"><div class="card result-card" style="text-align:center"><div class="eyebrow">${z.mode==='mock'?'SIMULADO FINALIZADO':'TREINO FINALIZADO'}</div><div class="kpi">${score100}/100</div><p class="muted">${z.score} acertos em ${z.count} questões${z.unanswered?` · ${z.unanswered} não respondida(s)`:''}${z.timeout?' · tempo esgotado':''}</p>${z.mode==='mock'?`<div class="result-banner ${threshold?'good-banner':'bad-banner'}"><strong>${threshold?'✓ Você atingiu o mínimo dos dois blocos':'⚠ Atenção aos mínimos por bloco'}</strong><span>Básicos: ${basic}/20 (${basicPct}%) · Específicos: ${spec}/20 (${specPct}%) · mínimo de 50% em cada bloco</span></div><div class="grid grid-2" style="margin-top:18px"><div class="card"><div class="small">Conhecimentos Gerais</div><div class="kpi">${basic}/20</div><div class="progress-track"><div class="progress-fill" style="width:${basicPct}%"></div></div></div><div class="card"><div class="small">Conhecimentos Específicos</div><div class="kpi">${spec}/20</div><div class="progress-track"><div class="progress-fill" style="width:${specPct}%"></div></div></div></div><div class="section-head" style="margin-top:22px"><div><h2>Desempenho por matéria</h2><p>O simulado usa 10 Português + 2 de cada outra matéria básica + 20 Design como formato de treino interno. O edital oficial fixa apenas os blocos de 10 + 10 + 20.</p></div></div><table class="table"><thead><tr><th>Matéria</th><th>Acertos</th><th>Aproveitamento</th></tr></thead><tbody>${Object.entries(breakdown).map(([id,v])=>`<tr><td>${subjects[id]?.name||id}</td><td>${v.correct}/${v.total}</td><td>${pct(v.correct,v.total)}%</td></tr>`).join('')}</tbody></table><div class="card" style="margin-top:14px"><div class="small">Questões difíceis</div><div class="kpi">${hardRate??0}%</div><p>${hardCorrect}/${hardAnswered} difíceis respondidas corretamente</p></div>`:''}<div class="toolbar" style="justify-content:center;margin-top:20px"><button class="btn primary" data-action="start-${z.mode==='mock'?'mock':'quiz'}" ${z.mode==='mock'?'':'data-subject="mixed" data-count="12"'}>${z.mode==='mock'?'Refazer simulado':'Fazer outra missão'}</button><button class="btn" data-nav="errors">Ver meus erros</button><button class="btn" data-nav="home">Voltar ao painel</button></div></div></div>`);
}
function renderMockMenu(){const sims=[['🎯 Simulado final — 40 questões','Formato de treino: 10 Português + 10 outras gerais + 20 Design · 3h · sem feedback','mock'],['⚔️ Desafio difícil','20 questões selecionadas com forte presença de nível difícil','hard20'],['🎨 Especial — Design Gráfico','20 questões específicas, com dificuldade graduada','design20']];shell(`<section class="section-head"><div><h2>Simulados</h2><p>A prova objetiva dos demais cargos de nível superior está prevista para 18/10/2026, das 15h às 18h. O Anexo II fixa 40 questões, 2,5 pontos por questão e mínimo de 25 pontos em cada bloco.</p></div></section><div class="grid grid-3">${sims.map(([t,p,a])=>`<div class="card"><h3>${t}</h3><p>${p}</p><button class="btn primary" data-action="${a==='mock'?'start-mock':'start-quiz'}" data-subject="${a==='hard20'?'hard':'design'}" data-count="20">Começar</button></div>`).join('')}</div><div class="card" style="margin-top:18px"><h3>Como a prova final foi construída</h3><p>O objetivo do simulado final é testar conhecimento + leitura + gestão de tempo. As alternativas ficam sem correção durante a prova, há navegação entre questões, marcação para revisão, cronômetro de 3 horas e correção apenas no final.</p></div>`)}
function renderErrors(){const items=questions.filter(q=>state.wrong[q.id]).sort((a,b)=>(state.wrong[b.id]||0)-(state.wrong[a.id]||0));shell(`<div class="section-head"><div><h2>🧩 Caderno de erros</h2><p>O objetivo não é colecionar erros: é eliminar os que se repetem.</p></div><button class="btn primary" data-action="retry-errors">Revisar erros (${items.length})</button></div>${items.length?`<div class="grid">${items.map(q=>`<div class="card"><div class="q-meta"><span class="tag">${subjects[q.s].icon} ${subjects[q.s].short} · ${q.t}</span>${diffTag(q)}<span>${state.wrong[q.id]} erro(s)</span></div><h3>${esc(q.q)}</h3><p><strong>Resposta:</strong> ${esc(q.o[q.a])}</p><p class="small">${esc(q.e)}</p></div>`).join('')}</div>`:'<div class="empty">Seu caderno ainda está vazio. Faça uma missão e os erros serão adicionados aqui automaticamente.</div>'}`)}
function renderPlan(){shell(`<section class="section-head"><div><h2>🗓️ Plano de 19 dias</h2><p>15 dias de conteúdo + reta final de revisão/simulados. D-${daysLeft()} hoje.</p></div><span class="tag">${Object.values(state.planDone).filter(Boolean).length}/${plan.length} etapas marcadas</span></section><div class="grid">${plan.map((p,i)=>{const done=!!state.planDone[p.day];return `<div class="card"><div class="plan-day"><div class="day-badge"><div class="small">DIA</div><div class="day-num">${p.day}</div></div><div><div class="eyebrow">${p.day===19?'PROVA':'MISSÃO'}</div><h3 style="margin:3px 0">${esc(p.title)} ${done?'✓':''}</h3><p>${p.items.map(esc).join(' · ')}</p></div><div class="toolbar"><button class="btn small ${done?'':'primary'}" data-action="toggle-plan" data-day="${p.day}">${done?'Desmarcar':'Marcar'}</button>${p.q?`<button class="btn small" data-action="start-quiz" data-subject="mixed" data-count="${Math.min(20,p.q)}">Treinar</button>`:''}</div></div></div>`}).join('')}</div>`)}
function renderCards(){let idx=state.cardIndex||0; if(idx<0)idx=flashcards.length-1;if(idx>=flashcards.length)idx=0;state.cardIndex=idx;save();const [front,back]=flashcards[idx];shell(`<section class="section-head"><div><h2>🧠 Flashcards</h2><p>Use ativamente: leia a frente, responda mentalmente e só depois revele.</p></div><span class="tag">${idx+1}/${flashcards.length}</span></section><div class="question-wrap"><div class="card" style="min-height:320px;display:grid;place-items:center;text-align:center"><div><div class="eyebrow">${esc(front)}</div><h1 style="font-size:34px;margin:20px 0">🔒 Revele mentalmente</h1><p id="card-back" class="muted" style="max-width:620px">Clique em “Revelar” para conferir.</p><button class="btn primary" id="reveal-card">Revelar</button></div></div><div class="quiz-actions"><button class="btn" id="prev-card">← Anterior</button><button class="btn" id="next-card">Próximo →</button></div></div>`);qs('#reveal-card').onclick=()=>{qs('#card-back').textContent=back;qs('#reveal-card').textContent='✓ Revelado'};qs('#prev-card').onclick=()=>{state.cardIndex=idx-1;renderCards()};qs('#next-card').onclick=()=>{state.cardIndex=idx+1;renderCards()};}
function renderSyllabus(){shell(`<section class="section-head"><div><h2>🗂️ Edital transformado em mapa</h2><p>Baseado no Anexo III da versão retificada publicada no portal da Consulpam em 24/08/2026.</p></div><a class="btn" href="${SOURCE.edital}" target="_blank" rel="noreferrer">Abrir edital PDF</a></section><div class="grid">${syllabus.map(s=>`<div class="card"><div class="subject"><div class="subject-row"><div class="subject-icon">${s.icon}</div><div><h3>${esc(s.name)}</h3><div class="small">${s.id==='design'?20:10} questões no quadro de provas</div></div></div><span class="tag">${s.weight} pts-base</span></div><div style="margin-top:14px">${s.id==='design'?'<div class="tip"><strong>Foco das atribuições:</strong><br/>identidade visual, templates oficiais, publicações, acessibilidade, infográficos, artes digitais, tratamento de imagens, preparação para impressão, sinalização e apoio gráfico ao audiovisual.</div>':''}<ol>${s.topics.map(t=>`<li style="margin:9px 0;color:#cbd7e6">${esc(t)}</li>`).join('')}</ol></div></div>`).join('')}</div>`)}
function renderBoard(){
 shell(`<section class="section-head"><div><h2>✏️ Lousa de estudo</h2><p>Resolva contas, esquemas, rascunhos de composição ou mapas mentais. O desenho fica salvo neste navegador.</p></div><button class="btn" data-nav="${state.quiz?'quiz':'home'}">← Voltar</button></section><div class="board-card card"><div class="board-toolbar"><button class="btn small active" id="board-pen">✏️ Caneta</button><button class="btn small" id="board-eraser">🧽 Borracha</button><label class="board-size">Tamanho <input id="board-size" type="range" min="1" max="24" value="4"></label><button class="btn small" id="board-clear">Limpar</button><button class="btn small" id="board-save">Salvar</button></div><canvas id="study-board"></canvas><p class="small">Dica: use a lousa para cálculos, esquemas de Gestalt, rascunhos de layout e qualquer questão que exija raciocínio antes de marcar.</p></div>`);
 const canvas=qs('#study-board'); const ctx=canvas.getContext('2d'); let drawing=false,last=null,tool='pen',size=4;
 function resize(){const ratio=Math.max(1,window.devicePixelRatio||1);const rect=canvas.getBoundingClientRect();const old=canvas.toDataURL();canvas.width=Math.floor(rect.width*ratio);canvas.height=Math.floor(620*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);ctx.fillStyle='#fbfdff';ctx.fillRect(0,0,rect.width,620); if(state.boardData){const im=new Image();im.onload=()=>ctx.drawImage(im,0,0,rect.width,620);im.src=state.boardData}}
 resize();
 function point(ev){const r=canvas.getBoundingClientRect();return {x:ev.clientX-r.left,y:ev.clientY-r.top}}
 function start(ev){ev.preventDefault();drawing=true;last=point(ev)}
 function move(ev){if(!drawing)return;ev.preventDefault();const p=point(ev);ctx.lineCap='round';ctx.lineJoin='round';ctx.lineWidth=size;ctx.strokeStyle=tool==='eraser'?'#fbfdff':'#17263a';ctx.beginPath();ctx.moveTo(last.x,last.y);ctx.lineTo(p.x,p.y);ctx.stroke();last=p}
 function end(){drawing=false;last=null;state.boardData=canvas.toDataURL('image/png');save()}
 ['pointerdown'].forEach(e=>canvas.addEventListener(e,start));canvas.addEventListener('pointermove',move);window.addEventListener('pointerup',end);
 qs('#board-pen').onclick=()=>{tool='pen';qs('#board-pen').classList.add('active');qs('#board-eraser').classList.remove('active')};qs('#board-eraser').onclick=()=>{tool='eraser';qs('#board-eraser').classList.add('active');qs('#board-pen').classList.remove('active')};qs('#board-size').oninput=e=>size=Number(e.target.value);qs('#board-clear').onclick=()=>{state.boardData=null;save();resize()};qs('#board-save').onclick=()=>{state.boardData=canvas.toDataURL('image/png');save();toast('Lousa salva neste navegador.');};
}

function renderSources(){shell(`<section class="section-head"><div><h2>🔗 Fontes oficiais</h2><p>Use o app como motor de treino; quando houver dúvida legal/municipal, volte à fonte primária.</p></div></section><div class="grid grid-2">${[['Edital Consulpam','Versão retificada do Concurso Público 001/2026',SOURCE.edital],['Portal do concurso','Página do concurso da Câmara Municipal',SOURCE.concurso],['Câmara de Senador Canedo','Portal institucional e legislação municipal',SOURCE.camara],['Lei Orgânica','PDF atualizado disponibilizado pela Câmara',SOURCE.leiOrganica],['IBGE — município','Dados e perfil de Senador Canedo',SOURCE.ibge],['IBGE — histórico','Histórico e formação administrativa',SOURCE.ibgeHistorico],['Lei 14.133/2021','Licitações e contratos administrativos',SOURCE.lei14133],['Lei 9.610/1998','Direitos autorais',SOURCE.lei9610],['W3C — WCAG','Padrão de acessibilidade web',SOURCE.wcag]].map(([t,p,u])=>`<div class="card"><h3>${esc(t)}</h3><p>${esc(p)}</p><a class="btn small" href="${u}" target="_blank" rel="noreferrer">Abrir fonte ↗</a></div>`).join('')}</div><div class="card" style="margin-top:16px"><h3>Backup do seu progresso</h3><p>O progresso fica no navegador. Para segurança, exporte um JSON de tempos em tempos.</p><div class="toolbar"><button class="btn" data-action="export">⬇ Exportar</button><button class="btn" data-action="import">⬆ Importar</button><button class="btn danger" data-action="reset">Zerar progresso</button></div><input id="import-file" type="file" accept="application/json" style="display:none"/></div>`);qs('#import-file').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{state={...defaultState(),...JSON.parse(r.result)};save();render();toast('Progresso importado.')}catch{toast('Arquivo inválido.')}};r.readAsText(f)};}

document.addEventListener('click',e=>{const choice=e.target.closest('[data-choice]');if(choice&&state.page==='quiz'){answer(Number(choice.dataset.choice));return}const navBtn=e.target.closest('[data-nav]');if(navBtn){state.page=navBtn.dataset.nav;save();render();return}const jump=e.target.closest('[data-exam-jump]');if(jump&&state.page==='quiz'&&state.quiz?.mode==='mock'){state.quiz.i=Number(jump.dataset.examJump);save();render();return}const act=e.target.closest('[data-action]');if(act){const a=act.dataset.action;if(a==='mark-lesson'){const k=`${act.dataset.subject}:${act.dataset.topic}`;if(!state.lessonDone[k]){state.lessonDone[k]=true;state.xp+=15;save();toast('+15 XP');render()}return}if(a==='next-topic'){state.study.topic=Number(act.dataset.topic)+1;save();render();return}if(a==='next-question'){const z=state.quiz;if(z.i+1>=z.count)return finishQuiz(false);z.i++;z.answered=false;z.selected=null;save();render();return}if(a==='quit-quiz'){state.page='home';state.quiz=null;save();render();return}
if(a==='prev-exam'){state.quiz.i=Math.max(0,state.quiz.i-1);save();render();return}
if(a==='next-exam'){state.quiz.i=Math.min(state.quiz.count-1,state.quiz.i+1);save();render();return}
if(a==='toggle-mark'){const q=questions.find(x=>x.id===state.quiz.ids[state.quiz.i]);state.quiz.marked=state.quiz.marked||{};state.quiz.marked[q.id]=!state.quiz.marked[q.id];save();render();return}
if(a==='submit-mock'){if(confirm('Finalizar a prova agora? Questões sem resposta serão consideradas em branco.')){finishQuiz(false)}return}
if(a==='open-board'){state.page='board';save();render();return}
handleAction(a,act.dataset)}});

render();
