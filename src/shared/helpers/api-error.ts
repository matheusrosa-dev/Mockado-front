import type { ApiError } from "@services/interfaces";
import { capitalizeFirstLetter } from "./string";

export const formatApiError = (error: ApiError) => {
  const message = error.response?.data?.message;

  if (message) {
    if (typeof message === "string") {
      return capitalizeFirstLetter(message);
    }

    if (Array.isArray(message)) {
      return message.map(capitalizeFirstLetter).join("\n");
    }
  }
};
