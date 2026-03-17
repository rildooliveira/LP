// Criando um objeto que representa um Produto
const produto = {
    id: 101,
    nome: "Sensor de Temperatura Industrial",
    precoBase: 250.00,
    emEstoque: true,
    especificacoes: {
        marca: "TechSense",
        modelo: "TS-500"
    }
};

console.log("--- Objeto Produto ---");
console.log(produto);
console.log(`Produto: ${produto.nome} - Marca: ${produto.especificacoes.marca}`);


produto.calcularImposto = function(taxa) {
    // 'this' refere-se ao próprio objeto 'produto'
    return this.precoBase * (taxa / 100);
};

let imposto = produto.calcularImposto(15);
console.log(`Valor do Imposto (15%): R$ ${imposto.toFixed(2)}`);

// Convertendo Objeto para String JSON (para envio)
const produtoJSON = JSON.stringify(produto);
console.log("--- Formato JSON (String) ---");
console.log(produtoJSON);

// Simulando o recebimento: Convertendo String JSON de volta para Objeto
const objetoRecebido = JSON.parse(produtoJSON);
console.log("--- Objeto Reconvertido ---");
console.log(objetoRecebido.nome);


// SISTEMA DE GESTÃO DE ATIVOS DIGITAIS

// 1. Definição do Objeto de Ativo
const ativoIndustrial = {
    tag: "MOT-01",
    tipo: "Motor Trifásico",
    horasOperacao: 1200,
    status: "Operacional",
    
    // Método para verificar necessidade de manutenção
    verificarManutencao: function() {
        const limiteHoras = 1000;
        if (this.horasOperacao > limiteHoras) {
            this.status = "Manutenção Necessária";
            return true;
        }
        return false;
    }
};

// 2. Execução de Lógica do Objeto
console.log(`Status Inicial do ${ativoIndustrial.tag}: ${ativoIndustrial.status}`);

if (ativoIndustrial.verificarManutencao()) {
    console.warn(`ALERTA: O ${ativoIndustrial.tipo} atingiu o limite de horas.`);
}

console.log(`Status Atualizado: ${ativoIndustrial.status}`);

// 3. Exportação para Relatório (JSON)
const relatorioTecnico = JSON.stringify(ativoIndustrial, null, 2); // '2' adiciona formatação
console.log("--- Relatório Técnico Gerado ---");
console.log(relatorioTecnico);
