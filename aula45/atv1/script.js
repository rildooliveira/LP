// Criando um objeto para representar um software patenteado
const software = {
    id: 1,
    titulo: "Lucleo Gestão",
    versao: "2.5.0",
    proprietario: "ForkLabs",
    ativo: true,
    // Método para exibir informações formatadas
    descrever() {
        return `O sistema ${this.titulo} pertence à ${this.proprietario}.`;
    }
};

console.log("Objeto Completo:", software);
console.log("Acessando Propriedade:", software.titulo);
console.log("Executando Método:", software.descrever());
