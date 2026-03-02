import { Collapsible } from "radix-ui";
import type { IEndpointSubmenuItem } from "../types";
import {
  getHttpMethodTextColor,
  getHttpMethodBgColor,
} from "@shared/helpers/http-method";
import { useLocation, Link } from "@tanstack/react-router";

type Props = {
  items: Array<IEndpointSubmenuItem>;
};

export function EndpointsContent({ items }: Props) {
  const { pathname } = useLocation();

  return (
    <Collapsible.Content className="mt-1 overflow-hidden data-[state=open]:animate-[collapsible-down_150ms_ease-out] data-[state=closed]:animate-[collapsible-up_150ms_ease-out]">
      <ul className="flex flex-col gap-0.5 px-1">
        {items.map((item) => {
          const isActive = pathname === `/endpoints/${item.id}`;

          return (
            <li key={item.id}>
              <Link
                to="/endpoints/$id"
                params={{
                  id: item.id,
                }}
                className={`flex items-center gap-2 duration-150 px-2 py-1.5 rounded text-sm
                  ${
                    isActive
                      ? "bg-accent/15 text-white"
                      : "text-text-muted hover:bg-white/5 hover:text-white"
                  }`}
              >
                <span
                  className={`text-[10px] font-bold shrink-0 w-14 text-center py-0.5 rounded ${getHttpMethodTextColor(item.method)} ${getHttpMethodBgColor(item.method)}`}
                >
                  {item.method}
                </span>
                <span className="truncate">{item.title}</span>
              </Link>
            </li>
          );
        })}

        <li className="mt-2 px-1">
          <Link
            to="/endpoints/create"
            className="flex items-center justify-center gap-1.5 w-full py-1.5 rounded-md border border-dashed border-border text-xs font-medium text-text-muted cursor-pointer hover:border-accent hover:text-accent duration-150"
          >
            <span>+</span>
            <span>New endpoint</span>
          </Link>
        </li>
      </ul>
    </Collapsible.Content>
  );
}
