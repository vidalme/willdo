const FormCriacaoCategoria = ({ adicionaCategoria }) => {
  return (
    <section className="container">
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
          <button className="btn btn-primary" type="submit">
            +
          </button>
        </div>
      </form>
    </section>
  );
};

export default FormCriacaoCategoria;
