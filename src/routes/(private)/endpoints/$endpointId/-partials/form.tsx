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
import type { IEndpoint } from "@shared/models/endpoint";
import { useCallback, useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { useUpdateEndpoint } from "@services/endpoints/react-query";

type Props = {
  endpoint: IEndpoint;
  isLoading: boolean;
  statusCodes: IStatusCode[];
};

export function Form({ endpoint, isLoading, statusCodes }: Props) {
  const [isFilled, setIsFilled] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
    control,
    setError,
    reset,
  } = useForm<IForm>({
    resolver: schemaResolver,
    defaultValues: {
      method: HttpMethod.GET,
      statusCode: "200",
      responseBodyType: ResponseBodyType.JSON,
      responseJson: '{\n"key": "value"\n}',
      responseText: "",
    },
  });

  const statusCode = useWatch({
    control,
    name: "statusCode",
  });

  const fillForm = useCallback(
    (data: IEndpoint) => {
      reset({
        title: data.title,
        description: data.description,
        method: data.method,
        statusCode: String(data.statusCode),
        delay: data.delay ?? 0,
        responseBodyType: data.responseBodyType ?? ResponseBodyType.JSON,
        responseJson: data.responseJson ?? '{\n  "key": "value"\n}',
        responseText: data.responseText ?? "",
      });
    },
    [reset],
  );

  const { isSubmitting, updateEndpoint } = useUpdateEndpoint({
    onSuccess: fillForm,
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

    updateEndpoint({
      id: endpoint.id,
      title: formData.title,
      method: formData.method,
      delay: formData.delay,
      description: formData.description,
      statusCode: Number(formData.statusCode),
      responseBodyType: formData.responseBodyType,
      ...(formData.responseBodyType === ResponseBodyType.JSON && {
        responseJson: formatJsonString(formData.responseJson!),
      }),
      ...(formData.responseBodyType === ResponseBodyType.TEXT && {
        responseText: formData.responseText,
      }),
    });
  };

  const submitWithoutResponseBody = (formData: IForm) => {
    updateEndpoint({
      id: endpoint.id,
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

  useEffect(() => {
    if (!endpoint.id) return;

    // timeout is needed to avoid a inconsistency between values in the form
    setTimeout(() => {
      fillForm(endpoint);
      setIsFilled(true);
    }, 0);
  }, [endpoint, fillForm]);

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
              showSkeleton={isLoading || !isFilled}
              disabled={isSubmitting}
            />
          </div>

          <Controller
            control={control}
            name="method"
            render={({ field: { value, onChange } }) => (
              <SelectHttpMethod
                value={value}
                onChange={onChange}
                showSkeleton={isLoading || !isFilled}
                disabled={isSubmitting}
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
                showSkeleton={isLoading || !isFilled}
                disabled={isSubmitting}
              />
            )}
          />

          <InputDelay
            {...register("delay")}
            error={errors.delay?.message}
            showSkeleton={isLoading || !isFilled}
            disabled={isSubmitting}
          />
        </div>

        <FormComponent.Textarea
          {...register("description")}
          label="Description"
          placeholder="e.g. Returns a paginated list of users"
          rows={7}
          error={errors.description?.message}
          showSkeleton={isLoading || !isFilled}
          disabled={isSubmitting}
        />
      </div>

      {statusCodeHasBody(statusCode) && (
        <ResponseBody
          key={endpoint.id}
          control={control}
          isLoading={isLoading || !isFilled}
          isSubmitting={isSubmitting}
        />
      )}

      <div>
        <FormComponent.Submit
          showSkeleton={isLoading || !isFilled}
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting ? (
            <>
              Saving changes...
              <CgSpinner className="animate-spin text-base" />
            </>
          ) : (
            "Save changes"
          )}
        </FormComponent.Submit>
      </div>
    </FormComponent.Form>
  );
}
