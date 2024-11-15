import { useQuery } from "@tanstack/react-query";
import { Response } from "../Promo/useFetchPromo";
import { Activities } from "@/stores/activitiesStore";
import axiosClient from "@/api/axiosClient";



export const useFetchActivity = (url:string) =>{
    return useQuery<Response<Activities[]>, Error>({
        queryKey: ["fetchPromo", url], 
        queryFn: async () => {
            const promoRes = await axiosClient.get<Response<Activities[]>>(url)
            return promoRes.data
        },
    });
};