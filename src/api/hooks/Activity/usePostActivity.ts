import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface payloadActivity {
  categoryId: string;
  title: string;
  description: string;
  imageUrls: string[];
  price: number;
  price_discount: number;
  rating: number;
  total_reviews: number;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
}
export const usePostActivity = () => {
  const queryClient = useQueryClient();
  const { mutate: addActivity } = useMutation({
    mutationFn: async (payload: payloadActivity) => {
      const response = await axiosClient.post(
        endpoints.createActivity,
        payload
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchActivity"],
      });
    },
  });
  const { mutate: deleteActivity } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosClient.delete(endpoints.deleteActivity + id);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchActivity"],
      });
    },
  });
  return { addActivity, deleteActivity };
};
