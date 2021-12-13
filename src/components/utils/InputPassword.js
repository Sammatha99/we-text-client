import React, { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function InputPassword({
  id,
  register,
  name,
  placeholder,
  classes,
}) {
  const [showInputValue, setShowInputValue] = useState(false);

  const handelInputIconClick = () => {
    setShowInputValue((prevState) => !prevState);
  };

  return (
    <div className="input-icon">
      <input
        name={name}
        {...register}
        id={id}
        type={showInputValue ? "text" : "password"}
        placeholder={placeholder || "Enter your password"}
        className={clsx("input-icon__input", classes)}
      />
      <div
        onClick={handelInputIconClick}
        className="input-icon__icon--right input-icon__icon--link"
      >
        <Icon icon={showInputValue ? "eye-slash" : "eye"} />
      </div>
    </div>
  );
}
