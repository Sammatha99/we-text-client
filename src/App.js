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
import {  backendWithoutAuth } from "./api/backend";
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
          // await updateUserArrayRelationship(userId);
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

  // const updateUserArrayRelationship = async (userId) => {
  //   const ids = [
  //     "6198879b0ffff891fca6bf0f",
  //     "619887a90ffff891fca6bf14",
  //     "619887d40ffff891fca6bf19",
  //     "619887de0ffff891fca6bf1e",
  //     "619887ea0ffff891fca6bf23",
  //     "619887f50ffff891fca6bf28",
  //     "619888110ffff891fca6bf2e",
  //     "61c0344ad4a6e67258d1aa6c",
  //     "61c426ababc2f39bc4bbd64c",
  //     "61c426e1abc2f39bc4bbd653",
  //     "61c42708abc2f39bc4bbd65a",
  //     "61c42748abc2f39bc4bbd661",
  //     "61c4277eabc2f39bc4bbd668",
  //     "61c4279aabc2f39bc4bbd66f",
  //     "61c427b5abc2f39bc4bbd676",
  //     "61c427c9abc2f39bc4bbd67d",
  //     "61c427e5abc2f39bc4bbd684",
  //     "61c427faabc2f39bc4bbd68b",
  //     "61c42818abc2f39bc4bbd692",
  //     "61c4282eabc2f39bc4bbd699",
  //     "61c42848abc2f39bc4bbd6a0",
  //     "61c4285aabc2f39bc4bbd6a7",
  //     "61c4287dabc2f39bc4bbd6ae",
  //     "61c42895abc2f39bc4bbd6b5",
  //     "61c428aaabc2f39bc4bbd6bc",
  //   ];

  //   try {
  //     const axios = await backendWithAuth();
  //     if (axios != null) {
  //       for (var id of ids) {
  //         console.log(id);
  //         await axios.patch(`/userDetails/${userId}/add-follower`, {
  //           userId: id,
  //         });
  //         await axios.patch(`/userDetails/${userId}/add-following`, {
  //           userId: id,
  //         });
  //         await axios.patch(`/userDetails/${userId}/add-contact`, {
  //           userId: id,
  //         });
  //       }
  //     }
  //   } catch (err) {
  //     catchError(err);
  //   }
  // };

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
