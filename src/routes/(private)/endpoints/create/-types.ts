import type { HttpMethod } from "@shared/const/endpoint";

export interface IForm {
  title: string;
  description?: string;
  method: HttpMethod;
  statusCode: string;
  delay?: number;

  jsonResponse?: string;
}
