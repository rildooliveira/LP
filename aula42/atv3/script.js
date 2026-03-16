/**
 * ATIVIDADE 3: Template Literals e Escopo
 */

// Arrow function para gerar ID aleatório
const gerarID = () => Math.floor(Math.random() * 10000);

document.getElementById("btnGerar").addEventListener("click", () => {
    const inventor = document.getElementById("inventor").value;
    const titulo = document.getElementById("titulo").value;
    const display = document.getElementById("protocolo");

    if (inventor && titulo) {
        // ESCOPO DE BLOCO: Esta constante só existe dentro deste 'if'
        const idProtocolo = gerarID();
        
        // Uso de TEMPLATE LITERALS (Crases e interpolação)
        display.innerHTML = `
            <strong>Protocolo Gerado:</strong><br>
            Nº: ${idProtocolo}<br>
            Inventor: ${inventor.toUpperCase()}<br>
            Título: ${titulo}
        `;
    } else {
        display.innerText = "Preencha todos os campos.";
    }
});
