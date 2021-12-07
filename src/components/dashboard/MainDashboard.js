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
    <>
      <BackgroundScreen />
      <div className="dashboard">
        <input
          type="checkbox"
          id="checkbox-sidebar"
          style={{ display: "none" }}
        />
        <Sidebar />
        {/* <Contacts /> */}
        <ChatList />
        {/* <Chat id={0} /> */}
        {/* <ChatInfo id={0} /> */}
        <OtherUserPofile />
        {/* <ThisUserProfile /> */}
      </div>
    </>
  );
}
