import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoDataResponse } from "../Transactions/usePostTransaction";
import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";

export interface AddBannerPayload {
  name: string;
  imageUrl: string | null;
}
export const usePostBanner = (url: string) => {
  const queryClient = useQueryClient();
  const { mutate: addBanner } = useMutation({
    mutationFn: async (payload: AddBannerPayload) => {
      const response = await axiosClient.post<NoDataResponse>(url, payload);
      return response.data;
    },
  });
  const { mutate: deleteBanner } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosClient.delete<NoDataResponse>(`${url}/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchBanner", endpoints.banner],
      });
    },
  });
  return { addBanner, deleteBanner };
};
