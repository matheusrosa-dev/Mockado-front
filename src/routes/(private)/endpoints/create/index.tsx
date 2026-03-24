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
          <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
            <Form isLoading={isLoading} statusCodes={statusCodes || []} />

            <div />
          </section>
        )}
      </PrivateContent>
    </>
  );
}
