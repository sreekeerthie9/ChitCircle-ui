"use client";
import { useMediaQuery, useTheme } from "@mui/material";

const useResponsive = () => {
  const theme = useTheme();
  return {
    isMobile: useMediaQuery(theme.breakpoints.down("sm"), { noSsr: true }),
    isTablet: useMediaQuery(theme.breakpoints.down("md"), { noSsr: true }),
    isDesktop: useMediaQuery(theme.breakpoints.up("md"), { noSsr: true })
  };
};

export default useResponsive;
