import { useState } from "react";
import "./Tarefa.css";

const possibleStates = ["DESCREVENDO", "ATUALIZANDO", "FINALIZANDO"];

function Tarefa({
  tarefa: { content, id, isFavorite, isDone },
  toggleFavorite,
}) {
  const [state, setState] = useState(possibleStates[0]);

  if (state === "DESCREVENDO") {
    // {isFavorite ? favoriteColor = "tomato" }

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
          <button value={id}>finalizada</button>
          <button value={id}>alterar</button>
          <button value={id}>remover</button>
        </div>
      </article>
    );
  }
  if (state === "ATUALIZANDO") {
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
  if (state === "FINALIZANDO") {
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
