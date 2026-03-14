import { Sidebar } from "@components";
import { useSessionStore } from "@shared/stores";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
  beforeLoad: ({ location }) => {
    const { session } = useSessionStore.getState();

    if (!session && location.pathname !== "/") {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Sidebar.Provider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar />

        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </Sidebar.Provider>
  );
}
