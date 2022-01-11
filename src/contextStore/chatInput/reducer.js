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

import { utilFunction } from "../../utils";

const initState = {
  images: [],
  text: "",
  messages: [],
  messagesId: [],
  paginate: null,
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
    case CLEAR_INPUT_STATE:
      return { ...state, images: [], text: "" };
    case ADD_MESSAGES_PAGINATE: {
      // action.payload: {messages, paginate}
      const newMessages = [];
      const newMessagesId = state.messagesId;
      action.payload.messages.forEach((message) => {
        if (!newMessagesId.includes(message.id)) {
          utilFunction.formatMessage(message);
          newMessagesId.push(message.id);
          newMessages.push(message);
        }
      });
      Object.assign(state, {
        messages: [...state.messages, ...newMessages],
        messagesId: newMessagesId,
        paginate: action.payload.paginate,
      });
      return { ...state };
    }

    case UNSHIFT_MESSAGE: {
      // action.payload: message
      if (!state.messagesId.includes(action.payload.id)) {
        utilFunction.formatMessage(action.payload);
        if (state.paginate == null) {
          return {
            ...state,
            messages: [action.payload, ...state.messages],
            messagesId: [action.payload.id, ...state.messagesId],
            paginate: { totalResults: 1 },
          };
        } else {
          return {
            ...state,
            messages: [action.payload, ...state.messages],
            messagesId: [action.payload.id, ...state.messagesId],
            paginate: {
              ...state.paginate,
              totalResults: state.paginate.totalResults + 1,
            },
          };
        }
      }
      return { ...state };
    }
    case CLEAR_MESSAGES_PAGINATE:
      return {
        ...state,
        messages: [],
        messagesId: [],
        paginate: null,
      };
    // case UNSHIFT_MESSAGES: {
    //   //action.payload: [messages]
    //   const newMessages = [];
    //   const newMessagesId = state.messagesId;
    //   action.payload.forEach((message) => {
    //     if (!newMessagesId.includes(message.id)) {
    //       utilFunction.formatMessage(message);
    //       newMessages.push(message);
    //       newMessagesId.push(message.id);
    //     }
    //   });
    //   Object.assign(state, {
    //     messages: [...newMessages, ...state.messages],
    //     messagesId: newMessagesId,
    //     paginate: {
    //       ...state.paginate,
    //       totalResults: state.paginate.totalResults + newMessages.length,
    //     },
    //   });
    //   return { ...state };
    // }
    default:
      return state;
  }
}

export { initState };
export default reducer;
