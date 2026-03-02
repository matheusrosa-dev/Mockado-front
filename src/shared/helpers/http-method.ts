import { HttpMethod } from "@shared/const/endpoint";

export const getHttpMethodTextColor = (method: HttpMethod) => {
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

export const getHttpMethodBgColor = (method: HttpMethod) => {
  switch (method) {
    case HttpMethod.GET:
      return "bg-method-get-bg";
    case HttpMethod.POST:
      return "bg-method-post-bg";
    case HttpMethod.PUT:
      return "bg-method-put-bg";
    case HttpMethod.PATCH:
      return "bg-method-patch-bg";
    case HttpMethod.DELETE:
      return "bg-method-delete-bg";
  }
};
