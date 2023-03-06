import { useState } from "react";
import Categoria from "./modules/Categoria";
import "./App.css";

//id unica para cada categoria criada (cheating a lil bit here)
let uniqueID = 0;

export default function App() {
  const [categorias, setCategorias] = useState([]);

  function handleSubmit(e) {
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

  return (
    <main className="app-main">
      <section className="adicionar-categoria">
        <h1>Adicionar categoria</h1>
        <form action="" onSubmit={handleSubmit}>
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
              {
                console.log(categoria);
              }

              return (
                <Categoria
                  name={categoria.name}
                  id={categoria.id}
                  key={categoria.id}
                />
              );
            })
          : null}
      </section>
    </main>
  );
}
