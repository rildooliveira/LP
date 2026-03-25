const ENDPOINT_API = "api.php";

/**
 * [ATIVIDADE 5] Blindagem de Erros Elegante (Try/Catch)
 * [ATIVIDADE 3] Auditoria de Comentários: Removidos comentários redundantes.
 */
async function carregarInventarioComSeguranca() {
    try {
        const resposta = await fetch(ENDPOINT_API);
        
        if (!resposta.ok) {
            throw new Error("O servidor respondeu com erro técnico.");
        }

        const dadosInvencoes = await resposta.json();
        
        if (dadosInvencoes.erro) {
            throw new Error(dadosInvencoes.erro);
        }
        
        renderizarGradeDeInvencoes(dadosInvencoes);

    } catch (erroSistema) {
        // [ATIVIDADE 1] Nome Significativo: erroSistema em vez de erro.
        console.error("Falha Crítica:", erroSistema.message);
        
        // [ATIVIDADE 5] Feedback educado ao usuário
        const mensagemAmigavel = "Poxa, nosso servidor está em manutenção. Tente novamente em breve!";
        mostrarErroInterface(mensagemAmigavel);
    }
}

/**
 * [ATIVIDADE 4] Padronização Visual e Indentação (Shift+Alt+F)
 */
function renderizarGradeDeInvencoes(listaProjetos) {
    const containerProjetos = document.querySelector("#lista-invencoes");
    
    if (listaProjetos.length === 0) {
        containerProjetos.innerHTML = "<p>Nenhum projeto encontrado no acervo.</p>";
        return;
    }

    // [ATIVIDADE 1] Nomes significativos e [ATIVIDADE 4] Aspas padronizadas
    containerProjetos.innerHTML = listaProjetos.map(projeto => {
        const descricaoStatus = projeto.esta_finalizado == 1 ? "Concluído" : "Em Desenvolvimento";
        const custoFormatado = parseFloat(projeto.custo_estimado).toFixed(2);
        
        return `
            <div class="card">
                <h3>${projeto.nome_projeto}</h3>
                <p><strong>Categoria:</strong> <span class="badge">${projeto.categoria}</span></p>
                <p><strong>Investimento:</strong> R$ ${custoFormatado}</p>
                <p><strong>Situação:</strong> ${descricaoStatus}</p>
            </div>
        `;
    }).join("");
}

function mostrarErroInterface(textoErro) {
    const container = document.querySelector("#lista-invencoes");
    container.innerHTML = `
        <div style="color: #c0392b; padding: 20px; border: 2px solid #c0392b; border-radius: 8px; background: #f9ebeb;">
            ⚠️ <strong>Aviso do Sistema:</strong> ${textoErro}
        </div>
    `;
}

// Início da execução
carregarInventarioComSeguranca();
