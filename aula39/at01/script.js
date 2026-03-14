/**
 * Aula 38: Operadores e Expressões Interativas
 * Objetivo: Calcular eficiência com base em entradas do usuário em tempo real.
 */

// 1. Seleção dos elementos da interface (DOM)
const elValor = document.getElementById("resultado-valor");
const elBarra = document.getElementById("barra-progresso");
const elMsg = document.getElementById("mensagem-logistica");
const btnCalcular = document.getElementById("btn-calcular");

// Mudança: Seleção dos novos campos de entrada
const inputEsperada = document.getElementById("input-esperada");
const inputReal = document.getElementById("input-real");

// 2. Função de Cálculo (Encapsulamento de lógica)
function calcularEficiencia() {
    // Mudança: Capturamos os valores dos inputs e convertemos para número
    const producaoEsperada = Number(inputEsperada.value);
    const producaoReal = Number(inputReal.value);

    // Validação básica para evitar divisão por zero
    if (producaoEsperada <= 0) {
        elMsg.innerText = "A produção esperada deve ser maior que zero.";
        return;
    }

    // Operação Aritmética
    let eficiencia = (producaoReal / producaoEsperada) * 100;

    // 3. Atualização da Interface Visual
    elValor.innerText = eficiencia.toFixed(1);
    
    // Mudança: Limitamos a barra a 100% visualmente para não quebrar o layout
    const larguraBarra = eficiencia > 100 ? 100 : eficiencia;
    elBarra.style.width = larguraBarra + "%";

    // Mudança de cor dinâmica: se > 100% fica azul (superação), se < 50% vermelho (alerta)
    elBarra.style.background = eficiencia >= 100 ? "#007bff" : eficiencia < 50 ? "#dc3545" : "#28a745";

    // Template Literal para feedback detalhado
    elMsg.innerText = `Produzido: ${producaoReal} de ${producaoEsperada} unidades.`;

    console.log(`Eficiência atualizada: ${eficiencia.toFixed(2)}%`);
}

// 4. Mudança: Adição de Event Listener para processar a interação (Aula 48)
btnCalcular.addEventListener("click", calcularEficiencia);
