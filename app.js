/* Vibe Rush — a local-first, two-player vibe-coding challenge. No API keys required. */
(() => {
  'use strict';

  const STORE = 'viberush-game-v1';
  const HISTORY_STORE = 'viberush-history-v1';
  const DIFFICULTIES = {
    easy: { label: 'Fácil', minutes: 60, tag: 'WARM UP', features: 5, featurePoints: 10, wildcardPoints: 20, description: 'Tempo para criar com calma.' },
    hard: { label: 'Hard', minutes: 30, tag: 'FOCUS MODE', features: 4, featurePoints: 15, wildcardPoints: 20, description: 'Decisões rápidas. Menos tempo.' },
    ultra: { label: 'Ultra Hard', minutes: 15, tag: 'SPEED RUN', features: 3, featurePoints: 20, wildcardPoints: 25, description: 'Construa antes que o caos chegue.' }
  };
  const PALETTES = [
    { name: 'Coral Terminal', colors: ['#F08D68', '#22201E', '#F8EEDD'], description: 'Coral como destaque, grafite e creme.' },
    { name: 'Neon Noturno', colors: ['#B0FA73', '#141C1A', '#E7FFE0'], description: 'Verde vibrante, fundo escuro e branco.' },
    { name: 'Digital Lavender', colors: ['#AF91FA', '#262139', '#F4EFFF'], description: 'Lilás, ameixa e lavanda clara.' },
    { name: 'Azul Elétrico', colors: ['#59ABFF', '#121C31', '#EFF8FF'], description: 'Azul vivo, marinho e gelo.' },
    { name: 'Manga & Café', colors: ['#F9BC58', '#3F2821', '#FFF3D9'], description: 'Amarelo manga, marrom e areia.' },
    { name: 'Rosa Arcade', colors: ['#FF89A9', '#39232D', '#FFF0F4'], description: 'Rosa, vinho escuro e blush.' },
    { name: 'Mint Club', colors: ['#7AE8C4', '#19342D', '#EBFFF7'], description: 'Verde menta, floresta e off-white.' },
    { name: 'Monocromático', colors: ['#E5E2DB', '#1B1B1B', '#87847F'], description: 'Apenas preto, cinzas e branco.' },
    { name: 'Laranja Solar', colors: ['#FF8D35', '#392412', '#FFF3E4'], description: 'Laranja forte, espresso e baunilha.' },
    { name: 'Cyber Cherry', colors: ['#F56269', '#271B32', '#FFF0F0'], description: 'Cereja, roxo profundo e rosa claro.' }
  ];
  const TWISTS = [
    { name: 'Modo escuro', detail: 'Inclua uma alternância funcional entre tema claro e escuro.' },
    { name: 'Busca de verdade', detail: 'Implemente uma busca que realmente filtre o conteúdo da tela.' },
    { name: 'Microinterações', detail: 'Adicione animação ou feedback visual a pelo menos 3 ações.' },
    { name: 'Estado vazio', detail: 'Crie um estado vazio caprichado com orientação e ação útil.' },
    { name: 'Favoritos', detail: 'Permita marcar, desmarcar e filtrar itens favoritos.' },
    { name: 'Teclado ninja', detail: 'Implemente pelo menos um atalho de teclado funcional.' },
    { name: 'Filtro esperto', detail: 'Inclua um filtro funcional que mude os itens exibidos.' },
    { name: 'Modal surpresa', detail: 'Implemente um modal com formulário ou ação funcional.' },
    { name: 'Confirmação elegante', detail: 'Mostre feedback de sucesso após uma ação importante.' },
    { name: 'Sidebar retrátil', detail: 'Inclua uma barra lateral que expanda e recolha.' },
    { name: 'Persistência local', detail: 'Faça um dado criado pelo usuário sobreviver ao recarregamento.' },
    { name: 'Personalização', detail: 'Permita personalizar ao menos uma preferência do aplicativo.' },
    { name: 'Loading criativo', detail: 'Mostre um estado de carregamento durante uma ação simulada.' },
    { name: 'Criação de itens', detail: 'Permita criar novos itens via formulário e mostrá-los na interface.' },
    { name: 'Notificações internas', detail: 'Crie notificações/toasts em duas interações do aplicativo.' },
    { name: 'Atalho mobile', detail: 'Inclua uma barra de navegação dedicada à versão mobile.' }
  ];

  // Entries: kind | name | area | brief | six possible feature requirements
  const CHALLENGE_LINES = [
    'clone|WhatsApp|Mensagens|Recrie a experiência de conversas do WhatsApp.|Lista de conversas com contatos~Abrir uma conversa e visualizar mensagens~Campo para escrever e enviar mensagens~Busca de conversas funcional~Indicador de mensagens não lidas~Criar uma nova conversa',
    'clone|Spotify|Música|Crie uma experiência de streaming de músicas.|Home com playlists e álbuns~Página de playlist com faixas~Player com play e pause funcional~Busca de artistas ou músicas~Favoritar músicas~Fila de reprodução',
    'clone|YouTube|Vídeos|Monte sua própria plataforma de vídeos.|Feed de vídeos com miniaturas~Página de reprodução de vídeo~Barra de busca funcional~Inscrever-se em um canal~Área de comentários~Recomendações de vídeos',
    'clone|Instagram|Rede social|Recrie a experiência de compartilhar momentos.|Feed de publicações~Página de perfil com grid~Curtir e descurtir posts~Visualização de stories~Navegação entre abas~Criar publicação simulada',
    'clone|Facebook|Rede social|Construa um feed social clássico.|Feed com publicações~Curtir e comentar posts~Página de perfil~Área de amigos ou sugestões~Criar nova publicação~Notificações simuladas',
    'clone|TikTok|Vídeos curtos|Crie um feed imersivo de vídeos curtos.|Feed vertical de vídeos~Ações de curtir e salvar~Área de comentários~Alternar entre vídeos~Página de criador~Sistema de seguir',
    'clone|Netflix|Streaming|Recrie um catálogo de filmes e séries.|Hero com destaque do catálogo~Fileiras de filmes por categoria~Página de detalhes do título~Busca por nome~Minha lista de favoritos~Seleção de perfis',
    'clone|Uber|Mobilidade|Crie um fluxo de solicitação de corrida.|Origem e destino~Seleção de tipo de corrida~Estimativa simulada de preço~Resumo da viagem~Confirmar corrida~Histórico de viagens',
    'clone|iFood|Delivery|Recrie um aplicativo de pedir comida.|Lista de restaurantes~Página de restaurante e cardápio~Adicionar itens ao carrinho~Editar quantidades do pedido~Checkout simulado~Acompanhar status do pedido',
    'clone|Trello|Produtividade|Crie um quadro Kanban funcional.|Quadro com colunas~Criar cards de tarefas~Mover cards entre colunas~Editar descrição da tarefa~Etiquetas de prioridade~Contador de tarefas por coluna',
    'clone|Notion|Produtividade|Monte uma base de páginas conectadas.|Sidebar de páginas~Criar nova página~Editor de texto simples~Lista ou checklist editável~Busca de páginas~Duplicar página',
    'clone|Pinterest|Inspiração|Construa um mural visual de inspirações.|Grid estilo masonry~Abrir detalhes de um pin~Salvar em coleção~Busca por categoria~Criar coleção~Página de itens salvos',
    'clone|Discord|Comunidade|Faça um app de comunidades e canais.|Lista de servidores~Canais de texto~Enviar mensagens no canal~Lista de membros~Criar novo canal~Alternar entre servidores',
    'clone|Gmail|Email|Construa uma caixa de entrada funcional.|Lista de e-mails~Abrir e ler uma mensagem~Compor um novo e-mail simulado~Busca na caixa de entrada~Marcar e-mail como lido~Arquivar e-mail',
    'clone|Google Maps|Mapas|Crie uma experiência de busca de locais.|Tela de mapa ilustrado~Campo para buscar local~Marcadores clicáveis~Card de detalhes do local~Salvar lugares favoritos~Traçar rota simulada',
    'clone|Airbnb|Viagens|Monte um marketplace de hospedagens.|Busca de destinos~Cards de hospedagens~Filtros de preço~Página de detalhes do imóvel~Salvar favoritos~Solicitar reserva simulada',
    'clone|Duolingo|Educação|Crie uma trilha gamificada de estudos.|Mapa de lições~Abrir lição com perguntas~Validar resposta correta~Barra de progresso~Sistema de pontos ou XP~Tela de conclusão de lição',
    'clone|Mercado Livre|E-commerce|Monte uma experiência de compra online.|Vitrine de produtos~Busca de produtos~Página de produto~Carrinho funcional~Filtro por categoria~Checkout simulado',
    'clone|Nubank|Finanças|Crie um painel de banco digital.|Saldo e resumo da conta~Extrato de movimentações~Cartão virtual ilustrado~Ação de transferência simulada~Controle de gastos por categoria~Ocultar e mostrar saldo',
    'clone|LinkedIn|Profissional|Monte uma rede social profissional.|Feed de conteúdo profissional~Perfil com experiências~Curtir publicações~Criar uma postagem~Busca de profissionais~Lista de vagas',
    'clone|Canva|Design|Crie um editor de designs básico.|Galeria de templates~Selecionar um template~Editor com canvas~Editar texto do design~Alterar cor de elementos~Baixar imagem do design',
    'clone|Figma|Design|Monte um editor de interfaces simplificado.|Canvas de edição~Adicionar retângulos e textos~Selecionar elemento~Editar cor de um elemento~Lista de camadas~Mover elementos no canvas',
    'clone|ChatGPT|Inteligência artificial|Monte uma interface de conversas com IA simulada.|Lista de conversas na sidebar~Criar novo chat~Enviar mensagens~Resposta simulada com loading~Renomear conversa~Persistir histórico localmente',
    'clone|X / Twitter|Rede social|Crie um feed rápido de posts curtos.|Timeline de posts~Criar post curto~Curtir e repostar~Página de perfil~Buscar posts~Contador de caracteres',
    'clone|Google Agenda|Produtividade|Construa um calendário para compromissos.|Visão mensal do calendário~Navegar entre meses~Criar evento com horário~Abrir detalhes de evento~Editar ou excluir evento~Lista dos próximos eventos',
    'clone|Slack|Equipe|Crie um espaço de comunicação de equipe.|Sidebar de canais~Mensagens em canais~Enviar mensagem~Threads de conversa~Busca de mensagens~Trocar de workspace',
    'clone|Shopee|E-commerce|Crie uma loja virtual cheia de ofertas.|Vitrine com produtos~Categorias navegáveis~Carrinho de compras~Cupom de desconto simulado~Página do produto~Busca por produto',
    'clone|Twitch|Lives|Monte uma plataforma de streaming ao vivo.|Grade de canais ao vivo~Página de transmissão simulada~Chat de live funcional~Seguir canais~Lista de categorias~Buscar streamer',
    'clone|Reddit|Comunidade|Crie um fórum de comunidades.|Feed de posts por comunidade~Votar em posts~Abrir discussão e comentários~Criar publicação~Trocar comunidade~Ordenar posts',
    'clone|Strava|Fitness|Faça um painel de atividades esportivas.|Dashboard de atividades~Registrar atividade~Gráfico de evolução~Histórico de treinos~Metas semanais~Ranking de atletas',
    'original|CRM de Vendas|Negócios|Crie um mini CRM para acompanhar oportunidades.|Pipeline com etapas~Cadastrar lead~Mover lead no funil~Detalhes do contato~Filtrar negócios por status~Resumo de vendas',
    'original|Gestor Financeiro|Finanças|Crie um painel de entradas e saídas.|Resumo de receitas e despesas~Cadastrar transação~Listagem com categorias~Filtro por período~Gráfico de gastos~Saldo atualizado',
    'original|Agenda de Barbearia|Serviços|Organize horários de uma barbearia.|Lista de serviços e preços~Agenda com horários disponíveis~Agendar um horário~Lista de agendamentos~Cancelar agendamento~Cadastro de clientes',
    'original|App de Hábitos|Lifestyle|Invente um rastreador de hábitos motivador.|Lista de hábitos diários~Marcar hábito concluído~Adicionar hábito~Streak de dias~Resumo semanal~Editar e excluir hábito',
    'original|Controle de Estoque|Comércio|Crie um sistema para organizar produtos.|Cadastro de produto~Quantidade em estoque~Entrada e saída de item~Alerta de estoque baixo~Busca por nome~Histórico de movimentação',
    'original|Gestor de Projetos|Produtividade|Monte um painel de projetos e tarefas.|Listar projetos~Criar tarefa com prazo~Alterar status da tarefa~Visão Kanban~Filtrar tarefas~Indicador de progresso',
    'original|Reserva de Quadras|Esportes|Construa uma plataforma de reservas esportivas.|Lista de quadras~Horários disponíveis~Reservar um horário~Minhas reservas~Cancelar reserva~Filtro por tipo de esporte',
    'original|Cardápio Digital|Restaurante|Monte um cardápio para pedidos digitais.|Listar pratos por categoria~Abrir detalhes do prato~Adicionar ao carrinho~Editar quantidades~Resumo do pedido~Finalizar pedido simulado',
    'original|Planner de Estudos|Educação|Ajude estudantes a organizar suas matérias.|Lista de matérias~Criar sessão de estudo~Cronograma semanal~Marcar sessão concluída~Barra de progresso~Filtro por matéria',
    'original|Central de Freelancers|Marketplace|Crie um marketplace de serviços criativos.|Lista de profissionais~Página de perfil~Filtro por habilidade~Formulário de contato~Salvar favoritos~Área de projetos disponíveis',
    'original|App de Receitas|Culinária|Crie um livro de receitas interativo.|Galeria de receitas~Detalhe com ingredientes~Passo a passo~Favoritar receita~Busca por ingrediente~Adicionar receita própria',
    'original|Gestor de Eventos|Eventos|Organize inscrições e participantes.|Listar eventos~Criar evento~Formulário de inscrição~Lista de inscritos~Contador de vagas~Check-in simulado',
    'original|Painel de Métricas|Analytics|Monte um dashboard de performance.|Cards de indicadores~Gráfico de evolução~Filtro de período~Tabela de resultados~Comparação entre métricas~Exportação simulada',
    'original|Pet Shop Manager|Serviços|Organize clientes e atendimentos de pets.|Cadastro de animais~Cadastro de tutores~Agendar atendimento~Lista de próximos horários~Histórico de serviços~Status do atendimento',
    'original|App de Viagens|Viagens|Planeje viagens e roteiros em um só lugar.|Criar viagem~Lista de destinos~Adicionar atividades ao roteiro~Organizar por dia~Controle de orçamento~Checklist de bagagem',
    'original|Controle de Assinaturas|Finanças|Ajude a acompanhar pagamentos recorrentes.|Cadastrar assinatura~Listar valores mensais~Somar custo mensal~Alertas de vencimento~Categorias de assinatura~Cancelar assinatura',
    'original|Gestor de Academia|Fitness|Crie um painel para alunos e treinos.|Cadastro de alunos~Lista de planos~Ficha de exercícios~Marcar treino concluído~Evolução do aluno~Controle de mensalidades',
    'original|Sistema de Chamados|Suporte|Monte um suporte com tickets de atendimento.|Abrir chamado~Listar chamados~Mudar status do ticket~Definir prioridade~Comentários no chamado~Filtrar por atendente',
    'original|App de Leitura|Livros|Crie um organizador de livros e leitura.|Estante de livros~Adicionar livro~Status de leitura~Progresso por páginas~Lista de favoritos~Metas de leitura',
    'original|Gerador de Orçamentos|Vendas|Crie propostas comerciais rápidas.|Cadastrar cliente~Adicionar itens ao orçamento~Calcular valor total~Gerar resumo da proposta~Status de aprovação~Histórico de propostas',
    'original|Fila de Atendimento|Operações|Organize senhas e atendimentos.|Gerar senha~Exibir fila atual~Chamar próxima senha~Marcar atendimento concluído~Lista de senhas atendidas~Tempo de espera simulado',
    'original|App de Voluntariado|Social|Conecte pessoas a ações voluntárias.|Listar oportunidades~Filtrar por causa~Página da oportunidade~Inscrever-se para ajudar~Minhas inscrições~Cadastro de iniciativa',
    'original|Controle de Delivery|Logística|Gerencie pedidos e entregas.|Receber pedido simulado~Lista de pedidos~Alterar status de preparo~Atribuir entregador~Acompanhar entrega~Filtro por status',
    'original|Planejador de Conteúdo|Marketing|Crie uma central para criadores de conteúdo.|Calendário de postagens~Criar ideia de conteúdo~Status de produção~Filtro por plataforma~Biblioteca de ideias~Visão semanal'
  ];

  const CHALLENGES = CHALLENGE_LINES.map((line, index) => {
    const [kind, name, area, brief, rawFeatures] = line.split('|');
    return { id: index, kind, name, area, brief, features: rawFeatures.split('~') };
  });

  const $ = selector => document.querySelector(selector);
  const app = $('#app');
  const safely = value => String(value ?? '').replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[char]);
  const readStore = (key, fallback) => { try { const value = JSON.parse(localStorage.getItem(key)); return value ?? fallback; } catch (_) { return fallback; } };
  const saveStore = (key, value) => { try { localStorage.setItem(key, JSON.stringify(value)); } catch (_) { /* Private browsing can disable storage. */ } };
  const shuffle = array => [...array].sort(() => Math.random() - .5);
  const choice = array => array[Math.floor(Math.random() * array.length)];
  const timeText = seconds => { const total = Math.max(0, Math.ceil(seconds)); return String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0'); };
  const asName = (value, fallback) => (String(value || '').trim().slice(0, 22) || fallback);
  const initial = {
    phase: 'setup', difficulty: 'hard', category: 'all',
    players: ['Jogador 1', 'Jogador 2'], sound: true,
    wheelItems: [], wheelAngle: 0, spinning: false, drawn: false,
    challenge: null, palette: null, twist: null,
    timer: { duration: 1800, remaining: 1800, running: false, endAt: 0 },
    checks: [{}, {}], resultSaved: false, endReason: 'manual', confirmEnd: false
  };
  let state = Object.assign({}, initial, readStore(STORE, {}));
  let history = readStore(HISTORY_STORE, []);
  if (!Array.isArray(history)) history = [];
  if (!Array.isArray(state.players) || state.players.length !== 2) state.players = [...initial.players];
  if (!DIFFICULTIES[state.difficulty]) state.difficulty = 'hard';
  if (!['all', 'clone', 'original'].includes(state.category)) state.category = 'all';
  if (!['setup', 'draw', 'battle', 'timeup', 'judge', 'results'].includes(state.phase)) state.phase = 'setup';
  if (!Array.isArray(state.checks) || state.checks.length !== 2) state.checks = [{}, {}];
  if (!state.timer || !Number.isFinite(state.timer.remaining)) state.timer = { ...initial.timer };
  if (state.spinning) state.spinning = false;
  if (state.phase !== 'setup' && state.challenge == null && ['battle','timeup','judge','results'].includes(state.phase)) state.phase = 'setup';
  if (state.phase === 'draw' && (!Array.isArray(state.wheelItems) || state.wheelItems.length !== 8)) state.wheelItems = [];
  let tickInterval = null;
  let spinTimeout = null;
  let toastTimeout = null;
  let audio = null;

  function persist() {
    saveStore(STORE, { ...state, spinning: false });
    saveStore(HISTORY_STORE, history);
  }
  function playSound(type = 'tap') {
    if (!state.sound) return;
    try {
      const AudioCtor = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtor) return;
      audio = audio || new AudioCtor();
      if (audio.state === 'suspended') audio.resume();
      const notes = type === 'timeup' ? [[0, 660, .22], [.28, 480, .22], [.56, 660, .22], [.84, 480, .28]] :
        type === 'win' ? [[0, 523, .12], [.13, 659, .12], [.26, 784, .25]] :
        type === 'spin' ? [[0, 260, .08], [.12, 420, .09], [.26, 630, .12]] : [[0, 420, .04]];
      notes.forEach(([delay, freq, duration]) => {
        const oscillator = audio.createOscillator();
        const gain = audio.createGain();
        oscillator.type = type === 'timeup' ? 'square' : 'triangle';
        oscillator.frequency.value = freq;
        gain.gain.setValueAtTime(.0001, audio.currentTime + delay);
        gain.gain.exponentialRampToValueAtTime(type === 'timeup' ? .065 : .045, audio.currentTime + delay + .01);
        gain.gain.exponentialRampToValueAtTime(.0001, audio.currentTime + delay + duration);
        oscillator.connect(gain).connect(audio.destination);
        oscillator.start(audio.currentTime + delay);
        oscillator.stop(audio.currentTime + delay + duration + .02);
      });
    } catch (_) { /* Audio is optional. */ }
  }
  function toast(message) {
    const element = $('#toast');
    if (!element) return;
    element.textContent = message;
    element.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => element.classList.remove('show'), 2800);
  }
  function saveAndRender(scroll = false) {
    persist();
    render();
    if (scroll) window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  function freshWheel() {
    const pool = CHALLENGES.filter(item => state.category === 'all' || item.kind === state.category);
    state.wheelItems = shuffle(pool).slice(0, 8).map(item => item.id);
    state.drawn = false;
    state.spinning = false;
    state.wheelAngle = 0;
    state.challenge = null;
    state.palette = null;
    state.twist = null;
  }
  function challenge() { return CHALLENGES.find(item => item.id === state.challenge) || null; }
  function requirements() {
    const target = challenge();
    if (!target || !state.palette || !state.twist) return [];
    const d = DIFFICULTIES[state.difficulty];
    const result = target.features.slice(0, d.features).map((label, index) => ({ id: 'feature-' + index, label, points: d.featurePoints, kind: 'feature' }));
    result.push({ id: 'colors', label: 'Respeitar a paleta ' + state.palette.name, detail: 'Aplicar as três cores sorteadas de forma reconhecível.', points: 10, kind: 'design' });
    result.push({ id: 'twist', label: state.twist.name, detail: state.twist.detail, points: d.wildcardPoints, kind: 'wildcard' });
    result.push({ id: 'responsive', label: 'Interface responsiva', detail: 'Usável no desktop e em tela de celular.', points: 10, kind: 'quality' });
    result.push({ id: 'quality', label: target.kind === 'clone' ? 'Identidade reconhecível' : 'Experiência intuitiva', detail: target.kind === 'clone' ? 'O resultado lembra o app original sem ser só uma imagem.' : 'Os principais fluxos são fáceis de entender e usar.', points: 10, kind: 'quality' });
    return result;
  }
  function totalPossible() { return requirements().reduce((sum, requirement) => sum + requirement.points, 0); }
  function score(player) {
    return requirements().reduce((sum, requirement) => sum + (state.checks[player]?.[requirement.id] ? requirement.points : 0), 0);
  }
  function completed(player) { return requirements().filter(requirement => state.checks[player]?.[requirement.id]).length; }
  function winnerIndex() { return score(0) === score(1) ? -1 : score(0) > score(1) ? 0 : 1; }
  function kindText(kind) { return kind === 'clone' ? 'RECRIAR APP' : 'CRIAR DO ZERO'; }
  function icon(name, size = 18) {
    const paths = {
      bolt: '<path d="m13 2-3 8h7l-6 12 1-9H5l8-11Z"/>',
      arrow: '<path d="M5 12h14m-6-6 6 6-6 6"/>',
      clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
      shuffle: '<path d="m18 14 4 4-4 4M2 18h2.5a6 6 0 0 0 5.2-3l4.6-8a6 6 0 0 1 5.2-3H22"/><path d="m18 2 4 4-4 4M2 6h2.5a6 6 0 0 1 5.2 3m4.6 6a6 6 0 0 0 5.2 3H22"/>',
      volume: '<path d="M11 5 6 9H3v6h3l5 4V5Zm5 4a5 5 0 0 1 0 6m3-9a9 9 0 0 1 0 12"/>',
      muted: '<path d="M11 5 6 9H3v6h3l5 4V5Zm6 4 5 6m0-6-5 6"/>',
      check: '<path d="m5 12 4 4L19 6"/>',
      play: '<path d="m8 5 11 7-11 7V5Z"/>',
      pause: '<path d="M8 5v14M16 5v14"/>',
      stop: '<rect x="5" y="5" width="14" height="14" rx="1"/>',
      trophy: '<path d="M8 21h8m-4-4v4M7 4h10v5a5 5 0 0 1-10 0V4ZM7 6H4v2a4 4 0 0 0 4 4m9-6h3v2a4 4 0 0 1-4 4"/>',
      copy: '<rect x="8" y="8" width="12" height="12" rx="2"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>',
      refresh: '<path d="M20 7v5h-5M4 17v-5h5"/><path d="M5.5 9A7 7 0 0 1 18 7l2 5M4 12l2 5a7 7 0 0 0 12.5-2"/>',
      chevron: '<path d="m9 18 6-6-6-6"/>',
      close: '<path d="M18 6 6 18M6 6l12 12"/>',
      spark: '<path d="m12 2 2.4 7.6L22 12l-7.6 2.4L12 22l-2.4-7.6L2 12l7.6-2.4L12 2Z"/>',
      info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6m0-10h.01"/>',
      flag: '<path d="M5 21V4m0 1c5-3 9 3 14 0v11c-5 3-9-3-14 0"/>',
      layers: '<path d="m12 3 9 5-9 5-9-5 9-5Zm-9 9 9 5 9-5m-18 5 9 5 9-5"/>',
      users: '<circle cx="9" cy="8" r="3"/><path d="M3 21v-2a6 6 0 0 1 12 0v2m1-16a3 3 0 0 1 0 6m1 4a5 5 0 0 1 4 5v1"/>',
      target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
      external: '<path d="M13 5h6v6m0-6-9 9"/><path d="M19 14v5H5V5h5"/>'
    };
    return '<svg aria-hidden="true" width="' + size + '" height="' + size + '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">' + (paths[name] || paths.spark) + '</svg>';
  }
  function mascot(color = '#F28D68', label = 'Rushy') {
    return `<svg class="mascot-svg" role="img" aria-label="${safely(label)}, mascote pixel art do Vibe Rush, usando um notebook" viewBox="0 0 310 278" xmlns="http://www.w3.org/2000/svg" shape-rendering="crispEdges">
      <ellipse cx="159" cy="255" rx="115" ry="10" fill="#050505" opacity=".32" />
      <path d="M75 57h18V39h125v12h19v19h17v29h17v90h-16v17h-29v30h-21v-21H111v22H88v-32H65v-20H48v-83h17V75h10Z" fill="${color}"/>
      <path d="M75 57h18V39h22v17H93v17H75v42H64V75h11Z" fill="#fff" opacity=".13" />
      <path d="M65 178h24v28h22v31H88v-32H65Z" fill="#b85038" opacity=".63" />
      <path d="M235 73h19v26h17v89h-16v-13h-19Z" fill="#b85038" opacity=".42" />
      <rect x="115" y="99" width="14" height="33" rx="1" fill="#181716"/>
      <rect x="206" y="99" width="14" height="33" rx="1" fill="#181716"/>
      <path d="M145 148h12v8h19v-8h12" stroke="#ad4a35" stroke-width="6" fill="none"/>
      <rect x="96" y="142" width="12" height="8" fill="#ffbea0" opacity=".7"/>
      <rect x="231" y="142" width="12" height="8" fill="#ffbea0" opacity=".7"/>
      <path d="M90 171h-24v12h-9v24h18v-15h23Z" fill="${color}"/>
      <path d="M245 174h17v21h-18v10h-15v-18Z" fill="${color}"/>
      <path d="M98 175h147v10h7v66H101l-16-65Z" fill="#292729" />
      <path d="M103 177h139v7H103Z" fill="#57535b" />
      <path d="M101 249h150v9H84v-9Z" fill="#1B1B1F" />
      <rect x="163" y="208" width="10" height="10" fill="#EDE9E5"/><rect x="174" y="218" width="10" height="10" fill="#EDE9E5"/><rect x="152" y="218" width="10" height="10" fill="#EDE9E5"/><rect x="184" y="228" width="10" height="10" fill="#EDE9E5"/>
      <path d="M275 29h8v16h-8zM268 37h23v7h-23z" fill="#F4B574"/><rect x="37" y="63" width="8" height="8" fill="#F4B574"/><rect x="34" y="72" width="6" height="6" fill="#F4B574" />
    </svg>`;
  }
  function playerAvatar(index) {
    return '<div class="avatar avatar-' + index + '" aria-hidden="true"><span class="avatar-eye left"></span><span class="avatar-eye right"></span><span class="avatar-mouth"></span></div>';
  }
  function header() {
    return `<header class="site-header"><div class="header-inner">
      <div class="brand" aria-label="Vibe Rush"><span class="brand-mark">✳</span><span>VIBE<span class="brand-accent">RUSH</span><i>_</i></span></div>
      <nav class="nav-actions" aria-label="Navegação principal">
        <button class="nav-link ${state.phase === 'setup' ? 'nav-current' : ''}" data-action="home">${icon('layers', 15)} <span>Arena</span></button>
        <button class="nav-link" data-action="history">${icon('trophy', 15)} <span>Ranking</span></button>
        <button class="sound-button" data-action="sound" title="${state.sound ? 'Desativar' : 'Ativar'} som" aria-label="${state.sound ? 'Desativar' : 'Ativar'} som">${icon(state.sound ? 'volume' : 'muted', 18)}</button>
      </nav></div></header>`;
  }
  function hero() {
    if (state.phase !== 'setup') {
      return `<section class="mini-hero wrap"><div class="crumb"><span class="pixel-star">✳</span> VIBE RUSH <span class="crumb-sep">/</span> ${state.phase === 'draw' ? 'SORTEIO' : state.phase === 'battle' ? 'BATALHA' : state.phase === 'timeup' ? 'TEMPO ESGOTADO' : state.phase === 'judge' ? 'AVALIAÇÃO' : 'RESULTADO'}</div><div class="mini-hero-right">TWO PLAYERS. ONE MISSION. <span class="orange">▌</span></div></section>`;
    }
    return `<section class="hero wrap"><div class="hero-copy"><div class="eyebrow"><span class="pixel-star">✳</span> WELCOME TO THE VIBE CODING ARENA <span class="eyebrow-dot">●</span> ONLINE</div>
      <h1 class="hero-title">VIBE<span>RUSH</span><strong>_</strong></h1>
      <p class="hero-lead">O duelo definitivo de <b>vibe coding.</b></p>
      <p class="hero-description">Dois jogadores. Um desafio sorteado. O relógio correndo.<br class="desktop-only"/> Quem constrói melhor antes do tempo acabar?</p>
      <div class="hero-tags"><span>✳ 2 PLAYERS</span><span>◷ 15—60 MIN</span><span>✧ RANDOM CHALLENGES</span></div></div>
      <div class="hero-mascot" aria-label="Mascote do jogo"><div class="mascot-pixel-noise"><i></i><i></i><i></i><i></i><i></i></div><div class="mascot-speech">&gt; READY TO BUILD?<span class="cursor-blink">_</span></div>${mascot()}<span class="mascot-ground">VR-01 // LET'S CODE</span></div></section>`;
  }
  function progressBar() {
    const order = ['setup', 'draw', 'battle', 'judge'];
    const active = state.phase === 'timeup' ? 2 : state.phase === 'results' ? 3 : order.indexOf(state.phase);
    const labels = ['PREPARAR', 'SORTEAR', 'CONSTRUIR', 'AVALIAR'];
    return `<div class="stepper wrap" aria-label="Etapas da partida">${labels.map((label, index) => `<div class="step ${index < active ? 'done' : ''} ${index === active ? 'active' : ''}"><span class="step-number">${index < active ? icon('check', 13) : '0' + (index + 1)}</span><span>${label}</span></div>`).join('<div class="step-connector"></div>')}</div>`;
  }
  function panelHead(index, heading, subtitle) {
    return `<div class="panel-head"><div><div class="panel-kicker">// ${index}</div><h2>${heading}</h2>${subtitle ? `<p>${subtitle}</p>` : ''}</div><span class="panel-cross" aria-hidden="true">✳</span></div>`;
  }
  function setup() {
    const mode = DIFFICULTIES[state.difficulty];
    return `<section class="main-section wrap setup-layout"><div class="panel setup-panel">
      ${panelHead('01 — CONFIGURAÇÃO', 'Configure sua batalha', 'Defina os competidores e escolha a intensidade.')}
      <div class="form-block"><div class="field-heading"><span class="field-count">01</span><h3>Quem vai competir?</h3><span class="field-help">2 jogadores</span></div>
        <div class="players-grid">${state.players.map((name, index) => `<label class="player-field">${playerAvatar(index)}<span class="player-meta"><span>PLAYER 0${index + 1}</span><input data-player="${index}" type="text" autocomplete="off" maxlength="22" placeholder="Nome do jogador" value="${safely(name)}" aria-label="Nome do jogador ${index + 1}" /></span><span class="input-edit">✎</span></label>`).join('')}</div>
      </div>
      <div class="form-block"><div class="field-heading"><span class="field-count">02</span><h3>Escolha a dificuldade</h3><span class="field-help">tempo de construção</span></div>
        <div class="difficulty-grid">${Object.entries(DIFFICULTIES).map(([key, d]) => `<button class="difficulty ${state.difficulty === key ? 'selected' : ''}" data-action="difficulty" data-value="${key}" aria-pressed="${state.difficulty === key}"><span class="difficulty-check">${state.difficulty === key ? '✓' : '+'}</span><span class="difficulty-tag">${d.tag}</span><span class="difficulty-time">${d.minutes}<small> MIN</small></span><span class="difficulty-name">${d.label}</span></button>`).join('')}</div>
      </div>
      <div class="form-block last-form"><div class="field-heading"><span class="field-count">03</span><h3>Tipo de desafio</h3><span class="field-help">o que pode cair?</span></div>
        <div class="segmented" role="group" aria-label="Tipo de desafio"><button data-action="category" data-value="all" class="${state.category === 'all' ? 'selected' : ''}">Tudo misturado</button><button data-action="category" data-value="clone" class="${state.category === 'clone' ? 'selected' : ''}">Recriar apps</button><button data-action="category" data-value="original" class="${state.category === 'original' ? 'selected' : ''}">Criar do zero</button></div>
      </div>
      <div class="panel-bottom"><div class="panel-bottom-copy"><span class="indicator-live"></span> ${CHALLENGES.length} DESAFIOS NO BARALHO</div><button class="btn btn-primary btn-large" data-action="go-draw">IR PARA ROLETA ${icon('arrow')}</button></div>
    </div><aside class="setup-aside"><div class="aside-mascot"><span class="aside-label">YOUR CODING BUDDY</span>${mascot('#E4B476', 'Mascote do jogo') }<div class="aside-terminal">&gt; no bugs, just vibes<span class="cursor-blink">_</span></div></div>
      <div class="aside-card"><span class="aside-kicker">✳ COMO FUNCIONA</span><div class="how-row"><span>01</span><div><b>Sorteie um desafio</b><small>App ou ideia + paleta + regra surpresa.</small></div></div><div class="how-row"><span>02</span><div><b>Corra contra o tempo</b><small>${mode.minutes} minutos para ambos criarem sua versão.</small></div></div><div class="how-row"><span>03</span><div><b>Avaliem juntos</b><small>Checklist individual, pontos e vencedor.</small></div></div></div>
      <div class="side-footnote">✳ BUILD FAST. THINK FASTER.</div></aside></section>`;
  }
  function wheelSVG() {
    const ids = state.wheelItems;
    let parts = '';
    ids.forEach((id, index) => {
      const item = CHALLENGES[id];
      const start = (-90 + index * 45) * Math.PI / 180;
      const end = (-90 + (index + 1) * 45) * Math.PI / 180;
      const x1 = 180 + 166 * Math.cos(start), y1 = 180 + 166 * Math.sin(start);
      const x2 = 180 + 166 * Math.cos(end), y2 = 180 + 166 * Math.sin(end);
      const centerAngle = (-90 + (index + .5) * 45) * Math.PI / 180;
      const cx = 180 + 111 * Math.cos(centerAngle), cy = 180 + 111 * Math.sin(centerAngle);
      const bright = index % 3 === 0;
      const fill = bright ? '#F08D68' : index % 2 === 0 ? '#39332F' : '#292624';
      const textFill = bright ? '#211A17' : '#F8ECDD';
      const name = item.name.length > 13 ? item.name.slice(0, 12) + '…' : item.name;
      parts += `<path d="M 180 180 L ${x1.toFixed(2)} ${y1.toFixed(2)} A 166 166 0 0 1 ${x2.toFixed(2)} ${y2.toFixed(2)} Z" fill="${fill}" stroke="#171615" stroke-width="2" />`;
      parts += `<text x="${cx.toFixed(2)}" y="${cy.toFixed(2)}" fill="${textFill}" font-family="'Space Mono',monospace" font-size="${name.length > 10 ? 10 : 12}" font-weight="700" text-anchor="middle" dominant-baseline="central">${safely(name)}</text>`;
    });
    return `<svg viewBox="0 0 360 360" role="img" aria-label="Roleta de aplicativos e ideias"><circle cx="180" cy="180" r="176" fill="#171615" stroke="#6E5040" stroke-width="6"/>${parts}<circle cx="180" cy="180" r="42" fill="#181716" stroke="#F08D68" stroke-width="5"/><text x="180" y="187" fill="#F08D68" font-family="'Space Mono',monospace" font-size="22" font-weight="700" text-anchor="middle">VR✳</text><circle cx="180" cy="180" r="172" fill="none" stroke="#F3B08D" stroke-width="2"/></svg>`;
  }
  function paletteSwatches(palette) {
    return `<span class="swatches">${palette.colors.map(color => `<i style="background:${color}" title="${color}"></i>`).join('')}</span>`;
  }
  function draw() {
    const target = challenge();
    const d = DIFFICULTIES[state.difficulty];
    return `<section class="main-section wrap draw-layout"><div class="panel wheel-panel">${panelHead('02 — SORTEIO', 'A roleta decide.', 'Um mesmo desafio para os dois. Sem desculpas.')}
      <div class="wheel-holder"><div class="wheel-spark spark-1">✳</div><div class="wheel-spark spark-2">+</div><div class="wheel-spark spark-3">✳</div>
        <div class="wheel-frame"><div class="wheel-pointer"></div><div class="wheel-rotor" id="wheel-rotor" style="transform:rotate(${state.wheelAngle}deg)">${wheelSVG()}</div></div></div>
      <div class="wheel-foot"><span>✳ ${state.category === 'all' ? 'MODO SURPRESA' : state.category === 'clone' ? 'RECRIAR APLICATIVOS' : 'IDEIAS ORIGINAIS'}</span><span>${state.wheelItems.length} OPÇÕES NA ROLETA</span></div>
      <div class="wheel-buttons"><button class="btn btn-primary btn-large" data-action="spin" ${state.spinning ? 'disabled' : ''}>${icon('shuffle')} ${state.spinning ? 'SORTEANDO...' : state.drawn ? 'GIRAR NOVAMENTE' : 'GIRAR ROLETA'}</button><button class="btn btn-ghost" data-action="new-wheel" ${state.spinning ? 'disabled' : ''} title="Trocar as opções da roleta">${icon('refresh', 18)}</button></div></div>
      <aside class="draw-aside"><div class="panel challenge-preview ${target ? 'revealed' : ''}"><div class="preview-top"><span class="panel-kicker">// MISSÃO DA RODADA</span><span class="preview-status">${target ? '● SORTEADO' : '○ AGUARDANDO'}</span></div>
        ${target ? `<div class="challenge-type"><span>${kindText(target.kind)}</span><span>${safely(target.area)}</span></div><h2 class="challenge-name">${safely(target.name)}</h2><p class="challenge-brief">${safely(target.brief)}</p>` : `<div class="mystery-icon">?</div><h2 class="challenge-name mystery">O que vai cair?</h2><p class="challenge-brief">Gire a roleta para descobrir qual aplicativo ou sistema vocês vão construir.</p>`}
        <div class="rule-card-list"><div class="rule-card"><div class="rule-icon">${icon('layers', 18)}</div><div><span>PALETA OBRIGATÓRIA</span><b>${state.palette ? safely(state.palette.name) : 'Surpresa'}</b>${state.palette ? paletteSwatches(state.palette) : ''}</div></div>
        <div class="rule-card"><div class="rule-icon">${icon('bolt', 18)}</div><div><span>REGRA SURPRESA</span><b>${state.twist ? safely(state.twist.name) : 'Surpresa'}</b>${state.twist ? `<small>${safely(state.twist.detail)}</small>` : ''}</div></div></div>
      </div><div class="panel mission-footer"><span>${icon('clock', 16)} ${d.minutes} MINUTOS</span><span>${d.features} FUNÇÕES PRINCIPAIS</span><button class="btn btn-primary" data-action="start-battle" ${!target || state.spinning ? 'disabled' : ''}>${icon('play', 18)} INICIAR PARTIDA</button></div>
      <div class="note-line">Ao iniciar, o cronômetro começa imediatamente para os dois jogadores.</div></aside></section>`;
  }
  function liveTimer() { return state.timer.running ? Math.max(0, Math.ceil((state.timer.endAt - Date.now()) / 1000)) : Math.max(0, state.timer.remaining); }
  function battle() {
    const target = challenge();
    const d = DIFFICULTIES[state.difficulty];
    const remaining = liveTimer();
    const fraction = remaining / state.timer.duration;
    return `<section class="main-section wrap battle-layout"><div class="panel timer-panel"><div class="timer-topline"><span class="panel-kicker">// 03 — A BATALHA</span><span class="live-pill"><i></i>${state.timer.running ? 'EM ANDAMENTO' : 'PAUSADO'}</span></div>
      <div class="battle-players"><div>${playerAvatar(0)}<span>${safely(asName(state.players[0], 'Jogador 1'))}</span></div><span class="versus">VS</span><div>${playerAvatar(1)}<span>${safely(asName(state.players[1], 'Jogador 2'))}</span></div></div>
      <div class="timer-circle ${remaining <= 60 ? 'urgent' : remaining <= 300 ? 'warning' : ''}"><svg class="timer-ring" viewBox="0 0 320 320"><circle cx="160" cy="160" r="144" fill="none" stroke="#33302C" stroke-width="7"/><circle class="timer-progress" cx="160" cy="160" r="144" fill="none" stroke="#F08D68" stroke-width="7" stroke-linecap="square" transform="rotate(-90 160 160)" stroke-dasharray="904.78" stroke-dashoffset="${(904.78 * (1 - fraction)).toFixed(2)}" /></svg><div class="timer-inner"><span>TIME LEFT</span><strong id="timer-digits">${timeText(remaining)}</strong><small>${state.timer.running ? 'KEEP BUILDING_' : 'PAUSE MODE_'}</small></div></div>
      <div class="timer-track"><div id="timer-track-fill" style="width:${Math.max(0, fraction * 100)}%"></div></div>
      <div class="timer-controls"><button class="btn btn-primary" data-action="toggle-timer">${icon(state.timer.running ? 'pause' : 'play')} ${state.timer.running ? 'PAUSAR' : 'RETOMAR'}</button><button class="btn btn-ghost" data-action="request-end">${icon('stop')} ENCERRAR AGORA</button></div>
      <p class="timer-tip">Dica: pressione <kbd>ESPAÇO</kbd> para pausar ou retomar.</p></div>
      <aside class="battle-aside"><div class="panel brief-panel"><span class="panel-kicker">// SEU BRIEFING</span><div class="challenge-type"><span>${kindText(target.kind)}</span><span>${safely(target.area)}</span></div><h2>${safely(target.name)}</h2><p>${safely(target.brief)}</p><div class="brief-divider"></div><h3>CHECKLIST DA MISSÃO <span>${requirements().length} ITENS</span></h3><div class="brief-items">${requirements().map((r, i) => `<div class="brief-item"><span class="brief-empty">${String(i + 1).padStart(2, '0')}</span><span>${safely(r.label)}</span><b>+${r.points}</b></div>`).join('')}</div></div>
      <div class="battle-side-row"><div><small>PALETA</small>${paletteSwatches(state.palette)}<b>${safely(state.palette.name)}</b></div><button class="btn btn-outline" data-action="copy-brief">${icon('copy', 15)} COPIAR BRIEF</button></div>
      <div class="fair-play">✳ Mesma missão. Mesmo tempo. Construam em seus próprios editores.</div></aside></section>`;
  }
  function timeup() {
    return `<section class="main-section wrap"><div class="panel timeup-panel"><div class="timeup-noise">+ &nbsp; ✳ &nbsp; + &nbsp; ✳ &nbsp; +</div><div class="timeup-clock">${icon('clock', 72)}</div><div class="panel-kicker">// 00:00 — FIM DA RODADA</div><h2>TIME'S <span>UP!</span></h2><p>O tempo acabou! Mãos fora do teclado.<br/>Agora confiram juntos cada requisito e contem os pontos.</p><div class="timeup-players">${state.players.map((name, i) => `<div>${playerAvatar(i)} ${safely(asName(name, 'Jogador ' + (i + 1)))}</div>`).join('<span>VS</span>')}</div><button class="btn btn-primary btn-large" data-action="go-judge">ABRIR CHECKLIST ${icon('arrow')}</button></div></section>`;
  }
  function judgePlayer(player) {
    const name = asName(state.players[player], 'Jogador ' + (player + 1));
    const items = requirements();
    const points = score(player);
    return `<div class="panel judge-player"><div class="judge-player-top">${playerAvatar(player)}<div><span>PLAYER 0${player + 1}</span><h3>${safely(name)}</h3></div><div class="judge-score"><strong>${points}</strong><span>/ ${totalPossible()} PTS</span></div></div>
      <div class="judge-progress"><div style="width:${items.length ? 100 * completed(player) / items.length : 0}%"></div></div><div class="judge-counter">${completed(player)} DE ${items.length} REQUISITOS CONCLUÍDOS</div>
      <div class="judge-checklist">${items.map(req => { const checked = !!state.checks[player]?.[req.id]; return `<label class="check-row ${checked ? 'is-checked' : ''}"><input type="checkbox" data-check-player="${player}" data-check-id="${req.id}" ${checked ? 'checked' : ''}/><span class="check-square">${checked ? icon('check', 16) : ''}</span><span class="check-copy"><b>${safely(req.label)}</b>${req.detail ? `<small>${safely(req.detail)}</small>` : ''}</span><span class="check-points">+${req.points}</span></label>`; }).join('')}</div></div>`;
  }
  function judge() {
    return `<section class="main-section wrap"><div class="judge-heading"><div><div class="panel-kicker">// 04 — AUDITORIA DO CÓDIGO</div><h2>Hora da <span>verdade.</span></h2><p>Olhem os aplicativos lado a lado. Marquem apenas o que realmente funciona.</p></div><div class="judge-badge">${icon('target', 18)} ${totalPossible()} PONTOS POSSÍVEIS</div></div>
      <div class="judge-grid">${judgePlayer(0)}${judgePlayer(1)}</div>
      <div class="judge-footer"><div><span class="judge-mini-score">${safely(asName(state.players[0], 'Jogador 1'))} <b>${score(0)}</b></span><span class="judge-mini-vs">VS</span><span class="judge-mini-score">${safely(asName(state.players[1], 'Jogador 2'))} <b>${score(1)}</b></span></div><button class="btn btn-primary btn-large" data-action="reveal-winner">REVELAR VENCEDOR ${icon('trophy', 20)}</button></div></section>`;
  }
  function result() {
    const w = winnerIndex();
    const tied = w === -1;
    const champion = tied ? 'EMPATE TÉCNICO' : safely(asName(state.players[w], 'Jogador ' + (w + 1)));
    const target = challenge();
    return `<section class="main-section wrap"><div class="panel result-panel"><div class="confetti-field" aria-hidden="true">${Array.from({length: 32}, (_, i) => `<i style="--i:${i};--x:${(i * 37) % 100}%;--delay:${(i * 13) % 23 / 10}s"></i>`).join('')}</div><div class="result-trophy">${icon('trophy', 50)}</div><div class="panel-kicker">// RODADA FINALIZADA</div><h2>${tied ? 'DEU ' : 'GG, '}<span>${tied ? 'EMPATE!' : 'CAMPEÃO!'}</span></h2><div class="champion">${tied ? 'Os dois mandaram bem.' : champion + ' venceu a batalha.'}</div><p class="result-description">${safely(target.name)} · ${DIFFICULTIES[state.difficulty].label} · ${DIFFICULTIES[state.difficulty].minutes} minutos</p>
      <div class="result-scores">${state.players.map((name, index) => `<div class="result-score-card ${w === index ? 'winner' : ''}">${playerAvatar(index)}<span>${safely(asName(name, 'Jogador ' + (index + 1)))}</span><strong>${score(index)}<small> PTS</small></strong><em>${completed(index)} / ${requirements().length} CHECKS ${w === index ? '✳ VENCEDOR' : ''}</em></div>`).join('<div class="result-vs">VS</div>')}</div>
      <div class="result-actions"><button class="btn btn-primary btn-large" data-action="new-game">${icon('refresh')} JOGAR DE NOVO</button><button class="btn btn-outline" data-action="share">${icon('copy')} COPIAR RESULTADO</button></div></div></section>`;
  }
  function historySection() {
    const most = history.slice(0, 6);
    const totals = {};
    history.forEach(round => {
      round.players.forEach((name, index) => {
        const key = name.trim().toLocaleLowerCase('pt-BR');
        if (!totals[key]) totals[key] = { name, points: 0, wins: 0, games: 0 };
        totals[key].points += Number(round.scores[index]) || 0;
        totals[key].games++;
        if (round.winner === index) totals[key].wins++;
      });
    });
    const standings = Object.values(totals).sort((a, b) => b.wins - a.wins || b.points - a.points).slice(0, 4);
    return `<section id="ranking" class="history-section wrap"><div class="section-line"><div><span class="panel-kicker">// ARCHIVE.EXE</span><h2>Hall of <span>vibes.</span></h2></div><span class="section-line-end">${String(history.length).padStart(2, '0')} PARTIDAS SALVAS</span></div>
      <div class="history-grid"><div class="panel history-panel"><div class="history-title">PARTIDAS RECENTES <span>↗</span></div>${most.length ? most.map((round, index) => `<div class="history-row"><span class="history-rank">${String(index + 1).padStart(2, '0')}</span><div class="history-details"><b>${safely(round.challenge)}</b><small>${safely(round.players[0])} × ${safely(round.players[1])} · ${safely(round.difficulty)}</small></div><span class="history-points">${round.scores[0]} : ${round.scores[1]}</span></div>`).join('') : '<div class="history-empty">Sem partidas ainda. Sua primeira vitória começa aqui. ✳</div>'}</div>
      <div class="panel leaderboard"><div class="history-title">PLACAR ACUMULADO <span>✳</span></div>${standings.length ? standings.map((player, index) => `<div class="leader-row"><span class="leader-position">${String(index + 1).padStart(2, '0')}</span><span class="leader-name">${safely(player.name)}</span><span class="leader-wins">${player.wins} ${player.wins === 1 ? 'VITÓRIA' : 'VITÓRIAS'}</span><b>${player.points} PTS</b></div>`).join('') : '<div class="history-empty">Os vencedores vão aparecer aqui.</div>'}<div class="leaderboard-caption">O placar fica salvo neste navegador.</div></div></div></section>`;
  }
  function footer() {
    return `<footer class="footer wrap"><div class="footer-logo">✳ VIBE<span>RUSH</span>_</div><p>BUILD SOMETHING COOL. REPEAT.</p><a href="https://github.com/maxeaseoficial-prog/Vibe-Rush" target="_blank" rel="noopener noreferrer">GITHUB ${icon('external', 14)}</a></footer>`;
  }
  function confirmation() {
    if (!state.confirmEnd) return '';
    return `<div class="modal-backdrop" role="presentation"><div class="modal" role="dialog" aria-modal="true" aria-labelledby="confirm-heading"><div class="modal-icon">${icon('flag', 24)}</div><h2 id="confirm-heading">Encerrar a batalha?</h2><p>O cronômetro será interrompido e vocês irão direto para a avaliação. Não dá para voltar a programar nesta rodada.</p><div class="modal-buttons"><button class="btn btn-ghost" data-action="cancel-end">CONTINUAR</button><button class="btn btn-primary" data-action="confirm-end">ENCERRAR E AVALIAR</button></div></div></div>`;
  }
  function render() {
    clearInterval(tickInterval);
    if (state.phase === 'draw' && !state.wheelItems?.length) freshWheel();
    document.title = state.phase === 'timeup' ? 'Tempo esgotado! — Vibe Rush' : 'Vibe Rush — Code. Compete. Repeat.';
    const page = state.phase === 'setup' ? setup() : state.phase === 'draw' ? draw() : state.phase === 'battle' ? battle() : state.phase === 'timeup' ? timeup() : state.phase === 'judge' ? judge() : result();
    app.innerHTML = `${header()}${hero()}${progressBar()}${page}${historySection()}${footer()}${confirmation()}`;
    if (state.phase === 'battle' && state.timer.running) {
      tickInterval = setInterval(tick, 180);
      tick();
    }
  }
  function tick() {
    if (state.phase !== 'battle' || !state.timer.running) return;
    const remaining = liveTimer();
    if (remaining <= 0) { finishTimer(); return; }
    const digits = $('#timer-digits');
    if (digits) digits.textContent = timeText(remaining);
    const circle = $('.timer-progress');
    if (circle) circle.style.strokeDashoffset = (904.78 * (1 - remaining / state.timer.duration)).toFixed(2);
    const bar = $('#timer-track-fill');
    if (bar) bar.style.width = Math.max(0, remaining / state.timer.duration * 100) + '%';
    const timerCircle = $('.timer-circle');
    if (timerCircle) {
      timerCircle.classList.toggle('urgent', remaining <= 60);
      timerCircle.classList.toggle('warning', remaining <= 300 && remaining > 60);
    }
  }
  function finishTimer() {
    state.timer.remaining = 0;
    state.timer.running = false;
    state.timer.endAt = 0;
    state.phase = 'timeup';
    state.endReason = 'timeout';
    saveAndRender(true);
    playSound('timeup');
  }
  function spin() {
    if (state.spinning || state.phase !== 'draw') return;
    if (state.wheelItems.length !== 8) freshWheel();
    state.spinning = true;
    state.drawn = false;
    const picked = Math.floor(Math.random() * 8);
    const winningId = state.wheelItems[picked];
    const offset = (360 - ((picked + .5) * 45)) % 360;
    const startTurn = Math.ceil(state.wheelAngle / 360) * 360;
    const endAngle = startTurn + 360 * 6 + offset;
    playSound('spin');
    const rotor = $('#wheel-rotor');
    const spinButton = $('[data-action="spin"]');
    const refreshButton = $('[data-action="new-wheel"]');
    if (spinButton) { spinButton.disabled = true; spinButton.textContent = 'SORTEANDO...'; }
    if (refreshButton) refreshButton.disabled = true;
    if (rotor) {
      rotor.classList.add('is-spinning');
      requestAnimationFrame(() => { rotor.style.transform = 'rotate(' + endAngle + 'deg)'; });
    }
    spinTimeout = setTimeout(() => {
      state.challenge = winningId;
      state.palette = choice(PALETTES);
      state.twist = choice(TWISTS);
      state.wheelAngle = endAngle;
      state.drawn = true;
      state.spinning = false;
      playSound('win');
      saveAndRender();
    }, 4350);
  }
  function startBattle() {
    if (!state.drawn || !challenge() || state.spinning) return;
    const duration = DIFFICULTIES[state.difficulty].minutes * 60;
    state.timer = { duration, remaining: duration, running: true, endAt: Date.now() + duration * 1000 };
    state.checks = [{}, {}];
    state.endReason = 'manual';
    state.resultSaved = false;
    state.confirmEnd = false;
    state.phase = 'battle';
    playSound('spin');
    saveAndRender(true);
  }
  function toggleTimer() {
    if (state.phase !== 'battle') return;
    if (state.timer.running) {
      state.timer.remaining = liveTimer();
      state.timer.running = false;
      state.timer.endAt = 0;
    } else {
      if (state.timer.remaining <= 0) return finishTimer();
      state.timer.running = true;
      state.timer.endAt = Date.now() + state.timer.remaining * 1000;
    }
    playSound();
    saveAndRender();
  }
  function newGame() {
    clearTimeout(spinTimeout);
    state.phase = 'setup';
    state.wheelItems = [];
    state.challenge = null;
    state.palette = null;
    state.twist = null;
    state.drawn = false;
    state.spinning = false;
    state.wheelAngle = 0;
    state.timer = { ...initial.timer };
    state.checks = [{}, {}];
    state.confirmEnd = false;
    state.resultSaved = false;
    saveAndRender(true);
  }
  function revealWinner() {
    if (state.phase !== 'judge') return;
    state.phase = 'results';
    if (!state.resultSaved) {
      const w = winnerIndex();
      history.unshift({ id: Date.now(), at: new Date().toISOString(), challenge: challenge().name, kind: challenge().kind, difficulty: DIFFICULTIES[state.difficulty].label, players: state.players.map((name, i) => asName(name, 'Jogador ' + (i + 1))), scores: [score(0), score(1)], winner: w });
      history = history.slice(0, 50);
      state.resultSaved = true;
    }
    playSound('win');
    saveAndRender(true);
  }
  function briefingText() {
    const c = challenge();
    if (!c) return '';
    return 'VIBE RUSH — MISSÃO\n' + kindText(c.kind) + ': ' + c.name + '\n' + c.brief + '\nTempo: ' + DIFFICULTIES[state.difficulty].minutes + ' minutos\nPaleta: ' + state.palette.name + ' (' + state.palette.colors.join(', ') + ')\n\nREQUISITOS:\n' + requirements().map((req, i) => (i + 1) + '. ' + req.label + (req.detail ? ' — ' + req.detail : '')).join('\n');
  }
  async function copyText(textValue) {
    try {
      await navigator.clipboard.writeText(textValue);
      toast('Copiado para a área de transferência!');
    } catch (_) {
      const textarea = document.createElement('textarea');
      textarea.value = textValue;
      textarea.style.position = 'fixed'; textarea.style.opacity = '0';
      document.body.appendChild(textarea);
      textarea.select();
      const success = document.execCommand('copy');
      textarea.remove();
      toast(success ? 'Copiado!' : 'Não foi possível copiar neste navegador.');
    }
  }

  app.addEventListener('input', event => {
    if (event.target.matches('[data-player]')) {
      state.players[Number(event.target.dataset.player)] = event.target.value.slice(0, 22);
      persist();
    }
  });
  app.addEventListener('change', event => {
    if (event.target.matches('[data-check-player]')) {
      const player = Number(event.target.dataset.checkPlayer);
      const id = event.target.dataset.checkId;
      if (!requirements().some(requirement => requirement.id === id)) return;
      state.checks[player][id] = event.target.checked;
      playSound('tap');
      saveAndRender();
    }
  });
  app.addEventListener('click', event => {
    const actionButton = event.target.closest('[data-action]');
    if (!actionButton || actionButton.disabled) return;
    const action = actionButton.dataset.action;
    const value = actionButton.dataset.value;
    switch (action) {
      case 'difficulty': if (DIFFICULTIES[value]) { state.difficulty = value; playSound(); saveAndRender(); } break;
      case 'category': if (['all', 'clone', 'original'].includes(value)) { state.category = value; playSound(); saveAndRender(); } break;
      case 'go-draw':
        state.players = state.players.map((name, i) => asName(name, 'Jogador ' + (i + 1)));
        freshWheel(); state.phase = 'draw'; playSound('spin'); saveAndRender(true); break;
      case 'new-wheel': if (!state.spinning) { freshWheel(); playSound(); saveAndRender(); } break;
      case 'spin': spin(); break;
      case 'start-battle': startBattle(); break;
      case 'toggle-timer': toggleTimer(); break;
      case 'request-end': state.confirmEnd = true; saveAndRender(); break;
      case 'cancel-end': state.confirmEnd = false; saveAndRender(); break;
      case 'confirm-end':
        state.timer.remaining = liveTimer(); state.timer.running = false; state.timer.endAt = 0;
        state.confirmEnd = false; state.endReason = 'manual'; state.phase = 'judge';
        saveAndRender(true); break;
      case 'go-judge': state.phase = 'judge'; saveAndRender(true); break;
      case 'reveal-winner': revealWinner(); break;
      case 'new-game': newGame(); break;
      case 'sound': state.sound = !state.sound; if (state.sound) playSound(); saveAndRender(); break;
      case 'copy-brief': copyText(briefingText()); break;
      case 'share': copyText('VIBE RUSH — RESULTADO\n' + challenge().name + '\n' + state.players[0] + ': ' + score(0) + ' pontos\n' + state.players[1] + ': ' + score(1) + ' pontos\n' + (winnerIndex() < 0 ? 'EMPATE!' : 'Venceu: ' + state.players[winnerIndex()])); break;
      case 'history': $('#ranking')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
      case 'home': if (state.phase === 'setup') window.scrollTo({ top: 0, behavior: 'smooth' }); else if (state.phase === 'results') newGame(); else $('#app')?.scrollIntoView({ behavior: 'smooth', block: 'start' }); break;
    }
  });
  document.addEventListener('keydown', event => {
    if (event.code === 'Space' && state.phase === 'battle' && !state.confirmEnd && !['INPUT', 'TEXTAREA', 'BUTTON'].includes(document.activeElement?.tagName)) {
      event.preventDefault();
      toggleTimer();
    }
    if (event.key === 'Escape' && state.confirmEnd) { state.confirmEnd = false; saveAndRender(); }
  });
  document.addEventListener('visibilitychange', () => {
    if (!document.hidden && state.phase === 'battle' && state.timer.running) tick();
  });
  window.addEventListener('pageshow', () => { if (state.phase === 'battle' && state.timer.running) tick(); });
  if (state.phase === 'battle' && state.timer.running && liveTimer() <= 0) finishTimer();
  else { render(); persist(); }
})();