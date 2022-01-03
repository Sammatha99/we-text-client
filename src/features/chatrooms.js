import { createSlice } from "@reduxjs/toolkit";
import { utilFunction } from "../utils";

// const paginateInit = {
//   page: 0,
//   totalResults: 0,
//   totalPages: 0,
// };

// const initValueChatrooms = {
//   chatroomsId: [], // [string]
//   selectedChatroom: null, // chatroom
//   chatrooms: [], // [chatroom]
//   paginate: null,
// };

export const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState: {
    value: {
      chatrooms: [],
      chatroomsId: [],
      selectedChatroom: null,
      paginate: null,
    },
  },
  reducers: {
    // action: {chatrooms: [chatroom], page, totalPages, totalResults}
    set: (state, action) => {
      const chatroomsIds = utilFunction.getIds(action.payload.chatrooms);
      state.value = {
        chatrooms: [...action.payload.chatrooms],
        chatroomsId: chatroomsIds,
        paginate: {
          page: action.payload.page,
          totalResults: action.payload.totalResults,
          totalPages: action.payload.totalPages,
        },
        selectedChatroom: null,
      };
    },
    // action.payload: id:string
    setSelectedChatroomById: (state, action) => {
      state.value.selectedChatroom = state.value.chatrooms.find(
        (chatroom) => chatroom.id === action.payload
      );
    },
    // thêm chatroom mới nhất vào đầu: action.payload = {chatroom}
    unshiftChatroom: (state, action) => {
      const findIndex = state.value.chatrooms.findIndex(
        (chatroom) => chatroom.id === action.payload.id
      );
      // nếu chatroom cần shift chưa tồn tại tại trong chatrooms, thì thêm như bth
      if (findIndex === -1) {
        state.value.chatrooms.unshift(action.payload);
        state.value.chatroomsId.unshift(action.payload.id);
        state.value.paginate.totalResults =
          state.value.paginate.totalResults + 1;
      } else {
        // nếu chatroom cần shift đã tồn tại => swap vị trí lên đầu
        state.value.chatrooms = utilFunction.swapItems(
          state.value.chatrooms,
          findIndex,
          0
        );
      }
    },
    // action.payload = chatroom
    updateChatroom: (state, action) => {
      const chatroomIndex = state.value.chatrooms.findIndex(
        (chatroom) => chatroom.id === action.payload.id
      );
      if (chatroomIndex !== -1) {
        Object.assign(state.value.chatrooms[chatroomIndex], action.payload);
        if (state.value.selectedChatroom.id === action.payload.id) {
          Object.assign(state.value.selectedChatroom, action.payload);
        }
      }
    },
    // action.payload = {chatrooms: [newChatrooms], paginate:{ page, totalPages, totalResults}}
    addNew: (state, action) => {
      for (const newChatroom of action.payload.chatrooms) {
        if (!state.value.chatroomsId.includes(newChatroom.id)) {
          state.value.chatrooms.push(newChatroom);
          state.value.chatroomsId.push(newChatroom.id);
        }
      }
      state.value.paginate = action.payload.paginate;
    },
    clearChatrooms: (state, action) => {
      state.value = null;
    },
  },
});

export const {
  set,
  unshiftChatroom,
  updateChatroom,
  setSelectedChatroomById,
  addNew,
  clearChatrooms,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
