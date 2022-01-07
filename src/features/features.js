import { createSlice } from "@reduxjs/toolkit";

const initFeatures = {
  openRightPanel: false,
  openChat: false,
  selectedChatroom: null, //boolean
  selectedUser: null, //id: string
};

export const featuresSlice = createSlice({
  name: "features",
  initialState: { value: initFeatures },
  reducers: {
    setOpenRightPanel: (state, action) => {
      state.value.openRightPanel = action.payload;
    },
    setSelectedChatroom: (state, action) => {
      if (action.payload) {
        state.value.selectedUser = null;
      }
      state.value.selectedChatroom = action.payload;

      !state.value.selectedUser &&
        !state.value.setSelectedChatroom &&
        (state.value.openRightPanel = false);
    },
    setSelectedUser: (state, action) => {
      state.value.selectedUser = action.payload;
      action.payload && (state.value.openRightPanel = true);
      !state.value.selectedUser &&
        !state.value.selectedChatroom &&
        (state.value.openRightPanel = false);
    },
    toggleSelectedChatroom: (state, action) => {
      state.value.selectedUser && (state.value.selectedUser = null);
      if (state.value.selectedChatroom) {
        state.value.selectedChatroom = false;
        state.value.openRightPanel = false;
      } else {
        state.value.selectedChatroom = true;
        state.value.openRightPanel = true;
      }
    },
    clearFeatures: (state, action) => {
      state.value = initFeatures;
    },
  },
});

export const {
  setOpenRightPanel,
  setSelectedChatroom,
  setSelectedUser,
  toggleSelectedChatroom,
} = featuresSlice.actions;

export default featuresSlice.reducer;
