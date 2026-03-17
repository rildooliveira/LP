/**
 * PRÁTICA: Conversão de JSON e Manipulação do DOM
 */

// 1. Simulação de um JSON recebido de uma API externa
const jsonRecebido = `[
    {"id": 1, "nome": "Teclado Mecânico", "preco": 250.00, "estoque": 15},
    {"id": 2, "nome": "Mouse Gamer", "preco": 120.00, "estoque": 3},
    {"id": 3, "nome": "Monitor 24'", "preco": 850.00, "estoque": 10}
]`;

// 2. DESSERIALIZAÇÃO: Transformando a String JSON em um Objeto (Array) manipulável
const produtos = JSON.parse(jsonRecebido);

// 3. SELEÇÃO: Capturando o container onde os dados serão injetados
const container = document.getElementById("container-produtos");

// Limpando a mensagem de "Carregando..."
container.innerHTML = "";

// 4. ITERAÇÃO E INJEÇÃO: Criando elementos para cada produto
produtos.forEach(produto => {
    // Passo A: Criar o elemento de card (nó do DOM)
    const card = document.createElement("div");
    
    // Passo B: Aplicar classe base usando classList (Boa prática!)
    card.classList.add("produto-card");

    // Passo C: Lógica de negócio visual (Se estoque < 5, muda o estilo)
    if (produto.estoque < 5) {
        card.classList.add("estoque-baixo");
    }

    // Passo D: Injetar o conteúdo textual e estrutural
    // Usamos Template Literals para facilitar a leitura
    card.innerHTML = `
        <h3>${produto.nome}</h3>
        <p>Preço: R$ ${produto.preco.toFixed(2)}</p>
        <small>Disponível: ${produto.estoque} unidades</small>
    `;

    // Passo E: Anexar o card ao container principal
    container.appendChild(card);
});

console.log("Integração concluída: Dados injetados no DOM.");
