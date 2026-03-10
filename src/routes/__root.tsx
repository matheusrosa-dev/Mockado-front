import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { Toast } from "@components";

const queryClient = new QueryClient();

const RootLayout = () => (
  <Toast.Provider>
    <QueryClientProvider client={queryClient}>
      <Outlet />
      <Toast />
      <TanStackRouterDevtools />
    </QueryClientProvider>
  </Toast.Provider>
);

export const Route = createRootRoute({ component: RootLayout });
