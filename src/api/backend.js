import axios from "axios";

import { swal } from "../components/utils";

import { localStorage, utilFunction } from "../utils";

const url = "https://quiet-bayou-43878.herokuapp.com/v1";

const backendWithoutAuth = axios.create({
  baseURL: url,
  timeout: 5000000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const getNewAccessToken = async () => {
  const res = await backendWithoutAuth.post("/auth/refresh-tokens", {
    refreshToken: localStorage.rfTokenStorage.get().token,
  });
  localStorage.acTokenStorage.set(res.data.access);
  localStorage.rfTokenStorage.set(res.data.refresh);
};

const backendWithAuth = async () => {
  let acToken = localStorage.acTokenStorage.get(); // {token, expires}
  const today = Date.now() + 5000;
  let isExpire;
  if (acToken.token) {
    isExpire = utilFunction.dateCompare(today, acToken.expires);
    if (isExpire === -1) {
      // access token còn hạn
      return axios.create({
        baseURL: url,
        timeout: 5000000,
        headers: {
          Authorization: "Bearer " + acToken.token,
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        },
      });
    } else {
      // access token hết hạn

      const rfToken = localStorage.rfTokenStorage.get();
      if (rfToken.token) {
        isExpire = utilFunction.dateCompare(today, rfToken.expires);
        if (isExpire === -1) {
          // get new accesstoken
          await getNewAccessToken();
          acToken = localStorage.acTokenStorage.get();
          return axios.create({
            baseURL: url,
            timeout: 5000000,
            headers: {
              Authorization: "Bearer " + acToken.token,
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods":
                "GET,PUT,POST,DELETE,PATCH,OPTIONS",
            },
          });
        } else {
          // send backend logout and remove all localstorage
          await backendWithoutAuth.post("/auth/logout", {
            refreshToken: localStorage.rfTokenStorage.get().token,
          });
          localStorage.storage.removeAll();
          swal.showWarningSwal("End of session, please login again");
        }
      }
    }
  }
  return null; // if(=== null){ dispatch(logout()) -> go to login page }
};

export { backendWithAuth, backendWithoutAuth };
