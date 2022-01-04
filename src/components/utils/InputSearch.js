import React, { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

export default function InputSearch({ handleSearch, handleClear, classes }) {
  const [str, setStr] = useState("");

  const onChange = (e) => {
    setStr(e.target.value);
  };

  const handleSearchKeyDown = (e) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13) {
      e.preventDefault();
      _handleSearch();
    }
  };

  const _handleClear = () => {
    setStr("");
    handleClear && handleClear();
  };

  const _handleSearch = () => {
    if (str.trim() !== "") handleSearch(str);
    else {
      handleClear && handleClear();
    }
  };

  return (
    <div className={clsx("input-icon  input-icon--search", classes)}>
      <input
        className="input-icon__input"
        placeholder="Search here"
        type="text"
        onKeyDown={handleSearchKeyDown}
        onChange={onChange}
        value={str}
      />
      <div className="input-icon__icon--right">
        <span onClick={_handleSearch}>
          <Icon className="input-icon__icon--link" icon="search" />
        </span>
        <span hidden={str === ""} onClick={_handleClear}>
          <Icon
            className="input-icon__icon--link input-icon__icon--clear"
            icon="times-circle"
          />
        </span>
      </div>
    </div>
  );
}
