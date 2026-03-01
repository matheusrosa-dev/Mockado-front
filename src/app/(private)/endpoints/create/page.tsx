import { PrivateContent, PrivateHeader } from "@components";
import { Form } from "./partials";
import { useStatusCodesService } from "@services";

export default async function CreateEndpoint() {
  const { getStatusCodes } = useStatusCodesService();

  const statusCodes = await getStatusCodes();

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <PrivateContent>
        <Form statusCodes={statusCodes} />
      </PrivateContent>
    </>
  );
}
