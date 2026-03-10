import { Toast as ToastRadix } from "radix-ui";
import { createContext, useCallback, useContext, useState } from "react";
import type { ToastData, ToastVariant } from "../types";

export type ShowOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
};

type Context = {
  toasts: ToastData[];
  show: (options: ShowOptions) => void;
  dismiss: (id: string) => void;
};

const Context = createContext({} as Context);

type Props = {
  children: React.ReactNode;
};

export function Provider({ children }: Props) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback((options: ShowOptions) => {
    const id = crypto.randomUUID();
    setToasts((prev) => [...prev, { id, ...options }]);
  }, []);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <Context.Provider value={{ toasts, show, dismiss }}>
      <ToastRadix.Provider swipeDirection="right">
        {children}
      </ToastRadix.Provider>
    </Context.Provider>
  );
}

export function useToastContext() {
  return useContext(Context);
}
