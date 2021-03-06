import React from "react";
import clsx from "clsx";

export default function UserCardCheckbox({
  user,
  classes,
  handleCheckbox,
  isChecked,
  disabled = false,
}) {
  const handleCheckboxClick = (e) => {
    handleCheckbox(user, e.target.checked);
  };

  if (user)
    return (
      <label
        className={clsx("userCard userCard--checkbox", classes, {
          "useCard--checkbox--disabled": disabled,
        })}
      >
        <div
          className={clsx("avatar", "avatar--small", "center", {
            "user-active-dots": user.status,
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
        <input
          disabled={disabled}
          checked={isChecked}
          id={`${user.id}_userCardCheckbox`}
          type="checkbox"
          onChange={handleCheckboxClick}
          className="userCard__options-wrapper userCard__options-wrapper--checkbox "
        />
      </label>
    );
  else
    return (
      <div className={clsx("userCard", classes)}>
        <div className="avatar avatar--small center loading"></div>
        <div className="userCard__content">
          <p className="userCard__name loading">.</p>
        </div>
      </div>
    );
}
