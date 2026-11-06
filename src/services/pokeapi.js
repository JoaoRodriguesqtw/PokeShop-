const BASE_URL = "https://pokeapi.co/api/v2";

// O preço é fictício: calculado a partir da experiência base do Pokémon.
function calcularPreco(experienciaBase) {
  const base = experienciaBase ?? 60;
  return Number((base * 1.5 + 9.9).toFixed(2));
}

async function pegarJson(url, signal) {
  const resposta = await fetch(url, { signal });
  if (!resposta.ok) {
    throw new Error(`Erro ${resposta.status} ao acessar a PokéAPI`);
  }
  return resposta.json();
}

// Busca uma "página" de Pokémon. A lista traz só nome e url,
// então fazemos uma segunda chamada por Pokémon para pegar imagem, tipos e experiência.
export async function buscarPokemons(deslocamento, limite, signal) {
  const lista = await pegarJson(
    `${BASE_URL}/pokemon?limit=${limite}&offset=${deslocamento}`,
    signal,
  );

  const detalhes = await Promise.all(
    lista.results.map((item) => pegarJson(item.url, signal)),
  );

  const pokemons = detalhes.map((d) => ({
    id: d.id,
    nome: d.name,
    imagem:
      d.sprites.other?.["official-artwork"]?.front_default ||
      d.sprites.front_default,
    tipos: d.types.map((t) => t.type.name),
    preco: calcularPreco(d.base_experience),
  }));

  return { total: lista.count, pokemons };
}