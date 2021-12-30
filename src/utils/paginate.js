import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useDispatch } from "react-redux";

import { catchError } from "../components/utils";
import { constants, utilFunction } from "./";
import { thisUserAction } from "../features";
import { backendWithoutAuth, backendWithAuth } from "../api/backend";

const paginateUserSearch = { ...constants.paginateInit };

const Users = (children, userId, type, reduxIds) => {
  const [paginate, setPaginate] = useState(null);
  const [users, setUsers] = useState({ populate: [], ids: [] });

  useEffect(() => {
    if (paginate && reduxIds) {
      // trường hợp thêm users trong redux
      if (
        paginate.totalPages === paginate.page &&
        paginate.page !== 0 &&
        paginate.search === "" &&
        users.populate.length < reduxIds.length
      ) {
        //  tự kiến userId mới thêm vào, gọi backend get user by id
        // thêm thủ công user mới vào users => setUsers
        const missingIds = reduxIds.filter((id) => !users.ids.includes(id));
        loadMissingUserByIds(missingIds);
      }
    }
    return () => {};
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [paginate, reduxIds, userId]);

  const setUsersToUsers = (resUser) => {
    setUsers((prev) => {
      const results = [...prev.populate];
      const ids = [...prev.ids];
      resUser.forEach((user) => {
        if (!ids.includes(user.id)) {
          results.push(user);
          ids.push(user.id);
        }
      });
      return { populate: results, ids: ids };
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
    setUsersToUsers(missingUsers);
  };

  const handleSearch = (search) => {
    setPaginate({ ...paginateUserSearch, search: search });
    setUsers({ populate: [], ids: [] });
    loadMore(search, 1);
  };

  const handleClearState = () => {
    setPaginate(null);
    setUsers({ populate: [], ids: [] });
  };

  const loadMore = async (search = paginate.search, page = paginate.page) => {
    try {
      const url = `/users?${search ? `search=${search}` : ""}&page=${page}${
        userId ? `&userId=${userId}` : ""
      }${type ? `&type=${type}` : ""}`;

      const res = await backendWithoutAuth.get(url);

      setPaginate((prev) => ({
        search: search,
        page: prev.page + 1,
        totalPages: res.data.totalPages,
        totalResults: res.data.totalResults,
      }));

      setUsersToUsers(res.data.results);
    } catch (err) {
      catchError(err);
    }
  };

  const ComponentScroll = ({
    target = null,
    height = null,
    endMessage = null,
    loader = null,
    scrollThreshold = null,
  }) =>
    paginate ? (
      <>
        <InfiniteScroll
          {...(scrollThreshold && { scrollThreshold: scrollThreshold })}
          {...(target && { scrollableTarget: target })}
          {...(height && { height })}
          {...(endMessage && { endMessage: endMessage() })}
          {...(loader && { loader: loader() })}
          dataLength={users.populate.length}
          next={loadMore}
          hasMore={paginate.page < paginate.totalPages}
        >
          {users.populate.map((user) => children(user))}
          {paginate.page === 0 && loader()}
        </InfiniteScroll>
      </>
    ) : (
      <></>
    );

  return {
    ComponentScroll,
    handleSearch,
    handleClearState,
  };
};

const Chatrooms = (children, userId) => {
  const dispatch = useDispatch();
  const [paginate, setPaginate] = useState(null);
  const [chatrooms, setChatrooms] = useState({ populate: null, ids: null });

  const setChatroomsToChatrooms = (resChatrooms) => {
    setChatrooms((prev) => {
      const results = [...prev.populate];
      const ids = [...prev.ids];
      resChatrooms.forEach((chatroom) => {
        if (!ids.includes(chatroom.id)) {
          results.push(chatroom);
          ids.push(chatroom.id);
        }
      });
      console.log(results);
      return { populate: results, ids: ids };
    });
  };

  const handleSearch = (search = null, sortBy = null) => {
    const object = {
      ...(search && { search: search }),
      ...(sortBy && { sortBy: sortBy }),
    };
    setPaginate({ ...paginateUserSearch, ...object });
    setChatrooms({ populate: [], ids: [] });
    loadMore(search, sortBy, 1);
  };

  const handleClearState = () => {
    setPaginate(null);
    setChatrooms({ populate: null, ids: null });
  };

  const loadMore = async (
    search = paginate.search,
    sortBy = paginate.sortBy,
    page = paginate.page
  ) => {
    try {
      const axios = await backendWithAuth();

      if (axios != null) {
        const url = `/chatrooms?userId=${userId}${
          search ? `&search=${search}` : ""
        }${sortBy ? `&sortBy=${sortBy}` : ""}&page=${page}`;

        const res = await axios.get(url);

        res.data.results.forEach((chatroom) => {
          chatroom = utilFunction.formatChatroom(chatroom, userId);
          return chatroom;
        });

        setPaginate((prev) => {
          console.log(prev);
          const o = {
            search: search,
            sortBy: sortBy,
            page: prev.page + 1,
            totalPages: res.data.totalPages,
            totalResults: res.data.totalResults,
          };
          console.log(o);
          return o;
        });

        setChatroomsToChatrooms(res.data.results);
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {
      catchError(err);
    }
  };

  const ComponentScroll = ({
    target = null,
    height = null,
    endMessage = null,
    loader = null,
    scrollThreshold = null,
  }) => {
    return paginate ? (
      <>
        <InfiniteScroll
          {...(scrollThreshold && { scrollThreshold })}
          {...(target && { scrollableTarget: target })}
          {...(height && { height })}
          {...(endMessage && { endMessage: endMessage() })}
          {...(loader && { loader: loader() })}
          dataLength={chatrooms.populate.length}
          next={loadMore}
          hasMore={paginate.page < paginate.totalPages}
        >
          {chatrooms.populate.map((chatroom) => children(chatroom))}
          {paginate.page === 0 && loader()}
        </InfiniteScroll>
      </>
    ) : (
      loader()
    );
  };

  return {
    ComponentScroll,
    handleSearch,
    handleClearState,
  };
};

export { Users, Chatrooms };
