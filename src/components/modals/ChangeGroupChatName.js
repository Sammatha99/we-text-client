import React, { useState, useRef } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import { swal, catchError } from "../utils";
import { utilFunction } from "../../utils";

import { chatroomsAction, thisUserAction } from "../../features";
import { backendWithAuth } from "../../api/backend";

export default function ChangeGroupChatName() {
  const chatroomName = useSelector(
    (state) => state.chatrooms.value.selectedChatroom.name
  );
  const chatroomId = useSelector(
    (state) => state.chatrooms.value.selectedChatroom.id
  );
  const userId = useSelector((state) => state.thisUser.value.id);
  const dispatch = useDispatch();
  const inputRef = useRef();
  const [open, setOpen] = useState(false);

  const handleKeyDown = (e) => {
    // Get the code of pressed key
    const keyCode = e.which || e.keyCode;

    // 13 represents the Enter key
    if (keyCode === 13) {
      e.preventDefault();
      handleChangeGroupChatName();
    }
  };

  const handleCloseModal = (e) => {
    e.preventDefault();
    setOpen(false);
  };

  const handleChangeGroupChatName = async () => {
    const newName = inputRef.current.value.trim();

    if (newName !== chatroomName)
      try {
        swal.showLoadingSwal();
        const axios = await backendWithAuth();
        if (axios) {
          const res = await axios.patch(`/chatrooms/${chatroomId}`, {
            userId,
            name: newName,
          });
          Object.assign(
            res.data,
            utilFunction.formatChatroom(res.data, userId)
          );
          dispatch(chatroomsAction.updateChatroom(res.data));
          dispatch(chatroomsAction.unshiftChatroom(res.data));
          swal.closeSwal();
          swal.showSuccessSwal();
        } else {
          dispatch(thisUserAction.logout());
          swal.closeSwal();
        }
      } catch (err) {
        catchError(err);
      }
    setOpen(false);
  };

  const ChangeGroupChatNameModal = () =>
    open ? (
      <div>
        <label
          onClick={handleCloseModal}
          className="modal-overlay center"
        ></label>
        <div className="modal-wrapper modal-wrapper--small">
          <div className="modal__header">
            Change group name
            <button onClick={handleCloseModal} className="modal__close-icon">
              <Icon icon="times" />
            </button>
          </div>
          <div className="modal__body">
            <input
              ref={inputRef}
              placeholder="Chatroom name"
              type="text"
              onKeyDown={handleKeyDown}
              defaultValue={chatroomName}
            />
          </div>
          <div className="modal__footer modal__footer--btn-wrap">
            <button onClick={handleCloseModal} className="btn btn--medium">
              Cancle
            </button>
            <button
              className="btn btn--medium btn--primary"
              onClick={handleChangeGroupChatName}
            >
              Create
            </button>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );

  return {
    setOpenChangeGroupNameModal: setOpen,
    ChangeGroupChatNameModal,
  };
}
