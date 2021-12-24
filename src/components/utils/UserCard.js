import React, { useState } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { PopupMenus } from "../utils";

import { catchError } from "./";
import {
  thisUserAction,
  thisUserDetailAction,
  featuresAction,
} from "../../features";
import { backendWithAuth } from "../../api/backend";
import features from "../../features/features";

export default function UserCard({ user, classes }) {
  const dispatch = useDispatch();
  const [status, setSatus] = useState(user && user.status);

  const thisUserId = useSelector((state) => state.thisUser.value.id);
  const thisUserContacts = useSelector(
    (state) => state.thisUserDetail.value.contacts
  );
  const thisUserFollowings = useSelector(
    (state) => state.thisUserDetail.value.followings
  );

  const handleContact = async () => {
    // SOCKET: thông báo cho other user
    // nếu đang trong contact => remove khỏi contact, else add  => update store redux
    if (thisUserContacts.includes(user.id)) {
      // có trong contacts => remove khỏi contacts => update redux store
      try {
        const axios = await backendWithAuth();
        if (axios != null) {
          await axios.patch(`/userDetails/${thisUserId}/delete-contact`, {
            userId: user.id,
          });
          dispatch(thisUserDetailAction.deleteContact(user.id));
        } else {
          dispatch(thisUserAction.logout());
        }
      } catch (err) {
        catchError(err);
      }
    } else {
      // không có trong contacts => add vào contacts => update redux store
      try {
        const axios = await backendWithAuth();
        if (axios != null) {
          await axios.patch(`/userDetails/${thisUserId}/add-contact`, {
            userId: user.id,
          });
          dispatch(thisUserDetailAction.addContact(user.id));
        } else {
          dispatch(thisUserAction.logout());
        }
      } catch (err) {
        catchError(err);
      }
    }
  };

  const handleFollow = async () => {
    // SOCKET: thông báo cho other user
    // nếu đang trong followings => remove khỏi followings, else add  => update store redux
    if (thisUserFollowings.includes(user.id)) {
      // có trong followings => remove khỏi followings => update redux store
      try {
        const axios = await backendWithAuth();
        if (axios != null) {
          await axios.patch(`/userDetails/${thisUserId}/delete-following`, {
            userId: user.id,
          });
          dispatch(thisUserDetailAction.deleteFollowing(user.id));
        } else {
          dispatch(thisUserAction.logout());
        }
      } catch (err) {
        catchError(err);
      }
    } else {
      // không có trong followings => add vào followings => update redux store
      try {
        const axios = await backendWithAuth();
        if (axios != null) {
          await axios.patch(`/userDetails/${thisUserId}/add-following`, {
            userId: user.id,
          });
          dispatch(thisUserDetailAction.addFollowing(user.id));
        } else {
          dispatch(thisUserAction.logout());
        }
      } catch (err) {
        catchError(err);
      }
    }
  };

  const handleSeeProfile = () => {
    handleClickPopupMenu();
    dispatch(featuresAction.setOpenRightPanel(true));
    dispatch(featuresAction.setSelectedUser(user.id));
  };

  const { PopupMenu, triggerProps, handleClickPopupMenu } =
    PopupMenus.PopupMenu();

  const PopupMenuUserCard = () => {
    return PopupMenus.PopupMenuUserCard(
      user.id,
      thisUserContacts.includes(user.id),
      handleContact,
      thisUserFollowings.includes(user.id),
      handleFollow,
      handleSeeProfile
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
