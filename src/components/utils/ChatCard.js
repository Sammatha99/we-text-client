import React from "react";
import clsx from "clsx";
import dateFormat from "dateformat";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { thisUserData } from "../../utils/fakeData";
import { utilFunction } from "../utils";

export default function ChatCard({
  setSelectedChatroom,
  chatroom,
  isSelected,
}) {
  const lastMessage = () => {
    var senderName = "";

    // lấy tên sender name: chính bạn, ng còn lại của personal chat, trong nhóm, rời nhóm
    if (thisUserData.id === chatroom.lastMessage.sender) {
      senderName = "you";
    } else if (!chatroom.isGroupChat) {
      senderName = chatroom.membersPopulate[0].name;
    } else if (chatroom.members.includes(chatroom.lastMessage.sender)) {
      for (var memberInGroup of chatroom.membersPopulate) {
        if (memberInGroup.id === chatroom.lastMessage.sender) {
          senderName = memberInGroup.name;
        }
      }
    } else if (chatroom.outGroupMembers.includes(chatroom.lastMessage.sender)) {
      for (var memberOutGroup of chatroom.outGroupMembersPopulate) {
        if (memberOutGroup.id === chatroom.lastMessage.sender) {
          senderName = memberOutGroup.name;
        }
      }
    }

    switch (chatroom.lastMessage.type) {
      case "text":
        if (!chatroom.isGroupChat) {
          return chatroom.lastMessage.text;
        }
        return `${senderName}: ${chatroom.lastMessage.text}`;
      case "notify":
        return `${senderName} ${chatroom.lastMessage.text}`;
      case "image":
        return `${senderName} sent an image`;
      case "video":
        return `${senderName} sent a video`;
      case "file":
        return `${senderName} sent a file`;
      case "record":
        return `${senderName} sent a record`;
      default:
        return "";
    }
  };

  const handleClick = (e) => {
    if (!isSelected && !e.target.closest(".chatCard__options-wrapper")) {
      setSelectedChatroom(chatroom.id);
    }
  };

  if (chatroom) {
    return (
      <div
        onClick={handleClick}
        className={clsx("chatCard", {
          "chatCard--active": isSelected,
        })}
      >
        <div className="chatCard__options-wrapper">
          <Icon icon="ellipsis-h" />
        </div>
        <div
          className={clsx("avatar", "avatar--small", "center", {
            "user-active-dots": utilFunction.chatRoomStatus(chatroom),
            "avatar--double-img": chatroom.isGroupChat,
          })}
        >
          <img
            className="avatar"
            src={chatroom.membersPopulate[0].avatar}
            alt={`${chatroom.membersPopulate[0].name} avatar`}
          />
          {chatroom.isGroupChat && (
            <img
              className="avatar"
              src={chatroom.membersPopulate[1].avatar}
              alt={`${chatroom.membersPopulate[1].name} avatar`}
            />
          )}
        </div>
        <div className="chatCard__content">
          <p className="chatCard__name">{chatroom.name}</p>
          <p className="chatCard__last-message">{lastMessage()}</p>
        </div>
        <p className="chatCard__time">
          {dateFormat(chatroom.lastMessage.time)}
        </p>
      </div>
    );
  } else {
    return (
      <div className="chatCard">
        <div className="avatar avatar--small center loading"></div>
        <div className="chatCard__content">
          <p className="chatCard__name loading">.</p>
          <p className="chatCard__last-message loading">.</p>
        </div>
        <p className="chatCard__time loading">.</p>
      </div>
    );
  }
}
