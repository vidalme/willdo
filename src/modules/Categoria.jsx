import Tarefa from "./Tarefa";
import "./Categoria.css";
import { useState } from "react";

// const jsonCateg = JSON.parse(localStorage.getItem("categorias"));

// console.log(jsonCateg);

// //confere se tem dados ja salvos no cliente, se nao tiver seta pra iniciar do zero
// const cachedJson = JSON.parse(localStorage.getItem("tarefas"));
// const cachedTarefas = cachedJson ? cachedJson : [];

// //meio que cheating aqui, tenho que ver direitinho pra criar IDs unicas
// //se tiver categorias no json do cliente, procuro elemento com id mais alto
// // comeco a contar o meu uniqueID a partir do id mais alto encontrado no cliente
let uniqueID = 0;
// let uniqueID = cachedJson
//   ? cachedJson.reduce((acc, ele) => {
//       return ele.id > acc ? ele.id : acc;
//     }, 0) + 1
//   : 0;

const possibleStates = ["NORMAL", "ALTERAR_TITULO"];

function Categoria({ name, id, tarefas: tarefasHerdadas, removeCategoria }) {
  //aparencias possiveis para o cabecalho da categoria
  const [stateForm, setStateForm] = useState(possibleStates[0]);
  //edita o nome em disply da categoria
  const [titulo, setTitulo] = useState(name);

  const [tarefas, setTarefas] = useState([]);

  function setNovasTarefas(novasTarefas) {
    tarefasHerdadas = [...novasTarefas];
    //localStorage.setItem("tarefas", JSON.stringify(novasTarefas));
    setTarefas([...novasTarefas]);
    //console.log(novasTarefas);
  }

  //adiciona nova tarefa
  function adicionaTarefa(e) {
    e.preventDefault();

    // separa as tarefas existentes em grupos baseado na importancia
    const favoritasTarefas = tarefas.filter((tarefa) => tarefa.isFavorite);
    const naoFavoritasTarefas = tarefas.filter((tarefa) => !tarefa.isFavorite);
    const novaTarefa = {
      content: e.target.novaTarefaInput.value,
      id: uniqueID++,
      isFavorite: false,
      isDone: false,
      state: "DESCRITO",
    };

    //adiciona a nova tarefa na posição correta (abaixo das favoritas mas no topo da lista)
    const novasTarefas = [
      ...favoritasTarefas,
      novaTarefa,
      ...naoFavoritasTarefas,
    ];

    setNovasTarefas(novasTarefas);
  }
  function removeTarefa(e) {
    //identifica e remove quem pediu pra ser removida
    setNovasTarefas([
      ...tarefas.filter((tarefa) => {
        return tarefa.id !== Number(e.target.value);
      }),
    ]);
  }

  //liga e desiliga a flag se uma tarefa epecifica é favorita
  function toggleFavorite(e) {
    const id = Number(e.target.value);
    const essaTarefa = tarefas.find((tarefa) => tarefa.id === id);

    let novaOrdemTarefas = [];
    if (!essaTarefa.isFavorite) {
      novaOrdemTarefas = moveTopoListaTarefas(essaTarefa);
    } else {
      novaOrdemTarefas = moveAbaixoFavoritos(essaTarefa);
    }

    essaTarefa.isFavorite = !essaTarefa.isFavorite;
    setNovasTarefas([...novaOrdemTarefas]);
  }

  function moveTopoListaTarefas(essaTarefa) {
    const semEssaTarefa = tarefas.filter((tarefa) => {
      return tarefa !== essaTarefa;
    });
    return [essaTarefa, ...semEssaTarefa];
  }

  function moveFundoListaTarefas(essaTarefa) {
    const semEssaTarefa = tarefas.filter((tarefa) => {
      return tarefa !== essaTarefa;
    });
    return [...semEssaTarefa, essaTarefa];
  }

  function moveAbaixoFavoritos(essaTarefa) {
    const semEssaTarefa = tarefas.filter((tarefa) => {
      return tarefa.id !== essaTarefa.id;
    });
    const tarefasFavoritas = semEssaTarefa.filter((tarefa) => {
      return tarefa.isFavorite;
    });
    const tarefasNaoFavoritas = semEssaTarefa.filter((tarefa) => {
      return !tarefa.isFavorite;
    });

    return [...tarefasFavoritas, essaTarefa, ...tarefasNaoFavoritas];
  }

  function handleAlteracaoTitulo(e) {
    e.preventDefault();
    setTitulo(e.target.alteraTituloInput.value);
    setStateForm("NORMAL");
  }

  function toggleDone(e) {
    const essaTarefa = tarefas.find((tarefa) => {
      return tarefa.id === Number(e.target.value);
    });

    let novaOrdemTarefas = [];
    if (!essaTarefa.isDone) {
      novaOrdemTarefas = [...moveFundoListaTarefas(essaTarefa)];
      essaTarefa.isFavorite = false;
      essaTarefa.isDone = true;
      essaTarefa.state = "FINALIZA";
    } else {
      essaTarefa.isDone = false;
      essaTarefa.state = "DESCRITO";
      novaOrdemTarefas = [...tarefas];
    }
    setNovasTarefas([...novaOrdemTarefas]);
  }

  function recuperaTarefa(e) {
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === Number(e.target.value)) {
        toggleDone(e);
      }
      return tarefa;
    });
  }
  function alteraTarefa(e) {
    const id = Number(e.target.value);
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.state = "ALTERA";
      }
      return tarefa;
    });
    setNovasTarefas([...novasTarefas]);
  }

  function salvaAlterarTarefa(e) {
    e.preventDefault();

    const id = Number(e.target.id);

    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.content = e.target.content.value;
        tarefa.state = "DESCRITO";
      }
      return tarefa;
    });

    setNovasTarefas([...novasTarefas]);
  }

  function cancelaAlterarTarefa(e) {
    const id = Number(e.target.value);
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.state = "DESCRITO";
      }
      return tarefa;
    });
    setNovasTarefas([...novasTarefas]);
  }

  if (stateForm === "NORMAL") {
    return (
      <article className="categoria">
        <header>
          <div className="header-categoria">
            <h2>{titulo}</h2>
            <button
              onClick={() => {
                setStateForm(possibleStates[1]);
              }}
            >
              {" "}
              alterar{" "}
            </button>
            <button
              onClick={() => {
                removeCategoria(id);
              }}
            >
              {" "}
              remover{" "}
            </button>
          </div>

          <form
            action="./"
            className="form-adicionar-tarefa"
            onSubmit={(e) => {
              adicionaTarefa(e);
            }}
          >
            <input type="text" name="novaTarefaInput" id="" />
            <button> adicionar tarefa</button>
          </form>
        </header>

        <section>
          {ListaTarefas(
            tarefas,
            toggleFavorite,
            toggleDone,
            removeTarefa,
            recuperaTarefa,
            alteraTarefa,
            salvaAlterarTarefa,
            cancelaAlterarTarefa
          )}
        </section>
      </article>
    );
  }
  if (stateForm === "ALTERAR_TITULO") {
    return (
      <article className="categoria">
        <header>
          <form
            action=""
            onSubmit={(e) => {
              handleAlteracaoTitulo(e);
            }}
          >
            <input
              style={{ margin: "5px" }}
              type="text"
              name="alteraTituloInput"
              id="alteraTituloInput"
            />
            <button action="submit">salvar</button>
            <button
              onClick={(e) => {
                e.preventDefault();
                setStateForm(possibleStates[0]);
              }}
            >
              cancelar
            </button>
          </form>
        </header>
        <section>
          {ListaTarefas(
            tarefas,
            toggleFavorite,
            toggleDone,
            removeTarefa,
            recuperaTarefa,
            alteraTarefa,
            salvaAlterarTarefa,
            cancelaAlterarTarefa
          )}
        </section>
      </article>
    );
  }
}

function ListaTarefas(
  tarefas,
  toggleFavorite,
  toggleDone,
  removeTarefa,
  recuperaTarefa,
  alteraTarefa,
  salvaAlterarTarefa,
  cancelaAlterarTarefa
) {
  if (tarefas) {
    return (
      <div>
        {tarefas.map((tarefa) => {
          return (
            <Tarefa
              key={tarefa.id}
              tarefa={{ ...tarefa }}
              toggleFavorite={toggleFavorite}
              toggleDone={toggleDone}
              removeTarefa={removeTarefa}
              recuperaTarefa={recuperaTarefa}
              alteraTarefa={alteraTarefa}
              salvaAlterarTarefa={salvaAlterarTarefa}
              cancelaAlterarTarefa={cancelaAlterarTarefa}
            />
          );
        })}
      </div>
    );
  }
}

export default Categoria;
