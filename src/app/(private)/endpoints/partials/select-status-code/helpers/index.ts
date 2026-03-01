import type { IStatusCode } from "@shared/models/status-code";
import type { GroupWithStatusCodes } from "../types";
import { STATUS_CODE_GROUPS } from "@shared/const/status-code";

export const groupStatusCodes = (
  statusCodes: IStatusCode[],
): GroupWithStatusCodes[] => {
  const groupedStatusCodes = Object.values(STATUS_CODE_GROUPS).map((group) => {
    const statusCodesInRange = statusCodes.filter((statusCode) => {
      const groupRangeStart = Number(group.range[0]) * 100;
      const groupRangeEnd = groupRangeStart + 100;

      if (
        statusCode.code < groupRangeStart ||
        statusCode.code >= groupRangeEnd
      ) {
        return false;
      }

      return true;
    });

    return {
      ...group,
      statusCodes: statusCodesInRange,
    };
  });

  return groupedStatusCodes;
};

export const getGroupByCode = (code: string) => {
  const codeRange = `${code[0]}xx` as keyof typeof STATUS_CODE_GROUPS;

  return STATUS_CODE_GROUPS[codeRange];
};
