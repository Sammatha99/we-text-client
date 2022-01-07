import React from "react";
import clsx from "clsx";
import dateFormat from "dateformat";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { PopupMenus } from "../utils";
import { utilFunction } from "../../utils";

import { chatroomsAction } from "../../features";

export default function ChatCard({ chatroom, isSelected }) {
  const userId = useSelector((state) => state.thisUser.value.id);
  const dispatch = useDispatch();
  const { PopupMenu, triggerProps, handleClickPopupMenu } =
    PopupMenus.PopupMenu();

  const PopupMenuChatCard = () =>
    chatroom.isGroupChat
      ? PopupMenus.PopupMenuChatGroupCard(chatroom.id)
      : PopupMenus.PopupMenuChatPersonalCard(
          chatroom.id,
          chatroom.membersPopulate[0].id
        );

  const lastMessage = () => {
    if (chatroom.lastMessage && chatroom.lastMessagePopulate) {
      var senderName = "";

      // lấy tên sender name: chính bạn, ng còn lại của personal chat, trong nhóm, rời nhóm
      if (userId === chatroom.lastMessagePopulate.sender) {
        senderName = "you";
      } else if (!chatroom.isGroupChat) {
        senderName = chatroom.membersPopulate[0].name;
      } else if (
        chatroom.members.includes(chatroom.lastMessagePopulate.sender)
      ) {
        for (var memberInGroup of chatroom.membersPopulate) {
          if (memberInGroup.id === chatroom.lastMessagePopulate.sender) {
            senderName = memberInGroup.name;
            break;
          }
        }
      } else {
        senderName = "Left group";
      }

      switch (chatroom.lastMessagePopulate.type) {
        case "text":
          if (!chatroom.isGroupChat) {
            return chatroom.lastMessagePopulate.text;
          }
          return `${senderName}: ${chatroom.lastMessagePopulate.text}`;
        case "notify":
          return `${senderName} ${chatroom.lastMessagePopulate.text}`;
        case "image":
          return `${senderName} sent an image`;
        case "video":
          return `${senderName} sent a video`;
        case "file":
          return `${senderName} sent a file`;
        case "record":
          return `${senderName} sent a record`;
        default:
          return "No Messages";
      }
    }
    return "No messages";
  };

  const isSeen = () => {
    if (chatroom.seenHistory) {
      return Object.keys(chatroom.seenHistory).includes(userId);
    }
    return false;
  };

  const handleClick = (e) => {
    if (!isSelected && !e.target.closest(".chatCard__options-wrapper")) {
      dispatch(chatroomsAction.setSelectedChatroomById(chatroom.id));
    }
  };

  if (chatroom) {
    return (
      <div
        onClick={handleClick}
        className={clsx("chatCard", {
          "chatCard--active": isSelected,
          "chatCard--isNotSeen": !isSeen(),
        })}
        style={{ position: "relative" }}
      >
        <div
          {...triggerProps}
          onClick={handleClickPopupMenu}
          className="chatCard__options-wrapper"
        >
          <Icon icon="ellipsis-h" />
        </div>
        {PopupMenu(PopupMenuChatCard)}

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
          {chatroom.time && dateFormat(chatroom.time)}
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
