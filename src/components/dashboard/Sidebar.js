import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import "../../style/sidebar.css";

import { constants, localStorage } from "../../utils";
import {
  thisUserAction,
  featuresAction,
  chatroomsAction,
} from "../../features";
import { backendWithoutAuth } from "../../api/backend";

export default function Sidebar({ setSelectedTab, selectedTab }) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const thisUser = useSelector((state) => state.thisUser.value);
  const activeLine = useRef();
  const activeTab = useRef();

  useEffect(() => {
    if (selectedTab) {
      const active = activeTab.current;
      if (active) {
        activeLine.current.style.height = active.offsetHeight + "px";
        activeLine.current.style.top = active.offsetTop + "px";
      }
      navigate(`/${selectedTab}`);
    } else {
      activeLine.current.style.height = "0";
      activeLine.current.style.top = "0";
    }

    return () => {};
  }, [navigate, selectedTab]);

  const handleChangeTab = (name) => {
    if (name === "profile") {
      dispatch(featuresAction.setSelectedChatroom(false));
      dispatch(chatroomsAction.setSelectedChatroomById());
    }
    setSelectedTab(name);
  };

  const handleLogout = async () => {
    await backendWithoutAuth.post("/auth/logout", {
      refreshToken: localStorage.rfTokenStorage.get().token,
    });
    localStorage.storage.removeAll();
    dispatch(thisUserAction.logout());
  };

  return (
    <div className="sidebar">
      <label className="sidebar__icon-wrapper" htmlFor="checkbox-sidebar">
        <Icon
          icon="chevron-right"
          className="sidebar__icon sidebar__icon--close"
        />
        <Icon
          icon="chevron-left"
          className="sidebar__icon sidebar__icon--open"
        />
      </label>

      <div className="sidebar__user-wrapper center">
        <div
          className={clsx(
            "sidebar__avatar-wrapper",
            "avatar",
            "avatar--big",
            "center",
            {
              "user-active-dots": thisUser.status,
            }
          )}
        >
          <img src={thisUser.avatar} alt="user avatar" />
        </div>
        <p className="sidebar__user-name">{thisUser.name}</p>
      </div>
      <div className="sidebar__tabs">
        {constants.tabs.map((tab, index) => (
          <div
            key={index}
            className={clsx("sidebar__tab-item", "center", {
              "sidebar__tab-item--active": index === selectedTab,
            })}
            ref={tab.name === selectedTab ? activeTab : null}
            onClick={() => handleChangeTab(tab.name)}
          >
            <Icon className="sidebar__tab-icon" icon={tab.icon} />
            {tab.name}
          </div>
        ))}
        <div ref={activeLine} className="sidebar__active-line"></div>
      </div>
      <div
        className="sidebar__logout sidebar__tab-item center"
        onClick={handleLogout}
      >
        <Icon className="sidebar__tab-icon" icon="power-off" />
        Log out
      </div>
    </div>
  );
}
