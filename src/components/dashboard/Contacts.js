import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import { CreateContactModal, modalsName } from "../modals";
import { LoadingComponent, UserCard, catchError, InputSearch } from "../utils";
import { backendWithoutAuth } from "../../api/backend";
import { thisUserDetailAction } from "../../features";
import { constants } from "../../utils";

const paginateInit = { ...constants.paginateInit };

export default function Contacts() {
  const userId = useSelector((state) => state.thisUser.value.id);
  const thisUserDetailContacts = useSelector(
    (state) => state.thisUserDetail.value && state.thisUserDetail.value.contacts
  );
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [contacts, setContacts] = useState([]);
  const [paginate, setPaginate] = useState(null);

  useEffect(() => {
    if (paginate) {
      const getContacts = contacts.filter((contact) =>
        thisUserDetailContacts.includes(contact.id)
      );
      console.log(getContacts);

      // trường hợp xóa contacts 
      if (getContacts.length < 6 && thisUserDetailContacts.length >= 6) {
        handleClear();
      }

      // trường hợp thêm contact
      if (
        thisUserDetailContacts.length > paginate.totalResults &&
        contacts.length >= paginate.totalResults
      ) {
        handleClear();
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [thisUserDetailContacts]);

  useEffect(() => {
    async function getUserDetail() {
      try {
        const res = await backendWithoutAuth.get(`/userDetails/${userId}`);
        dispatch(thisUserDetailAction.set(res.data));
        handleClear();
      } catch (err) {
        catchError(err);
      }
    }

    if (thisUserDetailContacts == null) {
      getUserDetail();
    } else {
      handleClear();
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const loadMoreUser = async (
    search = paginate.search,
    page = paginate.page
  ) => {
    try {
      console.group("SEARCH");
      const url = `/users?${
        search !== "" ? `search=${search}` : ""
      }&page=${page}&userId=${userId}`;
      console.log(url);

      const res = await backendWithoutAuth.get(url);
      console.log(res);
      setContacts((prev) => [...prev, ...res.data.results]);
      setPaginate((prev) => ({
        search: search,
        page: prev.page + 1,
        totalPages: res.data.totalPages,
        totalResults: res.data.totalResults,
      }));
    } catch (err) {
      catchError(err);
    }
    console.groupEnd();
  };

  const handleSearchContact = (search) => {
    setPaginate({ ...paginateInit, search: search });
    setContacts([]);
    loadMoreUser(search, 1);
  };

  const handleClear = () => {
    handleSearchContact("");
  };

  const SearchListContacts = () => {
    return (
      <InfiniteScroll
        scrollableTarget="smallPanel-content__contacts"
        dataLength={contacts.length}
        next={loadMoreUser}
        hasMore={contacts.length < paginate.totalResults}
        loader={<LoadingComponent.LoadingContacts />}
      >
        {contacts.map(
          (user) =>
            thisUserDetailContacts.includes(user.id) && (
              <UserCard key={user.id} user={user} />
            )
        )}
      </InfiniteScroll>
    );
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
          {paginate && <SearchListContacts />}
        </div>
      </div>
      <CreateContactModal />
    </>
  );
}
