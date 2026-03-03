import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { IForm } from "../-types";

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
});

export const schemaResolver = yupResolver(schema) as Resolver<IForm>;
