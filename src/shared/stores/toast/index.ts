import { create } from "zustand";
import type { IUseToastStore } from "./types";

export const useToastStore = create<IUseToastStore>((set) => ({
  toasts: [],

  show: (options) => {
    set((state) => ({
      toasts: [...state.toasts, { id: crypto.randomUUID(), ...options }],
    }));
  },

  dismiss: (id: string) => {
    set((state) => ({
      toasts: state.toasts.filter((t) => t.id !== id),
    }));
  },
}));
