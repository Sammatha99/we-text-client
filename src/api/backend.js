import axios from "axios";
import url from "./constants";

import { storage, utilFunction } from "../utils";
import { newTokens, fakeDelay } from "../utils/fakeData";

const backendWithoutAuth = axios.create({
  baseURL: url,
  timeout: 5000000,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
  },
});

const getNewAccessToken = async () => {
  // TODO fix lai
  // const res = await backendWithoutAuth.post("/refresh-tokens", {
  //   refreshToken: storage.rfTokenStorage.get(),
  // });
  const res = { data: await fakeDelay(newTokens) };
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
          Authorization: "Bearer Token" + acToken.token,
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
          await getNewAccessToken();
          return axios.create({
            baseURL: url,
            timeout: 5000000,
            headers: {
              Authorization: "Bearer Token" + acToken.token,
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
