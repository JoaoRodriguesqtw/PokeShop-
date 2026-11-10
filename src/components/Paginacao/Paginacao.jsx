import styles from "./Paginacao.module.css";

function Paginacao(props) {
  return (
    <div className={styles.paginacao}>
      <button
        className={styles.botao}
        onClick={() => props.aoMudar(props.pagina - 1)}
        disabled={props.pagina === 1}
      >
        ← Anterior
      </button>

      <span className={styles.texto}>
        Página {props.pagina} de {props.totalPaginas}
      </span>

      <button
        className={styles.botao}
        onClick={() => props.aoMudar(props.pagina + 1)}
        disabled={props.pagina === props.totalPaginas}
      >
        Próxima →
      </button>
    </div>
  );
}

export default Paginacao;
