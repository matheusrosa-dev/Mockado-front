export interface IAuthService {
  googleLogin: GoogleLogin;
}

type GoogleLogin = (data: { googleToken: string }) => Promise<{
  teste: string;
}>;
