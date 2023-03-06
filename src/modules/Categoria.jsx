import Tarefa from "./Tarefa";
import "./Categoria.css";
function Categoria() {
  return (
    <article className="categoria">
      <h2>Nome da categoria</h2>
      <Tarefa />
    </article>
  );
}

export default Categoria;
