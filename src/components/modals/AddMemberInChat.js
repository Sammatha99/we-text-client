import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import "../../style/modals.css";

import { modalsName } from ".";
import { InputSearch, LoadingComponent, UserCardCheckbox } from "../utils";

import { thisUserDetailData } from "../../utils/fakeData";

export default function AddMemberInChat({ membersId, handleSubmitAdd }) {
  const modalCheckboxRef = useRef();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  // TODO 1.3 add member to chat infinite scroll

  useEffect(() => {
    // không lấy những đứa đã có trong members list r
    const getContacts = [...thisUserDetailData.contactsPopulate].filter(
      (contact) => !membersId.includes(contact.id)
    );
    setContacts(getContacts);
    setLoading(false);
    return () => {};
  }, [membersId]);

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
    // truyền về cho trang chat info add member vào
    handleSubmitAdd(selectedUsers);
    modalCheckboxRef.current.checked = false;
  };

  const handleSearchUsers = (str) => {
    console.log(str, ": search users in contacts");
  };

  return (
    <div>
      <input
        ref={modalCheckboxRef}
        type="checkbox"
        id={modalsName.addMemberInchat}
        hidden
      />
      <label
        htmlFor={modalsName.addMemberInchat}
        id={`${modalsName.addMemberInchat}__label`}
        className="modal-overlay center"
      ></label>
      <div
        className="modal-wrapper"
        id={`${modalsName.addMemberInchat}__modal`}
      >
        <div className="modal__header">
          Add members
          <label
            htmlFor={modalsName.addMemberInchat}
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
              {contacts.map((user) => (
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
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
