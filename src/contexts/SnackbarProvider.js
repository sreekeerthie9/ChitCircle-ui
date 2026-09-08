"use client";

import { MESSAGE_TYPE } from "@/constants/Common";
import joyTheme from "@/constants/JoyTheme";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoIcon from "@mui/icons-material/Info";
import { CssVarsProvider, IconButton } from "@mui/joy";
import Snackbar from "@mui/joy/Snackbar";
import { createContext, useCallback, useContext, useState } from "react";

const SnackbarContext = createContext();

const messageTypes = {
  [MESSAGE_TYPE.info]: {
    icon: <InfoIcon fontSize="small" />,
    styles: { backgroundColor: "#e8eee5", borderColor: "#9aab9e", color: "#173c35" },
  },
  [MESSAGE_TYPE.success]: {
    icon: <CheckCircleIcon fontSize="small" />,
    styles: { backgroundColor: "#e5f0e6", borderColor: "#3c8060", color: "#173c35" },
  },
  [MESSAGE_TYPE.error]: {
    icon: <ErrorOutlineIcon fontSize="small" />,
    styles: { backgroundColor: "#fbe8df", borderColor: "#b85c38", color: "#7a2f1a" },
  },
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
          autoHideDuration={4000}
          onClose={hideSnackbar}
          variant="outlined"
          color="neutral"
          sx={{
            ...snackBarState.messageType.styles,
            alignItems: "center",
            borderRadius: "0.45rem",
            borderWidth: "1px",
            boxShadow: "0 12px 30px rgba(23, 60, 53, 0.18)",
            fontFamily: "Poppins, sans-serif",
            fontSize: "0.82rem",
            fontWeight: 700,
            gap: "0.55rem",
            maxWidth: "min(28rem, calc(100vw - 2rem))",
            padding: "0.75rem 0.85rem 0.75rem 1rem",
          }}
        >
          {snackBarState.messageType.icon}
          <span style={{ flex: 1 }}>{snackBarState.message}</span>
          <IconButton
            aria-label="Dismiss notification"
            color="neutral"
            onClick={hideSnackbar}
            size="sm"
            variant="plain"
            sx={{ color: "inherit", marginLeft: "0.2rem" }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Snackbar>
      </CssVarsProvider>
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  const { showSnackbar } = useContext(SnackbarContext);
  return showSnackbar;
};
