import { Header } from "@components";
import { Content } from "../partials";
import { Form } from "./partials";
import { useStatusCodesService } from "@services";

export default async function CreateEndpoint() {
  const { getStatusCodes } = useStatusCodesService();

  const statusCodes = await getStatusCodes();

  return (
    <>
      <Header>Create endpoint</Header>

      <Content>
        <Form statusCodes={statusCodes} />
      </Content>
    </>
  );
}
