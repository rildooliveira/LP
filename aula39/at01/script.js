/**
 * Aula 38: Operadores e Expressões
 * Objetivo: Calcular eficiência e refletir o resultado visualmente.
 */

// 1. Definição dos dados (Simulando entrada de dados)
let producaoEsperada = 1200;
let producaoReal = 1201;

// 2. Operação Aritmética
// Calculamos a porcentagem de eficiência
let eficiencia = (producaoReal / producaoEsperada) * 100;

// 3. Atualização da Interface Visual
const elValor = document.getElementById("resultado-valor");
const elBarra = document.getElementById("barra-progresso");
const elMsg = document.getElementById("mensagem-logistica");

// Arredondamos o valor para 1 casa decimal usando toFixed(1)
elValor.innerText = eficiencia.toFixed(1);

// Ajustamos a barra de progresso visualmente
elBarra.style.width = eficiencia + "%";

// Template Literal para mensagem detalhada
elMsg.innerText = `Produzido: ${producaoReal} de ${producaoEsperada} unidades.`;

console.log(`Eficiência calculada: ${eficiencia.toFixed(2)}%`);
