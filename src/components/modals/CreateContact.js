import React, { useRef, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import "../../style/modals.css";

import { modalsName } from ".";
import {
  LoadingComponent,
  UserCardCheckbox,
  InputSearch,
  catchError,
  swal,
} from "../utils";
import { Paginate } from "../../utils";
import { thisUserAction, thisUserDetailAction } from "../../features";
import { backendWithAuth } from "../../api/backend";

// TODO fix logic
export default function CreateContact() {
  const modalCheckboxRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.thisUser.value.id);
  const contacts = useSelector(
    (state) => state.thisUserDetail.value && state.thisUserDetail.value.contacts
  );
  const [selectedUsers, setSelectedUsers] = useState([]);

  const children = function (o) {
    return (
      o.id !== userId && (
        <UserCardCheckbox
          disabled={contacts.includes(o.id)}
          isChecked={contacts.includes(o.id) || selectedUsers.includes(o.id)}
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

  const { ComponentScroll, handleSearch, handleClearState } = Paginate(
    children,
    getLoadingComponent
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

  const handleSubmit = async () => {
    swal.showLoadingSwal();
    try {
      const axios = await backendWithAuth();
      if (axios != null) {
        const newContacts = [];
        for (var user of selectedUsers) {
          await axios.patch(`/userDetails/${userId}/add-contact`, {
            userId: user,
          });
          newContacts.push(user);
        }
        dispatch(thisUserDetailAction.addListContacts(newContacts));
        swal.closeSwal();
        swal.showSuccessSwal();
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      swal.closeSwal();
      catchError(err);
    }
    cleanUpModal();
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
        onClick={cleanUpModal}
        id={`${modalsName.createContactModal}__label`}
        className="modal-overlay center"
      ></label>
      <div
        className="modal-wrapper"
        id={`${modalsName.createContactModal}__modal`}
      >
        <div className="modal__header">
          Create contacts
          <label onClick={cleanUpModal} className="modal__close-icon">
            <Icon icon="times" />
          </label>
        </div>
        <div className="modal__body">
          <InputSearch
            handleSearch={handleSearchUsers}
            handleClear={handleClearUsers}
          />

          <div
            id="modal__body__list--create-contact"
            className="modal__body__list"
          >
            <ComponentScroll target={"modal__body__list--create-contact"} />
          </div>
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
