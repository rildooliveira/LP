document.querySelector("#btn-testar").addEventListener("click", async () => {
    const tipoTeste = document.querySelector("#tipo-teste").value;
    const valorBusca = document.querySelector("#valor-busca").value;
    
    const elTempo = document.querySelector("#tempo-sql");
    const elLinhas = document.querySelector("#linhas-analisadas");
    const elTipoBusca = document.querySelector("#tipo-busca");
    const elMsg = document.querySelector("#mensagem");
    const elBox = document.querySelector("#status-container");

    if (!valorBusca) {
        elBox.className = "status-box erro";
        elMsg.innerText = "⚠️ Digite um valor para testar!";
        return;
    }

    elBox.className = "status-box standby";
    elMsg.innerText = "Analisando plano de execução no MySQL...";

    try {
        // Envia o tipo de teste e o valor para o PHP
        const resposta = await fetch(`testar_index.php?tipo=${tipoTeste}&valor=${valorBusca}`);
        const dados = await resposta.json();

        elTempo.innerText = dados.tempo_execucao + "s";
        elLinhas.innerText = dados.analise.rows;
        elTipoBusca.innerText = dados.analise.type;
        
        // Avaliação visual da performance
        if (dados.analise.type === 'ALL') {
            elBox.className = "status-box erro";
            elMsg.innerText = "⚠️ ALERTA: Full Table Scan detectado (Falta de Índice)!";
        } else {
            elBox.className = "status-box sucesso";
            elMsg.innerText = "🚀 OTIMIZADO: O MySQL usou a árvore de Busca!";
        }
    } catch (e) {
        elBox.className = "status-box erro";
        elMsg.innerText = "❌ Erro ao conectar com o banco de dados.";
    }
});
