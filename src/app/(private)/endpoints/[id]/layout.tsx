import { Header } from "@components";
import { useEndpointsService } from "@services";
import { getMethodTextColor } from "@shared/helpers/http-method";

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

      <div className="p-4 py-5.5">{children}</div>
    </>
  );
}
