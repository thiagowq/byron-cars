// 1 seletores
const accessKey = 'IOe5NYECXFZ8SzJUv69rCDUkLx2U58z_GOTPFmMN7Cs'; 
const container = document.getElementById('container-resultados');

function verificarSeFavorito(nomeCarro) {
    const favoritos = JSON.parse(localStorage.getItem('byronFavoritos')) || [];
    return favoritos.some(item => item.nome === nomeCarro);
}

function alternarFavorito(elementoBotao, dadosCarroString) {
    // Evita que o clique na estrela recarregue a página ou feche algo indesejado
    event.stopPropagation(); 

    const carro = JSON.parse(decodeURIComponent(dadosCarroString));
    let favoritos = JSON.parse(localStorage.getItem('byronFavoritos')) || [];
    
    // Procura se o carro já existe
    const index = favoritos.findIndex(item => item.nome === carro.nome);
    
    if (index !== -1) {
        // Se existe, remove
        favoritos.splice(index, 1);
        atualizarIcone(elementoBotao, false);
        console.log("Removido:", carro.nome);
    } else {
        // Se não existe, adiciona
        favoritos.push(carro);
        atualizarIcone(elementoBotao, true);
        console.log("Adicionado:", carro.nome);
    }
    
    localStorage.setItem('byronFavoritos', JSON.stringify(favoritos));
}

function atualizarIcone(elemento, isFavorito) {
    const svg = elemento.querySelector('svg');
    if (isFavorito) {
        svg.setAttribute('fill', 'currentColor'); // Preenchido
    } else {
        svg.setAttribute('fill', 'none'); // Vazio
    }
}

// 2 Função para criar o HTML do card (identica da pesquisa.js)
function criarCard(imagemUrl, titulo) {
    // Dados fictícios
    const torque = (Math.random() * 10 + 8).toFixed(1); 
    const ano = Math.floor(Math.random() * (2024 - 1990 + 1)) + 1990;
    const vel = Math.floor(Math.random() * (220 - 140 + 1)) + 140;

    // Prepara os dados para salvar no favorito
    const dadosCarro = JSON.stringify({ nome: titulo, imagem: imagemUrl, torque, ano, vel });
    const dadosCarroSafe = encodeURIComponent(dadosCarro);

    // Verifica se já é favorito para pintar a estrela inicial
    const isFavorito = verificarSeFavorito(titulo);
    const fillCor = isFavorito ? 'currentColor' : 'none';

    return `
        <div class="bg-black text-white w-full rounded-lg shadow-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
            
            <div class="h-64 w-full overflow-hidden">
                <img src="${imagemUrl}" alt="${titulo}" class="w-full h-full object-cover">
            </div>

            <div class="p-6 flex flex-col flex-grow">
                <h2 class="text-center text-2xl font-bold uppercase mb-4 truncate" title="${titulo}">${titulo}</h2>
                
                <h3 class="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Especificações</h3>
                
                <div class="space-y-2 flex-grow">
                     <p><span class="font-bold text-red-500">Torque:</span> <span>${torque} kgfm</span></p>
                     <p><span class="font-bold text-red-500">Ano:</span> <span>${ano}</span></p>
                     <p><span class="font-bold text-red-500">Velocidade:</span> <span>${vel} km/h</span></p>
                </div>

                <div onclick="alternarFavorito(this, '${dadosCarroSafe}')" class="mt-6 flex justify-center cursor-pointer hover:scale-110 transition-transform btn-favorito" title="Favoritar">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="${fillCor}" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-red-600">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                    </svg>
                </div>
            </div>
        </div>
    `;
}

// 3 vitrine para aparecer carros na hora em que a página carregar (identica a do pesquisa.js)
async function carregarDestaques() {
    container.innerHTML = '<p class="text-white text-center text-xl w-full col-span-3">Carregando destaques da garagem...</p>';

    try {
        const url = `https://api.unsplash.com/search/photos?query=vintage cars&per_page=2&client_id=${accessKey}&orientation=landscape`;
        const resposta = await fetch(url);
        const dados = await resposta.json();

        container.innerHTML = ""; 

        if (dados.results.length > 0) {
            dados.results.forEach(foto => {
                container.innerHTML += criarCard(foto.urls.regular, foto.alt_description || "Super Carro");
            });
        }
    } catch (erro) {
        console.error("Erro nos destaques:", erro);
        container.innerHTML = ""; 
    }
}
// Chamada da função
carregarDestaques();