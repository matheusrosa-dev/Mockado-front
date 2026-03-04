import type { IEndpoint } from "@shared/models/endpoint";
import { api } from "../config";
import type { IUseEndpointsService } from "./types";

export const useEndpointsService = (): IUseEndpointsService => {
  return {
    getEndpoints: async () => {
      const response =
        await api.get<Array<Pick<IEndpoint, "id" | "title" | "method">>>(
          "/endpoints",
        );

      return response.data;
    },

    getEndpointById: async (id: string) => {
      const response = await api.get<IEndpoint>(`/endpoints/${id}`);

      return response.data;
    },

    createEndpoint: async (data) => {
      const response = await api.post<IEndpoint>("/endpoints", data);

      return response.data;
    },
  };
};
