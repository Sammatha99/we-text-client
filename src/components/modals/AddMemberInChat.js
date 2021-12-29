import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import "../../style/modals.css";

import { modalsName } from ".";
import {
  InputSearch,
  LoadingComponent,
  UserCardCheckbox,
  EndNoDataComponent,
  catchError,
  swal,
} from "../utils";
import { constants, Paginate } from "../../utils";

import { thisUserAction } from "../../features";
import { backendWithAuth } from "../../api/backend";

export default function AddMemberInChat({ membersId, handleSubmitAdd }) {
  const modalCheckboxRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.thisUser.value.id);

  const [selectedUsers, setSelectedUsers] = useState([]);

  const children = function (o) {
    return (
      o.id !== userId && (
        <UserCardCheckbox
          disable={membersId.includes(o.id)}
          isChecked={membersId.includes(o.id) || selectedUsers.includes(o.id)}
          key={o.id}
          user={o}
          classes="userCard--white"
          handleCheckbox={handleCheckbox}
        />
      )
    );
  };

  const getLoadingComponent = () => (
    <LoadingComponent.LoadingContacts classes="userCard--white" />
  );

  const { ComponentScroll, handleSearch, handleClearState } = Paginate.Users(
    children,
    userId,
    constants.searchType.CONTACTS
  );

  const cleanUpModal = (e) => {
    e && e.preventDefault();
    handleClearState();
    setSelectedUsers([]);
    modalCheckboxRef.current.checked = false;
  };

  const handleSearchUsers = (search) => {
    handleSearch(search);
  };

  const handleClearUsers = () => {
    handleClearState();
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
    // truyền về cho trang chat info add member vào
    handleSubmitAdd(selectedUsers);
    cleanUpModal();
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
        onClick={cleanUpModal}
        id={`${modalsName.addMemberInchat}__label`}
        className="modal-overlay center"
      ></label>
      <div
        className="modal-wrapper"
        id={`${modalsName.addMemberInchat}__modal`}
      >
        <div className="modal__header">
          Add members
          <label onClick={cleanUpModal} className="modal__close-icon">
            <Icon icon="times" />
          </label>
        </div>
        <div className="modal__body">
          <InputSearch handleSearch={handleSearchUsers} />

          <div
            id="modal__body__list--add-members-chat"
            className="modal__body__list"
          >
            <ComponentScroll
              scrollThreshold={0.7}
              target={"modal__body__list--add-members-chat"}
              loader={getLoadingComponent}
              endMessage={EndNoDataComponent.EndNoDataLight}
            />
          </div>
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
