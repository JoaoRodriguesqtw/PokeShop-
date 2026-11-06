
// documento formatado com o prettier

import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Catalogo from "./pages/Catalogo";
import Historico from "./pages/Historico";
import Home from "./pages/Home";
import Notfound from "./pages/Notfound";
import Obrigado from "./pages/Obrigado";
import Pagamentos from "./pages/Pagamentos";
import { calcularTotal, contarUnidades } from "./utils/format";
import styles from "./App.module.css";

function App() {
  // Todo o estado do app fica aqui e é passado para as páginas por props.
  // useState lê o localStorage só na primeira vez que o app abre
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem("pokeshop:carrinho");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem("pokeshop:historico");
    return salvo ? JSON.parse(salvo) : [];
  });

  // sempre que o carrinho ou o histórico mudam, salva de novo
  useEffect(() => {
    localStorage.setItem("pokeshop:carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem("pokeshop:historico", JSON.stringify(historico));
  }, [historico]);

  // CREATE: adiciona o Pokémon ou soma 1 se ele já estiver no carrinho
  function adicionarAoCarrinho(pokemon) {
    setCarrinho((atual) => {
      const jaExiste = atual.some((item) => item.id === pokemon.id);

      if (jaExiste) {
        return atual.map((item) =>
          item.id === pokemon.id
            ? { ...item, quantidade: Math.min(item.quantidade + 1, 99) }
            : item,
        );
      }

      return [
        ...atual,
        {
          id: pokemon.id,
          nome: pokemon.nome,
          imagem: pokemon.imagem,
          preco: pokemon.preco,
          apelido: "",
          quantidade: 1,
        },
      ];
    });
  }

  // UPDATE: troca só os campos recebidos em "alteracoes"
  function editarItem(id, alteracoes) {
    setCarrinho((atual) =>
      atual.map((item) => (item.id === id ? { ...item, ...alteracoes } : item)),
    );
  }

  // DELETE
  function removerItem(id) {
    setCarrinho((atual) => atual.filter((item) => item.id !== id));
  }

  // Transforma o carrinho em um pedido, salva no histórico e esvazia o carrinho.
  function finalizarCompra(cliente) {
    const pedido = {
      id: Date.now().toString(36).toUpperCase(),
      data: new Date().toISOString(),
      cliente: cliente.nome,
      email: cliente.email,
      metodo: cliente.metodo,
      itens: carrinho,
      total: calcularTotal(carrinho),
    };

    setHistorico((atual) => [pedido, ...atual]);
    setCarrinho([]);
    return pedido.id;
  }

  function removerPedido(id) {
    setHistorico((atual) => atual.filter((pedido) => pedido.id !== id));
  }

  return (
    <BrowserRouter>
      <Navbar totalItens={contarUnidades(carrinho)} />

      <main className={styles.principal}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route
            path="/catalogo"
            element={
              <Catalogo
                carrinho={carrinho}
                onAdicionar={adicionarAoCarrinho}
                onEditar={editarItem}
                onRemover={removerItem}
              />
            }
          />
          <Route
            path="/pagamento"
            element={
              <Pagamentos carrinho={carrinho} onFinalizar={finalizarCompra} />
            }
          />
          <Route
            path="/obrigado"
            element={<Obrigado historico={historico} />}
          />
          <Route
            path="/historico"
            element={
              <Historico
                historico={historico}
                onRemoverPedido={removerPedido}
                onLimpar={() => setHistorico([])}
              />
            }
          />
          <Route path="*" element={<Notfound />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
