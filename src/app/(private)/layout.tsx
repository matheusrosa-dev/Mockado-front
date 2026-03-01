import { Sidebar } from "@components";
import { useEndpointsService } from "@services";

type Props = {
  children: React.ReactNode;
};

export default async function PrivateLayout({ children }: Props) {
  const { getEndpoints } = useEndpointsService();

  const endpoints = await getEndpoints();

  return (
    <Sidebar.Provider>
      <div className="flex h-screen w-screen overflow-hidden">
        <Sidebar endpoints={endpoints} />

        <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      </div>
    </Sidebar.Provider>
  );
}
