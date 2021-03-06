import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLayer, Arrow } from "react-laag";

import "../../style/base/popupMenu.css";
import { swal, catchError } from ".";
import { utilFunction } from "../../utils";
import {
  featuresAction,
  chatroomsAction,
  thisUserAction,
} from "../../features";
import { backendWithAuth } from "../../api/backend";
import { socket } from "../../Global";

const PopupMenuChatGroupCard = (chatId) => {
  const dispatch = useDispatch();
  const thisUser = useSelector((state) => state.thisUser.value);
  const selectedChatroomId = useSelector(
    (state) => state.chatrooms.value.selectedChatroom?.id
  );
  const currentPage =
    useSelector((state) => state.chatrooms.value.paginate.page) - 1;

  const loadingMissingChatroom = async (axios) => {
    const url = `/chatrooms?userId=${thisUser.id}&page=${currentPage}`;

    const res = await axios.get(url);

    //format chatrooms
    res.data.results.forEach((chatroom) => {
      chatroom = utilFunction.formatChatroom(chatroom, thisUser.id);
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
        const res = await axios.patch(`/chatrooms/${chatId}/delete-member`, {
          userId: thisUser.id,
        });
        socket.emit("send-remove-member", res.data.lastMessagePopulate, {
          id: thisUser.id,
          avatar: thisUser.avatar,
          name: thisUser.name,
        });
        if (selectedChatroomId === chatId) {
          dispatch(featuresAction.setSelectedChatroom(false));
        }
        dispatch(chatroomsAction.deleteChatroom(chatId));
        await loadingMissingChatroom(axios);
        swal.closeSwal();
      } else {
        dispatch(thisUserAction.logout());
        swal.closeSwal();
      }
    } catch (err) {
      catchError(err);
    }
  };

  const handleDeleteChat = (e) => {
    e.stopPropagation();
    // delete chat
  };

  return (
    <div className="popupMenu">
      <div onClick={handleOutGroup} className="popupMenu__item">
        Out Group
      </div>
      <div onClick={handleDeleteChat} className="popupMenu__item">
        Delete chat
      </div>
    </div>
  );
};

const PopupMenuChatPersonalCard = (chatId, userId) => {
  const dispatch = useDispatch();

  const handleSeeProfile = (e) => {
    e.stopPropagation();
    dispatch(featuresAction.setSelectedUser(userId));
  };

  const handleDeleteChat = (e) => {
    e.stopPropagation();
    // delete chat
  };

  return (
    <div className="popupMenu">
      <div onClick={handleSeeProfile} className="popupMenu__item">
        See profile
      </div>
      <div onClick={handleDeleteChat} className="popupMenu__item">
        Delete chat
      </div>
    </div>
  );
};

const PopupMenuUserCard = (
  isInContacts,
  handleContact,
  isInFollowings,
  handleFollow,
  handleSeeProfile
) => {
  const _handleSeeProfile = (e) => {
    e.stopPropagation();
    handleSeeProfile();
  };

  return (
    <div className="popupMenu">
      <div onClick={_handleSeeProfile} className="popupMenu__item">
        See profile
      </div>
      <div onClick={handleContact} className="popupMenu__item">
        {isInContacts ? "Delete" : "Add"} contact
      </div>
      <div onClick={handleFollow} className="popupMenu__item">
        {isInFollowings ? "Unfollow" : "Add follow"}
      </div>
    </div>
  );
};

const PopupMenu = function () {
  const [isOpen, setOpen] = useState(false);

  function close() {
    setOpen(false);
  }

  const handleClickPopupMenu = function () {
    setOpen((prev) => !prev);
  };

  const { renderLayer, triggerProps, layerProps, arrowProps } = useLayer({
    isOpen,
    onOutsideClick: close,
    onDisappear: close,
    overflowContainer: true,
    auto: true,
    placement: "bottom-end",
    preferX: "left",
    triggerOffset: 4,
    containerOffset: 16,
    arrowOffset: 8,
  });

  const PopupMenu = function (Children) {
    return (
      isOpen &&
      renderLayer(
        <div
          {...layerProps}
          style={{
            ...layerProps.style,
          }}
        >
          <Children />
          <Arrow {...arrowProps} />
        </div>
      )
    );
  };

  return { PopupMenu, triggerProps, handleClickPopupMenu };
};

export {
  PopupMenu,
  PopupMenuChatGroupCard,
  PopupMenuChatPersonalCard,
  PopupMenuUserCard,
};
