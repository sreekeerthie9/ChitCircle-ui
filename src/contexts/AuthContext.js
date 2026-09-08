"use client";

import { fetchRefreshToken } from "@/utils/APIMethods";
import { useQuery } from "@tanstack/react-query";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer
} from "react";

const AuthContext = createContext();

const emptyState = {
  id: null,
  accessToken: null,
  refreshToken: null,
  username: null,
  role: null,
  authType: null,
  featurePermissions: null,
};

const parseStoredJson = (value, fallback = null) => {
  if (!value || value === "undefined" || value === "null") {
    return fallback;
  }

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
};

function authReducer(state, action) {
  switch (action.type) {
    case "onLogin": {
      const {
        id,
        accessToken,
        refreshToken,
        role,
        username,
        authType,
        featurePermissions
      } = action.payload;
      const normalizedAccessToken = accessToken || action.payload.authToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("id", id);
        localStorage.setItem("accessToken", normalizedAccessToken || "");
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);
        localStorage.setItem("roleConfig", JSON.stringify(role));
        localStorage.setItem("authType", authType);
        localStorage.setItem(
          "featurePermissions",
          JSON.stringify(featurePermissions)
        );
       
      }

      return {
        ...state,
        id,
        accessToken: normalizedAccessToken,
        refreshToken,
        username,
        role,
      authType,
      featurePermissions
      };
    }

    case "onRefresh": {
      const {
        id,
        accessToken,
        refreshToken,
        role,
      
        username,
        authType,
        featurePermissions
      } = action.payload;
      const normalizedAccessToken = accessToken || action.payload.authToken;
      if (typeof window !== "undefined") {
        localStorage.setItem("id", id);
        localStorage.setItem("accessToken", normalizedAccessToken || "");
        localStorage.setItem("refreshToken", refreshToken);
        localStorage.setItem("username", username);
        localStorage.setItem("roleConfig", JSON.stringify(role));
        localStorage.setItem("authType", authType);
        localStorage.setItem(
          "featurePermissions",
          JSON.stringify(featurePermissions)
        );
       
      }

      return {
        ...state,
        id,
        accessToken: normalizedAccessToken,
        refreshToken,
        username,
        role,
        authType,
        featurePermissions
      };
    }

    case "onLogout": {
      if (typeof window !== "undefined") {
        window.localStorage.clear();
      }
      return {
        id: null,
        accessToken: null,
        refreshToken: null,
        username: null,
        role: null,
        authType: null,
        featurePermissions: null
      };
    }

    default:
      throw new Error("Invalid action type");
  }
}

const loadInitialState = () => {
  // server
  if (typeof window === "undefined") {
    return emptyState;
  }

  // client
  return {
    id: localStorage.getItem("id"),
    accessToken: window.localStorage.getItem("accessToken"),
    refreshToken: window.localStorage.getItem("refreshToken"),
    username: window.localStorage.getItem("username"),
    role: parseStoredJson(window.localStorage.getItem("roleConfig")),
    user: parseStoredJson(window.localStorage.getItem("user")),
    authType: window.localStorage.getItem("authType"),
    featurePermissions: parseStoredJson(
      window.localStorage.getItem("featurePermissions")
    )
  };
};

export default function AuthContextProvider({ children }) {
  const [authConfig, dispatch] = useReducer(authReducer, loadInitialState());

  useQuery({
    queryKey: ["refreshToken"],
    queryFn: () =>
      fetchRefreshToken({
        refreshToken: authConfig.refreshToken,
        refetchPreviousFailedRequest: false
      }),
    retry: false,
    refetchInterval: 10 * 30 * 1000,
    enabled: !!authConfig?.refreshToken
  });

  useEffect(() => {
    globalThis.authDispatch = dispatch;
  }, []);

  const isAuthenticated = useMemo(() => {
    return Boolean(authConfig.accessToken);
  }, [authConfig]);

  const parsedRoleConfig = useMemo(() => {
    if (authConfig.featurePermissions) {
      const { features = [] } = authConfig.featurePermissions;

      const modeConfig = features.reduce((accumulator, feature) => {
        const mappings = [
          { type: "Read", code: 1 },
          { type: "Create", code: 2 },
          { type: "Update", code: 4 },
          { type: "Delete", code: 4 }
        ];
        const code = feature.permissionCode ?? 0;
        const permissions = mappings
          .filter((obj) => (obj.code & code) === obj.code)
          .map((obj) => obj.type);
        const featureName = feature.code;
        return { ...accumulator, [featureName]: permissions };
      }, {});
      return modeConfig;
    }
    return null;
  }, [authConfig]);

  const authContext = useMemo(
    () => ({
      isAuthenticated,
      authConfig,
      dispatch
    }),
    [authConfig, isAuthenticated]
  );

  return (
    <AuthContext.Provider value={authContext}>{children}</AuthContext.Provider>
  );
}

export const useAuthContext = () => useContext(AuthContext);
