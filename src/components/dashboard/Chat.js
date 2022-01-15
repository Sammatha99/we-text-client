import React from "react";

import { ChatHeader, ChatInput, ChatBody } from "./ChatComponents";
import { MessageProvider } from "../../contextStore/chatInput";

export default function Chat() {
  return (
    <>
      <div className="bigPanelMiddle content">
        <MessageProvider>
          <ChatHeader />
          <ChatBody />
          <ChatInput />
        </MessageProvider>
      </div>
    </>
  );
}
