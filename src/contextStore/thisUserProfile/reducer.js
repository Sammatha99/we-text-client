import { ADD_FOLLOWINGS, ADD_FOLLOWERS } from "./constants";

const initState = {
  followings: [],
  followers: [],
};

function reducer(state, action) {
  switch (action.type) {
    case ADD_FOLLOWINGS:
      return {
        ...state,
        followings: [...state.followings, ...action.payload],
      };
    case ADD_FOLLOWERS:
      return {
        ...state,
        followers: [...state.followers, ...action.payload],
      };
    default:
      return { ...state };
  }
}

export { initState };
export default reducer;
