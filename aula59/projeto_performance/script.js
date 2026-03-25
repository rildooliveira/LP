document.querySelector("#btn-testar").addEventListener("click", async () => {
    const nome = document.querySelector("#busca-nome").value;
    const elTempo = document.querySelector("#tempo-sql");
    const elLinhas = document.querySelector("#linhas-analisadas");
    const elMsg = document.querySelector("#mensagem");

    elMsg.innerText = "Analisando plano de execução...";

    try {
        const resposta = await fetch(`testar_index.php?nome=${nome}`);
        const dados = await resposta.json();

        elTempo.innerText = dados.tempo_execucao + "s";
        elLinhas.innerText = dados.analise.rows;
        
        if(dados.analise.type === 'ALL') {
            document.querySelector("#status-container").className = "status-box erro";
            elMsg.innerText = "⚠️ Alerta: Busca Lenta (Sem Índice)!";
        } else {
            document.querySelector("#status-container").className = "status-box sucesso";
            elMsg.innerText = "🚀 Busca Otimizada (Uso de Índice)!";
        }
    } catch (e) {
        elMsg.innerText = "Erro ao processar teste.";
    }
});
