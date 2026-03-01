"use client";

import { forwardRef } from "react";
import { Select } from "radix-ui";
import { PiCaretDownBold } from "react-icons/pi";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { HttpMethod } from "@shared/const/endpoint";
import { FaCheck } from "react-icons/fa6";

type Props = {
  value: HttpMethod;
  setValue: (value: HttpMethod) => void;
};

export function SelectHttpMethod({ value, setValue }: Props) {
  const textColor = getHttpMethodTextColor(value);

  return (
    <div>
      <Select.Root
        value={value}
        onValueChange={(value: HttpMethod) => setValue(value)}
      >
        <Select.Trigger
          aria-label="HTTP method"
          className={`border border-border py-1.5 px-3 bg-background-tertiary rounded-md text-sm font-bold cursor-pointer ${textColor}
          select-none transition-colors hover:border-accent/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30`}
        >
          <Select.Value placeholder="Select a method" />
          <Select.Icon>
            <PiCaretDownBold className="inline ml-2 text-text-muted" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="border border-border rounded-md shadow-2xl shadow-black/50 bg-background-tertiary">
            <Select.Viewport>
              {Object.values(HttpMethod).map((method) => (
                <Item key={method} value={method}>
                  {method}
                </Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}

type ItemProps = Select.SelectItemProps & {
  value: HttpMethod;
  children: React.ReactNode;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, ...props }, forwardedRef) => {
    const textColor = getHttpMethodTextColor(props.value);

    return (
      <Select.Item
        className={`cursor-pointer text-sm font-bold ${textColor} bg-background-tertiary hover:bg-background-secondary duration-150 px-3 py-1.5
        select-none hover:outline-none! focus:outline-none focus:bg-background-secondary`}
        {...props}
        ref={forwardedRef}
      >
        <Select.ItemText>{children}</Select.ItemText>
        <Select.ItemIndicator>
          <FaCheck className="inline ml-2 text-white" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);
