const array = [
    {nome: 'g'},
    {nome: 'h'},
    {nome: 'i'}
];

const a2 = []

a2.push({...array[0]})
a2[0].nome = 'ssss'
console.log(a2)
console.log(array)


