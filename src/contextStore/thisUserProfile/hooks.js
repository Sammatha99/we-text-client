import { useContext } from "react";
import Context from "./Context";

export const useStore = () => {
  const [thisUserProfileState, thisUserProfileDispatch] = useContext(Context);
  return [thisUserProfileState, thisUserProfileDispatch];
};
