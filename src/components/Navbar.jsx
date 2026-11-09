import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";

function Navbar(props) {
  return (
    <header className={styles.navbar}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
          PokeShop
        </Link>

        <nav className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/catalogo" className={styles.link}>Catálogo</Link>
          <Link to="/carrinho" className={styles.link}>
            Carrinho
            {props.quantidade > 0 && (
              <span className={styles.contador}>{props.quantidade}</span>
            )}
          </Link>
          <Link to="/historico" className={styles.link}>Histórico</Link>
        </nav>
      </div>
    </header>
  );
}

export default Navbar;
