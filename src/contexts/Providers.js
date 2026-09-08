"use client";

import dayjs from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import AuthContextProvider from "./AuthContext";
import QueryClientProvider from "./QueryClientProvider";
import { SnackbarProvider } from "./SnackbarProvider";

const Providers = ({ children }) => {
  dayjs.extend(utc);
  dayjs.extend(timezone);

  return (
    <QueryClientProvider>
      <AuthContextProvider>
     
          <SnackbarProvider>{children}</SnackbarProvider>
        
      </AuthContextProvider>
    </QueryClientProvider>
  );
};

export default Providers;
