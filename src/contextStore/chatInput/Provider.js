import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

function Provider({ children }) {
  const [messageState, messageDispatch] = useReducer(reducer, initState);

  return (
    <Context.Provider value={[messageState, messageDispatch]}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
