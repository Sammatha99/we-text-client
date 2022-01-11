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

const initState = {
  chatrooms: [],
  chatroomsId: [],
  selectedChatroom: null,
  paginate: null,
};

export const chatroomsSlice = createSlice({
  name: "chatrooms",
  initialState: {
    value: initState,
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
      if (action.payload)
        state.value.selectedChatroom = state.value.chatrooms.find(
          (chatroom) => chatroom.id === action.payload
        );
      else state.value.selectedChatroom = null;
    },
    // thêm chatroom mới nhất vào đầu: action.payload = {chatroom}
    unshiftChatroom: (state, action) => {
      if (state.value.chatrooms[0].id !== action.payload.id) {
        if (!state.value.chatroomsId.includes(action.payload.id)) {
          // nếu chatroom cần shift chưa tồn tại tại trong chatrooms, thì thêm như bth
          state.value.chatrooms.unshift(action.payload);
          state.value.chatroomsId.unshift(action.payload.id);
          state.value.paginate.totalResults =
            state.value.paginate.totalResults + 1;
        } else {
          // nếu chatroom cần shift đã tồn tại => swap vị trí lên đầu
          const findIndex = state.value.chatrooms.findIndex(
            (chatroom) => chatroom.id === action.payload.id
          );
          state.value.chatrooms = utilFunction.swapItems(
            state.value.chatrooms,
            findIndex,
            0
          );
        }
      }
    },
    // action.payload = id: string
    deleteChatroom: (state, action) => {
      if (state.value.chatroomsId.includes(action.payload)) {
        state.value.chatrooms = state.value.chatrooms.filter(
          (chatroom) => chatroom.id !== action.payload
        );
        state.value.chatroomsId = state.value.chatroomsId.filter(
          (chatroomId) => chatroomId !== action.payload
        );
        state.value.paginate.totalResults =
          state.value.paginate.totalResults - 1;
        if (state.value.selectedChatroom?.id === action.payload) {
          state.value.selectedChatroom = null;
        }
      }
    },
    // action.payload = chatroomUpdateData ({..., id.required})
    updateChatroom: (state, action) => {
      const chatroomIndex = state.value.chatrooms.findIndex(
        (chatroom) => chatroom.id === action.payload.id
      );
      if (chatroomIndex !== -1) {
        Object.assign(state.value.chatrooms[chatroomIndex], action.payload);
        if (state.value.selectedChatroom?.id === action.payload.id) {
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
      if (state.value.paginate == null) state.value.paginate = {};
      Object.assign(state.value.paginate, action.payload.paginate);
    },
    clearChatrooms: (state, action) => {
      state.value = initState;
    },
    // action.payload: {userId, status}
    updateUserStatusInChatroom: (state, action) => {
      const { userId, status } = action.payload;
      state.value.chatrooms.forEach((chatroom) => {
        if (chatroom.members.includes(userId)) {
          const i = chatroom.membersPopulate.findIndex(
            (member) => member.id === userId
          );
          i !== -1 && Object.assign(chatroom.membersPopulate[i], { status });
        }
      });
      if (state.value.selectedChatroom?.members.includes(userId)) {
        const i = state.value.selectedChatroom.membersPopulate.findIndex(
          (member) => member.id === userId
        );
        i !== -1 &&
          Object.assign(state.value.selectedChatroom.membersPopulate[i], {
            status,
          });
      }
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
  deleteChatroom,
  updateUserStatusInChatroom,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
