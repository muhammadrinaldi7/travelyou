"use client";
import endpoints from "@/api/endpoints";

import usePostTransaction from "@/api/hooks/Transactions/usePostTransaction";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import Cart from "@/components/cart/cart";
import LayoutUser from "@/components/layout/LayoutUser";
import { useAuthStore } from "@/stores/authStore";
import { useCartsStore } from "@/stores/cartsStore";
import { usePaymentStore } from "@/stores/paymentStore";
import { useTransactionStore } from "@/stores/transactionStore";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const { getSelectedItems, clearSelectedItems, cartToPayment } =
    useCartsStore();

  const selectedItems = getSelectedItems();
  const { isAuthenticated } = useAuthStore();
  const { paymentMethodBanks } = usePaymentStore();
  const route = useRouter();
  const { createTransaction } = usePostTransaction(endpoints.createTransaction);
  const { transactionItemsPayload, setTransactionItemsPayload } =
    useTransactionStore();

  const handleSelectPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setTransactionItemsPayload({
      ...transactionItemsPayload,
      paymentMethodId: selectedValue,
    });
  };
  const handleCheckout = async () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to checkout.");
      route.push("/auth/Login");
      return;
    }

    try {
      if (transactionItemsPayload.paymentMethodId === "") {
        toast.error("Please select a payment method!");
        return;
      }
      await createTransaction(transactionItemsPayload);
      setTransactionItemsPayload({
        cartIds: [],
        paymentMethodId: "",
      });
      clearSelectedItems();
      const processedIds = selectedItems.map((item) => item.id);
      cartToPayment(processedIds);
      route.push("/user/transaction");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  return (
    <LayoutUser title="Cart" desc="Your Cart">
      <div className="flex justify-between items-center">
        <BreadCumbs title="Cart" to="/" prevPage="Home" />
        <Link
          href="/user/transaction"
          className="text-gray-700 hover:underline"
        >
          My Transaction
        </Link>
      </div>
      <div className="flex w-full flex-col gap-4 lg:flex-row">
        <Cart />
        <div className="flex bg-gray-50 md:w-2/4 h-fit rounded-lg shadow-md p-6 gap-4 flex-col">
          <h2 className="text-lg text-nowrap font-bold mb-4">Transaction</h2>
          <div className="flex border border-primary-300 drop-shadow-md shadow-lg rounded-xl p-2 flex-col space-y-4">
            {selectedItems.length >= 0 ? (
              <ul>
                {selectedItems.map((item) => (
                  <li key={item.activityId} className="flex justify-between">
                    <p>{item.activity.title}</p>
                    <p>
                      Rp.{" "}
                      {(
                        parseInt(item.activity.price_discount) * item.quantity
                      ).toLocaleString("id-ID")}{" "}
                      ({item.quantity})
                    </p>{" "}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items selected for checkout.</p>
            )}
            <div className="flex justify-between">
              <p className="font-bold">Total :</p>
              <p className="font-bold">
                Rp.{" "}
                {selectedItems
                  .reduce(
                    (total, item) =>
                      total +
                      parseInt(item.activity.price_discount) * item.quantity,
                    0
                  )
                  .toLocaleString("id-ID")}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="font-bold">Payment Method :</p>
              <div className="grid grid-cols-3 gap-4">
                {paymentMethodBanks?.map((payment) => (
                  <label
                    key={payment.id}
                    className={`flex items-center justify-center ${
                      payment.id === transactionItemsPayload.paymentMethodId
                        ? "bg-primary-300"
                        : "bg-white/90 "
                    } hover:bg-primary-300 p-2 drop-shadow-md rounded-lg cursor-pointer`}
                  >
                    <input
                      type="radio"
                      name="payment"
                      value={payment.id}
                      checked={
                        transactionItemsPayload.paymentMethodId === payment.id
                      }
                      onChange={handleSelectPayment}
                      className=" hidden"
                    />
                    <Image
                      src={payment.imageUrl}
                      width={1000}
                      height={1000}
                      className="transition-all w-16 h-8 drop-shadow-lg"
                      alt="payment"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
          <button
            onClick={handleCheckout}
            disabled={selectedItems.length === 0}
            className="bg-primary-300/90 text-white shadow-lg disabled:bg-gray-600/80 rounded-lg p-2 hover:bg-primary-300"
          >
            Create Payment
          </button>
        </div>
      </div>
    </LayoutUser>
  );
};

export default CartPage;
