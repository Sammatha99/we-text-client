import { createSlice } from "@reduxjs/toolkit";

// const tokens = {
//   access: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThmNTlhMjFkZGM0YTNhZjgxMDg1NjIiLCJpYXQiOjE2Mzk3NDgzMjIsImV4cCI6MTYzOTc1MTkyMiwidHlwZSI6ImFjY2VzcyJ9.XFWSfZErj2QubLi65cRn6MA3ohvRhl3w7824JE0ciSo",
//     expires: "2021-12-17T14:38:42.549Z",
//   },
//   refresh: {
//     token:
//       "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI2MThmNTlhMjFkZGM0YTNhZjgxMDg1NjIiLCJpYXQiOjE2Mzk3NDgzMjIsImV4cCI6MTY0MjM0MDMyMiwidHlwZSI6InJlZnJlc2gifQ.aowzTWNVCQmMlZ41gyHugJzoYgTImC7iu73YuveZCjA",
//     expires: "2022-01-16T13:38:42.552Z",
//   },
// };

export const tokenSlice = createSlice({
  name: "token",
  initialState: { value: null },
  reducers: {
    set: (state, action) => {
      state.value = { ...action.payload };
    },
  },
});

export const { set } = tokenSlice.actions;

export default tokenSlice.reducer;
