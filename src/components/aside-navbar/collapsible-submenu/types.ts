export interface IDefaultSubmenuItem {
  id: string;
  title: string;
}

export interface IEndpointSubmenuItem {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  title: string;
}
