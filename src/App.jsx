import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from "./App.module.css";

import Navbar from "./components/Navbar";
import Rodape from "./components/Rodape";

import Home from "./pages/Home";
import Catalogo from "./pages/Catalogo";
import Detalhe from "./pages/Detalhe";
import Carrinho from "./pages/Carrinho";
import Pagamento from "./pages/Pagamento";
import Obrigado from "./pages/Obrigado";
import Historico from "./pages/Historico";
import NaoEncontrada from "./pages/NaoEncontrada";

function App() {
  // estado compartilhado: mora no App porque várias páginas precisam dele
  const [carrinho, setCarrinho] = useState(() => {
    const salvo = localStorage.getItem("carrinho");
    return salvo ? JSON.parse(salvo) : [];
  });

  const [historico, setHistorico] = useState(() => {
    const salvo = localStorage.getItem("historico");
    return salvo ? JSON.parse(salvo) : [];
  });

  // salva toda vez que o estado mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  useEffect(() => {
    localStorage.setItem("historico", JSON.stringify(historico));
  }, [historico]);

  // CREATE: adiciona o pokémon (se já estiver no carrinho, soma 1 na quantidade)
  const adicionar = (pokemon) => {
    const existe = carrinho.find((item) => item.pokemonId === pokemon.id);

    if (existe) {
      setCarrinho(
        carrinho.map((item) =>
          item.pokemonId === pokemon.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        )
      );
    } else {
      setCarrinho([
        ...carrinho,
        {
          id: crypto.randomUUID(),
          pokemonId: pokemon.id,
          nome: pokemon.nome,
          imagem: pokemon.imagem,
          preco: pokemon.preco,
          quantidade: 1,
        },
      ]);
    }
  };

  // UPDATE: troca a quantidade de um item
  const editar = (id, quantidade) => {
    setCarrinho(
      carrinho.map((item) =>
        item.id === id ? { ...item, quantidade: quantidade } : item
      )
    );
  };

  // DELETE: tira o item do carrinho
  const remover = (id) => {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  };

  let total = 0;
  let quantidadeItens = 0;

  for (let i = 0; i < carrinho.length; i++) {
    total += carrinho[i].preco * carrinho[i].quantidade;
    quantidadeItens += carrinho[i].quantidade;
  }

  // finaliza a compra: guarda no histórico e esvazia o carrinho
  const finalizar = (dados) => {
    const compra = {
      id: crypto.randomUUID(),
      data: new Date().toLocaleString(),
      cliente: dados.nome,
      email: dados.email,
      pagamento: dados.pagamento,
      itens: carrinho,
      total: total,
    };

    setHistorico([compra, ...historico]);
    setCarrinho([]);
  };

  return (
    <BrowserRouter>
      <Navbar quantidade={quantidadeItens} />

      <main className={styles.conteudo}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalogo" element={<Catalogo aoAdicionar={adicionar} />} />
          <Route path="/pokemon/:id" element={<Detalhe aoAdicionar={adicionar} />} />
          <Route
            path="/carrinho"
            element={
              <Carrinho
                carrinho={carrinho}
                total={total}
                aoEditar={editar}
                aoRemover={remover}
              />
            }
          />
          <Route
            path="/pagamento"
            element={
              <Pagamento
                carrinho={carrinho}
                total={total}
                aoFinalizar={finalizar}
              />
            }
          />
          <Route path="/obrigado" element={<Obrigado compra={historico[0]} />} />
          <Route path="/historico" element={<Historico historico={historico} />} />
          <Route path="*" element={<NaoEncontrada />} />
        </Routes>
      </main>

      <Rodape />
    </BrowserRouter>
  );
}

export default App;
