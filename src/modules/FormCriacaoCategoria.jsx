import React from "react";

const FormCriacaoCategoria = ({ adicionaCategoria }) => {
  return (
    <section className="adicionar-categoria">
      <h1>Adicionar categoria</h1>
      <form action="" onSubmit={adicionaCategoria}>
        <input
          className="adicionar-categoria-input"
          type="text"
          name="name"
          id=""
        />
        <button className="adicionar-categoria-botao">+</button>
      </form>
    </section>
  );
};

export default FormCriacaoCategoria;
