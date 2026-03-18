// 1. Capturar o botão
const btnAlerta = document.getElementById("btn-alerta");

// 2. Adicionar o ouvinte de evento (Evento, Função)
btnAlerta.addEventListener("click", () => {
    alert("Evento de clique detectado com sucesso!");
});

const btnModo = document.getElementById("btn-modo");
const corpo = document.getElementById("corpo-pagina");

btnModo.addEventListener("click", () => {
    // O toggle adiciona a classe se ela não existe, e remove se existe
    corpo.classList.toggle("modo-escuro");
});


const caixa = document.getElementById("caixa-interacao");
const campo = document.getElementById("campo-texto");
const feedback = document.getElementById("feedback");

// Evento de passar o mouse
caixa.addEventListener("mouseover", () => {
    caixa.style.borderColor = "blue";
});

// Evento de digitar (input)
campo.addEventListener("input", (event) => {
    // O objeto 'event' contém o que foi digitado
    feedback.innerText = `Você está digitando: ${event.target.value}`;
});
