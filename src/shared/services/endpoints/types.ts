import type { IEndpoint } from "@shared/models/endpoint";

export interface IUseEndpointsService {
  getEndpoints: GetEndpoints;
  getEndpointById: GetEndpointById;
  createEndpoint: CreateEndpoint;
}

type GetEndpoints = () => Promise<Array<IEndpoint>>;

type GetEndpointById = (id: string) => Promise<IEndpoint>;

type CreateEndpoint = (data: Omit<IEndpoint, "id">) => Promise<IEndpoint>;
