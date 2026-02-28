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
      <header className="bg-[#010409] max-h-17 h-17 p-4 text-2xl font-medium border-l-2 border-b-2 border-[#0d1117]">
        <span className={getMethodTextColor(endpoint.method)}>
          {endpoint.method}
        </span>{" "}
        - {endpoint.title}
      </header>

      <div className="p-4 py-5.5">{children}</div>
    </>
  );
}
