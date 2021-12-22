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
import React, { useEffect, useMemo, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { constants, localStorage } from "./utils";
import { PublicRoute, PrivateRoute, VerifyEmailRoute } from "./routes";
import { MainDashboard, NotFoundPage, AuthPages } from "./components";
import { thisUserAction } from "./features";
import { backendWithoutAuth } from "./api/backend";
import { catchError, LoadingComponent } from "./components/utils";

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

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const thisUser = useSelector((state) => state.thisUser.value);
  const isLogin = useMemo(() => !!thisUser, [thisUser]);
  const isEmailVerified = useMemo(
    () => !!thisUser && thisUser.isEmailVerified,
    [thisUser]
  );

  useEffect(() => {
    async function loadApp() {
      const userId = localStorage.userIdStorage.get();

      try {
        if (userId != null) {
          const res = await backendWithoutAuth.get(`/users/${userId}`);
          dispatch(thisUserAction.login(res.data));
        }
      } catch (err) {
        catchError(err);
      }

      setLoading(false);
    }
    loadApp();
    return () => {};
  }, [dispatch]);

  return (
    <>
      {loading ? (
        <LoadingComponent.LoadingApp />
      ) : (
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <PrivateRoute
                  Component={<MainDashboard />}
                  isAuthenticated={isLogin}
                  isEmailVerified={isEmailVerified}
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
                    isAuthenticated={isLogin}
                    isEmailVerified={isEmailVerified}
                  />
                }
              />
            ))}
            <Route
              path={constants.routePath.loginPath}
              element={
                <PublicRoute
                  isAuthenticated={isLogin}
                  Component={<AuthPages.Login />}
                />
              }
            />
            <Route
              path={constants.routePath.registerPath}
              element={
                <PublicRoute
                  isAuthenticated={isLogin}
                  Component={<AuthPages.Register />}
                />
              }
            />
            <Route
              path={constants.routePath.forgotPasswordPath}
              element={
                <PublicRoute
                  isAuthenticated={isLogin}
                  Component={<AuthPages.ForgotPassword />}
                />
              }
            />
            <Route
              path={constants.routePath.verifyEmailPath}
              element={
                <VerifyEmailRoute
                  isAuthenticated={isLogin}
                  isEmailVerified={isEmailVerified}
                  Component={<AuthPages.VerifyEmail />}
                />
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Router>
      )}
    </>
  );
}

export default App;
