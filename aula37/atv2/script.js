// Variáveis de configuração da aplicação
const nomeApp = "NotaFlash";
const versaoAtual = 1.0;
const isBetaPublico = false;
const autorProjeto = "Seu Nome Aqui";

document.getElementById("app-nome").innerText = nomeApp;
document.getElementById("app-versao").innerText = versaoAtual;
document.getElementById("app-teste").innerText = isBetaPublico ? "SIM" : "NÃO";
document.getElementById("app-autor").innerText = autorProjeto;
