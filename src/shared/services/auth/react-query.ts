import { useMutation } from "@tanstack/react-query";
import { useAuthService } from "./hook";
import type { AxiosError } from "axios";
import { Toast } from "@components";
import { formatApiError } from "@shared/helpers/api-error";
import type { ApiError } from "@services/interfaces";
import type { ISession } from "@shared/models/session";

export const useGoogleLogin = (props: {
  onSuccess: (session: ISession) => void;
}) => {
  const authService = useAuthService();
  const toast = Toast.useToast();

  const { mutate, ...mutation } = useMutation({
    retry: false,
    mutationFn: (data: { googleToken: string }) =>
      authService.googleLogin(data),

    onSuccess: (session: ISession) => {
      props.onSuccess(session);

      toast.show({
        title: "Login successful",
        description: "You have successfully logged in with Google.",
        variant: "success",
      });
    },

    onError: (error: ApiError) => {
      if (error.response?.status === 422) {
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
    googleLogin: mutate,
    isSubmitting: mutation.isPending,
    error: mutation.error as AxiosError | null,
  };
};

export const useLogout = (props: { onMutate: () => void }) => {
  const authService = useAuthService();

  const { mutate, ...mutation } = useMutation({
    retry: false,
    mutationFn: () => authService.logout(),
    onMutate: props.onMutate,
  });

  return {
    ...mutation,
    logout: mutate,
  };
};
