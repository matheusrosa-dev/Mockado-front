/** biome-ignore-all lint/correctness/useHookAtTopLevel: <Its necessary in this file> */
import { useQuery } from "@tanstack/react-query";
import { useEndpointsService } from "./hook";
import type { AxiosError } from "axios";

const endpointsService = useEndpointsService();

export const getEndpointsSummary = () => {
  return useQuery({
    queryKey: ["endpoints"],
    queryFn: endpointsService.getEndpointsSummary,
    retry: false,
    refetchOnWindowFocus: false,
  });
};

export const getEndpointById = (id: string) => {
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
