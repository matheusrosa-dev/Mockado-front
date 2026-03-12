import { api } from "../config";
import type { IAuthService } from "./types";
import type { IApiReturn } from "@services/interfaces";

export const useAuthService = (): IAuthService => {
  return {
    googleLogin: async (data) => {
      const response = await api.post<IApiReturn<[]>>(
        "/auth/google/login",
        data,
      );

      console.log(response.data.data);

      //   return response.data.data;

      return {
        teste: "teste",
      };
    },
  };
};
