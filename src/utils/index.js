import createDataTree from "./createDataTree";
import routeToOption from "./routeToOption";
import routeChildrenExtractor from "./routeChildrenExtractor";
import degreeDmsConvertor from "./degreeDmsConvertor";
import fieldNameCompiler from "./fieldNameCompiler";

import {
  TOKEN_KEY,
  REFRESH_TOKEN_KEY,
  TOKEN_EXPIRY_KEY,
  FULL_NAME_KEY,
} from "constants";

export const logout = () => {
  localStorage.clear();
  window, location.reload();
};

export const isExpired = (dateString) =>
  Math.sign(Date(dateString).valueOf() - Date.now()) === -1;

export const timeToExpire = () =>
  new Date(getLocalUserInfo("AccessTokenExpiryTime")).valueOf() - Date.now(); // in milliseconds;

export const isAuthenticatedApprove = (Token, AccessTokenExpiryTime) =>
  !isExpired(AccessTokenExpiryTime) && !!Token;

export const getLocalUserInfo = (key) => {
  const Body = {
    Token: localStorage.getItem(TOKEN_KEY),
    FullName: localStorage.getItem(FULL_NAME_KEY),
    RefreshToken: localStorage.getItem(REFRESH_TOKEN_KEY),
    AccessTokenExpiryTime: localStorage.getItem(TOKEN_EXPIRY_KEY),
    isAuthenticated: isAuthenticatedApprove(
      localStorage.getItem(TOKEN_KEY),
      localStorage.getItem(TOKEN_EXPIRY_KEY)
    ),
  };
  return key ? Body[key] : {Body};
};

export const setLocalUserInfo = (Body) => {
  const {Token, FullName, RefreshToken, AccessTokenExpiryTime} = Body;

  localStorage.setItem(TOKEN_KEY, Token);
  localStorage.setItem(FULL_NAME_KEY, FullName);
  localStorage.setItem(REFRESH_TOKEN_KEY, RefreshToken);
  localStorage.setItem(TOKEN_EXPIRY_KEY, AccessTokenExpiryTime);
};

export {
  createDataTree,
  routeToOption,
  routeChildrenExtractor,
  degreeDmsConvertor,
  fieldNameCompiler,
};
