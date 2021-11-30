import React from "react";

import "../../style/dashboard.css";
import Sidebar from "./Sidebar";
import ChatList from "./ChatList";
// import Contacts from "./Contacts";
import OtherUserPofile from "./OtherUserPofile";
import Chat from "./Chat";
// import ThisUserProfile from "./ThisUserProfile";

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
      <ChatList />
      <Chat />
      <OtherUserPofile />
      {/* <ThisUserProfile /> */}
    </div>
  );
}
