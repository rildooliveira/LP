// 1. Mapear os elementos base
const elInput = document.querySelector("#novo-ativo");
const elLista = document.querySelector("#lista-hardware");

const adicionarItem = () => {
    const nomeAtivo = elInput.value;

    if (nomeAtivo === "") {
        alert("Por favor, digite o nome do ativo.");
        return;
    }

    // 2. CRIAR o elemento <li> na memória
    const novoLi = document.createElement("li");
    novoLi.innerText = nomeAtivo;

    // 3. Adicionar comportamento de REMOÇÃO ao clicar no item
    novoLi.onclick = function() {
        this.remove();
    };

    // 4. ANEXAR o <li> dentro do <ul> no HTML
    elLista.appendChild(novoLi);

    // 5. Limpar campo e focar novamente
    elInput.value = "";
    elInput.focus();
};
