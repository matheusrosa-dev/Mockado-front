import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";
import { Skeleton } from "../skeleton";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
  showSkeleton?: boolean;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  (
    { name, label, error, showSkeleton = false, disabled, ...props },
    forwardedRef,
  ) => {
    return (
      <FormRadix.Field name={name} className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <FormRadix.Label className="text-sm font-medium text-text-muted select-none">
            {label}
          </FormRadix.Label>

          {error && (
            <FormRadix.Message className="text-xs text-red-500">
              {error}
            </FormRadix.Message>
          )}
        </div>

        <Skeleton show={showSkeleton} className="rounded-md">
          <FormRadix.Control asChild>
            <input
              {...props}
              ref={forwardedRef}
              type="text"
              disabled={disabled || showSkeleton}
              className={`w-full border rounded-md py-1.5 px-3 bg-background-tertiary text-sm transition-colors
             placeholder-text-subtle
             focus:outline-none focus:ring-1 ${
               error
                 ? "border-red-500 text-red-500 focus:border-red-500 focus:ring-red-500/30"
                 : "border-border text-white/90 focus:border-accent focus:ring-accent/30"
             }`}
            />
          </FormRadix.Control>
        </Skeleton>
      </FormRadix.Field>
    );
  },
);
