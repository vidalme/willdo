import { useState } from "react";
import "./Tarefa.css";

const possibleStates = ["DESCREVENDO", "ATUALIZANDO", "FINALIZANDO"];

function Tarefa({ estado }) {
  const [state, setState] = useState(possibleStates[2]);

  if (estado === "DESCREVENDO") {
    return (
      <article>
        <div className="tarefa-metade-cima">
          <h4>Eu sou a tarefa, vai estudar react</h4>
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
  if (estado === "ATUALIZANDO") {
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
  if (estado === "FINALIZANDO") {
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
          <h4>Eu sou a tarefa, vai estudar react</h4>
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
