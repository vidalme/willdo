import "./Tarefa.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";

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
  if (state === "DESCRITO") {
    let favoriteColor = "";
    isFavorite ? (favoriteColor = "lightgray") : (favoriteColor = "");
    return (
      <article style={{ backgroundColor: favoriteColor }}>
        <div className="tarefa-metade-cima">
          <p>{content}</p>
        </div>
        <div className="tarefa-metade-baixo">
          <button
            className="btn btn-outline-primary"
            onClick={(e) => toggleFavorite(e)}
            value={id}
          >
            {isFavorite ? (
              <MdFavorite style={{ pointerEvents: "none" }} />
            ) : (
              <MdFavoriteBorder style={{ pointerEvents: "none" }} />
            )}
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={(e) => toggleDone(e)}
            value={id}
          >
            <MdDone style={{ pointerEvents: "none" }} />
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={(e) => alteraTarefa(e)}
            value={id}
          >
            <MdDriveFileRenameOutline style={{ pointerEvents: "none" }} />
          </button>
          <button
            className="btn btn-outline-danger"
            onClick={(e) => removeTarefa(e)}
            value={id}
          >
            <MdOutlineDeleteForever style={{ pointerEvents: "none" }} />
          </button>
        </div>
      </article>
    );
  }
  if (state === "ALTERA") {
    return (
      <article className="container">
        <form
          id={id}
          name="form1"
          className="tarefa-metade-cima"
          onSubmit={salvaAlterarTarefa}
        >
          <input
            className="form-control form-control-sm"
            type="text"
            name="content"
          />
          <button className="btn btn-outline-primary" type="submit">
            salvar
          </button>
          <button
            className="btn btn-outline-primary"
            type="reset"
            onClick={(e) => {
              cancelaAlterarTarefa(e);
            }}
            value={id}
          >
            cancelar
          </button>
        </form>
      </article>
    );
  }
  if (state === "FINALIZA") {
    return (
      <article className="container">
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
          <button
            className="btn btn-outline-primary"
            onClick={(e) => recuperaTarefa(e)}
            value={id}
          >
            recuperar
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={(e) => removeTarefa(e)}
            value={id}
          >
            remover
          </button>
        </div>
      </article>
    );
  }
}

export default Tarefa;
