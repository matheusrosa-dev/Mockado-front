import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";
import { Skeleton } from "../../skeleton";

type Props = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  name: string;
  label?: string;
  error?: string;
  showSkeleton?: boolean;
};

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  (
    { name, label, error, showSkeleton = false, disabled, ...props },
    forwardedRef,
  ) => {
    return (
      <FormRadix.Field name={name} className="flex flex-col gap-1.5">
        <div className="flex items-baseline">
          {label && (
            <FormRadix.Label className="text-sm font-medium text-text-muted select-none">
              {label}
            </FormRadix.Label>
          )}

          {error && (
            <FormRadix.Message className="text-xs text-error ml-auto">
              {error}
            </FormRadix.Message>
          )}
        </div>

        <Skeleton show={showSkeleton} className="rounded-md">
          <FormRadix.Control asChild>
            <textarea
              {...props}
              disabled={disabled || showSkeleton}
              className={`w-full border rounded-md py-1.5 px-3 bg-background-tertiary text-sm transition-colors resize-none
             placeholder-text-subtle
             focus:outline-none focus:ring-1${
               error
                 ? " border-error text-error focus:border-error focus:ring-error/30"
                 : " border-border text-white/90 focus:border-accent focus:ring-accent/30"
             }`}
              ref={forwardedRef}
            />
          </FormRadix.Control>
        </Skeleton>
      </FormRadix.Field>
    );
  },
);
