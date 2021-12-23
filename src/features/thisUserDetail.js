import { createSlice } from "@reduxjs/toolkit";

// const thisUserDetailInit = {
//   id: "",
//   description: "",
//   address: "",
//   phoneNumber: "",
//   followers: ['ids'],
//   followings: ['ids'],
//   contacts: ['ids'],
// };

export const thisUserDetailSlice = createSlice({
  name: "thisUserDetail",
  initialState: { value: null },
  reducers: {
    set: (state, action) => {
      state.value = { ...action.payload };
    },
    update: (state, action) => {
      Object.assign(state.value, action.payload);
    },
    addContact: (state, action) => {
      !state.value.contacts.includes(action.payload) &&
        state.value.contacts.push(action.payload);
    },
    deleteContact: (state, action) => {
      state.value.contacts = state.value.contacts.filter(
        (id) => id !== action.payload
      );
    },
    addFollowing: (state, action) => {
      !state.value.followings.includes(action.payload) &&
        state.value.followings.push(action.payload);
    },
    deleteFollowing: (state, action) => {
      state.value.followings = state.value.followings.filter(
        (id) => id !== action.payload
      );
    },
    addFollower: (state, action) => {
      !state.value.followers.includes(action.payload) &&
        state.value.followers.push(action.payload);
    },
    deleteFollower: (state, action) => {
      state.value.followers = state.value.followers.filter(
        (id) => id !== action.payload
      );
    },
  },
});

export const {
  set,
  update,
  addContact,
  deleteContact,
  addFollowing,
  deleteFollowing,
  addFollower,
  deleteFollower,
} = thisUserDetailSlice.actions;

export default thisUserDetailSlice.reducer;
