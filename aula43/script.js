// 1. Criando um array de strings (nomes de sensores industriais)
// Engenharia de Software: Arrays mantêm a ordem dos dados .
const sensores = ["Temperatura", "Pressão", "Umidade"];

console.log("--- Tarefa A: Inventário Inicial ---");
console.log(sensores); // Exibe a lista completa

// Acessando o primeiro item (índice 0)
// Lembre-se: sensores[0] é "Temperatura", sensores[1] é "Pressão"...
console.log(`Sensor principal (Índice 0): ${sensores[0]}`);


//tarefa 2
// 2. Adição de dados (Mutabilidade do Array)
// .push() -> Adiciona ao FINAL da lista.
sensores.push("Vibração");

// .unshift() -> Adiciona ao INÍCIO da lista.
sensores.unshift("Nível");

console.log("--- Tarefa B: Após Adição ---");
console.log(sensores); // Agora a lista deve ter 5 itens


// 3. Remoção de dados
// .pop() -> Remove e retorna o ÚLTIMO item da lista[cite: 67].
let itemRemovidoFim = sensores.pop();

// .shift() -> Remove e retorna o PRIMEIRO item da lista[cite: 67].
let itemRemovidoInicio = sensores.shift();

console.log("--- Tarefa C: Após Remoção ---");
console.log(sensores); 
console.log(`Log de Auditoria: Removidos ${itemRemovidoInicio} (Início) e ${itemRemovidoFim} (Fim).`);


// 4. Propriedade .length: Retorna o total de elementos no array .
console.log(`Total de sensores ativos no sistema: ${sensores.length}`);
