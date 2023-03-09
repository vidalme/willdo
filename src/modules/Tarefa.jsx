import "./Tarefa.css";
import { MdFavoriteBorder } from "react-icons/md";
import { MdFavorite } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { MdOutlineDeleteForever } from "react-icons/md";
import { MdOutlineSave } from "react-icons/md";
import { MdUndo } from "react-icons/md";
import { AiFillFire } from "react-icons/ai";
import { AiOutlineFire } from "react-icons/ai";

function Tarefa({
  tarefa: { content, id, isFavorite, isDone, state },
  toggleFavorite,
  toggleDone,
  removeTarefa,
  recuperaTarefa,
  alteraTarefa,
  salvaAlterarTarefa,
}) {
  if (state === "DESCRITO") {
    return (
      <article
        style={{
          // backgroundColor: "whitesmoke",
          paddingTop: "1rem",
          paddingBottom: ".5rem",
        }}
      >
        <div>
          {isFavorite ? (
            <h6
              style={{
                color: "white",
                backgroundColor: "crimson",
                padding: ".5rem",
              }}
            >
              {content}
            </h6>
          ) : (
            <h6 style={{ padding: ".5rem" }}>{content}</h6>
          )}
        </div>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic example"
          style={{
            display: "grid",
            gridTemplateColumns: "6fr 3fr 1fr 1fr",
          }}
        >
          <button
            title="Concluida"
            className="btn btn-outline-success"
            onClick={(e) => toggleDone(e)}
            value={id}
          >
            <MdDone style={{ pointerEvents: "none" }} />
          </button>
          <button
            title="Urgentes"
            className="btn btn-outline-danger"
            onClick={(e) => toggleFavorite(e)}
            value={id}
          >
            {isFavorite ? (
              <AiFillFire style={{ pointerEvents: "none" }} />
            ) : (
              <AiOutlineFire style={{ pointerEvents: "none" }} />
            )}
          </button>
          <button
            title="Editar Tarefa"
            className="btn btn-outline-secondary"
            onClick={(e) => alteraTarefa(e)}
            value={id}
          >
            <MdDriveFileRenameOutline style={{ pointerEvents: "none" }} />
          </button>
          <button
            title="Remover Tarefa"
            className="btn btn-outline-secondary"
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
      <article
        style={{
          // backgroundColor: "whitesmoke",
          paddingTop: "1rem",
          paddingBottom: "2.75rem",
        }}
      >
        <form
          id={id}
          name="form1"
          className="tarefa-metade-cima"
          onSubmit={salvaAlterarTarefa}
        >
          <div className="input-group">
            <input
              className="form-control form-control-sm"
              type="text"
              name="content"
              placeholder="Nova tarefa"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
            <button className="btn btn-primary" type="submit">
              <MdOutlineSave style={{ pointerEvents: "none" }} />
            </button>
          </div>
        </form>
      </article>
    );
  }
  if (state === "FINALIZA") {
    return (
      <article>
        <div
          style={{
            color: "darkgrey",
            textDecoration: "line-through",
            fontStyle: "italic",
            marginTop: "1rem",
            paddingLeft: ".5rem",
          }}
        >
          <p>{content}</p>
        </div>
        <div
          className="btn-group btn-group-sm"
          role="group"
          aria-label="Basic example"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr 4fr",
          }}
        >
          <button
            className="btn btn-outline-secondary"
            onClick={(e) => recuperaTarefa(e)}
            value={id}
          >
            <MdUndo style={{ pointerEvents: "none" }} />
          </button>
          <button
            className="btn btn-outline-secondary"
            onClick={(e) => removeTarefa(e)}
            value={id}
          >
            <MdOutlineDeleteForever style={{ pointerEvents: "none" }} />
          </button>
        </div>
      </article>
    );
  }
}

export default Tarefa;
