import React from "react";

import "../../style/chat.css";

import { ChatHeader, ChatInput, ChatBody } from "./ChatComponents";

import "../../style/chat.css";

export default function Chat() {
  return (
    <>
      <div className="bigPanelMiddle content">
        <ChatHeader />
        <ChatBody />
        <ChatInput />
      </div>
    </>
  );
}
