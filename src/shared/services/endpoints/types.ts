import type { EndpointSummary, IEndpoint } from "@shared/models/endpoint";

export interface IUseEndpointsService {
  getEndpointsSummary: GetEndpointsSummary;
  getEndpointById: GetEndpointById;
  createEndpoint: CreateEndpoint;
  updateEndpoint: UpdateEndpoint;
}

type GetEndpointsSummary = () => Promise<Array<EndpointSummary>>;

type GetEndpointById = (id: string) => Promise<IEndpoint>;

type CreateEndpoint = (data: Omit<IEndpoint, "id">) => Promise<IEndpoint>;

type UpdateEndpoint = (
  id: string,
  data: Partial<IEndpoint>,
) => Promise<IEndpoint>;
