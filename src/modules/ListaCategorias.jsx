import Categoria from "./Categoria";
import FormCriacaoCategoria from "./FormCriacaoCategoria";
import { useState } from "react";
import { motion } from "framer-motion";

//confere se tem dados ja salvos no cliente, se nao tiver seta pra iniciar do zero
const cachedJson = JSON.parse(localStorage.getItem("categorias"));
const cachedCategorias = cachedJson ? cachedJson : [];

function ListaCategorias() {
  const [categorias, setCategorias] = useState([...cachedCategorias]);

  function setNovasCategorias(novasCategorias) {
    localStorage.setItem("categorias", JSON.stringify(novasCategorias));
    setCategorias([...novasCategorias]);
  }

  function adicionaCategoria(e) {
    e.preventDefault();
    const novasCategorias = [
      ...categorias,
      {
        name: e.target.name.value,
        id: new Date().getTime(),
        tarefas: [],
      },
    ];
    e.target.reset();

    setNovasCategorias(novasCategorias);
  }

  function removeCategoria(id) {
    const novasCategorias = categorias.filter((categoria) => {
      return id !== categoria.id;
    });
    setNovasCategorias(novasCategorias);
  }

  return (
    <main>
      <FormCriacaoCategoria adicionaCategoria={adicionaCategoria} />

      <section className="categorias-section">
        {categorias.length > 0
          ? categorias.map((categoria) => {
              return (
                <Categoria
                  key={categoria.id}
                  categoria={categoria}
                  categorias={categorias}
                  setNovasCategorias={setNovasCategorias}
                  removeCategoria={removeCategoria}
                />
              );
            })
          : null}
      </section>
    </main>
  );
}

export default ListaCategorias;
