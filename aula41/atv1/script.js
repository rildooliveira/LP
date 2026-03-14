/**
 * Aula 41: Funções e Organização de Código
 * Objetivo: Encapsular a lógica de negócio e atualizar a interface via eventos.
 */

// 1. Função Modular: Realiza apenas o cálculo lógico (Processamento)
// Ela recebe o preço e retorna quanto de desconto deve ser dado (10%)
function calcularDescontoEconomico(preco) {
    return preco * 0.10; 
}

// 2. Função de Orquestração: Gerencia a entrada, saída e interface
function processarOperacao() {
    // A. Captura dos Elementos
    const inputPedido = document.getElementById("valor-pedido");
    const painelResultado = document.getElementById("resultado-painel");
    
    // B. Captura do valor digitado (convertendo para número)
    let valorBruto = parseFloat(inputPedido.value);

    // Validação simples de segurança
    if (isNaN(valorBruto) || valorBruto <= 0) {
        alert("Por favor, insira um valor de pedido válido.");
        return;
    }

    // C. Chamada da função modular de cálculo
    let valorDesconto = calcularDescontoEconomico(valorBruto);
    let valorLiquido = valorBruto - valorDesconto;

    // D. Injeção visual no DOM
    document.getElementById("subtotal").innerText = `R$ ${valorBruto.toFixed(2)}`;
    document.getElementById("desconto").innerText = `R$ ${valorDesconto.toFixed(2)}`;
    document.getElementById("total-final").innerText = `R$ ${valorLiquido.toFixed(2)}`;

    // Exibe o painel de resultados que estava oculto
    painelResultado.classList.remove("oculto");

    // Registro de Governança no Console
    console.log(`Operação processada: Pedido de R$ ${valorBruto} 
        finalizado com R$ ${valorLiquido}.`);
}

/**
 * DICA PARA O ALUNO:
 * Note que a lógica de "como calcular o desconto" está separada da lógica de "como mostrar na tela".
 * Isso facilita a manutenção se a regra de desconto mudar amanhã!
 */
