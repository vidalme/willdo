import Tarefa from "./Tarefa";

function ListaTarefas({
  tarefas,
  removeTarefa,
  recuperaTarefa,
  alteraTarefa,
  salvaAlterarTarefa,
  cancelaAlterarTarefa,
  toggleFavorite,
  toggleDone,
}) {
  if (tarefas) {
    return (
      <section>
        {tarefas.map((tarefa) => {
          return (
            <Tarefa
              key={tarefa.id}
              tarefa={{ ...tarefa }}
              toggleFavorite={toggleFavorite}
              toggleDone={toggleDone}
              removeTarefa={removeTarefa}
              recuperaTarefa={recuperaTarefa}
              alteraTarefa={alteraTarefa}
              salvaAlterarTarefa={salvaAlterarTarefa}
              cancelaAlterarTarefa={cancelaAlterarTarefa}
            />
          );
        })}
      </section>
    );
  }
}

export default ListaTarefas;
