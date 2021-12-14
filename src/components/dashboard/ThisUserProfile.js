import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";

import "../../style/thisUserProfile.css";
import { LoadingComponent } from "../utils";
import {
  AboutContent,
  FollowingsContent,
  FollowersContent,
  LeftPanelContent,
} from "./thisUserProfileContents";
import { thisUserDetailData } from "../../utils/fakeData";

const thisUserTabs = ["about", "followings", "followers"];

export default function ThisUserProfile() {
  const [userDetail, setUserDetail] = useState(null);
  const [selectedTab, setSelectedTab] = useState(null);

  const activeLine = useRef();
  const activeTab = useRef();

  useEffect(() => {
    const getUserDetail = JSON.parse(JSON.stringify(thisUserDetailData));
    setUserDetail(getUserDetail);
    setSelectedTab(0);

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

  return (
    <div className="thisUserProfile content">
      {LeftPanelContent()}
      {userDetail == null
        ? LoadingComponent.LoadingThisUserProfileRightPanel()
        : ThisUserProfilePanelRight()}
    </div>
  );
}
