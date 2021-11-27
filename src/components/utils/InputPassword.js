import React, { useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function InputPassword({ id, register, name }) {
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
        placeholder="Enter your password"
        className="input-icon__input"
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
