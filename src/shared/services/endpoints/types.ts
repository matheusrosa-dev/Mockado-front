export interface IUseEndpointsService {
  getEndpoints: GetEndpoints;
}

type GetEndpoints = () => Promise<
  Array<{
    id: string;
    title: string;
    method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  }>
>;
