/**
 * Central 193 - Simulação de Sistema de Emergências
 * Objetivo: Gerar chamados aleatórios e permitir o atendimento dinâmico.
 */

// Configuração inicial do Mapa
const map = L.map('map').setView([-5.089, -42.801], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;
let chamadoSelecionadoId = null; // Mudança: Armazena o ID do chamado aberto nos detalhes

// Mock de dados para simulação
const tiposEmergencia = [
    { tipo: 'Incêndio', cor: 'text-red-500' },
    { tipo: 'Acidente de Trânsito', cor: 'text-orange-500' },
    { tipo: 'Salvamento', cor: 'text-blue-500' },
    { tipo: 'Vazamento de Gás', cor: 'text-yellow-500' }
];

const locaisMock = [
    { nome: 'Av. Frei Serafim, Centro', lat: -5.0885, lng: -42.8105 },
    { nome: 'Ponte Metálica, Timon', lat: -5.0931, lng: -42.8252 },
    { nome: 'Ufpi, Ininga', lat: -5.0594, lng: -42.7915 },
    { nome: 'Parque Estevam, Zona Sul', lat: -5.1245, lng: -42.7842 }
];

// 1. Função para receber/criar o alerta no sistema
function receberAlerta(dados) {
    const lista = document.getElementById('lista-chamados');
    if(lista.querySelector('p')) lista.innerHTML = '';

    // Mudança: Criamos um ID único para cada chamado para facilitar a remoção posterior
    const chamadoId = `chamado-${Date.now()}`;
    dados.id = chamadoId;

    const card = document.createElement('div');
    card.id = chamadoId; // Mudança: Atribuímos o ID ao elemento do DOM
    card.className = "emergency-blink p-4 rounded-lg cursor-pointer text-slate-900 shadow-md transition-all hover:scale-[1.02]";
    card.innerHTML = `
        <div class="flex justify-between items-start">
            <span class="font-bold uppercase text-xs">${dados.tipo}</span>
            <span class="text-[10px] bg-white/50 px-2 rounded font-bold">${dados.hora}</span>
        </div>
        <p class="font-semibold">${dados.nome}</p>
    `;
    
    card.onclick = () => selecionarOcorrencia(dados);
    lista.prepend(card);

    // Tocar alerta sonoro
    const som = document.getElementById('alerta-som');
    if(som) som.play().catch(() => {});
}

// 2. Função para exibir detalhes
function selecionarOcorrencia(dados) {
    chamadoSelecionadoId = dados.id; // Mudança: Guardamos qual chamado está sendo visualizado
    const detalhes = document.getElementById('detalhes-chamado');
    detalhes.classList.remove('hidden');
    
    document.getElementById('detalhe-nome').innerText = dados.nome;
    document.getElementById('detalhe-tel').innerText = dados.tel;
    document.getElementById('detalhe-tipo').innerText = dados.tipo;

    const coords = [dados.lat, dados.lng];
    map.setView(coords, 17);
    
    if(marker) map.removeLayer(marker);
    marker = L.marker(coords).addTo(map)
        .bindPopup(`<b>${dados.tipo}</b><br>${dados.nome}`)
        .openPopup();
}

// 3. Função para Atender (Remover) o chamado
function atenderChamado() {
    if (chamadoSelecionadoId) {
        // Mudança: Removemos o card da lista lateral após o atendimento
        const cardParaRemover = document.getElementById(chamadoSelecionadoId);
        if (cardParaRemover) {
            cardParaRemover.classList.add('opacity-0', 'scale-90'); // Efeito visual de saída
            setTimeout(() => cardParaRemover.remove(), 300);
        }
        
        alert("Viatura despachada! Ocorrência registrada.");
        fecharDetalhes();
        if(marker) map.removeLayer(marker); // Limpa o mapa após atender
    }
}

function fecharDetalhes() {
    document.getElementById('detalhes-chamado').classList.add('hidden');
    chamadoSelecionadoId = null;
}

// Mudança: Função para gerar chamados aleatórios periodicamente
function gerarChamadoSimulado() {
    const tipoAleatorio = tiposEmergencia[Math.floor(Math.random() * tiposEmergencia.length)];
    const localAleatorio = locaisMock[Math.floor(Math.random() * locaisMock.length)];
    
    receberAlerta({
        tipo: tipoAleatorio.tipo,
        nome: localAleatorio.nome,
        tel: `(86) 99${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(1000 + Math.random() * 9000)}`,
        lat: localAleatorio.lat + (Math.random() - 0.5) * 0.01, // Pequeno desvio para não ser sempre igual
        lng: localAleatorio.lng + (Math.random() - 0.5) * 0.01,
        hora: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
}

// Mudança: Inicia a simulação (Gera um novo chamado entre 5 a 15 segundos)
setInterval(gerarChamadoSimulado, 10000); 

// Gera o primeiro chamado após 2 segundos para iniciar o sistema
setTimeout(gerarChamadoSimulado, 2000);

