const btnBuscar = document.getElementById("btn-buscar");
const campoCep = document.getElementById("cep");
const divResultado = document.getElementById("resultado");

btnBuscar.addEventListener("click", () => {
    const valorCep = campoCep.value;
    if (valorCep.length === 8) {
        buscarEndereco(valorCep);
    } else {
        alert("CEP inválido. Digite 8 números.");
    }
});


// A palavra 'async' indica que a função lidará com promessas
async function buscarEndereco(cep) {
    divResultado.innerHTML = "<p>Carregando dados...</p>";

    try {
        // 'fetch' faz a requisição. 'await' espera a resposta do servidor.
        //const resposta = await fetch('https://viacep.com.br/ws/${cep}/json/');
        const resposta = await fetch('https://viacep.com.br/ws/'+ cep + '/json/');
        
        
        // Converte a resposta bruta em um Objeto JSON
        const dados = await resposta.json();

        if (dados.erro) {
            divResultado.innerHTML = "<p style='color:red;'>CEP não encontrado.</p>";
        } else {
            // Exibe os dados no HTML usando Template Literals
            divResultado.innerHTML = `
                <p><strong>Logradouro:</strong> ${dados.logradouro}</p>
                <p><strong>Bairro:</strong> ${dados.bairro}</p>
                <p><strong>Cidade/UF:</strong> ${dados.localidade} - ${dados.uf}</p>
            `;
        }
    } catch (erro) {
        // Caso a internet caia ou o servidor esteja fora do ar
        console.error("Erro na requisição:", erro);
        divResultado.innerHTML = "<p style='color:red;'>Erro de conexão com o servidor.</p>";
    }
}
