import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";
import { Skeleton } from "../../skeleton";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  showSkeleton?: boolean;
};

export const Submit = forwardRef<HTMLButtonElement, Props>(
  ({ children, showSkeleton = false, disabled, ...props }, forwardedRef) => {
    return (
      <Skeleton
        show={showSkeleton}
        containerClassName="w-fit"
        className="rounded-md"
      >
        <FormRadix.Submit asChild>
          <button
            {...props}
            disabled={disabled || showSkeleton}
            className="disabled:cursor-not-allowed cursor-pointer inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold
            bg-accent/10 border border-accent/30 text-accent not-disabled:hover:bg-accent/20 not-disabled:hover:border-accent/50 
            duration-150 select-none focus:outline-none focus:ring-2 focus:ring-accent/30 focus:ring-offset-2 focus:ring-offset-background-primary disabled:opacity-40"
            ref={forwardedRef}
          >
            {children}
          </button>
        </FormRadix.Submit>
      </Skeleton>
    );
  },
);
