import { useQuery } from "@tanstack/react-query";
import { Response } from "../Promo/useFetchPromo";
import axiosClient from "@/api/axiosClient";

interface Banner {
  id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

export const useFetchBanner = (url: string) => {
  return useQuery<Response<Banner[]>, Error>({
    queryKey: ["fetchBanner", url],
    queryFn: async () => {
      const bannerRes = await axiosClient.get<Response<Banner[]>>(url);
      return bannerRes.data;
    },
  });
};

export const useFetchBannerById = (url: string) => {
  return useQuery<Response<Banner>, Error>({
    queryKey: ["fetchBannerById", url],
    queryFn: async () => {
      const bannerRes = await axiosClient.get<Response<Banner>>(url);
      return bannerRes.data;
    },
  });
};
