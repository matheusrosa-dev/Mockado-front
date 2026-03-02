import type { HttpMethod } from "@shared/const/endpoint";

export interface IEndpoint {
  id: string;
  method: HttpMethod;
  title: string;
}
