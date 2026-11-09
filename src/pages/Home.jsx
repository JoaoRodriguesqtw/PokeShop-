import { Link } from "react-router-dom";
import styles from "./Home.module.css";

function Home() {
  return (
    <section className={styles.home}>
      <div className={styles.banner}>
        <h1 className={styles.titulo}>Bem-vindo à PokeShop!</h1>
        <p className={styles.texto}>
          O catálogo de compras dos Pokémon. Escolha seus favoritos, monte o
          carrinho e finalize o pedido.
        </p>
        <Link to="/catalogo" className={styles.botao}>
          Ver catálogo
        </Link>
      </div>

      <div className={styles.passos}>
        <div className={styles.passo}>
          <h2>1. Escolha</h2>
          <p>Navegue pelo catálogo e veja os detalhes de cada Pokémon.</p>
        </div>
        <div className={styles.passo}>
          <h2>2. Monte o carrinho</h2>
          <p>Adicione, altere a quantidade ou remova itens quando quiser.</p>
        </div>
        <div className={styles.passo}>
          <h2>3. Finalize</h2>
          <p>Pague e acompanhe suas compras no histórico.</p>
        </div>
      </div>
    </section>
  );
}

export default Home;
