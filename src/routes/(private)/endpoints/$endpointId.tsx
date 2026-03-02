import { PrivateContent, PrivateHeader } from "@components";
import { getEndpointById } from "@services/endpoints/react-query";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/endpoints/$endpointId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { endpointId } = Route.useParams();

  const { data: endpoint, isLoading } = getEndpointById(endpointId);

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
