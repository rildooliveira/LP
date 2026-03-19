const carregarDashboard = async () => {
    const perfilDiv = document.querySelector("#header-perfil");
    const listaUl = document.querySelector("#lista");

    try {
        // Disparando duas requisições ao mesmo tempo
        const p1 = fetch("https://jsonplaceholder.typicode.com/users/1");
        const p2 = fetch("https://jsonplaceholder.typicode.com/todos?userId=1&_limit=3");

        // Aguardando ambas terminarem juntas
        const [resUser, resTodos] = await Promise.all([p1, p2]);

        const user = await resUser.json();
        const todos = await resTodos.json();

        // Renderizando os dados combinados
        perfilDiv.innerText = `Bem-vindo, ${user.name} (@${user.username})`;
        
        listaUl.innerHTML = todos.map(t => `<li>✅ ${t.title}</li>`).join("");

    } catch (erro) {
        perfilDiv.innerText = "Erro ao carregar Dashboard.";
    }
};

// Carrega automaticamente ao abrir a página
carregarDashboard();
