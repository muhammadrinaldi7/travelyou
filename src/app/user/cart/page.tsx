"use client";
import endpoints from "@/api/endpoints";

import usePostTransaction from "@/api/hooks/Transactions/usePostTransaction";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import Cart from "@/components/cart/cart";
import { useAuthStore } from "@/stores/authStore";
import { useCartsStore } from "@/stores/cartsStore";
import { usePaymentStore } from "@/stores/paymentStore";
import { useTransactionStore } from "@/stores/transactionStore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import toast from "react-hot-toast";

const CartPage = () => {
  const { getSelectedItems, carts, clearSelectedItems, cartToPayment } =
    useCartsStore();

  const selectedItems = getSelectedItems();
  const { isAuthenticated } = useAuthStore();
  const { paymentMethodBanks } = usePaymentStore();
  const route = useRouter();
  const { createTransaction } = usePostTransaction(endpoints.createTransaction);
  const { transactionItemsPayload, setTransactionItemsPayload } =
    useTransactionStore();
  console.log(selectedItems);
  console.log(carts);
  const handleSelectPayment = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedValue = e.target.value;
    setTransactionItemsPayload({
      ...transactionItemsPayload,
      // cartIds: selectedItems.map((item) => item.id),
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
      await createTransaction(transactionItemsPayload);
      setTransactionItemsPayload({
        cartIds: [],
        paymentMethodId: "",
      });
      clearSelectedItems();
      const processedIds = selectedItems.map((item) => item.id);
      cartToPayment(processedIds);
      toast.success("Checkout successful!");
    } catch (error) {
      console.error("Error creating transaction:", error);
    }
  };

  // console.log(selectedItems);
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-20 px-5 items-center justify-center">
      <div className="self-start ml-2">
        <BreadCumbs title={`Cart`} prevPage="Activity" to="/user/activity" />
      </div>
      <h1 className="text-3xl self-start ml-6 my-3 font-bold">Cart</h1>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Cart />
        <div className="flex bg-white md:w-2/4 h-fit rounded-lg shadow-md p-6 gap-4 flex-col">
          <h2 className="text-lg text-nowrap font-bold mb-4">Transaction</h2>
          <div className="flex border border-primary-300 drop-shadow-md shadow-lg rounded-xl p-2 flex-col space-y-4">
            {selectedItems.length > 0 ? (
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
    </div>
  );
};

export default CartPage;
{
  /* <select
  name="payment"
  className="mt-1.5 w-1/2 rounded-lg border-gray-300 text-gray-700 sm:text-sm"
  id=""
>
  {paymentMethodBanks?.map((payment) => (
    <option key={payment.id} value={payment.id}>
      <Image
        src={payment.imageUrl}
        width={10}
        height={10}
        className="w-8 h-8 object-cover object-center rounded-full"
        alt="payment"
      />
      {payment.name}
    </option>
  ))}
</select>; */
}
