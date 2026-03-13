import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEndpointsService } from "./hook";
import type { AxiosError } from "axios";
import type { IEndpoint } from "@shared/models/endpoint";
import { Toast } from "@components";
import { formatApiError } from "@shared/helpers/api-error";
import type { ApiError } from "@services/interfaces";

export const useGetEndpointsSummary = () => {
  const endpointsService = useEndpointsService();

  return useQuery({
    queryKey: ["endpoints"],
    queryFn: endpointsService.getEndpointsSummary,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const useGetEndpointById = (id: string) => {
  const endpointsService = useEndpointsService();

  const query = useQuery({
    queryKey: ["endpoint", id],
    queryFn: () => endpointsService.getEndpointById(id),
    retry: false,
    refetchOnWindowFocus: false,
  });

  return {
    ...query,
    error: query.error as AxiosError | null,
  };
};

export const useCreateEndpoint = (props: {
  onSuccess: (data: IEndpoint) => void;
}) => {
  const endpointsService = useEndpointsService();
  const queryClient = useQueryClient();
  const toast = Toast.useToast();

  const mutation = useMutation({
    retry: false,
    mutationFn: (data: Omit<IEndpoint, "id">) =>
      endpointsService.createEndpoint(data),

    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["endpoints"] });

      toast.show({
        title: "Endpoint created",
        description: "The endpoint was created successfully.",
        variant: "success",
      });

      props.onSuccess(data);
    },

    onError: (error: ApiError) => {
      if (error.response?.status === 422) {
        toast.show({
          title: "Validation error",
          description: formatApiError(error),
          variant: "warning",
        });

        return;
      }

      toast.show({
        title: "Error creating endpoint",
        description:
          "An unexpected error occurred while creating the endpoint.",
        variant: "error",
      });
    },
  });

  return {
    ...mutation,
    createEndpoint: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error as AxiosError | null,
  };
};

export const useUpdateEndpoint = (props: {
  onSuccess: (data: IEndpoint) => void;
}) => {
  const endpointsService = useEndpointsService();
  const toast = Toast.useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    retry: false,
    mutationFn: (data: IEndpoint) => {
      const { id, ...updateData } = data;

      return endpointsService.updateEndpoint(id, updateData);
    },
    onSuccess: (data) => {
      toast.show({
        title: "Endpoint updated",
        description: "The endpoint was updated successfully.",
        variant: "success",
      });

      queryClient.invalidateQueries({ queryKey: ["endpoints"] });
      props.onSuccess(data);
    },

    onError: (error: ApiError) => {
      if (error.response?.status === 422) {
        toast.show({
          title: "Validation error",
          description: formatApiError(error),
          variant: "warning",
        });

        return;
      }

      toast.show({
        title: "Error updating endpoint",
        description:
          "An unexpected error occurred while updating the endpoint.",
        variant: "error",
      });
    },
  });

  return {
    ...mutation,
    updateEndpoint: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error as AxiosError | null,
  };
};
