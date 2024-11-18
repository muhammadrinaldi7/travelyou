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
        const userSession = sessionStorage.getItem('userSession')
        
        if (userSession) {
          const userData = JSON.parse(userSession)
          
          login(userData)
        } else {
          logout()
        }
      } catch (error) {
        console.error('Error checking authentication:', error)
        logout()
      } finally {
        setIsLoading(false)
      }
    }

    // Jalankan pengecekan
    checkAuthentication()

    // Optional: Tambahkan event listener untuk storage changes
    // window.addEventListener('storage', checkAuthentication)

    // // Cleanup listener
    // return () => {
    //   window.removeEventListener('storage', checkAuthentication)
    // }
  }, [login, logout])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
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