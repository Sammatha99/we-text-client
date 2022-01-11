import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { utilFunction } from "../../../utils";
import { chatroomsAction, featuresAction } from "../../../features";

export default function ChatHeader() {
  const dispatch = useDispatch();
  const chatroom = useSelector(
    (state) => state.chatrooms.value.selectedChatroom
  );
  const thisUser = useSelector((state) => state.thisUser.value);

  const handleCloseChat = () => {
    // close chat: chatrooms, features
    dispatch(chatroomsAction.setSelectedChatroomById(null));
    dispatch(featuresAction.setSelectedChatroom(false));
  };

  const handleOptionsChat = () => {
    /**
     * smallPanelRight === null ? ('chatInfo') : (null)
     */
    dispatch(featuresAction.toggleSelectedChatroom());
  };

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
            {chatroom.isGroupChat &&
              (chatroom.membersPopulate.length > 1 ? (
                <img
                  className="avatar"
                  src={chatroom.membersPopulate[1].avatar}
                  alt={`${chatroom.membersPopulate[1].name} avatar`}
                />
              ) : (
                <img
                  className="avatar"
                  src={thisUser.avatar}
                  alt={`${thisUser.name} avatar`}
                />
              ))}
          </div>
          <p className="chat-header-info__name text--medium-2">
            {chatroom.name}
          </p>
        </div>
        <div className="chat-header-options-wrapper" onClick={handleCloseChat}>
          <Icon icon="times" />
        </div>
        <div
          className="chat-header-options-wrapper"
          onClick={handleOptionsChat}
        >
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
}
