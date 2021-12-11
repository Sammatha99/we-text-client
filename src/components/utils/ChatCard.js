import React, { useState } from "react";
import clsx from "clsx";
import { useLayer, Arrow } from "react-laag";

import dateFormat from "dateformat";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { utilFunction } from "../utils";

import { thisUserData } from "../../utils/fakeData";

/**
 * từ store redux:
 * - updateSelectedChatroom
 */

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
      // store redux: update selectedChatroom
      setSelectedChatroom(chatroom.id);
    }
  };

  const [isOpen, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close, // close the menu when the user clicks outside
    onDisappear: close, // close the menu when the menu gets scrolled out of sight
    overflowContainer: true, // keep the menu positioned inside the container
    auto: true, // automatically find the best placement
    placement: "bottom-center", // we prefer to place the menu "top-end"
    preferX: "left",
    triggerOffset: 4, // keep some distance to the trigger
    containerOffset: 16, // give the menu some room to breath relative to the container
    arrowOffset: 8, // let the arrow have some room to breath also
  });

  if (chatroom) {
    return (
      <div
        onClick={handleClick}
        className={clsx("chatCard", {
          "chatCard--active": isSelected,
        })}
        style={{ position: "relative" }}
      >
        <div
          {...triggerProps}
          onClick={() => setOpen(!isOpen)}
          className="chatCard__options-wrapper"
        >
          <Icon icon="ellipsis-h" />
        </div>

        {renderLayer(
          isOpen && (
            <div
              {...layerProps}
              style={{
                ...layerProps.style,
                width: 200,
                height: 150,
                zIndex: "2",
                backgroundColor: "white",
              }}
            >
              {/* TODO 1 chatCard menu  */}
              <p className="text--medium"> menu pop up</p>
              <Arrow {...arrowProps} />
            </div>
          )
        )}
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
