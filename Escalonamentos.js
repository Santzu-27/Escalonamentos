const divStats = document.createElement('div');
const mainPage = document.getElementById('main')
const divInserir = document.getElementById('inserir')
const divInicio = document.getElementById('inicio')
const divTempos = document.getElementById('tempos')
const divComandos = document.getElementById('comandos')
let chegaram = [];
let processos = [];
let concluidos = []

function rand(max) {
    const min = 1;
    let num = Math.floor(Math.random() * (max - min) + 1)
    return num;
}

class Processo {
    constructor(tempo_chegada, tempo_execucao, prioridade, id) {
        this.tempo_chegada = tempo_chegada,
        this.tempo_execucao = tempo_execucao,
        this.prioridade = prioridade,
        this.tempo_restante = this.tempo_execucao;
        this.tempo_espera = 0;
        this.id = id
    }
}

function populaAleatorio() {
    divInserir.innerHTML = ``
    const p1 = new Processo(rand(10), rand(25), rand(15), 0);
    const p2 = new Processo(rand(10), rand(25), rand(15), 1);
    const p3 = new Processo(rand(10), rand(25), rand(15), 2);
    processos.splice(0, processos.length)
    processos.push(p1);
    processos.push(p2);
    processos.push(p3);
    console.log(processos)
    mostraProcessos();
}

function populaManual(i) {
    if (i == 0) {
        processos.splice(0, processos.length)
    }
    if (i > 2) {
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
    if (
        exec < 0 ||
        cheg < 0 ||
        prior < 0
    ) {
        alert('Preencha todos os campos!')
        return;
    }
    const processo = new Processo(cheg, exec, prior, i);
    processos.push(processo)
    i++;
    populaManual(i);
}

function mostraProcessos() {
    document.getElementById('inicio').style.display = 'none';
    divInserir.innerHTML = '';
    let i = 0;
    for (info of processos) {
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

function resetaProcessos(){
    for(processo of concluidos){
        processo.tempo_restante = processo.tempo_execucao
        processo.tempo_espera = 0
        processos[processo.id] = processo;
    }    
    concluidos.splice(0, concluidos.length)
}
function sjf(preemp) {
    resetaProcessos();
    divTempos.innerHTML = '';
    divTempos.style.display = 'block';
    tempo = 0;
    
    while (concluidos.length < 3) {
        if(processos.length > 0) {
            verificaChegada(tempo);
        }
        
        processoExecucao = verificaMenor();
        
        if(processoExecucao === undefined){
            addDiv(tempo, -1, processoExecucao )
            tempo ++
        }else
        if(preemp){
            diminuiTempo(processoExecucao);
        }else{
            while(processoExecucao.tempo_restante > 0){
                verificaChegada(tempo);
                diminuiTempo(processoExecucao)
            }
        }
    }
}

function diminuiTempo(processoExecucao){
    processoExecucao.tempo_restante--;
    addTempoEspera(processoExecucao);
    if(processoExecucao.tempo_restante == 0){
        concluidos.push(processoExecucao)
        processos.push(processoExecucao)
        chegaram  = chegaram.filter(pr => pr !== processoExecucao);
    }
    addDiv(tempo, processoExecucao.id, processoExecucao)
    tempo++
}
function verificaChegada(tempo) {
    for (processo of processos) {
        if (processo.tempo_chegada <= tempo && processo.tempo_restante > 0) {
            chegaram.push(processo);
            processos = processos.filter(p => p !== processo)
            console.log('Chegaram: ' + chegaram)
            console.log('Processos: ' + processos)
        }else{console.log('NAAO')}
    }
}

function addTempoEspera(processoExecucao) {
    for (processo of chegaram) {
        if (processo !== processoExecucao) {
            processo.tempo_espera++;
        }
    }
}

function verificaMenor() {
    menor = chegaram[0];
    for (processo of chegaram) {
        if (processo.tempo_restante < menor.tempo_restante && processo.tempo_restante > 0) {
            menor = processo;
        }
        
    }
    return menor;
}

function fcfs() {
    resetaProcessos();
    divTempos.innerHTML = '';
    divTempos.style.display = 'block';
    let tempo = 0;
    let i = 0; // i = Posição do array de processos
    let id = 0
    while (i < processos.length) {
        let processoExecucao = processos[i];
        //Dar tempo de espera verificando se o processo está iniciando
        if (processoExecucao.tempo_execucao == processoExecucao.tempo_restante) {
            processoExecucao.tempo_espera = tempo;
        }
        tempo++;
        processoExecucao.tempo_restante--;
        addDiv(tempo, processoExecucao.id, processoExecucao);
        if (processoExecucao.tempo_restante == 0) {
            i++
            concluidos.push(processoExecucao);
        }
    }
}

function addDiv(tempo, i, processoExecucao) {
    let novoTempo = document.createElement('div');
    if (processoExecucao == undefined) {

        novoTempo.innerHTML = `
        Tempo[${tempo}]: Nenhum Processo Chegou
        `
    } else {
        novoTempo.innerHTML = `
        Tempo[${tempo}]: Processo[${i}] restante = ${processoExecucao.tempo_restante}
        `
    }
    divTempos.appendChild(novoTempo);
}

function imprimeStats() {
    let tempoTotal = 0;
    let tempoMedio = 0;
    for (p of concluidos) {
        tempoTotal += p.tempo_espera;
    }
    tempoMedio = tempoTotal / concluidos.length;
    divStats.innerHTML = `
        Tempos de espera: <br>
        Processo ${concluidos[0].id} = ${concluidos[0].tempo_espera}<br>
        Processo ${concluidos[1].id} = ${concluidos[1].tempo_espera}<br>
        Processo ${concluidos[2].id} = ${concluidos[2].tempo_espera}<br>
        Tempo médio: ${tempoMedio}<br>
        Tempo total: ${tempoTotal}<br>
    `
    divStats.setAttribute('id', 'stats')
    divTempos.after(divStats)
}

function popularNovamente() {
    divInicio.style.display = 'block';
    divInserir.innerHTML = '';
    divTempos.style.display = 'none';
    divStats.innerHTML = '';
    divComandos.style.display = 'none'
}

function desenvolvimento(esc) {
    alert(`Processo ${esc} em desenvolvimento `)
}
