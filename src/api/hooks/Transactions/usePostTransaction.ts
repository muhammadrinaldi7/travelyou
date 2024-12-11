import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { TransactionItemPayload } from "@/stores/transactionStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

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
      if (payload.paymentMethodId === "") {
        toast.error("Please select a payment method!");
      }
      const response = await axiosClient.post<NoDataResponse>(url, payload);
      return response.data;
    },
    onSuccess: () => {
      toast.success("Checkout successful!");
      queryClient.invalidateQueries({
        queryKey: ["fetchCart", endpoints.cart],
      });
      console.log("success");
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
