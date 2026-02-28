import { Header } from "@components";
import { useEndpointsService } from "@services";
import { getMethodTextColor } from "@shared/helpers/http-method";
import { Content } from "../partials";

type Props = {
  children: React.ReactNode;
  params: Promise<{
    id: string;
  }>;
};

export default async function EndpointLayout({ children, params }: Props) {
  const { getEndpointById } = useEndpointsService();

  const endpointId = (await params).id;

  const endpoint = await getEndpointById(endpointId);

  return (
    <>
      <Header>
        <span className={getMethodTextColor(endpoint.method)}>
          {endpoint.method}
        </span>{" "}
        - {endpoint.title}
      </Header>

      <Content>{children}</Content>
    </>
  );
}
