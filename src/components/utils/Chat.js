import clsx from "clsx";
import dateFormat from "dateformat";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { utilFunction } from ".";
import "../../style/chat.css";

import { thisUserData } from "../../utils/fakeData";

const listMessage = [0, 1, 2, 3];

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
          <p className="chat-header-info__name text--medium-2">
            {chatroom.name}
          </p>
        </div>
        <div className="chat-header-options-wrapper">
          <Icon icon="times" />
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

const getMembersSeen = (chatroom, messageId) => {
  if (!Object.values(chatroom.seenHistory).includes(messageId)) return null;
  const members = chatroom.membersPopulate.filter((member) => {
    const getKeys = Object.keys(chatroom.seenHistory).filter(
      (key) => chatroom.seenHistory[key] === messageId
    );
    // TODO fix sau
    // eslint-disable-next-line eqeqeq
    return getKeys.find((key) => key == member.id);
  });
  return members;
};

const ChatBody = function ({ messages, chatroom }) {
  // messages = null;
  if (messages) {
    return (
      <div className="chat-body-wrapper">
        {messages.map((message) => (
          <MessageCard
            isGroupChat={chatroom.isGroupChat}
            key={message.id}
            message={message}
            thisUserId={message.sender.id === thisUserData.id}
            usersSeen={getMembersSeen(chatroom, message.id)}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="chat-body-wrapper">
        {listMessage.map((item) => (
          <MessageCard key={item} thisUserId={item % 2} />
        ))}
      </div>
    );
  }
};

const ChatInput = function ({ thisUser }) {
  const handleChatInputKeyDown = (e) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13 && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();

      // Do something else such as send the message to back-end
      // ...
    }
  };

  return (
    <div className="chat-input-wrapper">
      <div className="chat-input__wrap">
        <div className="avatar avatar--x-small center">
          <img
            className="avatar"
            src={thisUser.avatar}
            alt={`${thisUser.name} avatar`}
          />
        </div>
        <div className="chat-input__input">
          <textarea
            onKeyDown={handleChatInputKeyDown}
            type="text"
            rows="3"
            placeholder="Insert text ...."
          />
        </div>
      </div>
      <div className="chat-input__wrap">
        <div className="chat-input__icon-wrapper">
          <div className="chat-input__icon">
            <Icon icon="photo-video" />
          </div>
          <div className="chat-input__icon">
            <Icon icon="paperclip" />
          </div>
          <div className="chat-input__icon">
            <Icon icon="smile-beam" />
          </div>
        </div>
        <button className="btn btn--primary btn--small">Send</button>
      </div>
    </div>
  );
};

const MessageCard = function ({ thisUserId, message, usersSeen, isGroupChat }) {
  const MessageContent = (type, text) => {
    switch (type) {
      case "text":
        return <div className="messageCard--text">{text}</div>;
      case "image":
        return (
          <div className="messageCard--image messageCard--text">
            {/* TODO click open zoom image  */}
            <img src={text} alt={text} />
          </div>
        );
      case "video":
        return (
          <div className="messageCard--video messageCard--text">
            <video controls>
              <source src={text} type="video/mp4" />
            </video>
          </div>
        );
      case "record":
        return <div className="messageCard--record">record {text}</div>;
      default:
        return (
          <div className=" messageCard--text messageCard--error">
            This message is invalid
          </div>
        );
    }
  };

  if (message) {
    if (message.type === "notify") {
      return (
        <>
          <div className="messageCard-wrap-notify">
            {thisUserId ? "You" : isGroupChat && message.sender.name}{" "}
            {message.text}
            {" - "}
            {dateFormat(message.time)}
          </div>
          <div className="messageCard-wrap-userseen">
            {usersSeen &&
              usersSeen.map((user) => (
                <div
                  key={user.id}
                  className="avatar avatar--3x-small center tooltip"
                >
                  <img src={user.avatar} alt={user.name} />
                  <span className="tooltiptext  tooltip-left">{user.name}</span>
                </div>
              ))}
          </div>
        </>
      );
    } else
      return (
        <>
          <div
            className={clsx("messageCard-wraper", {
              "messageCard--end": thisUserId,
            })}
          >
            <div className="messageCard-wrap-avatar">
              <div className="avatar avatar--2x-small center">
                <img src={message.sender.avatar} alt={message.sender.name} />
              </div>
            </div>
            <div className="messageCard-wrap-text">
              {MessageContent(message.type, message.text)}
              <p className="messageCard-time">
                {`${
                  thisUserId ? "You" : isGroupChat && message.sender.name
                } - ${dateFormat(message.time)}`}
              </p>
            </div>
          </div>
          <div className="messageCard-wrap-userseen">
            {usersSeen &&
              usersSeen.map((user) => (
                <div
                  key={user.id}
                  className="avatar avatar--3x-small center tooltip"
                >
                  <img src={user.avatar} alt={user.name} />
                  <span className="tooltiptext  tooltip-left">{user.name}</span>
                </div>
              ))}
          </div>
        </>
      );
  } else {
    return (
      <div
        className={clsx("messageCard--loading", "messageCard-wraper", {
          "messageCard--end": thisUserId,
        })}
      >
        <div className="messageCard-wrap-avatar">
          <div className="avatar avatar--2x-small center loading"></div>
        </div>
        <div className="messageCard-wrap-text">
          <div className="messageCard--text loading">.</div>
          <p className="messageCard-time loading">.</p>
        </div>
      </div>
    );
  }
};

export { ChatHeader, ChatBody, ChatInput, MessageCard };
