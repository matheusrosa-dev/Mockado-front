import type { IStatusCode } from "@shared/models/status-code";

export type GroupWithStatusCodes = {
  label: string;
  range: string;
  color: string;
  badgeClass: string;
  statusCodes: IStatusCode[];
};
