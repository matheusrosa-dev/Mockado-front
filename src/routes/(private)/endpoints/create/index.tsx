import { FetchError, PrivateContent, PrivateHeader } from "@components";
import { createFileRoute } from "@tanstack/react-router";
import { Form } from "./-partials";
import { useGetStatusCodes } from "@services/status-codes/react-query";

export const Route = createFileRoute("/(private)/endpoints/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const {
    data: statusCodes,
    isLoading,
    isError,
    refetch,
  } = useGetStatusCodes();

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <PrivateContent>
        {isError ? (
          <FetchError title="Failed to load status codes" refetch={refetch} />
        ) : (
          <div className="grid grid-cols-2 gap-6">
            <Form isLoading={isLoading} statusCodes={statusCodes || []} />

            <div />
          </div>
        )}
      </PrivateContent>
    </>
  );
}
