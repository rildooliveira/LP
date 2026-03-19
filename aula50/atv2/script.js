const btn = document.querySelector("#btn-salvar");
const input = document.querySelector("#tarefa-nome");
const feedback = document.querySelector("#msg-feedback");

const salvarTarefa = async () => {
    const nome = input.value;
    if (!nome) return alert("Digite algo!");

    btn.disabled = true; // Desabilita para evitar cliques duplos
    btn.innerText = "Salvando...";
    feedback.innerText = "";

    try {
        // Simulando um POST para a API
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: 'POST',
            body: JSON.stringify({ title: nome, userId: 1 }),
            headers: { 'Content-type': 'application/json; charset=UTF-8' }
        });

        if (res.ok) {
            feedback.innerText = "✅ Tarefa salva com sucesso!";
            feedback.style.color = "green";
            input.value = "";
        }
    } catch (erro) {
        feedback.innerText = "❌ Falha técnica ao salvar.";
        feedback.style.color = "red";
    } finally {
        // O finally roda independente de sucesso ou erro 
        btn.disabled = false;
        btn.innerText = "Salvar no Banco";
    }
};

btn.addEventListener("click", salvarTarefa);
