import React from "react";

import "../../style/dashboard.css";
import {
  Sidebar,
  ChatList,
  Chat,
  Contacts,
  ThisUserProfile,
  OtherUserPofile,
} from "../dashboard";

export default function MainDashboard() {
  return (
    <div className="dashboard">
      <input
        type="checkbox"
        id="checkbox-sidebar"
        style={{ display: "none" }}
      />
      <Sidebar />
      {/* <Contacts /> */}
      {/* <ChatList /> */}
      <Chat id={1} />
      {/* <OtherUserPofile /> */}
      {/* <ThisUserProfile /> */}
    </div>
  );
}
