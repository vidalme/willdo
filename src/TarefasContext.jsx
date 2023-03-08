import { createContext } from "react";

const TarefasContext = createContext(null);

export function TarefasProvider({ children }) {
  return (
    <TarefasContext.Provider value={{ item: 1 }}>
      {children}
    </TarefasContext.Provider>
  );
}

export default TarefasContext;
