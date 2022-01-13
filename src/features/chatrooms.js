import { createSlice } from "@reduxjs/toolkit";
import { localStorage, utilFunction } from "../utils";

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
    set: (state, action) => {
      // action: {chatrooms: [chatroom], page, totalPages, totalResults}
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
    setSelectedChatroomById: (state, action) => {
      // action.payload: id:string
      if (action.payload)
        state.value.selectedChatroom = state.value.chatrooms.find(
          (chatroom) => chatroom.id === action.payload
        );
      else state.value.selectedChatroom = null;
    },
    unshiftChatroom: (state, action) => {
      // thêm chatroom mới nhất vào đầu: action.payload = {chatroom}

      if (state.value.chatrooms[0]?.id !== action.payload.id) {
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
    deleteChatroom: (state, action) => {
      // action.payload = id: string
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
    updateChatroom: (state, action) => {
      // action.payload = chatroomUpdateData ({..., id.required})
      const chatroomIndex = state.value.chatrooms.findIndex(
        (chatroom) => chatroom.id === action.payload.id
      );
      if (chatroomIndex !== -1) {
        const thisUserId = localStorage.userIdStorage.get();
        Object.assign(state.value.chatrooms[chatroomIndex], action.payload);
        utilFunction.formatChatroom(
          state.value.chatrooms[chatroomIndex],
          thisUserId
        );
        if (state.value.selectedChatroom?.id === action.payload.id) {
          Object.assign(state.value.selectedChatroom, action.payload);
          utilFunction.formatChatroom(state.value.selectedChatroom, thisUserId);
        }
      }
    },
    addNew: (state, action) => {
      // action.payload = {chatrooms: [newChatrooms], paginate:{ page, totalPages, totalResults}}
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
    updateUserStatusInChatroom: (state, action) => {
      // action.payload: {userId, status}
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
    removeMemberChatroom: (state, action) => {
      // action.payload = {updateData: {...}, removeUser: user}
      const { updateData, removeUser } = action.payload;
      const chatroomIndex = state.value.chatrooms.findIndex(
        (chatroom) => chatroom.id === updateData.id
      );
      if (chatroomIndex !== -1) {
        const chatroomUpdateData = { ...updateData };

        chatroomUpdateData.membersPopulate = state.value.chatrooms[
          chatroomIndex
        ].membersPopulate.filter((member) => member.id !== removeUser.id);

        chatroomUpdateData.members = state.value.chatrooms[
          chatroomIndex
        ].members.filter((memberId) => memberId !== removeUser.id);

        chatroomUpdateData.outGroupMembers = [
          ...state.value.chatrooms[chatroomIndex].outGroupMembers,
          removeUser.id,
        ];

        chatroomUpdateData.outGroupMembers = [
          ...state.value.chatrooms[chatroomIndex].outGroupMembersPopulate,
          removeUser,
        ];

        Object.assign(state.value.chatrooms[chatroomIndex], chatroomUpdateData);

        if (state.value.selectedChatroom?.id === updateData.id) {
          Object.assign(state.value.selectedChatroom, chatroomUpdateData);
        }
      }
    },
    updateSeenHistory: (state, action) => {
      // action.payload: {chatroomId, object: seenHistory}
      const { chatroomId, seenHistory } = action.payload;
      const chatroomIndex = state.value.chatrooms.findIndex(
        (chatroom) => chatroom.id === chatroomId
      );
      if (chatroomIndex !== -1) {
        state.value.chatrooms[chatroomIndex].seenHistory = {
          ...state.value.chatrooms[chatroomIndex].seenHistory,
          ...seenHistory,
        };

        state.value.selectedChatroom?.id === chatroomId &&
          (state.value.selectedChatroom.seenHistory = {
            ...state.value.selectedChatroom.seenHistory,
            ...seenHistory,
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
  removeMemberChatroom,
  updateSeenHistory,
} = chatroomsSlice.actions;

export default chatroomsSlice.reducer;
