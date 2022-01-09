import { createSlice } from "@reduxjs/toolkit";
import { backendWithoutAuth } from "../api/backend";
import { localStorage } from "../utils";
import { socket } from "../Global";

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
      if (state.value) {
        Object.assign(state.value, action.payload);
      } else {
        state.value = { ...action.payload };
      }
    },
    verifyEmail: (state, action) => {
      state.value = { ...state.value, isEmailVerified: action.payload };
    },
    update: (state, action) => {
      Object.assign(state.value, action.payload);
    },
    logout: (state, action) => {
      backendWithoutAuth.post("/auth/logout", {
        refreshToken: localStorage.rfTokenStorage.get().token,
        userId: localStorage.userIdStorage.get(),
      });
      socket.emit("logout", localStorage.userIdStorage.get());
      localStorage.storage.removeAll();
      state.value = null;
    },
  },
});

export const { login, verifyEmail, update, logout } = thisUserSlice.actions;

export default thisUserSlice.reducer;
