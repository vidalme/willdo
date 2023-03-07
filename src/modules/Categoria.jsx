import Tarefa from "./Tarefa";
import "./Categoria.css";
import { useState } from "react";

//id unica para cada categoria criada (cheating a lil bit here)
let uniqueID = 0;

const possibleStates = ["NORMAL", "ALTERAR_TITULO"];

function Categoria({ name, id, removeCategoria }) {
  const [stateForm, setStateForm] = useState(possibleStates[0]);
  const [titulo, setTitulo] = useState(name);

  const [tarefas, setTarefas] = useState([]);

  function adicionaTarefa(e) {
    e.preventDefault();

    const favoritasTarefas = tarefas.filter((tarefa) => tarefa.isFavorite);
    const naoFavoritasTarefas = tarefas.filter((tarefa) => !tarefa.isFavorite);

    const novasTarefas = [
      ...favoritasTarefas,
      {
        content: e.target.novaTarefaInput.value,
        id: uniqueID++,
        isFavorite: false,
        isDone: false,
        state: "DESCRITO",
      },
      ...naoFavoritasTarefas,
    ];

    setTarefas(novasTarefas);
  }

  function removeTarefa(e) {
    setTarefas([
      ...tarefas.filter((tarefa) => {
        return tarefa.id !== Number(e.target.value);
      }),
    ]);
  }

  function toggleFavorite(e) {
    const id = Number(e.target.value);
    const essaTarefa = tarefas.find((tarefa) => tarefa.id === id);

    let novaOrdemTarefas = [];
    if (!essaTarefa.isFavorite) {
      novaOrdemTarefas = moveTopoListaTarefas(essaTarefa);
    } else {
      novaOrdemTarefas = moveAbaixoFavoritos(essaTarefa); //moveFundoListaTarefas(essaTarefa);
    }

    essaTarefa.isFavorite = !essaTarefa.isFavorite;
    setTarefas([...novaOrdemTarefas]);
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
    setTarefas([...novaOrdemTarefas]);
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
    setTarefas([...novasTarefas]);
  }

  function salvaAlterarTarefa(e) {
    console.log("oi");
    // const id = Number(e.target.value);
    // const novasTarefas = tarefas.map((tarefa) => {
    //   if (tarefa.id === id) {
    //     // tarefa.id
    //   }
    // });
  }

  function cancelaAlterarTarefa(e) {
    const id = Number(e.target.value);
    const novasTarefas = tarefas.map((tarefa) => {
      if (tarefa.id === id) {
        tarefa.state = "DESCRITO";
      }
      return tarefa;
    });
    setTarefas([...novasTarefas]);
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
