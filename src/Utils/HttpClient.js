import axios from "axios";

export const HttpClient = Object.freeze({
  request: async (
    method,
    url,
    body,
    headers = {},
    options = {},
    sendAuthorizationHeader = true,
    suppressErrors = true
  ) => {
    if (sendAuthorizationHeader) {
      headers = {
        ...headers,
        Authorization: await getAuthorizationHeader(),
      };
    }
    let response = null;

    try {
      response = await axios({
        method: method,
        url: url,
        data: body,
        headers,
        ...options,
      });
    } catch (e) {
      if (suppressErrors) {
        console.log("error in HttpClient.request", e);
      } else {
        throw e;
      }
    }
    return response;
  },
});

export const BackEnd = Object.freeze({
  request: async (
    method,
    path,
    body,
    additionalHeaders = {},
    options = {},
    sendAuthorizationHeader = true,
    suppressErrors = true
  ) => {
    const url =
      process.env.REACT_APP_API_URL || "https://sudogg-be.azurewebsites.net";
    return HttpClient.request(
      method,
      url + path,
      body,
      additionalHeaders,
      options,
      sendAuthorizationHeader,
      suppressErrors
    );
  },
  get: async (
    path,
    body,
    additionalHeaders = {},
    options = {},
    suppressErrors = true
  ) =>
    BackEnd.request(
      "GET",
      path,
      body,
      additionalHeaders,
      options,
      suppressErrors
    ),
  post: async (
    path,
    body,
    additionalHeaders = {},
    options = {},
    sendAuthorizationHeader = true,
    suppressErrors = true
  ) =>
    BackEnd.request(
      "POST",
      path,
      body,
      additionalHeaders,
      options,
      sendAuthorizationHeader,
      suppressErrors
    ),
});

/* Utility methods */

/**
 * Fetch token from the session storage.
 */
const getAuthorizationHeader = async () => {
  let token = `Bearer ${sessionStorage.getItem("jwt")}`;
  return token;
};

const parseJwt = (token) => {
  const base64Url = token.split(".", 2)[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
};

const unhashToken = async (token) => {
  let result = true;
  if (token) {
    const hashedToken = token.split("Bearer ", 2)[1];
    if (hashedToken) {
      const tokenNotHashed = await parseJwt(hashedToken);
      result = new Date(tokenNotHashed.exp * 1000) <= new Date(Date.now());
    }
  }
  return result;
};
