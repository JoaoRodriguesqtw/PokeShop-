import { Link } from "react-router-dom";
import styles from "./Obrigado.module.css";

function Obrigado(props) {
  return (
    <section className={styles.obrigado}>
      <h1 className={styles.titulo}>Obrigado por comprar!</h1>

      {props.compra && (
        <p className={styles.texto}>
          {props.compra.cliente}, seu pedido de R$ {props.compra.total.toFixed(2)} foi
          pago com {props.compra.pagamento}.
        </p>
      )}

      <div className={styles.links}>
        <Link to="/catalogo" className={styles.botao}>
          Continuar comprando
        </Link>
        <Link to="/historico" className={styles.botaoSecundario}>
          Ver histórico
        </Link>
      </div>
    </section>
  );
}

export default Obrigado;
