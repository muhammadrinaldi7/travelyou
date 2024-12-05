import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface cartResponse {
  code: string;
  status: string;
  message: string;
}
interface UpdateCartPayload {
  quantity: number; // Pastikan payload memiliki properti quantity
}
interface AddCartPayload {
  activityId: string;
}
export default function usePostCart(url: string) {
  const queryClient = useQueryClient();
  const { mutate: updateCart } = useMutation({
    mutationFn: async (payload: UpdateCartPayload) => {
      const response = await axiosClient.post<cartResponse>(url, payload);
      return response.data.message;
    },
  });
  const { mutate: addCart } = useMutation({
    mutationFn: async (payload: AddCartPayload) => {
      const response = await axiosClient.post<cartResponse>(url, payload);
      return response.data.message;
    },
  });

  const { mutate: deleteCart } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosClient.delete<cartResponse>(`${url}/${id}`);
      return response.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchCart", endpoints.cart],
      });
      console.log("success");
    },
  });
  return { updateCart, addCart, deleteCart };
}
