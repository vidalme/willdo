import { useState } from "react";
import "./Tarefa.css";

const possibleStates = ["DESCREVENDO", "ATUALIZANDO", "FINALIZANDO"];

function Tarefa({ tarefa: { content, id, isFavorite, isDone } }) {
  const [state, setState] = useState(possibleStates[0]);

  if (state === "DESCREVENDO") {
    console.log(id);
    return (
      <article style={{ backgroundColor: "tomato" }}>
        <div className="tarefa-metade-cima">
          <h4>{content}</h4>
        </div>
        <div className="tarefa-metade-baixo">
          <button>favorita</button>
          <button>finalizada</button>
          <button>alterar</button>
          <button>remover</button>
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
