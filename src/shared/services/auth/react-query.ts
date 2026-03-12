import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "./hook";
import type { AxiosError } from "axios";
import { Toast } from "@components";
import { formatApiError } from "@shared/helpers/api-error";
import type { ApiError } from "@services/interfaces";

export const useGoogleLogin = () => {
  const authService = useAuthService();
  const toast = Toast.useToast();

  const mutation = useMutation({
    retry: false,
    mutationFn: (data: { googleToken: string }) =>
      authService.googleLogin(data),

    onSuccess: () => {
      toast.show({
        title: "Login successful",
        description: "You have successfully logged in with Google.",
        variant: "success",
      });
    },

    onError: (error: ApiError) => {
      if (error.status === 422) {
        toast.show({
          title: "Error logging in",
          description: formatApiError(error),
          variant: "warning",
        });

        return;
      }

      toast.show({
        title: "Error logging in",
        description:
          "An unexpected error occurred while logging in with Google.",
        variant: "error",
      });
    },
  });

  return {
    ...mutation,
    googleLogin: mutation.mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error as AxiosError | null,
  };
};
