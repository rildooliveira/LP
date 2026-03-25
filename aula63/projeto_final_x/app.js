const ENDPOINT_LER = "api_ler.php"; 
const ENDPOINT_INSERIR = "api_inserir.php"; 

// ==========================================
// MÓDULO 1: LEITURA (READ)
// ==========================================
async function carregarInventario() {
    try {
        const resposta = await fetch(ENDPOINT_LER);
        const dados = await resposta.json();
        renderizarInvencoes(dados);
    } catch (erro) {
        mostrarErroNaTela(erro.message);
    }
}

function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma invenção cadastrada.</p>";
        return;
    }
    container.innerHTML = lista.map(item => `
        <div class="card">
            <h3>${item.nome_projeto}</h3>
            <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
            <p><strong>Custo:</strong> R$ ${parseFloat(item.custo_estimado).toFixed(2)}</p>
        </div>
    `).join('');
}

// ==========================================
// MÓDULO 2: CADASTRO (CREATE) - [ATIVIDADES 2, 3, 4, 5]
// ==========================================
document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    
    // [ATIVIDADE 2] Impede o recarregamento da página (F5)
    evento.preventDefault(); 
    
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");
    
    // [ATIVIDADE 4] Feedback Visual: Botão desativado para evitar duplicidade
    btnSalvar.innerText = "Salvando...";
    btnSalvar.disabled = true;

    // [ATIVIDADE 3] Atalho FormData: Captura todos os campos de uma vez usando 'this'
    const dadosFormulario = new FormData(this);

    try {
        const resposta = await fetch(ENDPOINT_INSERIR, {
            method: "POST",
            body: dadosFormulario
        });

        const resultado = await resposta.json();
        if (resultado.erro) throw new Error(resultado.erro);

        // Sucesso: Limpa o formulário e avisa o usuário
        divMensagem.style.color = "green";
        divMensagem.innerText = "✅ " + resultado.sucesso;
        this.reset(); 

        // [ATIVIDADE 5] Atualização em tempo real: Chama a leitura sem recarregar!
        carregarInventario();

    } catch (erro) {
        divMensagem.style.color = "red";
        divMensagem.innerText = "❌ " + erro.message;
    } finally {
        // Restaura o botão após 3 segundos
        setTimeout(() => {
            btnSalvar.innerText = "Cadastrar Projeto";
            btnSalvar.disabled = false;
            divMensagem.innerText = "";
        }, 3000);
    }
});

// Inicialização
carregarInventario();
