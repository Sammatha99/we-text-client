import React, { useEffect } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import { CreateContactModal, modalsName } from "../modals";
import {
  LoadingComponent,
  UserCard,
  catchError,
  InputSearch,
  EndNoDataComponent,
} from "../utils";
import { backendWithoutAuth } from "../../api/backend";
import { thisUserDetailAction } from "../../features";
import { constants, Paginate } from "../../utils";

export default function Contacts() {
  const userId = useSelector((state) => state.thisUser.value.id);
  const thisUserDetailContacts = useSelector(
    (state) =>state.thisUserDetail.value?.contacts
  );
  const dispatch = useDispatch();

  const children = (o) => {
    return (
      <UserCard
        key={o.id}
        user={o}
        classes={
          !thisUserDetailContacts.includes(o.id) ? "userCard--disabled" : ""
        }
      />
    );
  };

  const { ComponentScroll, handleSearch } = Paginate.Users(
    children,
    userId,
    constants.searchType.CONTACTS,
    thisUserDetailContacts
  );

  useEffect(() => {
    async function getUserDetail() {
      try {
        const res = await backendWithoutAuth.get(`/userDetails/${userId}`);
        dispatch(thisUserDetailAction.set(res.data));
        handleSearch("");
      } catch (err) {
        catchError(err);
      }
    }

    if (thisUserDetailContacts == null) {
      getUserDetail();
    } else {
      handleSearch("");
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleSearchContact = (search) => {
    handleSearch(search);
  };

  const handleClear = () => {
    handleSearch("");
  };

  return (
    <>
      <div className="smallPanel content smallPanel--left">
        <div>
          <div className="smallPanelLeft-header-info">
            <div>
              <p className="text--header">Contacts</p>
            </div>
            <label
              htmlFor={modalsName.createContactModal}
              className="btn btn--medium btn--primary"
            >
              <Icon className="icon--margin-right" icon="plus" />
              Create contact
            </label>
          </div>
          <InputSearch
            classes={"input-icon--dark"}
            handleSearch={handleSearchContact}
            handleClear={handleClear}
          />
        </div>
        <div id="smallPanel-content__contacts" className="smallPanel-content">
          <ComponentScroll
            target={"smallPanel-content__contacts"}
            loader={LoadingComponent.LoadingContacts}
            endMessage={EndNoDataComponent.EndNoDataDark}
          />
        </div>
      </div>
      <CreateContactModal />
    </>
  );
}
