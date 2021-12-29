import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import {
  UserCard,
  LoadingComponent,
  catchError,
  InputSearch,
  EndNoDataComponent,
} from "../../utils";
import { constants, Paginate } from "../../../utils";
import { backendWithoutAuth } from "../../../api/backend";
import { useStore, actions } from "../../../contextStore/thisUserProfile";

export default function FollowersContent() {
  const [thisUserProfileState, thisUserProfileDispatch] = useStore();
  const userId = useSelector((state) => state.thisUser.value.id);
  const thisUserDetailFollowers = useSelector(
    (state) => state.thisUserDetail.value.followers
  );

  const [isSearch, setIsSearch] = useState(false);

  const children = (o) => {
    return (
      <UserCard
        user={o}
        key={o.id}
        classes={
          !thisUserDetailFollowers.includes(o.id)
            ? "userCard--disabled userCard--white"
            : "userCard--white"
        }
      />
    );
  };

  const { ComponentScroll, handleSearch, handleClearState } = Paginate.Users(
    children,
    userId,
    constants.searchType.FOLLOWERS,
    thisUserDetailFollowers
  );

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
  };

  const UsersContent = () => {
    if (!isSearch) {
      return (
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
          {thisUserProfileState.followers.map((follower) => children(follower))}
        </InfiniteScroll>
      );
    } else {
      return (
        <div>
          <ComponentScroll
            height={400}
            loader={LoadingComponent.LoadingThisUserProfileRightPanel}
            endMessage={EndNoDataComponent.EndNoDataLight}
          />
        </div>
      );
    }
  };

  const handleSearchFollowers = (str) => {
    setIsSearch(true);
    handleSearch(str);
  };

  const handleClear = () => {
    handleClearState();
    setIsSearch(false);
  };

  return (
    <div>
      <InputSearch
        handleSearch={handleSearchFollowers}
        handleClear={handleClear}
      />
      {UsersContent()}
    </div>
  );
}
