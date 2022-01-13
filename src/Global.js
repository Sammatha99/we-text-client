import React, { useEffect, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import io from "socket.io-client";

import { localStorage, utilFunction } from "./utils";
import { chatroomsAction, thisUserAction } from "./features";
import { backendWithAuth } from "./api/backend";

let socket;

export default function Global() {
  const dispatch = useDispatch();
  const chatrooms = useSelector((state) => state.chatrooms.value);
  const chatroomsRef = useRef();
  chatroomsRef.current = useMemo(() => chatrooms, [chatrooms]);

  useEffect(() => {
    const beforeunloadHandle = (e) => {
      e.preventDefault();
      const userId = localStorage.userIdStorage.get();
      userId && socket.emit("logout", userId);

      socket.off("login");
      socket.off("logout");
      socket.off("new-chatroom");
      socket.off("receive-message");
      socket.off("receive-add-member");
      socket.off("receive-remove-member");
      socket.off("receive-chatroom-name");
      socket.off("receive-seen-message");
      return () => {
        window.removeEventListener("beforeunload");
      };
    };

    window.addEventListener("beforeunload", beforeunloadHandle);

    socket = io("http://localhost:3000");

    socket.on("login", (userId) => {
      dispatch(
        chatroomsAction.updateUserStatusInChatroom({ userId, status: true })
      );
    });

    socket.on("logout", (userId) => {
      dispatch(
        chatroomsAction.updateUserStatusInChatroom({ userId, status: false })
      );
    });

    socket.on("new-chatroom", handleNewChatroom);
    socket.on("receive-message", handleRecieveMessage);
    socket.on("receive-add-member", handleRecieveNewMembers);
    socket.on("receive-remove-member", handleRecieveRemoveMember);
    socket.on("receive-chatroom-name", handleRecieveChatroomName);
    socket.on("receive-seen-message", handleRecieveSeenHistory);

    return () => {
      window.removeEventListener("beforeunload", beforeunloadHandle);
    };
  }, []);

  const handleNewChatroom = async (senderId, chatroomId) => {
    try {
      const userId = localStorage.userIdStorage.get();
      socket.emit("join-room", chatroomId);
      const axios = await backendWithAuth();
      if (axios) {
        const res = await axios.get(`/chatrooms/${chatroomId}`);
        Object.assign(res.data, utilFunction.formatChatroom(res.data, userId));
        dispatch(chatroomsAction.unshiftChatroom(res.data));
        if (senderId === userId) {
          dispatch(chatroomsAction.setSelectedChatroomById(res.data.id));
        }
      } else {
        dispatch(thisUserAction.logout());
      }
    } catch (err) {}
  };

  const handleRecieveMessage = (message, sender) => {
    const userId = localStorage.userIdStorage.get();
    if (!chatroomsRef.current.chatroomsId.includes(message.chatroomId)) {
      // update redux store: add and unshift
      try {
        backendWithAuth().then((axios) => {
          if (axios) {
            axios.get(`/chatrooms/${message.chatroomId}`).then((res) => {
              const newChatroom = utilFunction.formatChatroom(res.data, userId);
              dispatch(chatroomsAction.unshiftChatroom(newChatroom));
            });
          } else {
            dispatch(thisUserAction.logout());
          }
        });
      } catch (err) {}
    } else {
      // update redux : updateChatroom + unshiftChatroom
      const updateData = {
        lastMessage: message.id,
        lastMessagePopulate: message,
        time: message.time,
        id: message.chatroomId,
      };
      dispatch(chatroomsAction.updateChatroom(updateData));
      dispatch(chatroomsAction.unshiftChatroom(updateData));
    }
  };

  const handleRecieveNewMembers = (chatroomId) => {
    const userId = localStorage.userIdStorage.get();
    try {
      backendWithAuth().then((axios) => {
        if (axios) {
          axios.get(`/chatrooms/${chatroomId}`).then((res) => {
            const newChatroom = utilFunction.formatChatroom(res.data, userId);
            dispatch(chatroomsAction.updateChatroom(newChatroom));
            dispatch(chatroomsAction.unshiftChatroom(newChatroom));
          });
        } else {
          dispatch(thisUserAction.logout());
        }
      });
    } catch (err) {}
  };

  const handleRecieveRemoveMember = (message, sender) => {
    const userId = localStorage.userIdStorage.get();
    if (!chatroomsRef.current.chatroomsId.includes(message.chatroomId)) {
      // update redux store: add and unshift
      try {
        backendWithAuth().then((axios) => {
          if (axios) {
            axios.get(`/chatrooms/${message.chatroomId}`).then((res) => {
              const newChatroom = utilFunction.formatChatroom(res.data, userId);
              dispatch(chatroomsAction.unshiftChatroom(newChatroom));
            });
          } else {
            dispatch(thisUserAction.logout());
          }
        });
      } catch (err) {}
    } else {
      // update redux : updateChatroom + unshiftChatroom
      const updateData = {
        lastMessage: message.id,
        lastMessagePopulate: message,
        time: message.time,
        id: message.chatroomId,
      };
      dispatch(
        chatroomsAction.removeMemberChatroom({ updateData, removeUser: sender })
      );
      dispatch(chatroomsAction.unshiftChatroom(updateData));
    }
  };

  const handleRecieveChatroomName = (newName, message) => {
    const userId = localStorage.userIdStorage.get();
    if (!chatroomsRef.current.chatroomsId.includes(message.chatroomId)) {
      try {
        backendWithAuth().then((axios) => {
          if (axios) {
            axios.get(`/chatrooms/${message.chatroomId}`).then((res) => {
              const newChatroom = utilFunction.formatChatroom(res.data, userId);
              dispatch(chatroomsAction.unshiftChatroom(newChatroom));
            });
          } else {
            dispatch(thisUserAction.logout());
          }
        });
      } catch (err) {}
    } else {
      const updateData = {
        name: newName,
        lastMessage: message.id,
        lastMessagePopulate: message,
        time: message.time,
        id: message.chatroomId,
      };
      dispatch(chatroomsAction.updateChatroom(updateData));
      dispatch(chatroomsAction.unshiftChatroom(updateData));
    }
  };

  const handleRecieveSeenHistory = (chatroomId, seenHistory) => {
    dispatch(chatroomsAction.updateSeenHistory({ chatroomId, seenHistory }));
  };

  return <></>;
}

export { socket };
