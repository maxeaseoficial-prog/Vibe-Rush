# Vibe Rush ✳

**Code. Compete. Repeat.** Um jogo competitivo de vibe coding para **2 jogadores**, inspirado visualmente no universo de interfaces de terminal e pixel art.

## Como jogar

1. **Prepare:** escolha os nomes dos dois jogadores e uma dificuldade: **Fácil (60 min)**, **Hard (30 min)** ou **Ultra Hard (15 min)**.
2. **Sorteie:** escolha entre *Tudo misturado*, *Recriar apps* e *Criar do zero*. Gire a roleta para sortear **um desafio em comum**, uma **paleta de 3 cores** e uma **regra surpresa**.
3. **Confira o briefing:** antes de iniciar o relógio, vejam todos os requisitos, pontos, regra surpresa e paleta de cores com códigos HEX clicáveis para copiar. É possível voltar à roleta sem perder tempo.
4. **Construa:** clique em **Iniciar batalha** para começar o cronômetro. Os dois competidores desenvolvem separadamente durante o mesmo prazo. Há controles de pausa e retomada, persistência local e alerta visual/sonoro no fim.
5. **Avalie:** comparem juntos os resultados e marquem cada requisito que foi cumprido **para cada jogador**.
6. **Vença:** o jogo soma os pontos, anuncia o vencedor (ou empate) e atualiza o histórico e o ranking acumulado.

## O que inclui

- **54 desafios:** recriações de aplicativos populares (WhatsApp, Spotify, YouTube, Instagram, Facebook, TikTok, Uber, iFood, Netflix, ChatGPT etc.) e sistemas originais (CRM, agenda, finanças, projetos, delivery e mais).
- **10 paletas** visuais e **16 regras surpresa**.
- Requisitos compatíveis com o tempo escolhido, com pontos de funcionalidades, paleta, regra surpresa, responsividade e qualidade.
- Roleta animada de 8 opções, com sorteio aleatório de novos conjuntos.
- Tela de briefing pré-partida: checklist com pontuação, regra especial, paleta HEX copiável e partida só iniciada com confirmação.
- Cronômetro de 60, 30 ou 15 minutos, pausa/retomada e tecla **Espaço** durante o jogo.
- Aviso de tempo esgotado e opção de encerrar antecipadamente.
- Avaliação manual por checkboxes individuais, placar, resultado, ranking e histórico.
- Copiar briefing e resultado, com design responsivo e personagem pixel art original.

## Executar localmente

Projeto **estático, sem dependências**, feito em HTML, CSS e JavaScript. Basta servir a pasta raiz:

```bash
python3 -m http.server 5173
```

Abra **http://localhost:5173**. Não é necessário instalar pacotes ou configurar banco de dados.

Também funciona na **Vercel** (framework: **Other**, diretório de saída: raiz, build: vazio) e no **GitHub Pages** (branch `main`, pasta `/root`).

## Armazenamento e regras

Dados e histórico ficam somente no `localStorage` deste navegador. O timer usa horário real de término para continuar contando mesmo com a aba em segundo plano ou após recarregar. Se o áudio estiver bloqueado, a tela de encerramento continua funcionando.

A pontuação **não inspeciona automaticamente o código do adversário**: os jogadores decidem juntos se cada item foi cumprido, conforme a proposta do jogo. O modo sorteado altera a quantidade de funcionalidades obrigatórias e os pontos de cada tarefa.

## Estrutura

- `index.html` — entrada do aplicativo.
- `styles.css` — tema de terminal, animações e responsividade.
- `briefing.css` — interface de instruções antes da partida e visualização dos códigos HEX.
- `app.js` — banco de desafios, roleta, cronômetro, avaliação e histórico.
- `favicon.svg` — ícone pixel art.

Design próprio inspirado na linguagem visual de terminais retro, sem dependência de serviços externos de IA ou de marcas dos aplicativos usados como desafios.
