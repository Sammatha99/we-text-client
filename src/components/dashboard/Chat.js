import React, { useEffect, useState } from "react";

import "../../style/chat.css";

import {
  thisUserData,
  chatRoomsData,
  messagesChatgroupData,
  messagesPersonalData,
} from "../../utils/fakeData";
import { ChatComponents } from "../utils";

export default function Chat({ id }) {
  const [chatroom, setChatroom] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (id != null) {
      const getChatroom = JSON.parse(JSON.stringify(chatRoomsData[id]));
      if (getChatroom.isGroupChat) {
        setMessages(JSON.parse(JSON.stringify(messagesChatgroupData)));
      } else {
        setMessages(JSON.parse(JSON.stringify(messagesPersonalData)));
      }
      // lọc members để loại bỏ chính mình đi
      const myIndex = getChatroom.members.findIndex(
        (id) => id === thisUserData.id
      );
      getChatroom.members.splice(myIndex, 1);
      getChatroom.membersPopulate.splice(myIndex, 1);

      // kiếm name cho chatroom
      if (!getChatroom.name) {
        const names = [];
        getChatroom.membersPopulate.forEach((member) => {
          names.push(member.name);
        });
        getChatroom.name = names.join(", ");
      }

      setChatroom(getChatroom);
    }

    return () => {};
  }, [id]);

  return (
    <div className="bigPanelMiddle content">
      <ChatComponents.ChatHeader chatroom={chatroom} />
      <ChatComponents.ChatBody messages={messages} />
      <ChatComponents.ChatInput thisUser={thisUserData} />
    </div>
  );
}
