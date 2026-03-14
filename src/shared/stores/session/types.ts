import type { ISession } from "@shared/models/session";

export type UseSessionStore = {
  session: ISession | null;
  createSession: (session: ISession) => void;
  destroySession: () => void;
};
