"use client";
import { useCartsStore } from "@/stores/cartsStore";
import React from "react";
import CartItem from "./cartItem";
import { useTransactionStore } from "@/stores/transactionStore";

const Cart = () => {
  const { carts: cart, selectedItems, toggleAllItems } = useCartsStore();
  const { setTransactionItemsPayload, transactionItemsPayload } =
    useTransactionStore();
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
      <div className="w-full mx-auto p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-4">Your Cart</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <>
            <div className="space-y-4">
              <input
                type="checkbox"
                checked={selectedItems.length === cart.length}
                onChange={handleCheckAll}
                className="h-5 w-5"
              />
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
            {/* <button
              className="mt-4 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
              onClick={clearCart}
            >
              Clear Cart
            </button> */}
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
