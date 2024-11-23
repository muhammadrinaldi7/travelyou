"use client";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import Cart from "@/components/cart/cart";
import { useAuthStore } from "@/stores/authStore";
import { useCartsStore } from "@/stores/cartsStore";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const CartPage = () => {
  const { getSelectedItems } = useCartsStore();
  const selectedItems = getSelectedItems();
  const { isAuthenticated } = useAuthStore();
  const route = useRouter();
  const handleCheckout = () => {
    if (!isAuthenticated) {
      toast.error("You must be logged in to checkout.");
      route.push("/auth/Login");
    }
    // Lakukan logika checkout di sini
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col py-20 px-5 items-center justify-center">
      <div className="self-start ml-2">
        <BreadCumbs title="Cart" prevPage="Home" to="/" />
      </div>
      <h1 className="text-3xl self-start ml-6 mb-3 font-bold">Cart Page</h1>
      <div className="flex w-full flex-col gap-4 md:flex-row">
        <Cart />
        <div className="flex bg-white md:w-2/4 h-fit rounded-lg shadow-md p-6 flex-col">
          <h2 className="text-lg text-nowrap font-bold mb-4">Transaction</h2>
          <div className="flex border border-black rounded-xl p-2 flex-col space-y-4">
            {selectedItems.length > 0 ? (
              <ul>
                {selectedItems.map((item) => (
                  <li key={item.activityId} className="flex justify-between">
                    <p>{item.activity.title}</p> <p> x({item.quantity})</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No items selected for checkout.</p>
            )}
            <div className="flex justify-between">
              <p className="font-bold">Total:</p>
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
            <button
              onClick={handleCheckout}
              disabled={selectedItems.length === 0}
              className="bg-black text-white rounded-lg p-2 hover:bg-gray-800"
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
