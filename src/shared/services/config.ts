const BASE_URL = "http://localhost:3333";

export const api = (endpoint: string, options?: RequestInit) => {
  if (!endpoint.startsWith("/")) {
    endpoint = `/${endpoint}`;
  }

  return fetch(`${BASE_URL}${endpoint}`, options);
};
