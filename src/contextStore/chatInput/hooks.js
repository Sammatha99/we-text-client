import { useContext } from "react";
import Context from "./Context";

export const useStore = () => {
  const [messageState, messageDispatch] = useContext(Context);
  return [messageState, messageDispatch];
};
