import { create } from "zustand";
import type { IUseSidebarStore } from "./types";

export const useSidebarStore = create<IUseSidebarStore>((set) => ({
  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
