// SISTEMA DE CÁLCULO DE IMPOSTOS MODULARIZADO

// Variável Global de Configuração
const taxaPadrao = 0.15; 

// Arrow Function para formatar moeda (Escopo Global)
const formatar = (valor) => `R$ ${valor.toFixed(2)}`;

// Função principal utilizando Arrow Function e Escopo Local
const processarTaxa = (valorBruto) => {
    // Escopo Local: 'valorImposto' só existe aqui dentro
    let valorImposto = valorBruto * taxaPadrao;
    let valorLiquido = valorBruto - valorImposto;

    console.log("--- Resumo Financeiro ---");
    console.log(`Valor Bruto: ${formatar(valorBruto)}`);
    console.log(`Imposto (${taxaPadrao * 100}%): ${formatar(valorImposto)}`);
    console.log(`Valor Líquido: ${formatar(valorLiquido)}`);
};

// Execução
processarTaxa(1500);
processarTaxa(3200);

// Tentativa de acessar variável local fora do seu escopo (Gerará erro se descomentado)
// console.log(valorImposto); 
