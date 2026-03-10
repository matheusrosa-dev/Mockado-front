import type { AxiosError } from "axios";

export interface IApiReturn<T> {
  data: T;
}

export type ApiError = AxiosError<{
  message: string[];
}>;
