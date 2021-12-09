import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { UserCard } from "../../utils";

import { thisUserDetailData } from "../../../utils/fakeData";

export default function FollowingsContent() {
  const [followings, setFollowings] = useState([]);

  useEffect(() => {
    const getFollowings = [...thisUserDetailData.followingsPopulate];
    setFollowings(getFollowings);
    return () => {};
  }, []);

  return (
    <div>
      <div className="input-icon  input-icon--search">
        <input className="input-icon__input" placeholder="Search here" />
        <div className="input-icon__icon--right input-icon__icon--link">
          <Icon icon="search" />
        </div>
        <div className="input-icon__icon--right input-icon__icon--link input-icon__icon--clear">
          <Icon icon="times-circle" />
        </div>
      </div>
      <div>
        {followings.map((following) => (
          <UserCard
            user={following}
            key={following.id}
            classes={"userCard--white"}
          />
        ))}
      </div>
    </div>
  );
}
