'use client'
import { useAuthStore } from "@/stores/authStore";
import { QueryClient,QueryClientProvider } from "@tanstack/react-query"
import { useEffect, useState } from "react";


const queryClient = new QueryClient();
export default function LayoutProvider({
    children,
  }: {
    children: React.ReactNode
  }){
    const [isLoading, setIsLoading] = useState(true)
  const { login, logout } = useAuthStore()

  useEffect(() => {
    // Fungsi untuk memeriksa session
    const checkAuthentication = () => {
      try {
        // Ambil data dari session storage
        const userSession = sessionStorage.getItem('userSession')
        
        if (userSession) {
          // Parse data user
          const userData = JSON.parse(userSession)
          
          // Set data user ke auth store
          login(userData)
        } else {
          // Jika tidak ada session, pastikan logout
          logout()
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        logout()
      } finally {
        // Selesaikan loading
        setIsLoading(false)
      }
    }

    // Jalankan pengecekan
    checkAuthentication()

    // Optional: Tambahkan event listener untuk storage changes
    window.addEventListener('storage', checkAuthentication)

    // Cleanup listener
    return () => {
      window.removeEventListener('storage', checkAuthentication)
    }
  }, [login, logout])

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
    return(
        <>
        <QueryClientProvider client={queryClient}>
            {children}
        </QueryClientProvider>
        </>
    )
}