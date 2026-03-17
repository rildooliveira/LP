function aprovarTudo() {
    // 1. Seleciona todos os elementos que possuem a classe 'item-processo'
    const processos = document.querySelectorAll(".item-processo");

    // 2. Itera sobre a NodeList para aplicar as mudanças
    processos.forEach((item, index) => {
        item.innerText = `Processo ${index + 1} - APROVADO`;
        item.classList.add("aprovado"); // Adiciona uma classe CSS
    });
}
