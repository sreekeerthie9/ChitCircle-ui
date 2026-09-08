"use client";

import {
  QueryClient,
  QueryClientProvider as QueryClientProviderBase
} from "@tanstack/react-query";

let browserQueryClient;

const makeQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: 1,
        refetchOnWindowFocus: false,
        staleTime: 3 * 60 * 1000,
        refetchOnMount: true
      }
    }
  });

const getQueryClient = () => {
  if (typeof window === "undefined") {
    return makeQueryClient();
  } else {
    if (!browserQueryClient) {
      browserQueryClient = makeQueryClient();
    }
    return browserQueryClient;
  }
};

const QueryClientProvider = ({ children }) => {
  const queryClient = getQueryClient();

  return (
    <QueryClientProviderBase client={queryClient}>
      {children}
    </QueryClientProviderBase>
  );
};

export default QueryClientProvider;

// https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr
