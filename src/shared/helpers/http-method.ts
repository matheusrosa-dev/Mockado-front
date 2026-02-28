import { HttpMethod } from "@shared/models/endpoint";

export const getMethodTextColor = (method: HttpMethod) => {
  switch (method) {
    case HttpMethod.GET:
      return "text-method-get";
    case HttpMethod.POST:
      return "text-method-post";
    case HttpMethod.PUT:
      return "text-method-put";
    case HttpMethod.PATCH:
      return "text-method-patch";
    case HttpMethod.DELETE:
      return "text-method-delete";
  }
};
