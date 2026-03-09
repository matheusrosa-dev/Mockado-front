import type { IStatusCode } from "@shared/models/status-code";
import { api } from "../config";
import type { IUseStatusCodesService } from "./types";
import type { IApiReturn } from "@services/interfaces";

export const useStatusCodesService = (): IUseStatusCodesService => {
  return {
    getStatusCodes: async () => {
      const response =
        await api.get<IApiReturn<Array<IStatusCode>>>("/status-codes");

      return response.data.data;
    },
  };
};
