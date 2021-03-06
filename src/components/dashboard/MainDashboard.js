import React, { useState } from "react";
import { useSelector } from "react-redux";

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

export default function MainDashboard({ tab }) {
  const features = useSelector((state) => state.features.value);
  const selectedChatroom = useSelector(
    (state) => state.chatrooms.value?.selectedChatroom
  );
  const [selectedTab, setSelectedTab] = useState(() => tab || null);

  const TabOpen = () => {
    switch (selectedTab) {
      case tabs[0].name:
        return <ChatList />;
      case tabs[1].name:
        return <Contacts />;
      case tabs[2].name:
        return <ThisUserProfile />;
      default:
        return <></>;
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
        <Sidebar setSelectedTab={setSelectedTab} selectedTab={selectedTab} />

        {TabOpen()}

        {selectedChatroom != null && <Chat />}

        {features.openRightPanel &&
          ((features.selectedUser != null && <OtherUserPofile />) ||
            (features.selectedChatroom != null && <ChatInfo />))}
      </div>
    </>
  );
}
