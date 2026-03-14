// 1. A LISTA: Imagine que isso veio de um banco de dados do INPI
const processos = [
    "Registro de Software - Lucleo",
    "Marca - ForkLabs",
    "Patente de Invenção - Motor Solar",
    "Direito Autoral - Mestres da Invenção",
    "Patente de Modelo de Utilidade - Drone A"
];

// 2. O ALVO: O que você quer que o robô procure?
const termoBusca = "Patente";

console.log("Iniciando varredura...");

// 3. O MOTOR: O loop 'for' percorre a lista do item 0 até o final
for (let i = 0; i < processos.length; i++) {
    
    // O 'if' verifica se o texto do processo contém a palavra buscada
    if (processos[i].includes(termoBusca)) {
        console.log(`[ACHEI] Posição ${i}: ${processos[i]}`);
    }
}

console.log("Varredura finalizada.");
