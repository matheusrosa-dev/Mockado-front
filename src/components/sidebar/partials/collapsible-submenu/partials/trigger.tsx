import { Collapsible } from "radix-ui";
import { PiCaretRightBold } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  isOpen: boolean;
};

export function Trigger({ isOpen, title }: Props) {
  return (
    <Collapsible.Trigger asChild>
      <button
        type="button"
        className="w-full text-start flex items-center justify-between px-2 py-1.5 cursor-pointer duration-150 rounded hover:bg-white/5 group"
      >
        <span className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-text-subtle group-hover:text-text-muted">
          {title}
        </span>
        <PiCaretRightBold
          className={twMerge(
            "duration-150 text-text-subtle",
            isOpen ? "rotate-90" : "",
          )}
        />
      </button>
    </Collapsible.Trigger>
  );
}
