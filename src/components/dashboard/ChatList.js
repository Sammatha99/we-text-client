import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingComponent, ChatCard, utilFunction } from "../utils";
import { optionsChatList } from "../../utils/constants";
import { CreateChatModal, modalsName } from "../modals";

import "../../style/chatList.css";

import { chatRoomsData, thisUserData } from "../../utils/fakeData";

/**
 * reducer chatList:
 * - searchStr
 * - options: idStr
 * get từ redux store:
 * - chatrooms
 * - selectedChatroom
 */

export default function ChatList({ setSelectedChatroom, selectedChatroom }) {
  const [chatrooms, setChatrooms] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    /**
     * // gọi data chatrooms từ backend
     * update store redux:
     * - chatrooms
     */
    const getChatRooms = JSON.parse(JSON.stringify(chatRoomsData));

    getChatRooms.forEach((chatroom) => {
      chatroom = utilFunction.formatChatroom(chatroom, thisUserData.id);
      return chatroom;
    });

    setChatrooms(getChatRooms);

    setLoading(false);
    return () => {};
  }, []);

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    // call backend chatList : option
  };

  const handleSearchChatrooms = () => {
    // reducer chatList : searchStr + option
  };

  const handleSearchKeyDown = (e) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13) {
      handleSearchChatrooms();
    }
  };

  const handleClearSearch = () => {
    // reducer chatList: clear searchStr
  };

  return (
    <>
      <div className="smallPanel content smallPanel--left">
        <div>
          <div className="smallPanelLeft-header-info">
            <div>
              <p className="text--header">Chats</p>
              <select
                className="chatList-header-info__select"
                onChange={handleOptionChange}
                // value={option: reducer chatList}
              >
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
            <input
              className="input-icon__input"
              placeholder="Search here"
              onKeyDown={handleSearchKeyDown}
            />
            <div className="input-icon__icon--right">
              <Icon
                className="input-icon__icon--link"
                icon="search"
                onClick={handleSearchChatrooms}
              />
              <Icon
                className="input-icon__icon--link input-icon__icon--clear"
                icon="times-circle"
                onClick={handleClearSearch}
              />
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
