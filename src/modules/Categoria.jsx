import Tarefa from "./Tarefa";
import "./Categoria.css";
function Categoria({ name, id }) {
  console.log("cade eu/??");
  return (
    <article className="categoria">
      <header>
        <div className="header-categoria">
          <h2>{name}</h2>
          <button> alterar </button>
          <button> remover </button>
        </div>
        <form action="./" className="form-adicionar-tarefa">
          <input type="text" name="" id="" />
          <button> adicionar tarefa</button>
        </form>
      </header>
      <div>
        <Tarefa estado="DESCREVENDO" />
        <Tarefa estado="DESCREVENDO" />
        {/* <Tarefa estado="ATUALIZANDO" /> */}
        <Tarefa estado="FINALIZANDO" />
      </div>
    </article>
  );
}

export default Categoria;
