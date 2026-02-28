export interface IEndpoint {
  id: string;
  method: Method;
  title: string;
}

export enum Method {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
  PATCH = "PATCH",
}
