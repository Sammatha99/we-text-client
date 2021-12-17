import React from "react";
import ReactDOM from "react-dom";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import "./style/index.css";
import "./style/base/avatar.css";
import "./style/base/input.css";
import "./style/base/text.css";
import "./style/base/button.css";
import "./style/base/panel.css";
import "./style/base/card.css";
import "./style/base/tooltip.css";

// import thisUserReducer from "./features/thisUser";
import { thisUserReducer } from "./features";
import App from "./App";

/**
 * redux: store
 * - // TODO 1 refreshtoken:lưu trong localstorage
 * REDUCER features
 * - selectedRightPanel: boolean (isOpen) ---> constants ????
 * - selectedChatroom: chatroomId
 * - selectedUser: userId
 * REDUCER chatrooms
 * - chatrooms: [chatrooms]
 * REDUCER thisUser
 * - thisUser: user
 * - accessToken: string + hsd
 * REDUCER thisUserDetail
 * - thisUserDetail: userDetail
 *            + followers [id - string]
 *            + followings [id - string]
 *            + contacts [id - string]
 */

// TODO chatCard if not found sender (lastmessage) => 'left group'

// pass collection of reducers
const store = configureStore({
  reducer: {
    thisUser: thisUserReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
