import React, { useRef, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import "../../style/modals.css";

import { modalsName } from ".";
import { LoadingComponent, UserCardCheckbox, InputSearch } from "../utils";

import { usersData } from "../../utils/fakeData";

export default function CreateContact() {
  const modalCheckboxRef = useRef();
  const inputRef = useRef();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSearchUsers = (search) => {
    setLoading(true);
    // TODO 2 search user
    console.log(search);
    // call backend get data, is in backend have this feature ?

    setUsers(usersData);
    setLoading(false);
  };

  const handleCheckbox = (user, isChecked) => {
    if (isChecked) {
      setSelectedUsers((prev) => {
        if (!prev.includes(user.id)) {
          return [...prev, user.id];
        }
      });
    } else {
      setSelectedUsers((prev) => {
        return prev.filter((id) => id !== user.id);
      });
    }
  };

  const handleSubmit = () => {
    // tạo chat và route vào chat mới
    console.log(selectedUsers);
    modalCheckboxRef.current.checked = false;
  };

  return (
    <div>
      <input
        ref={modalCheckboxRef}
        type="checkbox"
        id={modalsName.createContactModal}
        hidden
      />
      <label
        htmlFor={modalsName.createContactModal}
        id={`${modalsName.createContactModal}__label`}
        className="modal-overlay center"
      ></label>
      <div
        className="modal-wrapper"
        id={`${modalsName.createContactModal}__modal`}
      >
        <div className="modal__header">
          Create contacts
          <label
            htmlFor={modalsName.createContactModal}
            className="modal__close-icon"
          >
            <Icon icon="times" />
          </label>
        </div>
        <div className="modal__body">
          <InputSearch handleSearch={handleSearchUsers} />

          {loading ? (
            <LoadingComponent.LoadingContacts classes="userCard--white" />
          ) : (
            <div className="modal__body__list">
              {users.map((user) => (
                <UserCardCheckbox
                  isChecked={selectedUsers.includes(user.id)}
                  key={user.id}
                  user={user}
                  classes="userCard--white"
                  handleCheckbox={handleCheckbox}
                />
              ))}
            </div>
          )}
        </div>
        <div className="modal__footer">
          <button
            onClick={handleSubmit}
            className="btn btn--primary btn--medium"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
