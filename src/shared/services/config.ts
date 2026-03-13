import { useSessionStore } from "@shared/stores";
import axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { useAuthService } from "./auth/hook";

const API_BACKEND_URL = import.meta.env.VITE_API_BACKEND_URL as string;

type RetryableAxiosRequestConfig = AxiosRequestConfig & {
  _retry?: boolean;
};

export const api = axios.create({
  baseURL: API_BACKEND_URL,
  withCredentials: true,
});

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    // 1) Lemos o estado atual da sessao e o metodo que tenta renovar o token.
    const { session, destroySession } = useSessionStore.getState();
    const { refreshSession } = useAuthService();

    // 2) Guardamos a request original para possivel replay apos refresh.
    const originalRequest = error.config as RetryableAxiosRequestConfig;

    // 3) Se nao for 401, nao ha fluxo de autenticacao para tratar.
    if (error.response?.status !== 401) {
      return Promise.reject(error);
    }

    // 4) Sem request original nao e possivel repetir a chamada com seguranca.
    if (!originalRequest) {
      return Promise.reject(error);
    }

    // 5) Nunca tentamos refresh quando o proprio endpoint de refresh falha.
    //    Isso evita recursao infinita no interceptor.
    if (originalRequest.url?.includes("/auth/refresh")) {
      destroySession();

      return Promise.reject(error);
    }

    // 6) Se nao existe sessao local, nao faz sentido tentar renovar.
    if (!session) {
      return Promise.reject(error);
    }

    // 7) Se essa request ja foi tentada apos refresh, encerramos e limpamos sessao.
    //    Evita loop quando o backend continua retornando 401.
    if (originalRequest._retry) {
      destroySession();

      return Promise.reject(error);
    }

    // 8) Marcamos a request como "ja retentada" antes de renovar a sessao.
    originalRequest._retry = true;

    try {
      // 9) Tenta renovar credenciais e, em sucesso, repete a request original.
      // TODO: FAZER O CREATE SESSION DE NOVO QUANDO A API IMPLEMENTAR O RETORNO DOS DADOS DO USUARIO
      await refreshSession();

      return api.request(originalRequest);
    } catch (refreshError) {
      // 10) Se ate o refresh retornar 401, invalida sessao local definitivamente.
      const refreshStatus = (refreshError as AxiosError).response?.status;

      if (refreshStatus === 401) {
        destroySession();
      }

      return Promise.reject(refreshError);
    }
  },
);
