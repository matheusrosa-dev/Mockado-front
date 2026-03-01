import { STATUS_CODES_WITHOUT_BODY } from "@shared/const/status-code";

export const statusCodeHasBody = (code: number): boolean => {
  if (code >= 100 && code < 200) return false;

  return !STATUS_CODES_WITHOUT_BODY.includes(code);
};
