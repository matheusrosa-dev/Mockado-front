import { forwardRef } from "react";
import { Switch } from "radix-ui";

type Props = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  label?: string;
  className?: string;
};

export const Toggle = forwardRef<HTMLButtonElement, Props>(
  ({ checked, onChange, disabled = false, label, className = "" }, ref) => {
    return (
      <label
        htmlFor={label}
        className={`flex items-center gap-2 cursor-pointer select-none ${className}`}
      >
        <span className="text-sm text-white/80 font-medium">{label}</span>

        <Switch.Root
          id={label}
          ref={ref}
          className="w-11 h-6 bg-background-tertiary rounded-full duration-150 border border-border data-[state=checked]:bg-accent"
        >
          <Switch.Thumb
            className="block size-5.5 bg-white rounded-full shadow-[0_2px_2px_var(--black-a7)] 
            transition-transform duration-150 translate-x-0.5 will-change-transform data-[state=checked]:translate-x-4.5"
          />
        </Switch.Root>

        <span className="relative inline-block w-10 h-6">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only peer"
          />

          <span
            className="absolute left-0 top-0 w-10 h-6 rounded-full transition-colors
              bg-background-tertiary border border-border peer-checked:bg-accent/60 peer-checked:border-accent
              peer-disabled:opacity-50"
          />
          <span
            className="absolute top-1 left-1 w-4 h-4 rounded-full bg-white/90 transition-transform
              peer-checked:translate-x-4 peer-disabled:bg-white/50"
          />
        </span>
      </label>
    );
  },
);
