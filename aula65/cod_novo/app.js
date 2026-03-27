// REFATORAÇÃO 3: Secando o código criando um Dicionário de Rotas.
const API = {
    LER: "api_ler.php",
    INSERIR: "api_inserir.php",
    EXCLUIR: "api_excluir.php?id=",
    ATUALIZAR: "api_atualizar_status.php?id="
};

async function carregarInventario() {
    try {
        const resposta = await fetch(API.LER);
        const dados = await resposta.json();
        if (dados.erro) throw new Error(dados.erro);
        renderizarInvencoes(dados);
    } catch (erro) {
        mostrarErroGlobal(erro.message);
    }
}

// REFATORAÇÃO 4: Responsabilidade Única. Esta função SÓ gerencia a lista.
function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma invenção cadastrada.</p>";
        return;
    }
    // A montagem visual foi isolada na função criarCardHTML.
    container.innerHTML = lista.map(item => criarCardHTML(item)).join('');
}

// REFATORAÇÃO 5: Extração. Esta função é especialista apenas em gerar HTML.
function criarCardHTML(item) {
    // REFATORAÇÃO 6: Operador Ternário reduz 6 linhas de IF em apenas 1.
    const status = (item.esta_finalizado == 1) ? "Concluído" : "Em Andamento";
    const valorFormatado = parseFloat(item.custo_estimado).toFixed(2);
    
    return `
        <div class="card">
            <h3>${item.nome_projeto}</h3>
            <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
            <p><strong>Custo:</strong> R$ ${valorFormatado}</p>
            <p><strong>Status:</strong> ${status}</p>
            <div class="acoes-card">
                <button class="btn-status" onclick="alternarStatus(${item.id})">Mudar Status</button>
                <button class="btn-excluir" onclick="excluirInvencao(${item.id})">Excluir</button>
            </div>
        </div>
    `;
}

document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    evento.preventDefault();
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");

    btnSalvar.innerText = "Salvando...";
    btnSalvar.disabled = true;

    try {
        const resposta = await fetch(API.INSERIR, { method: "POST", body: new FormData(this) });
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

// Ações isoladas chamando o dicionário da API
async function excluirInvencao(id) {
    if(!confirm("Tem certeza que deseja excluir esta invenção?")) return;
    try { await fetch(API.EXCLUIR + id); carregarInventario(); } 
    catch (erro) { alert("Erro ao excluir."); }
}

async function alternarStatus(id) {
    try { await fetch(API.ATUALIZAR + id); carregarInventario(); } 
    catch (erro) { alert("Erro ao atualizar status."); }
}

function mostrarErroGlobal(msg) {
    document.querySelector("#lista-invencoes").innerHTML = `<p style="color:red">Erro: ${msg}</p>`;
}

carregarInventario();
