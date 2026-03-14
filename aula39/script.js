/**
 * Aula 39: Estruturas Condicionais (if/else)
 * Objetivo: Tomada de decisão automatizada com feedback visual na interface.
 */
// 1. Simulação de entrada de dados do sensor
let temperaturaAtual = 49; 

// 2. Mapeamento da Interface (DOM)
const elBox = document.getElementById("box-alerta");
const elLabel = document.getElementById("label-temperatura");
const elMsg = document.getElementById("mensagem-seguranca");

// Atualiza o número na tela imediatamente
elLabel.innerText = temperaturaAtual;

// 3. Estrutura Condicional para Governança do Sistema
if (temperaturaAtual > 80) {
    // Caso Crítico
    elBox.className = "status-perigo";
    elMsg.innerText = "ALERTA MÁXIMO: Risco de superaquecimento!";
    console.warn("Protocolo de emergência ativado.");

} else if (temperaturaAtual >= 50 && temperaturaAtual <= 80) {
    // Caso de Atenção
    elBox.className = "status-alerta";
    elMsg.innerText = "AVISO: Temperatura acima da média operacional.";
    console.log("Monitoramento intensificado.");

} else {
    // Caso Normal
    elBox.className = "status-seguro";
    elMsg.innerText = "SISTEMA ESTÁVEL: Temperatura dentro dos parâmetros.";
}

// Nota: Experimente mudar o valor da 'temperaturaAtual' para 30 ou 65 
// e recarregar a página para ver a mudança visual.
