const estoque = [
    { item: "Teclado", qtd: 15 },
    { item: "Mouse", qtd: 0 },
    { item: "Webcam", qtd: 8 }
];

// 1. Verificar se TODOS os itens estão disponíveis (qtd > 0)
const todosDisponiveis = estoque.every(p => p.qtd > 0);

// 2. Verificar se existe ao menos UM item esgotado
const temEsgotado = estoque.some(p => p.qtd === 0);

console.log("Análise de Estoque:", estoque);
console.log("Tudo disponível?", todosDisponiveis);
console.log("Existe item crítico?", temEsgotado);
