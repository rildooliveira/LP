// Configuração inicial do Mapa
const map = L.map('map').setView([-5.089, -42.801], 13);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap'
}).addTo(map);

let marker;

// Função chamada quando o servidor enviar um alerta
function receberAlerta(dados) {
    const som = document.getElementById('alerta-som');
    som.play().catch(e => console.log("Áudio aguardando interação do usuário."));

    const lista = document.getElementById('lista-chamados');
    if(lista.querySelector('p')) lista.innerHTML = '';

    const card = document.createElement('div');
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
}

function selecionarOcorrencia(dados) {
    const detalhes = document.getElementById('detalhes-chamado');
    detalhes.classList.remove('hidden');
    
    document.getElementById('detalhe-nome').innerText = dados.nome;
    document.getElementById('detalhe-tel').innerText = dados.tel;
    document.getElementById('detalhe-tipo').innerText = dados.tipo;

    // Atualiza a posição no mapa
    const coords = [dados.lat, dados.lng];
    map.setView(coords, 17);
    
    if(marker) map.removeLayer(marker);
    marker = L.marker(coords).addTo(map)
        .bindPopup(`<b>${dados.tipo}</b><br>${dados.nome}`)
        .openPopup();
}

function fecharDetalhes() {
    document.getElementById('detalhes-chamado').classList.add('hidden');
}

function atenderChamado() {
    alert("Viatura enviada com sucesso!");
    fecharDetalhes();
}

// Simulação de recebimento (Substituir por Socket.io no futuro)
setTimeout(() => {
    receberAlerta({
        tipo: 'Incêndio',
        nome: 'Praça da Bandeira, Centro',
        tel: '(86) 99981-2345',
        lat: -5.0892,
        lng: -42.8112,
        hora: new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})
    });
}, 2000);
