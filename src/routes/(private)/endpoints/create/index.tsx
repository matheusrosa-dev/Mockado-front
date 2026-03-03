import { FetchError, PrivateContent, PrivateHeader } from "@components";
import { createFileRoute } from "@tanstack/react-router";
import { Form } from "./-partials";
import { getStatusCodes } from "@services/status-codes/react-query";

export const Route = createFileRoute("/(private)/endpoints/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: statusCodes, isLoading, isError, refetch } = getStatusCodes();

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <PrivateContent>
        {isError ? (
          <FetchError title="Failed to load status codes" refetch={refetch} />
        ) : (
          <Form isLoading={isLoading} statusCodes={statusCodes} />
        )}
      </PrivateContent>
    </>
  );
}
