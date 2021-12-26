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
  const [contacts, setContacts] = useState({ populate: [], ids: [] });
  const [paginate, setPaginate] = useState(null);

  useEffect(() => {
    console.log(
      "????",
      paginate,
      contacts.populate.length,
      thisUserDetailContacts && thisUserDetailContacts.length
    );
    if (paginate && thisUserDetailContacts) {
      // trường hợp thêm contact
      if (
        paginate.totalPages === paginate.page &&
        paginate.page !== 0 &&
        contacts.populate.length < thisUserDetailContacts.length
      ) {
        //  tự kiến userId mới thêm vào, gọi backend get user by id
        // thêm thủ công user mới vào contacts => setContacts
        const missingContactIds = thisUserDetailContacts.filter(
          (id) => !contacts.ids.includes(id)
        );
        loadMissingUserByIds(missingContactIds);
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts, thisUserDetailContacts]);

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

  const setContactsUsers = (users) => {
    setContacts((prev) => {
      const results = [...prev.populate];
      const contactsId = [...prev.ids];
      users.forEach((user) => {
        if (!contactsId.includes(user.id)) {
          results.push(user);
          contactsId.push(user.id);
        }
      });
      return { populate: results, ids: contactsId };
    });
  };

  const loadMissingUserByIds = async (ids) => {
    const missingUsers = [];
    try {
      for (const id of ids) {
        const res = await backendWithoutAuth.get(`/users/${id}`);
        missingUsers.push(res.data);
      }
    } catch (err) {
      catchError(err);
    }
    setContactsUsers(missingUsers);
  };

  const loadMoreUser = async (
    search = paginate.search,
    page = paginate.page + 1
  ) => {
    try {
      const url = `/users?${
        search !== "" ? `search=${search}` : ""
      }&page=${page}&userId=${userId}`;

      const res = await backendWithoutAuth.get(url);

      setPaginate((prev) => ({
        search: search,
        page: prev.page + 1,
        totalPages: res.data.totalPages,
        totalResults: res.data.totalResults,
      }));

      setContactsUsers(res.data.results);
    } catch (err) {
      catchError(err);
    }
  };

  const handleSearchContact = (search) => {
    setPaginate({ ...paginateInit, search: search });
    setContacts({ populate: [], ids: [] });
    loadMoreUser(search, 1);
  };

  const handleClear = () => {
    handleSearchContact("");
  };

  const SearchListContacts = () => {
    return (
      <InfiniteScroll
        scrollableTarget="smallPanel-content__contacts"
        dataLength={contacts.populate.length}
        next={loadMoreUser}
        hasMore={paginate.page < paginate.totalPages}
        loader={<LoadingComponent.LoadingContacts />}
      >
        {contacts.populate.map((user) => (
          <UserCard
            key={user.id}
            user={user}
            classes={
              !thisUserDetailContacts.includes(user.id)
                ? "userCard--disabled"
                : ""
            }
          />
        ))}
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
