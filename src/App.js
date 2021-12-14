// import { useEffect } from "react";
// import io from "socket.io-client";
// let socket;

// TODO 1 email-verify page
/*
/:tab/:id => mainDashboard: selectedTab = 'chats' , id -> [selectedChatroom, selectedUser]
/login
/register
/forgot-password
/verify-email
*/

import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faEye,
  faEyeSlash,
  faChevronRight,
  faChevronLeft,
  faThLarge,
  faUser,
  faCommentDots,
  faPowerOff,
  faSearch,
  faPlus,
  faTimes,
  faTimesCircle,
  faEllipsisH,
  faPhotoVideo,
  faPaperclip,
  faSmileBeam,
  faUserPlus,
  faChevronDown,
  faChevronUp,
  faStar,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCamera,
  faPenSquare,
  faPen,
  faPhoneSquareAlt,
  faLock,
} from "@fortawesome/free-solid-svg-icons";

import { MainDashboard, NotFoundPage, AuthPages } from "./components";

library.add(
  fab,
  faCheckSquare,
  faCoffee,
  faEye,
  faEyeSlash,
  faChevronRight,
  faChevronLeft,
  faChevronDown,
  faChevronUp,
  faThLarge,
  faUser,
  faCommentDots,
  faPowerOff,
  faSearch,
  faPlus,
  faTimes,
  faTimesCircle,
  faEllipsisH,
  faPhotoVideo,
  faPaperclip,
  faSmileBeam,
  faUserPlus,
  faStar,
  faEnvelope,
  faPhone,
  faMapMarkerAlt,
  faCamera,
  faPenSquare,
  faPen,
  faPhoneSquareAlt,
  faLock
);

function App() {
  // useEffect(() => {
  //   socket = io("http://localhost:3000");
  // }, []);
  return <AuthPages.Login />;
}

export default App;
