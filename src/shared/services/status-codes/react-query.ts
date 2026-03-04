/** biome-ignore-all lint/correctness/useHookAtTopLevel: <Its necessary in this file> */
import { useQuery } from "@tanstack/react-query";
import { useStatusCodesService } from "./hook";

const statusCodesService = useStatusCodesService();

export const getStatusCodes = () => {
  return useQuery({
    queryKey: ["status-codes"],
    queryFn: statusCodesService.getStatusCodes,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
