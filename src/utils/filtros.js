// cada geração é uma faixa de números da Pokédex
export const geracoes = [
  { id: 0, nome: "Todas", inicio: 1, fim: 1025 },
  { id: 1, nome: "1 · Kanto", regiao: "Kanto", inicio: 1, fim: 151 },
  { id: 2, nome: "2 · Johto", regiao: "Johto", inicio: 152, fim: 251 },
  { id: 3, nome: "3 · Hoenn", regiao: "Hoenn", inicio: 252, fim: 386 },
  { id: 4, nome: "4 · Sinnoh", regiao: "Sinnoh", inicio: 387, fim: 493 },
  { id: 5, nome: "5 · Unova", regiao: "Unova", inicio: 494, fim: 649 },
  { id: 6, nome: "6 · Kalos", regiao: "Kalos", inicio: 650, fim: 721 },
  { id: 7, nome: "7 · Alola", regiao: "Alola", inicio: 722, fim: 809 },
  { id: 8, nome: "8 · Galar", regiao: "Galar", inicio: 810, fim: 905 },
  { id: 9, nome: "9 · Paldea", regiao: "Paldea", inicio: 906, fim: 1025 },
];

// os 18 tipos: o id é o nome que a PokéAPI usa, e o nome é o que aparece na tela
export const tipos = [
  { id: "normal", nome: "Normal" },
  { id: "fire", nome: "Fogo" },
  { id: "water", nome: "Água" },
  { id: "grass", nome: "Planta" },
  { id: "electric", nome: "Elétrico" },
  { id: "ice", nome: "Gelo" },
  { id: "fighting", nome: "Lutador" },
  { id: "poison", nome: "Venenoso" },
  { id: "ground", nome: "Terrestre" },
  { id: "flying", nome: "Voador" },
  { id: "psychic", nome: "Psíquico" },
  { id: "bug", nome: "Inseto" },
  { id: "rock", nome: "Pedra" },
  { id: "ghost", nome: "Fantasma" },
  { id: "dragon", nome: "Dragão" },
  { id: "dark", nome: "Sombrio" },
  { id: "steel", nome: "Aço" },
  { id: "fairy", nome: "Fada" },
];

// números da Pokédex de cada categoria
// (buscar as 1025 espécies na API só para saber isso seria lento demais)
export const categorias = [
  {
    id: "lendario",
    nome: "Lendário",
    ids: [
      144, 145, 146, 150, 243, 244, 245, 249, 250, 377, 378, 379, 380, 381, 382,
      383, 384, 480, 481, 482, 483, 484, 485, 486, 487, 488, 638, 639, 640, 641,
      642, 643, 644, 645, 646, 716, 717, 718, 772, 773, 785, 786, 787, 788, 789,
      790, 791, 792, 800, 888, 889, 890, 891, 892, 894, 895, 896, 897, 898, 905,
      1001, 1002, 1003, 1004, 1007, 1008, 1014, 1015, 1016, 1017, 1024,
    ],
  },
  {
    id: "mitico",
    nome: "Mítico",
    ids: [
      151, 251, 385, 386, 489, 490, 491, 492, 493, 494, 647, 648, 649, 719, 720,
      721, 801, 802, 807, 808, 809, 893, 1025,
    ],
  },
  {
    // pseudo-lendários: Dragonite, Tyranitar, Salamence, Metagross, Garchomp,
    // Hydreigon, Goodra, Kommo-o, Dragapult e Baxcalibur
    id: "pseudolendario",
    nome: "Pseudo-lendário",
    ids: [149, 248, 373, 376, 445, 635, 706, 784, 887, 998],
  },
];

// acha a geração pelo número do Pokémon (pula a opção "Todas")
export const descobrirGeracao = (id) => {
  return geracoes.find(
    (item) => item.id !== 0 && id >= item.inicio && id <= item.fim
  );
};

// acha a categoria do Pokémon; se não estiver em nenhuma lista, é "Padrão"
export const descobrirClassificacao = (id) => {
  const encontrada = categorias.find((item) => item.ids.includes(id));
  return encontrada ? encontrada : { id: "padrao", nome: "Padrão" };
};
