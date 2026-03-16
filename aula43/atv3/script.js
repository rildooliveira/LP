const hardwareLista = ["Placa de Vídeo", "Processador i7", "Memória DDR4", "Fonte 600W","Cooler"];
const containerUl = document.querySelector("#lista-hardware");

// Percorrendo o array para criar elementos HTML
hardwareLista.forEach(item => {
    const li = document.createElement("li");
    li.textContent = `• ${item}`;
    containerUl.appendChild(li);
});
