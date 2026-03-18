const elForm = document.querySelector("#form-cadastro");
const elFeedback = document.querySelector("#feedback");

elForm.addEventListener("submit", (event) => {
    // 1. IMPEDIR que a página recarregue
    event.preventDefault();

    // 2. Capturar dados do formulário
    const nome = document.querySelector("#usuario").value;
    
    // 3. Simular salvamento
    elFeedback.innerText = `Sucesso! Perfil de ${nome} foi atualizado.`;
    elFeedback.style.color = "#27ae60";
    
    console.log("Dados enviados via JSON para o servidor (simulado)");
});
