document.querySelector("#btn-vincular").addEventListener("click", async () => {
    const elNome = document.querySelector("#nome-produto");
    const elCat = document.querySelector("#select-categoria");
    const elMensagem = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");

    if (!elNome.value || !elCat.value) {
        elBox.className = "status-box erro";
        elMsg.innerText = "⚠️ Selecione o produto e a categoria!";
        return;
    }

    elMsg.innerText = "Validando vínculo no MySQL...";

    const dados = new FormData();
    dados.append("nome", elNome.value);
    dados.append("categoria_id", elCat.value);

    try {
        const resposta = await fetch("salvar_relacional.php", { method: "POST", body: dados });
        const res = await resposta.json();

        if (res.status === "sucesso") {
            elBox.className = "status-box sucesso";
            elMensagem.innerText = `✅ ${res.mensagem}`;
        } else {
            elBox.className = "status-box erro";
            elMensagem.innerText = `❌ Falha: ${res.mensagem}`;
        }
    } catch (e) {
        elBox.className = "status-box erro";
        elMensagem.innerText = "❌ Erro de conexão.";
    }
});
