import type { HttpMethod } from "@shared/const/endpoint";

export enum ResponseBodyType {
  JSON = "json",
  TEXT = "text",
  HTML = "html",
  XML = "xml",
  NULL = "null",
  EMPTY = "empty",
}

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
