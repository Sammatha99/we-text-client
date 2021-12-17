import { createSlice } from "@reduxjs/toolkit";
import { utilFunction } from "../utils";

// const chatrooms = []

export const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState: { value: null },
  reducers: {
    set: (state, action) => {
      state.value = [...action.payload];
    },
    // thêm chatroom mới nhất vào đầu
    unshiftNewChatroom: (state, action) => {
      state.value.unshift(action.payload);
    },
    // action.payload = {id, chatroomNewInfo}
    updateChatroom: (state, action) => {
      const chatroomIndex = state.value.findIndex(
        (chatroom) => chatroom.id === action.payload.id
      );
      if (chatroomIndex !== -1) {
        Object.assign(
          state.value[chatroomIndex],
          action.payload.chatroomNewInfo
        );
      }
    },
    // action.payload = [newChatrooms]
    loadMore: (state, action) => {
      const chatroomsId = utilFunction.getChatroomsId(state.value);
      for (const newChatroom of action.payload) {
        if (!chatroomsId.includes(newChatroom.id)) {
          state.value.push(newChatroom);
        }
      }
    },
    clearChatrooms: (state, action) => {
      state.value = null;
    },
  },
});

export const {
  set,
  unshiftNewChatroom,
  updateChatroom,
  loadMore,
  clearChatrooms,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
