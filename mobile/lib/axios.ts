import axios from "axios";
import { useAuth } from "@clerk/clerk-expo";
import { useEffect } from "react";

const API_URL = "https://bramble-thmm6.sevalla.app/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const useApi = () => {
  const { getToken } = useAuth();

  useEffect(() => {
    const requestInterceptor = api.interceptors.request.use(async (config) => {
      const token = await getToken();
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    });
    return () => {
      api.interceptors.request.eject(requestInterceptor);
    };
  }, [getToken]);

  return api;
};
