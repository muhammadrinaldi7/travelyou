import { PaymentMethodBank } from "@/api/hooks/Payment/useFetchPaymenMethod";
import { create } from "zustand";

interface PaymentState {
  paymentMethodBanks: PaymentMethodBank[];
  loading: boolean;
  error: string | null;
  setPaymentMethodBanks: (paymentMethodBanks: PaymentMethodBank[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const usePaymentStore = create<PaymentState>((set) => ({
  paymentMethodBanks: [],
  loading: false,
  error: null,
  setPaymentMethodBanks: (paymentMethodBanks) => set({ paymentMethodBanks }),
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
