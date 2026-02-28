export interface IEndpoint {
  id: string;
  method: HttpMethod;
  title: string;
}

export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
