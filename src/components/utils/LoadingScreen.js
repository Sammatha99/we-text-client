import React from "react";
import { UserCard, ChatCard } from ".";

const listNumber = [0, 1, 2, 3];

const LoadingContacts = ({ classes }) => {
  return listNumber.map((index) => <UserCard classes={classes} key={index} />);
};

const LoadingChats = () => {
  return listNumber.map((index) => <ChatCard key={index} />);
};

const LoadingRightPanel = () => {
  return (
    <>
      <div className="chatInfo-header-wrapper center">
        <div className="avatar avatar--medium center loading"></div>
        <div className="text--medium-2 text--center chatInfo__room-name loading--right-panel loading">
          .
        </div>
      </div>
      {listNumber.map((item, index) => (
        <div key={index} className="chatInfo-menu-item loading--right-panel">
          <p className="loading">.</p>
        </div>
      ))}
    </>
  );
};

const LoadingThisUserProfileLeftPanel = () => (
  <div className="thisUser--panel-left">
    <div className="avatar avatar--big loading"></div>
    <div className="text--medium text--center loading">.</div>
    <div className="thisUser__email loading">.</div>
  </div>
);

const LoadingThisUserProfileRightPanel = () => (
  <div className="thisUser--panel-right thisUser--panel-right--loading">
    {listNumber.map((item, index) => (
      <div key={index} className="chatInfo-menu-item loading--right-panel">
        <p className="loading">.</p>
      </div>
    ))}
  </div>
);

export {
  LoadingContacts,
  LoadingChats,
  LoadingRightPanel,
  LoadingThisUserProfileLeftPanel,
  LoadingThisUserProfileRightPanel,
};
