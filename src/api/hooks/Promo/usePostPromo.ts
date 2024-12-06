import axiosClient from "@/api/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoDataResponse } from "../Transactions/usePostTransaction";
import endpoints from "@/api/endpoints";

export interface promoPayload {
  title: string;
  description: string;
  imageUrl: string | null;
  terms_condition: string;
  promo_code: string;
  promo_discount_price: number;
  minimum_claim_price: number;
}
export const usePostPromo = (url: string) => {
  const queryClient = useQueryClient();
  const { mutate: addPromo } = useMutation({
    mutationFn: async (payload: promoPayload) => {
      const response = await axiosClient.post<NoDataResponse>(url, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchPromo", url],
      });
    },
  });
  const { mutate: deletePromo } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosClient.delete<NoDataResponse>(`${url}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchPromo", endpoints.promo],
      });
    },
  });

  const { mutate: updatePromo } = useMutation({
    mutationFn: async (payload: promoPayload) => {
      const response = await axiosClient.post<NoDataResponse>(url, payload);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchPromo", endpoints.promo],
      });
    },
  });
  return { addPromo, deletePromo, updatePromo };
};
