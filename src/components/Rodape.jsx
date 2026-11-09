import styles from "./Rodape.module.css";

function Rodape() {
  return (
    <footer className={styles.rodape}>
      <p>PokeShop — Programação Web II</p>
      <p className={styles.fonte}>Dados dos Pokémon: PokéAPI</p>
    </footer>
  );
}

export default Rodape;
