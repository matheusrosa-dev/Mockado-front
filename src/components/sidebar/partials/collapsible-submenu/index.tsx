import { Collapsible } from "radix-ui";
import { EndpointsContent, Trigger } from "./partials";
import { useState } from "react";
import type { IDefaultSubmenuItem, IEndpointSubmenuItem } from "./types";

type Props = {
  title: string;
  items: Array<IDefaultSubmenuItem | IEndpointSubmenuItem>;
  variant?: "default" | "endpoints";
  isLoading?: boolean;
  isError?: boolean;
};

export function CollapsibleSubmenu({
  title,
  items,
  variant = "default",
  isLoading = false,
  isError = false,
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible.Root
      onOpenChange={setIsOpen}
      open={isOpen}
      className="select-none"
    >
      <Trigger isOpen={isOpen} title={title} />

      {variant === "endpoints" && (
        <EndpointsContent
          items={items as IEndpointSubmenuItem[]}
          isLoading={isLoading}
          isError={isError}
        />
      )}
    </Collapsible.Root>
  );
}
