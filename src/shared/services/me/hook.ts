import { api } from "../config";
import type { IUseMeService } from "./types";
import type { IApiReturn } from "@services/interfaces";

export const useMeService = (): IUseMeService => {
  return {
    getApiKey: async () => {
      const response =
        await api.get<IApiReturn<{ apiKey: string }>>("/me/api-key");

      return response.data.data;
    },
  };
};
