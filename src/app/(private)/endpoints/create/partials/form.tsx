"use client";

import { Input, Submit } from "@components";
import { SelectHttpMethod } from "../../partials/select-http-method";
import { HttpMethod } from "@shared/models/endpoint";
import { useState } from "react";
import { Form as FormComponent } from "@components";
import { useForm } from "react-hook-form";
import type { IForm } from "../types";
import { schemaResolver } from "../helpers";
import Editor from "@monaco-editor/react";

export const Form = () => {
  const [method, setMethod] = useState(HttpMethod.GET);

  const [value, onChange] = useState('{\n     "key": "value"\n}');

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
        className="flex gap-4"
        onSubmit={handleSubmit((data) => console.log(data))}
      >
        <div className="flex flex-col gap-2 w-120">
          <Input
            label="Title"
            {...register("title")}
            error={errors.title?.message}
          />
          <SelectHttpMethod value={method} setValue={setMethod} />
          <Submit>Submit</Submit>
        </div>

        <div className="flex-1 flex flex-col gap-1">
          <span className="font-medium cursor-default select-none">
            Response body
          </span>
          <Editor
            key={"teste"}
            height="300px"
            defaultLanguage="json"
            value={value}
            onChange={(v) => onChange(v ?? "")}
            loading="Loading editor..."
            theme="vs-dark"
            options={{
              minimap: { enabled: false },
              formatOnPaste: true,
              padding: {
                top: 28,
              },
            }}
          />
        </div>
      </FormComponent>
    </div>
  );
};
