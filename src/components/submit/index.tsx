import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Submit = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <FormRadix.Submit asChild>
        <button
          className="cursor-pointer inline-flex items-center justify-center gap-2 rounded-md px-4 py-2 text-sm font-semibold
            bg-accent text-white hover:bg-accent-hover active:scale-95 transition-all duration-150 select-none
            focus:outline-none focus:ring-2 focus:ring-accent/40 focus:ring-offset-2 focus:ring-offset-background-primary"
          {...props}
          ref={forwardedRef}
        >
          {children}
        </button>
      </FormRadix.Submit>
    );
  },
);
