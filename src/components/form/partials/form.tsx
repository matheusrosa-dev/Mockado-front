import { Form as FormRadix } from "radix-ui";
import { forwardRef } from "react";

type Props = FormRadix.FormProps & {
  children: React.ReactNode;
};

export const Form = forwardRef<HTMLFormElement, Props>(
  ({ children, ...props }, forwardedRef) => {
    return (
      <FormRadix.Root {...props} ref={forwardedRef}>
        {children}
      </FormRadix.Root>
    );
  },
);
