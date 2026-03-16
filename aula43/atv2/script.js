const componentes = ["Monitor", "Mouse", "Gabinete"];

// Criando nova estrutura de dados a partir das strings
const componentesEstruturados = componentes.map((nome, index) => {
    return {
        id: index + 1,
        produto: nome,
        slug: nome.toLowerCase(),
        data_cadastro: new Date().toLocaleDateString()
    };
});

console.log("Array Original:", componentes);
console.table(componentesEstruturados);
