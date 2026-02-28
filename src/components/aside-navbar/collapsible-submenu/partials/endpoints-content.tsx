import { Collapsible } from "radix-ui";
import type { IEndpointSubmenuItem } from "../types";
import Link from "next/link";
import { ROUTES } from "@shared/routes";
import { Method } from "@shared/models/endpoint";
import { usePathname } from "next/navigation";

type Props = {
  items: Array<IEndpointSubmenuItem>;
};

export const EndpointsContent = ({ items }: Props) => {
  const pathname = usePathname();

  const getMethodTextColor = (method: Method) => {
    switch (method) {
      case Method.GET:
        return "text-[#705ee2]";
      case Method.POST:
        return "text-[#83d13a]";
      case Method.PUT:
        return "text-[#dd7747]";
      case Method.PATCH:
        return "text-[#ddcd38]";
      case Method.DELETE:
        return "text-[#b33d25]";
    }
  };

  return (
    <Collapsible.Content className="overflow-hidden data-[state=open]:animate-[collapsible-down_150ms_ease-out] data-[state=closed]:animate-[collapsible-up_150ms_ease-out]">
      <ul className="flex flex-col gap-1">
        {items.map((item) => {
          const isActive = pathname === ROUTES.ENDPOINTS.DETAIL(item.id);

          return (
            <li key={item.id}>
              <Link
                href={ROUTES.ENDPOINTS.DETAIL(item.id)}
                className={`block duration-150 px-2 pl-4 py-1 rounded ${isActive ? "bg-[#141a22]" : "hover:bg-[#0d1117]"}`}
              >
                <span
                  className={`font-bold ${getMethodTextColor(item.method)}`}
                >
                  {item.method}
                </span>{" "}
                - {item.title}
              </Link>
            </li>
          );
        })}

        <li className="flex mt-1">
          <Link
            href={ROUTES.ENDPOINTS.CREATE}
            className="border border-green-300 text-green-300 font-medium rounded mx-auto px-4 cursor-pointer hover:bg-green-300 hover:text-[#010409] duration-150"
          >
            Create endpoint +
          </Link>
        </li>
      </ul>
    </Collapsible.Content>
  );
};
