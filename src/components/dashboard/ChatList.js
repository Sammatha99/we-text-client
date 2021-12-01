import React, { useMemo, useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingComponent, ChatCard } from "../utils";
import "../../style/chatList.css";
import { chatRoomsData, thisUserData } from "../../utils/fakeData";

const chatRooms = JSON.parse(JSON.stringify(chatRoomsData));

export default function ChatList() {
  const [selectChatroom, setSelectChatroom] = useState(0);
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
    chatRooms.forEach((chatroom) => {
      // lọc members để loại bỏ chính mình đi
      const myIndex = chatroom.members.findIndex(
        (id) => id === thisUserData.id
      );
      chatroom.members.splice(myIndex, 1);
      chatroom.membersPopulate.splice(myIndex, 1);

      // kiếm name cho chatroom
      if (!chatroom.name) {
        const names = [];
        chatroom.membersPopulate.forEach((member) => {
          names.push(member.name);
        });
        chatroom.name = names.join(", ");
      }

      return chatroom;
    });
    setLoading(false);
    return () => {};
  }, []);

  return (
    <div className="smallPanel content">
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
          <button className="btn btn--medium btn--primary">
            <Icon className="icon--margin-right" icon="plus" />
            Create new chat
          </button>
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
          chatRooms.map((chatroom) => (
            <ChatCard
              isSelected={selectChatroom === chatroom.id}
              key={chatroom.id}
              chatroom={chatroom}
            />
          ))
        )}
      </div>
    </div>
  );
}
