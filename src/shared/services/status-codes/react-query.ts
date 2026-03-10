import { useQuery } from "@tanstack/react-query";
import { useStatusCodesService } from "./hook";

export const useGetStatusCodes = () => {
  const statusCodesService = useStatusCodesService();

  return useQuery({
    queryKey: ["status-codes"],
    queryFn: statusCodesService.getStatusCodes,
    retry: false,
    refetchOnWindowFocus: false,
  });
};
