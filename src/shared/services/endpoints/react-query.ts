/** biome-ignore-all lint/correctness/useHookAtTopLevel: <Its necessary in this file> */
import { useQuery } from "@tanstack/react-query";
import { useEndpointsService } from "./hook";

const endpointsService = useEndpointsService();

export const getEndpoints = () => {
  return useQuery({
    queryKey: ["endpoints"],
    queryFn: endpointsService.getEndpoints,
    retry: false,
    refetchOnWindowFocus: false,
    initialData: [],
  });
};

export const getEndpointById = (id: string) => {
  return useQuery({
    queryKey: ["endpoint", id],
    queryFn: () => endpointsService.getEndpointById(id),
    retry: false,
    refetchOnWindowFocus: false,
  });
};
