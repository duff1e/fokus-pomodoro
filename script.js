const html = document.querySelector('html');
const focoBt = document.querySelector('.app__card-button--foco');
const descansoCurtoBt = document.querySelector('.app__card-button--curto');
const descansoLongoBt = document.querySelector('.app__card-button--longo');
const bannerImg = document.querySelector('.app__image');
const textoTitulo = document.querySelector('.app__title');
const botoes = document.querySelectorAll('.app__card-button');
const buttonStartPause = document.querySelector('#start-pause');
const iniciarOuPausarBt = document.querySelector('#start-pause span');
const imgPausePlay = document.querySelector('.app__card-primary-butto-icon');
const timer = document.querySelector('#timer');

const inputMusica = document.querySelector('#alternar-musica');
const musica = new Audio('./sons/luna-rise-part-one.mp3');
musica.loop = true;

const pauseSound = new Audio('./sons/pause.mp3');
const startSound = new Audio('./sons/play.wav');
const fimContagemSound = new Audio('./sons/beep.mp3');

let tempoDecorridoEmSegundos = 1500;
let intervaloId = null;

inputMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

function trocaModo (modo) {
    mostrarTempo();
    botoes.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', modo);
    bannerImg.setAttribute('src', `./imagens/${modo}.png`)
    
    switch (modo) {
        case "foco":
            textoTitulo.innerHTML = `
            Otimize sua produtividade,<br>
            <strong class="app__title-strong">mergulhe no que importa.</strong>`;
            break;
        
        case "descanso-curto":
            textoTitulo.innerHTML = `
            Que tal dar uma respirada?<br>
            <strong class="app__title-strong">Faça uma pausa curta!</strong>`;
            break;
        
        case "descanso-longo":
            textoTitulo.innerHTML = `
            Hora de voltar à superfície.<br>
            <strong class="app__title-strong">Faça uma pausa longa.</strong>`

        default:
            break;
    }
}

focoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 1500;
    trocaModo('foco');
    focoBt.classList.add('active');
})

descansoCurtoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 300;
    trocaModo('descanso-curto');
    descansoCurtoBt.classList.add('active');
});

descansoLongoBt.addEventListener('click', () => {
    tempoDecorridoEmSegundos = 900;
    trocaModo('descanso-longo');
    descansoLongoBt.classList.add('active');
})

const contagemRegressiva = () => {
    if(tempoDecorridoEmSegundos <= 0) {
        fimContagemSound.play();
        alert('Tempo finalizado!');
        zerarContagem();
        return
    }
    tempoDecorridoEmSegundos -= 1;
    mostrarTempo();
}

buttonStartPause.addEventListener('click', iniciarOuPausarContagem);

function iniciarOuPausarContagem () {

    if (intervaloId) {
        pauseSound.play();
        zerarContagem();
        return
    }
    startSound.play()
    intervaloId = setInterval(contagemRegressiva, 1000);
    iniciarOuPausarBt.textContent = 'Pausar';
    if(iniciarOuPausarBt.textContent = 'Pausar') {
        imgPausePlay.setAttribute('src', `./imagens/pause.png`);
    }
}

function zerarContagem () {
    clearInterval(intervaloId);
    iniciarOuPausarBt.textContent = 'Começar';
    if (iniciarOuPausarBt.textContent = 'Começar') {
        imgPausePlay.setAttribute('src', `./imagens/play_arrow.png`);
    }
    intervaloId = null;
}

function mostrarTempo () {
    const tempo = new Date(tempoDecorridoEmSegundos * 1000);
    const tempoFormatado = tempo.toLocaleTimeString('pt-Br', {minute: '2-digit', second: '2-digit'});
    timer.innerHTML = `${tempoFormatado}`;
}

mostrarTempo();