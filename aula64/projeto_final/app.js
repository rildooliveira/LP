/**
 * @file app.js
 * @description Módulo principal de Front-end para o CRUD "Mestres da Invenção".
 * Responsável por gerenciar a interface, buscar dados e enviar formulários via Fetch API.
 * @version 1.0.0
 * @author Seu Nome
 */

const ENDPOINT_LER = "api_ler.php"; 
const ENDPOINT_INSERIR = "api_inserir.php"; 

/**
 * Busca a lista de invenções no servidor (Back-end) e aciona a renderização na tela.
 * @async
 * @function carregarInventario
 * @throws {Error} Dispara um erro se o servidor estiver fora do ar ou o PHP retornar falha.
 * @returns {Promise<void>} Não retorna valor, apenas atualiza o DOM.
 */
async function carregarInventario() {
    try {
        const resposta = await fetch(ENDPOINT_LER);
        if (!resposta.ok) throw new Error("Servidor indisponível no momento.");

        const dados = await resposta.json();
        if (dados.erro) throw new Error(dados.erro);
        
        renderizarInvencoes(dados);
    } catch (erro) {
        mostrarErroNaTela(erro.message);
    }
}

/**
 * Recebe o array de dados do banco e constrói os cards em HTML (A interface visual).
 * @function renderizarInvencoes
 * @param {Array<Object>} lista - Array de objetos contendo as invenções do banco.
 * @param {number} lista[].id - ID único da invenção.
 * @param {string} lista[].nome_projeto - Nome oficial do projeto.
 * @param {string} lista[].categoria - Setor de atuação (ex: Energia, Mobilidade).
 * @param {number} lista[].custo_estimado - Valor financeiro necessário.
 * @param {number} lista[].esta_finalizado - Boolean disfarçado de TINYINT (0 ou 1).
 */
function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma invenção cadastrada ainda.</p>";
        return;
    }

    container.innerHTML = lista.map(item => {
        const status = item.esta_finalizado == 1 ? "Concluído" : "Em Andamento";
        const valorFormatado = parseFloat(item.custo_estimado).toFixed(2);
        
        return `
            <div class="card">
                <h3>${item.nome_projeto}</h3> 
                <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
                <p><strong>Custo:</strong> R$ ${valorFormatado}</p>
                <p><strong>Status:</strong> ${status}</p>
            </div>
        `;
    }).join('');
}

/**
 * Exibe uma mensagem amigável de erro na interface caso a comunicação falhe.
 * @function mostrarErroNaTela
 * @param {string} mensagem - O texto descritivo do erro a ser exibido.
 */
function mostrarErroNaTela(mensagem) {
    document.querySelector("#lista-invencoes").innerHTML = `
        <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 8px;">
            ⚠️ <strong>Erro do Sistema:</strong> ${mensagem}
        </div>
    `;
}

/**
 * Escuta o evento de envio (submit) do formulário de cadastro, previne o recarregamento
 * da página e envia os dados via POST para a API.
 * @event submit
 */
document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    evento.preventDefault(); 
    
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");
    
    btnSalvar.innerText = "Salvando...";
    btnSalvar.disabled = true;

    // Coleta automaticamente todos os inputs com o atributo 'name'
    const dadosFormulario = new FormData(this);

    try {
        const resposta = await fetch(ENDPOINT_INSERIR, { method: "POST", body: dadosFormulario });
        const resultado = await resposta.json();

        if (resultado.erro) throw new Error(resultado.erro);

        divMensagem.style.color = "green";
        divMensagem.innerText = "✅ " + resultado.sucesso;
        this.reset(); 
        carregarInventario();
    } catch (erro) {
        divMensagem.style.color = "red";
        divMensagem.innerText = "❌ " + erro.message;
    } finally {
        btnSalvar.innerText = "Cadastrar Carta";
        btnSalvar.disabled = false;
        setTimeout(() => { divMensagem.innerText = ""; }, 3000);
    }
});

// Inicializa o sistema buscando os dados ao carregar o arquivo
carregarInventario();
