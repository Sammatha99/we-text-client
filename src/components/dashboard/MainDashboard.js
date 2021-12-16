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

export default function MainDashboard({ tab }) {
  // const [selectedTab, setSelectedTab] = useState(() => tab || tabs[0].name);
  const [selectedTab, setSelectedTab] = useState(() => tab || null);

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
        return <></>;
    }
  };

  return (
    <>
      {/* <BackgroundScreen /> */}
      <div className="dashboard">
        <input
          type="checkbox"
          id="checkbox-sidebar"
          style={{ display: "none" }}
        />
        <Sidebar
          setSelectedTab={setSelectedTab}
          setSelectedChatroom={setSelectedChatroom}
          selectedTab={selectedTab}
        />

        {TabOpen()}

        {selectedChatroom != null && (
          <Chat selectedChatroom={selectedChatroom} />
        )}

        {/* {smallPanelRight && selectedChatroom != null && <ChatInfo id={selectedChatroom} />} */}

        {/*{selectedUser && <OtherUserPofile />} */}
      </div>
    </>
  );
}
