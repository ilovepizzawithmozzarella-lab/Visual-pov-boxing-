const IMG = (n) => `images/${String(n).padStart(2, '0')}.jpg`;

const game = {
  started: false,
  index: 0,
  victoria: 0, // -1 reserved/cold, 0 neutral, 1 playful, 2 very teasing
  playerTone: 'confident',
  current: null,
  typing: false,
  timer: null
};

const $ = (id) => document.getElementById(id);
const bg = $('background');
const chapter = $('chapter');
const hud = $('hud');
const roundLabel = $('roundLabel');
const sceneLabel = $('sceneLabel');
const speaker = $('speaker');
const text = $('text');
const choices = $('choices');
const continueBtn = $('continue');
const startBtn = $('startButton');
const restartBtn = $('restartButton');

function setImage(n) {
  bg.classList.add('fade');
  window.setTimeout(() => {
    bg.style.backgroundImage = `url("${IMG(n)}")`;
    bg.classList.remove('fade');
  }, 180);
}

function showHUD(round, scene) {
  hud.classList.remove('hidden');
  roundLabel.textContent = round;
  sceneLabel.textContent = scene;
}

function typeText(value, mode = 'normal') {
  clearInterval(game.timer);
  game.typing = true;
  text.className = `text ${mode}`;
  text.textContent = '';
  continueBtn.classList.add('hidden');
  let i = 0;
  const speed = mode === 'thought' ? 13 : 10;
  game.timer = setInterval(() => {
    text.textContent += value[i++];
    if (i >= value.length) {
      clearInterval(game.timer);
      game.typing = false;
      if (game.current?.choices) renderChoices(game.current.choices);
      else continueBtn.classList.remove('hidden');
    }
  }, speed);
}

function renderChoices(items) {
  choices.innerHTML = '';
  if (!items || items.length === 0) {
    continueBtn.classList.remove('hidden');
    return;
  }
  items.forEach((item, i) => {
    const button = document.createElement('button');
    button.className = 'choice';
    button.type = 'button';
    button.innerHTML = `<span class="letter">${String.fromCharCode(65 + i)}</span>${item.label}`;
    button.addEventListener('click', () => {
      choices.innerHTML = '';
      continueBtn.classList.add('hidden');
      item.effect?.();
      game.index = item.next;
      render();
    });
    choices.appendChild(button);
  });
}

function line(s, t, opts = {}) {
  return { speaker: s, text: t, image: opts.image, mode: opts.mode || 'normal', choices: opts.choices, round: opts.round, scene: opts.scene };
}

const script = [
  // 0-8: prologue / Victoria introduction
  line('NARRATORE', 'Victoria Hale aveva costruito la propria carriera davanti agli obiettivi. Moda, campagne pubblicitarie, servizi fotografici, social: era abituata a essere osservata e, soprattutto, a sapere esattamente come attirare l\'attenzione.', { image: 1, scene: 'INTRODUZIONE' }),
  line('NARRATORE', 'Sul ring, però, non avrebbe avuto nessun fotografo a suggerirle la posa migliore. Avrebbe avuto guantoni, un avversario vero e un pubblico pronto a giudicare ogni suo movimento.'),
  line('NARRATORE', 'Victoria non era una pugile. Non aveva una lunga carriera agonistica alle spalle e non aveva passato anni a costruire una tecnica professionistica. La boxe era arrivata nella sua vita quasi per caso, durante una collaborazione legata allo sport.'),
  line('NARRATORE', 'All\'inizio doveva essere soltanto un modo diverso per allenarsi e mantenersi in forma. Poi, quasi senza accorgersene, aveva cominciato ad appassionarsi alla sensazione dei guantoni, al rumore del sacco e alla soddisfazione di vedere migliorare i propri movimenti.'),
  line('VICTORIA', '«Non sono diventata una pugile professionista in segreto, tranquilli.»\n
Sorrideva con quell\'aria disinvolta che le veniva naturale. «Sono ancora una principiante. Ma essere una principiante non significa che debba tirarmi indietro ogni volta che qualcuno mi dice che non sono all\'altezza.»'),
  line('NARRATORE', 'Fu proprio quella sicurezza a trasformare una semplice curiosità in qualcosa di molto più grande. I suoi video di allenamento cominciarono a circolare online. E, tra i commenti e le discussioni, arrivarono anche le critiche.'),
  line('NARRATORE', 'Tra le voci più insistenti c\'era quella di un pugile professionista e influencer sportivo. Un uomo abituato a parlare di tecnica, preparazione e disciplina davanti a migliaia di persone. Un uomo che non aveva nascosto il proprio scetticismo nei confronti di Victoria.'),
  line('NARRATORE', 'Le sue critiche erano diventate pubbliche. Victoria, invece di lasciarle scivolare via, aveva risposto con un sorriso e una proposta molto semplice: «Se pensi davvero che io non possa stare sul ring, vieni a dimostrarmelo.»'),
  line('VICTORIA', '«E così eccoci qui.»\n
Il suo sorriso non era quello di una ragazza intimorita. Era il sorriso di qualcuno che aveva deciso di vedere fino a dove poteva spingersi.'),

  // 9-18: arrival / faceoff
  line('NARRATORE', 'La sera dell\'incontro, l\'arena era molto più rumorosa di quanto avessi immaginato. Luci, musica, telecamere e centinaia di occhi puntati verso il ring. Eppure, mentre aspettavo il mio ingresso, avevo una sola cosa in mente: questa doveva essere una dimostrazione.'),
  line('IO', '«Una modella contro un professionista. Almeno nessuno potrà dire che non le avevo dato la possibilità di provarci.»'),
  line('PENSIERO', 'Avevo pronunciato quelle parole così tante volte davanti alle telecamere che ormai mi sembravano quasi naturali. Ma dal vivo la situazione aveva un peso diverso.', { mode: 'thought' }),
  line('NARRATORE', 'Victoria era già sul ring. La vidi voltarsi verso il mio angolo quando il mio nome venne annunciato. Non sembrava nervosa. Anzi, inclinò appena la testa e mi regalò un sorriso che sembrava quasi una provocazione.'),
  line('VICTORIA', '«Finalmente. Cominciavo a pensare che avessi cambiato idea.»'),
  line('IO', '', { choices: [
    { label: '«Io non mi tiro mai indietro. Spero che tu sia pronta.»', effect: () => { game.playerTone = 'confident'; game.victoria = 0; }, next: 19 },
    { label: '«Preoccupata? Posso sempre chiedere all\'arbitro di darti un minuto in più.»', effect: () => { game.playerTone = 'provoking'; game.victoria = 1; }, next: 19 },
    { label: '«No. E devo ammettere che sono curioso di vedere cosa hai imparato.»', effect: () => { game.playerTone = 'respectful'; game.victoria = 2; }, next: 19 }
  ]}),
  line('VICTORIA', '«Oh, sono pronta.»\n
Fa un piccolo passo verso di me. «La domanda è: tu sei pronto a scoprire che una principiante può essere un po\' più fastidiosa del previsto?»'),
  line('PENSIERO', 'Fastidiosa. Ecco come l\'aveva definita. Non forte. Non pericolosa. Fastidiosa. Sorrisi appena, ma dentro di me quella parola mi diede più fastidio del necessario.', { mode: 'thought' }),
  line('IO', '«Vedremo.»'),
  line('ARBITRO', '«Avvicinatevi. Guantoni al centro.»'),
  line('NARRATORE', 'Ci avviciniamo. Victoria alza il guantone e lo tiene davanti a sé, aspettando il gesto tradizionale prima dell\'inizio.'),
  line('VICTORIA', '«Facciamolo bene, allora.»', { image: 3, round: 'ROUND 1', scene: 'INIZIO ROUND' }),
  line('NARRATORE', 'I nostri guantoni si toccano. Un gesto semplice, quasi cordiale. Poi ci separiamo.'),

  // 19-26: fixed first round sequence
  line('PENSIERO', 'Il gong risuona. Per un istante vedo Victoria muoversi con cautela. Il suo atteggiamento è rilassato, ma la guardia è ancora quella di qualcuno che sta imparando. Finalmente il ring torna a sembrarmi familiare.', { image: 4, round: 'ROUND 1', scene: 'PRIMO ATTACCO' }),
  line('VICTORIA', '«Allora? Pensavo che un professionista avrebbe fatto il primo passo.»'),
  line('IO', '', { choices: [
    { label: '«Sto solo aspettando che tu commetta un errore.»', effect: () => { game.playerTone = 'confident'; game.victoria = Math.max(0, game.victoria); }, next: 27 },
    { label: '«Non voglio rovinarti subito la serata.»', effect: () => { game.playerTone = 'provoking'; game.victoria += 1; }, next: 27 },
    { label: '«Hai una buona guardia. Non male per una principiante.»', effect: () => { game.playerTone = 'respectful'; game.victoria += 1; }, next: 27 }
  ]}),
  line('VICTORIA', 'Il suo sorriso si allarga. «Ecco. Questa mi piace di più.»'),
  line('NARRATORE', 'Victoria avanza. Non è un movimento perfetto, ma è abbastanza rapido da costringermi a reagire. Il suo primo colpo parte senza grande preparazione tecnica, quasi come se stesse testando la mia distanza.'),
  line('PENSIERO', 'Lo vedo arrivare. Non è il tipo di colpo che dovrebbe preoccuparmi. Eppure, per una frazione di secondo, mi rendo conto che lei non sta semplicemente recitando la parte della pugile per le telecamere.', { mode: 'thought' }),
  line('NARRATORE', 'Il combattimento prosegue. Victoria prende coraggio dopo il primo scambio e inizia a muoversi con maggiore naturalezza. La sua inesperienza è evidente, ma la sua determinazione lo è ancora di più.', { image: 5, scene: 'SECONDO ATTACCO' }),
  line('VICTORIA', '«Non sei così facile da leggere come pensavo.»'),
  line('IO', '', { choices: [
    { label: '«Perché non hai ancora visto abbastanza.»', effect: () => { game.victoria = Math.max(0, game.victoria - 1); }, next: 28 },
    { label: '«Continua pure. Mi sto divertendo.»', effect: () => { game.victoria += 1; }, next: 28 },
    { label: '«E tu non sei così impreparata come pensavo.»', effect: () => { game.victoria += 2; }, next: 28 }
  ]}),
  line('PENSIERO', 'Il problema non era che Victoria stesse combattendo come una professionista. Non lo faceva. Il problema era che stava imparando qualcosa ad ogni scambio.', { mode: 'thought' }),
  line('NARRATORE', 'Poi arriva il terzo scambio. Victoria cambia improvvisamente ritmo. Il suo passo è più deciso, il suo sguardo più concentrato. Per la prima volta da quando è iniziato il round, smetto di pensare a lei come a una semplice esibizione.', { image: 6, scene: 'TERZO ATTACCO' }),
  line('VICTORIA', '«Ti avevo detto che sarei stata fastidiosa.»'),
  line('IO', '', { choices: [
    { label: '«E io ti avevo detto che avrei controllato il match.»', effect: () => { game.playerTone = 'confident'; }, next: 29 },
    { label: '«Devo ammetterlo: mi stai sorprendendo.»', effect: () => { game.playerTone = 'respectful'; game.victoria += 1; }, next: 29 },
    { label: '«Sorridi finché puoi.»', effect: () => { game.playerTone = 'provoking'; game.victoria += 1; }, next: 29 }
  ]}),
  line('PENSIERO', 'Il suo sguardo cambia. Non sembra più soltanto divertita. Adesso sembra curiosa di vedere quanto riuscirà a spingersi oltre.', { mode: 'thought' }),
  line('NARRATORE', 'Un movimento sbagliato. Un istante di esitazione. Il colpo arriva prima che riesca a rimettere completamente la guardia a posto.', { image: 7, scene: 'CADUTA' }),
  line('PENSIERO', 'Il mondo sembra fermarsi per un secondo. Poi sento il tappeto sotto di me. Sono a terra.', { mode: 'thought' }),
  line('VICTORIA', '«...Oh.»\n
Victoria rimane davanti a me. Il sorriso è ancora lì, ma nei suoi occhi compare qualcosa di diverso: sorpresa. Poi, lentamente, quella sorpresa lascia spazio a un sorriso più sicuro.'),
  line('VICTORIA', '«Credo che questo non fosse nel tuo programma.»'),
  line('IO', '', { choices: [
    { label: '«Goditela. È solo una caduta.»', effect: () => { game.victoria = Math.max(0, game.victoria - 1); }, next: 30 },
    { label: '«Non montarti la testa. Mi rialzo e ricomincio.»', effect: () => { game.playerTone = 'confident'; }, next: 30 },
    { label: '«Hai avuto fortuna.»', effect: () => { game.playerTone = 'provoking'; game.victoria += 1; }, next: 30 }
  ]}),
  line('PENSIERO', 'La parola che continua a rimbalzarmi nella testa è una sola: professionista. Sono io quello che dovrebbe sapere cosa fare. Sono io quello che ha sfidato lei davanti a tutti. E adesso sono io quello che sta guardando il soffitto.', { mode: 'thought' }),
  line('ARBITRO', '«Uno... due... tre...»'),
  line('NARRATORE', 'Appoggio una mano sul tappeto e mi rialzo. Le gambe rispondono. Il corpo c\'è. L\'orgoglio, invece, è un\'altra questione.', { image: 8, scene: 'RIALZATA' }),
  line('VICTORIA', '«Eccolo. Sapevo che ti saresti rialzato.»'),
  line('VICTORIA', 'Il suo sorriso torna a essere civettuolo. «Però devo dire che da questa angolazione sembri un po\' meno spaventoso.»'),
  line('IO', '', { choices: [
    { label: '«Continua a parlare. Ti farà male quando ricominceremo.»', effect: () => { game.playerTone = 'confident'; }, next: 31 },
    { label: '«Ti piace proprio provocarmi, vero?»', effect: () => { game.victoria += 2; }, next: 31 },
    { label: '«Non hai ancora vinto niente.»', effect: () => { game.playerTone = 'serious'; }, next: 31 }
  ]}),
  line('PENSIERO', 'La cosa peggiore è che non riesco a capire se il suo sorriso mi irriti di più perché sta provocando me... oppure perché, per la prima volta, non posso essere certo che stia bluffando.', { mode: 'thought' }),
  line('ARBITRO', '«Fine della ripresa! Ai vostri angoli!»'),
  line('NARRATORE', 'Il gong interrompe lo scambio. Torno verso il mio angolo senza distogliere gli occhi da Victoria. Lei fa lo stesso, ma prima di voltarsi mi dedica un ultimo sorriso.', { image: 9, round: 'ROUND 1', scene: 'PAUSA' }),
  line('VICTORIA', '«Bel primo round.»\n
Si asciuga il viso con l\'asciugamano e mi guarda di lato. «Adesso sono curiosa di sapere una cosa: sei ancora convinto che io non dovrei essere qui?»'),
  line('PENSIERO', 'Non rispondo subito. Il pubblico è ancora rumoroso. Il mio angolo è a pochi passi. Eppure, nella mia testa, c\'è una sola immagine che continua a ripetersi: Victoria davanti a me, sorridente, mentre io ero a terra.', { mode: 'thought' }),
  line('SISTEMA', 'FINE DELLA PARTE 1 — INTRODUZIONE + PRIMO ROUND\n
Il risultato fisico del round è prestabilito per questa demo. Le scelte effettuate hanno modificato il tono dei dialoghi e il comportamento di Victoria, non la sequenza delle scene.', { mode: 'system' })
];

function render() {
  const current = script[game.index];
  game.current = current;
  if (!current) return endGame();

  if (current.image) setImage(current.image);
  if (current.round || current.scene) showHUD(current.round || 'PROLOGO', current.scene || 'STORIA');
  chapter.textContent = current.round ? 'VISUAL POV BOXING · PARTE 1' : 'VISUAL POV BOXING';
  speaker.textContent = current.speaker || '';
  choices.innerHTML = '';
  continueBtn.classList.add('hidden');

  if (current.text === '' && current.choices) {
    text.textContent = '';
    text.className = 'text';
    renderChoices(current.choices);
    return;
  }

  typeText(current.text, current.mode);
}

continueBtn.addEventListener('click', () => {
  if (game.typing) {
    clearInterval(game.timer);
    game.typing = false;
    text.textContent = game.current.text;
    if (game.current.choices) renderChoices(game.current.choices);
    else continueBtn.classList.remove('hidden');
    return;
  }
  game.index += 1;
  render();
});

text.addEventListener('click', () => {
  if (game.typing) {
    clearInterval(game.timer);
    game.typing = false;
    text.textContent = game.current.text;
    if (game.current.choices) renderChoices(game.current.choices);
    else continueBtn.classList.remove('hidden');
  }
});

function startGame() {
  game.started = true;
  game.index = 0;
  startBtn.classList.add('hidden');
  restartBtn.classList.add('hidden');
  render();
}

function endGame() {
  speaker.textContent = 'PARTE 1 COMPLETATA';
  text.className = 'text system';
  text.textContent = 'La prima parte della demo è terminata. Inserisci le immagini nella cartella images/ per visualizzare tutte le scene.';
  choices.innerHTML = '';
  continueBtn.classList.add('hidden');
  restartBtn.classList.remove('hidden');
}

startBtn.addEventListener('click', startGame);
restartBtn.addEventListener('click', startGame);

// Schermata iniziale: l'immagine della prima scena viene caricata già all'avvio.
setImage(1);
