import React, { useState, useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import "../../style/chatInfo.css";

import { UserCard, LoadingComponent, utilFunction } from "../utils";
import { modalsName, AddMemberInChatModal } from "../modals";

import {
  chatRoomsData,
  thisUserData,
  chatInfoFilesData,
} from "../../utils/fakeData";

export default function ChatInfo({ id }) {
  const [loading, setLoading] = useState(true);
  const [chatroom, setChatroom] = useState(null);
  const [files, setFiles] = useState(null);

  useEffect(() => {
    // get chatroom from backend
    const getIndex = chatRoomsData.findIndex((chatroom) => chatroom.id === id);
    const getChatroom = JSON.parse(JSON.stringify(chatRoomsData[getIndex]));

    Object.assign(
      getChatroom,
      utilFunction.formatChatroom(getChatroom, thisUserData.id)
    );

    // get share file from backend
    const getFiles = JSON.parse(JSON.stringify(chatInfoFilesData));

    setChatroom(getChatroom);
    setFiles(getFiles);
    setLoading(false);
    return () => {};
  }, [id]);

  const handleSubmitAdd = (newMembers) => {
    console.log(newMembers);
  };

  const ChatInfoMenus = () => {
    if (chatroom.isGroupChat) {
      return (
        <>
          <div className="smallPanel-menu-item">Out group</div>
          <div className="smallPanel-menu-item">Delete chat</div>
          <div className="smallPanel-menu-item">Block</div>
          <div className="smallPanel-menu-item">Change group name</div>
        </>
      );
    }
    return (
      <>
        <div className="smallPanel-menu-item">Delete chat</div>
        <div className="smallPanel-menu-item">Block</div>
      </>
    );
  };

  const membersInfo = () => {
    return (
      <>
        <input type="checkbox" hidden id="chatInfo-menu__members-list" />
        <div className="smallPanel-menu-item chatInfo-menu__members center">
          <div className="chatInfo-menu__members--left center">
            Members
            <label
              htmlFor={modalsName.addMemberInchat}
              className="btn btn--primary btn--small"
            >
              <Icon icon="user-plus" />
            </label>
          </div>
          <label
            htmlFor="chatInfo-menu__members-list"
            className="chatInfo-menu__icon chatInfo-menu__open-members"
          >
            <Icon icon="chevron-down" />
          </label>
          <label
            htmlFor="chatInfo-menu__members-list"
            className="chatInfo-menu__icon chatInfo-menu__close-members"
          >
            <Icon icon="chevron-up" />
          </label>
        </div>
        <div className="chatInfo-menu__members-list">
          {chatroom.membersPopulate.map((user) => (
            <UserCard key={user.id} user={user} classes="userCard--white" />
          ))}
        </div>
      </>
    );
  };

  return (
    <>
      <div className="smallPanel content smallPanel--white smallPanel--right">
        <div className="smallPanel-header">Chat info</div>
        <div className="smallPanel-content">
          {loading ? (
            LoadingComponent.LoadingRightPanel()
          ) : (
            <>
              <div className="chatInfo-header-wrapper center">
                <div
                  className={clsx("avatar", "avatar--medium", "center", {
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
                <div className="text--medium-2 text--center chatInfo__room-name">
                  {chatroom.name}
                </div>
                {!chatroom.isGroupChat && (
                  <button className="btn btn--primary btn--medium chatInfo__btn">
                    See profile
                  </button>
                )}
              </div>

              {ChatInfoMenus()}
              {chatroom.isGroupChat && membersInfo()}
              <div>
                <p className="smallPanel-menu-item text--center">Share files</p>
                <div className="chatInfo-share-files">
                  {files.map((file, index) => (
                    <div key={index} className="chatInfo-files-item">
                      {file.type === "image" ? (
                        // TODO 2 zoom image
                        <img src={file.text} alt="img" />
                      ) : (
                        <video controls>
                          <source src={file.text} type="video/mp4" />
                        </video>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      {chatroom != null && (
        <AddMemberInChatModal
          membersId={chatroom.members}
          handleSubmitAdd={handleSubmitAdd}
        />
      )}
    </>
  );
}
