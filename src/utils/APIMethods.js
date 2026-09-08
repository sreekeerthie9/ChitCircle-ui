import APIConstants from "@/constants/APIConstants";

const sanitizeURL = (url) => {
  let result = url;
  if (url.endsWith("/")) {
    result = url.slice(0, url.length - 1);
  }
  return result;
};

const generateHeaders = (authConfig, requestHeaders, isFormData) => {
  const headers = new Headers();
  if (authConfig) {
    headers.append("session", authConfig.refreshToken);
    headers.append("Authorization", `Bearer ${authConfig.accessToken}`);
  }
  if (!isFormData) {
    headers.append("Content-Type", "application/json");
  }
  Object.keys(requestHeaders).forEach((key) =>
    headers.append(key, requestHeaders[key])
  );

  return headers;
};

const TOKEN_EXPIRE_STATUS_CODES = [401];

export const fetchRefreshToken = async ({
  response: oldRes,
  requestObject,
  refreshToken,
  refetchPreviousFailedRequest = true
}) => {
  const headers = new Headers();
  headers.append("session", refreshToken);
  return fetch(APIConstants.refreshToken, {
    method: "POST",
    headers
  })
    .then(async (refreshTokenResponse) => {
      if (refreshTokenResponse.status === 200) {
        const responseBody = await refreshTokenResponse.json();
        const responseData = responseBody?.success ? responseBody.data : responseBody;
        if (typeof global !== "undefined") {
          globalThis.authDispatch({
            type: "onRefresh",
            payload: responseData
          });
        }

        if (!refetchPreviousFailedRequest) {
          return refreshTokenResponse;
        }

        const requestURL = oldRes.url;
        requestObject.headers.set(
          "Authorization",
          `Bearer ${responseData.authToken}`
        );
        return fetch(requestURL, requestObject).then((response) => response);
      }
      return refreshTokenResponse;
    })
    .then((response) => {
      if (TOKEN_EXPIRE_STATUS_CODES.includes(response.status)) {
        if (typeof global !== "undefined") {
          globalThis.authDispatch({ type: "onLogout" });
        }
        console.error("Session Expired. Logging out");
      }
      return response;
    });
};

const checkAuthentication = ({
  response,
  requestObject,
  refreshToken = "",
  checkAuth
}) => {
  if (checkAuth && TOKEN_EXPIRE_STATUS_CODES.includes(response.status)) {
    return fetchRefreshToken({ response, requestObject, refreshToken });
  }
  return response;
};

const errorResponses = [
  400, 401, 403, 404, 405, 409, 415, 406, 500, 412, 415, 502
];

async function checkError(response) {
  if (errorResponses.includes(response.status)) {
    const payload = await response.json();
    throw payload?.error || payload;
  }
  return response;
}

export const api = async (
  {
    url = "",
    method = "GET",
    requestHeaders = {},
    params,
    body = null,
    isFormData = false,
    checkAuth = true,
    getResponse = true,
    responseType = "json"
  },
  authConfig = null
) => {
  const headers = generateHeaders(authConfig, requestHeaders, isFormData);
  const paramString = new URLSearchParams(params).toString();
  const sanitizedURL = sanitizeURL(url);
  const requestURL = params ? `${sanitizedURL}?${paramString}` : sanitizedURL;
  let requestObject = { headers, method };

  if (body) {
    requestObject = {
      ...requestObject,
      body: isFormData ? body : JSON.stringify(body)
    };
  }

  return fetch(requestURL, requestObject)
    .then((response) =>
      checkAuthentication({
        response,
        requestObject,
        refreshToken: authConfig?.refreshToken,
        checkAuth
      })
    )
    .then(checkError)
    .then(async (response) => {
      if (!getResponse || response.status === 204) return;

      if (responseType === "text") {
        return response.text();
      }
      if (responseType === "blob") {
        return response.blob();
      }
      const payload = await response.json();
      return payload?.success ? payload.data : payload;
    });
};
