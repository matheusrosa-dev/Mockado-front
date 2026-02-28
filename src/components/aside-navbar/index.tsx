import { useEndpointsService } from "@services";
import { CollapsibleSubmenu } from "./collapsible-submenu";

export const AsideNavbar = async () => {
  const { getEndpoints } = useEndpointsService();

  const endpoints = await getEndpoints();

  return (
    <aside className="w-70 flex flex-col bg-[#010409]">
      <section className="p-4 h-17 max-h-17 border-b-2 border-[#0d1117] flex items-center justify-center">
        <h1 className="text-2xl font-medium text-center">
          &#96;&#36;&#123;Mockado&#125;&#96;
        </h1>
      </section>

      <nav className="p-4">
        <CollapsibleSubmenu
          title="Endpoints"
          items={endpoints}
          variant="endpoints"
        />
      </nav>
    </aside>
  );
};
