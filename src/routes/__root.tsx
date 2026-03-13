import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { LoginModal, Toast } from "@components";
import { useSessionStore } from "@shared/stores";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

const queryClient = new QueryClient();

const RootLayout = () => {
  const { session } = useSessionStore();

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Toast.Provider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <LoginModal open={!session} />
          <Toast />
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </Toast.Provider>
    </GoogleOAuthProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
