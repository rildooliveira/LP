/**
 * Motor Front-end: Mestres da Invenção
 * Padrões aplicados: Fetch API, Async/Await, SRP (Single Responsibility Principle)
 */

// 1. Dicionário de Endpoints (Centraliza as rotas da API)
const API = {
    LER: "api_ler.php",
    INSERIR: "api_inserir.php",
    EXCLUIR: "api_excluir.php?id=",
    ATUALIZAR: "api_atualizar_status.php?id="
};

// ==========================================
// MÓDULO: LEITURA (READ)
// ==========================================
async function carregarInventario() {
    try {
        const resposta = await fetch(API.LER);
        const dados = await resposta.json();
        
        if (dados.erro) throw new Error(dados.erro);
        
        renderizarInvencoes(dados);
        atualizarContador(dados.length);

    } catch (erro) {
        mostrarErroGlobal(erro.message);
    }
}

// Responsabilidade Única: Apenas itera a lista e injeta na tela
function renderizarInvencoes(lista) {
    const container = document.querySelector("#lista-invencoes");
    
    if (lista.length === 0) {
        container.innerHTML = "<div class='vazio'>🚀 Nenhuma invenção no acervo ainda. Comece a criar!</div>";
        return;
    }
    
    container.innerHTML = lista.map(item => criarCardHTML(item)).join('');
}

// Extração de Função: Especialista apenas em estruturar o visual do Card
function criarCardHTML(item) {
    const isConcluido = item.esta_finalizado == 1;
    const classeCard = isConcluido ? "concluido" : "andamento";
    const statusTexto = isConcluido ? "Concluído" : "Em Andamento";
    
    // Formatação de moeda nativa do JavaScript
    const valorFormatado = parseFloat(item.custo_estimado).toLocaleString('pt-BR', { minimumFractionDigits: 2 });
    
    return `
        <div class="card ${classeCard}">
            <h3>${item.nome_projeto}</h3>
            <p><strong>Categoria:</strong> <span class="badge">${item.categoria}</span></p>
            <p><strong>Custo:</strong> R$ ${valorFormatado}</p>
            <p><strong>Status:</strong> ${statusTexto}</p>
            
            <div class="acoes-card">
                <button class="btn-status" onclick="alternarStatus(${item.id})" title="Alterar Status">
                    ${isConcluido ? '↺ Reabrir' : '✓ Concluir'}
                </button>
                <button class="btn-excluir" onclick="excluirInvencao(${item.id})" title="Excluir Projeto">Excluir</button>
            </div>
        </div>
    `;
}

function atualizarContador(total) {
    document.querySelector("#contador-projetos").innerText = `${total} Projeto${total !== 1 ? 's' : ''}`;
}

// ==========================================
// MÓDULO: CADASTRO (CREATE)
// ==========================================
document.querySelector("#form-invencao").addEventListener("submit", async function(evento) {
    evento.preventDefault(); // Impede o reload da página
    
    const btnSalvar = document.querySelector("#btn-salvar");
    const divMensagem = document.querySelector("#mensagem-form");

    // Feedback visual de carregamento
    btnSalvar.innerText = "Processando...";
    btnSalvar.disabled = true;
    divMensagem.className = "mensagem-oculta"; // Reseta mensagens anteriores

    try {
        const resposta = await fetch(API.INSERIR, { 
            method: "POST", 
            body: new FormData(this) // Captura todos os inputs automaticamente
        });
        
        const resultado = await resposta.json();
        
        if (!resposta.ok || resultado.erro) throw new Error(resultado.erro || "Erro desconhecido ao salvar.");
        
        // Caminho Feliz
        mostrarMensagemForm(resultado.sucesso, "sucesso");
        this.reset(); // Limpa os campos
        document.querySelector("#nome").focus(); // Retorna o cursor para o primeiro campo
        
        carregarInventario(); // Atualiza a grid em tempo real

    } catch (erro) {
        mostrarMensagemForm(erro.message, "erro");
    } finally {
        // Libera o botão independente de sucesso ou falha
        btnSalvar.innerText = "Cadastrar no Acervo";
        btnSalvar.disabled = false;
    }
});

function mostrarMensagemForm(texto, tipo) {
    const divMensagem = document.querySelector("#mensagem-form");
    divMensagem.innerText = texto;
    divMensagem.className = tipo === "sucesso" ? "msg-sucesso" : "msg-erro";
    
    // Esconde a mensagem suavemente após 4 segundos
    setTimeout(() => { divMensagem.className = "mensagem-oculta"; }, 4000);
}

// ==========================================
// MÓDULOS: ATUALIZAÇÃO E EXCLUSÃO (UPDATE & DELETE)
// ==========================================
async function excluirInvencao(id) {
    // UX Safe Delete: Protege o usuário de cliques acidentais (Early Return)
    if (!confirm("⚠️ Atenção: Tem certeza que deseja excluir esta invenção permanentemente?")) return;
    
    try { 
        const resposta = await fetch(API.EXCLUIR + id);
        const resultado = await resposta.json();
        
        if (resultado.erro) throw new Error(resultado.erro);
        
        carregarInventario(); 
    } catch (erro) { 
        alert("Erro na exclusão: " + erro.message); 
    }
}

async function alternarStatus(id) {
    try { 
        const resposta = await fetch(API.ATUALIZAR + id);
        const resultado = await resposta.json();
        
        if (resultado.erro) throw new Error(resultado.erro);
        
        carregarInventario(); 
    } catch (erro) { 
        alert("Erro ao atualizar status: " + erro.message); 
    }
}

function mostrarErroGlobal(msg) {
    document.querySelector("#lista-invencoes").innerHTML = `
        <div class="msg-erro" style="grid-column: 1 / -1; padding: 20px; text-align: center;">
            <strong>Falha Crítica:</strong> ${msg}
        </div>`;
}

// ==========================================
// INICIALIZAÇÃO DO SISTEMA
// ==========================================
carregarInventario();
