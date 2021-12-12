import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";

import { LoadingComponent, UserCard } from "../utils";
import { thisUserDetailData } from "../../utils/fakeData";

const contactsPopulate = [...thisUserDetailData.contactsPopulate];

export default function Contacts() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
    return () => {};
  }, []);

  return (
    <div className="smallPanel content smallPanel--left">
      <div>
        <div className="smallPanelLeft-header-info">
          <div>
            <p className="text--header">Contacts</p>
          </div>
          <button className="btn btn--medium btn--primary">
            <Icon className="icon--margin-right" icon="plus" />
            Create contact
          </button>
        </div>
        <div className="input-icon input-icon--dark input-icon--search">
          <input className="input-icon__input" placeholder="Search here" />
          <div className="input-icon__icon--right">
            <Icon className="input-icon__icon--link" icon="search" />
            <Icon
              className="input-icon__icon--link input-icon__icon--clear"
              icon="times-circle"
            />
          </div>
        </div>
      </div>
      <div className="smallPanel-content">
        {loading ? (
          <LoadingComponent.LoadingContacts />
        ) : (
          contactsPopulate.map((user) => <UserCard key={user.id} user={user} />)
        )}
      </div>
    </div>
  );
}

// TODO 1
/**
 * userCard popup menu:
 * check contact/ check following
 *    + see profile
 *    + add / delete contact
 *    + follow / unfollow
 * - contacts
 * - chatInfo
 * - other User profile
 * - this user profile
 */
