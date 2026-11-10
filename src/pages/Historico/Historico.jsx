import { Link } from "react-router-dom";
import styles from "./Historico.module.css";

function Historico(props) {
  return (
    <section>
      <h1 className={styles.titulo}>Histórico de compras</h1>

      {props.historico.length === 0 ? (
        <div className={styles.vazio}>
          <p>Você ainda não fez nenhuma compra.</p>
          <Link to="/catalogo" className={styles.botao}>
            Ir para o catálogo
          </Link>
        </div>
      ) : (
        <div className={styles.lista}>
          {props.historico.map((compra) => (
            <div key={compra.id} className={styles.compra}>
              <div className={styles.cabecalho}>
                <p className={styles.data}>{compra.data}</p>
                <p className={styles.total}>R$ {compra.total.toFixed(2)}</p>
              </div>

              <p className={styles.cliente}>
                {compra.cliente} — {compra.pagamento}
              </p>

              <ul className={styles.itens}>
                {compra.itens.map((item) => (
                  <li key={item.id} className={styles.itemCompra}>
                    <img src={item.imagem} alt={item.nome} className={styles.imagem} />
                    <span className={styles.nome}>{item.nome}</span>
                    <span>x {item.quantidade}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}

export default Historico;
