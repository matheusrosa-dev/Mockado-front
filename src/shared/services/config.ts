import { useSessionStore } from "@shared/stores";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { useAuthService } from "./auth/hook";

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL as string;

export const api = axios.create({
  baseURL: API_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const { session, destroySession } = useSessionStore.getState();
    const { refreshSession } = useAuthService();

    if (error.status === 401) {
      if (session) {
        try {
          // TODO: FAZER O CREATE SESSION DE NOVO QUANDO A API IMPLEMENTAR O RETORNO DOS DADOS DO USUARIO
          await refreshSession();

          return api.request(error.config as AxiosRequestConfig);
        } catch (err) {
          const error = err as AxiosError;

          if (error.status === 401) {
            destroySession();

            return;
          }
        }
      }
      return Promise.reject(error);
    }

    return Promise.reject(error);
  },
);
