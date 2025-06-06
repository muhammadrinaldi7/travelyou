// src/store/navbarStore.ts
import { create } from "zustand";

interface HeaderState {
  open: boolean;
  active: boolean;
  modalLogin: boolean;
  modalLogout: boolean;
  modalRegister: boolean;
  sidebarDashboard: boolean;
  toggleSidebarDashboard: (toggle: boolean) => void;
  toggleModalLogin: () => void;
  toggleModalLogout: () => void;
  toggleModalRegister: () => void;
  toggleOpen: () => void;
  setActive: () => void;
}

export const useHeaderStore = create<HeaderState>((set) => ({
  open: false,
  active: false,
  sidebarDashboard: false,
  toggleSidebarDashboard: () =>
    set((state) => ({ sidebarDashboard: !state.sidebarDashboard })),
  modalLogin: false,
  modalLogout: false,
  modalRegister: false,
  toggleModalLogout: () =>
    set((state) => ({ modalLogout: !state.modalLogout })),
  toggleModalLogin: () => set((state) => ({ modalLogin: !state.modalLogin })),
  toggleModalRegister: () =>
    set((state) => ({ modalRegister: !state.modalRegister })),
  toggleOpen: () => set((state) => ({ open: !state.open })),
  setActive: () => set((state) => ({ active: !state.active })),
}));
