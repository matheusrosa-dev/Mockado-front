import {
  CollapsibleSubmenu,
  Wrapper,
  HamburgerButton,
  UserFooter,
} from "./partials";
import { useGetEndpointsSummary } from "@services/endpoints/react-query";
import { useSessionStore } from "@shared/stores";

export function Sidebar() {
  const { session } = useSessionStore();

  const { endpoints, isLoading, isError } = useGetEndpointsSummary({
    userId: session?.user.id,
  });

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
          items={endpoints || []}
          isLoading={isLoading}
          isError={isError}
          variant="endpoints"
        />
      </nav>

      <UserFooter />
    </Wrapper>
  );
}

Sidebar.displayName = "Sidebar";
Sidebar.HamburgerButton = HamburgerButton;
