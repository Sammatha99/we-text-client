import { useState, useEffect, useMemo } from "react";
import clsx from "clsx";
import dateFormat from "dateformat";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import { catchError, EndNoDataComponent } from "../../utils";
import { UsersSeenChatModal } from "../../modals";
import { constants } from "../../../utils";

import { useStore, actions } from "../../../contextStore/chatInput";
import { backendWithAuth, backendWithoutAuth } from "../../../api/backend";
import { thisUserAction, chatroomsAction } from "../../../features";
import { socket } from "../../../Global";

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

const MessageCard = function ({ message, isGroupChat, fakeThisUserId }) {
  const thisUserId =
    useSelector((state) => state.thisUser.value.id) === message?.sender;

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
            {thisUserId ? "You" : isGroupChat && message.senderPopulate.name}{" "}
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
                <img
                  src={message.senderPopulate.avatar}
                  alt={message.senderPopulate.name}
                />
              </div>
            </div>
            <div className="messageCard-wrap-text">
              {MessageContent(message.type, message.text)}
              <p className="messageCard-time">
                {isGroupChat &&
                  !thisUserId &&
                  `${message.senderPopulate.name} - `}
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
          "messageCard--end": fakeThisUserId,
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
  const dispatch = useDispatch();
  const chatroom = useSelector(
    (state) => state.chatrooms.value.selectedChatroom
  );
  const userId = useSelector((state) => state.thisUser.value.id);
  const [messageState, messageDispatch] = useStore();

  const getUserById = (findId) => {
    return chatroom.membersPopulate.find((user) => findId === user.id);
  };

  const seenUsers = useMemo(() => {
    if (chatroom.seenHistory) {
      const seenHistoryFormat = {}; //{mesageId: [user]}
      for (var id in chatroom.seenHistory) {
        if (id === userId) continue;
        const user = getUserById(id);
        user &&
          (seenHistoryFormat[chatroom.seenHistory[id]]
            ? seenHistoryFormat[chatroom.seenHistory[id]].push(user)
            : (seenHistoryFormat[chatroom.seenHistory[id]] = [user]));
      }
      return seenHistoryFormat;
    }
    return {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroom.seenHistory, userId, messageState.messages[0]]);

  useEffect(() => {
    messageDispatch(actions.clearMessagesPaginate());
    loadMessages(1);

    socket.on(`receive-message-${chatroom.id}`, handleRecieveMessage);
    socket.on(`receive-add-member-${chatroom.id}`, handleRecieveAddMembers);

    return () => {
      socket.off(`receive-message-${chatroom.id}`);
      socket.off(`receive-add-member-${chatroom.id}`);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroom.id]);

  useEffect(() => {
    console.log(
      " messageState.messages[0]?.id: ",
      messageState.messages[0]?.id
    );
    console.log(
      'messageState.messages[0]?.type !== "notify": ',
      messageState.messages[0]?.type !== "notify"
    );
    console.log("chatroom.seenHistory: ", chatroom.seenHistory);
    console.log(
      !chatroom.seenHistory ||
        (chatroom.seenHistory &&
          chatroom.seenHistory[userId] !== messageState.messages[0]?.id)
    );

    messageState.messages[0]?.id &&
      messageState.messages[0]?.type !== "notify" &&
      (!chatroom.seenHistory ||
        (chatroom.seenHistory &&
          chatroom.seenHistory[userId] !== messageState.messages[0]?.id)) &&
      sendSeenHistory(messageState.messages[0].id);
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messageState.messages[0]?.id]);

  const sendSeenHistory = (messageId) => {
    console.log("??");
    try {
      backendWithAuth().then((axios) => {
        if (axios) {
          axios
            .patch(`/chatrooms/${chatroom.id}/seen-history`, {
              userIdMessageId: { [userId]: messageId },
            })
            .then((res) => {
              socket.emit("send-seen-message", chatroom.id, {
                [userId]: messageId,
              });
            });
          dispatch(
            chatroomsAction.updateSeenHistory({
              chatroomId: chatroom.id,
              seenHistory: { [userId]: messageId },
            })
          );
        }
      });
    } catch (err) {}
  };

  const handleRecieveMessage = (message, sender) => {
    if (message.chatroomId === chatroom.id) {
      const newMessage = {
        ...message,
        senderPopulate: sender,
      };
      messageDispatch(actions.unshiftMessage(newMessage));
    }
  };

  const handleRecieveAddMembers = (
    chatroomId,
    lastMessageId,
    time,
    newMembersId
  ) => {
    if (chatroom.id === chatroomId) {
      newMembersId.forEach((newMemberId, index) => {
        backendWithoutAuth.get(`/users/${newMemberId}`).then((res) => {
          const user = res.data;
          const message = {
            id: `${lastMessageId}_${index}`,
            text: "joined group",
            sender: user.id,
            senderPopulate: user,
            type: "notify",
            chatroomId,
            time,
          };
          messageDispatch(actions.unshiftMessage(message));
        });
      });
    }
  };

  const loadMessages = async (page = messageState.paginate.page) => {
    try {
      const axios = await backendWithAuth();
      if (axios) {
        const url = `/messages?chatroomId=${chatroom.id}&page=${page}&limit=15`;
        const res = await axios.get(url);

        messageDispatch(
          actions.addMessagesPaginate({
            messages: res.data.results,
            paginate: {
              page: page + 1,
              totalPages: res.data.totalPages,
              totalResults: res.data.totalResults,
            },
          })
        );
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      catchError(err);
    }
  };

  const LoadingMessages = () => {
    return (
      <>
        {constants.list3.map((item) => (
          <MessageCard key={item} fakeThisUserId={item % 2} />
        ))}
      </>
    );
  };

  return (
    <>
      <div id="chat-body-warpper" className="chat-body-wrapper">
        {messageState.paginate != null && (
          <InfiniteScroll
            style={{ display: "flex", flexDirection: "column-reverse" }} //To put endMessage and loader to the top.
            inverse={true} //
            scrollableTarget="chat-body-warpper"
            dataLength={messageState.messages.length}
            next={loadMessages}
            loader={<LoadingMessages />}
            hasMore={
              messageState.messages.length < messageState.paginate.totalResults
            }
          >
            {messageState.messages.map((message) => (
              <div
                key={message.id}
                style={{ display: "flex", flexDirection: "column" }}
              >
                <MessageCard
                  isGroupChat={chatroom.isGroupChat}
                  message={message}
                  thisUserId={message.senderPopulate.id === userId}
                />
                <UsersSeenComponent usersSeen={seenUsers[message.id]} />
              </div>
            ))}
          </InfiniteScroll>
        )}
        {messageState.paginate == null && <LoadingMessages />}
        {messageState.messages.length === 0 && (
          <div className="center">
            <EndNoDataComponent.EndNoDataLight text="No Messages" />
          </div>
        )}
      </div>
    </>
  );
}
