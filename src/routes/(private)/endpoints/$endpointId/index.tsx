import { PrivateContent, PrivateHeader } from "@components";
import { useEndpointsService } from "@services";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/endpoints/$endpointId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getEndpointById } = useEndpointsService();

  const { endpointId } = Route.useParams();
  /* TODO: CORRIGIR */
  const { data: endpoint, isLoading } = useQuery({
    queryKey: ["endpoints", endpointId],
    queryFn: () => getEndpointById(endpointId),
  });

  // TODO: CORRIGIR
  if (isLoading) {
    return <>Loading...</>;
  }

  // TODO: CORRIGIR
  if (!endpoint) {
    return <>not found</>;
  }

  return (
    <>
      <PrivateHeader>
        <span className={getHttpMethodTextColor(endpoint.method)}>
          {endpoint.method}
        </span>{" "}
        - {endpoint.title}
      </PrivateHeader>

      <PrivateContent>
        <div className="flex flex-col gap-4">
          <div className="rounded-lg border border-border bg-background-secondary p-5">
            <h2 className="text-xs font-semibold text-white/50 uppercase tracking-widest mb-3">
              Response body
            </h2>
            <pre className="text-sm text-text-muted font-mono bg-background-tertiary rounded-md p-4 border border-border">
              {"{}"}
            </pre>
          </div>
        </div>
      </PrivateContent>
    </>
  );
}
