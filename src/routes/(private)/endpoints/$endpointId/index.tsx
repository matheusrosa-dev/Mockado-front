import {
  FetchError,
  NotFound,
  PrivateContent,
  PrivateHeader,
} from "@components";
import { useGetEndpointById } from "@services/endpoints/react-query";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { createFileRoute } from "@tanstack/react-router";
import { EndpointAccess, Form } from "./-partials";
import { useGetStatusCodes } from "@services/status-codes/react-query";
import type { IEndpoint } from "@shared/models/endpoint";

export const Route = createFileRoute("/(private)/endpoints/$endpointId/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { endpointId } = Route.useParams();

  const { data: endpoint, ...endpointQuery } = useGetEndpointById(endpointId);
  const { data: statusCodes, ...statusCodesQuery } = useGetStatusCodes();

  const showHeader = !endpointQuery.isError && endpoint;
  const showContent = !endpointQuery.isError && !statusCodesQuery.isError;

  if (endpointQuery.error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <PrivateHeader>
        {endpointQuery.isError && "Error loading endpoint"}

        {showHeader && (
          <>
            <span className={getHttpMethodTextColor(endpoint.method)}>
              {endpoint.method}
            </span>{" "}
            - {endpoint.title}
          </>
        )}
      </PrivateHeader>

      <PrivateContent>
        {endpointQuery.isError && (
          <FetchError
            title="Failed to load endpoint"
            refetch={endpointQuery.refetch}
          />
        )}

        {statusCodesQuery.isError && (
          <FetchError
            title="Failed to load status codes"
            refetch={statusCodesQuery.refetch}
          />
        )}

        {showContent && (
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Form
              key={endpointId}
              endpoint={endpoint || ({} as IEndpoint)}
              isLoading={endpointQuery.isLoading || statusCodesQuery.isLoading}
              statusCodes={statusCodes || []}
            />

            <div className="max-xl:row-start-1">
              <EndpointAccess
                endpointId={endpointId}
                isLoading={
                  endpointQuery.isLoading || statusCodesQuery.isLoading
                }
              />
            </div>
          </section>
        )}
      </PrivateContent>
    </>
  );
}
