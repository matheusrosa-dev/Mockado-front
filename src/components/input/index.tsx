import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  name: string;
  label: string;
  error?: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ name, label, error, ...props }, forwardedRef) => {
    return (
      <FormRadix.Field name={name} className="flex flex-col gap-1.5">
        <div className="flex items-baseline justify-between">
          <FormRadix.Label className="text-sm font-medium text-text-muted select-none">
            {label}
          </FormRadix.Label>

          {error && (
            <FormRadix.Message className="text-xs text-method-delete">
              {error}
            </FormRadix.Message>
          )}
        </div>

        <FormRadix.Control asChild>
          <input
            type="text"
            className="w-full border border-border rounded-md py-1.5 px-3 bg-background-tertiary text-sm text-white/90
             placeholder-text-subtle transition-colors
             focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30"
            {...props}
            ref={forwardedRef}
          />
        </FormRadix.Control>
      </FormRadix.Field>
    );
  },
);
