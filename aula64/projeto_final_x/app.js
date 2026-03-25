const ENDPOINT_LER = "api_ler.php"; 

/* * 🐛 BUG 1 RESOLVIDO (Atividade 2: Network / Erro 404):
 * O código original apontava para "api_inserirr.php" (com dois 'R').
 * O navegador mostrava status 404 na aba Network.
 */
// ORIGINAL (com erro): const ENDPOINT_INSERIR = "api_inserirr.php"; 
const ENDPOINT_INSERIR = "api_inserir.php"; // CORRIGIDO

async function carregarInventario() {
    try {
        const resposta = await fetch(ENDPOINT_LER);
        const dados = await resposta.json();
        renderizarInvencoes(dados);
    } catch (erro) {
        document.querySelector("#lista-invencoes").innerHTML = 
        `<p style="color:red">Erro crítico: ${erro.message}</p>`;
    }
}

function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma invenção encontrada.</p>";
        return;
    }

    container.innerHTML = lista.map(item => {
        /* * 🐛 BUG 2 RESOLVIDO (Atividade 1: console.log):
         * O título aparecia "undefined". Usamos console.log(item) e vimos que
         * a propriedade enviada pelo banco se chama "nome_projeto", não "nome_da_invencao".
         */
        // ORIGINAL (com erro): <h3>${item.nome_da_invencao}</h3> 
        return `
            <div class="card">
                <h3>${item.nome_projeto}</h3>  <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
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

    /* * [ATIVIDADE 4] O debugger; pode ser inserido aqui para pausar a tela 
     * e inspecionar a variável 'this' (o formulário) e 'dadosFormulario'.
     */
    // debugger; 

    /*
     * [ATIVIDADE 5] Proteção Silenciosa: Se o Try/Catch for removido e o Apache cair,
     * o botão trava em "Salvando..." eternamente. O catch garante a recuperação da interface.
     */
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
