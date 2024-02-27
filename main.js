// Declarações
txtNameMusica = document.getElementById("TitlleSong");
txtNameArtist = document.getElementById("artistMusic");
imgMusic = document.getElementById("imageMusic");

durationMusic = document.getElementById("duracaoMusica");
timeMusic = document.getElementById("musicaAndamento");
progressoMusic = document.getElementById("progresso");

btnPlayPause = document.getElementById("play");
btnFront = document.getElementById("front");
btnBack = document.getElementById("back");

imagemFundo = document.getElementById("imagemFundo");

let musica = new Audio("./musicas/arabella.mp3");
musicaTocando = false;
indiceMusic = 0;
cronometroEmExecucao = false;
temp = 0;
c = 0;

todasMusicas = [
    {
        nome: "Arabella",
        caminho: "./musicas/arabella.mp3",
        artista: "Arctic Monkeys",
        imagem: "./musicas/arabellaImage.jpg"
    },
    {
        nome: "Everlong",
        caminho: "./musicas/foofighters.mp3",
        artista: "Foo Fighters",
        imagem: "./musicas/fooFighters.jpg"
    },
    {
        nome: "Don't Look Back In Anger",
        caminho: "./musicas/oasis.mp3",
        artista: "Oasis",
        imagem: "./musicas/oasis.jpg"
    }
];

// Carregamento Inicial
txtNameMusica.textContent = todasMusicas[0].nome;
txtNameArtist.textContent = todasMusicas[0].artista;
imgMusic.src = todasMusicas[0].imagem;
imagemFundo.src = "./musicas/arabellaImage.jpg";

musica.addEventListener('loadedmetadata', function() {
    var duracaoTotal = musica.duration;
   
    var minutos = Math.floor(duracaoTotal / 60);
    let segundosRestantes = duracaoTotal % 60;

    durationMusic.textContent  = formatarNumero(minutos) + ":" + formatarNumero(segundosRestantes);
});

// Botão Pausar/Play
btnPlayPause.addEventListener('click', () =>{
    alterarEstadoMusica(0)
});

function alterarEstadoMusica(parametro){
    if(parametro != 1){
        if(c != 0){
            pausarCronometro();
        }
        
        if(musicaTocando){
            musica.pause();

            pausarCronometro();
            musicaTocando = false;
    
            btnPlayPause.classList.remove("fa-pause");
            btnPlayPause.classList.add("fa-play");
        }
        else{
            musica.play();

            if(progressoMusic.style.width == "100%"){
                zerarCronometro();
                progressoMusic.style.width = 0 + "%";
                temp = 0;
            }

            iniciarCronometro();
            musicaTocando = true;
    
            btnPlayPause.classList.remove("fa-play");
            btnPlayPause.classList.add("fa-pause");
            c = 0;
        }
    }
    else{
        if(timeMusic.textContent != "0:00"){
            zerarCronometro();
            c = 1
            
            if(c != 0){
                zerarCronometro();
                iniciarCronometro();
            }
        }
    }
}


// Botões Front e Back
btnFront.addEventListener('click', () => {
    alterarMusica(1)
});

btnBack.addEventListener('click', () => {
    alterarMusica(-1)
})

function alterarMusica(indice){
    progressoMusic.style.width = 0 + "%";
    indiceMusic = indiceMusic + indice;

    if(timeMusic.textContent == "0:00"){
        iniciarCronometro();
    }    

    if(indiceMusic == -1){
        indiceMusic = (todasMusicas.length -1);
    }

    if(indiceMusic == todasMusicas.length){
        indiceMusic = 0;
    }
    
    if(musicaTocando){
        musica.pause();
    }

    musica.src = todasMusicas[indiceMusic].caminho;
    txtNameMusica.textContent = todasMusicas[indiceMusic].nome;
    txtNameArtist.textContent = todasMusicas[indiceMusic].artista;
    imgMusic.src = todasMusicas[indiceMusic].imagem;
    imagemFundo.src = "";
    imagemFundo.src = todasMusicas[indiceMusic].imagem;
    
    musica.addEventListener('loadedmetadata', function() {
        musica.play();
        let duracaoTotal = musica.duration;
        
        var minutos = Math.floor(duracaoTotal / 60);
        let segundosRestantes = duracaoTotal % 60;
    
        durationMusic.textContent  = formatarNumero(minutos) + ":" + formatarNumero(segundosRestantes);
        btnPlayPause.classList.remove("fa-play");
        btnPlayPause.classList.add("fa-pause");
        
        musicaTocando = true;
        temp = 0;
    });

    alterarEstadoMusica(1);
}

// Cronômetro
segundos = 0;
minutos = 0;

function iniciarCronometro() {
    cronometro = setInterval(() => {
        segundos++;
        if (segundos == 60) {
            segundos = 0;
            minutos++;
        }
        atualizarTudo();
    }, 1000);
}

function zerarCronometro() {
    clearInterval(cronometro);
    minutos = 0;
    segundos = 0;
    atualizarTela();
};

function atualizarTudo() {
    var tempo = formatarNumero(minutos) + ":" + formatarNumero(segundos);
    timeMusic.textContent = tempo;
    temp = temp + 1
    
    progredir(temp);
};

function atualizarTela() {
    var tempo = formatarNumero(minutos) + ":" + formatarNumero(segundos);
    timeMusic.textContent = tempo;
};

function pausarCronometro() {
    clearInterval(cronometro);
};

function formatarNumero(numero) {
    return numero < 10 ? "0" + numero.toString().substring(0,2) : numero.toString().substring(0,2);
};

function progredir(tempoAtual){
    var duracaoTotal = musica.duration;
    progresso = tempoAtual/duracaoTotal;
    progresso = progresso * 100

    progressoMusic.style.width = progresso + "%";
};

musica.addEventListener("ended", () => {
    pausarCronometro();
    alterarEstadoMusica();

    progressoMusic.style.width = 100 + "%";
});