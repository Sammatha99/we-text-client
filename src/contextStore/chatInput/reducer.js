import {
  ADD_IMAGES,
  REMOVE_IMAGE,
  UPDATE_MESSAGE,
  CLEAR_IMAGES,
  CLEAR_MESSAGE_STATE,
} from "./constants";

const initState = {
  images: [],
  text: "",
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_IMAGES:
      return {
        ...state,
        images: [...state.images, ...action.payload],
      };
    case REMOVE_IMAGE:
      state.images.splice(action.payload, 1); //action.payload = index: number
      return {
        ...state,
        images: state.images,
      };
    case CLEAR_IMAGES:
      return {
        ...state,
        images: [],
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        text: action.payload,
      };
    case CLEAR_MESSAGE_STATE:
      return { ...initState };
    default:
      return { ...state };
  }
}

export { initState };
export default reducer;
