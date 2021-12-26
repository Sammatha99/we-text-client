const chatRoomStatus = function (chatroom) {
  if (!chatroom.isGroupChat) {
    return chatroom.membersPopulate[0].status;
  }
  for (const member of chatroom.membersPopulate) {
    if (member.status) return true;
  }
  return false;
};

const formatChatroom = function (chatroom, thisUserId) {
  const otherMembersPopulate = chatroom.membersPopulate.filter(
    (member) => member.id !== thisUserId
  );

  // kiếm name cho chatroom
  if (!chatroom.name) {
    const names = [];
    otherMembersPopulate.forEach((member) => {
      names.push(member.name);
    });
    chatroom.name = names.join(", ");
  }

  return chatroom;
};

const getChatroomsId = function (chatrooms) {
  const ids = [];
  chatrooms.forEach((chatroom) => ids.push(chatroom.id));
  return ids;
};

const dateCompare = function (d1, d2) {
  const d1Convert = typeof d1 === "string" ? Date.parse(d1) : d1;
  const d2Convert = typeof d2 === "string" ? Date.parse(d2) : d2;
  if (d1Convert < d2Convert) return -1; // d1 sớm hơn d2
  if (d1Convert === d2Convert) return 0; // d1 === d2
  if (d1Convert > d2Convert) return 1; // d1 trễ hơn d2
};

const getIds = function (array) {
  const ids = [];
  array.forEach((a) => ids.push(a.id));
  return ids;
};

const isEmltyObject = (obj) =>
  obj &&
  Object.keys(obj).length === 0 &&
  Object.getPrototypeOf(obj) === Object.prototype;

export {
  chatRoomStatus,
  formatChatroom,
  getChatroomsId,
  dateCompare,
  isEmltyObject,
  getIds,
};
