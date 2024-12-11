import axiosClient from "@/api/axiosClient";
import {
  ApiResponseTransaction,
  ApiResponseTransactionById,
} from "@/stores/transactionStore";
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
export const useFetchTransactionById = (url: string) => {
  return useQuery<ApiResponseTransactionById, Error>({
    queryKey: ["fetchTransactionById", url],
    queryFn: async () => {
      const transactionRes = await axiosClient.get<ApiResponseTransactionById>(
        url
      );
      return transactionRes.data;
    },
  });
};

export const useFetchAllTransaction = (url: string) => {
  return useQuery<ApiResponseTransaction, Error>({
    queryKey: ["fetchAllTransaction", url],
    queryFn: async () => {
      const transactionRes = await axiosClient.get<ApiResponseTransaction>(url);
      return transactionRes.data;
    },
  });
};
