import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import "../../style/chat.css";

import { ChatComponents } from "../utils";

import {
  messagesChatgroupData,
  messagesPersonalData,
} from "../../utils/fakeData";
import { notFoundImage } from "../../assets/imgs";

export default function Chat({ selectedChatroom }) {
  const chatroom = useSelector(
    (state) => state.chatrooms.value.selectedChatroom
  );
  const [messages, setMessages] = useState([]);
  // TODO 1.6 messages list infinite scroll

  useEffect(() => {
    // TODO 2.3 chat screen
    if (selectedChatroom != null) {
      //selectedChatroom đc lấy từ store redux tổng

      // get messages from Backend
      let getMessages;
      if (chatroom.isGroupChat) {
        getMessages = JSON.parse(JSON.stringify(messagesChatgroupData));
      } else {
        getMessages = JSON.parse(JSON.stringify(messagesPersonalData));
      }

      // get sender for each message
      getMessages.forEach((message) => {
        if (chatroom.members.includes(message.sender)) {
          message.sender = chatroom.membersPopulate.find(
            (member) => member.id === message.sender
          );
        } else if (chatroom.outGroupMembers.includes(message.sender)) {
          message.sender = chatroom.outGroupMembersPopulate.find(
            (member) => member.id === message.sender
          );
        } else {
          message.sender = {
            name: "not found",
            avatar: notFoundImage,
            id: null,
          };
        }
      });

      // trong backend gửi lên cần được reverse sẵn
      getMessages = getMessages.reverse();

      setMessages(getMessages);

      // setChatroom(getChatroom);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className="bigPanelMiddle content">
        <ChatComponents.ChatHeader />
        <ChatComponents.ChatBody messages={messages} />
        <ChatComponents.ChatInput />
      </div>
    </>
  );
}
