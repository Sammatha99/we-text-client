import React, { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function UserCard({ user }) {
  const [status, setSatus] = useState(user && user.status);

  if (user)
    return (
      <div className="userCard">
        <div
          className={clsx("avatar", "avatar--small", "center", {
            "user-active-dots": status,
          })}
        >
          <img
            className="avatar"
            src={user.avatar}
            alt={`${user.name} avatar`}
          />
        </div>
        <div className="userCard__content">
          <p className="userCard__name">{user.name}</p>
        </div>
        <div className="userCard__options-wrapper">
          <Icon icon="ellipsis-h" />
        </div>
      </div>
    );
  else
    return (
      <div className="userCard">
        <div className="avatar avatar--small center loading"></div>
        <div className="userCard__content">
          <p className="userCard__name loading">.</p>
        </div>
      </div>
    );
}
