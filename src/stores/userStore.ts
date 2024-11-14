import { create } from "zustand";

export interface User{
    id:string;
    name:string;
    email:string;
    role:string;
    profilePictureUrl:string;
    phoneNumber:string;
}

interface UserState {
    user: User | null;
    token: string | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    clearAuth: () => void; 
  }

  export const useUserStore = create<UserState>((set) => ({
    user: null,
    token: null,
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    clearAuth: () => set({ user: null, token: null }),
  }));
    