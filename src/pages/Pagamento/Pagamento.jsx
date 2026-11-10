import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Pagamento.module.css";

function Pagamento(props) {
  const [form, setForm] = useState({ nome: "", email: "", pagamento: "" });
  const [erro, setErro] = useState("");

  const navegar = useNavigate();

  const mudar = (campo, valor) => {
    setForm({ ...form, [campo]: valor });
  };

  const enviar = (evento) => {
    evento.preventDefault();

    if (form.nome === "" || form.email === "" || form.pagamento === "") {
      setErro("Preencha todos os campos.");
      return;
    }
    setErro("");

    props.aoFinalizar(form);
    navegar("/obrigado");
  };

  if (props.carrinho.length === 0) {
    return (
      <section className={styles.vazio}>
        <h1 className={styles.titulo}>Pagamento</h1>
        <p>Não há itens no carrinho para pagar.</p>
        <Link to="/catalogo" className={styles.botao}>
          Ir para o catálogo
        </Link>
      </section>
    );
  }

  return (
    <section className={styles.pagamento}>
      <h1 className={styles.titulo}>Pagamento</h1>

      <div className={styles.caixa}>
        <form onSubmit={enviar} className={styles.form}>
          <label className={styles.label}>
            Nome:
            <input
              type="text"
              value={form.nome}
              onChange={(e) => mudar("nome", e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            E-mail:
            <input
              type="email"
              value={form.email}
              onChange={(e) => mudar("email", e.target.value)}
              className={styles.input}
            />
          </label>

          <label className={styles.label}>
            Forma de pagamento:
            <select
              value={form.pagamento}
              onChange={(e) => mudar("pagamento", e.target.value)}
              className={styles.input}
            >
              <option value="">Selecione</option>
              <option value="Pix">Pix</option>
              <option value="Cartão de crédito">Cartão de crédito</option>
              <option value="Boleto">Boleto</option>
            </select>
          </label>

          {erro !== "" && <p className={styles.erro}>{erro}</p>}

          <p className={styles.total}>Total: R$ {props.total.toFixed(2)}</p>

          <button type="submit" className={styles.botao}>
            Finalizar compra
          </button>
        </form>
      </div>
    </section>
  );
}

export default Pagamento;
