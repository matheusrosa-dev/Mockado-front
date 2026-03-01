import { Header } from "@components";
import { Content } from "../partials";
import { Form } from "./partials";
import { useStatusCodesService } from "@services";

export default async function CreateEndpoint() {
  const { getStatusCodes } = useStatusCodesService();

  const statusCodes = await getStatusCodes();

  console.log(statusCodes);

  return (
    <>
      <Header>Create endpoint</Header>

      <Content>
        <Form />
      </Content>
    </>
  );
}
