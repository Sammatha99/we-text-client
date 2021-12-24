import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";

import { LoadingComponent, UserCard, catchError, InputSearch } from "../utils";
import { CreateContactModal, modalsName } from "../modals";

import { backendWithoutAuth } from "../../api/backend";
import { thisUserDetailAction } from "../../features";

import { thisUserDetailData } from "../../utils/fakeData";

export default function Contacts() {
  const userId = useSelector((state) => state.thisUser.value.id);
  const thisUserDetail = useSelector((state) => state.thisUserDetail.value);
  const dispatch = useDispatch();
  const [contacts, setContacts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // get contacts from backend (paginate)
    async function getUserDetail() {
      try {
        const res = await backendWithoutAuth.get(`/userDetails/${userId}`);
        dispatch(thisUserDetailAction.set(res.data));
        const getContacts = [...thisUserDetailData.contactsPopulate];
        setContacts(getContacts);
      } catch (err) {
        catchError(err);
      }
      setLoading(false);
    }
    if (thisUserDetail == null) {
      getUserDetail();
    } else {
      const getContacts = [...thisUserDetailData.contactsPopulate];
      setContacts(getContacts);
      setLoading(false);
    }

    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, userId]);

  const handleSearchContact = (str) => {
    console.log(str, ": search users in contacts");
    // create utilFunctions.searchUserInContacts
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
          />
        </div>
        <div className="smallPanel-content">
          {loading ? (
            <LoadingComponent.LoadingContacts />
          ) : (
            contacts.map((user) => <UserCard key={user.id} user={user} />)
          )}
        </div>
      </div>
      <CreateContactModal />
    </>
  );
}
