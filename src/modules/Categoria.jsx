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

    setTarefas(() => {
      return [
        ...tarefas,
        {
          content: e.target.novaTarefaInput.value,
          id: uniqueID,
          isFavorite: false,
          isDone: false,
          state: "DESCRITO",
        },
      ];
    });
    uniqueID++;
  }
  function removeTarefa() {}

  function toggleFavorite(e) {
    const id = Number(e.target.value);
    const essaTarefa = tarefas.find((tarefa) => tarefa.id === id);

    let novaOrdemTarefas = [];
    if (!essaTarefa.isFavorite) {
      novaOrdemTarefas = moveTopoListaTarefas(essaTarefa);
    } else {
      novaOrdemTarefas = moveFundoListaTarefas(essaTarefa);
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

  function handleAlteracaoTitulo(e) {
    e.preventDefault();
    setTitulo(e.target.alteraTituloInput.value);
    setStateForm("NORMAL");
  }

  function toggleDone(e) {
    const essaTarefa = tarefas.find((tarefa) => {
      return tarefa.id === Number(e.target.value);
    });

    if (!essaTarefa.isDone) {
      if (essaTarefa.isFavorite) {
        toggleFavorite(e);
      } else {
        moveFundoListaTarefas(essaTarefa);
      }
      essaTarefa.isDone = true;
      essaTarefa.state = "FINALIZA";
    } else {
      essaTarefa.isDone = false;
      essaTarefa.state = "DESCRITO";
    }

    setTarefas([...tarefas]);
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

        <section>{ListaTarefas(tarefas, toggleFavorite, toggleDone)}</section>
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
        <section>{ListaTarefas(tarefas, toggleFavorite, toggleDone)}</section>
      </article>
    );
  }
}

function ListaTarefas(tarefas, toggleFavorite, toggleDone) {
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
            />
          );
        })}
      </div>
    );
  }
}

export default Categoria;
