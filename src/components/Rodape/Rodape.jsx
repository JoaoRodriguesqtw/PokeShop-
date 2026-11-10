import { Link } from "react-router-dom";
import styles from "./Rodape.module.css";

function Rodape() {
  return (
    <footer className={styles.rodape}>
      <div className={styles.container}>
        <div className={styles.coluna}>
          <p className={styles.logo}>PokeShop</p>
          <p className={styles.texto}>
            A loja oficial de todo Treinador. Do Bulbasaur ao Pecharunt, entregamos
            em todas as regiões.
          </p>
        </div>

        <div className={styles.coluna}>
          <h3 className={styles.titulo}>Matriz</h3>
          <p className={styles.texto}>
            Praça Central, 1025
            <br />
            Wyndon, região de Galar
          </p>
          <p className={styles.destaque}>Filiais em Kanto, Johto e Paldea</p>
        </div>

        <div className={styles.coluna}>
          <h3 className={styles.titulo}>Atendimento</h3>
          <p className={styles.texto}>
            Seg. a sáb., das 8h às 18h
            <br />
            Pelo PC do Centro Pokémon mais próximo
          </p>
          <nav className={styles.links}>
            <Link to="/catalogo" className={styles.link}>Catálogo</Link>
            <Link to="/carrinho" className={styles.link}>Carrinho</Link>
            <Link to="/historico" className={styles.link}>Histórico</Link>
          </nav>
        </div>
      </div>

      <p className={styles.creditos}>
        © 2026 PokeShop · Projeto de Programação Web II · Dados dos Pokémon: PokéAPI
      </p>
    </footer>
  );
}

export default Rodape;
