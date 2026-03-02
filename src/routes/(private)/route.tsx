import { Sidebar } from "@components";
import { useEndpointsService } from "@services";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getEndpoints } = useEndpointsService();

  /* TODO: CORRIGIR */
  const { data } = useQuery({
    queryKey: ["endpoints"],
    queryFn: getEndpoints,
  });

  return (
    <Sidebar.Provider>
      <div className="flex h-screen w-screen overflow-hidden">
        {/* TODO: CORRIGIR */}
        <Sidebar endpoints={data || []} />

        <main className="flex-1 flex flex-col overflow-hidden">
          <Outlet />
        </main>
      </div>
    </Sidebar.Provider>
  );
}
