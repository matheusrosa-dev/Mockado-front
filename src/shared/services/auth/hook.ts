import type { ISession } from "@shared/models/session";
import { api } from "../config";
import type { IAuthService } from "./types";
import type { IApiReturn } from "@services/interfaces";

export const useAuthService = (): IAuthService => {
  return {
    googleLogin: async (data) => {
      const response = await api.post<IApiReturn<ISession>>(
        "/auth/google/login",
        data,
      );

      return response.data.data;
    },

    refreshSession: async () => {
      return api.post("/auth/refresh");
    },

    logout: async () => {
      return api.post("/auth/logout");
    },
  };
};
