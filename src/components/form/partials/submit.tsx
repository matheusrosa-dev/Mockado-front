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
            className="not-disabled:cursor-pointer inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold
            bg-accent text-white not-disabled:hover:bg-accent-hover duration-150 select-none focus:outline-none focus:ring-2 
            focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background-primary"
            ref={forwardedRef}
          >
            {children}
          </button>
        </FormRadix.Submit>
      </Skeleton>
    );
  },
);
