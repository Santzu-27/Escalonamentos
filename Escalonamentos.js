const mainPage = document.getElementById('main')
const divInserir = document.getElementById('inserir')
function rand(max) {
    const min = 0;
    let num = Math.floor(Math.random() * (max - min) + 1)
    return num;
}

class Processo {
    constructor(tempo_chegada, tempo_execucao, prioridade) {
        this.tempo_chegada = tempo_chegada,
            this.tempo_execucao = tempo_execucao,
            this.prioridade = prioridade,
            this.tempo_restante = this.tempo_execucao;
    }
}
const processos = [];
function populaAleatorio() {
    divInserir.innerHTML = ``
    const p1 = new Processo(rand(30), rand(30), rand(10));
    const p2 = new Processo(rand(30), rand(30), rand(10));
    const p3 = new Processo(rand(30), rand(30), rand(10));
    processos.splice(0, processos.length)
    processos.push(p1);
    processos.push(p2);
    processos.push(p3);
    console.log(processos)
}

function populaManual(i) {
    if(i > 3) {
        // mostraProcessos();
        console.log(processos);
        return;
    }

    divInserir.innerHTML = `
        <p>Digite o tempo de execução do Processo ${i}:</p>
        <input type="number" id="exec">
        <p>Digite o tempo de chegada do Processo ${i}:</p>
        <input type="number" id="cheg">
        <p>Digite a prioridade do Processo ${i}:</p>
        <input type="number" id="prior"> <br>
        <button id="enviar" onclick="addManual(${i+1})">Enviar</button>
    `
    
    console.log(i)
    // populaManual(i)
}

function addManual(i) {
    const exec = document.getElementById('exec');
    const cheg = document.getElementById('cheg');
    const prior = document.getElementById('prior');
    processos.push({
        tempo_chegada: Number(cheg.value),
        tempo_execucao: Number(exec.value),
        prioridade: Number(prior.value)
    })
    populaManual(i);
}
