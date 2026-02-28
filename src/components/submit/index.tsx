import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
};

export const Submit = forwardRef<HTMLButtonElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <FormRadix.Submit asChild>
        <button className="cursor-pointer" {...props} ref={forwardedRef}>
          {children}
        </button>
      </FormRadix.Submit>
    );
  },
);
