import axiosClient from "@/api/axiosClient";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { NoDataResponse } from "../Transactions/usePostTransaction";
import endpoints from "@/api/endpoints";

export interface AddCategoryPayload {
  name: string;
  imageUrl: string;
}
export const usePostCategories = () => {
  const queryClient = useQueryClient();
  const { mutate: addCategory } = useMutation({
    mutationFn: async (payload: AddCategoryPayload) => {
      const response = await axiosClient.post<NoDataResponse>(
        endpoints.createCategory,
        payload
      );
      return response.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchCategory", endpoints.categories],
      });
    },
  });

  const { mutate: deleteCategory } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axiosClient.delete<NoDataResponse>(
        `${endpoints.deleteCategory}/${id}`
      );
      return response.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchCategory", endpoints.categories],
      });
    },
  });

  const { mutate: updateCategory } = useMutation({
    mutationFn: async (payload: AddCategoryPayload) => {
      const response = await axiosClient.post<NoDataResponse>(
        endpoints.updateCategory,
        payload
      );
      return response.data.message;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["fetchCategory", endpoints.categories],
      });
    },
  });

  return { addCategory, deleteCategory, updateCategory };
};
