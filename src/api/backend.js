import axios from "axios";

import { storage, utilFunction } from "../utils";

const url = "http://localhost:3000/v1";

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
    refreshToken: storage.rfTokenStorage.get().token,
  });
  console.log("get new tokens: ", res);
  storage.acTokenStorage.set(res.data.access);
  storage.rfTokenStorage.set(res.data.refresh);
};

const backendWithAuth = async () => {
  const acToken = storage.acTokenStorage.get(); // {token, expires}
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
      const rfToken = storage.rfTokenStorage.get();
      if (rfToken.token) {
        isExpire = utilFunction.dateCompare(today, rfToken.expires);
        if (isExpire === -1) {
          // get new accesstoken
          console.log("Access Token hết hạn, Refresh token còn hạn");
          await getNewAccessToken();
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
          alert("End of session, please login again");
        }
      }
    }
  }
  return null; // if(=== null){ dispatch(logout()) -> go to login page }
};

export { backendWithAuth, backendWithoutAuth };
