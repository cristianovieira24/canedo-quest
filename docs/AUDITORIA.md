# Auditoria Canedo Quest — 30/09/2026

Base: commit 6190fb2. Levantamento antes das mudanças: 106 aulas e 516 questões autorais. Não são questões oficiais da Consulpam nem uma previsão da prova.

## Evidência do edital

PDF oficial baixado e lido: https://www.consulpam.com.br/arquivos/20260915_115832_EDITAL%20001.%202026%20C%C3%82MARA%20SENADOR%20CANEDO.pdf

Capítulo XII: demais cargos de nível superior, 18/10/2026, 15h–18h. Anexo II, p. 34: 10 Português + 10 demais conhecimentos gerais + 20 específicos; 2,5 pontos por questão; 25 pontos mínimos em conhecimentos gerais e 25 nos específicos. Capítulo XV confirma 50% em cada bloco. A proporção interna 3 Informática/2 Matemática/3 Direito/2 Município é uma escolha de treino: o edital não fixa essa distribuição.

Anexo III, p. 37: programa de nível superior; p. 42: Designer Gráfico. Atribuições no Anexo IV também foram consultadas, mas não substituem o programa da prova.

## Falhas críticas reproduzíveis

| Falha anterior | Evidência | Efeito |
|---|---|---|
| Gabaritos matemáticos errados | q198–q202: sequência 2,5,8,11 corrigida como 16; certo é 14 | Ensina cálculo errado |
| Gabarito revelado em prova | renderQuiz aplica `.correct` e `.wrong` mesmo em `mode=exam` | Simulado inválido |
| Resposta duplicada | answer chama recordAnswer; finalizeQuiz registra de novo porque `.scored` não existe em answered | XP, domínio, tentativas e revisão inflados |
| Viés de posição | 467 respostas A, 33 B, 15 C, 1 D | 90,5% de acerto escolhendo A |
| Revisão não abre | handlers inline referem-se a `wrong`, `due`, `weak`, `unseen`, variáveis locais de review | ReferenceError ao clicar |
| Visuais ausentes | renderer expanded retorna se não existir `.lesson-visual-card` antigo | Parte do catálogo nunca aparece |
| Tópicos misturados | correio não associa E-mail; direitos/garantias associa direitos políticos; geometria plana mistura espacial | Prova do módulo não mede a aula |
| Simulado difícil fora da proporção | 7 por disciplina, corta 42 para 40 | Específicos deixam de representar metade |
| Diagnóstico tratado como prova oficial | 40 inéditas sem cotas, mode=exam | Controle de blocos enganoso |
| Timer reconstrói a tela | renderQuiz chamado a cada segundo | Foco de teclado perdido; DOM destruído |
| Revisão espaçada usa tentativas totais | muitos erros seguidos + 1 acerto aumentam intervalo | Erro não reinicia consolidação |
| Importação sem validação | merge aceita tipos inválidos e chaves de protótipo | Pode inutilizar progresso/interface |
| SW apaga caches de toda a origem | activate remove qualquer cache diferente de CACHE | Pode afetar outros projetos no GitHub Pages |
| SW devolve HTML a qualquer falha | erro de JS/SVG recebe index.html | Recurso inválido no offline |

## Auditoria pedagógica de todas as matérias

Levantamento estrutural de todas as aulas e questões; leitura de conceitos, exemplos, gabaritos e pontos frágeis. Uma verificação sintática do banco não comprova verdade factual. Legislação local ainda requer cotejo artigo a artigo no texto consolidado.

| Matéria | Aulas/questões antes | Diagnóstico | Prioridade |
|---|---:|---|---|
| Português | 14/82 | Fonologia e tempos verbais têm questões sem aula própria. Ortografia não apresenta quadro completo de regras. Exemplo de coesão classifica “o documento” como pronome demonstrativo, incorretamente. Interpretação é melhor desenvolvida que gramática. | Aulas faltantes, correção da análise, exemplos anotados |
| Informática | 16/77 | Aulas de programação não explicam //, len e === já cobrados; Office tem pouca prática de referências; correio não recebe suas questões. Cobertura nominal não equivale a ensino suficiente de banco de dados/Office. | Rastreio de código, planilha, protocolos e vínculo explícito |
| Matemática | 15/97 | Conjuntos e trigonometria não têm módulos próprios. Combinatória cita arranjo mas não ensina fórmula de combinação já cobrada. Cinco sequências erradas. Estatística não explora efeito de valores extremos. | Corrigir banco; construir caminhos de cálculo com etapas ocultas |
| Direito | 16/68 | Arts. 18–19 sem aula própria. Garantias do art. 5 não vinculadas corretamente. Aulas repetem “leia a legislação” sem ensinar hipóteses e diferenças. Contratos administrativos não têm profundidade suficiente. | Organização constitucional, casos e leitura direta com fontes |
| Município | 14/43 | História tem repetição. Geografia omite dados/limites concretos; estatuto manda consultar fora, sem ensinar o texto; promulgação da Lei Orgânica não foi ensinada. q362 mistura emancipação de 1988 com instalação de 1989. | Cronologia correta e fontes locais; texto consolidado é pendência real |
| Design | 31/149 | Não há aulas próprias de softwares nem apresentações apesar de questões. RGB visual usa transparência como se fosse mistura aditiva; harmonia mostra bolinhas sem relações angulares; figura/fundo não exemplifica inversão real. Tipografia não mostra anatomia real. | Experimentos de cor, fluxo de software, aplicação institucional |

Os sete blocos de cada aula contêm trechos genéricos repetidos. Em 106/106 aulas “Como pode aparecer na prova” é o mesmo texto; autoexplicação também é genérica. O tamanho de muitas aulas, entre 140 e 250 palavras, é pequeno para temas extensos; adicionar palavras sem exemplos não resolve. Checklist e botão “Concluir” são autodeclaração, não prova de domínio. Flashcards iniciais são listas de tópicos, não respostas a perguntas; não possuem agenda própria de revisão.

## Questões

516 IDs únicos. Normalização conservadora detecta a duplicata de razão de PA q92/q297; q297 foi transformada em aplicação de termo geral, preservando o ID. Não confundir ∩/∪, sinais negativos ou acentos ao detectar duplicatas. O detector inicial que removia todos os símbolos acusava falsos positivos; não é usado como validação final.

Dificuldade é editorial, não calibrada por desempenho da Consulpam. Várias perguntas boost marcadas hard/expert só pedem definição e foram reclassificadas. Distratores como “apenas decorar” e “ignorar tudo” tornam a escolha muito fácil; o relatório não afirma que todo distrator foi refeito. Novas questões devem usar erros plausíveis, acompanhar explicação e vinculação curricular.

## Interface, mobile, PWA e armazenamento

Arquitetura preservada: scripts clássicos, SVG local, localStorage e service worker; sem framework ou dependência remota adicionada. Todos os wrappers de lesson/render/shell foram inspecionados. Principais riscos: foco perdido em renderizações, textos SVG pequenos no celular, textarea sem rótulo e animação sem reduced-motion. Instalação iOS/Android é um teste físico separado; Chromium offline não comprova instalação em todo aparelho.

## Limites e pendências

- Não certificar a cobertura integral de estatuto, emendas da Lei Orgânica e data de sua promulgação sem texto oficial consolidado.
- Ampliar contratos, todas as garantias constitucionais, regras completas de ortografia, operações reais de Office e técnicas práticas de software.
- Calibrar dificuldade e distratores com provas oficiais, sem atribuir questões autorais à banca.
- Flashcards ainda precisam de agenda própria e critérios de recuperação; métricas do modo rápido permanecem separadas do banco fixo.
- Conclusão de aula indica percurso concluído, não domínio garantido.
- Não recalcular XP histórico automaticamente: as respostas antigas podem ter sido duplicadas, e não há registro suficiente para reconstruir cada sessão com certeza.

## Implementação entregue

- Preservados IDs, progresso e arquitetura. Banco agora com 526 questões autorais e 113 aulas; módulos novos foram acrescentados ao fim de cada matéria.
- Correções de gabarito e conceitos; associação explícita de todas as questões aos módulos; contagens derivadas do banco final.
- Alternativas embaralhadas com ordem estável por sessão; pontuação única; simulado sem feedback antecipado e com mudança de resposta; 10/10/20 em ambos os simulados. Diagnóstico tem identificação própria.
- Timer preserva foco; revisão abre pelo clique real; intervalos usam acertos consecutivos; trilha intercala as seis matérias; sequência expirada aparece como zero. Progresso do painel alcança 100% e o círculo acompanha a porcentagem real.
- Importação valida estrutura e rejeita poluição de protótipo; falha de armazenamento informa o problema sem derrubar a tela. Progresso histórico não é reconstruído.
- Corrigida a estrutura dos comparativos SVG e sua inserção; diagramas deixam de cortar a quinta modalidade e o quarto passo. SVGs mantêm tamanho legível com rolagem interna no celular. Botões longos podem quebrar linha. Navegação inferior comporta os seis botões em uma única linha.
- Aulas novas: fonologia; tempos verbais; conjuntos; trigonometria; arts. 18–19; softwares gráficos; apresentações. Complementos de programação, planilhas, combinatória, estatística, cor e história.
- Exercícios em etapas em todas as disciplinas, com soluções recolhidas; recuperação ativa e critérios de autoavaliação em todas as aulas. Mistura RGB calculada por controles e círculo de matizes com relações angulares.
- Modo rápido mostra a construção completa em Português, rejeita distratores numericamente equivalentes, permite ler o feedback antes de avançar e conserva a questão ao abrir a lousa. Banco finito reapresentado não recebe promessa de ineditismo.
- PWA inclui os novos arquivos; limpeza de caches limitada ao aplicativo e fallback HTML somente para navegação.

Testes automatizados e no navegador passaram em 30/09/2026.

## Validação reproduzível

`node tests/audit.cjs`: IDs e alternativas, duplicatas textuais, cinco gabaritos, vínculos curriculares, pontuação e finalização única, espaçamento de revisão, 60 simulados com cotas, embaralhamento persistido, trilha, painel, importação malformada, handlers de revisão e 1.000 questões rápidas. Teste estrutural não certifica cada afirmação do conteúdo.

`tests/browser.cjs`: Chromium 153 via Playwright, desktop 1365×900 e celular 390×844. Abre cada uma das 113 aulas, verifica presença de recursos de ensino e largura de página; clica nos fluxos de revisão, respostas, troca de resposta, entrega e recarga de resultado; confere timer sem perda de foco, lousa no modo rápido, importação, controles RGB e exercício de porcentagem. Verifica o service worker e recarrega conteúdo/simulado sem rede. Instalação física em iOS/Android não foi certificada.

Execução: `PLAYWRIGHT_MODULE=/caminho/para/playwright CHROMIUM_EXECUTABLE=/caminho/para/chromium node tests/browser.cjs`. O teste serve o próprio projeto e usa perfil temporário. Capturas são geradas em `/tmp/canedo-qa` ou em `SCREENSHOT_DIR`.

## Cobertura efetiva por módulo

Uma questão pode servir a mais de um módulo. Estas contagens medem associação, não suficiência pedagógica. Módulos com uma ou duas questões precisam de ampliação antes que uma “prova do módulo” tenha força diagnóstica.

### Português

| Aula | Questões associadas |
|---|---:|
| Interpretação e inferência | 11 |
| Gêneros e tipos textuais | 5 |
| Estrutura textual | 5 |
| Variação e adequação | 3 |
| Ortografia e acentuação | 5 |
| Crase | 5 |
| Morfologia | 6 |
| Sintaxe e termos da oração | 6 |
| Coordenação e subordinação | 4 |
| Regência e concordância | 8 |
| Colocação pronominal | 3 |
| Pontuação | 6 |
| Semântica e estilística | 8 |
| Reescrita e produção textual | 2 |
| Fonologia e divisão silábica | 4 |
| Tempos, modos e flexão verbal | 3 |

### Informática

| Aula | Questões associadas |
|---|---:|
| Algoritmos e lógica | 13 |
| Programação estruturada | 5 |
| Sistemas operacionais | 4 |
| Windows 11 | 2 |
| Ubuntu Linux | 2 |
| Hardware e entrada/saída | 5 |
| Backup e recuperação | 3 |
| Office e Google Workspace | 5 |
| Formatos e intercâmbio de dados | 3 |
| Redes e Internet | 5 |
| Navegadores e pesquisa | 3 |
| Correio e mensageria | 4 |
| Cloud computing | 7 |
| Segurança da informação | 6 |
| Malware e defesa | 9 |
| Ambiente corporativo | 9 |

### Matemática

| Aula | Questões associadas |
|---|---:|
| Números e operações | 4 |
| Razão e proporção | 4 |
| Regra de três | 4 |
| Porcentagem | 12 |
| Juros simples | 4 |
| Álgebra básica | 3 |
| Sistemas lineares | 5 |
| Geometria plana | 4 |
| Geometria espacial | 2 |
| Medidas e sistema monetário | 3 |
| PA e PG | 13 |
| Combinatória | 5 |
| Probabilidade | 10 |
| Estatística | 7 |
| Lógica e sequências | 12 |
| Conjuntos e operações | 4 |
| Trigonometria no triângulo retângulo | 3 |

### Direito

| Aula | Questões associadas |
|---|---:|
| Princípios da Administração Pública | 10 |
| Poderes administrativos | 5 |
| Atos administrativos | 7 |
| Serviços públicos | 2 |
| Servidores e agentes públicos | 2 |
| Órgãos públicos | 1 |
| Improbidade administrativa | 2 |
| Processo administrativo | 2 |
| Licitações — fundamentos | 2 |
| Lei 14.133 — modalidades | 6 |
| Lei 14.133 — contratação direta | 4 |
| CF — princípios fundamentais | 6 |
| CF — direitos e garantias | 4 |
| CF — direitos sociais e nacionalidade | 3 |
| CF — direitos políticos e municípios | 6 |
| CF — Administração Pública | 8 |
| CF — organização político-administrativa | 3 |

### Município

| Aula | Questões associadas |
|---|---:|
| Origem e ferrovia | 3 |
| Esplanada e homenagem | 4 |
| Distrito e Goiânia | 4 |
| Emancipação e instalação | 6 |
| Formação administrativa | 2 |
| Geografia local | 2 |
| Municípios circunvizinhos | 2 |
| Economia e dinâmica urbana | 3 |
| Lei Orgânica — competência legislativa | 6 |
| Lei Orgânica — competências privativas | 7 |
| Administração Municipal | 1 |
| Poder Legislativo municipal | 1 |
| Transparência e comunicação pública | 2 |
| Estatuto do servidor | 3 |

### Design

| Aula | Questões associadas |
|---|---:|
| Fundamentos e elementos visuais | 3 |
| Gestalt — proximidade e semelhança | 4 |
| Gestalt — fechamento e continuidade | 5 |
| Gestalt — figura/fundo e pregnância | 4 |
| Hierarquia e composição | 8 |
| Grid e layout | 5 |
| Tipografia — anatomia e famílias | 7 |
| Tipografia — legibilidade | 5 |
| Cor — modelos | 7 |
| Cor — harmonia e contraste | 4 |
| Psicologia da cor e contexto | 1 |
| Comunicação institucional | 2 |
| Identidade visual | 1 |
| Manual de identidade | 6 |
| Símbolos públicos | 2 |
| Diagramação de publicações | 11 |
| Produção gráfica | 8 |
| Fechamento de arquivo | 7 |
| Tratamento de imagens | 5 |
| Design para web | 4 |
| Redes sociais institucionais | 1 |
| UX/UI no setor público | 8 |
| Acessibilidade visual | 10 |
| WCAG — visão conceitual | 5 |
| Comunicação inclusiva | 2 |
| Direitos autorais | 2 |
| Fontes e licenças | 2 |
| Ética profissional | 1 |
| Design e serviço público | 5 |
| Organização técnica | 2 |
| Atribuições práticas do cargo | 8 |
| Softwares, raster, vetor e editoração | 10 |
| Apresentações institucionais | 2 |

