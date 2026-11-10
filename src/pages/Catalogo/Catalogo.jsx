import { useState, useEffect } from "react";
import PokemonCard from "../../components/PokemonCard/PokemonCard";
import Paginacao from "../../components/Paginacao/Paginacao";
import ModalFiltros from "../../components/ModalFiltros/ModalFiltros";
import { geracoes, tipos, categorias } from "../../utils/filtros";
import styles from "./Catalogo.module.css";

const POR_PAGINA = 20;

// busca um Pokémon e guarda só o que o site usa
const buscarPokemon = async (id) => {
  const resposta = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);

  if (!resposta.ok) {
    throw new Error("Falha na busca");
  }

  const dados = await resposta.json();

  return {
    id: dados.id,
    nome: dados.name,
    imagem: dados.sprites.other["official-artwork"].front_default,
    tipos: dados.types.map((item) => item.type.name),
    preco: dados.base_experience || 50, // preço fictício (50 se a API não mandar)
  };
};

// deixa só os Pokémon que passam em todos os filtros ao mesmo tempo
const filtrar = (todos, geracao, busca, idsDoTipo, categoria) => {
  const escolhida = categorias.find((item) => item.id === categoria);

  return todos.filter(
    (pokemon) =>
      pokemon.id >= geracao.inicio &&
      pokemon.id <= geracao.fim &&
      (pokemon.nome.includes(busca) || String(pokemon.id) === busca) &&
      (idsDoTipo === null || idsDoTipo.includes(pokemon.id)) &&
      (escolhida === undefined || escolhida.ids.includes(pokemon.id))
  );
};

function Catalogo(props) {
  const [todos, setTodos] = useState([]);
  const [pokemons, setPokemons] = useState([]);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState("");
  const [geracao, setGeracao] = useState(geracoes[0]);
  const [pagina, setPagina] = useState(1);
  const [texto, setTexto] = useState("");
  const [busca, setBusca] = useState("");
  const [modalAberto, setModalAberto] = useState(false);
  const [tipo, setTipo] = useState("");
  const [idsDoTipo, setIdsDoTipo] = useState(null);
  const [categoria, setCategoria] = useState("");

  // 1) busca uma vez a lista com o nome e o número de todos os Pokémon
  useEffect(() => {
    const buscarLista = async () => {
      try {
        const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=1025");

        if (!resposta.ok) {
          throw new Error("Falha na busca");
        }

        const dados = await resposta.json();

        // a url é ".../pokemon/25/", então o número fica na posição 6
        setTodos(
          dados.results.map((item) => ({
            id: Number(item.url.split("/")[6]),
            nome: item.name,
          }))
        );
      } catch {
        setErro("Não foi possível carregar os Pokémon.");
      }
    };

    buscarLista();
  }, []);

  // espera a pessoa parar de digitar por um instante e então aplica a busca
  useEffect(() => {
    const espera = setTimeout(() => {
      setBusca(texto.trim().toLowerCase());
      setPagina(1);
    }, 400);

    // se digitar outra letra antes dos 400 ms, cancela a espera anterior
    return () => {
      clearTimeout(espera);
    };
  }, [texto]);

  // 2) busca os detalhes só dos 20 Pokémon da página atual
  useEffect(() => {
    if (todos.length === 0) {
      return;
    }

    let cancelado = false;

    const inicio = (pagina - 1) * POR_PAGINA;
    const ids = filtrar(todos, geracao, busca, idsDoTipo, categoria)
      .slice(inicio, inicio + POR_PAGINA)
      .map((pokemon) => pokemon.id);

    const buscarPokemons = async () => {
      setCarregando(true);
      setErro("");
      setPokemons([]);

      try {
        // dispara as buscas juntas e espera todas terminarem
        const lista = await Promise.all(ids.map((id) => buscarPokemon(id)));

        if (!cancelado) {
          setPokemons(lista);
        }
      } catch {
        if (!cancelado) {
          setErro("Não foi possível carregar os Pokémon.");
        }
      } finally {
        if (!cancelado) {
          setCarregando(false);
        }
      }
    };

    buscarPokemons();

    // se algo mudar antes da busca terminar, ignora a resposta antiga
    return () => {
      cancelado = true;
    };
  }, [todos, geracao, pagina, busca, idsDoTipo, categoria]);

  const filtrados = filtrar(todos, geracao, busca, idsDoTipo, categoria);
  const totalPaginas = Math.ceil(filtrados.length / POR_PAGINA);

  const trocarGeracao = (novaGeracao) => {
    setGeracao(novaGeracao);
    setPagina(1);
  };

  const mudarPagina = (novaPagina) => {
    setPagina(novaPagina);
    window.scrollTo(0, 0);
  };

  const limpar = () => {
    setTexto("");
  };

  // recebe as escolhas do modal; para o tipo, pergunta à API quais Pokémon têm ele
  const aplicarFiltros = async (novoTipo, novaCategoria) => {
    setModalAberto(false);

    let ids = null;

    if (novoTipo !== "") {
      try {
        const resposta = await fetch(`https://pokeapi.co/api/v2/type/${novoTipo}`);

        if (!resposta.ok) {
          throw new Error("Falha na busca");
        }

        const dados = await resposta.json();

        // a lista também traz formas especiais (número acima de 10000): ficam de fora
        ids = dados.pokemon
          .map((item) => Number(item.pokemon.url.split("/")[6]))
          .filter((id) => id <= 1025);
      } catch {
        setErro("Não foi possível aplicar o filtro de tipo.");
        return;
      }
    }

    setTipo(novoTipo);
    setIdsDoTipo(ids);
    setCategoria(novaCategoria);
    setPagina(1);
  };

  // nomes dos filtros ativos, para mostrar embaixo da busca
  const ativos = [];
  if (tipo !== "") {
    ativos.push(tipos.find((item) => item.id === tipo).nome);
  }
  if (categoria !== "") {
    ativos.push(categorias.find((item) => item.id === categoria).nome);
  }

  return (
    <section>
      <h1 className={styles.titulo}>Catálogo</h1>
      <p className={styles.subtitulo}>
        {filtrados.length} Pokémon nesta seleção. Clique no Pokémon para ver os detalhes.
      </p>

      <div className={styles.busca}>
        <input
          type="text"
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Buscar por nome ou número (ex.: pikachu ou 25)"
          className={styles.campo}
        />
        {texto !== "" && (
          <button type="button" onClick={limpar} className={styles.botaoLimpar}>
            Limpar
          </button>
        )}
        <button
          type="button"
          onClick={() => setModalAberto(true)}
          className={styles.botaoFiltros}
        >
          Filtros
          {ativos.length > 0 && (
            <span className={styles.contador}>{ativos.length}</span>
          )}
        </button>
      </div>

      {ativos.length > 0 && (
        <p className={styles.ativos}>
          Filtros ativos: <strong>{ativos.join(" · ")}</strong>
          <button
            type="button"
            onClick={() => aplicarFiltros("", "")}
            className={styles.removerFiltros}
          >
            Remover
          </button>
        </p>
      )}

      {modalAberto && (
        <ModalFiltros
          tipo={tipo}
          categoria={categoria}
          aoAplicar={aplicarFiltros}
          aoFechar={() => setModalAberto(false)}
        />
      )}

      <div className={styles.filtros}>
        {geracoes.map((item) => (
          <button
            key={item.id}
            onClick={() => trocarGeracao(item)}
            className={
              item.id === geracao.id
                ? `${styles.filtro} ${styles.filtroAtivo}`
                : styles.filtro
            }
          >
            {item.nome}
          </button>
        ))}
      </div>

      {(carregando || (todos.length === 0 && erro === "")) && (
        <p className={styles.aviso}>Carregando Pokémon...</p>
      )}

      {erro && <p className={styles.erro}>{erro}</p>}

      {todos.length > 0 && filtrados.length === 0 && (
        <p className={styles.aviso}>Nenhum Pokémon encontrado com esses filtros.</p>
      )}

      <div className={styles.grade}>
        {pokemons.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            aoAdicionar={props.aoAdicionar}
          />
        ))}
      </div>

      {pokemons.length > 0 && totalPaginas > 1 && (
        <Paginacao pagina={pagina} totalPaginas={totalPaginas} aoMudar={mudarPagina} />
      )}
    </section>
  );
}

export default Catalogo;
