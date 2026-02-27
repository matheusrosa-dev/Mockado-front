import { Collapsible } from "radix-ui";
import type { IDefaultSubmenuItem } from "../types";

type Props = {
  items: Array<IDefaultSubmenuItem>;
};

export const DefaultContent = ({ items }: Props) => {
  return (
    <Collapsible.Content>
      <ul className="flex flex-col gap-1 pl-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="duration-150 hover:bg-[#0d1117] px-2 py-1 rounded cursor-pointer"
          >
            {item.title}
          </li>
        ))}
      </ul>
    </Collapsible.Content>
  );
};
