// Captura o elemento <h1> através do seu ID único
const titulo = document.getElementById("titulo-principal");

// Exibe o objeto capturado no console
console.log("Elemento Título Capturado:", titulo);


// Captura todos os itens que possuem a classe 'item-lista'
const sensores = document.getElementsByClassName("item-lista");

console.log("Coleção de Sensores:", sensores);
console.log(`Total de sensores encontrados: ${sensores.length}`);

// O querySelector usa a mesma sintaxe do CSS (# para ID, . para classe)
const statusSistema = document.querySelector("#status");
const primeiraDescricao = document.querySelector(".descricao");

console.log("Status Capturado via querySelector:", statusSistema);

// SISTEMA DE MAPEAMENTO DE INTERFACE

// 1. Mapeando o título para alteração futura
const headerPrincipal = document.getElementById("titulo-principal");
console.log("Texto do Título:", headerPrincipal.innerText);

// 2. Mapeando o elemento de status
const spanStatus = document.querySelector("#status");
console.log("Referência de Status pronta para manipulação.");

// 3. Mapeando coleções de dados (Listas)
const listaSensores = document.querySelectorAll(".item-lista");

// Exibindo cada sensor encontrado através de um loop (forEach)
console.log("--- Detalhamento de Sensores Mapeados ---");
listaSensores.forEach((item, index) => {
    console.log(`Posição ${index}: ${item.innerText}`);
});
