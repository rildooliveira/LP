document.querySelector("#btn-verificar").addEventListener("click", async () => {
    const elMensagem = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");
    const btn = document.querySelector("#btn-verificar");

    // Feedback visual imediato
    elMensagem.innerText = "Consultando Servidor...";
    btn.disabled = true;

    try {
        // Chamando a ponte PHP (Back-end)
        const resposta = await fetch("testar_db.php");
        const dados = await resposta.json();

        if (dados.status === "sucesso") {
            elBox.className = "status-box sucesso";
            elMensagem.innerText = "✅ " + dados.mensagem;
        } else {
            elBox.className = "status-box erro";
            elMensagem.innerText = "❌ " + dados.mensagem;
        }
    } catch (erro) {
        elBox.className = "status-box erro";
        elMensagem.innerText = "❌ Falha crítica na requisição.";
    } finally {
        btn.disabled = false;
    }
});
