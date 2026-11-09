import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Carrinho.module.css";

function Carrinho(props) {
  const [quantidade, setQuantidade] = useState("");
  const [editando, setEditando] = useState(null);
  const [erro, setErro] = useState("");

  function editar(id) {
    const item = props.carrinho.find((item) => item.id === id);
    setQuantidade(item.quantidade);
    setEditando(id);
    setErro("");
  }

  function cancelar() {
    setQuantidade("");
    setEditando(null);
    setErro("");
  }

  const salvar = (evento) => {
    evento.preventDefault();

    if (quantidade === "" || Number(quantidade) < 1) {
      setErro("Informe uma quantidade maior que zero.");
      return;
    }

    props.aoEditar(editando, Number(quantidade));
    cancelar();
  };

  const remover = (id) => {
    props.aoRemover(id);

    if (editando === id) {
      cancelar();
    }
  };

  if (props.carrinho.length === 0) {
    return (
      <section className={styles.vazio}>
        <h1 className={styles.titulo}>Carrinho</h1>
        <p>Seu carrinho está vazio.</p>
        <Link to="/catalogo" className={styles.botaoPrincipal}>
          Ir para o catálogo
        </Link>
      </section>
    );
  }

  return (
    <section>
      <h1 className={styles.titulo}>Carrinho</h1>

      <div className={styles.lista}>
        {props.carrinho.map((item) => (
          <div
            key={item.id}
            className={
              editando === item.id
                ? `${styles.item} ${styles.itemEditando}`
                : styles.item
            }
          >
            <img src={item.imagem} alt={item.nome} className={styles.imagem} />

            <div className={styles.info}>
              <h3 className={styles.nome}>{item.nome}</h3>
              <p className={styles.detalhe}>
                R$ {item.preco.toFixed(2)} x {item.quantidade}
              </p>
              <p className={styles.subtotal}>
                Subtotal: R$ {(item.preco * item.quantidade).toFixed(2)}
              </p>
            </div>

            {editando === item.id ? (
              <form onSubmit={salvar} className={styles.form}>
                <label className={styles.label}>
                  Quantidade:
                  <input
                    type="number"
                    value={quantidade}
                    onChange={(e) => setQuantidade(e.target.value)}
                    className={styles.input}
                  />
                </label>
                <button type="submit" className={styles.salvar}>
                  Salvar
                </button>
                <button type="button" onClick={cancelar} className={styles.cancelar}>
                  Cancelar
                </button>
                {erro !== "" && <p className={styles.erro}>{erro}</p>}
              </form>
            ) : (
              <div className={styles.acoes}>
                <button onClick={() => editar(item.id)} className={styles.editar}>
                  Editar
                </button>
                <button onClick={() => remover(item.id)} className={styles.deletar}>
                  Remover
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className={styles.resumo}>
        <p className={styles.total}>Total: R$ {props.total.toFixed(2)}</p>
        <Link to="/pagamento" className={styles.botaoPrincipal}>
          Ir para o pagamento
        </Link>
      </div>
    </section>
  );
}

export default Carrinho;
