import { api } from "../config";
import type { IUseEndpointsService } from "./types";

export const useEndpointsService = (): IUseEndpointsService => {
  return {
    getEndpoints: async () => {
      const response = await api("/endpoints");

      const data = await response.json();

      return data;
    },

    getEndpointById: async (id: string) => {
      const response = await api(`/endpoints/${id}`);

      const data = await response.json();

      return data;
    },
  };
};
