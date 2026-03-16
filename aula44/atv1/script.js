const ativos = [
    { nome: "Servidor Dell", valor: 12500 },
    { nome: "Switch Cisco", valor: 3200 },
    { nome: "Monitor 4K", valor: 1800 }
];

// 1. Somar o valor total de todos os objetos no array
const valorTotal = ativos.reduce((acumulador, objetoAtual) => {
    return acumulador + objetoAtual.valor;
}, 0);

console.log("Inventário Completo:", ativos);
console.log(`Valor Total Acumulado: R$ ${valorTotal.toFixed(2)}`);
