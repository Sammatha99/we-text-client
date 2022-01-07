import {
  ADD_IMAGES,
  REMOVE_IMAGE,
  UPDATE_MESSAGE,
  CLEAR_IMAGES,
  CLEAR_MESSAGE_STATE,
} from "./constants";

export const addImages = (payload) => ({
  type: ADD_IMAGES,
  payload,
});

export const removeImage = (payload) => ({
  type: REMOVE_IMAGE,
  payload,
});

export const clearImage = (payload) => ({
  type: CLEAR_IMAGES,
  payload,
});

export const updateMessage = (payload) => ({
  type: UPDATE_MESSAGE,
  payload,
});

export const clearMessageState = (payload) => ({
  type: CLEAR_MESSAGE_STATE,
  payload,
});
