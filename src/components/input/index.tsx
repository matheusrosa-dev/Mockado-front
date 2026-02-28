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
      <FormRadix.Field name={name} className="flex flex-col gap-1">
        <div className="flex items-baseline justify-between">
          <FormRadix.Label className="font-medium select-none">
            {label}
          </FormRadix.Label>

          {error && (
            <FormRadix.Message className="text-red-500">
              {error}
            </FormRadix.Message>
          )}
        </div>

        <FormRadix.Control asChild>
          <input
            type="text"
            className="w-full border-2 rounded border-background-secondary py-1 px-2 bg-background-tertiary 
             focus:outline-2 focus:outline-solid focus:outline-white/10 focus:outline-offset-2"
            {...props}
            ref={forwardedRef}
          />
        </FormRadix.Control>
      </FormRadix.Field>
    );
  },
);
