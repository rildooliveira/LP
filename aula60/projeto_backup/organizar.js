/**
 * Atividade 6: Automação de Arquivos com Node.js
 * Objetivo: Renomear o backup bruto com carimbo de data/hora.
 */

const fs = require('fs');

const arquivoOriginal = 'backup_bruto.sql';
const dataAtual = new Date().toISOString().split('T')[0]; // Formato AAAA-MM-DD
const novoNome = `backup_final_${dataAtual}.sql`;

// Verifica se o arquivo da Atividade 4 existe
if (fs.existsSync(arquivoOriginal)) {
    fs.renameSync(arquivoOriginal, novoNome);
    console.log(`✅ Sucesso: O backup foi renomeado para ${novoNome}`);
} else {
    console.log(`❌ Erro: O arquivo ${arquivoOriginal} não foi encontrado.`);
}
