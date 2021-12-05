const usersData = [
  {
    id: 0,
    name: "Nha Trang",
    email: "nhatrang99@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: true,
  },
  {
    id: 1,
    name: "Nguyen Thanh Vinh Phuc",
    email: "phucnguyen@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: false,
  },
  {
    id: 2,
    name: "Thien Tin",
    email: "thientin@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: false,
  },
  {
    id: 3,
    name: "Dang Thuy Uyen",
    email: "ThuyUyen@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: false,
  },
  {
    id: 4,
    name: "Quang Huy",
    email: "quanghuy@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: true,
  },
  {
    id: 5,
    name: "Huu Khang",
    email: "huukhang@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: false,
  },
  {
    id: 6,
    name: "Tuan Khang",
    email: "tuankhang@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: true,
  },
  {
    id: 7,
    name: "Phan Thi Tuyet",
    email: "thituyet@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: true,
  },
  {
    id: 8,
    name: "Vu Minh",
    email: "vuminh@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: true,
  },
  {
    id: 9,
    name: "Ky Nguyen Tran",
    email: "kynguyen@gmail.com",
    avatar:
      "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/userAvatars%2FdefaultAvatar.png?alt=media&token=d6d53533-3008-4173-96ed-cff4f08c85d0",
    status: true,
  },
];

const usersId = (users) => {
  var ids = [];
  users.forEach((user) => ids.push(user.id));
  return ids;
};

const thisUserData = usersData[0];

const thisUserDetailData = {
  id: thisUserData.id,
  desription: "hello, nice to meet you, do u want some coffe ?",
  phoneNumber: "0332087063",
  followers: usersId(usersData.slice(1)),
  followings: usersId(usersData.slice(1)),
  contacts: usersId(usersData.slice(1)),
  followersPopulate: usersData.slice(1),
  followingsPopulate: usersData.slice(1),
  contactsPopulate: usersData.slice(1),
};

const otherUserData = usersData[1];

const otherUserDetailData = {
  id: otherUserData.id,
  desription: "hello, nice to meet you, do u want some coffe ?",
  phoneNumber: "0332087063",
  followers: usersId(usersData.slice(2)),
  followings: usersId(usersData.slice(2)),
  contacts: usersId(usersData.slice(2)),
  followersPopulate: usersData.slice(2),
  followingsPopulate: usersData.slice(2),
  contactsPopulate: usersData.slice(2),
};

const messagesPersonalData = [
  {
    id: 0,
    text: "Listen to this song exactly at ",
    type: "text",
    sender: usersData[0].id,
    time: 1638183499006,
  },
  {
    id: 1,
    text: "Listen to this song exactly at ",
    type: "text",
    sender: usersData[1].id,
    time: 1638183525238,
  },
  {
    id: 2,
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
    type: "image",
    sender: usersData[0].id,
    time: 1638183543630,
  },
  {
    id: 3,
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
    sender: usersData[1].id,
    time: 1638183567445,
  },
  {
    id: 4,
    text: "Listen to this song exactly at 11:55:34 PM on December 31st, 2015.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[0].id,
    time: 1638183574782,
  },
  {
    id: 5,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[1].id,
    time: 1638183581181,
  },
  {
    id: 6,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[0].id,
    time: 1638183586069,
  },
  {
    id: 7,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[0].id,
    time: 1638183592318,
  },
  {
    id: 8,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[1].id,
    time: 1638183596733,
  },
  {
    id: 9,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[1].id,
    time: 1638183600957,
  },
];

const messagesChatgroupData = [
  {
    id: 0,
    text: "Listen to this song exactly at",
    type: "text",
    sender: usersData[0].id,
    time: 1638183499006,
  },
  {
    id: 1,
    text: "Listen to this song exactly at",
    type: "text",
    sender: usersData[9].id,
    time: 1638183525238,
  },
  {
    id: 2,
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
    type: "image",
    sender: usersData[0].id,
    time: 1638183543630,
  },
  {
    id: 3,
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
    sender: usersData[1].id,
    time: 1638183567445,
  },
  {
    id: 4,
    text: "left group",
    type: "notify",
    sender: usersData[9].id,
    time: 1638183574782,
  },
  {
    id: 5,
    text: "joined group",
    type: "notify",
    sender: usersData[2].id,
    time: 1638183581181,
  },
  {
    id: 6,
    text: "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/video%2Flan-dau-che-bien-nem-chien-xu-an-sap-ha-noi-short.mp4?alt=media&token=0d6815db-6d7f-4c8b-8d10-000e21b3b7f4",
    type: "video",
    sender: usersData[1].id,
    time: 1638183586069,
  },
  {
    id: 7,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[1].id,
    time: 1638183592318,
  },
  {
    id: 8,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[1].id,
    time: 1638183596733,
  },
  {
    id: 9,
    text: "Listen to this song exactly at 11:58:34 PM on December 31st, 2018.  The first beat will drop right when it strikes midnight. Start your year right. c:",
    type: "text",
    sender: usersData[0].id,
    time: 1638183600957,
  },
];

const chatRoomsData = [
  {
    id: 0,
    isGroupChat: true,
    membersPopulate: usersData.slice(0, 5),
    outGroupMembersPopulate: [usersData[9]],
    members: usersId(usersData.slice(0, 5)),
    outGroupMembers: usersId([usersData[9]]),
    seenHistory: {
      [usersData[0].id]: messagesChatgroupData[7].id,
      [usersData[1].id]: messagesChatgroupData[9].id,
      [usersData[2].id]: messagesChatgroupData[9].id,
      [usersData[3].id]: messagesChatgroupData[7].id,
      [usersData[4].id]: messagesChatgroupData[7].id,
    },
    lastMessage: messagesChatgroupData[messagesChatgroupData.length - 1],
  },
  {
    id: 1,
    isGroupChat: false,
    membersPopulate: usersData.slice(0, 2),
    members: usersId(usersData.slice(0, 2)),
    seenHistory: {
      [usersData[0].id]: messagesChatgroupData[8].id,
      [usersData[1].id]: messagesChatgroupData[9].id,
    },
    lastMessage: messagesPersonalData[messagesPersonalData.length - 1],
  },
  {
    id: 2,
    isGroupChat: true,
    membersPopulate: usersData.slice(0, 5),
    outGroupMembersPopulate: [usersData[9]],
    members: usersId(usersData.slice(0, 5)),
    outGroupMembers: usersId([usersData[9]]),
    name: "sample chat group 3",
    seenHistory: {
      [usersData[0].id]: messagesChatgroupData[9].id,
      [usersData[1].id]: messagesChatgroupData[9].id,
      [usersData[2].id]: messagesChatgroupData[7].id,
      [usersData[3].id]: messagesChatgroupData[7].id,
      [usersData[4].id]: messagesChatgroupData[7].id,
    },
    lastMessage: messagesChatgroupData[messagesChatgroupData.length - 1],
  },
  {
    id: 3,
    isGroupChat: true,
    membersPopulate: usersData.slice(0, 5),
    outGroupMembersPopulate: [usersData[9]],
    members: usersId(usersData.slice(0, 5)),
    outGroupMembers: usersId([usersData[9]]),
    name: "sample chat group 4",
    seenHistory: {
      [usersData[0].id]: messagesChatgroupData[6].id,
      [usersData[1].id]: messagesChatgroupData[6].id,
      [usersData[2].id]: messagesChatgroupData[7].id,
      [usersData[3].id]: messagesChatgroupData[7].id,
      [usersData[4].id]: messagesChatgroupData[7].id,
    },
    lastMessage: messagesChatgroupData[messagesChatgroupData.length - 1],
  },
  {
    id: 4,
    isGroupChat: true,
    membersPopulate: usersData.slice(0, 5),
    outGroupMembersPopulate: [usersData[9]],
    members: usersId(usersData.slice(0, 5)),
    outGroupMembers: usersId([usersData[9]]),
    name: "sample chat group 5",
    seenHistory: {
      [usersData[0].id]: messagesChatgroupData[6].id,
      [usersData[1].id]: messagesChatgroupData[6].id,
      [usersData[2].id]: messagesChatgroupData[7].id,
      [usersData[3].id]: messagesChatgroupData[7].id,
      [usersData[4].id]: messagesChatgroupData[7].id,
    },
    lastMessage: messagesChatgroupData[messagesChatgroupData.length - 1],
  },
  {
    id: 5,
    isGroupChat: true,
    membersPopulate: usersData.slice(0, 5),
    outGroupMembersPopulate: [usersData[9]],
    members: usersId(usersData.slice(0, 5)),
    outGroupMembers: usersId([usersData[9]]),
    name: "sample chat group 6",
    seenHistory: {
      [usersData[0].id]: messagesChatgroupData[6].id,
      [usersData[1].id]: messagesChatgroupData[6].id,
      [usersData[2].id]: messagesChatgroupData[7].id,
      [usersData[3].id]: messagesChatgroupData[7].id,
      [usersData[4].id]: messagesChatgroupData[7].id,
    },
    lastMessage: messagesChatgroupData[messagesChatgroupData.length - 1],
  },
];

const chatInfoFilesData = [
  {
    text: "https://firebasestorage.googleapis.com/v0/b/we-text-c82e4.appspot.com/o/video%2Flan-dau-che-bien-nem-chien-xu-an-sap-ha-noi-short.mp4?alt=media&token=0d6815db-6d7f-4c8b-8d10-000e21b3b7f4",
    type: "video",
  },
  {
    type: "image",
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
  },
  {
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
  },
  {
    type: "image",
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
  },
  {
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
  },
  {
    type: "image",
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
  },
  {
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
  },
  {
    type: "image",
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
  },
  {
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
  },
  {
    type: "image",
    text: "https://lifetimemix.com/wp-content/uploads/2021/06/1800x1200_cat_relaxing_on_patio_other.jpg",
  },
  {
    text: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4d/Cat_November_2010-1a.jpg/1200px-Cat_November_2010-1a.jpg",
    type: "image",
  },
];

export {
  usersData,
  thisUserData,
  thisUserDetailData,
  chatRoomsData,
  messagesChatgroupData,
  messagesPersonalData,
  chatInfoFilesData,
};
