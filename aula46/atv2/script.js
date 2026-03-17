// Função chamada pelo botão no HTML
function atualizarStatus() {
    // 1. Selecionando os elementos por ID
    const titulo = document.getElementById("titulo-sistema");
    const status = document.getElementById("status-servidor");

    // 2. Modificando o conteúdo textual
    titulo.innerText = "Lucleo Gestão Ativa";
    status.innerText = "Status: Online e Sincronizado";
    status.style.color = "#27ae60"; // Alteração direta de estilo (opcional)
}
