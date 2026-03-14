import { GoogleOAuthProvider } from "@react-oauth/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Link, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { LoginModal, Toast } from "@components";
import { useSessionStore } from "@shared/stores";
import { LuTriangleAlert } from "react-icons/lu";

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

function NotFoundPage() {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center gap-4 bg-background px-6 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-error/15">
        <LuTriangleAlert className="h-6 w-6 text-error" />
      </div>

      <div className="flex flex-col gap-1">
        <h2 className="text-base font-semibold text-white/90">
          Page not found
        </h2>
        <p className="max-w-xs text-sm text-text-muted">
          The page you're looking for doesn't exist or has been moved.
        </p>
      </div>

      <Link
        to="/"
        className="mt-2 text-sm font-medium text-accent underline-offset-4 hover:underline"
      >
        Go back home
      </Link>
    </div>
  );
}

export const Route = createRootRoute({
  component: RootLayout,
  notFoundComponent: NotFoundPage,
});
