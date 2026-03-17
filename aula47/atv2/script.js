/**
 * Lógica de Troca de Temas
 * Princípio: Separação de Preocupações (Martin, 2009)
 */

const btn = document.getElementById("btn-tema");

btn.addEventListener("click", () => {
    // A propriedade toggle adiciona a classe se ela não existir, 
    // ou remove se ela já estiver lá.
    document.body.classList.toggle("dark-mode");

    // Auditoria de Estado no Console
    const isDark = document.body.classList.contains("dark-mode");
    console.log(`Interface atualizada para: ${isDark ? "Modo Escuro" : "Modo Claro"}`);
});
