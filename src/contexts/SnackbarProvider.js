"use client";

import { MESSAGE_TYPE } from "@/constants/Common";
import joyTheme from "@/constants/JoyTheme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import { CssVarsProvider } from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";
import { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext();

const messageTypes = {
  [MESSAGE_TYPE.info]: { type: "neutral", icon: <InfoIcon /> },
  [MESSAGE_TYPE.success]: { type: "primary", icon: <CheckCircleIcon /> },
  [MESSAGE_TYPE.error]: { type: "danger", icon: <ErrorOutlineIcon /> }
};

export const SnackbarProvider = ({ children }) => {
  const [snackBarState, setSnackBarState] = useState({
    message: "",
    open: false,
    placement: { vertical: "top", horizontal: "center" },
    messageType: messageTypes.success
  });

  const showSnackbar = useCallback(
    (
      message,
      type = MESSAGE_TYPE.success,
      placement = { vertical: "top", horizontal: "center" }
    ) =>
      setSnackBarState({
        message,
        open: true,
        placement,
        messageType: messageTypes[type] || messageTypes.success
      }),
    []
  );

  const hideSnackbar = () => {
    setSnackBarState((prev) => ({ ...prev, open: false }));
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      {children}
      <CssVarsProvider theme={joyTheme}>
        <Snackbar
          open={snackBarState.open}
          anchorOrigin={snackBarState.placement}
          autoHideDuration={2000}
          onClose={hideSnackbar}
          variant="outlined"
          color={snackBarState.messageType.type}
          sx={{ padding: "8px 16px", fontFamily: "Poppins" }}
        >
          {snackBarState.messageType.icon}
          {snackBarState.message}
        </Snackbar>
      </CssVarsProvider>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  return showSnackbar;
};
