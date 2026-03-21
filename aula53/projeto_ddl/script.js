// Capturando o novo botão de DDL
document.querySelector("#btn-criar-tabela").addEventListener("click", async () => {
    const elMensagem = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");
    const btn = document.querySelector("#btn-criar-tabela");

    elMensagem.innerText = "Executando DDL no MySQL...";
    btn.disabled = true;

    try {
        // ATUALIZAÇÃO: Apontando para o script de criação de estrutura
        const resposta = await fetch("criar_tabela.php");
        const dados = await resposta.json();

        if (dados.status === "sucesso") {
            elBox.className = "status-box sucesso";
            elMensagem.innerText = "🚀 " + dados.mensagem;
        } else {
            elBox.className = "status-box erro";
            elMensagem.innerText = "❌ Erro DDL: " + dados.mensagem;
        }
    } catch (erro) {
        elBox.className = "status-box erro";
        elMensagem.innerText = "❌ Falha na comunicação com o script PHP.";
    } finally {
        btn.disabled = false;
    }
});
