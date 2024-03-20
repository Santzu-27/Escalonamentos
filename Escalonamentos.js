const mainPage = document.getElementById('main')
const divInserir = document.getElementById('inserir')
const divTempos = document.getElementById('tempos')

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

const processos = [];
function populaAleatorio() {
    divInserir.innerHTML = ``
    const p1 = new Processo(rand(20), rand(20), rand(5));
    const p2 = new Processo(rand(20), rand(20), rand(5));
    const p3 = new Processo(rand(20), rand(20), rand(5));
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
        console.log(processos);
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

function fcfs(){
    let tempo = 0;
    let i= 0; // i = Posição do array de processos
    divTempos.innerHTML = '';
    divTempos.style.display = 'block';
    while(i < processos.length){
        let processoEmExecucao = processos[i];
        //Dar tempo de espera verificando se o processo está iniciando
        if(processoEmExecucao.tempo_execucao == processoEmExecucao.tempo_restante){
            processoEmExecucao.tempo_espera = tempo;     
        }

        tempo++;
        processoEmExecucao.tempo_restante--;

        let novoTempo = document.createElement('div');
        novoTempo.innerHTML = `
            Tempo[${tempo}]: Processo[${i}] restante = ${processoEmExecucao.tempo_restante}
        `
        divTempos.appendChild(novoTempo);
        if(processoEmExecucao.tempo_restante == 0){
            processoEmExecucao.tempo_restante = processoEmExecucao.tempo_execucao //Para resetar o processo;
            i++
        }
    }
}

const divStats = document.createElement('div');
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
    document.getElementById('inicio').style.display = 'block';
    divInserir.innerHTML = '';
    divTempos.style.display = 'none';
    divStats.innerHTML = '';
    document.getElementById('comandos').style.display = 'none'
}