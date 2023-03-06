import { useState } from "react";
import "./Tarefa.css";

function Tarefa({
  tarefa: { content, id, isFavorite, isDone, state },
  toggleFavorite,
  toggleDone,
}) {
  if (state === "DESCRITO") {
    // {isFavorite ? favoriteColor = "tomato" }

    let favoriteColor = "";
    isFavorite ? (favoriteColor = "tomato") : (favoriteColor = "");
    // isDone ? :

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
          <button value={id}>alterar</button>
          <button value={id}>remover</button>
        </div>
      </article>
    );
  }
  if (state === "ATUALIZA") {
    return (
      <article>
        <div className="tarefa-metade-cima">
          <input type="text" />
        </div>
        <div className="tarefa-metade-baixo">
          <button>salvar</button>
          <button>cancelar</button>
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
          <button>recuperar</button>
          <button>remover</button>
        </div>
      </article>
    );
  }
}

export default Tarefa;
