const game = {
    index: 0,
    current: null,
    typing: false,
    timer: null,
    victoriaMood: 0
};

const $ = id => document.getElementById(id);

const bg = $('background');
const hud = $('hud');
const roundLabel = $('roundLabel');
const sceneLabel = $('sceneLabel');
const speaker = $('speaker');
const text = $('text');
const choices = $('choices');
const continueBtn = $('continue');
const startBtn = $('startButton');
const restartBtn = $('restartButton');

const images = {
    intro: 'Intro.PNG',
    face: 'Faccia a faccia.JPG',
    touch: 'Tocco guantoni.PNG',
    attack1: 'Attacco .PNG',
    attack2: 'Attacco 2.PNG',
    attack3: 'Attacco 3.PNG',
    knockdown: 'Atterramento.PNG',
    rise: 'Rialzamento.PNG',
    pause: 'Pausa.PNG'
};

function setImage(file) {
    if (!file) return;

    bg.classList.add('fade');

    setTimeout(() => {
        bg.style.backgroundImage = `url("${encodeURI(file)}")`;
        bg.classList.remove('fade');
    }, 180);
}

function typeText(value, mode = 'normal') {
    clearInterval(game.timer);

    game.typing = true;

    text.className = `text ${mode}`;
    text.textContent = '';

    choices.innerHTML = '';
    continueBtn.classList.add('hidden');

    let i = 0;

    game.timer = setInterval(() => {
        text.textContent += value[i++] || '';

        if (i >= value.length) {
            clearInterval(game.timer);
            game.typing = false;

            if (game.current.choices) {
                renderChoices(game.current.choices);
            } else {
                continueBtn.classList.remove('hidden');
            }
        }
    }, mode === 'thought' ? 10 : 7);
}

function renderChoices(items) {
    choices.innerHTML = '';
    continueBtn.classList.add('hidden');

    items.forEach((item, i) => {
        const button = document.createElement('button');

        button.className = 'choice';
        button.type = 'button';

        button.innerHTML =
            `<span class="letter">${String.fromCharCode(65 + i)}</span>${item.label}`;

        button.onclick = () => {
            choices.innerHTML = '';

            if (item.effect) {
                item.effect();
            }

            // IMPORTANTE:
            // non usiamo più next: 15, next: 23, ecc.
            // ogni scelta porta semplicemente alla scena successiva.
            game.index++;

            render();
        };

        choices.appendChild(button);
    });
}

const L = (speaker, text, options = {}) => ({
    speaker,
    text,
    ...options
});

const C = (label, effect = null) => ({
    label,
    effect
});const script = [

L(
    'NARRATORE',
    'Victoria Hale aveva costruito la propria carriera davanti agli obiettivi. Moda, campagne pubblicitarie, servizi fotografici e social: era abituata a essere osservata e a sapere esattamente come attirare l’attenzione. La sua sicurezza non era una posa: era parte naturale del suo carattere.',
    {
        image: images.intro,
        scene: 'INTRODUZIONE'
    }
),

L(
    'NARRATORE',
    'La boxe era entrata nella sua vita quasi per gioco. Aveva iniziato ad allenarsi per mantenersi in forma, poi aveva scoperto di divertirsi davvero. Non era diventata una professionista e non pretendeva di esserlo. Era una principiante, con tecnica ancora acerba e pochissima esperienza reale.'
),

L(
    'VICTORIA',
    '«Non ho mai detto di essere una campionessa. Ho detto che mi piace boxare. C’è una bella differenza, no?» Sorrideva con naturalezza. «E quando qualcuno decide di dirmi davanti a migliaia di persone che non dovrei nemmeno provarci... beh, divento curiosa.»'
),

L(
    'NARRATORE',
    'Quelle parole erano rivolte soprattutto a un pugile professionista e influencer sportivo: io. Avevo criticato pubblicamente Victoria, sostenendo che il suo allenamento non fosse sufficiente per affrontare un vero pugile. Lei aveva risposto nel modo più semplice possibile: mi aveva sfidato.'
),

L(
    'NARRATORE',
    'Accettare era sembrato ovvio. Una professionista contro una principiante. Un incontro che, almeno sulla carta, avrebbe dovuto dimostrare quanto fosse grande la differenza tra noi.'
),

L(
    'PENSIERO',
    'E adesso quella differenza avrei dovuto dimostrarla davanti a tutti.',
    {
        mode: 'thought'
    }
),

L(
    'NARRATORE',
    'Quando salgo sul ring, Victoria mi aspetta già. Mi guarda da sopra la guardia e sorride. Non sembra affatto intimorita.',
    {
        image: images.face,
        scene: 'FACCIA A FACCIA'
    }
),

L(
    'VICTORIA',
    '«Finalmente. Stavo iniziando a pensare che avessi paura di affrontare una modella.»'
),

L(
    'IO',
    '',
    {
        choices: [
            C('«Io non ho paura. Spero che tu sia pronta.»'),
            C(
                '«Paura? Sto solo cercando di non metterti troppo in imbarazzo.»',
                () => {
                    game.victoriaMood = 1;
                }
            ),
            C(
                '«Sono curioso. Hai avuto il coraggio di accettare, questo te lo riconosco.»',
                () => {
                    game.victoriaMood = 2;
                }
            )
        ]
    }
),

L(
    'VICTORIA',
    '«Oh, sono pronta.» Il sorriso diventa ancora più evidente. «E tu continua pure a sottovalutarmi. Mi piace quando le persone lo fanno.»'
),

L(
    'PENSIERO',
    'Il suo tono mi infastidisce. Non perché sia aggressivo. È quasi il contrario: sembra divertirsi davvero.',
    {
        mode: 'thought'
    }
),

L(
    'ARBITRO',
    '«Guantoni al centro.»'
),

L(
    'NARRATORE',
    'Ci avviciniamo. Victoria alza il guantone. Il gesto è quasi amichevole, ma il suo sguardo rimane quello di qualcuno che vuole vedere cosa succederà.',
    {
        image: images.touch,
        round: 'ROUND 1',
        scene: 'INIZIO ROUND'
    }
),

L(
    'VICTORIA',
    '«Buon incontro, professionista.»'
),

L(
    'NARRATORE',
    'I guantoni si toccano. Il gong risuona.'
),

L(
    'PENSIERO',
    'All’inizio mi sento perfettamente a mio agio. La guardia di Victoria è ancora inesperta. I suoi movimenti non sono quelli di una pugile navigata. Questa è esattamente la situazione che mi aspettavo.',
    {
        image: images.attack1,
        mode: 'thought',
        round: 'ROUND 1',
        scene: 'PRIMO ATTACCO'
    }
),

L(
    'VICTORIA',
    '«Allora? Pensavo che un professionista avrebbe fatto il primo passo.»'
),

L(
    'IO',
    '',
    {
        choices: [
            C('«Aspetto che tu commetta un errore.»'),
            C(
                '«Non voglio rovinarti subito la serata.»',
                () => {
                    game.victoriaMood++;
                }
            ),
            C(
                '«Hai una buona guardia per essere una principiante.»',
                () => {
                    game.victoriaMood++;
                }
            )
        ]
    }
),

L(
    'VICTORIA',
    '«Che carino. Stai cercando di essere gentile?» Il sorriso è civettuolo. «Peccato che io preferisca quando sei arrogante. È più divertente batterti.»'
),

L(
    'NARRATORE',
    'Victoria parte con il primo attacco. Non è tecnicamente perfetto, ma è abbastanza rapido da costringermi a prestare attenzione. Lo scambio finisce e lei arretra, sorpresa di essere riuscita a entrare nella mia distanza.'
),

L(
    'PENSIERO',
    'Non è forte come un pugile professionista. Non è veloce come una pugile professionista. Ma non sta scherzando. E soprattutto non sembra voler arretrare.',
    {
        mode: 'thought'
    }
),

L(
    'NARRATORE',
    'Il secondo scambio arriva più rapidamente. Victoria ha preso fiducia. Il suo movimento è ancora acerbo, ma adesso c’è qualcosa di diverso: iniziativa.',
    {
        image: images.attack2,
        scene: 'SECONDO ATTACCO'
    }
),

L(
    'VICTORIA',
    '«Non sei così facile da leggere come pensavo.»'
),

L(
    'IO',
    '',
    {
        choices: [
            C(
                '«Non hai ancora visto abbastanza.»',
                () => {
                    game.victoriaMood = Math.max(
                        0,
                        game.victoriaMood - 1
                    );
                }
            ),
            C(
                '«Continua pure. Mi sto divertendo.»',
                () => {
                    game.victoriaMood++;
                }
            ),
            C(
                '«E tu sei meno impreparata di quanto pensassi.»',
                () => {
                    game.victoriaMood += 2;
                }
            )
        ]
    }
),

L(
    'PENSIERO',
    'Questa volta mi accorgo di una cosa che non avrei voluto notare: sto iniziando a concentrarmi davvero su di lei. Non perché sia una professionista. Proprio perché non lo è, eppure continua a trovare il modo di sorprendermi.',
    {
        mode: 'thought'
    }
),

L(
    'NARRATORE',
    'Victoria cambia ritmo. Il suo sorriso scompare per un istante, sostituito da uno sguardo concentrato. Poi torna quella sicurezza civettuola.',
    {
        image: images.attack3,
        scene: 'TERZO ATTACCO'
    }
),

L(
    'VICTORIA',
    '«Ti avevo detto che sarei stata fastidiosa.»'
),

L(
    'IO',
    '',
    {
        choices: [
            C('«E io ti avevo detto che avrei controllato il match.»'),
            C(
                '«Devo ammetterlo: mi stai sorprendendo.»',
                () => {
                    game.victoriaMood++;
                }
            ),
            C(
                '«Sorridi finché puoi.»',
                () => {
                    game.victoriaMood++;
                }
            )
        ]
    }
),

L(
    'PENSIERO',
    'Faccio un errore. Un errore piccolo, quasi insignificante. Ma contro un avversario vero basta un attimo.',
    {
        mode: 'thought'
    }
),

L(
    'NARRATORE',
    'Il colpo arriva. Perdo l’equilibrio e il tappeto del ring mi viene incontro.',
    {
        image: images.knockdown,
        scene: 'CADUTA'
    }
),

L(
    'PENSIERO',
    'Sono a terra. Per un secondo non penso al dolore. Penso alle telecamere. Al pubblico. Ai video che finiranno online. E soprattutto penso a una cosa che rende tutto molto peggiore: sono un professionista. Lei no.',
    {
        mode: 'thought'
    }
),

L(
    'VICTORIA',
    '«...Wow.» Victoria mi guarda dall’alto. Poi il sorriso torna lentamente. «Questa proprio non me l’aspettavo.» «Devo essere sincera: da quaggiù sembravi molto più sicuro di te.»'
),

L(
    'IO',
    '',
    {
        choices: [
            C(
                '«Goditela. È solo una caduta.»',
                () => {
                    game.victoriaMood = Math.max(
                        0,
                        game.victoriaMood - 1
                    );
                }
            ),
            C('«Non montarti la testa. Mi rialzo.»'),
            C(
                '«Hai avuto fortuna.»',
                () => {
                    game.victoriaMood++;
                }
            )
        ]
    }
),

L(
    'PENSIERO',
    'Il conto dell’arbitro continua. Ogni numero mi sembra durare troppo. Non posso permettermi che questa scena diventi l’immagine con cui tutti mi ricorderanno.',
    {
        mode: 'thought'
    }
),

L(
    'ARBITRO',
    '«...sette... otto...»'
),

L(
    'NARRATORE',
    'Appoggio una mano sul tappeto e mi rialzo. Le gambe reggono. Il corpo c’è. L’orgoglio è un’altra questione.',
    {
        image: images.rise,
        scene: 'RIALZATA'
    }
),

L(
    'VICTORIA',
    '«Eccolo.» Victoria mi osserva con un sorriso divertito. «Sapevo che ti saresti rialzato. Però devo dire che mi piace questa versione di te.»'
),

L(
    'IO',
    '',
    {
        choices: [
            C('«Tieniti quel sorriso. Tra poco non ne avrai motivo.»'),
            C(
                '«Goditi il momento. Non succederà una seconda volta.»',
                () => {
                    game.victoriaMood++;
                }
            ),
            C(
                '«Hai fatto meglio di quanto mi aspettassi.»',
                () => {
                    game.victoriaMood++;
                }
            )
        ]
    }
),

L(
    'NARRATORE',
    'Il gong suona. Fine del round. Torno verso il mio angolo mentre il rumore del pubblico riempie l’arena.',
    {
        image: images.pause,
        round: 'ROUND 1',
        scene: 'PAUSA'
    }
),

L(
    'PENSIERO',
    'Mi siedo e guardo i miei guantoni. È soltanto il primo round. Ma non riesco a cancellare dalla mente l’immagine di me a terra e Victoria che mi guarda dall’alto. Una principiante mi ha mandato al tappeto. E adesso tutti lo hanno visto.',
    {
        mode: 'thought'
    }
),

L(
    'VICTORIA',
    'Dall’altro angolo, Victoria incrocia il mio sguardo. Sorride. Non è più soltanto la modella che aveva accettato una sfida. Ha appena scoperto che può mettere in difficoltà un professionista.'
),

L(
    'NARRATORE',
    'FINE DELLA PARTE 1 — La pausa tra il primo e il secondo round.'
)

];function render() {
    const scene = script[game.index];

    if (!scene) {
        return;
    }

    game.current = scene;

    const options = scene[2] || {};

    if (options.image) {
        setImage(options.image);
    }

    hud.classList.remove('hidden');

    roundLabel.textContent =
        options.round || 'PROLOGO';

    sceneLabel.textContent =
        options.scene || '';

    speaker.textContent =
        scene[0];

    typeText(
        scene[1],
        options.mode || 'normal'
    );
}


function begin() {
    game.index = 0;
    game.victoriaMood = 0;

    if (startBtn) {
        startBtn.classList.add('hidden');
    }

    if (restartBtn) {
        restartBtn.classList.remove('hidden');
    }

    render();
}


continueBtn?.addEventListener('click', () => {

    // Se il testo sta ancora scorrendo,
    // il primo tocco lo mostra immediatamente.
    if (game.typing) {

        clearInterval(game.timer);

        game.typing = false;

        text.textContent =
            game.current.text;

        const options =
            game.current[2] || {};

        if (options.choices) {
            renderChoices(options.choices);
        } else {
            continueBtn.classList.remove('hidden');
        }

        return;
    }

    // Passa alla scena successiva.
    game.index++;

    render();
});


startBtn?.addEventListener(
    'click',
    begin
);


restartBtn?.addEventListener(
    'click',
    begin
);
