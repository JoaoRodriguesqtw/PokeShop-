// Nome em português e cor de cada tipo de Pokémon.
const TIPOS = {
  normal: { nome: "Normal", cor: "#8f8f7a" },
  fire: { nome: "Fogo", cor: "#e8672a" },
  water: { nome: "Água", cor: "#4a7fe0" },
  electric: { nome: "Elétrico", cor: "#d9a800" },
  grass: { nome: "Planta", cor: "#4fa83d" },
  ice: { nome: "Gelo", cor: "#4fb5b5" },
  fighting: { nome: "Lutador", cor: "#b8302a" },
  poison: { nome: "Veneno", cor: "#9b4fb0" },
  ground: { nome: "Terra", cor: "#b8914a" },
  flying: { nome: "Voador", cor: "#7a8fe0" },
  psychic: { nome: "Psíquico", cor: "#e04a80" },
  bug: { nome: "Inseto", cor: "#8aa01f" },
  rock: { nome: "Pedra", cor: "#9c8a3a" },
  ghost: { nome: "Fantasma", cor: "#6a5a9c" },
  dragon: { nome: "Dragão", cor: "#5a3ad9" },
  dark: { nome: "Sombrio", cor: "#5a4a44" },
  steel: { nome: "Aço", cor: "#7a8a9c" },
  fairy: { nome: "Fada", cor: "#d97aa0" },
};

export function infoDoTipo(tipo) {
  return TIPOS[tipo] ?? { nome: tipo, cor: "#777" };
}