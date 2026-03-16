const dispositivos = [
    { id: 101, nome: "Roteador", categoria: "Rede" },
    { id: 102, nome: "Teclado", categoria: "Periférico" },
    { id: 103, nome: "Switch", categoria: "Rede" }
];

// 1. Filtrar apenas categoria Rede
const apenasRede = dispositivos.filter(item => item.categoria === "Rede");

// 2. Encontrar o dispositivo específico por ID
const especifico = dispositivos.find(item => item.id === 102);

console.log("Resultados de Rede:", apenasRede);
console.log("Busca por ID 102:", especifico);
