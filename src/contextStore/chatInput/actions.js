import {
  ADD_IMAGES,
  REMOVE_IMAGE,
  UPDATE_MESSAGE,
  CLEAR_IMAGES,
  CLEAR_INPUT_STATE,
  ADD_MESSAGES_PAGINATE,
  UNSHIFT_MESSAGE,
  CLEAR_MESSAGES_PAGINATE,
  UNSHIFT_MESSAGES,
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
  type: CLEAR_INPUT_STATE,
  payload,
});

export const addMessagesPaginate = (payload) => ({
  type: ADD_MESSAGES_PAGINATE,
  payload,
});

export const unshiftMessage = (payload) => ({
  type: UNSHIFT_MESSAGE,
  payload,
});

export const clearMessagesPaginate = (payload) => ({
  type: CLEAR_MESSAGES_PAGINATE,
  payload,
});

export const unshiftMessages = (payload) => ({
  type: UNSHIFT_MESSAGES,
  payload,
});
