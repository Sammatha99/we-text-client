const tabs = [
  {
    name: "chats",
    icon: "comment-dots",
  },
  {
    name: "contacts",
    icon: "user",
  },
  {
    name: "profile",
    icon: "th-large",
  },
];

const optionsChatList = [
  {
    id: "default",
    name: "Default",
  },
  {
    id: "recent",
    name: "Recent chats",
  },
  {
    id: "old",
    name: "Old chats",
  },
];

const thisUserTabs = ["about", "followings", "followers"];

const smallPanelRightType = {
  otherUserProfile: "other-user-profile",
  chatInfo: "chat-info",
};

const routePath = {
  loginPath: "/login",
  registerPath: "/register",
  forgotPasswordPath: "/forgot-password",
  verifyEmailPath: "/verify-email",
};

const imageType = ["image/png", "image/jpeg", "image/jpg"];

const list4 = [0, 1, 2, 3];
const list3 = [0, 1, 2];

const storageType = {
  rfToken: "refreshToken",
  acToken: "accessToken",
  userId: "user-id",
};

const OTPStartTime = 60 * 5;

const paginateInit = {
  search: "",
  sortBy: null,
  page: 0,
  totalPages: 0,
  totalResults: 0,
};

const searchType = {
  FOLLOWINGS: "followings",
  FOLLOWERS: "followers",
  CONTACTS: "contacts",
};

const rightPanelType = {
  USERINFO: "user",
  CHATINFO: "chat",
};

const messagesType = {
  NOTIFY: "notify",
  TEXT: "text",
  IMAGE: "image",
  VIDEO: "video",
  FILE: "file",
  RECORD: "record",
};

export {
  tabs,
  optionsChatList,
  smallPanelRightType,
  thisUserTabs,
  imageType,
  list3,
  list4,
  routePath,
  storageType,
  OTPStartTime,
  paginateInit,
  searchType,
  rightPanelType,
  messagesType,
};
