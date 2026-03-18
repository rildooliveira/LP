const btn = document.querySelector("#btn-carregar");
const loader = document.querySelector("#loader");
const divPerfil = document.querySelector("#perfil");

btn.addEventListener("click", () => {
    // 1. Mostrar loader e limpar perfil anterior
    loader.classList.remove("hidden");
    divPerfil.innerHTML = "";

    // 2. Requisição para API de usuários aleatórios
    fetch('https://randomuser.me/api/')
        .then(res => {
            if (!res.ok) throw new Error("Falha na comunicação com o servidor.");
            return res.json();
        })
        .then(data => {
            const user = data.results[0];
            divPerfil.innerHTML = `
                <img src="${user.picture.large}">
                <h4>${user.name.first} ${user.name.last}</h4>
                <p>${user.email}</p>
            `;
        })
        .catch(err => {
            divPerfil.innerHTML = `<p style="color:red">${err.message}</p>`;
        })
        .finally(() => {
            // 3. Esconder loader independente de sucesso ou erro
            loader.classList.add("hidden");
        });
});
