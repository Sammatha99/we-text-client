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
import { tabs } from "../../utils/constants";

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
  const [selectedTab, setSelectedTab] = useState(tabs[0].name);
  const [selectedChatroom, setSelectedChatroom] = useState(null);

  const TabOpen = () => {
    switch (selectedTab) {
      case tabs[0].name:
        return (
          <ChatList
            selectedChatroom={selectedChatroom}
            setSelectedChatroom={setSelectedChatroom}
          />
        );
      case tabs[1].name:
        return <Contacts />;
      case tabs[2].name:
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
