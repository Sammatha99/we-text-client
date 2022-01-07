import { createSlice } from "@reduxjs/toolkit";
import { utilFunction } from "../utils";

// const paginateInit = {
//   page: 0,
//   totalResults: 0,
//   totalPages: 0,
// };

/**
files:{
  chatroomId: null/string,
  filesId: [] / string
	files: []/{type:string, text: string, id: string},
	paginate: null
}
 */

const initValue = {
  chatroomId: null,
  filesId: [],
  files: [],
  paginate: null,
};

export const filesSlice = createSlice({
  name: "files",
  initialState: {
    value: initValue,
  },
  reducers: {
    set: (state, action) => {
      // action.payload: {chatroomId, files, paginate}
      const filesId = utilFunction.getIds(action.payload.files);
      Object.assign(state.value, { ...action.payload, filesId });
    },
    unshiftFile: (state, action) => {
      // action.payload: file
      state.value.files.unshift(action.payload);
      state.value.paginate.totalResults = state.value.paginate.totalResults + 1;
    },
    addNew: (state, action) => {
      // action.payload: {chatroomId:string, files: [file], paginate: {page, totalResults, totalPages}}
      for (const newFile of action.payload.files) {
        if (!state.value.filesId.includes(newFile.id)) {
          state.value.files.push(newFile);
          state.value.filesId.push(newFile.id);
        }
      }
      state.value.chatroomId = action.payload.chatroomId;
      state.value.paginate = action.payload.paginate;
    },
    clearFiles: (state, action) => {
      state.value = initValue;
    },
  },
});

export const { set, unshiftFile, addNew, clearFiles } = filesSlice.actions;

export default filesSlice.reducer;
