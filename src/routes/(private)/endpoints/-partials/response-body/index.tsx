import {
  Controller,
  useFormState,
  useWatch,
  type Control,
} from "react-hook-form";
import { SelectBodyType } from "./partials";
import { JsonEditor, Form as FormComponent } from "@components";
import type { ResponseBodyType } from "@shared/const/endpoint";

interface IFormDefaultFields {
  responseBodyType: ResponseBodyType;
  responseJson?: string;
  responseText?: string;
}

type Props<T extends IFormDefaultFields> = {
  control: Control<T>;
  isLoading: boolean;
};

export function ResponseBody<T extends IFormDefaultFields>({
  control: controlProp,
  isLoading,
}: Props<T>) {
  const control = controlProp as unknown as Control<IFormDefaultFields>;

  const { errors } = useFormState({
    control,
  });

  const responseBodyType = useWatch({
    control: control as Control<IFormDefaultFields>,
    name: "responseBodyType",
  });

  return (
    <div className="rounded-lg border border-border bg-background-secondary p-5 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold text-white/70 uppercase tracking-widest shrink-0">
          Response body
        </h2>

        <Controller
          control={control}
          name="responseBodyType"
          render={({ field: { value, onChange } }) => (
            <SelectBodyType value={value} onChange={onChange} />
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
        <Controller
          control={control}
          name="responseText"
          render={({ field }) => (
            <FormComponent.Textarea
              {...field}
              placeholder="Plain text response..."
              rows={10}
              error={errors.responseText?.message}
              showSkeleton={isLoading}
            />
          )}
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
  );
}
