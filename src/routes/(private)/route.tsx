import { Sidebar } from "@components";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
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
