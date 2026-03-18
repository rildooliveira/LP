const btn = document.querySelector("#btn-iniciar");
const elStatus = document.querySelector("#status");

const simularRequisicao = () => {
    return new Promise((resolve, reject) => {
        elStatus.innerText = "Conectando ao servidor...";
        
        // Simulando um atraso de 3 segundos (ex: latência de internet)
        setTimeout(() => {
            const sucesso = true; // Altere para false para testar o erro
            if (sucesso) {
                resolve("Dados recebidos com sucesso!");
            } else {
                reject("Erro: Servidor fora do ar.");
            }
        }, 3000);
    });
};

btn.addEventListener("click", () => {
    simularRequisicao()
        .then(resposta => {
            elStatus.innerText = resposta;
            elStatus.style.color = "green";
        })
        .catch(erro => {
            elStatus.innerText = erro;
            elStatus.style.color = "red";
        });
});
