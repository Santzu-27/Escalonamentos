const arrays = [
];
const eita = {
    tempo: 0,
    tempo_restante: 1,
    tempo_execucao: 2,
    tempo_execucao_restante: 3
}
arrays.push(eita);
arrays.push(eita);
arrays.push(eita);
arrays.splice(0, 1)
console.log(arrays.length)