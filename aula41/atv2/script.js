/**
 * Função de Validação Técnica
 * Objetivo: Garantir que os dados da patente cumpram os requisitos mínimos.
 */

// 1. A Função Especialista (Recebe parâmetros e retorna um Booleano)
function validarDadosPatente(titulo, categoria, resumo) {
    // Regra 1: O título não pode estar vazio
    if (titulo.length === 0) {
        return { valido: false, msg: "O título da invenção é obrigatório." };
    }

    // Regra 2: A categoria deve ser selecionada
    if (categoria === "") {
        return { valido: false, msg: "Selecione o tipo de patente (PI ou MU)." };
    }

    // Regra 3: O resumo deve ter profundidade técnica (mínimo 20 caracteres)
    if (resumo.length < 20) {
        return { valido: false, msg: "O resumo está muito curto para uma análise técnica." };
    }

    // Se passou por tudo, retorna sucesso
    return { valido: true, msg: "Dados validados! Enviando ao banco de dados..." };
}

// 2. Função de Interface (Gerencia o clique do botão)
function executarCadastro() {
    const titulo = document.getElementById("titulo").value;
    const categoria = document.getElementById("categoria").value;
    const resumo = document.getElementById("resumo").value;
    const feedback = document.getElementById("feedback");

    // Chamamos a nossa função especialista
    const resultado = validarDadosPatente(titulo, categoria, resumo);

    // Exibimos o feedback para o usuário baseado no retorno da função
    feedback.innerText = resultado.msg;
    feedback.style.color = resultado.valido ? "#28a745" : "#dc3545";

    if (resultado.valido) {
        console.log("Processo enviado para auditoria interna.");
    }
}
