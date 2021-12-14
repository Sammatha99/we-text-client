import React, { useRef, useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import clsx from "clsx";

import { tabs } from "../../utils/constants";

import "../../style/sidebar.css";

import { thisUserData } from "../../utils/fakeData";

// get from redux store
const userData = { ...thisUserData };

export default function Sidebar({
  setSelectedTab,
  selectedTab,
  setSelectedChatroom,
}) {
  const activeLine = useRef();
  const activeTab = useRef();

  useEffect(() => {
    const active = activeTab.current;
    if (active) {
      activeLine.current.style.height = active.offsetHeight + "px";
      activeLine.current.style.top = active.offsetTop + "px";
    }
    return () => {};
  }, [selectedTab]);

  const onClickTab = (name) => {
    if (name === "profile") {
      setSelectedChatroom(null);
    }
    setSelectedTab(name);
  };

  const onShutDown = () => {
    console.log("log out and out to login page");
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
              "user-active-dots": userData.status,
            }
          )}
        >
          <img src={userData.avatar} alt="user avatar" />
        </div>
        <p className="sidebar__user-name">{userData.name}</p>
      </div>
      <div className="sidebar__tabs">
        {tabs.map((tab, index) => (
          <div
            key={index}
            className={clsx("sidebar__tab-item", "center", {
              "sidebar__tab-item--active": index === selectedTab,
            })}
            ref={tab.name === selectedTab ? activeTab : null}
            onClick={() => onClickTab(tab.name)}
          >
            <Icon className="sidebar__tab-icon" icon={tab.icon} />
            {tab.name}
          </div>
        ))}
        <div ref={activeLine} className="sidebar__active-line"></div>
      </div>
      <div
        className="sidebar__logout sidebar__tab-item center"
        onClick={onShutDown}
      >
        <Icon className="sidebar__tab-icon" icon="power-off" />
        Log out
      </div>
    </div>
  );
}
