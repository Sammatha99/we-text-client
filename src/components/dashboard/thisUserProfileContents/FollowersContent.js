import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import {
  UserCard,
  LoadingComponent,
  catchError,
  InputSearch,
} from "../../utils";
import { backendWithoutAuth } from "../../../api/backend";

import { useStore, actions } from "../../../contextStore/thisUserProfile";

export default function FollowersContent() {
  const [thisUserProfileState, thisUserProfileDispatch] = useStore();

  const thisUserDetailFollowers = useSelector(
    (state) => state.thisUserDetail.value.followers
  );
  const [searchFollowers, setSearchFollowers] = useState(null);
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
    // setLoading(true);
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
    // setLoading(false);
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
          loader={<LoadingComponent.LoadingThisUserProfileRightPanel />}
        >
          {thisUserProfileState.followers.map((follower) => (
            <UserCard
              user={follower}
              key={follower.id}
              classes={"userCard--white"}
            />
          ))}
          {/* {loading && LoadingComponent.LoadingThisUserProfileRightPanel()} */}
        </InfiniteScroll>
      </div>
    );
  };

  const handleSearchFollowers = (str) => {
    // backend
    console.log(str, ": search users in followers");
  };

  return (
    <div>
      <InputSearch handleSearch={handleSearchFollowers} />
      {UsersContent()}
    </div>
  );
}
