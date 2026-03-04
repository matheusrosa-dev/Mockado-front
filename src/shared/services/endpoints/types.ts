import type { IEndpoint } from "@shared/models/endpoint";

export interface IUseEndpointsService {
  getEndpoints: GetEndpoints;
  getEndpointById: GetEndpointById;
  createEndpoint: CreateEndpoint;
}

type GetEndpoints = () => Promise<
  Array<Pick<IEndpoint, "id" | "title" | "method">>
>;

type GetEndpointById = (id: string) => Promise<IEndpoint>;

type CreateEndpoint = (data: Omit<IEndpoint, "id">) => Promise<IEndpoint>;
