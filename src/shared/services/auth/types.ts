import type { ISession } from "@shared/models/session";

export interface IAuthService {
  googleLogin: GoogleLogin;
  refreshSession: RefreshSession;
}

type GoogleLogin = (data: { googleToken: string }) => Promise<ISession>;

type RefreshSession = () => Promise<void>;
