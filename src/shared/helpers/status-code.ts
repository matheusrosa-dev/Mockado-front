import { STATUS_CODES_WITHOUT_BODY } from "@shared/const/status-code";

export const statusCodeHasBody = (code: number | string): boolean => {
  const numberCode = Number(code);

  if (numberCode >= 100 && numberCode < 200) return false;

  return !STATUS_CODES_WITHOUT_BODY.includes(numberCode);
};
