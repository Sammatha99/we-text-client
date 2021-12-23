import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import { UserCard, LoadingComponent, catchError } from "../../utils";
import { backendWithoutAuth } from "../../../api/backend";

import { useStore, actions } from "../../../contextStore/thisUserProfile";

export default function FollowersContent() {
  const [thisUserProfileState, thisUserProfileDispatch] = useStore();

  const thisUserDetailFollowers = useSelector(
    (state) => state.thisUserDetail.value.followers
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (
      thisUserDetailFollowers.length > 0 &&
      thisUserProfileState.followers.length === 0
    ) {
      /**
       * chỉ chạy lại loadFollower khi
       * reduxFollowers > 0 và followersPopulate === 0
       */
      loadFollowers();
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadFollowers = async () => {
    setLoading(true);
    const currentLength = thisUserProfileState.followers.length;
    const followersIdToLoad = thisUserDetailFollowers.slice(
      currentLength,
      currentLength + 10
    );
    const followersPopulateToLoad = [];
    try {
      for (var id of followersIdToLoad) {
        const res = await backendWithoutAuth.get(`/users/${id}`);
        followersPopulateToLoad.push(res.data);
      }
    } catch (err) {
      catchError(err);
    }
    thisUserProfileDispatch(actions.addFollowers(followersPopulateToLoad));
    setLoading(false);
  };

  const UsersContent = () => {
    return (
      <div>
        <InfiniteScroll
          dataLength={thisUserProfileState.followers.length}
          next={loadFollowers}
          hasMore={
            thisUserProfileState.followers.length <
            thisUserDetailFollowers.length
          }
          height={400}
        >
          {thisUserProfileState.followers.map((follower) => (
            <UserCard
              user={follower}
              key={follower.id}
              classes={"userCard--white"}
            />
          ))}
          {loading && LoadingComponent.LoadingThisUserProfileRightPanel()}
        </InfiniteScroll>
      </div>
    );
  };

  return (
    <div>
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
    </div>
  );
}
