import { PrivateContent, PrivateHeader } from "@components";
import { createFileRoute } from "@tanstack/react-router";
import { Form } from "./-partials";
import { useStatusCodesService } from "@services";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/(private)/endpoints/create/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getStatusCodes } = useStatusCodesService();

  /* TODO: CORRIGIR */
  const { data } = useQuery({
    queryKey: ["status-codes"],
    queryFn: getStatusCodes,
  });

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <PrivateContent>
        {/* /* TODO: CORRIGIR */}
        <Form statusCodes={data || []} />
      </PrivateContent>
    </>
  );
}
