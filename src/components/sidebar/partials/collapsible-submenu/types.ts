import type { IEndpoint } from "@shared/models/endpoint";

export interface IDefaultSubmenuItem {
  id: string;
  title: string;
}

export interface IEndpointSubmenuItem extends IEndpoint {}
