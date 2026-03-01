import { Header } from "@components";
import { useEndpointsService } from "@services";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { Content } from "../partials";
import { notFound } from "next/navigation";

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

  if (!endpoint) notFound();

  return (
    <>
      <Header>
        <span className={getHttpMethodTextColor(endpoint.method)}>
          {endpoint.method}
        </span>{" "}
        - {endpoint.title}
      </Header>

      <Content>{children}</Content>
    </>
  );
}
