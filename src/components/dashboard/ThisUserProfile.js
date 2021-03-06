import React, { useEffect, useState, useRef } from "react";
import clsx from "clsx";
import { useSelector, useDispatch } from "react-redux";

import { catchError, LoadingComponent, ErrorComponent } from "../utils";
import {
  AboutContent,
  FollowingsContent,
  FollowersContent,
  LeftPanelContent,
} from "./thisUserProfileContents";
import { constants } from "../../utils";
import { thisUserDetailAction } from "../../features";
import { backendWithoutAuth } from "../../api/backend";

import { ThisUserProfileStoreProvider } from "../../contextStore/thisUserProfile";

export default function ThisUserProfile() {
  const dispatch = useDispatch();
  const thisUser = useSelector((state) => state.thisUser.value);
  const thisUserDetail = useSelector((state) => state.thisUserDetail.value);
  const [loading, setLoading] = useState(true);
  const [selectedTab, setSelectedTab] = useState(null);

  const activeLine = useRef();
  const activeTab = useRef();

  useEffect(() => {
    async function getUserDetail() {
      if (thisUserDetail == null) {
        try {
          const res = await backendWithoutAuth.get(
            `/userDetails/${thisUser.id}`
          );
          dispatch(thisUserDetailAction.set(res.data));
        } catch (err) {
          catchError(err);
        }
      }
      setSelectedTab(0);
      setLoading(false);
    }
    getUserDetail();

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, thisUser.id]);

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
      <ThisUserProfileStoreProvider>
        <div className="thisUser--panel-right">
          <div className="thisUser__tabs">
            {constants.thisUserTabs.map((item, index) => (
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
      </ThisUserProfileStoreProvider>
    );
  };

  return (
    <div className="thisUserProfile content">
      {LeftPanelContent()}
      {loading
        ? LoadingComponent.LoadingThisUserProfileRightPanel()
        : thisUserDetail == null
        ? ErrorComponent.ThisUserProfileErrorPage()
        : ThisUserProfilePanelRight()}
    </div>
  );
}
