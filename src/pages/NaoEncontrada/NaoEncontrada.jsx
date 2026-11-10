import { Link } from "react-router-dom";
import styles from "./NaoEncontrada.module.css";

function NaoEncontrada() {
  return (
    <section className={styles.erro}>
      <h1 className={styles.codigo}>404</h1>
      <p className={styles.texto}>Página não encontrada.</p>
      <Link to="/" className={styles.botao}>
        Voltar para a Home
      </Link>
    </section>
  );
}

export default NaoEncontrada;
