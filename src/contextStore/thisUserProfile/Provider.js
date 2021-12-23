import { useReducer } from "react";
import Context from "./Context";
import reducer, { initState } from "./reducer";

function Provider({ children }) {
  const [thisUserProfileState, thisUserProfileDispatch] = useReducer(
    reducer,
    initState
  );
  return (
    <Context.Provider value={[thisUserProfileState, thisUserProfileDispatch]}>
      {children}
    </Context.Provider>
  );
}

export default Provider;
