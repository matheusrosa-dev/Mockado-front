import { Form as FormComponent } from "@components";
import {
  InputDelay,
  ResponseBody,
  SelectHttpMethod,
  SelectStatusCode,
} from "../../-partials";
import { HttpMethod, ResponseBodyType } from "@shared/const/endpoint";
import { Controller, useForm, useWatch } from "react-hook-form";
import type { IForm } from "../-types";
import { schemaResolver } from "../-helpers";
import type { IStatusCode } from "@shared/models/status-code";
import { statusCodeHasBody } from "@shared/helpers/status-code";
import { formatJsonString, validateJsonString } from "@shared/helpers/json";

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
    setError,
  } = useForm<IForm>({
    resolver: schemaResolver,
    defaultValues: {
      method: HttpMethod.GET,
      statusCode: "200",
      responseBodyType: ResponseBodyType.JSON,
      responseJson: '{\n  "key": "value"\n}',
      responseText: "",
    },
  });

  const statusCode = useWatch({
    control,
    name: "statusCode",
  });

  const submitWithResponseBody = (formData: IForm) => {
    const isJsonBody = formData.responseBodyType === ResponseBodyType.JSON;

    if (isJsonBody) {
      const isValidJson = validateJsonString(formData.responseJson as string);

      if (!isValidJson) {
        setError("responseJson", {
          message: "JSON is not valid",
        });
        return;
      }
    }

    console.log("submit with body", {
      title: formData.title,
      method: formData.method,
      delay: formData.delay,
      description: formData.description,
      responseBodyType: formData.responseBodyType,
      statusCode: Number(formData.statusCode),
      ...(formData.responseBodyType === ResponseBodyType.JSON && {
        responseJson: formatJsonString(formData.responseJson!),
      }),
      ...(formData.responseBodyType === ResponseBodyType.TEXT && {
        responseText: formData.responseText,
      }),
    });
  };

  const submitWithoutResponseBody = (formData: IForm) => {
    console.log("no body submit", {
      title: formData.title,
      method: formData.method,
      delay: formData.delay,
      description: formData.description,
      statusCode: Number(formData.statusCode),
    });
  };

  const onSubmit = (formData: IForm) => {
    const hasBody = statusCodeHasBody(formData.statusCode);

    if (hasBody) {
      submitWithResponseBody(formData);
      return;
    }

    if (!hasBody) {
      submitWithoutResponseBody(formData);
    }
  };

  return (
    <FormComponent.Form
      className="flex flex-col gap-6 lg:max-w-4xl"
      onSubmit={handleSubmit(onSubmit)}
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
        <ResponseBody
          key="response-body"
          control={control}
          isLoading={isLoading}
        />
      )}

      <div>
        <FormComponent.Submit showSkeleton={isLoading}>
          Create endpoint
        </FormComponent.Submit>
      </div>
    </FormComponent.Form>
  );
}
