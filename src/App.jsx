import { useState } from "react";
import Categoria from "./modules/Categoria";
import "./App.css";
import TarefasContext from "./TarefasContext";
import Tarefa from "./modules/Tarefa";

//confere se tem dados ja salvos no cliente, se nao tiver seta pra iniciar do zero
const cachedJson = JSON.parse(localStorage.getItem("categorias"));
const cachedCategorias = cachedJson ? cachedJson : [];

const dataas = new Date();
const n = Number(23432);

//meio que cheating aqui, tenho que ver direitinho pra criar IDs unicas
//se tiver categorias no json do cliente, procuro elemento com id mais alto
// comeco a contar o meu uniqueID a partir do id mais alto encontrado no cliente
let uniqueID = cachedJson
  ? cachedJson.reduce((acc, ele) => {
      return ele.id > acc ? ele.id : acc;
    }, 0) + 1
  : 0;

export default function App() {
  const [categorias, setCategorias] = useState([...cachedCategorias]);

  //funcao chamada sempre que há mudanca no state
  //atualiza o localStorage e use o state
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
        id: uniqueID++,
        tarefas: [],
      },
    ];
    setNovasCategorias(novasCategorias);
  }

  function removeCategoria(id) {
    const novasCategorias = categorias.filter((categoria) => {
      return id !== categoria.id;
    });
    setNovasCategorias(novasCategorias);
  }

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
          <button className="adicionar-categoria-botao">+</button>
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
                  tarefas={categoria.tarefas}
                  removeCategoria={removeCategoria}
                />
              );
            })
          : null}
      </section>
    </main>
  );
}
