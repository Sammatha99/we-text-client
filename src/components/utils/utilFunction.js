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
  // lọc members để loại bỏ chính mình đi
  const myIndex = chatroom.members.findIndex((id) => id === thisUserId);
  chatroom.members.splice(myIndex, 1);
  chatroom.membersPopulate.splice(myIndex, 1);

  // kiếm name cho chatroom
  if (!chatroom.name) {
    const names = [];
    chatroom.membersPopulate.forEach((member) => {
      names.push(member.name);
    });
    chatroom.name = names.join(", ");
  }

  return chatroom;
};

export { chatRoomStatus, formatChatroom };
