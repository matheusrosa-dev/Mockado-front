import { Select } from "radix-ui";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import type { IStatusCode } from "@shared/models/status-code";
import { getGroupByCode, groupStatusCodes } from "./helpers";
import { Item } from "./partials";
import { Skeleton } from "@components";

type Props = {
  value: string;
  onChange: (value: string) => void;
  statusCodes: IStatusCode[];
  disabled?: boolean;
  showSkeleton?: boolean;
};

export function SelectStatusCode({
  value,
  onChange,
  statusCodes,
  disabled,
  showSkeleton = false,
}: Props) {
  const groupedStatusCodes = groupStatusCodes(statusCodes);

  const selectedStatusCodeGroup = value ? getGroupByCode(value) : null;
  const triggerColor = selectedStatusCodeGroup?.color || "text-white/70";

  return (
    <div className="flex flex-col gap-1.5">
      <label
        htmlFor="status-code"
        className="w-fit text-sm font-medium text-text-muted select-none"
      >
        Status code
      </label>

      <Select.Root
        value={value}
        onValueChange={onChange}
        disabled={disabled || showSkeleton}
      >
        <Skeleton show={showSkeleton} className="rounded-md">
          <Select.Trigger
            id="status-code"
            aria-label="Status code"
            className={`border border-border py-1.5 px-3 bg-background-tertiary rounded-md text-sm font-bold not-disabled:cursor-pointer ${triggerColor}
            select-none transition-colors hover:border-accent/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
            flex items-center gap-2`}
          >
            <span className="flex items-center gap-2">
              {selectedStatusCodeGroup && (
                <span
                  className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${selectedStatusCodeGroup.badgeClass} shrink-0`}
                >
                  {value}
                </span>
              )}
              <Select.Value placeholder="Status code" />
            </span>
            <Select.Icon>
              <PiCaretDownBold className="text-text-muted" />
            </Select.Icon>
          </Select.Trigger>
        </Skeleton>

        <Select.Portal>
          <Select.Content
            className="border border-border rounded-md shadow-2xl shadow-black/50 bg-background-tertiary max-h-72 overflow-hidden"
            position="popper"
            sideOffset={6}
          >
            <Select.ScrollUpButton className="flex items-center justify-center py-1 text-text-muted cursor-default">
              <PiCaretUpBold />
            </Select.ScrollUpButton>

            <Select.Viewport className="p-1">
              {groupedStatusCodes.map((group) => (
                <Select.Group key={group.range}>
                  <Select.Label className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-subtle select-none">
                    {group.label} ({group.range})
                  </Select.Label>

                  {group.statusCodes.map((statusCode) => (
                    <Item
                      key={statusCode.code}
                      value={String(statusCode.code)}
                      badgeClass={group.badgeClass}
                    >
                      {statusCode.description}
                    </Item>
                  ))}

                  <Select.Separator className="my-1 h-px bg-border mx-2" />
                </Select.Group>
              ))}
            </Select.Viewport>

            <Select.ScrollDownButton className="flex items-center justify-center py-1 text-text-muted cursor-default">
              <PiCaretDownBold />
            </Select.ScrollDownButton>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
}
