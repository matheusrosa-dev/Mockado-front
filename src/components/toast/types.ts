export type ToastVariant = "default" | "success" | "error" | "warning";

export type ToastData = {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
};
