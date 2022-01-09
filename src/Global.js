import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import io from "socket.io-client";

import { localStorage } from "./utils";
import { chatroomsAction } from "./features";

let socket;

export default function Global() {
  const dispatch = useDispatch();
  
  useEffect(() => {
    window.addEventListener("beforeunload", (e) => {
      e.preventDefault();
      const userId = localStorage.userIdStorage.get();
      userId && socket.emit("logout", userId);

      socket.off("login");
      socket.off("logout");
      socket.off("join-new-chatroom");
      socket.off("receive-message");
      socket.off("receive-seen-message");
      return () => {
        window.removeEventListener("beforeunload");
      };
    });

    socket = io("http://localhost:3000");

    socket.on("login", (userId) => {
      console.log("login: ", userId);
      dispatch(
        chatroomsAction.updateUserStatusInChatroom({ userId, status: true })
      );
    });

    socket.on("logout", (userId) => {
      console.log("logout: ", userId);
      dispatch(
        chatroomsAction.updateUserStatusInChatroom({ userId, status: false })
      );
    });

    return () => {
      window.removeEventListener("beforeunload");
    };
  }, []);

  return <></>;
}

export { socket };
