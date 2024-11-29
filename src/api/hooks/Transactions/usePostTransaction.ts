import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { TransactionItemPayload } from "@/stores/transactionStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface NoDataResponse {
  code: string;
  status: string;
  message: string;
}

export interface TransactionProofPayload {
  proofPaymentUrl: string;
  url: string;
}
export default function usePostTransaction(url: string) {
  const queryClient = useQueryClient();
  const { mutate: createTransaction } = useMutation({
    mutationFn: async (payload: TransactionItemPayload) => {
      const response = await axiosClient.post<NoDataResponse>(url, payload);
      return response.data;
    },
  });
  const { mutate: updateTransactionProof } = useMutation({
    mutationFn: async (payload: TransactionProofPayload) => {
      const response = await axiosClient.post<NoDataResponse>(url, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchMyTransaction", endpoints.MyTransaction],
      });
    },
  });
  return { createTransaction, updateTransactionProof };
}
