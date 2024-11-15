import axiosClient from "@/api/axiosClient"
import { useQuery } from "@tanstack/react-query"


export interface Response<T>{
    code:string;
    data:T;
    message:string;
    status:string;
}

export interface Promo {
    id: string;
    title: string;
    description: string;
    imageUrl: string;
    terms_condition: string;
    promo_code: string;
    promo_discount_price: number;
    minimum_claim_price: number;
    createdAt: string;
    updatedAt: string;
}


export const useFetchPromo = (url:string) =>{
    return useQuery<Response<Promo[]>, Error>({
        queryKey: ["fetchPromo", url], 
        queryFn: async () => {
            const promoRes = await axiosClient.get<Response<Promo[]>>(url)
            return promoRes.data
        },
    });
};