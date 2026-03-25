const ENDPOINT_LER = "api_ler.php"; 
// 🐛 BUG 1: Erro de digitação na URL do arquivo PHP.
const ENDPOINT_INSERIR = "api_inserirr.php"; 

async function carregarInventario() {
    try {
        const resposta = await fetch(ENDPOINT_LER);
        const dados = await resposta.json();
        renderizarInvencoes(dados);
    } catch (erro) {
        document.querySelector("#lista-invencoes").innerHTML = `<p style="color:red">Erro crítico: ${erro.message}</p>`;
    }
}

function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma invenção encontrada.</p>";
        return;
    }

    container.innerHTML = lista.map(item => {
        // 🐛 BUG 2: Tentando imprimir uma propriedade que o banco não envia.
        return `
            <div class="card">
                <h3>${item.nome_da_invencao}</h3> 
                <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
                <p><strong>Custo:</strong> R$ ${item.custo_estimado}</p>
            </div>
        `;
    }).join('');
}

document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    evento.preventDefault(); 
    
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");
    
    btnSalvar.innerText = "Salvando...";
    btnSalvar.disabled = true;

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

carregarInventario();
