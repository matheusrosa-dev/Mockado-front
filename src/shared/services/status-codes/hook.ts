import { api } from "../config";
import type { IUseStatusCodesService } from "./types";

export const useStatusCodesService = (): IUseStatusCodesService => {
  return {
    getStatusCodes: async () => {
      const response = await api.get("/status-codes");

      return response.data;
    },
  };
};
