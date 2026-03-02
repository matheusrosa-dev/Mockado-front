import { api } from "../config";
import type { IUseEndpointsService } from "./types";

export const useEndpointsService = (): IUseEndpointsService => {
  return {
    getEndpoints: async () => {
      const response = await api.get("/endpoints");

      return response.data;
    },

    getEndpointById: async (id: string) => {
      const response = await api.get(`/endpoints/${id}`);

      return response.data;
    },
  };
};
