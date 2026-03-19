/**
 * Atividade 1: Monitoramento com Variáveis
 */

// 1. Declaração com nomes significativos (Clean Code)
const nomeAtivo = "Gerador Industrial A1";
let voltagemSistema = 380;
let isOperacional = true;

// 2. Mapeamento do DOM
const elNome = document.getElementById("info-nome");
const elVoltagem = document.getElementById("info-voltagem");
const elStatus = document.getElementById("info-status");
const elTipo = document.getElementById("info-tipo");

// 3. Injeção de Dados
elNome.innerText = nomeAtivo;
elVoltagem.innerText = `${voltagemSistema}V`;
elStatus.innerText = isOperacional ? "OPERACIONAL" : "FALHA";

// Exibindo a tipagem dinâmica
elTipo.innerText = `A voltagem é do tipo: ${typeof voltagemSistema}`;
