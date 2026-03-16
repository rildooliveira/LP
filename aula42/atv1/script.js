/**
 * COMPARATIVO TÉCNICO: LEGADO VS MODERNO
 */

const bancoPatentes = [
    "PI - Sensor Óptico",
    "MU - Válvula de Segurança",
    "PI - Sistema de Automação",
    "MU - Interface de Usuário"
];

// ESTILO LEGADO (Imperativo) - Problemas: Verbosidade e vazamento de var
function buscarLegado(lista, termo) {
    var resultados = [];
    for (var i = 0; i < lista.length; i++) {
        if (lista[i].includes(termo)) {
            resultados.push(lista[i]);
        }
    }
    return resultados;
}

// ESTILO MODERNO (Declarativo) - Vantagens: Arrow Functions e Imutabilidade
const buscarModerno = (lista, termo) => lista.filter(item => item.includes(termo));

// Execução dos testes no Console
console.log("--- RESULTADO LEGADO ---");
console.table(buscarLegado(bancoPatentes, "PI"));

console.log("--- RESULTADO MODERNO ---");
console.table(buscarModerno(bancoPatentes, "MU"));

/**
 * PROVA DE SEGURANÇA (Escopo de Bloco)
 */
if (true) {
    var vazou = "Acesso inseguro: vazou do bloco!";
    let protegido = "Segurança garantida: privado ao bloco.";
}

console.log(vazou); 
// console.log(protegido); // Gera erro ReferenceError, protegendo a integridade dos dados.
