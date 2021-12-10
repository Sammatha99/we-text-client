import React, { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingComponent, ChatCard, utilFunction } from "../utils";
import { CreateChatModal, modalsName } from "../modals";
import "../../style/chatList.css";
import { chatRoomsData, thisUserData } from "../../utils/fakeData";

export default function ChatList({ setSelectedChatroom, selectedChatroom }) {
  const [chatrooms, setChatrooms] = useState(null);
  const [loading, setLoading] = useState(true);
  const optionsChatList = useMemo(() => {
    return [
      {
        id: "recent",
        name: "Recent chats",
      },
      {
        id: "old",
        name: "Old chats",
      },
    ];
  }, []);

  useEffect(() => {
    // TODO gọi data từ backend
    const getChatRooms = JSON.parse(JSON.stringify(chatRoomsData));

    getChatRooms.forEach((chatroom) => {
      chatroom = utilFunction.formatChatroom(chatroom, thisUserData.id);
      return chatroom;
    });
    setChatrooms(getChatRooms);

    setLoading(false);
    return () => {};
  }, []);

  return (
    <>
      <div className="smallPanel content smallPanel--left">
        <div>
          <div className="smallPanelLeft-header-info">
            <div>
              <p className="text--header">Chats</p>
              <select className="chatList-header-info__select">
                {optionsChatList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <label
              htmlFor={modalsName.createChatModal}
              className="btn btn--medium btn--primary"
            >
              <Icon className="icon--margin-right" icon="plus" />
              Create new chat
            </label>
          </div>
          <div className="input-icon input-icon--dark input-icon--search">
            <input className="input-icon__input" placeholder="Search here" />
            <div className="input-icon__icon--right input-icon__icon--link">
              <Icon icon="search" />
            </div>
            <div className="input-icon__icon--right input-icon__icon--link input-icon__icon--clear">
              <Icon icon="times-circle" />
            </div>
          </div>
        </div>
        <div className="smallPanel-content">
          {loading ? (
            <LoadingComponent.LoadingChats />
          ) : (
            chatrooms.map((chatroom) => (
              <ChatCard
                isSelected={selectedChatroom === chatroom.id}
                key={chatroom.id}
                chatroom={chatroom}
                setSelectedChatroom={setSelectedChatroom}
              />
            ))
          )}
        </div>
      </div>
      <CreateChatModal />
    </>
  );
}
