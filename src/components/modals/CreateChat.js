import React, { useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import { modalsName } from ".";
import {
  InputSearch,
  LoadingComponent,
  UserCardCheckbox,
  catchError,
  swal,
  EndNoDataComponent,
} from "../utils";
import { constants, Paginate } from "../../utils";

import { chatroomsAction, thisUserAction } from "../../features";
import { backendWithAuth } from "../../api/backend";
import { socket } from "../../Global";

export default function CreateChatModal() {
  const modalCheckboxRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.thisUser.value.id);
  const [selectedUsers, setSelectedUsers] = useState([]);

  const children = function (o) {
    return (
      o.id !== userId && (
        <UserCardCheckbox
          isChecked={selectedUsers.includes(o.id)}
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

  const handleSubmit = async () => {
    swal.showLoadingSwal();
    try {
      const dataToSend = {
        members: [...selectedUsers, userId],
        isGroupChat: selectedUsers.length > 1,
      };
      const axios = await backendWithAuth();
      if (axios) {
        const res = await axios.post("/chatrooms", dataToSend);
        const messageDataToSend = {
          text: "created this chatroom",
          type: constants.messagesType.NOTIFY,
          sender: userId,
          chatroomId: res.data.id,
          time: Date.now(),
        };
        await axios.post("/messages", messageDataToSend);

        if (!res.data.isExist) {
          // ch??a t???n t???i
          socket.emit(
            "create-chatroom",
            userId,
            res.data.id,
            dataToSend.members
          );

          swal.closeSwal();
          swal.showSuccessSwal();
        } else {
          // ???? t???n t???i
          dispatch(chatroomsAction.setSelectedChatroomById(res.data.id));
          swal.closeSwal();
        }
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      catchError(err);
    }
    cleanUpModal();
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
        onClick={cleanUpModal}
        id={`${modalsName.createChatModal}__label`}
        className="modal-overlay center"
      ></label>
      <div
        className="modal-wrapper"
        id={`${modalsName.createChatModal}__modal`}
      >
        <div className="modal__header">
          Create chat
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
            id="modal__body__list--create-chat"
            className="modal__body__list"
          >
            <ComponentScroll
              scrollThreshold={0.7}
              target={"modal__body__list--create-chat"}
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
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
