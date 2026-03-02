import type { IStatusCode } from "@shared/models/status-code";

export interface IUseStatusCodesService {
  getStatusCodes: GetStatusCodes;
}

type GetStatusCodes = () => Promise<Array<IStatusCode>>;
