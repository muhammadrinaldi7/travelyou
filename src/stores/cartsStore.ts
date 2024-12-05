import { create } from "zustand";
import { Activities } from "./activitiesStore";

export interface Cart {
  id: string;
  userId: string;
  activityId: string;
  quantity: number;
  createdAt: string;
  updatedAt: string;
  activity: Activities;
}

interface CartsState {
  carts: Cart[];
  selectedItems: string[];
  itemCart: number;
  addCart: (item: Cart) => void;
  setCarts: (items: Cart[]) => void;
  addQuantity: (activityId: string) => void;
  removeQuantity: (activityId: string) => void;
  removeCart: (id: string) => void;
  clearCart: () => void;
  addItemCart: (item: number) => void;
  toggleSelectItem: (activityId: string) => void; // Fungsi untuk toggle item yang dipilih
  toggleAllItems: () => void;
  clearSelectedItems: () => void;
  cartToPayment: (processedIds: string[]) => void;
  getSelectedItems: () => Cart[]; // Fungsi untuk mendapatkan item yang dipilih
}

export const useCartsStore = create<CartsState>((set, get) => ({
  carts: [],
  selectedItems: [],
  itemCart: 0,
  addItemCart(item: number) {
    set({ itemCart: get().itemCart + item });
  },
  addCart: (item) =>
    set((state) => {
      const existingCartItem = state.carts.find(
        (cart) => cart.activityId === item.activityId
      );
      if (existingCartItem) {
        return {
          carts: state.carts.map((cart) =>
            cart.activityId === item.activityId
              ? { ...cart, quantity: cart.quantity + item.quantity }
              : cart
          ),
        };
      } else {
        // Jika item belum ada, tambahkan item baru
        return { carts: [...state.carts, item] };
      }
    }),

  setCarts(items) {
    set({ carts: items });
  },
  toggleSelectItem: (activityId) =>
    set((state) => {
      const isSelected = state.selectedItems.includes(activityId);
      return {
        selectedItems: isSelected
          ? state.selectedItems.filter((id) => id !== activityId) // Hapus dari selectedItems jika sudah ada
          : [...state.selectedItems, activityId], // Tambahkan ke selectedItems jika belum ada
      };
    }),
  toggleAllItems: () =>
    set((state) => {
      const allSelected = state.selectedItems.length === state.carts.length; // Cek apakah semua item sudah dipilih
      return {
        selectedItems: allSelected
          ? []
          : state.carts.map((cart) => cart.activityId), // Kosongkan jika semua sudah dipilih
      };
    }),
  clearSelectedItems: () => set({ selectedItems: [] }),
  getSelectedItems: () => {
    const state = get();
    return state.carts.filter((cart) =>
      state.selectedItems.includes(cart.activityId)
    );
  },
  cartToPayment: (processedIds) => {
    const state = get();
    // Filter out items with IDs in processedIds
    const updatedCarts = state.carts.filter(
      (cart) => !processedIds.includes(cart.id)
    );
    set({ carts: updatedCarts }); // Update the state
  },
  removeCart: (id) =>
    set((state) => ({
      carts: state.carts.filter((item) => item.id !== id),
    })),

  addQuantity: (activityId) =>
    set((state) => ({
      carts: state.carts.map((item) =>
        item.activityId === activityId
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ),
    })),

  removeQuantity: (activityId) =>
    set((state) => ({
      carts: state.carts.map((item) =>
        item.activityId === activityId && item.quantity > 1 // Validasi agar tidak negatif
          ? { ...item, quantity: item.quantity - 1 }
          : item
      ),
    })),

  clearCart: () => set({ carts: [] }),
}));
