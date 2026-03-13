import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { ISession } from "@shared/models/session";

// TODO: verificar todos os context da aplicação e ver quais da pra substituir por zustand

type UseSession = {
  session: ISession | null;
  createSession: (session: ISession) => void;
  destroySession: () => void;
};

export const useSessionStore = create<UseSession>()(
  persist(
    (set) => ({
      session: null,

      createSession: (session) => set({ session }),

      destroySession: () => set({ session: null }),
    }),
    {
      name: "session-storage",
    },
  ),
);
