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

// const thisUserTabs = {
//   aboutTab: "about",
//   followingsTab: "followings",
//   followersTab: "followers",
// };

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

export {
  tabs,
  optionsChatList,
  smallPanelRightType,
  thisUserTabs,
  imageType,
  list4,
  routePath,
};
