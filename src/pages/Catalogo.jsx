import { useState, useEffect } from "react";
import PokemonCard from "../components/PokemonCard";
import styles from "./Catalogo.module.css";

function Catalogo(props) {
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarPokemons = async () => {
      setCarregando(true);
      setErro("");

      try {
        const lista = [];

        for (let id = 1; id <= 20; id++) {
          const url = `https://pokeapi.co/api/v2/pokemon/${id}`;
          const resposta = await fetch(url);

          if (!resposta.ok) {
            throw new Error("Falha na busca");
          }

          const dados = await resposta.json();

          lista.push({
            id: dados.id,
            nome: dados.name,
            imagem: dados.sprites.other["official-artwork"].front_default,
            tipos: dados.types.map((item) => item.type.name),
            preco: dados.base_experience, // preço fictício
          });
        }

        setPokemons(lista);
      } catch {
        setErro("Não foi possível carregar os Pokémon.");
      } finally {
        setCarregando(false);
      }
    };

    buscarPokemons();
  }, []);

  return (
    <section>
      <h1 className={styles.titulo}>Catálogo</h1>
      <p className={styles.subtitulo}>Clique no Pokémon para ver os detalhes.</p>

      {carregando && <p className={styles.aviso}>Carregando Pokémon...</p>}

      {erro && <p className={styles.erro}>{erro}</p>}

      <div className={styles.grade}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            aoAdicionar={props.aoAdicionar}
          />
        ))}
      </div>
    </section>
  );
}

export default Catalogo;
