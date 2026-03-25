const fs = require("fs");

try {
    const conteudoDoArquivo = fs.readFileSync("app.js", "utf8");
    const totalDeLinhas = conteudoDoArquivo.split("\n").length;

    console.log("--------------------------------");
    console.log(`📊 Saúde do Código: app.js`);
    console.log(`Total de linhas: ${totalDeLinhas}`);

    if (totalDeLinhas > 50) {
        console.log("⚠️ Alerta: O arquivo está ficando grande. Considere dividir em módulos!");
    } else {
        console.log("✅ Excelente: O arquivo está enxuto e limpo.");
    }
    console.log("--------------------------------");
} catch (err) {
    console.error("Erro ao ler o arquivo. Certifique-se de que app.js existe na pasta.");
}
