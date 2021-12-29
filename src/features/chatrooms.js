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
  initialState: { value: { chatrooms: [], paginate: null } },
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
      };
    },
    // action.payload: chatroom
    setSelectedChatroom: (state, action) => {
      state.value.selectedChatroom = action.payload;
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
    // action.payload = {chatrooms: [newChatrooms], page, totalPages, totalResults}
    addNew: (state, action) => {
      for (const newChatroom of action.payload.chatrooms) {
        if (!state.value.chatroomsId.includes(newChatroom.id)) {
          state.value.chatrooms.push(newChatroom);
          state.value.chatroomsId.push(newChatroom.id);
        }
      }
      state.value.paginate.page = action.payload.page;
      state.value.paginate.totalResults = action.payload.totalResults;
      state.value.paginate.totalPages = action.payload.totalPages;
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
  setSelectedChatroom,
  addNew,
  clearChatrooms,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
