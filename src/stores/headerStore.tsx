// src/store/navbarStore.ts
import { create } from "zustand";

interface HeaderState {
  open: boolean;
  modalLogin: boolean;
  modalLogout: boolean;
  modalRegister: boolean;
  toggleModalLogin: () => void;
  toggleModalLogout: () => void;
  toggleModalRegister: ()=> void;
  toggleOpen: () => void;

}

export const useHeaderStore = create<HeaderState>((set) => ({
  open: false,
  modalLogin: false,
  modalLogout: false,
  modalRegister:false,
  toggleModalLogout: () => set((state) => ({ modalLogout: !state.modalLogout })),
  toggleModalLogin: () => set((state) => ({ modalLogin: !state.modalLogin })),
  toggleModalRegister: () => set((state) => ({modalRegister: !state.modalRegister})),
  toggleOpen: () => set((state) => ({ open: !state.open })),
}));
