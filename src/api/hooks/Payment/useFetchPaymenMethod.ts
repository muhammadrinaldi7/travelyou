import { useQuery } from "@tanstack/react-query";
import { Response } from "../Promo/useFetchPromo";
import axiosClient from "@/api/axiosClient";

export interface PaymentMethodBank {
  id: string;
  name: string;
  imageUrl: string;
}

export const useFetchPaymentMethod = (url: string) => {
  return useQuery<Response<PaymentMethodBank[]>, Error>({
    queryKey: ["fetchPaymentMethodBank", url],
    queryFn: async () => {
      const paymentMethodBankRes = await axiosClient.get<
        Response<PaymentMethodBank[]>
      >(url);
      return paymentMethodBankRes.data;
    },
  });
};
