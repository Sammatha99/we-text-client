import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import "../../style/modals.css";

import { modalsName } from ".";
import {
  LoadingComponent,
  UserCardCheckbox,
  UserCard,
  InputSearch,
  catchError,
  swal,
} from "../utils";
import { constants } from "../../utils";
import { thisUserAction, thisUserDetailAction } from "../../features";
import { backendWithoutAuth, backendWithAuth } from "../../api/backend";

const paginateInit = { ...constants.paginateInit };

// TODO fix logic
export default function CreateContact() {
  const modalCheckboxRef = useRef();
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.thisUser.value.id);
  const contacts = useSelector(
    (state) => state.thisUserDetail.value && state.thisUserDetail.value.contacts
  );
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [paginate, setPaginate] = useState(null);

  const cleanUpModal = (e) => {
    e && e.preventDefault();
    setPaginate(null);
    setUsers([]);
    setSelectedUsers([]);
    modalCheckboxRef.current.checked = false;
  };

  const loadMoreUser = async (
    search = paginate.search,
    page = paginate.page
  ) => {
    try {
      const res = await backendWithoutAuth.get(
        `/users?search=${search}&page=${page}`
      );

      setUsers((prev) => [...prev, ...res.data.results]);
      setPaginate((prev) => ({
        search: search,
        page: prev.page + 1,
        totalPages: res.data.totalPages,
        totalResults: res.data.totalResults,
      }));
    } catch (err) {
      catchError(err);
    }
  };

  const handleSearchUsers = (search) => {
    setPaginate({ ...paginateInit, search: search });
    setUsers([]);
    loadMoreUser(search, 1);
  };

  const handleClearUsers = () => {
    setPaginate(null);
    setUsers([]);
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
            {paginate && (
              <InfiniteScroll
                scrollableTarget="modal__body__list--create-contact"
                dataLength={users.length}
                next={loadMoreUser}
                hasMore={users.length < paginate.totalResults}
                loader={
                  <LoadingComponent.LoadingContacts classes="userCard--white" />
                }
              >
                {users.map(
                  (user) =>
                    // hiện user chưa có trong contacts và khác mình (userId)
                    user.id !== userId && (
                      <UserCardCheckbox
                        disabled={contacts.includes(user.id)}
                        isChecked={
                          contacts.includes(user.id) ||
                          selectedUsers.includes(user.id)
                        }
                        key={user.id}
                        user={user}
                        classes="userCard--white"
                        handleCheckbox={handleCheckbox}
                      />
                    )
                )}
              </InfiniteScroll>
            )}
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
