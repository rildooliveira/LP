// URL centralizada para não repetir strings no código
const ENDPOINT_API = "api.php";

/**
 * Função responsável APENAS por buscar os dados no servidor.
 */
async function carregarInventario() {
    try {
        const resposta = await fetch(ENDPOINT_API);
        
        // Verifica se a resposta HTTP não foi OK (ex: erro 500 do PHP)
        if (!resposta.ok) {
            throw new Error("Servidor indisponível no momento.");
        }

        const dados = await resposta.json();
        
        // Se o PHP mandar uma mensagem de erro controlada
        if (dados.erro) {
            throw new Error(dados.erro);
        }
        
        // Passa os dados para a função responsável por desenhar a tela
        renderizarInvencoes(dados);

    } catch (erro) {
        console.error("Falha na operação:", erro.message);
        mostrarErroNaTela(erro.message);
    }
}

/**
 * Função responsável APENAS por injetar os dados no HTML.
 * (Princípio da Responsabilidade Única)
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
 * Função de fallback para alertar o usuário sem popups irritantes.
 */
function mostrarErroNaTela(mensagem) {
    const container = document.querySelector("#lista-invencoes");
    container.innerHTML = `
        <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 8px;">
            ⚠️ <strong>Erro:</strong> ${mensagem}
        </div>
    `;
}

// Inicia o processo assim que o arquivo é lido
carregarInventario();
