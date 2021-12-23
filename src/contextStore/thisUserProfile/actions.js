import { ADD_FOLLOWERS, ADD_FOLLOWINGS } from "./constants";

export const addFollowings = (payload) => ({
  type: ADD_FOLLOWINGS,
  payload,
});

export const addFollowers = (payload) => ({
  type: ADD_FOLLOWERS,
  payload,
});
