import {
  FetchError,
  NotFound,
  PrivateContent,
  PrivateHeader,
} from "@components";
import { getEndpointById } from "@services/endpoints/react-query";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(private)/endpoints/$endpointId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { endpointId } = Route.useParams();

  const {
    data: endpoint,
    error,
    isError,
    refetch,
  } = getEndpointById(endpointId);

  if (error?.status === 404) {
    return <NotFound />;
  }

  return (
    <>
      <PrivateHeader>
        {isError && "Error loading endpoint"}

        {!isError && endpoint && (
          <>
            <span className={getHttpMethodTextColor(endpoint.method)}>
              {endpoint.method}
            </span>{" "}
            - {endpoint.title}
          </>
        )}
      </PrivateHeader>

      <PrivateContent>
        {isError ? (
          <FetchError title="Failed to load endpoint" refetch={refetch} />
        ) : (
          "content"
        )}
      </PrivateContent>
    </>
  );
}
