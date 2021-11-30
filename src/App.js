// import { useEffect } from "react";
// import io from "socket.io-client";
// let socket;
import Login from "./components/auth/login/Login";
import Register from "./components/auth/register/Register";
import ForgotPassword from "./components/auth/forgotPassword/ForgotPassword";
import MainDashboard from "./components/dashboard/MainDashboard";
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
} from "@fortawesome/free-solid-svg-icons";

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
  faEllipsisH
);

function App() {
  // useEffect(() => {
  //   socket = io("http://localhost:3000");
  // }, []);
  // return <Login />;
  // return <Register />;
  // return <ForgotPassword />;
  return <MainDashboard />;
}

export default App;
