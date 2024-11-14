import { create } from "zustand";
import { Activities } from "./activitiesStore";

export interface Cart{
    id:string;
    UserId:string;
    activityId:string;
    quantity:number;
    createdAt:string;
    updatedAt:string;
    activity: Activities;
}

interface CartsState {
    carts: Cart[];
    setCarts: (carts: Cart[]) => void;
    addCart: (item: Cart) => void;
    removeCart: (cartItemId: string) => void;
    clearCart: () => void;
}

export const useCartsStore = create<CartsState>((set) => ({
    carts: [],
    
    setCarts: (carts) => set({ carts }),
    
    addCart: (item) =>
        set((state) => ({ carts: [...state.carts, item] })),
    
    removeCart: (cartItemId) =>
        set((state) => ({
            carts: state.carts.filter((item) => item.id !== cartItemId),
        })),
    
    clearCart: () => set({ carts: [] }),
}));