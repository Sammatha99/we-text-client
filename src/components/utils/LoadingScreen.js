import React from "react";
import { UserCard, ChatCard } from ".";

const listNumber = [0, 1, 2, 3];

const LoadingContacts = () => {
  return listNumber.map((index) => <UserCard key={index} />);
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

export { LoadingContacts, LoadingChats, LoadingRightPanel };
