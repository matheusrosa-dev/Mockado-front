import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { IForm } from "../types";

const schema = yup.object({
  title: yup
    .string()
    .required("Required")
    .max(30, "Max length is 30 characters")
    .trim(),
});

export const schemaResolver = yupResolver(schema) as Resolver<IForm>;
