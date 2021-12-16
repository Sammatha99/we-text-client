import React, { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { PopupMenus } from "../utils";

import { thisUserDetailData } from "../../utils/fakeData";

export default function UserCard({ user, classes }) {
  const [status, setSatus] = useState(user && user.status);

  // get from store redux
  const [thisUserContacts, setThisUserContacts] = useState(
    JSON.parse(JSON.stringify(thisUserDetailData.contacts))
  );
  const [thisUserFollowings, setThisUserFollowings] = useState(
    JSON.parse(JSON.stringify(thisUserDetailData.followings))
  );

  const handleContact = () => {
    // nếu đang trong contact => remove khỏi contact, else add  => update store redux
    if (thisUserContacts.includes(user.id)) {
      setThisUserContacts((prev) =>
        prev.filter((contact) => contact !== user.id)
      );
    } else {
      setThisUserContacts((prev) => [...prev, user.id]);
    }
  };

  const handleFollow = () => {
    // nếu đang trong followings => remove khỏi followings, else add  => update store redux (populate and ids)
    if (thisUserFollowings.includes(user.id)) {
      setThisUserFollowings((prev) =>
        prev.filter((follow) => follow !== user.id)
      );
    } else {
      setThisUserFollowings((prev) => [...prev, user.id]);
    }
  };

  const { PopupMenu, triggerProps, handleClickPopupMenu } =
    PopupMenus.PopupMenu();

  const PopupMenuUserCard = () => {
    return PopupMenus.PopupMenuUserCard(
      user.id,
      thisUserContacts,
      handleContact,
      thisUserFollowings,
      handleFollow
    );
  };

  if (user)
    return (
      <div className={clsx("userCard", classes)}>
        <div
          className={clsx("avatar", "avatar--small", "center", {
            "user-active-dots": status,
          })}
        >
          <img
            className="avatar"
            src={user.avatar}
            alt={`${user.name} avatar`}
          />
        </div>
        <div className="userCard__content">
          <p className="userCard__name">{user.name}</p>
        </div>
        <div
          {...triggerProps}
          onClick={handleClickPopupMenu}
          className="userCard__options-wrapper"
        >
          <Icon icon="ellipsis-h" />
        </div>
        {PopupMenu(PopupMenuUserCard)}
      </div>
    );
  else
    return (
      <div className={clsx("userCard", classes)}>
        <div className="avatar avatar--small center loading"></div>
        <div className="userCard__content">
          <p className="userCard__name loading">.</p>
        </div>
      </div>
    );
}
