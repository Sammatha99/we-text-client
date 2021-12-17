import { createSlice } from "@reduxjs/toolkit";

// const thisUserInitState = {
//   id: "",
//   name: "",
//   email: "",
//   avatar: "",
//   status: true,
// };

export const thisUserSlice = createSlice({
  name: "thisUser",
  initialState: { value: null },
  reducers: {
    login: (state, action) => {
      state.value = { ...action.payload };
    },
    verifyEmail: (state, action) => {
      state.value = { ...state.value, isEmailVerified: action.payload };
    },
    update: (state, action) => {
      Object.assign(state.value, action.payload);
    },
    logout: (state, action) => {
      state.value = null;
    },
  },
});

export const { login, verifyEmail, logout } = thisUserSlice.actions;

export default thisUserSlice.reducer;
