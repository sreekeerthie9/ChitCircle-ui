"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { api } from "@/utils/APIMethods";

export const useApiQuery = ({ key, url, authConfig, params, enabled = true }) =>
  useQuery({
    queryKey: [key, params],
    queryFn: () => api({ url, params }, authConfig),
    enabled: Boolean(enabled && url)
  });

export const useApiMutation = ({ key, url, method = "POST", authConfig, onSuccess }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (body) => api({ url, method, body }, authConfig),
    onSuccess: async (data) => {
      await queryClient.invalidateQueries({ queryKey: [key] });
      onSuccess?.(data);
    }
  });
};
