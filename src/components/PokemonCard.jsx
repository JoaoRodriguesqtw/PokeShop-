import { Link } from "react-router-dom";
import styles from "./PokemonCard.module.css";

function PokemonCard(props) {
  return (
    <div className={styles.card}>
      <Link to={`/pokemon/${props.pokemon.id}`} className={styles.link}>
        <img
          src={props.pokemon.imagem}
          alt={props.pokemon.nome}
          className={styles.imagem}
        />
        <span className={styles.numero}>#{props.pokemon.id}</span>
        <h3 className={styles.nome}>{props.pokemon.nome}</h3>
      </Link>

      <div className={styles.tipos}>
        {props.pokemon.tipos.map((tipo) => (
          <span key={tipo} className={styles.tipo}>
            {tipo}
          </span>
        ))}
      </div>

      <p className={styles.preco}>R$ {props.pokemon.preco.toFixed(2)}</p>

      <button
        className={styles.botao}
        onClick={() => props.aoAdicionar(props.pokemon)}
      >
        Adicionar ao carrinho
      </button>
    </div>
  );
}

export default PokemonCard;
