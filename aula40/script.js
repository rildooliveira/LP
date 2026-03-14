/**
 * Aula 40: Estruturas de Repetição (Loops)
 * Objetivo: Automatizar a criação de elementos visuais na interface.
 */

// 1. Mapeamento dos elementos do DOM
// Centralizamos as referências para otimizar o acesso à árvore de nós.
const elLista = document.getElementById("lista-lotes");
const elStatus = document.getElementById("status-final");

// 2. Estrutura de Repetição (O laço de automação)
// Segundo HAVERBEKE (2024), o loop 'for' é o padrão ouro para iterações controladas.
// Processamos 10 lotes automaticamente, simulando escalabilidade industrial.
for (let i = 1; i <= 10; i++) {
    
    // PASSO A: Criação de Elemento
    // Criamos o nó <li> em memória antes da injeção no documento.
    let novoItem = document.createElement("li");

    // PASSO B: Definição de Conteúdo (Template Literals)
    // Usamos interpolação para garantir rastreabilidade com timestamp.
    let horario = new Date().toLocaleTimeString();
    novoItem.innerText = `[${horario}] LOTE #${i}: Processado com sucesso.`;

    // PASSO C: Injeção no DOM
    // O appendChild realiza a integração do novo dado à interface visual.
    elLista.appendChild(novoItem);

    // Auditoria técnica via console para governança do fluxo
    console.log(`Log de automação: Lote ${i} registrado.`);
}

// 3. Atualização de status final
// Feedback essencial de conclusão após o término do laço.
elStatus.innerText = "PROCESSO CONCLUÍDO: 10/10 lotes registrados.";
