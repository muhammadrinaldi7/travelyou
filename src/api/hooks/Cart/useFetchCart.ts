import { Cart } from "@/stores/cartsStore";
import { Response } from "../Promo/useFetchPromo";
import { useQuery } from "@tanstack/react-query";
import axiosClient from "@/api/axiosClient";

export const useFetchCart = (url: string) => {
  return useQuery<Response<Cart[]>, Error>({
    queryKey: ["fetchCart", url],
    queryFn: async () => {
      const cartRes = await axiosClient.get<Response<Cart[]>>(url);
      return cartRes.data;
    },
  });
};
