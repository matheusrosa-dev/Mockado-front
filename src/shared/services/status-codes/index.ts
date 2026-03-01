import { api } from "../config";
import type { IUseStatusCodesService } from "./types";

export const useStatusCodesService = (): IUseStatusCodesService => {
  return {
    getStatusCodes: async () => {
      const response = await api("/status-codes");

      const data = await response.json();

      return data;
    },
  };
};
