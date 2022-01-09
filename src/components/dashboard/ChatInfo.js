import React, { useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch, useSelector } from "react-redux";

import "../../style/chatInfo.css";

import {
  UserCard,
  ThisUserCard,
  catchError,
  LoadingComponent,
  swal,
} from "../utils";
import {
  modalsName,
  AddMemberInChatModal,
  ChangeGroupChatName,
} from "../modals";
import { utilFunction } from "../../utils";

import {
  featuresAction,
  thisUserAction,
  filesAction,
  chatroomsAction,
} from "../../features";

import { backendWithAuth } from "../../api/backend";

export default function ChatInfo() {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.thisUser.value.id);
  const chatroom = useSelector(
    (state) => state.chatrooms.value.selectedChatroom
  );
  console.log(chatroom.membersPopulate);
  const files = useSelector((state) => state.files.value);
  const currentPage =
    useSelector((state) => state.chatrooms.value.paginate.page) - 1;
  const { setOpenChangeGroupNameModal, ChangeGroupChatNameModal } =
    ChangeGroupChatName();

  useEffect(() => {
    if (files.paginate == null || files.chatroomId !== chatroom.id) {
      /**
       * get files from backend if redux.paginate == null or
       * redux.files.chatroomId != selectedChatroomId
       */
      loadFiles(1, setNew);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatroom.id, files.chatroomId]);

  const setNew = (o) => {
    dispatch(filesAction.set(o));
  };

  const addNew = (o) => {
    o.page = o.page + 1;
    dispatch(filesAction.addNew(o));
  };

  const loadFiles = async (page = files.paginate.page, f = addNew) => {
    try {
      const axios = await backendWithAuth();
      if (axios != null) {
        const url = `/chatrooms/${chatroom.id}/files?page=${page}`;

        const res = await axios.get(url);

        f({
          chatroomId: chatroom.id,
          files: res.data.results,
          paginate: {
            page: page + 1,
            totalPages: res.data.totalPages,
            totalResults: res.data.totalResults,
          },
        });
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      catchError(err);
    }
  };

  const handleSubmitAdd = async (newMembers) => {
    swal.showLoadingSwal();
    try {
      const axios = await backendWithAuth();
      if (axios) {
        const res = await axios.patch(`/chatrooms/${chatroom.id}/add-member`, {
          usersId: newMembers,
        });
        Object.assign(res.data, utilFunction.formatChatroom(res.data, userId));
        dispatch(chatroomsAction.updateChatroom(res.data));
        dispatch(chatroomsAction.unshiftChatroom(res.data));
        swal.closeSwal();
        swal.showSuccessSwal();
      } else {
        dispatch(thisUserAction.logout());
        swal.closeSwal();
      }
    } catch (err) {
      catchError(err);
    }
  };

  const LoadingMissingChatroom = async (axios) => {
    const url = `/chatrooms?userId=${userId}&page=${currentPage}`;

    const res = await axios.get(url);

    //format chatrooms
    res.data.results.forEach((chatroom) => {
      chatroom = utilFunction.formatChatroom(chatroom, userId);
      return chatroom;
    });

    // dispatch set chatrooms & paginate
    dispatch(
      chatroomsAction.addNew({
        chatrooms: res.data.results,
        paginate: {
          // page: currentPage + 1,
          totalPages: res.data.totalPages,
          totalResults: res.data.totalResults,
        },
      })
    );
  };

  const handleOutGroup = async (e) => {
    e.stopPropagation();
    // delete in redux: chatrooms, features
    try {
      swal.showLoadingSwal();
      const axios = await backendWithAuth();
      if (axios) {
        await axios.patch(`/chatrooms/${chatroom.id}/delete-member`, {
          userId,
        });

        dispatch(featuresAction.setSelectedChatroom(false));
        dispatch(chatroomsAction.deleteChatroom(chatroom.id));
        await LoadingMissingChatroom(axios);
        swal.closeSwal();
      } else {
        dispatch(thisUserAction.logout());
        swal.closeSwal();
      }
    } catch (err) {
      catchError(err);
    }
  };

  const handleSeeProfile = () => {
    const otherUserId = chatroom.membersPopulate[0].id;
    dispatch(featuresAction.setSelectedUser(otherUserId));
  };

  const handleCloseChatInfo = () => {
    dispatch(featuresAction.setSelectedChatroom(false));
  };

  const handleChatNameClick = () => {
    if (chatroom.isGroupChat) setOpenChangeGroupNameModal(true);
  };

  const ChatInfoMenus = () => {
    if (chatroom.isGroupChat) {
      return (
        <>
          <div onClick={handleOutGroup} className="smallPanel-menu-item">
            Out group
          </div>
          <div className="smallPanel-menu-item">Delete chat</div>
          <div className="smallPanel-menu-item">Block</div>
          <div
            onClick={() => setOpenChangeGroupNameModal(true)}
            className="smallPanel-menu-item"
          >
            Change group name
          </div>
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
          <ThisUserCard classes="userCard--white" />
        </div>
      </>
    );
  };

  return (
    <>
      <div className="smallPanel content smallPanel--white smallPanel--right">
        <div className="smallPanel-header">
          Chat info
          <div
            onClick={handleCloseChatInfo}
            className="chat-header-options-wrapper smallPanel-header__icon"
          >
            <Icon icon="times" />
          </div>
        </div>
        <div className="smallPanel-content" id="chatInfo-share-files-scroll">
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
            <div
              onClick={handleChatNameClick}
              className="text--medium-2 text--center chatInfo__room-name"
            >
              {chatroom.name}
            </div>

            <ChangeGroupChatNameModal />

            {!chatroom.isGroupChat && (
              <button
                onClick={handleSeeProfile}
                className="btn btn--primary btn--medium chatInfo__btn"
              >
                See profile
              </button>
            )}
          </div>

          {ChatInfoMenus()}
          {chatroom.isGroupChat && membersInfo()}

          <p className="smallPanel-menu-item text--center">Share files</p>

          {files.paginate ? (
            <InfiniteScroll
              className="chatInfo-share-files"
              scrollableTarget="chatInfo-share-files-scroll"
              dataLength={files.files.length}
              next={loadFiles}
              hasMore={files.files.length < files.paginate.totalResults}
              loader={<LoadingComponent.LoadingFileItems />}
            >
              {files.files.map((file) => (
                <div key={file.id} className="chatInfo-files-item">
                  {file.type === "image" ? (
                    // TODO zoom image
                    <img src={file.text} alt="img" />
                  ) : (
                    <video controls>
                      <source src={file.text} type="video/mp4" />
                    </video>
                  )}
                </div>
              ))}
            </InfiniteScroll>
          ) : (
            <div className="chatInfo-share-files">
              <LoadingComponent.LoadingFileItems />
            </div>
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
