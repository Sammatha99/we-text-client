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

export default function FollowingsContent() {
  const [thisUserProfileState, thisUserProfileDispatch] = useStore();
  const userId = useSelector((state) => state.thisUser.value.id);
  const thisUserDetailFollowings = useSelector(
    (state) => state.thisUserDetail.value.followings
  );

  const [isSearch, setIsSearch] = useState(false);

  const children = (o) => {
    return (
      <UserCard
        user={o}
        key={o.id}
        classes={
          !thisUserDetailFollowings.includes(o.id)
            ? "userCard--disabled userCard--white"
            : "userCard--white"
        }
      />
    );
  };

  const { ComponentScroll, handleSearch, handleClearState } = Paginate(
    children,
    userId,
    constants.searchType.FOLLOWINGS,
    thisUserDetailFollowings
  );

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
  };

  const UsersContent = () => {
    if (!isSearch) {
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
            loader={<LoadingComponent.LoadingThisUserProfileRightPanel />}
          >
            {thisUserProfileState.followings.map((following) =>
              children(following)
            )}
          </InfiniteScroll>
        </div>
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

  const handleSearchFollowings = (str) => {
    setIsSearch(true);
    handleSearch(str);
  };

  const handleClear = () => {
    handleClearState();
    setIsSearch(false);
  };

  return (
    <>
      <InputSearch
        handleSearch={handleSearchFollowings}
        handleClear={handleClear}
      />
      {UsersContent()}
    </>
  );
}
