import { apiKey } from "@/api/axiosClient";
import { useMutation } from "@tanstack/react-query";

import axios from "axios";

export interface AddImagePayload {
  image: File;
}
export interface imageResponse {
  code: string;
  status: string;
  message: string;
  url: string;
}
export const usePostImage = (url: string) => {
  const { mutate: addImage } = useMutation({
    mutationFn: async (payload: AddImagePayload) => {
      axios.defaults.headers.common["Content-Type"] = "multipart/form-data";
      axios.defaults.headers.common["apiKey"] = apiKey;
      axios.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${localStorage.getItem("token")}`;
      const response = await axios.post<imageResponse>(
        process.env.NEXT_PUBLIC_API_BASE_URL + url,
        payload
      );
      return response.data.url;
    },
  });
  return { addImage };
};
