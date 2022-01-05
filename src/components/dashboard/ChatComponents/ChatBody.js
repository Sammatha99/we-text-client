import { useState, useEffect } from "react";
import clsx from "clsx";
import dateFormat from "dateformat";
import { useSelector } from "react-redux";

import { UsersSeenChatModal } from "../../modals";
import { constants } from "../../../utils";

import { notFoundImage } from "../../../assets/imgs";

import {
  messagesChatgroupData,
  messagesPersonalData,
} from "../../../utils/fakeData";

// TODO 1.6 messages list infinite scroll, load messages

const getMembersSeen = (chatroom, messageId) => {
  if (
    !chatroom.seenHistory ||
    !Object.values(chatroom.seenHistory).includes(messageId)
  )
    return null;
  const members = chatroom.membersPopulate.filter((member) => {
    const getKeys = Object.keys(chatroom.seenHistory).filter(
      (key) => chatroom.seenHistory[key] === messageId
    );
    return getKeys.find((key) => key === member.id.toString());
  });
  return members;
};

const UsersSeenComponent = ({ usersSeen }) => {
  const [showModal, setShowModal] = useState(false);
  const handleUsersSeenClick = () => {
    setShowModal(true);
  };

  if (usersSeen) {
    return (
      <>
        <div
          className="messageCard-wrap-userseen"
          onClick={handleUsersSeenClick}
        >
          {usersSeen.map((user) => (
            <div
              key={user.id}
              className="avatar avatar--3x-small center tooltip"
            >
              <img src={user.avatar} alt={user.name} />
              <span className="tooltiptext  tooltip-left">{user.name}</span>
            </div>
          ))}
        </div>
        <UsersSeenChatModal
          showModal={showModal}
          usersSeen={usersSeen}
          setShowModal={setShowModal}
        />
      </>
    );
  } else {
    return <></>;
  }
};

const MessageCard = function ({ message, isGroupChat }) {
  const thisUserId =
    useSelector((state) => state.thisUser.value.id) === message?.sender?.id;

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
                {thisUserId
                  ? "You"
                  : isGroupChat && `${message.sender.name} - `}
                {dateFormat(message.time)}
              </p>
            </div>
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

export default function ChatBody() {
  const chatroom = useSelector(
    (state) => state.chatrooms.value.selectedChatroom
  );
  const userId = useSelector((state) => state.thisUser.value.id);
  const [messages, setMessages] = useState(null);

  useEffect(() => {
    // TODO 2.3 chat screen
    if (chatroom != null) {
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
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (messages) {
    return (
      <>
        <div className="chat-body-wrapper">
          {messages.map((message) => (
            <div
              style={{ display: "flex", flexDirection: "column" }}
              key={message.id}
            >
              <MessageCard
                isGroupChat={chatroom.isGroupChat}
                message={message}
                thisUserId={message.sender.id === userId}
              />
              <UsersSeenComponent
                // key={`${message.id}__usersSeen`}
                usersSeen={getMembersSeen(chatroom, message.id)}
              />
            </div>
          ))}
        </div>
      </>
    );
  } else {
    return (
      <div className="chat-body-wrapper">
        {constants.list4.map((item) => (
          <MessageCard key={item} thisUserId={item % 2} />
        ))}
      </div>
    );
  }
}
