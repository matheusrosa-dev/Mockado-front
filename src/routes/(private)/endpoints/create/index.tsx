import { PrivateContent, PrivateHeader } from "@components";
import { createFileRoute } from "@tanstack/react-router";
import { Form } from "./-partials";
import { getStatusCodes } from "@services/status-codes/react-query";

export const Route = createFileRoute("/(private)/endpoints/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: statusCodes, isLoading } = getStatusCodes();

  // TODO: CORRIGIR
  if (isLoading) {
    return <>Loading...</>;
  }

  // TODO: CORRIGIR
  if (!statusCodes) {
    return <>not found</>;
  }

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <PrivateContent>
        <Form statusCodes={statusCodes} />
      </PrivateContent>
    </>
  );
}
