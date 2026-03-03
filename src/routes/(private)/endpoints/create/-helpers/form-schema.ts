import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { IForm } from "../-types";
import { statusCodeHasBody } from "@shared/helpers/status-code";

const schema = yup.object({
  title: yup
    .string()
    .required("Required")
    .max(50, "Max length is 50 characters")
    .trim(),
  description: yup
    .string()
    .optional()
    .max(200, "Max length is 200 characters")
    .trim(),
  statusCode: yup.string().required(),
  method: yup.string().required(),
  delay: yup
    .number()
    .transform((val, orig) => (orig === "" ? undefined : val))
    .optional()
    .min(0, "Min is 0")
    .max(10, "Max is 10"),

  jsonResponse: yup.string().test({
    message: "Invalid JSON",
    test: function (value) {
      const statusCode = (this.parent as IForm).statusCode;

      if (!statusCode) return true;

      if (!statusCodeHasBody(statusCode)) {
        return true;
      }

      if (!value) return false;

      try {
        JSON.parse(value);
        return true;
      } catch {
        return false;
      }
    },
  }),
});

export const schemaResolver = yupResolver(schema) as Resolver<IForm>;
