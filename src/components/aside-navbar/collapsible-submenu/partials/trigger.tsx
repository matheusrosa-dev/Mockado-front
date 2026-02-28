import { Collapsible } from "radix-ui";
import { PiCaretRightBold } from "react-icons/pi";
import { twMerge } from "tailwind-merge";

type Props = {
  title: string;
  isOpen: boolean;
};

export const Trigger = ({ isOpen, title }: Props) => {
  return (
    <Collapsible.Trigger asChild>
      <button
        type="button"
        className="w-full text-start flex items-center justify-between px-2 py-1 cursor-pointer duration-150 hover:bg-background-primary rounded"
      >
        <span className="flex items-center font-medium">{title}</span>
        <PiCaretRightBold
          className={twMerge("duration-150", isOpen ? "rotate-90" : "")}
        />
      </button>
    </Collapsible.Trigger>
  );
};
