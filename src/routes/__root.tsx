import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { LoginModal, Toast } from "@components";
import { useState } from "react";

const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

const queryClient = new QueryClient();

const RootLayout = () => {
  // TODO: replace with real authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <Toast.Provider>
        <QueryClientProvider client={queryClient}>
          <Outlet />
          <LoginModal
            open={!isAuthenticated}
            onClose={() => setIsAuthenticated(true)}
          />
          <Toast />
          <TanStackRouterDevtools />
        </QueryClientProvider>
      </Toast.Provider>
    </GoogleOAuthProvider>
  );
};

export const Route = createRootRoute({ component: RootLayout });
