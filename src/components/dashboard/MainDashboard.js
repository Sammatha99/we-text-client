import React, { useState } from "react";

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

/**
 * redux: store
 * - selectedChatroom: chatroom
 * - selectedUser: user + userDetail
 * - smallPanelRight: string: 'otherUserProfile', 'chatInfo' ---> constants
 * - chatrooms: [chatrooms]
 * - thisUser: user
 * - thisUserDetail (followings, followers, contacts) : userDetail
 */

export default function MainDashboard() {
  const [selectedTab, setSelectedTab] = useState(0);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  const TabOpen = () => {
    switch (selectedTab) {
      case 0:
        return (
          <ChatList
            selectedChatroom={selectedChatroom}
            setSelectedChatroom={setSelectedChatroom}
          />
        );
      case 1:
        return <Contacts />;
      case 2:
        return <ThisUserProfile />;
      default:
        break;
    }
  };

  return (
    <>
      <BackgroundScreen />
      <div className="dashboard">
        <input
          type="checkbox"
          id="checkbox-sidebar"
          style={{ display: "none" }}
        />
        <Sidebar
          setSelectedChatroom={setSelectedChatroom}
          setSelectedTab={setSelectedTab}
          selectedTab={selectedTab}
        />

        {TabOpen()}

        {selectedChatroom != null && (
          <Chat selectedChatroom={selectedChatroom} />
        )}
        {/* {selectedChatroom != null && <ChatInfo id={selectedChatroom} />} */}
        {/* <OtherUserPofile /> */}
      </div>
    </>
  );
}
