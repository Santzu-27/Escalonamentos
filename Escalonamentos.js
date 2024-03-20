function rand(max){
    const min = 0;
    let num = Math.floor(Math.random() * (max-min) + 1 )
    return num;
}

class Processo{
    constructor(tempo_chegada, tempo_execucao, prioridade){
        this.tempo_chegada = tempo_chegada,
        this.tempo_execucao = tempo_execucao,
        this.prioridade = prioridade,
        this.tempo_restante = this.tempo_execucao;
    }
}
const processos = [];
function populaAleatorio(){
    const p1 = new Processo(rand(30), rand(30), rand(10));   
    const p2 = new Processo(rand(30), rand(30), rand(10));
    const p3 = new Processo(rand(30), rand(30), rand(10));
    processos.splice(0, processos.length)
    processos.push(p1);
    processos.push(p2);
    processos.push(p3);
    console.log (processos)
}

function populaManual(){

}
