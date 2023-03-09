import { CgPlayListAdd } from "react-icons/cg";

const FormCriacaoCategoria = ({ adicionaCategoria }) => {
  return (
    <section style={{ marginTop: "2rem", marginBottom: "1rem" }}>
      <h1 style={{ textAlign: "center" }}>Willdo</h1>
      <form className="" onSubmit={adicionaCategoria}>
        <label className="form-label" htmlFor=""></label>
        <div className="input-group">
          <input
            className="form-control form-control-lg"
            placeholder="Nova categoria"
            name="name"
          ></input>
          <button
            title="Criar nova categoria"
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
