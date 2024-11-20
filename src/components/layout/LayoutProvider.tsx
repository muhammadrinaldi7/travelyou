"use client";
import axiosClient from "@/api/axiosClient";
import endpoints from "@/api/endpoints";
import { Response } from "@/api/hooks/Promo/useFetchPromo";
import { useAuthStore } from "@/stores/authStore";
import { Cart, useCartsStore } from "@/stores/cartsStore";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useEffect, useState } from "react";

const queryClient = new QueryClient();
export default function LayoutProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);
  const { login, logout, isAuthenticated } = useAuthStore();
  const { setCarts, itemCart } = useCartsStore();
  useEffect(() => {
    // Fungsi untuk memeriksa session
    const checkAuthentication = async () => {
      try {
        const userSession = sessionStorage.getItem("userSession");

        if (userSession) {
          const userData = JSON.parse(userSession);
          login(userData);
          const cartUser = await axiosClient.get<Response<Cart[]>>(
            endpoints.cart
          );
          const itemCart = cartUser.data;
          if (cartUser.data.data.length > 0) {
            setCarts(itemCart.data);
          }
        } else {
          logout();
        }
      } catch (error) {
        console.error("Error checking authentication:", error);
        logout();
      } finally {
        setIsLoading(false);
      }
    };

    // Jalankan pengecekan
    checkAuthentication();

    // Optional: Tambahkan event listener untuk storage changes
    // window.addEventListener('storage', checkAuthentication)

    // // Cleanup listener
    // return () => {
    //   window.removeEventListener('storage', checkAuthentication)
    // }
  }, [login, logout, setCarts, itemCart, isAuthenticated]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="w-32 h-32 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin"></div>
      </div>
    );
  }
  return (
    <>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </>
  );
}
