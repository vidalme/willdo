import { useState } from "react";
import Categoria from "./modules/Categoria";
import "./App.css";

//id unica para cada categoria criada (cheating a lil bit here)
let uniqueID = 0;

export default function App() {
  const [categorias, setCategorias] = useState([]);

  function adicionaCategoria(e) {
    e.preventDefault();
    setCategorias([
      ...categorias,
      {
        name: e.target.name.value,
        id: uniqueID,
      },
    ]);
    uniqueID++;
  }

  function removeCategoria(id) {
    const novasCategorias = categorias.filter((categoria) => {
      return id !== categoria.id;
    });
    setCategorias(novasCategorias);
  }

  function removeTodos() {}

  return (
    <main className="app-main">
      <section className="adicionar-categoria">
        <h1>Adicionar categoria</h1>
        <form action="" onSubmit={adicionaCategoria}>
          <input
            className="adicionar-categoria-input"
            type="text"
            name="name"
            id=""
          />
          <button>+</button>
        </form>
      </section>
      <section className="categorias-section">
        {categorias.length > 0
          ? categorias.map((categoria) => {
              return (
                <Categoria
                  name={categoria.name}
                  id={categoria.id}
                  key={categoria.id}
                  removeCategoria={removeCategoria}
                />
              );
            })
          : null}
      </section>
    </main>
  );
}
