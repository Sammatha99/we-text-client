import React from "react";

import "../../style/chat.css";

import { ChatHeader, ChatInput, ChatBody } from "./ChatComponents";
import { MessageProvider } from "../../contextStore/chatInput";
import "../../style/chat.css";

export default function Chat() {
  return (
    <>
      <div className="bigPanelMiddle content">
        <ChatHeader />
        <ChatBody />
        <MessageProvider>
          <ChatInput />
        </MessageProvider>
      </div>
    </>
  );
}
