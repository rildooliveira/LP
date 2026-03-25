// --- CONFIGURAÇÕES DE ENDPOINTS ---
// Com a modularização do PHP, agora temos rotas separadas para Ler e Inserir
const ENDPOINT_LER = "api_ler.php"; 
const ENDPOINT_INSERIR = "api_inserir.php"; 

// ==========================================
// MÓDULO 1: LEITURA (READ)
// ==========================================

async function carregarInventario() {
    try {
        const resposta = await fetch(ENDPOINT_LER);
        if (!resposta.ok) throw new Error("Servidor indisponível no momento.");

        const dados = await resposta.json();
        if (dados.erro) throw new Error(dados.erro);
        
        renderizarInvencoes(dados);
    } catch (erro) {
        console.error("Falha na operação:", erro.message);
        mostrarErroNaTela(erro.message);
    }
}

function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    
    if (lista.length === 0) {
        container.innerHTML = "<p>Nenhuma invenção cadastrada ainda.</p>";
        return;
    }

    // Mapeia os dados do banco e constrói o HTML dos cards
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

function mostrarErroNaTela(mensagem) {
    document.querySelector("#lista-invencoes").innerHTML = `
        <div style="color: red; padding: 20px; border: 1px solid red; border-radius: 8px;">
            ⚠️ <strong>Erro:</strong> ${mensagem}
        </div>
    `;
}

// ==========================================
// MÓDULO 2: CADASTRO (CREATE) - AULA 62
// ==========================================

// Captura o momento em que o usuário clica em "Cadastrar"
document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    
    // 1. REGRA DE OURO DA SPA: Impede a página de piscar/recarregar
    evento.preventDefault(); 
    
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");
    
    // 2. Feedback visual de que o sistema está trabalhando
    btnSalvar.innerText = "Salvando...";
    btnSalvar.disabled = true;

    // 3. Captura automaticamente todos os campos do formulário (que possuam 'name')
    const dadosFormulario = new FormData(this);

    try {
        // 4. Envia os dados via POST para o PHP responsável por salvar
        const resposta = await fetch(ENDPOINT_INSERIR, {
            method: "POST",
            body: dadosFormulario
        });

        const resultado = await resposta.json();

        // Se o PHP retornar erro (ex: campo vazio), lança a exceção
        if (resultado.erro) throw new Error(resultado.erro);

        // 5. Sucesso! Mostra mensagem verde e limpa os campos do formulário
        divMensagem.style.color = "green";
        divMensagem.innerText = "✅ " + resultado.sucesso;
        this.reset(); 

        // 6. O GRANDE TRUQUE: Chama a função de leitura novamente!
        // Isso faz o novo card aparecer na tela instantaneamente.
        carregarInventario();

    } catch (erro) {
        // Se algo der errado, mostra a mensagem em vermelho
        divMensagem.style.color = "red";
        divMensagem.innerText = "❌ " + erro.message;
    } finally {
        // 7. Independente de dar certo ou errado, destrava o botão
        btnSalvar.innerText = "Cadastrar Projeto";
        btnSalvar.disabled = false;
        
        // Apaga a mensagem após 3 segundos para limpar a interface
        setTimeout(() => { divMensagem.innerText = ""; }, 3000);
    }
});

// ==========================================
// INICIALIZAÇÃO
// ==========================================
// Dispara a busca dos dados assim que o arquivo JavaScript é lido pelo navegador
carregarInventario();
