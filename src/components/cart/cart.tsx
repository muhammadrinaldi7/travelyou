"use client";
import type { Cart } from "@/stores/cartsStore";
import { useCartsStore } from "@/stores/cartsStore";
import React from "react";
import CartItem from "./cartItem";
import { useTransactionStore } from "@/stores/transactionStore";
import { useFetchCart } from "@/api/hooks/Cart/useFetchCart";
import endpoints from "@/api/endpoints";

const Cart = () => {
  const { selectedItems, toggleAllItems } = useCartsStore();
  const { setTransactionItemsPayload, transactionItemsPayload } =
    useTransactionStore();
  const { data: cartData } = useFetchCart(endpoints.cart);

  const cart = cartData?.data || [];

  const handleCheckAll = () => {
    const allCarts = cart.map((cart) => cart.id);
    setTransactionItemsPayload({
      ...transactionItemsPayload,
      cartIds: selectedItems.length === cart.length ? [] : allCarts,
    });

    toggleAllItems();
  };

  return (
    <div className="container mx-auto px-2">
      <div className="w-full mx-auto p-6 bg-gray-50 rounded-lg shadow-md">
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <input
                  type="checkbox"
                  checked={selectedItems.length === cart.length}
                  onChange={handleCheckAll}
                  className="h-5 w-5"
                />
                <h1>Select All</h1>
              </div>

              {cart.map((item) => (
                <CartItem
                  key={item.activityId}
                  id={item.id}
                  activityId={item.activityId}
                  title={item.activity.title}
                  quantity={item.quantity}
                  imageUrl={item.activity.imageUrls[0]}
                  price={parseInt(item.activity.price_discount)}
                />
              ))}
            </div>
            <div>
              <p className="text-gray-600 font-bold mt-2 text-right">
                Total: Rp.{" "}
                {cart
                  .reduce(
                    (total, item) =>
                      total +
                      parseInt(item.activity.price_discount) * item.quantity,
                    0
                  )
                  .toLocaleString()}
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
