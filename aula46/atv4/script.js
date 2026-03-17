function logarUsuario() {
    // 1. Selecionando os alvos
    const foto = document.querySelector("#imagem-perfil");
    const link = document.querySelector("#link-perfil");
    const nome = document.querySelector("#nome-usuario");

    // 2. Alterando atributos de imagem e link
    foto.setAttribute("src", "https://github.com/rildooliveira.png");
    link.setAttribute("href", "https://github.com/rildooliveira");
    link.innerText = "Ver GitHub Oficial";
    
    // 3. Alterando texto
    nome.innerText = "Rildo Oliveira";
}
