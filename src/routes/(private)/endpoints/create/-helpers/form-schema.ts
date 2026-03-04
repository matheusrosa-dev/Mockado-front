/** biome-ignore-all lint/suspicious/noThenProperty: <then in this file is a prop not a promise> */
import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import { ResponseBodyType, type IForm } from "../-types";
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

  responseBodyType: yup
    .mixed<ResponseBodyType>()
    .oneOf(Object.values(ResponseBodyType))
    .required("Required"),

  responseJson: yup.string().when(["statusCode", "responseBodyType"], {
    is: (statusCode: string, responseBodyType: ResponseBodyType) => {
      return (
        responseBodyType === ResponseBodyType.JSON &&
        statusCodeHasBody(statusCode)
      );
    },
    then: (schema) => schema.required("Required").trim(),
    otherwise: (schema) => schema.optional(),
  }),

  responseText: yup
    .string()
    .max(1000, "Max length is 1000 characters")
    .optional(),
});

export const schemaResolver = yupResolver(schema) as Resolver<IForm>;
