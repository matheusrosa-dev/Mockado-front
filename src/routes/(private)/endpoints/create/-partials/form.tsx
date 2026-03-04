import { JsonEditor, Form as FormComponent } from "@components";
import {
  InputDelay,
  SelectHttpMethod,
  SelectStatusCode,
} from "../../-partials";
import { SelectResponseBodyType } from "./select-response-body-type";
import { HttpMethod } from "@shared/const/endpoint";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ResponseBodyType, type IForm } from "../-types";
import { schemaResolver } from "../-helpers";
import type { IStatusCode } from "@shared/models/status-code";
import { statusCodeHasBody } from "@shared/helpers/status-code";

type Props = {
  isLoading: boolean;
  statusCodes: IStatusCode[];
};

export function Form({ isLoading, statusCodes }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<IForm>({
    resolver: schemaResolver,
    defaultValues: {
      method: HttpMethod.GET,
      statusCode: "200",
      responseBodyType: ResponseBodyType.JSON,
      responseJson: '{\n     "key": "value"\n}',
    },
  });

  const responseBodyType = useWatch({
    control,
    name: "responseBodyType",
  });

  const statusCode = useWatch({
    control,
    name: "statusCode",
  });

  return (
    <FormComponent.Form
      className="flex flex-col gap-6 lg:max-w-4xl"
      onSubmit={handleSubmit((data) => console.log(data))}
    >
      <div className="rounded-lg border border-border bg-background-secondary p-5 flex flex-col gap-4">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest">
          Endpoint info
        </h2>

        <div className="flex items-end gap-3">
          <div className="flex-1">
            <FormComponent.Input
              {...register("title")}
              label="Title"
              placeholder="e.g. Get all users"
              error={errors.title?.message}
              showSkeleton={isLoading}
            />
          </div>

          <Controller
            control={control}
            name="method"
            render={({ field: { value, onChange } }) => (
              <SelectHttpMethod
                value={value}
                onChange={onChange}
                showSkeleton={isLoading}
              />
            )}
          />

          <Controller
            control={control}
            name="statusCode"
            render={({ field: { value, onChange } }) => (
              <SelectStatusCode
                value={value}
                onChange={onChange}
                statusCodes={statusCodes}
                showSkeleton={isLoading}
              />
            )}
          />

          <InputDelay
            {...register("delay")}
            error={errors.delay?.message}
            showSkeleton={isLoading}
          />
        </div>

        <FormComponent.Textarea
          {...register("description")}
          label="Description"
          placeholder="e.g. Returns a paginated list of users"
          rows={7}
          error={errors.description?.message}
          showSkeleton={isLoading}
        />
      </div>

      {statusCodeHasBody(statusCode) && (
        <div className="rounded-lg border border-border bg-background-secondary p-5 flex flex-col gap-3">
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest shrink-0">
              Response body
            </h2>

            <Controller
              control={control}
              name="responseBodyType"
              render={({ field: { value, onChange } }) => (
                <SelectResponseBodyType value={value} onChange={onChange} />
              )}
            />
          </div>

          {responseBodyType === "json" && (
            <Controller
              control={control}
              name="responseJson"
              render={({ field }) => (
                <JsonEditor
                  value={field.value ?? ""}
                  onChange={field.onChange}
                  showSkeleton={isLoading}
                  error={errors.responseJson?.message}
                />
              )}
            />
          )}

          {responseBodyType === "text" && (
            <FormComponent.Textarea
              {...register("responseText")}
              placeholder="Plain text response..."
              rows={10}
              error={errors.responseText?.message}
              showSkeleton={isLoading}
            />
          )}

          {responseBodyType === "null" && (
            <div className="rounded-md border border-border bg-background-tertiary px-3 py-2.5">
              <span className="text-xs text-text-muted">
                The response body will be sent as{" "}
                <code className="text-accent">null</code>.
              </span>
            </div>
          )}

          {responseBodyType === "empty" && (
            <div className="rounded-md border border-border bg-background-tertiary px-3 py-2.5">
              <span className="text-xs text-text-muted">
                The response body will be empty.
              </span>
            </div>
          )}
        </div>
      )}

      <div>
        <FormComponent.Submit showSkeleton={isLoading}>
          Create endpoint
        </FormComponent.Submit>
      </div>
    </FormComponent.Form>
  );
}
