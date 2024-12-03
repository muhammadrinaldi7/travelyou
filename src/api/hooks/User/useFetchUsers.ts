import axiosClient from "@/api/axiosClient";
import { useQuery } from "@tanstack/react-query";
import { Response } from "../Promo/useFetchPromo";
import { User } from "@/stores/userStore";

export const useFetchLoggedUser = (url: string) => {
  return useQuery<Response<User>, Error>({
    queryKey: ["fetchLoggedUser", url],
    queryFn: async () => {
      const usersRes = await axiosClient.get<Response<User>>(url);
      return usersRes.data;
    },
  });
};
