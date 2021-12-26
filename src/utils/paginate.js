import { useState } from "react";
import { constants } from "../../utils";

const paginateUserSearch = { ...constants.paginateInit };

const PaginateUtil = (type, setResults, ListLength) => {
  const [paginate, setPaginate] = useState(null);

  const handleSearch = (search) => {};

  const handleClear = () => {};

  const loadMore = (search = paginate.search, page = paginate.page) => {};
};
