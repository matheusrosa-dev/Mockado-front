import type { ISession } from "@shared/models/session";

export interface IAuthService {
  googleLogin: GoogleLogin;
  refreshSession: RefreshSession;
  logout: Logout;
}

type GoogleLogin = (data: { googleToken: string }) => Promise<ISession>;

type RefreshSession = () => Promise<void>;

type Logout = () => Promise<void>;
