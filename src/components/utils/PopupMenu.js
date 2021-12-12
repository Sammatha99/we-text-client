import React, { useState } from "react";
import { useLayer, Arrow } from "react-laag";

import "../../style/base/popupMenu.css";

const PopupMenuChatGroupCard = (chatId) => {
  const handleOutGroup = (e) => {
    e.stopPropagation();
    // outgroup click
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
  const handleSeeProfile = (e) => {
    e.stopPropagation();
    // see profile
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
  userId,
  contacts,
  handleContact,
  followings,
  handleFollow
) => {
  const handleSeeProfile = (e) => {
    e.stopPropagation();
    // see profile
    console.log(userId);
  };

  const getInContacts = () => {
    return contacts.includes(userId);
  };

  const getInFollowings = () => {
    return followings.includes(userId);
  };

  return (
    <div className="popupMenu">
      <div onClick={handleSeeProfile} className="popupMenu__item">
        See profile
      </div>
      <div onClick={handleContact} className="popupMenu__item">
        {getInContacts() ? "Delete" : "Add"} contact
      </div>
      <div onClick={handleFollow} className="popupMenu__item">
        {getInFollowings() ? "Unfollow" : "Add follow"}
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
          {Children()}
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
