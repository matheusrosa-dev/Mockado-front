import { useEndpointsService } from "@services";
import { CollapsibleSubmenu } from "./collapsible-submenu";

export const AsideNavbar = async () => {
  const { getEndpoints } = useEndpointsService();

  const endpoints = await getEndpoints();

  return (
    <aside className="w-70 p-4 flex flex-col gap-10 bg-[#010409]">
      <h1 className="text-2xl font-medium text-center">
        &#96;&#36;&#123;Mockado&#125;&#96;
      </h1>

      <nav>
        <CollapsibleSubmenu
          title="Endpoints"
          items={endpoints}
          variant="endpoints"
        />
      </nav>
    </aside>
  );
};
