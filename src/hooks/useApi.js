"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { MESSAGE_TYPE } from "@/constants/Common";
import { useSnackbar } from "@/contexts/SnackbarProvider";
import { api } from "@/utils/APIMethods";

export const useApiQuery = ({ key, url, authConfig, params, enabled = true }) =>
  useQuery({
    queryKey: [key, params],
    queryFn: () => api({ url, params }, authConfig),
    enabled: Boolean(enabled && url)
  });

export const useApiMutation = ({
  key,
  url,
  method = "POST",
  authConfig,
  onSuccess,
  onError,
  successMessage,
}) => {
  const queryClient = useQueryClient();
  const showSnackbar = useSnackbar();
  return useMutation({
    mutationFn: (body) => api({ url, method, body }, authConfig),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [key] });
      const defaultMessage = {
        POST: "Created successfully",
        PUT: "Saved successfully",
        PATCH: "Updated successfully",
        DELETE: "Deleted successfully",
      }[method] || "Request completed successfully";
      showSnackbar(successMessage || defaultMessage, MESSAGE_TYPE.success);
      onSuccess?.(data);
    },
    onError: (error) => {
      showSnackbar(
        error?.message || "We could not complete that request. Please try again.",
        MESSAGE_TYPE.error,
      );
      onError?.(error);
    },
  });
};
