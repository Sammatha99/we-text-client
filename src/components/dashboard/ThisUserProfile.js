import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import "../../style/thisUserProfile.css";
import { LoadingComponent } from "../utils";
import {
  AboutContent,
  FollowingsContent,
  FollowersContent,
} from "./thisUserProfileContents";
import { thisUserData, thisUserDetailData } from "../../utils/fakeData";

const thisUserTabs = ["about", "followings", "followers"];

export default function ThisUserProfile() {
  const [user, setUser] = useState(null);
  const [userDetail, setUserDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(null);

  const activeLine = useRef();
  const activeTab = useRef();

  useEffect(() => {
    const getUser = JSON.parse(JSON.stringify(thisUserData));
    const getUserDetail = JSON.parse(JSON.stringify(thisUserDetailData));
    setUser(getUser);
    setUserDetail(getUserDetail);
    setSelectedTab(0);
    setLoading(false);

    return () => {};
  }, []);

  useEffect(() => {
    const active = activeTab.current;
    if (active) {
      activeLine.current.style.width = active.offsetWidth + "px";
      activeLine.current.style.left = active.offsetLeft + "px";
    }
    return () => {};
  }, [selectedTab]);

  const handleClickTab = (index) => {
    if (index !== selectedTab) {
      setSelectedTab(index);
    }
  };

  const OpenTab = () => {
    switch (selectedTab) {
      case 0:
        return (
          <div key={`thisUser__tab${0}`} className="thisUser__tab-content">
            <AboutContent />
          </div>
        );
      case 1:
        return (
          <div key={`thisUser__tab${1}`} className="thisUser__tab-content">
            <FollowingsContent />
          </div>
        );
      case 2:
        return (
          <div key={`thisUser__tab${2}`} className="thisUser__tab-content">
            <FollowersContent />
          </div>
        );
      default:
        return <></>;
    }
  };

  const ThisUserProfilePanelLeft = () => {
    return (
      <div className="thisUser--panel-left">
        <div className="avatar avatar--big">
          <img src={user.avatar} alt={user.name} />
          <div className="thisUser__camera-icon center">
            <Icon icon="camera" />
          </div>
        </div>
        <div className="text--medium text--center">{user.name}</div>
        <div className="thisUser__email">
          <Icon icon="envelope" />
          <p>{user.email}</p>
        </div>
        <button className="btn btn--primary btn--medium">Update info</button>
      </div>
    );
  };

  const ThisUserProfilePanelRight = () => {
    return (
      <div className="thisUser--panel-right">
        <div className="thisUser__tabs">
          {thisUserTabs.map((item, index) => (
            <div
              key={index}
              ref={index === selectedTab ? activeTab : null}
              onClick={() => handleClickTab(index)}
              className={clsx("thisUser__tab", {
                "thisUser__tab--active": index === selectedTab,
              })}
            >
              {item}
            </div>
          ))}
          <div ref={activeLine} className="thisUser__active-line"></div>
        </div>
        {OpenTab()}
      </div>
    );
  };

  const ThisUserProfileContent = () => {
    return (
      <>
        {ThisUserProfilePanelLeft()}
        {ThisUserProfilePanelRight()}
      </>
    );
  };

  return (
    <div className="thisUserProfile content">
      {loading
        ? LoadingComponent.LoadingThisUserProfile()
        : ThisUserProfileContent()}
    </div>
  );
}
