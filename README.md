# 🏎️ Byron Cars

> Seu catálogo digital de carros esportivos e clássicos.

![Badge em Desenvolvimento](http://img.shields.io/static/v1?label=STATUS&message=EM%20DESENVOLVIMENTO&color=GREEN&style=for-the-badge)
![Badge License](http://img.shields.io/static/v1?label=LICENSE&message=MIT&color=RED&style=for-the-badge)

## 💻 Sobre o Projeto

O **Byron Cars** é uma aplicação web desenvolvida para entusiastas automotivos. O sistema permite pesquisar por modelos de carros, visualizar especificações técnicas e montar uma garagem virtual através do sistema de favoritos.

O projeto consome a API do **Unsplash** para trazer imagens de alta qualidade em tempo real e utiliza **LocalStorage** para garantir que seus carros favoritos fiquem salvos no navegador.

## 🎨 Design

Todo o layout e identidade visual foram planejados e prototipados utilizando o **Canva**, focando em uma experiência moderna (Dark Mode) e agressiva, inspirada no mundo automotivo.

## ⚙️ Funcionalidades

- [x] **Vitrine Inicial:** Exibição automática de "Super Cars" ao abrir a página.
- [x] **Busca Inteligente:** Pesquisa integrada com a API do Unsplash.
- [x] **Dados Técnicos:** Geração de fichas técnicas (Torque, Ano, Velocidade) baseada no modelo.
- [x] **Sistema de Favoritos:** Adicionar e remover carros da sua lista pessoal (CRUD via LocalStorage).
- [x] **Responsividade:** Layout adaptável para Desktop, Tablets e Celulares.

## 🚀 Tecnologias Utilizadas

O projeto foi desenvolvido utilizando as seguintes tecnologias:

- **HTML5** (Semântico)
- **CSS3** & **Tailwind CSS** (Estilização avançada)
- **JavaScript (ES6+)** (Lógica e manipulação do DOM)
- **Unsplash API** (Imagens dinâmicas)
- **Git & GitHub** (Versionamento)

🔮 Próximos Passos (Roadmap)
Estamos trabalhando constantemente em melhorias. As próximas atualizações incluirão:

[ ] Integração com Nova API: Implementação de uma API específica de dados automotivos para trazer fichas técnicas reais detalhadas.

[ ] Página de detalhes do veículo.

[ ] Filtros avançados por ano e marca.

## 🤝 Colaboradores

Agradecemos às seguintes pessoas que contribuíram para este projeto:

<table>
  <tr>
    <td align="center">
      <a href="https://github.com/eduardobrandao3">
        <img src="https://github.com/eduardobrandao3" width="100px;" alt="Foto do Eduardo"/><br>
        <sub>
          <b>Eduardo Brandão</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/sabjoao">
        <img src="https://github.com/sabjoao.png" width="100px;" alt="Foto do João Pedro"/><br>
        <sub>
          <b>João Pedro</b>
        </sub>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/thiagowq">
        <img src="https://github.com/thiagowq.png" width="100px;" alt="Foto do Thiago"/><br>
        <sub>
          <b>Thiago da Cruz</b>
        </sub>
      </a>
    </td>
  </tr>
</table>

## 📂 Como rodar o projeto

Pré-requisitos: Você precisa ter o [Node.js](https://nodejs.org/) instalado para rodar o Tailwind.

```bash
# 1. Clone este repositório
$ git clone [https://github.com/SEU_USUARIO/byron-cars.git](https://github.com/SEU_USUARIO/byron-cars.git)

# 2. Entre na pasta do projeto
$ cd byron-cars

# 3. Instale as dependências (caso tenha package.json)
$ npm install

# 4. Inicie o observador do Tailwind CSS
$ npx tailwindcss -i ./src/input.css -o ./src/output.css --watch

# 5. Abra o arquivo 'home.html' ou 'pesquisa.html' no seu navegador
# (Recomendado usar a extensão "Live Server" do VS Code)

