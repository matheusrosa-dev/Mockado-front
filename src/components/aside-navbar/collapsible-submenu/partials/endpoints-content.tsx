import { Collapsible } from "radix-ui";
import type { IEndpointSubmenuItem } from "../types";
import Link from "next/link";
import { ROUTES } from "@shared/routes";
import { usePathname } from "next/navigation";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";

type Props = {
  items: Array<IEndpointSubmenuItem>;
};

export function EndpointsContent({ items }: Props) {
  const pathname = usePathname();

  return (
    <Collapsible.Content className="mt-1 overflow-hidden data-[state=open]:animate-[collapsible-down_150ms_ease-out] data-[state=closed]:animate-[collapsible-up_150ms_ease-out]">
      <ul className="flex flex-col gap-1 px-1">
        {items.map((item) => {
          const isActive = pathname === ROUTES.ENDPOINTS.DETAIL(item.id);

          return (
            <li key={item.id}>
              <Link
                href={ROUTES.ENDPOINTS.DETAIL(item.id)}
                className={`block duration-150 px-2 pl-4 py-1 rounded ${isActive ? "bg-background-tertiary" : "hover:bg-background-primary"}`}
              >
                <span
                  className={`font-bold ${getHttpMethodTextColor(item.method)}`}
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
            className="border border-green-300 text-green-300 font-medium rounded mx-auto px-4 cursor-pointer hover:bg-green-300 hover:text-background-secondary duration-150"
          >
            Create endpoint +
          </Link>
        </li>
      </ul>
    </Collapsible.Content>
  );
}
