import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { useCallback } from "react";

const API_URL = "https://whisper-ijeje.sevalla.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      // Sadece 503 hariç logla
      if (error.response.status !== 503) {
        console.error(
          `API request failed: ${error.config?.method?.toUpperCase()} ${error.config?.url}`,
          {
            status: error.response.status,
          },
        );
      }
    }
    return Promise.reject(error);
  },
);

export const useApi = () => {
  const { getToken } = useAuth();

  const apiWithAuth = useCallback(
    async <T>(config: Parameters<typeof api.request>[0]) => {
      const token = await getToken();
      return api.request<T>({
        ...config,
        headers: {
          ...config.headers,
          ...(token && { Authorization: `Bearer ${token}` }),
        },
      });
    },
    [getToken],
  );

  return { api, apiWithAuth };
};
