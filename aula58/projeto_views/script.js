document.querySelector("#btn-carregar-view").addEventListener("click", async () => {
    const elTabela = document.querySelector("#corpo-view");
    const elMensagem = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");

    elMensagem.innerText = "Chamando View 'v_lista_produtos'...";
    elTabela.innerHTML = "";

    try {
        const resposta = await fetch("chamar_view.php");
        const dados = await resposta.json();

        if (dados.length > 0) {
            elBox.className = "status-box sucesso";
            elMensagem.innerText = "Dados recuperados com sucesso via View!";

            dados.forEach(item => {
                elTabela.innerHTML += `
                    <tr>
                        <td><strong>${item.produto}</strong></td>
                        <td>${item.categoria}</td>
                        <td>R$ ${parseFloat(item.preco).toFixed(2)}</td>
                    </tr>
                `;
            });
        }
    } catch (e) {
        elBox.className = "status-box erro";
        elMensagem.innerText = "Erro ao acessar a View no servidor.";
    }
});
