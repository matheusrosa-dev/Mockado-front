import { Collapsible } from "radix-ui";
import type { IDefaultSubmenuItem } from "../types";

type Props = {
  items: Array<IDefaultSubmenuItem>;
};

export const DefaultContent = ({ items }: Props) => {
  return (
    <Collapsible.Content>{items.map((item) => item.title)}</Collapsible.Content>
  );
};
