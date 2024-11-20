import { useQuery } from "@tanstack/react-query";
import { Response } from "../Promo/useFetchPromo";
import { Activities } from "@/stores/activitiesStore";
import axiosClient from "@/api/axiosClient";
import { Categories } from "@/stores/categoryStore";

export const useFetchActivity = (url: string) => {
  return useQuery<Response<Activities[]>, Error>({
    queryKey: ["fetchActivity", url],
    queryFn: async () => {
      const promoRes = await axiosClient.get<Response<Activities[]>>(url);
      return promoRes.data;
    },
  });
};

export const useFetchActivityById = (url: string) => {
  return useQuery<Response<Activities>, Error>({
    queryKey: ["fetchActivityById", url],
    queryFn: async () => {
      const promoRes = await axiosClient.get<Response<Activities>>(url);
      return promoRes.data;
    },
  });
};

export const useFetchCategory = (url: string) => {
  return useQuery<Response<Categories[]>, Error>({
    queryKey: ["fetchCategory", url],
    queryFn: async () => {
      const category = await axiosClient.get<Response<Categories[]>>(url);
      return category.data;
    },
  });
};
