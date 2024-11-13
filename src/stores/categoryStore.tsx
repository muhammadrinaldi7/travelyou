import { create } from "zustand";


export interface Categories{
    id: string;
  name: string;
  imageUrl: string;
  createdAt: string;
  updatedAt: string;
}

interface CategoriesState {
  category: Categories[];
  loading: boolean;
  error: string | null;
  setCategories: (category: Categories[]) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useCategoriesStore = create<CategoriesState>((set) => ({
  category: [],
  loading: false,
  error: null,
  setCategories: (category) => set({ category }), 
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
}));
