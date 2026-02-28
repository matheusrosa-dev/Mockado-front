"use client";

import { forwardRef } from "react";
import { Select } from "radix-ui";
import { PiCaretDownBold } from "react-icons/pi";
import { getMethodTextColor } from "@shared/helpers/http-method";
import { HttpMethod } from "@shared/models/endpoint";
import { FaCheck } from "react-icons/fa6";

type Props = {
  value: HttpMethod;
  setValue: (value: HttpMethod) => void;
};

export const SelectHttpMethod = ({ value, setValue }: Props) => {
  const textColor = getMethodTextColor(value);

  return (
    <div>
      <Select.Root
        value={value}
        onValueChange={(value: HttpMethod) => setValue(value)}
      >
        <Select.Trigger
          aria-label="HTTP method"
          className={`border-2 py-1 px-3 border-background-secondary bg-black/20 rounded font-bold ${textColor}`}
        >
          <Select.Value placeholder="Select a method" />
          <Select.Icon>
            <PiCaretDownBold className="inline ml-2 text-white" />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content className="bg-background-primary border-2 border-background-secondary rounded shadow-2xl">
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
};

type ItemProps = Select.SelectItemProps & {
  value: HttpMethod;
  children: React.ReactNode;
};

const Item = forwardRef<HTMLDivElement, ItemProps>(
  ({ children, ...props }, forwardedRef) => {
    const textColor = getMethodTextColor(props.value);

    return (
      <Select.Item
        className={`cursor-pointer font-bold ${textColor} hover:bg-background-secondary hover:outline-none duration-150 px-3 py-1`}
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
