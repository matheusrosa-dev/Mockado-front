"use client";

import type { HttpMethod } from "@shared/const/endpoint";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { Select } from "radix-ui";
import { forwardRef } from "react";
import { FaCheck } from "react-icons/fa6";

type Props = Select.SelectItemProps & {
  value: HttpMethod;
  children: React.ReactNode;
};

export const Item = forwardRef<HTMLDivElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    const textColor = getHttpMethodTextColor(props.value);

    return (
      <Select.Item
        className={`cursor-pointer text-sm font-bold ${textColor} bg-background-tertiary hover:bg-background-secondary duration-150 px-3 py-1.5
        select-none hover:outline-none! focus:outline-none focus:bg-background-secondary`}
        {...props}
        ref={forwardedRef}
      >
        <div className="flex items-center gap-2">
          <Select.ItemText>{children}</Select.ItemText>
          <Select.ItemIndicator>
            <FaCheck className="text-accent text-xs" />
          </Select.ItemIndicator>
        </div>
      </Select.Item>
    );
  },
);
