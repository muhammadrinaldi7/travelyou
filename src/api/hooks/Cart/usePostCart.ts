import axiosClient from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

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
  return { updateCart, addCart };
}
