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

import {
  thisUserReducer,
  chatroomsReducer,
  featuresReducer,
  thisUserDetailReducer,
  filesReducer,
} from "./features";
import App from "./App";
import Global from "./Global";

/**
 * redux: store structure
 * REDUCER features
 * - openRightPanel: boolean (isOpen) ---> constants ????
 * - selectedChatroom: chatroomId
 * - selectedUser: userId
 * REDUCER chatrooms
 * - chatrooms: [chatrooms]
 * REDUCER thisUser
 * - thisUser: user
 * REDUCER thisUserDetail
 * - thisUserDetail: userDetail
 *            + about: {}
 *            + followers [id - string]
 *            + followings [id - string]
 *            + contacts [id - string]
 */

// pass collection of reducers
const store = configureStore({
  reducer: {
    thisUser: thisUserReducer,
    chatrooms: chatroomsReducer,
    features: featuresReducer,
    thisUserDetail: thisUserDetailReducer,
    files: filesReducer,
  },
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Global />
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
