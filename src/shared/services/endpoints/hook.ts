import type { EndpointSummary, IEndpoint } from "@shared/models/endpoint";
import { api } from "../config";
import type { IUseEndpointsService } from "./types";
import type { IApiReturn } from "@services/interfaces";

export const useEndpointsService = (): IUseEndpointsService => {
  return {
    getEndpointsSummary: async () => {
      const response =
        await api.get<IApiReturn<Array<EndpointSummary>>>("/endpoints/summary");

      return response.data.data;
    },

    getEndpointById: async (id: string) => {
      const response = await api.get<IApiReturn<IEndpoint>>(`/endpoints/${id}`);

      return response.data.data;
    },

    createEndpoint: async (data) => {
      const response = await api.post<IApiReturn<IEndpoint>>(
        "/endpoints",
        data,
      );

      return response.data.data;
    },
  };
};
