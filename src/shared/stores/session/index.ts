import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UseSessionStore } from "./types";

export const useSessionStore = create<UseSessionStore>()(
  persist(
    (set) => ({
      session: null,

      setHasApiKey: () =>
        set((state) => ({
          ...state,
          session: {
            ...state.session!,
            user: {
              ...state.session!.user,
              hasApiKey: true,
            },
          },
        })),

      createSession: (session) => set({ session }),

      destroySession: () => set({ session: null }),
    }),
    {
      name: "session-storage",
    },
  ),
);
