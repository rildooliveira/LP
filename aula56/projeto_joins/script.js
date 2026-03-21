const gerarRelatorio = async (tipoJoin) => {
    const elTabela = document.querySelector("#corpo-relatorio");
    const elMensagem = document.querySelector("#mensagem");
    const rodape = document.querySelector(".status-footer");

    // Altera o estado visual dos botões
    document.querySelectorAll('.btn').forEach(b => b.classList.remove('active'));
    document.querySelector(`#btn-${tipoJoin}`).classList.add('active');

    elMensagem.innerText = `Buscando dados no servidor (${tipoJoin.toUpperCase()})...`;
    rodape.classList.remove('status-erro');
    elTabela.innerHTML = "";

    try {
        const resposta = await fetch(`api_joins.php?tipo=${tipoJoin}`);
        const dados = await resposta.json();

        if (dados.erro) throw new Error(dados.erro);

        if (dados.length > 0) {
            elMensagem.innerText = `Consulta finalizada: ${dados.length} 
            itens encontrados.`;

            dados.forEach(item => {
                // Tratamento elegante para valores Nulos (Clean Code)
                const categoriaHtml = item.categoria_nome 
                    ? item.categoria_nome 
                    : '<span class="badge-null">Não Categorizado</span>';
                
                elTabela.innerHTML += `
                    <tr>
                        <td><strong>${item.produto_nome}</strong></td>
                        <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
                        <td>${categoriaHtml}</td>
                    </tr>`;
            });
        } else {
            elMensagem.innerText = "Nenhum dado retornado da consulta.";
        }
    } catch (e) {
        rodape.classList.add('status-erro');
        elMensagem.innerText = `Falha Crítica: ${e.message}`;
    }
};

document.querySelector("#btn-inner").addEventListener("click", () => gerarRelatorio('inner'));
document.querySelector("#btn-left").addEventListener("click", () => gerarRelatorio('left'));

// Auto-carregar dados ao abrir a página
window.onload = () => gerarRelatorio('inner');
