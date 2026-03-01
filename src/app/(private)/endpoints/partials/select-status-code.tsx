"use client";

import { forwardRef } from "react";
import { Select } from "radix-ui";
import { PiCaretDownBold, PiCaretUpBold } from "react-icons/pi";
import { FaCheck } from "react-icons/fa6";
import type { IStatusCode } from "@shared/models/status-code";

type Props = {
  value: string;
  setValue: (value: string) => void;
  statusCodes: IStatusCode[];
};

type Group = {
  label: string;
  range: string;
  color: string;
  badgeClass: string;
  codes: IStatusCode[];
};

function groupStatusCodes(codes: IStatusCode[]): Group[] {
  const groups: Omit<Group, "codes">[] = [
    {
      label: "Informational",
      range: "1xx",
      color: "text-text-muted",
      badgeClass: "bg-white/10 text-text-muted",
    },
    {
      label: "Success",
      range: "2xx",
      color: "text-method-post",
      badgeClass: "bg-method-post-bg text-method-post",
    },
    {
      label: "Redirection",
      range: "3xx",
      color: "text-accent-hover",
      badgeClass: "bg-accent/10 text-accent-hover",
    },
    {
      label: "Client Error",
      range: "4xx",
      color: "text-method-put",
      badgeClass: "bg-method-put-bg text-method-put",
    },
    {
      label: "Server Error",
      range: "5xx",
      color: "text-method-delete",
      badgeClass: "bg-method-delete-bg text-method-delete",
    },
  ];

  return groups
    .map((g) => ({
      ...g,
      codes: codes.filter(
        (c) =>
          c.code >= Number(g.range[0]) * 100 &&
          c.code < (Number(g.range[0]) + 1) * 100,
      ),
    }))
    .filter((g) => g.codes.length > 0);
}

function getGroupForCode(code: string, groups: Group[]) {
  const num = Number(code);
  return groups.find(
    (g) =>
      num >= Number(g.range[0]) * 100 && num < (Number(g.range[0]) + 1) * 100,
  );
}

export function SelectStatusCode({ value, setValue, statusCodes }: Props) {
  const groups = groupStatusCodes(statusCodes);
  const group = value ? getGroupForCode(value, groups) : null;
  const triggerColor = group?.color ?? "text-white/70";

  return (
    <Select.Root value={value} onValueChange={setValue}>
      <Select.Trigger
        id="status-code"
        aria-label="Status code"
        className={`border border-border py-1.5 px-3 bg-background-tertiary rounded-md text-sm font-bold cursor-pointer ${triggerColor}
          select-none transition-colors hover:border-accent/50 focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
          flex items-center gap-2`}
      >
        <span className="flex items-center gap-2">
          {value && group && (
            <span
              className={`text-[11px] font-bold px-1.5 py-0.5 rounded ${group.badgeClass} shrink-0`}
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
            {groups.map((group) => (
              <Select.Group key={group.range}>
                <Select.Label className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-widest text-text-subtle select-none">
                  {group.label} ({group.range})
                </Select.Label>

                {group.codes.map((sc) => (
                  <StatusItem
                    key={sc.code}
                    value={String(sc.code)}
                    badgeClass={group.badgeClass}
                  >
                    {sc.code} {sc.description}
                  </StatusItem>
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
  );
}

type StatusItemProps = {
  value: string;
  badgeClass: string;
  children: React.ReactNode;
};

const StatusItem = forwardRef<HTMLDivElement, StatusItemProps>(
  ({ value, badgeClass, children, ...props }, forwardedRef) => {
    const code = value;

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
            {code}
          </span>
          <Select.ItemText>
            <span className="text-text-muted">
              {String(children).replace(`${code}, ,`, "")}
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
