// 1. Mapeamento de elementos
const elDisplay = document.querySelector("#contador");
const btnAdd = document.querySelector("#btn-adicionar");
const btnClear = document.querySelector("#btn-limpar");

let total = 0;

// 2. Adicionando escutas de evento (Boa Prática: Sem mexer no HTML)
btnAdd.addEventListener("click", () => {
    total++;
    elDisplay.innerText = total;
});

btnClear.addEventListener("click", () => {
    total = 0;
    elDisplay.innerText = total;
});

// Evento de Mouse: Mudar cor ao passar o mouse por cima
elDisplay.addEventListener("mouseenter", () => elDisplay.style.color = "#0984e3");
elDisplay.addEventListener("mouseleave", () => elDisplay.style.color = "#2d3436");
