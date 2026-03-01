import { CollapsibleSubmenu, Wrapper, HamburgerButton } from "./partials";
import { Provider, useSidebarContext } from "./context";
import type { IEndpoint } from "@shared/models/endpoint";

type Props = {
  endpoints: Array<IEndpoint>;
};

export function Sidebar({ endpoints }: Props) {
  return (
    <Wrapper>
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
    </Wrapper>
  );
}

Sidebar.displayName = "Sidebar";
Sidebar.HamburgerButton = HamburgerButton;
Sidebar.Provider = Provider;
Sidebar.useSidebar = useSidebarContext;
