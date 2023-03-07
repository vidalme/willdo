import { useState } from "react";
import "./Tarefa.css";

function Tarefa({
  tarefa: { content, id, isFavorite, isDone, state },
  toggleFavorite,
  toggleDone,
  removeTarefa,
  recuperaTarefa,
  alteraTarefa,
  salvaAlterarTarefa,
  cancelaAlterarTarefa,
}) {
  const [editTarefa, setEditTarefa] = useState("");
  function handleChange(e) {
    setEditTarefa(e.target.value);
  }

  if (state === "DESCRITO") {
    let favoriteColor = "";
    isFavorite ? (favoriteColor = "tomato") : (favoriteColor = "");

    return (
      <article style={{ backgroundColor: favoriteColor }}>
        <div className="tarefa-metade-cima">
          <h4>{content}</h4>
        </div>
        <div className="tarefa-metade-baixo">
          <button onClick={(e) => toggleFavorite(e)} value={id}>
            {isFavorite ? "Desfavoritar" : "Favoritar"}
          </button>
          <button onClick={(e) => toggleDone(e)} value={id}>
            finalizada
          </button>
          <button onClick={(e) => alteraTarefa(e)} value={id}>
            alterar
          </button>
          <button onClick={(e) => removeTarefa(e)} value={id}>
            remover
          </button>
        </div>
      </article>
    );
  }
  if (state === "ALTERA") {
    return (
      <article>
        <div className="tarefa-metade-cima">
          <input
            type="text"
            name="nome"
            onChange={handleChange}
            onSubmit={salvaAlterarTarefa}
            value={editTarefa}
          />
        </div>
        <div className="tarefa-metade-baixo">
          <button type="submit">salvar</button>
          <button
            onClick={(e) => {
              cancelaAlterarTarefa(e);
            }}
            value={id}
          >
            cancelar
          </button>
        </div>
      </article>
    );
  }
  if (state === "FINALIZA") {
    return (
      <article>
        <div
          className="tarefa-metade-cima"
          style={{
            color: "gray",
            textDecoration: "line-through",
            fontStyle: "italic",
          }}
        >
          <h4>{content}</h4>
        </div>
        <div className="tarefa-metade-baixo">
          <button onClick={(e) => recuperaTarefa(e)} value={id}>
            recuperar
          </button>
          <button onClick={(e) => removeTarefa(e)} value={id}>
            remover
          </button>
        </div>
      </article>
    );
  }
}

export default Tarefa;
