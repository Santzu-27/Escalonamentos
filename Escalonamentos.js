function rand(max){
    const min = 0;
    let num = Math.floor(Math.random() * (max-min) + 1 )
    return num;
}

class Processos{
    constructor(tempo_chegada, tempo_execucao, prioridade){
        this.tempo_chegada = tempo_chegada,
        this.tempo_execucao = tempo_execucao,
        this.prioridade = prioridade,
        this.tempo_restante = this.tempo_execucao;
    }
}


const p1 = new Processos(2, 10, 3, 0);

console.log(p1)