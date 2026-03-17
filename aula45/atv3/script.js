const inventarioAtivos = [
    { id: 501, tipo: "Patente", titulo: "Motor Solar" },
    { id: 502, tipo: "Marca", titulo: "ForkLabs" },
    { id: 503, tipo: "Software", titulo: "Mestres da Invenção" },
    { id: 504, tipo: "hardware", titulo: "teclado" },
    {  tipo: "luminaria", titulo: "lampada",id: 505, }
];

// Visualizando de forma organizada no console
console.table(inventarioAtivos);

// Simulando a exportação total do sistema para um arquivo JSON
const exportacaoJSON = JSON.stringify(inventarioAtivos, null, 2); // O '2' formata com recuo para leitura humana
console.log("Pacote de exportação concluído:");
console.log(exportacaoJSON);
