document.querySelector("#btn-vincular").addEventListener("click", async () => {
    // 1. Declaração das variáveis
    const elNome = document.querySelector("#nome-produto");
    const elCat = document.querySelector("#select-categoria");
    const elMensagem = document.querySelector("#mensagem"); // Nome definido aqui!
    const elBox = document.querySelector("#status-container");

    // 2. Validação de campos vazios
    if (!elNome.value || !elCat.value) {
        elBox.className = "status-box erro";
        elMensagem.innerText = "⚠️ Selecione o produto e a categoria!"; // Usando o nome correto
        return;
    }

    // 3. Feedback visual (A LINHA 13 QUE DAVA ERRO FOI CORRIGIDA)
    elMensagem.innerText = "Validando vínculo no MySQL...";

    // 4. Empacotando os dados
    const dados = new FormData();
    dados.append("nome", elNome.value);
    dados.append("categoria_id", elCat.value);

    // 5. Envio para o PHP (Back-end)
    try {
        const resposta = await fetch("salvar_relacional.php", { 
            method: "POST", 
            body: dados 
        });
        const res = await resposta.json();

        // 6. Tratamento da resposta
        if (res.status === "sucesso") {
            elBox.className = "status-box sucesso";
            elMensagem.innerText = `✅ ${res.mensagem}`;
        } else {
            elBox.className = "status-box erro";
            elMensagem.innerText = `❌ Falha: ${res.mensagem}`;
        }
    } catch (e) {
        // 7. Erro de servidor fora do ar
        elBox.className = "status-box erro";
        elMensagem.innerText = "❌ Erro de conexão com o servidor.";
    }
});