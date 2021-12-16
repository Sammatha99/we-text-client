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
  },
});

export default thisUserSlice.reducer;
