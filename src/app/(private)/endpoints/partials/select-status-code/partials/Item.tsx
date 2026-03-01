import { forwardRef } from "react";
import { Select } from "radix-ui";
import { FaCheck } from "react-icons/fa6";

type Props = {
  value: string;
  badgeClass: string;
  children: React.ReactNode;
};

export const Item = forwardRef<HTMLDivElement, Props>(
  ({ value, badgeClass, children, ...props }, forwardedRef) => {
    return (
      <Select.Item
        value={value}
        className="cursor-pointer text-sm text-white/80 bg-background-tertiary hover:bg-background-secondary duration-150 px-3 py-1.5
          select-none focus:outline-none focus:bg-background-secondary rounded flex items-center justify-between gap-3"
        ref={forwardedRef}
        {...props}
      >
        <div className="flex items-center gap-2">
          <span
            className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${badgeClass} shrink-0`}
          >
            {value}
          </span>
          <Select.ItemText>
            <span className="text-text-muted">
              {String(children).replace(`${value}, ,`, "")}
            </span>
          </Select.ItemText>
        </div>
        <Select.ItemIndicator>
          <FaCheck className="text-accent text-xs" />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);
