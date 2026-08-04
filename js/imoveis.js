/* =======================================================================
   IMÓVEIS — Fátima Brandão
   -----------------------------------------------------------------------
   Este arquivo é a sua "planilha" de imóveis. Para cadastrar um novo
   imóvel, copie um dos blocos { ... } abaixo, cole no final da lista
   (antes do "];") e altere os valores.

   CAMPOS:
   id         → número único (não repita). Ex: 7, 8, 9...
   tipo       → "Casa" ou "Apartamento"
   operacao   → "Venda" ou "Aluguel"
   titulo     → título curto que aparece no card e no topo da página
   bairro     → bairro do imóvel
   cidade     → cidade / região
   preco      → número puro, sem "R$" nem pontos (ex: 320000)
   quartos, banheiros, vagas → números
   area       → metragem em m² (número)
   destaque   → true para mostrar a etiqueta "Destaque" no card
   lancamento → true para mostrar a etiqueta "Lançamento" no card
   renda      → (opcional) renda familiar mínima para financiar o imóvel,
                número puro, sem "R$" nem pontos (ex: 2000). Se o imóvel
                não tiver essa exigência ou você não quiser informar,
                apague o campo ou deixe null — o bloco some sozinho da
                página de detalhes.
   descricao  → texto livre, pode ter vários parágrafos (use \n\n para
                separar parágrafos)
   capa       → caminho da foto principal (aparece no card da listagem)
   imagens    → lista de fotos da galeria (a primeira pode repetir a capa).
                Quanto mais fotos, melhor — adicione quantas quiser.

   DICA: salve as fotos dos imóveis dentro da pasta "img/" (crie
   subpastas por imóvel se preferir, ex: img/imovel-07/foto1.jpg) e
   aponte o caminho aqui.
   ======================================================================= */

const IMOVEIS = [

  {
    id: 1,
    tipo: "Apartamento",
    operacao: "Venda",
    titulo: "Apartamento no Village das Estrelas",
    bairro: "Ubatuba",
    cidade: "São José de Ribamar - MA",
    preco: 220000,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    area: 40.94,
    destaque: true,
    lancamento: false,
    renda: null,
    descricao: "Apartamentos inclusos no programa Minha Casa Minha Vida, com renda a partir de R$2000.00, com subsídio de ate R$55.000. \n\nCondomínio com portaria 24h, área de lazer completa e fácil acesso às principais vias da cidade.",
    capa: "img/estrelas1.jpg",
    imagens: [
      "img/estrelas1.jpg",
      "img/estrelas2.jpg",
      "img/estrelas3.jpeg",
      "img/estrelas4.jpeg"
    ]
  },

  {
    id: 2,
    tipo: "Casa",
    operacao: "Venda",
    titulo: "Casa em condomínio Villa Terrari",
    bairro: "Vila da Maioba",
    cidade: "Paço do Lumiar - MA",
    preco: 480000,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 72.23,
    destaque: false,
    lancamento: false,
    renda: null,
    descricao: "Casa grande em condomínio clube fechado, com 3 quartos sendo 2 suítes. Lazer e comodidade para toda a família, com piscinas, espaços gourmet, salão de jogos, playground e estacionamento para visitantes.\n\nAo lado da nova Avenida Metropolitana, garantindo mobilidade e acesso rápido a mais de 50 bairros e às praias da Grande Ilha.",
    capa: "img/terrari3.jpg",
    imagens: [
      "img/terrari3.jpg",
      "img/terrari2.jpg",
      "img/terrari1.jpg",
      "img/terrari4.jpg"
      /* substitua estas fotos de exemplo pelas fotos reais do imóvel */
    ]
  },

  {
    id: 3,
    tipo: "Apartamento",
    operacao: "Venda",
    titulo: "Apartamento no Ilha dos Vinhais",
    bairro: "Vinhais",
    cidade: "São Luís - MA",
    preco: 260000,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    area: 43.73,
    destaque: false,
    lancamento: false,
    renda: null,
    descricao: "Viva no Residencial Ilha dos Vinhais, localizado atrás do Shopping da Ilha, em uma das regiões mais valorizadas de São Luís. Apartamentos de 2 quartos com opções de varanda, suíte e lazer completo.\n\nAproveite condições especiais para conquistar seu imóvel, com ITBI e cartório grátis, além de financiamento facilitado. O lugar ideal para morar ou investir com praticidade e segurança.",
    capa: "img/vinhais1.JPG",
    imagens: [
      "img/vinhais1.JPG",
      "img/vinhais2.JPG",
      "img/vinhais3.JPG",
      "img/vinhais4.JPG",
    ]
  },

  {
    id: 4,
    tipo: "Apartamento",
    operacao: "Venda",
    titulo: "Apartamento no Ilha de Santorini",
    bairro: "Angelim",
    cidade: "São Luís - MA",
    preco: 260000,
    quartos: 2,
    banheiros: 1,
    vagas: 1,
    area: 43.73,
    destaque: false,
    lancamento: false,
    renda: null,
    descricao: "Apartamentos de 2 quartos no Angelim, com lazer completo, localização estratégica e toda a qualidade MRV para você viver com mais conforto.\n\nFinanciamento facilitado, uso do FGTS e ITBI + cartório grátis, tornando a conquista do seu imóvel ainda mais acessível.",
    capa: "img/santorini1.jpg",
    imagens: [
      "img/santorini1.jpg",
      "img/santorini2.jpg",
      "img/santorini3.jpg",
      "img/santorini4.jpg"
    ]
  },

  {
    id: 5,
    tipo: "Casa",
    operacao: "Venda",
    titulo: "Casa no Condomínio Rafaella",
    bairro: "Vila Piramide",
    cidade: "São José de Ribamar - MA",
    preco: 302000,
    quartos: 2,
    banheiros: 2,
    vagas: 1,
    area: 55.30,
    destaque: true,
    lancamento: false,
    renda: null,
    descricao: "Casa nova que garante todo conforto e segurança para voce, próxima a Av.General Arthur Carvalho\n\nCondomínio com piscina, campo de futebol, campo de areia e churrasqueira.",
    capa: "img/rafaela1.JPG",
    imagens: [
      "img/rafaela1.JPG",
      "img/rafaela2.JPG",
      "img/rafaela3.JPG",
      "img/rafaela4.JPG"
    ]
  },

  {
    id: 6,
    tipo: "Apartamento",
    operacao: "Venda",
    titulo: "Apartamento no Cidade de Viena",
    bairro: "Olho D'Água",
    cidade: "São Luís - MA",
    preco: 683000,
    quartos: 3,
    banheiros: 2,
    vagas: 2,
    area: 83.58,
    destaque: true,
    lancamento: false,
    renda: null,
    descricao: "O Cidade de Viena chega como o novo empreendimento da Construtora Lua Nova, destacando-se pelo design contemporâneo, elevado padrão de construção e planejamento inteligente.\n\n Idealizado pelos arquitetos Leonardo Borges e Cláudia Albertini, o projeto reúne elegância, funcionalidade e qualidade em cada detalhe.",
    capa: "img/viena2.jpg",
    imagens: [
      "img/viena1.jpeg",
      "img/viena2.jpg",
      "img/viena3.jpg",
      "img/viena4.jpg",
      "img/viena5.jpg",
      "img/viena6.jpg",
      "img/viena7.jpg",
    ]
  }

];

