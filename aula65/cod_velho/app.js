const API_LER = "api_ler.php";
const API_INSERIR = "api_inserir.php";
const API_EXCLUIR = "api_excluir.php?id=";
const API_ATUALIZAR = "api_atualizar_status.php?id=";

async function carregarInventario() {
    try {
        const resposta = await fetch(API_LER);
        const dados = await resposta.json();
        if (dados.erro) throw new Error(dados.erro);
        
        // SINTOMA 3: A função abaixo faz coisas demais!
        const container = document.querySelector("#lista-invencoes");
        if (dados.length === 0) {
            container.innerHTML = "<p>Nenhuma invenção cadastrada.</p>";
            return;
        }
        
        container.innerHTML = dados.map(item => {
            // SINTOMA 4: Código verboso para uma checagem simples
            let status = "";
            if (item.esta_finalizado == 1) {
                status = "Concluído";
            } else {
                status = "Em Andamento";
            }
            
            return `
                <div class="card">
                    <h3>${item.nome_projeto}</h3>
                    <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
                    <p><strong>Custo:</strong> R$ ${parseFloat(item.custo_estimado).toFixed(2)}</p>
                    <p><strong>Status:</strong> ${status}</p>
                    <div class="acoes-card">
                        <button class="btn-status" onclick="alternarStatus(${item.id})">Mudar Status</button>
                        <button class="btn-excluir" onclick="excluirInvencao(${item.id})">Excluir</button>
                    </div>
                </div>
            `;
        }).join('');

    } catch (erro) {
        document.querySelector("#lista-invencoes").innerHTML = `<p style="color:red">Erro: ${erro.message}</p>`;
    }
}

document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    evento.preventDefault();
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");

    btnSalvar.innerText = "Salvando...";
    btnSalvar.disabled = true;

    try {
        const resposta = await fetch(API_INSERIR, { method: "POST", body: new FormData(this) });
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

async function excluirInvencao(id) {
    if(!confirm("Excluir invenção?")) return;
    try { await fetch(API_EXCLUIR + id); carregarInventario(); } 
    catch (erro) { alert("Erro."); }
}

async function alternarStatus(id) {
    try { await fetch(API_ATUALIZAR + id); carregarInventario(); } 
    catch (erro) { alert("Erro."); }
}

carregarInventario();
