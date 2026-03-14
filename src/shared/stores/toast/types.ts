import type { ShowOptions, ToastData } from "@shared/models/toast";

export type IUseToastStore = {
  toasts: ToastData[];
  show: (options: ShowOptions) => void;
  dismiss: (id: string) => void;
};
