export type ToastVariant = "default" | "success" | "error" | "warning";

export type ShowOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

export type ToastData = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
};
