"use client";

import { Collapsible } from "radix-ui";
import { DefaultContent, EndpointsContent, Trigger } from "./partials";
import { useState } from "react";
import type { IDefaultSubmenuItem, IEndpointSubmenuItem } from "./types";

type Props = {
  title: string;
  items: Array<IDefaultSubmenuItem | IEndpointSubmenuItem>;
  variant?: "default" | "endpoints";
};

export function CollapsibleSubmenu({
  title,
  items,
  variant = "default",
}: Props) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Collapsible.Root
      onOpenChange={setIsOpen}
      open={isOpen}
      className="select-none"
    >
      <Trigger isOpen={isOpen} title={title} />

      {variant === "default" && (
        <DefaultContent items={items as IDefaultSubmenuItem[]} />
      )}
      {variant === "endpoints" && (
        <EndpointsContent items={items as IEndpointSubmenuItem[]} />
      )}
    </Collapsible.Root>
  );
}
