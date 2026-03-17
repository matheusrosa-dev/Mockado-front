import { useMutation } from "@tanstack/react-query";
import { useMeService } from "./hook";
import { useToastStore } from "@shared/stores/toast";

export const useGetApiKey = (props: {
  onSuccess: (apiKey: string) => void;
  onError: () => void;
}) => {
  const toast = useToastStore();
  const meService = useMeService();

  const { mutate, isPending, ...mutation } = useMutation({
    retry: false,
    mutationFn: meService.getApiKey,

    onSuccess: (data) => {
      props.onSuccess(data.apiKey);
    },

    onError: () => {
      props.onError();

      toast.show({
        title: "Error getting API key",
        description:
          "An unexpected error occurred while retrieving the API key.",
        variant: "error",
      });
    },
  });

  return {
    ...mutation,
    getApiKey: mutate,
    isLoading: isPending,
  };
};
