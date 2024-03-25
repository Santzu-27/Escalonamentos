const divStats = document.createElement('div');
const mainPage = document.getElementById('main')
const divInserir = document.getElementById('inserir')
const divInicio = document.getElementById('inicio')
const divTempos = document.getElementById('tempos')
const divComandos = document.getElementById('comandos')
const processos = [];

function rand(max) {
    const min = 1;
    let num = Math.floor(Math.random() * (max - min) + 1)
    return num;
}

class Processo {
    constructor(tempo_chegada, tempo_execucao, prioridade) {
        this.tempo_chegada = tempo_chegada,
            this.tempo_execucao = tempo_execucao,
            this.prioridade = prioridade,
            this.tempo_restante = this.tempo_execucao;
            this.tempo_espera = 0;
    }
}

function populaAleatorio() {
    divInserir.innerHTML = ``
    const p1 = new Processo(rand(20), rand(20), rand(15));
    const p2 = new Processo(rand(20), rand(20), rand(15));
    const p3 = new Processo(rand(20), rand(20), rand(15));
    processos.splice(0, processos.length)
    processos.push(p1);
    processos.push(p2);
    processos.push(p3);
    console.log(processos)
    mostraProcessos();
}

function populaManual(i) {
    if(i == 0){
        processos.splice(0, processos.length)
    }
    if(i > 2) {
        mostraProcessos();
        return;
    }
    divInserir.innerHTML = `
        <p>Digite o tempo de execução do Processo ${i}:</p>
        <input type="number" min="1" id="exec">
        <p>Digite o tempo de chegada do Processo ${i}:</p>
        <input type="number" min="0" id="cheg">
        <p>Digite a prioridade do Processo ${i}:</p>
        <input type="number" min="1" id="prior"> <br>
        <button id="enviar"onclick="addManual(${i})">Enviar</button>
    `
    console.log(i)
}

function addManual(i) {
    const exec = Number(document.getElementById('exec').value)
    const cheg = Number(document.getElementById('cheg').value)
    const prior = Number(document.getElementById('prior').value)
    if(
        exec <= 0 ||
        cheg < 0 ||
        prior <= 0 
    ){
        alert('Preencha todos os campos!')
        return;
    }
    const processo = new Processo(cheg, exec, prior);
    processos.push(processo)
    i++;
    populaManual(i);
}

function mostraProcessos() {
    document.getElementById('inicio').style.display = 'none';
    divInserir.innerHTML = '';
    let i = 0;
    for(info of processos){
        divInserir.innerHTML += `
        <div id="processos">
                <h1>Processo ${i}</h1>
                <p>Tempo de Chegada: ${info.tempo_chegada}</p>
                <p>Tempo de Execução: ${info.tempo_execucao}</p>
                <p>Prioridade: ${info.prioridade}</p>
                </div>
        `
        i++;
    }
    document.getElementById('comandos').style.display = 'flex';
}


function sjf(preemp){
    tempo = 0;
    i= 0;
    const chegaram = []
    while(i < processos.length){
        verificaChegada(tempo, chegaram);
        processoExecucao = verificaMenor(chegaram);

        if(processoExecucao.tempo_restante == 0){
            i++;
        }
        if(processoExecucao.tempo_execucao == processoExecucao.tempo_restante){
            processoExecucao.tempo_espera = tempo;     
        }
        tempo++;
    }
    
}

function verificaMenor(chegaram){
    menor = chegaram[0];
    for(processo of chegaram){
        if(processo.tempo_restante < menor.tempo_restante && processo.tempo_restante > 0){
            menor = processo;
        }
    
    }
    return menor;
}

function verificaChegada(tempo, chegaram){
    for(processo of processos){
        if(processo.tempo_chegada >= tempo){
            chegaram.push(processo);
        }
    }
}


function fcfs(){
    let tempo = 0;
    let i= 0; // i = Posição do array de processos
    while(i < processos.length){
        let processoExecucao = processos[i];
        //Dar tempo de espera verificando se o processo está iniciando
        if(processoExecucao.tempo_execucao == processoExecucao.tempo_restante){
            processoExecucao.tempo_espera = tempo;     
        }
        tempo++;
        processoExecucao.tempo_restante--;
        addDiv(tempo, i, processoExecucao);
        if(processoExecucao.tempo_restante == 0){
            processoExecucao.tempo_restante = processoExecucao.tempo_execucao //Para resetar o processo;
            i++
        }
    }
}

function addDiv(tempo, i, processoExecucao){
    divTempos.innerHTML = '';
    divTempos.style.display = 'block';
    let novoTempo = document.createElement('div');
    novoTempo.innerHTML = `
        Tempo[${tempo}]: Processo[${i}] restante = ${processoExecucao.tempo_restante}
    `
    divTempos.appendChild(novoTempo);
}

function imprimeStats(){
    let tempoTotal = 0;
    let tempoMedio = 0;
    for(p of processos){
        tempoTotal += p.tempo_espera;
    }
    tempoMedio = tempoTotal / processos.length;
    divStats.innerHTML = `
        Tempos de espera: <br>
        Processo 0 = ${processos[0].tempo_espera}<br>
        Processo 1 = ${processos[1].tempo_espera}<br>
        Processo 2 = ${processos[2].tempo_espera}<br>
        Tempo médio: ${tempoMedio}<br>
        Tempo total: ${tempoTotal}<br>
    `
    divStats.setAttribute('id', 'stats')
    divTempos.after(divStats)
}

function popularNovamente(){
    divInicio.style.display = 'block';
    divInserir.innerHTML = '';
    divTempos.style.display = 'none';
    divStats.innerHTML = '';
    divComandos.style.display = 'none'
}

function desenvolvimento(esc){
    alert(`Processo ${esc} em desenvolvimento `)
}

