// import { useEffect } from "react";
// import io from "socket.io-client";
// let socket;

// TODO 1 react-router-dom
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
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector } from "react-redux";

import { constants } from "./utils";
import { PublicRoute, PrivateRoute } from "./routes";
import { MainDashboard, NotFoundPage, AuthPages } from "./components";
import { BackgroundScreen } from "./components/dashboard";
import React from "react";

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
  const thisUser = useSelector((state) => state.thisUser.value);
  const isLoggin = thisUser != null;

  return (
    <>
      <BackgroundScreen />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute
                Component={<MainDashboard />}
                isAuthenticated={isLoggin}
              />
            }
          />
          {constants.tabs.map((tab) => (
            <Route
              key={tab.name}
              path={`/${tab.name}`}
              element={
                <PrivateRoute
                  Component={<MainDashboard tab={tab.name} />}
                  isAuthenticated={isLoggin}
                />
              }
            />
          ))}
          <Route
            path={constants.routePath.loginPath}
            element={
              <PublicRoute
                isAuthenticated={isLoggin}
                Component={<AuthPages.Login />}
              />
            }
          />
          <Route
            path={constants.routePath.registerPath}
            element={
              <PublicRoute
                isAuthenticated={isLoggin}
                Component={<AuthPages.Register />}
              />
            }
          />
          <Route
            path={constants.routePath.forgotPasswordPath}
            element={
              <PublicRoute
                isAuthenticated={isLoggin}
                Component={<AuthPages.ForgotPassword />}
              />
            }
          />
          <Route
            path={constants.routePath.verifyEmailPath}
            element={
              <PublicRoute
                isAuthenticated={isLoggin}
                Component={<AuthPages.VerifyEmail />}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
