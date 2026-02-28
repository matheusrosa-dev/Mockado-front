import { Method } from "@shared/models/endpoint";

export const getMethodTextColor = (method: Method) => {
  switch (method) {
    case Method.GET:
      return "text-[#705ee2]";
    case Method.POST:
      return "text-[#83d13a]";
    case Method.PUT:
      return "text-[#dd7747]";
    case Method.PATCH:
      return "text-[#ddcd38]";
    case Method.DELETE:
      return "text-[#b33d25]";
  }
};
