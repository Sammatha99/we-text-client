import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { utilFunction } from ".";
import "../../style/chat.css";

const ChatHeader = function ({ chatroom }) {
  if (chatroom) {
    return (
      <div className="chat-header-wrapper">
        <div className="chat-header-info">
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
          <p className="chat-header-info__name text--medium">{chatroom.name}</p>
        </div>
        <div className="chat-header-options-wrapper">
          <Icon icon="ellipsis-h" />
        </div>
      </div>
    );
  } else {
    return (
      <div className="chat-header-wrapper">
        <div className="chat-header-info">
          <div className="avatar avatar--small center loading"></div>
          <p className="chat-header-info__name loading text--medium">.</p>
        </div>
      </div>
    );
  }
};

const ChatBody = function ({ messages }) {
  if (messages) {
    return <div></div>;
  } else {
    return <div></div>;
  }
};

const ChatInput = function ({ thisUser }) {
  return <div></div>;
};

const MessageCard = function ({ message }) {
  if (message) {
    return <div></div>;
  } else {
    return <div></div>;
  }
};

export { ChatHeader, ChatBody, ChatInput, MessageCard };
