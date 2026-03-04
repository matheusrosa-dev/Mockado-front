import type { HttpMethod, ResponseBodyType } from "@shared/const/endpoint";

export interface IEndpoint {
  id: string;
  method: HttpMethod;
  title: string;
  description?: string;
  responseBodyType: ResponseBodyType;
  responseJson?: string;
  responseText?: string;
}
