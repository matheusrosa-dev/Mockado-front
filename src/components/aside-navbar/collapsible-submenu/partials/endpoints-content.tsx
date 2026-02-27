import { Collapsible } from "radix-ui";
import type { IEndpointSubmenuItem } from "../types";

type Props = {
  items: Array<IEndpointSubmenuItem>;
};

export const EndpointsContent = ({ items }: Props) => {
  const getMethodTextColor = (method: string) => {
    switch (method) {
      case "GET":
        return "text-[#705ee2]";
      case "POST":
        return "text-[#83d13a]";
      case "PUT":
        return "text-[#dd7747]";
      case "PATCH":
        return "text-[#ddcd38]";
      case "DELETE":
        return "text-[#b33d25]";
    }
  };

  return (
    <Collapsible.Content>
      <ul className="flex flex-col gap-1 pl-1">
        {items.map((item) => (
          <li
            key={item.id}
            className="duration-150 hover:bg-[#0d1117] px-2 py-1 rounded cursor-pointer"
          >
            <span className={`font-bold ${getMethodTextColor(item.method!)}`}>
              {item.method}
            </span>{" "}
            - {item.title}
          </li>
        ))}
      </ul>
    </Collapsible.Content>
  );
};
