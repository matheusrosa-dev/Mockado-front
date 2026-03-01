import { useEndpointsService } from "@services";
import { CollapsibleSubmenu } from "./collapsible-submenu";

export async function AsideNavbar() {
  const { getEndpoints } = useEndpointsService();

  const endpoints = await getEndpoints();

  return (
    <aside className="min-w-64 w-64 flex flex-col bg-background-secondary border-r border-border">
      <section className="h-14 px-4 flex items-center border-b border-border">
        <h1 className="text-lg text-center w-full font-semibold text-white/90">
          &#96;&#36;&#123;Mockado&#125;&#96;
        </h1>
      </section>

      <nav className="flex-1 overflow-y-auto p-3">
        <CollapsibleSubmenu
          title="Endpoints"
          items={endpoints}
          variant="endpoints"
        />
      </nav>
    </aside>
  );
}
