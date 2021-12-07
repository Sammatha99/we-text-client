import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingRightPanel } from "../utils/LoadingScreen";

import "../../style/otherUserProfile.css";
import { UserCard } from "../utils";

import {
  otherUserData,
  otherUserDetailData,
  thisUserDetailData,
} from "../../utils/fakeData";

export default function OtherUserPofile() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [follow, setFollow] = useState(false);
  const [contact, setContact] = useState(false);

  useEffect(() => {
    const getUser = JSON.parse(JSON.stringify(otherUserData));
    const getUserDetail = JSON.parse(JSON.stringify(otherUserDetailData));
    const getFollow = thisUserDetailData.followings.findIndex(
      (id) => id === getUser.id
    );
    const getContact = thisUserDetailData.contacts.findIndex(
      (id) => id === getUser.id
    );
    setUser(getUser);
    setUserDetail(getUserDetail);
    setFollow(getFollow !== -1);
    setContact(getContact !== -1);

    setLoading(false);
    return () => {};
  }, []);

  const ButtonsDiv = () => {
    return (
      <div className="otherUser-btns">
        {follow ? (
          <button className="btn btn--primary btn--medium">Unfollow</button>
        ) : (
          <button className="btn btn--medium">Follow</button>
        )}
        {contact ? (
          <button className="btn btn--primary btn--medium">Uncontact</button>
        ) : (
          <button className="btn btn--medium">Add contact</button>
        )}
      </div>
    );
  };

  const OtherUserPofileHeader = () => {
    return (
      <>
        <div className="otherUser-header-wrapper center">
          <div
            className={clsx("avatar", "avatar--medium", "center", {
              "user-active-dots": user.status,
            })}
          >
            <img
              className="avatar"
              src={user.avatar}
              alt={`${user.name} avatar`}
            />
          </div>
          <div className="otherUser-name text--medium-2 text--center">
            {user.name}
          </div>
          <div className="otherUser-description text--small text--center">
            {userDetail.description}
          </div>
          <div className="otherUser-followers center">
            <div className="otherUser-followers__icon">
              <Icon icon="star" />
            </div>
            {userDetail.followers.length} Followers
          </div>
          {ButtonsDiv()}
        </div>
      </>
    );
  };

  const OtherUserAbout = () => {
    return (
      <>
        <input type="checkbox" id="otherUserAbout__checkbox" hidden />
        <label
          htmlFor="otherUserAbout__checkbox"
          className="smallPanel-menu-item  smallPanel-menu-item--icon"
        >
          About
          <div className="smallPanel-menu-item__icons">
            <label
              htmlFor="otherUserAbout__checkbox"
              className="otherUserAbout__checkbox--close"
            >
              <Icon icon="chevron-down" />
            </label>
            <label
              htmlFor="otherUserAbout__checkbox"
              className="otherUserAbout__checkbox--open"
            >
              <Icon icon="chevron-up" />
            </label>
          </div>
        </label>
        <div className="otherUserAbout__content">
          <div className="otherUserAbout__item">
            <Icon icon="envelope" />
            <p>{user.email}</p>
          </div>
          <div className="otherUserAbout__item">
            <Icon icon="phone" />
            <p>{userDetail.phoneNumber || "No data"}</p>
          </div>
          <div className="otherUserAbout__item">
            <Icon icon="map-marker-alt" />
            <p>{userDetail.address || "No data"}</p>
          </div>
        </div>
      </>
    );
  };

  const OtherUserFollowings = () => {
    return (
      <>
        <input type="checkbox" id="otherUserFollowings__checkbox" hidden />
        <label
          htmlFor="otherUserFollowings__checkbox"
          className="smallPanel-menu-item  smallPanel-menu-item--icon"
        >
          Followings
          <div className="smallPanel-menu-item__icons">
            <label
              htmlFor="otherUserFollowings__checkbox"
              className="otherUserFollowings__checkbox--close"
            >
              <Icon icon="chevron-down" />
            </label>
            <label
              htmlFor="otherUserFollowings__checkbox"
              className="otherUserFollowings__checkbox--open"
            >
              <Icon icon="chevron-up" />
            </label>
          </div>
        </label>
        <div className="otherUserFollowings__content">
          {userDetail.followingsPopulate.map((user) => (
            <UserCard key={user.id} user={user} classes="userCard--white" />
          ))}
        </div>
      </>
    );
  };

  const OtherUserContacts = () => {
    return (
      <>
        <input type="checkbox" id="otherUserContacts__checkbox" hidden />
        <label
          htmlFor="otherUserContacts__checkbox"
          className="smallPanel-menu-item  smallPanel-menu-item--icon"
        >
          Contacts
          <div className="smallPanel-menu-item__icons">
            <label
              htmlFor="otherUserContacts__checkbox"
              className="otherUserContacts__checkbox--close"
            >
              <Icon icon="chevron-down" />
            </label>
            <label
              htmlFor="otherUserContacts__checkbox"
              className="otherUserContacts__checkbox--open"
            >
              <Icon icon="chevron-up" />
            </label>
          </div>
        </label>
        <div className="otherUserContacts__content">
          {userDetail.contactsPopulate.map((user) => (
            <UserCard key={user.id} user={user} classes="userCard--white" />
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="smallPanel content  smallPanel--white smallPanel--right">
      <div className="smallPanel-header">User profile</div>
      {loading ? (
        <div className="smallPanel-content">{LoadingRightPanel()}</div>
      ) : (
        <div className="smallPanel-content">
          {OtherUserPofileHeader()}
          {OtherUserAbout()}
          {OtherUserFollowings()}
          {OtherUserContacts()}
        </div>
      )}
    </div>
  );
}
