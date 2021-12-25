import React, { useRef, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector } from "react-redux";

import "../../style/modals.css";

import { modalsName } from ".";
import {
  LoadingComponent,
  UserCardCheckbox,
  InputSearch,
  catchError,
} from "../utils";
import { constants } from "../../utils";
import { backendWithoutAuth } from "../../api/backend";

const paginateInit = { ...constants.paginateInit };
export default function CreateContact() {
  const modalCheckboxRef = useRef();
  const userId = useSelector((state) => state.thisUser.value.id);
  const contacts = useSelector(
    (state) => state.thisUserDetail.value && state.thisUserDetail.value.contacts
  );
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [paginate, setPaginate] = useState({ ...paginateInit });

  const cleanUpModal = (e) => {
    e.preventDefault();
    setPaginate(paginateInit);
    setUsers([]);
    setSelectedUsers([]);
    modalCheckboxRef.current.checked = false;
  };

  const loadMoreUser = async (search = paginate.search, nextPage) => {
    console.log("loadMoreUser");
    console.log(search, nextPage);
    setLoading(true);
    try {
      const res = await backendWithoutAuth.get(
        `/users?search=${search}&page=${nextPage}`
      );
      console.log(res.data);
      setUsers((prev) => [...prev, ...res.data.results]);
      setPaginate((prev) => ({
        ...prev,
        totalPages: res.data.totalPages,
        totalResults: res.data.totalResults,
      }));
    } catch (err) {
      catchError(err);
    }
    setLoading(false);
  };

  const loadUser = (search) => {
    console.log("loadUser");
    const nextPage = paginate.page + 1;
    setPaginate((prev) => ({ ...prev, page: nextPage }));
    loadMoreUser(search, nextPage);
  };

  const handleSearchUsers = (search) => {
    console.log("handleSearchUsers");
    setPaginate((prev) => ({ ...prev, search: search }));
    loadUser(search);
  };

  const handleClearUsers = () => {
    setPaginate(paginateInit);
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

  const handleSubmit = () => {
    // tạo chat và route vào chat mới
    console.log(selectedUsers);
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

          {loading ? (
            <LoadingComponent.LoadingContacts classes="userCard--white" />
          ) : (
            <div
              id="modal__body__list--create-contact"
              className="modal__body__list"
            >
              {paginate.search !== "" && (
                <InfiniteScroll
                  scrollableTarget="modal__body__list--create-contact"
                  dataLength={paginate.totalResults}
                  next={loadUser}
                  hasMore={paginate.page < paginate.totalPages}
                  loader={
                    <LoadingComponent.LoadingContacts classes="userCard--white" />
                  }
                >
                  {users.map(
                    (user) =>
                      // hiện user chưa có trong contacts và khác mình (userId)
                      !contacts.includes(user.id) &&
                      user.id !== userId && (
                        <UserCardCheckbox
                          isChecked={selectedUsers.includes(user.id)}
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
