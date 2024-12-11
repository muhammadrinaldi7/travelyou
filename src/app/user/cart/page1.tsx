"use client";

import endpoints from "@/api/endpoints";
import { useFetchCart } from "@/api/hooks/Cart/useFetchCart";
import { BreadCumbs } from "@/components/breadcumb/breadCumbs";
import LayoutUser from "@/components/layout/LayoutUser";
import { QtyInputs } from "@/components/pagination/qtyInputs";
import { Cart } from "@/stores/cartsStore";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import { useState } from "react";

export default function CartUser() {
  const { data: cart } = useFetchCart(endpoints.cart);
  const [selectedItem, setSelectedItem] = useState<Cart[]>([]);
  const handleSelectItem = (item: Cart) => {
    if (selectedItem.includes(item)) {
      setSelectedItem(selectedItem.filter((i) => i !== item));
    } else {
      setSelectedItem([...selectedItem, item]);
    }
  };
  console.log(selectedItem);

  return (
    <LayoutUser title="Cart" desc="Cart">
      <BreadCumbs title="Cart" to="/" prevPage="Home" />

      <div className="mx-auto w-full px-4 py-8  ">
        <div className="mx-auto w-full ">
          <div className="">
            <ul className="space-y-4">
              {cart?.data?.map((item, index) => (
                <li key={index} className="flex items-center gap-4">
                  <input
                    type="checkbox"
                    onChange={() => handleSelectItem(item)}
                    name="itemSelect"
                    id="itemSelect"
                  />
                  <Image
                    src={item.activity?.imageUrls[0]}
                    alt={item.activity?.title}
                    width={1000}
                    height={1000}
                    className="size-20 rounded object-cover"
                  />

                  <div>
                    <h3 className="text-lg text-gray-900">
                      {item.activity?.title}
                    </h3>

                    <dl className="mt-0.5 space-y-px text-sm text-gray-600">
                      <div>
                        <dt className="inline">Price:</dt>
                        <dd className="inline">
                          <p>
                            <span className="line-through mr-2">
                              {item.activity?.price.toLocaleString()}
                            </span>
                            {item.activity?.price_discount.toLocaleString()}
                          </p>
                        </dd>
                      </div>

                      <div>
                        <dt className="inline">City:</dt>
                        <dd className="inline">{item.activity?.city}</dd>
                      </div>
                    </dl>
                  </div>

                  <div className="flex flex-1 items-center justify-end gap-2">
                    <QtyInputs qty={item.quantity} id={item.id} />
                    <button className="text-gray-600 transition hover:text-red-600">
                      <span className="sr-only">Remove item</span>
                      <FontAwesomeIcon icon={faTrash} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex justify-end border-t border-gray-100 pt-8">
              <div className="w-screen max-w-lg space-y-4">
                <dl className="space-y-0.5 text-sm text-gray-700">
                  <div className="flex flex-col gap-1">
                    {selectedItem?.map((item, index) => (
                      <div key={index} className="flex justify-between">
                        <dt>{item.activity?.title}</dt>
                        <dd>
                          Rp.{" "}
                          {(
                            parseInt(item.activity?.price_discount) *
                            item.quantity
                          ).toLocaleString()}
                          ({item.quantity})
                        </dd>
                      </div>
                    ))}
                  </div>
                  <span className="flex items-center">
                    <span className="h-px flex-1 bg-black"></span>
                  </span>
                  <div className="flex justify-between !text-base font-medium">
                    <dt>Total</dt>
                    <dd>
                      Rp.{" "}
                      {selectedItem
                        .reduce(
                          (a, b) =>
                            a + Number(b.activity.price_discount) * b.quantity,
                          0
                        )
                        .toLocaleString()}
                      ({selectedItem.reduce((a, b) => a + b.quantity, 0)})
                    </dd>
                  </div>
                </dl>

                <div className="flex justify-end">
                  {/* <select
                    className="form-select form-inputmt-1.5 w-full rounded-lg border-gray-300 text-gray-700 sm:text-sm"
                    name=""
                    id=""
                  >
                    <option value="" disabled>
                      Select Payment Method
                    </option>
                    <option value="">Cash</option>
                    <option value="">Card</option>
                  </select> */}
                </div>

                <div className="flex justify-end">
                  <a
                    href="#"
                    className="block rounded bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600"
                  >
                    Checkout
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LayoutUser>
  );
}
