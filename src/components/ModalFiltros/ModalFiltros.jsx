import { useState, useEffect } from "react";
import { tipos, categorias } from "../../utils/filtros";
import styles from "./ModalFiltros.module.css";

function ModalFiltros(props) {
  // escolhas dentro do modal: só valem quando clicar em "Aplicar"
  const [tipo, setTipo] = useState(props.tipo);
  const [categoria, setCategoria] = useState(props.categoria);

  // fecha o modal com a tecla Esc
  useEffect(() => {
    const apertarTecla = (evento) => {
      if (evento.key === "Escape") {
        props.aoFechar();
      }
    };

    window.addEventListener("keydown", apertarTecla);

    return () => {
      window.removeEventListener("keydown", apertarTecla);
    };
  }, [props]);

  // clicar no que já está escolhido desmarca
  const escolherTipo = (id) => {
    setTipo(tipo === id ? "" : id);
  };

  const escolherCategoria = (id) => {
    setCategoria(categoria === id ? "" : id);
  };

  return (
    <div className={styles.fundo} onClick={props.aoFechar}>
      {/* o stopPropagation impede que clicar dentro da caixa feche o modal */}
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.topo}>
          <h2 className={styles.titulo}>Filtros</h2>
          <button className={styles.fechar} onClick={props.aoFechar} aria-label="Fechar">
            ×
          </button>
        </div>

        <h3 className={styles.secao}>Tipo</h3>
        <div className={styles.tipos}>
          {tipos.map((item) => (
            <button
              key={item.id}
              onClick={() => escolherTipo(item.id)}
              className={
                tipo === item.id
                  ? `${styles.tipo} ${styles[item.id]} ${styles.ativo}`
                  : `${styles.tipo} ${styles[item.id]}`
              }
            >
              {item.nome}
            </button>
          ))}
        </div>

        <h3 className={styles.secao}>Categoria</h3>
        <div className={styles.categorias}>
          {categorias.map((item) => (
            <button
              key={item.id}
              onClick={() => escolherCategoria(item.id)}
              className={
                categoria === item.id
                  ? `${styles.categoria} ${styles.categoriaAtiva}`
                  : styles.categoria
              }
            >
              {item.nome}
            </button>
          ))}
        </div>

        <div className={styles.acoes}>
          <button onClick={() => props.aoAplicar("", "")} className={styles.limpar}>
            Limpar filtros
          </button>
          <button onClick={() => props.aoAplicar(tipo, categoria)} className={styles.aplicar}>
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalFiltros;
