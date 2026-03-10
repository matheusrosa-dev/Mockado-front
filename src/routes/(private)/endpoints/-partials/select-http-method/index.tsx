import { Select } from "radix-ui";
import { PiCaretDownBold } from "react-icons/pi";
import { getHttpMethodTextColor } from "@shared/helpers/http-method";
import { HttpMethod } from "@shared/const/endpoint";
import { Item } from "./partials";
import { Skeleton } from "@components";

type Props = {
  value: HttpMethod;
  onChange: (value: HttpMethod) => void;

  disabled?: boolean;
  showSkeleton?: boolean;
};

export function SelectHttpMethod({
  value,
  onChange,
  disabled,
  showSkeleton = false,
}: Props) {
  const textColor = getHttpMethodTextColor(value);

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="http-method"
        className="w-fit text-sm font-medium text-text-muted select-none"
      >
        Method
      </label>

      <Select.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled || showSkeleton}
      >
        <Skeleton show={showSkeleton} className="rounded-md">
          <Select.Trigger
            id="http-method"
            aria-label="HTTP method"
            className={`border border-border py-1.5 px-3 bg-background-tertiary rounded-md text-sm font-bold ${textColor} 
            select-none transition-colors not-disabled:hover:border-accent/50 focus:outline-none focus:border-accent 
            focus:ring-1 not-disabled:focus:ring-accent/30 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer
            `}
          >
            <Select.Value placeholder="Select a method" />
            <Select.Icon>
              <PiCaretDownBold className="inline ml-2 text-text-muted" />
            </Select.Icon>
          </Select.Trigger>
        </Skeleton>

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
