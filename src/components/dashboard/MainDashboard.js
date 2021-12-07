import React from "react";

import "../../style/dashboard.css";
import {
  Sidebar,
  ChatList,
  Chat,
  Contacts,
  ThisUserProfile,
  OtherUserPofile,
  ChatInfo,
  BackgroundScreen,
} from "../dashboard";

export default function MainDashboard() {
  return (
    <div className="dashboard">
      <BackgroundScreen />
      <input
        type="checkbox"
        id="checkbox-sidebar"
        style={{ display: "none" }}
      />
      <Sidebar />
      <Contacts />
      {/* <ChatList /> */}
      {/* <Chat id={0} /> */}
      <OtherUserPofile />
      {/* <ChatInfo id={0} /> */}
      {/* <ThisUserProfile /> */}
    </div>
  );
}
