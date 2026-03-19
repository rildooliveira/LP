const btn = document.querySelector("#btn-carregar");
const listaUl = document.querySelector("#lista-tarefas");

const carregarTarefas = async () => {
    listaUl.innerHTML = "<li>Carregando dados...</li>";
    
    try {
        const resposta = await fetch("https://jsonplaceholder.typicode.com/todos?_limit=5");
        const tarefas = await resposta.json();

        listaUl.innerHTML = ""; // Limpa o carregando
        
        tarefas.forEach(t => {
            const li = document.createElement("li");
            li.innerText = `[${t.id}] ${t.title}`;
            listaUl.appendChild(li);
        });
    } catch (erro) {
        listaUl.innerHTML = "<li style='color:red'>Erro ao conectar com o servidor.</li>";
    }
};

btn.addEventListener("click", carregarTarefas);
