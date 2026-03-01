"use client";

import { Input, Submit } from "@components";
import { SelectHttpMethod, SelectStatusCode } from "../../partials";
import { HttpMethod } from "@shared/const/endpoint";
import { useState } from "react";
import { Form as FormComponent } from "@components";
import { useForm } from "react-hook-form";
import type { IForm } from "../types";
import { schemaResolver } from "../helpers";
import Editor from "@monaco-editor/react";
import type { IStatusCode } from "@shared/models/status-code";
import { statusCodeHasBody } from "@shared/helpers/status-code";

type Props = {
  statusCodes: IStatusCode[];
};

export function Form({ statusCodes }: Props) {
  const [method, setMethod] = useState(HttpMethod.GET);
  const [statusCode, setStatusCode] = useState("200");

  const [value, onChange] = useState('{\n     "key": "value"\n}');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IForm>({
    resolver: schemaResolver,
  });

  return (
    <FormComponent
      className="flex flex-col gap-6 max-w-3xl"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="rounded-lg border border-border bg-background-secondary p-5 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
          Endpoint info
        </h2>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <Input
              label="Title"
              placeholder="e.g. Get all users"
              {...register("title")}
              error={errors.title?.message}
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="http-method"
              className="w-fit text-sm font-medium text-text-muted select-none"
            >
              Method
            </label>

            <SelectHttpMethod value={method} setValue={setMethod} />
          </div>

          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="status-code"
              className="w-fit text-sm font-medium text-text-muted select-none"
            >
              Status code
            </label>
            <SelectStatusCode
              value={statusCode}
              setValue={setStatusCode}
              statusCodes={statusCodes}
            />
          </div>
        </div>
      </div>

      {statusCodeHasBody(Number(statusCode)) && (
        <div className="rounded-lg border border-border bg-background-secondary p-5 flex flex-col gap-3">
          <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
            Response body
          </h2>
          <div className="rounded-md overflow-hidden border border-border">
            <Editor
              height="280px"
              defaultLanguage="json"
              value={value}
              onChange={(v) => onChange(v ?? "")}
              loading="Loading editor..."
              theme="vs-dark"
              options={{
                minimap: { enabled: false },
                formatOnPaste: true,
                padding: { top: 16, bottom: 16 },
                fontSize: 13,
                lineHeight: 20,
              }}
            />
          </div>
        </div>
      )}

      <div>
        <Submit>Create endpoint</Submit>
      </div>
    </FormComponent>
  );
}
