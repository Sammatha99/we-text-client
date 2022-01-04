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

const PopupMenuChatGroupCard = (chatId) => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.thisUser.value.id);
  const selectedChatroomId = useSelector(
    (state) => state.features.value.selectedChatroom
  );
  const currentPage =
    useSelector((state) => state.chatrooms.value.paginate.page) - 1;

  const LoadingMissingChatroom = async (axios) => {
    const url = `/chatrooms?userId=${userId}&page=${currentPage}`;

    const res = await axios.get(url);

    //format chatrooms
    res.data.results.forEach((chatroom) => {
      chatroom = utilFunction.formatChatroom(chatroom, userId);
      return chatroom;
    });

    console.log("data: ", res.data);
    console.log("page: ", currentPage);

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
        await axios.patch(`/chatrooms/${chatId}/delete-member`, { userId });

        if (selectedChatroomId === chatId) {
          dispatch(featuresAction.setSelectedChatroom(null));
        }
        dispatch(chatroomsAction.deleteChatroom(chatId));
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
