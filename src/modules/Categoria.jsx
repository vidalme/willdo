import ListaTarefas from "./ListaTarefas";
import { useState } from "react";
import { motion } from "framer-motion";

import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineSave } from "react-icons/md";

const possibleStates = ["NORMAL", "ALTERAR_TITULO"];

function Categoria({
  categoria,
  categorias,
  setNovasCategorias,
  removeCategoria,
}) {
  const [stateForm, setStateForm] = useState(possibleStates[0]);
  const [titulo, setTitulo] = useState(categoria.name);
  const [tarefas, setTarefas] = useState([...categoria.tarefas]);

  function setNovasTarefas(novasTarefas) {
    const novaCategoria = { ...categoria, tarefas: [...novasTarefas] };
    const novasCategorias = categorias.map((categ) => {
      if (categ.id === categoria.id) return novaCategoria;
      return categ;
    });

    setTarefas([...novasTarefas]);
    setNovasCategorias([...novasCategorias]);
  }

  //adiciona nova tarefa
  function adicionaTarefa(e) {
    e.preventDefault();

    // separa as tarefas existentes em grupos baseado na importancia
    const favoritasTarefas = tarefas.filter((tarefa) => tarefa.isFavorite);
    const naoFavoritasTarefas = tarefas.filter((tarefa) => !tarefa.isFavorite);
    const novaTarefa = {
      content: e.target.novaTarefaInput.value,
      id: new Date().getTime(),
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
    e.target.reset();

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

  if (stateForm === "NORMAL") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
      >
        <article
          className="card"
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#eeeeee",
          }}
        >
          <header>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: ".8rem",
                marginTop: ".5rem",
                alignItems: "start",
              }}
            >
              <h5 style={{ marginLeft: ".5rem" }}>{titulo}</h5>

              <div
                className="btn-group btn-group-"
                role="group"
                aria-label="Basic example"
              >
                <button
                  title="Editar categoria"
                  className=" btn btn-outline-secondary sm"
                  onClick={() => {
                    setStateForm(possibleStates[1]);
                  }}
                >
                  <MdDriveFileRenameOutline style={{ pointerEvents: "none" }} />
                </button>
                <button
                  title="Remover Categoria"
                  className="btn btn-outline-secondary"
                  onClick={() => {
                    removeCategoria(categoria.id);
                  }}
                >
                  <MdOutlineDeleteForever style={{ pointerEvents: "none" }} />
                </button>
              </div>
            </div>

            <form
              action="./"
              className="form-adicionar-tarefa"
              onSubmit={(e) => {
                adicionaTarefa(e);
              }}
            >
              <div className="input-group">
                <input
                  className="form-control"
                  type="text"
                  name="novaTarefaInput"
                  placeholder="Criar nova tarefa"
                />
                <button
                  title="Nova tarefa"
                  className="btn btn-primary"
                  style={{ width: "2.6rem" }}
                >
                  +
                </button>
              </div>
            </form>
          </header>
          <hr />
          <div>
            <ListaTarefas
              tarefas={tarefas}
              removeTarefa={removeTarefa}
              alteraTarefa={alteraTarefa}
              recuperaTarefa={recuperaTarefa}
              salvaAlterarTarefa={salvaAlterarTarefa}
              cancelaAlterarTarefa={cancelaAlterarTarefa}
              toggleDone={toggleDone}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </article>
      </motion.div>
    );
  }
  if (stateForm === "ALTERAR_TITULO") {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "easeOut", duration: 0.25 }}
      >
        <article
          className="card"
          style={{
            marginTop: "2rem",
            padding: "1rem",
            backgroundColor: "#eeeeee",
          }}
        >
          <header style={{ marginTop: "0rem", marginBottom: "3.4rem" }}>
            <form
              onSubmit={(e) => {
                handleAlteracaoTitulo(e);
              }}
            >
              <div className="input-group">
                <input
                  className="form-control form-control-md"
                  placeholder="novo titulo"
                  name="alteraTituloInput"
                  id="alteraTituloInput"
                />
                <button
                  title="Salvar Categoria"
                  className="btn btn-primary"
                  action="submit"
                >
                  <MdOutlineSave style={{ pointerEvents: "none" }} />
                </button>
              </div>
            </form>
          </header>
          <hr />
          <div>
            <ListaTarefas
              tarefas={tarefas}
              removeTarefa={removeTarefa}
              alteraTarefa={alteraTarefa}
              recuperaTarefa={recuperaTarefa}
              salvaAlterarTarefa={salvaAlterarTarefa}
              cancelaAlterarTarefa={cancelaAlterarTarefa}
              toggleDone={toggleDone}
              toggleFavorite={toggleFavorite}
            />
          </div>
        </article>
      </motion.div>
    );
  }
}

export default Categoria;
