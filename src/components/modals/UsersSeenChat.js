import React from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import "../../style/modals.css";

import { UserCard } from "../utils";

export default function UsersSeenChat({ usersSeen, showModal, setShowModal }) {
  return showModal ? (
    <>
      <label
        onClick={() => setShowModal((prev) => !prev)}
        className="modal-overlay center"
      ></label>
      <div className="modal-wrapper">
        <div className="modal__header">
          Message seen by
          <label
            onClick={() => setShowModal((prev) => !prev)}
            className="modal__close-icon"
          >
            <Icon icon="times" />
          </label>
        </div>
        <div className="modal__body">
          {usersSeen.map((user) => (
            <UserCard key={user.id} user={user} classes="userCard--white" />
          ))}
        </div>
      </div>
    </>
  ) : (
    <></>
  );
}
