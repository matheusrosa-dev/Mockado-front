import { Skeleton } from "@components";
import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  error?: string;
  showSkeleton?: boolean;
};

export const InputDelay = forwardRef<HTMLInputElement, Props>(
  ({ name, error, showSkeleton = false, disabled, ...props }, forwardedRef) => {
    return (
      <FormRadix.Field name={name} className="flex flex-col gap-1.5 w-24">
        <div className="flex items-baseline justify-between">
          <FormRadix.Label className="text-sm font-medium text-text-muted select-none">
            Delay
          </FormRadix.Label>

          {error && (
            <FormRadix.Message className="text-xs text-error">
              {error}
            </FormRadix.Message>
          )}
        </div>

        <Skeleton show={showSkeleton} className="rounded-md">
          <div className="relative">
            <FormRadix.Control asChild>
              <input
                {...props}
                type="number"
                placeholder="0"
                ref={forwardedRef}
                disabled={disabled || showSkeleton}
                onKeyDown={(e) => {
                  if (e.key === "ArrowUp" || e.key === "ArrowDown") {
                    e.preventDefault();
                  }

                  if (["e", "E", ".", "+", "-"].includes(e.key)) {
                    e.preventDefault();
                  }
                }}
                onInput={(e) => {
                  const input = e.currentTarget;
                  if (input.value.length > 2) {
                    input.value = input.value.slice(0, 2);
                  }
                }}
                className={`w-full border rounded-md py-1.5 px-3 bg-background-tertiary text-sm transition-colors
             placeholder-text-subtle focus:outline-none focus:ring-1 pr-16 ${
               error
                 ? "border-error text-error focus:border-error focus:ring-error/30"
                 : "border-border text-white/90 focus:border-accent focus:ring-accent/30"
             }`}
              />
            </FormRadix.Control>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-text-subtle select-none pointer-events-none">
              seconds
            </span>
          </div>
        </Skeleton>
      </FormRadix.Field>
    );
  },
);
