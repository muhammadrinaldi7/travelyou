import axiosClient from "@/api/axiosClient";
import { ApiResponseTransaction } from "@/stores/transactionStore";
import { useQuery } from "@tanstack/react-query";

export const useFetchMyTransaction = (url: string) => {
  return useQuery<ApiResponseTransaction, Error>({
    queryKey: ["fetchMyTransaction", url],
    queryFn: async () => {
      const transactionRes = await axiosClient.get<ApiResponseTransaction>(url);
      return transactionRes.data;
    },
  });
};
