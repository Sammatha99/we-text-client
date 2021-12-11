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

export { chatRoomStatus, formatChatroom };
