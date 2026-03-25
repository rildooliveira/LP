// Importa a biblioteca nativa do Node.js para ler arquivos do computador
const fs = require('fs');

// 1. Lê todo o conteúdo do arquivo 'app.js' como se fosse um texto
const conteudoDoArquivo = fs.readFileSync('app.js', 'utf8');

// 2. Divide o texto toda vez que encontrar uma quebra de linha (\n) e conta os pedaços
const totalDeLinhas = conteudoDoArquivo.split('\n').length;

// 3. Imprime o painel visual no terminal
console.log("--------------------------------");
console.log(`📊 Saúde do Código: app.js`);
console.log(`Total de linhas: ${totalDeLinhas}`);

// 4. Regra de negócio: Um arquivo muito grande é difícil de manter
if (totalDeLinhas > 50) {
    console.log("⚠️ Alerta: O arquivo está ficando grande. Considere dividir em módulos (arquivos menores)!");
} else {
    console.log("✅ Excelente: O arquivo está enxuto e limpo.");
}
console.log("--------------------------------");
