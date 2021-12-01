import React from "react";
import { UserCard, ChatCard } from ".";

const listNumber = [0, 1, 2, 3];

const LoadingContacts = () => {
  return listNumber.map((index) => <UserCard key={index} />);
};

const LoadingChats = () => {
  return listNumber.map((index) => <ChatCard key={index} />);
};

export { LoadingContacts, LoadingChats };
