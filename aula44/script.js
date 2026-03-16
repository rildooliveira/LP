// SISTEMA DE MONITORAMENTO E FINANCEIRO INTEGRADO

// 1. Matriz de Registros de Consumo (kWh)
const consumoKwh = [120, 450, 800, 230, 600, 150, 950];

// 2. Filtrar consumos altos (acima de 500 kWh) para auditoria
const consumosAltos = consumoKwh.filter(valor => valor > 500);

// 3. Transformar kWh em Valor Monetário (R$ 0,85 por kWh)
const faturasReais = consumoKwh.map(valor => valor * 0.85);

// 4. Calcular o gasto total acumulado da rede
const gastoTotalRede = faturasReais.reduce((total, fatura) => total + fatura, 0);

// EXIBIÇÃO DE RELATÓRIO
console.log("--- Relatório de Eficiência Energética ---");
console.log(`Pontos com alto consumo para inspeção: ${consumosAltos.length}`);
console.log(`Detalhamento das faturas individuais:`, faturasReais);
console.log(`Gasto Total Consolidado da Infraestrutura: R$ ${gastoTotalRede.toFixed(2)}`);

// Verificando conformidade técnica
consumoKwh.forEach(c => {
    if (c > 900) console.warn(`PERIGO: Sobrecarga detectada no registro de ${c} kWh!`);
});
