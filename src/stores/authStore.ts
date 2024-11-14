// stores/authStore.ts
import { create } from 'zustand'
import { User } from './userStore'
import Cookies from 'js-cookie'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  login: (userData: User) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  login: (userData) => set({ 
    user: userData, 
    isAuthenticated: true 
  }),
  logout: () => {
    // Hapus session storage
    
    sessionStorage.removeItem('userSession')
    Cookies.remove('token')
    // Reset state
    set({ 
      user: null, 
      isAuthenticated: false 
    })
  }
}))