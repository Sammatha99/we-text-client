import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingComponent, UserCardCheckbox } from "../utils";
import { modalsName } from ".";
import "../../style/modals.css";

import { thisUserDetailData } from "../../utils/fakeData";

export default function CreateChatModal() {
  const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [selectedContacts, setSelectedContacts] = useState([]);
  const modalCheckboxRef = useRef();

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
    console.log(selectedContacts);
    console.log(modalCheckboxRef);
    modalCheckboxRef.current.checked = false;
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
        id={`${modalsName.createChatModal}__modal`}
        className="modal-overlay center"
      >
        <div className="modal-wrapper">
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
            <div className="input-icon  input-icon--search">
              <input className="input-icon__input" placeholder="Search here" />
              <div className="input-icon__icon--right input-icon__icon--link">
                <Icon icon="search" />
              </div>
              <div className="input-icon__icon--right input-icon__icon--link input-icon__icon--clear">
                <Icon icon="times-circle" />
              </div>
            </div>
            {loading ? (
              <LoadingComponent.LoadingContacts classes="userCard--white" />
            ) : (
              <div className="modal__body__contacts">
                {contacts.map((user) => (
                  <UserCardCheckbox
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
      </label>
    </div>
  );
}
