import { PrivateHeader } from "@components";
import { Content } from "../partials";
import { Form } from "./partials";
import { useStatusCodesService } from "@services";

export default async function CreateEndpoint() {
  const { getStatusCodes } = useStatusCodesService();

  const statusCodes = await getStatusCodes();

  return (
    <>
      <PrivateHeader>Create endpoint</PrivateHeader>

      <Content>
        <Form statusCodes={statusCodes} />
      </Content>
    </>
  );
}
