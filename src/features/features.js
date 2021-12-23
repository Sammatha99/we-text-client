import { createSlice } from "@reduxjs/toolkit";

const initFeatures = {
  openRightPanel: false,
  selectedChatroom: null,
  selectedUser: null,
};

// TODO 3
export const featuresSlice = createSlice({
  name: "features",
  initialState: { value: initFeatures },
  reducers: {
    setOpenRightPanel: (state, action) => {
      state.value.openRightPanel = action.payload;
    },
    setSelectedChatroom: (state, action) => {
      state.value.selectedChatroom = action.payload;
    },
    setSelectedUser: (state, action) => {
      state.value.selectedUser = action.payload;
    },
  },
});

export const { setOpenRightPanel, setSelectedChatroom, setSelectedUser } =
  featuresSlice.actions;

export default featuresSlice.reducer;
