import type { IStatusCode } from "@shared/models/status-code";
import { api } from "../config";
import type { IUseStatusCodesService } from "./types";

export const useStatusCodesService = (): IUseStatusCodesService => {
  return {
    getStatusCodes: async () => {
      const response = await api.get<Array<IStatusCode>>("/status-codes");

      return response.data;
    },
  };
};
