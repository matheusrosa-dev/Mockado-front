"use client";

import { Input, Submit } from "@components";
import { SelectHttpMethod } from "../../partials/select-http-method";
import { HttpMethod } from "@shared/models/endpoint";
import { useState } from "react";
import { Form as FormComponent } from "@components";
import { useForm } from "react-hook-form";
import type { IForm } from "../types";
import { schemaResolver } from "../helpers";

export const Form = () => {
  const [method, setMethod] = useState(HttpMethod.GET);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: schemaResolver,
  });

  return (
    <div>
      <FormComponent
        className="flex flex-col gap-2 w-120"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <Input
          label="Title"
          {...register("title")}
          error={errors.title?.message}
        />

        <SelectHttpMethod value={method} setValue={setMethod} />

        <Submit>Submit</Submit>
      </FormComponent>
    </div>
  );
};
