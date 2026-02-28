import type { IEndpoint } from "@shared/models/endpoint";

export interface IUseEndpointsService {
  getEndpoints: GetEndpoints;
  getEndpointById: GetEndpointById;
}

type GetEndpoints = () => Promise<Array<IEndpoint>>;

type GetEndpointById = (id: string) => Promise<IEndpoint>;
