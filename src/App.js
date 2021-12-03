// import { useEffect } from "react";
// import io from "socket.io-client";
// let socket;

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
  faTimesCircle,
  faEllipsisH,
  faPhotoVideo,
  faPaperclip,
  faSmileBeam,
} from "@fortawesome/free-solid-svg-icons";

import { Login, Register, ForgotPassword } from "./components/auth";
import { MainDashboard } from "./components/dashboard";

library.add(
  fab,
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
  faTimesCircle,
  faEllipsisH,
  faPhotoVideo,
  faPaperclip,
  faSmileBeam
);

function App() {
  // useEffect(() => {
  //   socket = io("http://localhost:3000");
  // }, []);
  return <MainDashboard />;
}

export default App;
