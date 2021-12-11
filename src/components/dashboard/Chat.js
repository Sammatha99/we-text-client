import React, { useEffect, useState } from "react";

import "../../style/chat.css";
import { ChatComponents, utilFunction } from "../utils";

import {
  thisUserData,
  chatRoomsData,
  messagesChatgroupData,
  messagesPersonalData,
} from "../../utils/fakeData";

/**
 * tạo reducer dùng riêng cho chat
 * - messages
 * - input: object {inputStr, type}
 * selectedChatroom đc lấy từ store redux tổng
 */

export default function Chat({ selectedChatroom }) {
  const [chatroom, setChatroom] = useState(null);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    if (selectedChatroom != null) {
      //selectedChatroom đc lấy từ store redux tổng
      let getChatroom = JSON.parse(
        JSON.stringify(chatRoomsData[selectedChatroom])
      );

      getChatroom = utilFunction.formatChatroom(getChatroom, thisUserData.id);

      // get messages from Backend
      let getMessages;
      if (getChatroom.isGroupChat) {
        getMessages = JSON.parse(JSON.stringify(messagesChatgroupData));
      } else {
        getMessages = JSON.parse(JSON.stringify(messagesPersonalData));
      }

      // get sender for each message
      getMessages.forEach((message) => {
        if (getChatroom.members.includes(message.sender)) {
          message.sender = getChatroom.membersPopulate.find(
            (member) => member.id === message.sender
          );
        } else {
          message.sender = getChatroom.outGroupMembersPopulate.find(
            (member) => member.id === message.sender
          );
        }
      });

      // trong backend gửi lên cần được reverse sẵn
      getMessages = getMessages.reverse();

      setMessages(getMessages);

      setChatroom(getChatroom);
    }

    return () => {};
  }, [selectedChatroom]);

  return (
    <>
      <div className="bigPanelMiddle content">
        <ChatComponents.ChatHeader chatroom={chatroom} />
        <ChatComponents.ChatBody messages={messages} chatroom={chatroom} />
        <ChatComponents.ChatInput thisUser={thisUserData} />
      </div>
    </>
  );
}
