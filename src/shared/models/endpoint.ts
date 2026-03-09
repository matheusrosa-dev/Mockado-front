import type { HttpMethod, ResponseBodyType } from "@shared/const/endpoint";

export interface IEndpoint {
  id: string;
  method: HttpMethod;
  title: string;
  description?: string;
  delay?: number;
  statusCode: number;
  responseBodyType: ResponseBodyType;
  responseJson?: string;
  responseText?: string;
}

export type EndpointSummary = Pick<IEndpoint, "id" | "title" | "method">;
