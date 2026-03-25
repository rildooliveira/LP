document.querySelector("#btn-backup").addEventListener("click", async () => {
    const elMsg = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");

    // 1. Muda o status visual para informar que o processo começou
    elBox.className = "status-box carregando";
    elMsg.innerText = "⏳ Compactando banco de dados... Aguarde.";

    try {
        // 2. Chama o backend PHP para fazer o serviço pesado
        const resposta = await fetch("gerar_backup.php");
        const dados = await resposta.json();

        // 3. Trata a resposta do servidor
        if (dados.status === "sucesso") {
            elBox.className = "status-box sucesso";
            elMsg.innerText = `✅ Seguro! Arquivo gerado: ${dados.arquivo}`;
        } else {
            elBox.className = "status-box erro";
            elMsg.innerText = `❌ Falha no Backup: ${dados.mensagem}`;
        }
    } catch (e) {
        elBox.className = "status-box erro";
        elMsg.innerText = "❌ Erro de conexão com o servidor de banco de dados.";
    }
});
