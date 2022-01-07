import React, { useEffect, useState } from "react";
import { FontAwesomeIcon as Icon } from "@fortawesome/react-fontawesome";
import { useSelector, useDispatch } from "react-redux";
import InfiniteScroll from "react-infinite-scroll-component";

import "../../style/chatList.css";

import {
  LoadingComponent,
  ChatCard,
  InputSearch,
  EndNoDataComponent,
  catchError,
} from "../utils";
import { CreateChatModal, modalsName } from "../modals";
import { constants, utilFunction, Paginate } from "../../utils";
import { backendWithAuth } from "../../api/backend";
import { chatroomsAction, thisUserAction } from "../../features";

export default function ChatList() {
  const userId = useSelector((state) => state.thisUser.value.id);
  const selectedChatroom = useSelector(
    (state) => state.chatrooms.value?.selectedChatroom?.id
  );
  const chatrooms = useSelector((state) => state.chatrooms.value?.chatrooms);
  const paginate = useSelector((state) => state.chatrooms.value?.paginate);
  const dispatch = useDispatch();
  const [isSearch, setIsSearch] = useState(false);

  const children = (o) => {
    return (
      <ChatCard
        key={o.id}
        chatroom={o}
        isSelected={selectedChatroom === o.id}
      />
    );
  };

  const { handleSearch, handleClearState, ComponentScroll } =
    Paginate.Chatrooms(children, userId);

  useEffect(() => {
    if (paginate == null) {
      loadMore(1);
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadMore = async (page = paginate.page) => {
    try {
      const axios = await backendWithAuth();

      if (axios != null) {
        const url = `/chatrooms?userId=${userId}&page=${page}`;

        const res = await axios.get(url);

        //format chatrooms
        res.data.results.forEach((chatroom) => {
          chatroom = utilFunction.formatChatroom(chatroom, userId);
          return chatroom;
        });

        // dispatch set chatrooms & paginate
        dispatch(
          chatroomsAction.addNew({
            chatrooms: res.data.results,
            paginate: {
              page: page + 1,
              totalPages: res.data.totalPages,
              totalResults: res.data.totalResults,
            },
          })
        );
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      catchError(err);
    }
  };

  const handleOptionChange = (e) => {
    console.log(e.target.value);
    // call backend chatList : option
  };

  const handleSearchChat = (str) => {
    setIsSearch(true);
    handleSearch(str);
  };

  const handleClear = () => {
    handleClearState();
    setIsSearch(false);
  };

  const ChatroomsContent = () => {
    if (paginate) {
      if (!isSearch) {
        return (
          <InfiniteScroll
            scrollableTarget="smallPanel-content__chatlist"
            dataLength={chatrooms.length}
            next={loadMore}
            loader={<LoadingComponent.LoadingChats />}
            hasMore={chatrooms.length < paginate.totalResults}
            endMessage={<EndNoDataComponent.EndNoDataLight />}
          >
            {chatrooms.map((o) => children(o))}
            {!paginate && <LoadingComponent.LoadingChats />}
          </InfiniteScroll>
        );
      } else {
        return (
          <ComponentScroll
            target={"smallPanel-content__chatlist"}
            loader={LoadingComponent.LoadingChats}
            endMessage={EndNoDataComponent.EndNoDataLight}
          />
        );
      }
    } else return <LoadingComponent.LoadingChats />;
  };

  return (
    <>
      <div className="smallPanel content smallPanel--left">
        <div>
          <div className="smallPanelLeft-header-info">
            <div>
              <p className="text--header">Chats</p>
              <select
                className="chatList-header-info__select"
                onChange={handleOptionChange}
                // value={option: reducer chatList}
              >
                {constants.optionsChatList.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            </div>
            <label
              htmlFor={modalsName.createChatModal}
              className="btn btn--medium btn--primary"
            >
              <Icon className="icon--margin-right" icon="plus" />
              Create new chat
            </label>
          </div>
          <InputSearch
            classes={"input-icon--dark"}
            handleSearch={handleSearchChat}
            handleClear={handleClear}
          />
        </div>
        <div id="smallPanel-content__chatlist" className="smallPanel-content">
          {ChatroomsContent()}
        </div>
      </div>
      <CreateChatModal />
    </>
  );
}
