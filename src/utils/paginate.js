import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";

import { catchError } from "../components/utils";
import { constants } from "./";
import { backendWithoutAuth } from "../api/backend";

const paginateUserSearch = { ...constants.paginateInit };

const Paginate = (children, LoadingComponent, userId, type, reduxIds) => {
  const [paginate, setPaginate] = useState(null);
  const [users, setUsers] = useState({ populate: [], ids: [] });

  useEffect(() => {
    if (paginate && reduxIds) {
      // trường hợp thêm users trong redux
      if (
        paginate.totalPages === paginate.page &&
        paginate.page !== 0 &&
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
      console.log(results);
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
    setUsers([]);
  };

  const loadMore = async (search = paginate.search, page = paginate.page) => {
    try {
      const url = `/users?${
        search !== "" ? `search=${search}` : ""
      }&page=${page}${userId ? ` &userId=${userId}` : ""}${
        type ? `&type=${type}` : ""
      }`;

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

  const ComponentScroll = ({ target = null }) =>
    paginate ? (
      <InfiniteScroll
        scrollableTarget={target}
        dataLength={users.populate.length}
        next={loadMore}
        hasMore={paginate.page < paginate.totalPages}
        loader={LoadingComponent ? LoadingComponent() : <></>}
      >
        {users.populate.map((user) => children(user))}
      </InfiniteScroll>
    ) : (
      <></>
    );

  return {
    ComponentScroll,
    handleSearch,
    handleClearState,
  };
};

export default Paginate;
