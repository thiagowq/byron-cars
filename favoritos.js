// Seletores
const containerFavoritos = document.getElementById("container-favoritos");
const qtFav = document.querySelector("#qtd-favoritos");

// 1. Carregar Favoritos
function carregarFavoritos() {
  const favoritos = JSON.parse(localStorage.getItem("byronFavoritos")) || [];

  containerFavoritos.innerHTML = "";

  qtFav.innerText = `Favoritados: ${favoritos.length} carros`;
  if (favoritos.length === 0) {
    containerFavoritos.innerHTML = `
            <div class="text-center w-full col-span-3 mt-10">
                <p class="text-3xl font-bold text-gray-500 uppercase">Sua garagem está vazia.</p>
                <a href="pesquisa.html" class="text-red-600 text-xl hover:underline mt-4 block font-bold">VOLTAR PARA PESQUISA</a>
            </div>
        `;
    return;
  }

  favoritos.forEach((carro) => {
    containerFavoritos.innerHTML += criarCardFavorito(carro);
  });
}

// 2. Criação de Cards (Cópia exata do layout de pesquisa.js)
function criarCardFavorito(carro) {
  return `
      <div class="bg-black text-white w-full rounded-lg shadow-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
            
            <div class="h-64 w-full overflow-hidden">
                <img src="${carro.imagem}" alt="${carro.nome}" class="w-full h-full object-cover">
            </div>

            <div class="p-6 flex flex-col flex-grow">
                <h2 class="text-center text-2xl font-bold uppercase mb-4 truncate" title="${carro.nome}">${carro.nome}</h2>
                
                <h3 class="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Especificações</h3>
                
                <div class="space-y-2 flex-grow">
                     <p><span class="font-bold text-red-500">Motor:</span> <span>${carro.motor} </span></p>
                     <p><span class="font-bold text-red-500">Ano:</span> <span>${carro.ano}</span></p>
                     <p><span class="font-bold text-red-500">Tipo combustível:</span> <span>${carro.combustivel}</span></p>
                </div>

                <div class="mt-6 flex justify-center cursor-pointer hover:scale-110 transition-transform">
                    <button onclick="removerFavorito('${carro.nome}')" title="Remover dos Favoritos">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-10 h-10 text-red-600">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                    </button>
                </div>
            </div>
      </div>
    `;
}

// 3. Remover favoritos
function removerFavorito(nomeCarro) {
  let favoritos = JSON.parse(localStorage.getItem("byronFavoritos")) || [];
  const novaLista = favoritos.filter((carro) => carro.nome !== nomeCarro);
  localStorage.setItem("byronFavoritos", JSON.stringify(novaLista));
  carregarFavoritos(); // Atualiza a tela na hora
}
// Chamada da Função para iniciar
carregarFavoritos();
