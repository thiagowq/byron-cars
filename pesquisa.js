// import { buscaCarroApiNinja } from "./buscaCarro.js";

// 1. Seletores
const btnPesquisar = document.getElementById("btn-pesquisar");
const inputPesquisa = document.getElementById("input-pesquisa");
const container = document.getElementById("container-resultados");
const inputModelo = document.querySelector("#input-modelo");
const inputMarca = document.querySelector("#input-pesquisa");
// 2. Chave do Unplash
const accessKey = "IOe5NYECXFZ8SzJUv69rCDUkLx2U58z_GOTPFmMN7Cs";

// --- Sistema de Favoritos ---

function verificarSeFavorito(nomeCarro) {
  const favoritos = JSON.parse(localStorage.getItem("byronFavoritos")) || [];
  return favoritos.some((item) => item.nome === nomeCarro);
}

function alternarFavorito(elementoBotao, dadosCarroString) {
  // Evita que o clique na estrela recarregue a página ou feche algo indesejado
  event.stopPropagation();

  const carro = JSON.parse(decodeURIComponent(dadosCarroString));
  let favoritos = JSON.parse(localStorage.getItem("byronFavoritos")) || [];

  // Procura se o carro já existe
  const index = favoritos.findIndex((item) => item.nome === carro.nome);

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

  localStorage.setItem("byronFavoritos", JSON.stringify(favoritos));
}

function atualizarIcone(elemento, isFavorito) {
  const svg = elemento.querySelector("svg");
  if (isFavorito) {
    svg.setAttribute("fill", "currentColor"); // Preenchido
  } else {
    svg.setAttribute("fill", "none"); // Vazio
  }
}

// 3. Função para criar o HTML do card
function criarCard(imagemUrl, titulo, displacement, year, fuel_type) {
  // Dados fictícios
  const motor = displacement;
  const ano = year;
  const combustivel = fuel_type;

  // Prepara os dados para salvar no favorito
  const dadosCarro = JSON.stringify({
    nome: titulo,
    imagem: imagemUrl,
    motor,
    ano,
    combustivel,
  });
  const dadosCarroSafe = encodeURIComponent(dadosCarro);

  // Verifica se já é favorito para pintar a estrela inicial
  const isFavorito = verificarSeFavorito(titulo);
  const fillCor = isFavorito ? "currentColor" : "none";

  return `
        <div class="bg-black text-white w-full rounded-lg shadow-2xl overflow-hidden flex flex-col hover:-translate-y-2 transition-transform duration-300">
            
            <div class="h-64 w-full overflow-hidden">
                <img src="${imagemUrl}" alt="${titulo}" class="w-full h-full object-cover">
            </div>

            <div class="p-6 flex flex-col flex-grow">
                <h2 class="text-center text-2xl font-bold uppercase mb-4 truncate" title="${titulo}">${titulo}</h2>
                
                <h3 class="text-xl font-bold mb-3 border-b border-gray-700 pb-2">Especificações</h3>
                
                <div class="space-y-2 flex-grow">
                     <p><span class="font-bold text-red-500">Motor:</span> <span>${motor}</span></p>
                     <p><span class="font-bold text-red-500">Ano:</span> <span>${ano}</span></p>
                     <p><span class="font-bold text-red-500">Tipo combustível:</span> <span>${combustivel} </span></p>
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

// FUNÇÃO PARA BUSCAR NA API NINJA
async function buscaCarroApiNinja(valorMarca, valorModelo) {
    try {
        const urlApiNinja = "https://api.api-ninjas.com/v1/cars?";
        let resNinja = await axios.get(
        urlApiNinja + `make=${valorMarca}&model=${valorModelo}`,
        {
            headers: {
            "X-Api-Key": "UoAh618Z/ETvz3VTgus6Ng==ukVacKEXL0LNXuoh",
            },
        }
        );
        // RETORNAR OS DADOS QUE DESEJO
        return resNinja.data[0];
    } catch (err) {
        return 0;
    }
}
// 4. Função para buscar na API
async function buscarCarros() {
  // verificar se digitou algo
  let valorMarca = inputMarca.value.trim();
  let valorModelo = inputModelo.value.trim();
  let resultApiNinja = 0;
  

  if (valorMarca === "") {
    alert("Informe uma marca de carro");
  } else if (valorModelo === "") {
    alert("Informe um modelo de carro");
  } else {
    resultApiNinja = await buscaCarroApiNinja(valorMarca, valorModelo);
  }

  const termo = `${valorMarca} ${valorModelo}`;
  console.log(termo);

  container.innerHTML =
    '<p class="text-white text-xl w-full text-center col-span-3">Buscando na garagem...</p>';

  try {
    const url = `https://api.unsplash.com/search/photos?query=${termo}&per_page=3&client_id=${accessKey}&orientation=landscape`;

    const resposta = await fetch(url);
    const dados = await resposta.json();

    container.innerHTML = "";

    if (dados.results.length === 0) {
      container.innerHTML =
        '<p class="text-white text-xl w-full text-center col-span-3">Nenhum carro encontrado.</p>';
      return;
    }

    if (resultApiNinja !== 0) {
      const foto = dados.results[0];
      const imgLink = foto.urls.regular;
      const titulo = termo //|| termo;
      container.innerHTML += criarCard(
        imgLink,
        titulo,
        resultApiNinja.displacement,
        resultApiNinja.year,
        resultApiNinja.fuel_type
      );
    }
  } catch (erro) {
    console.error("Deu ruim na API:", erro);
    container.innerHTML =
      '<p class="text-red-500 text-center col-span-3">Erro ao buscar imagens. Verifique sua chave de API.</p>';
  }
}

// 5. Eventos
btnPesquisar.addEventListener("click", buscarCarros);

inputPesquisa.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    buscarCarros();
  }
});

// --- Lógica para abrir e fechar a aba de pesquisa ---
const btnAbrirPesquisa = document.getElementById("btn-abrir-pesquisa");
const abaPesquisa = document.getElementById("aba-pesquisa");
const inputFoco = document.getElementById("input-pesquisa");

if (btnAbrirPesquisa && abaPesquisa) {
  btnAbrirPesquisa.addEventListener("click", () => {
    abaPesquisa.classList.toggle("hidden");
    if (!abaPesquisa.classList.contains("hidden")) {
      if (inputFoco) inputFoco.focus();
    }
  });
}

// --- vitrine para aparecer carros na hora em que a página carregar ---
async function carregarDestaques() {
  container.innerHTML =
    '<p class="text-white text-center text-xl w-full col-span-3">Carregando destaques da garagem...</p>';

  try {
    const url = `https://api.unsplash.com/search/photos?query=sport cars&per_page=6&client_id=${accessKey}&orientation=landscape`;
    const resposta = await fetch(url);
    const dados = await resposta.json();

    container.innerHTML = "";

    if (dados.results.length > 0) {
      dados.results.forEach((foto) => {
        container.innerHTML += criarCard(
          foto.urls.regular,
          foto.alt_description || "Super Carro"
        );
      });
    }
  } catch (erro) {
    console.error("Erro nos destaques:", erro);
    container.innerHTML = "";
  }
}
// Chamada da função
carregarDestaques();
