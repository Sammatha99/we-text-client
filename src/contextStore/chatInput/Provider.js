import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

const logger = (reducer) => (state, action) => {
  console.group(action.type);

  console.log("prevState: ", state);

  const newState = reducer(state, action);

  console.log("newState: ", newState);

  console.groupEnd();

  return newState;
};

function Provider({ children }) {
  const [messageState, messageDispatch] = useReducer(
    logger(reducer),
    initState
  );

  return (
    <Context.Provider value={[messageState, messageDispatch]}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
