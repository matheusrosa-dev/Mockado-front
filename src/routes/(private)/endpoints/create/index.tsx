import { PrivateContent, PrivateHeader } from "@components";
import { createFileRoute } from "@tanstack/react-router";
import { Form } from "./-partials";
import { getStatusCodes } from "@services/status-codes/react-query";

export const Route = createFileRoute("/(private)/endpoints/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data: statusCodes, isLoading } = getStatusCodes();

  // TODO: Adicionar tratativa de erro

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <PrivateContent>
        <Form isLoading={isLoading} statusCodes={statusCodes} />
      </PrivateContent>
    </>
  );
}
