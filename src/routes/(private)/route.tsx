import { Sidebar } from "@components";
import { getEndpoints } from "@services/endpoints/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: endpoints, isLoading } = getEndpoints();

  // TODO: CORRIGIR
  if (isLoading) {
    return <>Loading...</>;
  }

  // TODO: CORRIGIR
  if (!endpoints) {
    return <>not found</>;
  }

  return (
    <Sidebar.Provider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* TODO: CORRIGIR */}
        <Sidebar endpoints={endpoints} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </Sidebar.Provider>
  );
}
