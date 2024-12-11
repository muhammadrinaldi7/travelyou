import { create } from "zustand";

// Root Response Interface
export interface ApiResponseTransaction {
  code: string;
  status: string;
  message: string;
  data: Transaction[];
}
export interface ApiResponseTransactionById {
  code: string;
  status: string;
  message: string;
  data: Transaction;
}

// Transaction Interface
export interface Transaction {
  id: string;
  userId: string;
  paymentMethodId: string;
  invoiceId: string;
  status: string;
  totalAmount: number;
  proofPaymentUrl: string;
  orderDate: string; // ISO date string
  expiredDate: string; // ISO date string
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  payment_method: PaymentMethod;
  transaction_items: TransactionItem[];
}

// Payment Method Interface
export interface PaymentMethod {
  id: string;
  name: string;
  virtual_account_number: string;
  virtual_account_name: string;
  imageUrl: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

// Transaction Item Interface
export interface TransactionItem {
  id: string;
  transactionId: string;
  title: string;
  description: string;
  price: number;
  price_discount: number;
  quantity: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  imageUrls: string[];
}
export interface TransactionItemPayload {
  cartIds: string[];
  paymentMethodId: string;
}
export interface TransactionState {
  transactions: Transaction[];
  transactionItemsPayload: TransactionItemPayload;
  loading: boolean;
  error: string | null;
  setTransactionItemsPayload: (
    transactionItemsPayload: TransactionItemPayload
  ) => void;
  setTransactions: (transactions: Transaction[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useTransactionStore = create<TransactionState>((set) => ({
  transactions: [],
  transactionItemsPayload: {
    cartIds: [],
    paymentMethodId: "",
  },
  loading: false,
  error: null,
  setTransactionItemsPayload: (
    transactionItemsPayload: TransactionItemPayload
  ) =>
    set((state) => ({
      ...state,
      transactionItemsPayload,
    })),
  setTransactions: (transactions: Transaction[]) => set({ transactions }),
  setLoading: (loading: boolean) => set({ loading }),
  setError: (error: string | null) => set({ error }),
}));
