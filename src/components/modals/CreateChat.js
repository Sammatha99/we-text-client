import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import "../../style/modals.css";

import { modalsName } from ".";
import { InputSearch, LoadingComponent, UserCardCheckbox } from "../utils";

import { thisUserDetailData } from "../../utils/fakeData";

export default function CreateChatModal() {
  const modalCheckboxRef = useRef();
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  // TODO 1.4 create chat infinite scroll

  useEffect(() => {
    const getContacts = [...thisUserDetailData.contactsPopulate];
    setContacts(getContacts);
    setLoading(false);
    return () => {};
  }, []);

  const handleCheckbox = (user, isChecked) => {
    if (isChecked) {
      setSelectedContacts((prev) => {
        if (!prev.includes(user.id)) {
          return [...prev, user.id];
        }
      });
    } else {
      setSelectedContacts((prev) => {
        return prev.filter((id) => id !== user.id);
      });
    }
  };

  const handleSubmit = () => {
    // tạo chat và route vào chat mới
    console.log(selectedContacts);
    modalCheckboxRef.current.checked = false;
  };

  const handleSearchContacts = (str) => {
    console.log(str, ": search users in contacts");
  };

  return (
    <div>
      <input
        ref={modalCheckboxRef}
        type="checkbox"
        id={modalsName.createChatModal}
        hidden
      />
      <label
        htmlFor={modalsName.createChatModal}
        id={`${modalsName.createChatModal}__label`}
        className="modal-overlay center"
      ></label>
      <div
        className="modal-wrapper"
        id={`${modalsName.createChatModal}__modal`}
      >
        <div className="modal__header">
          Create chat
          <label
            htmlFor={modalsName.createChatModal}
            className="modal__close-icon"
          >
            <Icon icon="times" />
          </label>
        </div>
        <div className="modal__body">
          <InputSearch handleSearch={handleSearchContacts} />
          {loading ? (
            <LoadingComponent.LoadingContacts classes="userCard--white" />
          ) : (
            <div className="modal__body__list">
              {contacts.map((user) => (
                <UserCardCheckbox
                  isChecked={selectedContacts.includes(user.id)}
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
