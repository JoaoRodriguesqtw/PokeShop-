import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import styles from "./Detalhe.module.css";

function Detalhe(props) {
  const { id } = useParams();

  const [pokemon, setPokemon] = useState(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");

  useEffect(() => {
    const buscarPokemon = async () => {
      setCarregando(true);
      setErro("");
      setPokemon(null);

      try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

        if (!resposta.ok) {
          throw new Error("Falha na busca");
        }

        const dados = await resposta.json();

        setPokemon({
          id: dados.id,
          nome: dados.name,
          imagem: dados.sprites.other["official-artwork"].front_default,
          tipos: dados.types.map((item) => item.type.name),
          altura: dados.height / 10,
          peso: dados.weight / 10,
          preco: dados.base_experience, // preço fictício
        });
      } catch {
        setErro("Pokémon não encontrado.");
      } finally {
        setCarregando(false);
      }
    };

    buscarPokemon();
  }, [id]);

  return (
    <section>
      <Link to="/catalogo" className={styles.voltar}>
        ← Voltar ao catálogo
      </Link>

      {carregando && <p className={styles.aviso}>Carregando...</p>}

      {erro && <p className={styles.erro}>{erro}</p>}

      {pokemon && (
        <div className={styles.detalhe}>
          <img src={pokemon.imagem} alt={pokemon.nome} className={styles.imagem} />

          <div className={styles.info}>
            <span className={styles.numero}>#{pokemon.id}</span>
            <h1 className={styles.nome}>{pokemon.nome}</h1>

            <div className={styles.tipos}>
              {pokemon.tipos.map((tipo) => (
                <span key={tipo} className={styles.tipo}>
                  {tipo}
                </span>
              ))}
            </div>

            <p>Altura: {pokemon.altura} m</p>
            <p>Peso: {pokemon.peso} kg</p>

            <p className={styles.preco}>R$ {pokemon.preco.toFixed(2)}</p>

            <button
              className={styles.botao}
              onClick={() => props.aoAdicionar(pokemon)}
            >
              Adicionar ao carrinho
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

export default Detalhe;
