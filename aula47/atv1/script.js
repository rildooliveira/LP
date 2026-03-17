// 1. Capturar o elemento do título
const tituloPrincipal = document.getElementById("titulo");

// 2. Alterar o texto do título em tempo real
tituloPrincipal.innerText = "Monitoramento Industrial Ativo";


// 1. Capturar a mensagem
const msgStatus = document.getElementById("mensagem");

// 2. Alterar a cor da fonte via propriedade style
msgStatus.style.color = "blue";
msgStatus.style.fontWeight = "bold";


// 1. Capturar a caixa de alerta
const caixa = document.getElementById("caixa-status");

// 2. Adicionar uma nova classe CSS para mudar todo o visual de uma vez
caixa.classList.add("sucesso");

// 3. Atualizar o texto interno para confirmar a mudança
msgStatus.innerText = "Status Atualizado: Sistema Operacional com Sucesso!";


// SISTEMA DE ATUALIZAÇÃO DE INTERFACE DINÂMICA

// Mapeando elementos para variáveis
const elTitulo = document.querySelector("#titulo");
const elCaixa = document.querySelector("#caixa-status");
const elMensagem = document.querySelector("#mensagem");

// Função simulando uma resposta de servidor
const atualizarInterface = () => {
    // Mudando o conteúdo
    elTitulo.innerHTML = "Controle de <u>Qualidade</u>";
    
    // Mudando estilo de forma organizada (via Classe)
    elCaixa.classList.add("sucesso");
    
    // Mudando estilo direto (para ajustes finos)
    elMensagem.innerText = "Análise concluída: 100% de conformidade.";
    elMensagem.style.fontSize = "1.2rem";
};

// Executando a atualização (em aulas futuras, isso será via botão)
atualizarInterface();
