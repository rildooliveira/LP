const usuario = { nome: "Rildo Oliveira", cargo: "Arquiteto", nivel: "Senior" };
//const usuarios = { nome: "Maria da costa", cargo: "Professora", nivel: "junior" };


// 1. Convertendo Objeto para String JSON (Serialização para envio)
const jsonString = JSON.stringify(usuario);
console.log("JSON pronto para envio (String):", jsonString);


// 2. Convertendo String JSON de volta para Objeto (Desserialização para uso)
const objetoRecuperado = JSON.parse(jsonString);
console.log("Objeto reconstruído:", objetoRecuperado);
console.log("Acessando dado do objeto reconstruído:", objetoRecuperado.nome);


