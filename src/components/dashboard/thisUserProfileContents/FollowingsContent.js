import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import { UserCard, LoadingComponent, catchError } from "../../utils";
import { backendWithoutAuth } from "../../../api/backend";

import { useStore, actions } from "../../../contextStore/thisUserProfile";

export default function FollowingsContent() {
  const [thisUserProfileState, thisUserProfileDispatch] = useStore();
  const thisUserDetailFollowings = useSelector(
    (state) => state.thisUserDetail.value.followings
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      thisUserDetailFollowings.length > 0 &&
      thisUserProfileState.followings.length === 0
    ) {
      /**
       * chỉ chạy lại loadFollowing khi
       * reduxFollowings > 0 và followingsPopulate === 0
       */
      loadFollowings();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFollowings = async () => {
    setLoading(true);
    const currentLength = thisUserProfileState.followings.length;
    const followingsIdToLoad = thisUserDetailFollowings.slice(
      currentLength,
      currentLength + 10
    );
    const followingsPopulateToLoad = [];
    try {
      for (var id of followingsIdToLoad) {
        const res = await backendWithoutAuth.get(`/users/${id}`);
        followingsPopulateToLoad.push(res.data);
      }
    } catch (err) {
      catchError(err);
    }
    thisUserProfileDispatch(actions.addFollowings(followingsPopulateToLoad));
    setLoading(false);
  };

  const UsersContent = () => {
    return (
      <div>
        <InfiniteScroll
          dataLength={thisUserProfileState.followings.length}
          next={loadFollowings}
          hasMore={
            thisUserProfileState.followings.length <
            thisUserDetailFollowings.length
          }
          height={400}
        >
          {thisUserProfileState.followings.map((following) => (
            <UserCard
              user={following}
              key={following.id}
              classes={"userCard--white"}
            />
          ))}
          {loading && LoadingComponent.LoadingThisUserProfileRightPanel()}
        </InfiniteScroll>
      </div>
    );
  };

  return (
    <>
      <div className="input-icon  input-icon--search">
        <input className="input-icon__input" placeholder="Search here" />
        <div className="input-icon__icon--right">
          <Icon className="input-icon__icon--link" icon="search" />
          <Icon
            className="input-icon__icon--link input-icon__icon--clear"
            icon="times-circle"
          />
        </div>
      </div>
      {UsersContent()}
    </>
  );
}
