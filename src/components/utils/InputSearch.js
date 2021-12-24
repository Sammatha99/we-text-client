import React, { useState } from "react";
import clsx from "clsx";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

// TODO 1 build search input
export default function InputSearch({ handleSearch, classes }) {
  const [str, setStr] = useState("");

  const handleClear = () => {};
  const _handleSearch = () => {
    handleSearch(str);
  };

  return (
    <div className={clsx("input-icon  input-icon--search", classes)}>
      <input className="input-icon__input" placeholder="Search here" />
      <div className="input-icon__icon--right">
        <Icon
          onClick={_handleSearch}
          className="input-icon__icon--link"
          icon="search"
        />
        <Icon
          onClick={handleClear}
          className="input-icon__icon--link input-icon__icon--clear"
          icon="times-circle"
        />
      </div>
    </div>
  );
}
