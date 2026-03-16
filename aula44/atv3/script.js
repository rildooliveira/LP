const precos = [450, 120, 3000, 85, 900, 420, 333, 12 , 876];

// 1. Ordenação Numérica Crescente
// Nota: O sort() puro trata números como strings, por isso usamos a função de comparação
const precosOrdenados = precos.sort((a, b) => a - b);

console.log("Preços Originais:", [450, 120, 3000, 85, 900, 420, 333, 12 , 876]);
console.log("Preços Ordenados (Menor para Maior):", precosOrdenados);
