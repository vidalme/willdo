import { CgPlayListAdd } from "react-icons/cg";

const FormCriacaoCategoria = ({ adicionaCategoria }) => {
  return (
    <section className="container" style={{ margin: "2rem" }}>
      {/* <h1>Adicionar categoria</h1> */}
      <form className="" onSubmit={adicionaCategoria}>
        <label className="form-label" htmlFor="">
          Nova Categoria
        </label>
        <div className="input-group">
          <input
            className="form-control form-control-lg"
            placeholder="adicione categoria"
            name="name"
          ></input>
          <button
            className="btn btn-primary"
            type="submit"
            style={{ width: "5rem" }}
          >
            <CgPlayListAdd style={{ pointerEvents: "none" }} />
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormCriacaoCategoria;
