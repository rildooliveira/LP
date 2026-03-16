/**
 * ATIVIDADE: Cálculo de Royalties e Escopo
 */

// 1. Arrow Function para cálculo (Sintaxe Moderna)
// Recebe o valor e retorna 10% de taxa
const calcularRoyalties = valor => valor * 0.10;

document.getElementById("btnCalcular").addEventListener("click", () => {
    const valorInput = Number(document.getElementById("valorPatente").value);
    const display = document.getElementById("resultado");

    if (valorInput > 0) {
        // Bloco de processamento
        let taxaFinal = calcularRoyalties(valorInput);
        
        display.innerHTML = `Taxa de Royalties: <strong>R$ ${taxaFinal.toFixed(2)}</strong>`;
        
        // Teste de Escopo para o Aluno:
        console.log("Taxa calculada com sucesso.");
    }

    // Tente acessar 'taxaFinal' aqui fora do IF. 
    // O console mostrará que ela está protegida pelo escopo de bloco (let).
});
