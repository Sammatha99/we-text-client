import React from "react";

import { UserCard, ChatCard } from ".";
import { list4 } from "../../utils/constants";

const LoadingContacts = ({ classes }) => {
  return list4.map((index) => <UserCard classes={classes} key={index} />);
};

const LoadingChats = () => {
  return list4.map((index) => <ChatCard key={index} />);
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
      {list4.map((index) => (
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
    {list4.map((index) => (
      <div key={index} className="chatInfo-menu-item loading--right-panel">
        <p className="loading">.</p>
      </div>
    ))}
  </div>
);

const LoadingOTPVerifyEmail = () => (
  <label className="auth-form__label loading" htmlFor="verify-email-otp">
    .
  </label>
);

// TODO 1 create UI loading app
const LoadingApp = () => <>loading App</>;

export {
  LoadingContacts,
  LoadingChats,
  LoadingRightPanel,
  LoadingThisUserProfileLeftPanel,
  LoadingThisUserProfileRightPanel,
  LoadingOTPVerifyEmail,
  LoadingApp,
};
