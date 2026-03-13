/**
 * AULA 36: ATIVAÇÃO DE INFRAESTRUTURA
 * Objetivo: Validar a conexão HTML/JS e fornecer feedback visual/técnico.
 */

// TAREFA A: MAPEAMENTO DO DOM
const tagStatus = document.getElementById("status-tag");
const painelLog = document.getElementById("terminal-log");

// TAREFA B: MANIPULAÇÃO VISUAL (FEEDBACK AO USUÁRIO)
const ativarInterface = () => {
    // Atualiza a tag de status para o usuário final
    tagStatus.innerText = "AMBIENTE PRONTO";
    tagStatus.classList.add("ativo");
    
    // Altera o título da página dinamicamente
    document.title = "LP - Módulo Ativo";
};

// TAREFA C: LOG DE GOVERNANÇA (FEEDBACK TÉCNICO)
const registrarLog = (mensagem) => {
    const hora = new Date().toLocaleTimeString();
    
    // Registro visual no "Terminal" do HTML
    painelLog.innerHTML += `<p>> ${hora}: ${mensagem}</p>`;
    
    // Registro técnico no Console do Navegador
    console.log(`[AUDITORIA] ${hora}: ${mensagem}`);
};

// EXECUÇÃO DO FLUXO DE INICIALIZAÇÃO
ativarInterface();
registrarLog("Conexão estabelecida com o arquivo script.js.");
registrarLog("Diretórios do WAMP Server validados.");
registrarLog("Pronto para o estudo de Variáveis.");

