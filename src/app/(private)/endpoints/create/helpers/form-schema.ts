import { yupResolver } from "@hookform/resolvers/yup";
import type { Resolver } from "react-hook-form";
import * as yup from "yup";
import type { IForm } from "../types";

const schema = yup.object({
  title: yup
    .string()
    .required("Required")
    .max(100, "Max length is 100 characters"),
});

export const schemaResolver = yupResolver(schema) as Resolver<IForm>;
