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
        },
      ];
    });
    uniqueID++;
  }
  function removeTarefa() {}

  function toggleFavorite(e) {
    const id = Number(e.target.value);
    const tarefaEssa = tarefas.find((tarefa) => tarefa.id === id);
    tarefaEssa.isFavorite = !tarefaEssa.isFavorite;

    let novaOrdemTarefas = [];
    if (tarefaEssa.isFavorite) {
      novaOrdemTarefas = moveTopoListaTarefas(tarefaEssa);
    } else {
      novaOrdemTarefas = moveFundoListaTarefas(tarefaEssa);
    }
    console.log(novaOrdemTarefas);
    setTarefas([...novaOrdemTarefas]);
  }

  function moveTopoListaTarefas(tarefaEssa) {
    const semEssaTarefa = tarefas.filter((tarefa) => {
      return tarefa !== tarefaEssa;
    });
    return [tarefaEssa, ...semEssaTarefa];
  }

  function moveFundoListaTarefas(tarefaEssa) {
    const semEssaTarefa = tarefas.filter((tarefa) => {
      return tarefa !== tarefaEssa;
    });
    return [...semEssaTarefa, tarefaEssa];
  }

  function handleAlteracaoTitulo(e) {
    e.preventDefault();
    setTitulo(e.target.alteraTituloInput.value);
    setStateForm("NORMAL");
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

        <section>{ListaTarefas(tarefas, toggleFavorite)}</section>
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
        <section>{ListaTarefas(tarefas, toggleFavorite)}</section>
      </article>
    );
  }
}

function ListaTarefas(tarefas, toggleFavorite) {
  if (tarefas) {
    return (
      <div>
        {tarefas.map((tarefa) => {
          return (
            <Tarefa
              key={tarefa.id}
              tarefa={{ ...tarefa }}
              toggleFavorite={toggleFavorite}
            />
          );
        })}
      </div>
    );
  }
}

export default Categoria;
