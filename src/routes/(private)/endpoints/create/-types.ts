import type { HttpMethod, ResponseBodyType } from "@shared/const/endpoint";

export interface IForm {
  title: string;
  description?: string;
  method: HttpMethod;
  statusCode: string;
  delay?: number;
  responseBodyType: ResponseBodyType;
  responseJson?: string;
  responseText?: string;
}
