import { createSlice } from "@reduxjs/toolkit";

const initFeatures = {
  openRightPanel: false,
  selectedChatroom: null, //id: string
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
      state.value.selectedChatroom = action.payload;
      if (action.payload) {
        state.value.selectedUser = null;
      }
    },
    setSelectedUser: (state, action) => {
      state.value.selectedUser = action.payload;
    },
    toggleSelectedChatroom: (state, action) => {
      if (!state.value.selectedChatroom) {
        state.value.selectedUser = null;
      }
      state.value.selectedChatroom = !state.value.selectedChatroom;
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
