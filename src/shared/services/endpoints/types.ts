import type { EndpointSummary, IEndpoint } from "@shared/models/endpoint";

export interface IUseEndpointsService {
  getEndpointsSummary: GetEndpointsSummary;
  getEndpointById: GetEndpointById;
  createEndpoint: CreateEndpoint;
}

type GetEndpointsSummary = () => Promise<Array<EndpointSummary>>;

type GetEndpointById = (id: string) => Promise<IEndpoint>;

type CreateEndpoint = (data: Omit<IEndpoint, "id">) => Promise<IEndpoint>;
