const buscarDados = async () => {
    const elBusca = document.querySelector("#input-busca");
    const elTabela = document.querySelector("#tabela-corpo");
    const elMsg = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");

    elMsg.innerText = "Consultando...";
    elTabela.innerHTML = "";

    try {
        // GET: O termo vai na URL
        const resposta = await fetch(`buscar_produtos.php?busca=${elBusca.value}`);
        const produtos = await resposta.json();

        if (produtos.length > 0) {
            elBox.className = "status-box sucesso";
            elMsg.innerText = `${produtos.length} registro(s) encontrado(s).`;

            produtos.forEach(p => {
                elTabela.innerHTML += `
                    <tr>
                        <td>${p.id}</td>
                        <td><strong>${p.nome}</strong></td>
                        <td>R$ ${parseFloat(p.preco).toFixed(2)}</td>
                        <td>${p.estoque} un</td>
                    </tr>`;
            });
        } else {
            elBox.className = "status-box erro";
            elMsg.innerText = "Nenhum resultado para esta busca.";
        }
    } catch (e) {
        elBox.className = "status-box erro";
        elMsg.innerText = "Erro na conexão.";
    }
};

document.querySelector("#btn-buscar").addEventListener("click", buscarDados);
