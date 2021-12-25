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

const imageType = ["image/png", "image/jpeg"];

const list4 = [0, 1, 2, 3];

const storageType = {
  rfToken: "refreshToken",
  acToken: "accessToken",
  userId: "user-id",
};

const OTPStartTime = 60 * 5;

const paginateInit = { search: "", page: 1, totalPages: 0, totalResults: 0 };

export {
  tabs,
  optionsChatList,
  smallPanelRightType,
  thisUserTabs,
  imageType,
  list4,
  routePath,
  storageType,
  OTPStartTime,
  paginateInit,
};
