import { create } from "zustand";
import { Categories } from "./categoryStore";


export interface Activities{
  id: string;
  categoryId: string;
  category: Categories;
  title: string;
  description: string;
  imageUrls: [string];
  price: string;
  price_discount: string;
  rating: number;
  total_reviews: string;
  facilities: string;
  address: string;
  province: string;
  city: string;
  location_maps: string;
  createdAt: string;
  updatedAt: string;
}

interface ActivityState {
    activities: Activities[];
    loading: boolean;
    error: string | null;
    setActivities: (activities: Activities[]) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
}

export const useActivitiesStore = create<ActivityState>((set) => ({
    activities: [],
    loading: false,
    error: null,
    setActivities: (activities) => set({ activities }), 
    setLoading: (loading) => set({ loading }),
    setError: (error) => set({ error }),
  }));
  