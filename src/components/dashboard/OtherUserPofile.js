import React, { useEffect, useState, useMemo } from "react";
import clsx from "clsx";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import "../../style/otherUserProfile.css";

import { UserCard, LoadingComponent, catchError } from "../utils";
import {
  featuresAction,
  thisUserDetailAction,
  thisUserAction,
} from "../../features";
import { backendWithoutAuth, backendWithAuth } from "../../api/backend";

export default function OtherUserPofile() {
  const dispatch = useDispatch();
  const thisUserId = useSelector((state) => state.thisUser.value.id);
  const thisUserContacts = useSelector(
    (state) => state.thisUserDetail.value.contacts
  );
  const thisUserFollowings = useSelector(
    (state) => state.thisUserDetail.value.followings
  );
  const userId = useSelector((state) => state.features.value.selectedUser);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [followings, setFollowings] = useState([]);
  const [contacts, setContacts] = useState([]);

  // get is if thisUser is following or have UserId in contacts list
  const contact = useMemo(() => {
    return thisUserContacts.includes(userId);
  }, [thisUserContacts, userId]);
  const follow = useMemo(() => {
    return thisUserFollowings.includes(userId);
  }, [thisUserFollowings, userId]);

  useEffect(() => {
    async function loadOtherUserInfo() {
      try {
        // get user info
        const resGetUser = await backendWithoutAuth.get(`/users/${userId}`);
        setUser(resGetUser.data);

        // get user detail
        const resGetUserDetail = await backendWithoutAuth.get(
          `/userDetails/${userId}`
        );

        setUserDetail(resGetUserDetail.data);
        loadFollowings(resGetUserDetail.data);
        loadContacts(resGetUserDetail.data);
      } catch (err) {
        catchError(err);
      }

      setLoading(false);
    }

    loadOtherUserInfo();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleAddContact = async () => {
    if (!thisUserContacts.includes(user.id)) {
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

  const handleRemoveContact = async () => {
    if (thisUserContacts.includes(user.id)) {
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
    }
  };

  const handleAddFollowing = async () => {
    if (!thisUserFollowings.includes(user.id)) {
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

  const handleRemoveFollowing = async () => {
    if (thisUserFollowings.includes(user.id)) {
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
    }
  };

  const ButtonsDiv = () => {
    return (
      <div className="otherUser-btns">
        {follow ? (
          <button
            onClick={handleRemoveFollowing}
            className="btn btn--primary btn--medium"
          >
            Unfollow
          </button>
        ) : (
          <button onClick={handleAddFollowing} className="btn btn--medium">
            Follow
          </button>
        )}
        {contact ? (
          <button
            onClick={handleRemoveContact}
            className="btn btn--primary btn--medium"
          >
            Uncontact
          </button>
        ) : (
          <button onClick={handleAddContact} className="btn btn--medium">
            Add contact
          </button>
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
              <Icon icon="chevron-up" />
            </label>
            <label
              htmlFor="otherUserAbout__checkbox"
              className="otherUserAbout__checkbox--open"
            >
              <Icon icon="chevron-down" />
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

  const addUserToList = async (ids, set) => {
    try {
      const users = [];
      for (var id of ids) {
        const res = await backendWithoutAuth.get(`/users/${id}`);
        users.push(res.data);
      }
      set((prev) => [...prev, ...users]);
    } catch (err) {
      catchError(err);
    }
  };

  const loadFollowings = (paramUserDetail = userDetail) => {
    const currentLength = followings.length;
    const followingsIdToLoad = paramUserDetail.followings.slice(
      currentLength,
      currentLength + 10
    );
    addUserToList(followingsIdToLoad, setFollowings);
  };

  const loadContacts = (paramUserDetail = userDetail) => {
    const currentLength = contacts.length;
    const contactsIdToLoad = paramUserDetail.contacts.slice(
      currentLength,
      currentLength + 10
    );
    addUserToList(contactsIdToLoad, setContacts);
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
              <Icon icon="chevron-up" />
            </label>
            <label
              htmlFor="otherUserFollowings__checkbox"
              className="otherUserFollowings__checkbox--open"
            >
              <Icon icon="chevron-down" />
            </label>
          </div>
        </label>
        <div className="otherUserFollowings__content">
          <div id="otherUserFollowings__content">
            <InfiniteScroll
              scrollableTarget="otherUserFollowings__content"
              dataLength={followings.length}
              next={loadFollowings}
              hasMore={followings.length < userDetail.followings.length}
              loader={
                <LoadingComponent.LoadingContacts classes="userCard--white" />
              }
            >
              {followings.map((following) => (
                <UserCard
                  user={following}
                  key={following.id}
                  classes={"userCard--white"}
                />
              ))}
            </InfiniteScroll>
          </div>
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
              <Icon icon="chevron-up" />
            </label>
            <label
              htmlFor="otherUserContacts__checkbox"
              className="otherUserContacts__checkbox--open"
            >
              <Icon icon="chevron-down" />
            </label>
          </div>
        </label>
        <div className="otherUserContacts__content">
          <div id="otherUserContacts__content">
            <InfiniteScroll
              scrollableTarget="otherUserContacts__content"
              dataLength={contacts.length}
              next={loadContacts}
              hasMore={contacts.length < userDetail.contacts.length}
              loader={
                <LoadingComponent.LoadingContacts classes="userCard--white" />
              }
            >
              {contacts.map((contact) => (
                <UserCard
                  user={contact}
                  key={contact.id}
                  classes={"userCard--white"}
                />
              ))}
            </InfiniteScroll>
          </div>
        </div>
      </>
    );
  };

  const handleCloseOtherUser = () => {
    dispatch(featuresAction.setSelectedUser(null));
  };

  return (
    <div className="smallPanel content  smallPanel--white smallPanel--right">
      <div className="smallPanel-header">
        User profile
        <div
          onClick={handleCloseOtherUser}
          className="chat-header-options-wrapper smallPanel-header__icon"
        >
          <Icon icon="times" />
        </div>
      </div>
      {loading ? (
        <div className="smallPanel-content">
          {LoadingComponent.LoadingRightPanel()}
        </div>
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
